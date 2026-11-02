// Unit tests for scripts/version-packages.mjs. Each test runs the script in
// a temporary directory holding the files it rewrites, with this repository's
// node_modules so that `npx changeset version` finds the changesets CLI.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));

const PARSER_C = `static const TSLanguage language = {
  .abi_version = LANGUAGE_VERSION,
  .metadata = {
    .major_version = 1,
    .minor_version = 2,
    .patch_version = 3,
  },
};
`;

// The manifests at version 1.2.3, shaped like this repository's own.
const FILES = {
  'package.json': JSON.stringify({ name: 'pkg', version: '1.2.3', private: true }, null, 2),
  'package-lock.json': JSON.stringify({
    name: 'pkg', version: '1.2.3', lockfileVersion: 3,
    packages: { '': { name: 'pkg', version: '1.2.3' }, 'node_modules/dep': { version: '1.2.3' } },
  }, null, 2),
  'tree-sitter.json': JSON.stringify({
    grammars: [{ name: 'pkg', version: '9.9.9' }],
    metadata: { version: '1.2.3', license: 'MIT' },
  }, null, 2).replace('"version": "9.9.9"', '"scope": "source.pkg"'),
  'Cargo.toml': '[package]\nname = "pkg"\nrust-version = "1.70"\nversion = "1.2.3"\n\n[dependencies]\ntree-sitter-language = { version = "0.1" }\nversion = "0.0.0"\n',
  'pyproject.toml': '[project]\nname = "pkg"\nmin-version = "0.1"\nversion = "1.2.3"\n\n[tool.other]\nversion = "0.0.0"\n',
  'Makefile': 'LANGUAGE_NAME := pkg\nVERSION := 1.2.3\n\nall:\n\techo VERSION := 0.0.0\n',
  'CMakeLists.txt': 'project(pkg\n        VERSION "1.2.3"\n        LANGUAGES C)\nset(OTHER VERSION "0.0.0")\n',
  'src/parser.c': PARSER_C,
  '.changeset/config.json': readFileSync(path.join(root, '.changeset/config.json'), 'utf8'),
  '.changeset/brave-minor.md': "---\n'pkg': minor\n---\n\nAdd a feature.\n",
};

let dir;

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'version-packages-'));
  for (const [file, text] of Object.entries(FILES)) {
    mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    writeFileSync(path.join(dir, file), text);
  }
  symlinkSync(path.join(root, 'node_modules'), path.join(dir, 'node_modules'), 'dir');
});

afterEach(() => rmSync(dir, { recursive: true, force: true }));

const read = file => readFileSync(path.join(dir, file), 'utf8');

function versionPackages() {
  return spawnSync(process.execPath, [path.join(root, 'scripts/version-packages.mjs')],
    { cwd: dir, encoding: 'utf8' });
}

test('applies the changesets and copies the new version to every manifest', () => {
  const result = versionPackages();
  assert.equal(result.status, 0, result.stdout + result.stderr);
  // The changesets CLI writes to the terminal, not to a pipe.
  assert.match(result.stdout + result.stderr, /All files have been updated/);

  assert.equal(JSON.parse(read('package.json')).version, '1.3.0');
  assert.match(read('CHANGELOG.md'), /^# pkg\n\n## 1\.3\.0\n\n### Minor Changes\n\n- Add a feature\.\n/);

  const treeSitter = JSON.parse(read('tree-sitter.json'));
  assert.equal(treeSitter.metadata.version, '1.3.0');
  assert.equal(treeSitter.metadata.license, 'MIT');

  // Only the package's own version line changes, not later `version = ` lines.
  assert.equal(read('Cargo.toml'), FILES['Cargo.toml'].replace('version = "1.2.3"', 'version = "1.3.0"'));
  assert.equal(read('pyproject.toml'), FILES['pyproject.toml'].replace('1.2.3', '1.3.0'));
  assert.equal(read('Makefile'), FILES.Makefile.replace('VERSION := 1.2.3', 'VERSION := 1.3.0'));
  assert.equal(read('CMakeLists.txt'), FILES['CMakeLists.txt'].replace('"1.2.3"', '"1.3.0"'));

  assert.equal(read('src/parser.c'), PARSER_C
    .replace('major_version = 1', 'major_version = 1')
    .replace('minor_version = 2', 'minor_version = 3')
    .replace('patch_version = 3', 'patch_version = 0'));

  const lock = JSON.parse(read('package-lock.json'));
  assert.equal(lock.version, '1.3.0');
  assert.equal(lock.packages[''].version, '1.3.0');
  assert.equal(lock.packages['node_modules/dep'].version, '1.2.3');
  assert.ok(read('package-lock.json').endsWith('}\n'));
  assert.equal(read('package-lock.json'), `${JSON.stringify(lock, null, 2)}\n`);
});

test('writes each part of a multi-digit version to the parser metadata', () => {
  writeFileSync(path.join(dir, '.changeset/brave-minor.md'), "---\n'pkg': major\n---\n\nBreak it.\n");
  for (const file of ['package.json', 'package-lock.json']) {
    writeFileSync(path.join(dir, file), read(file).replaceAll('1.2.3', '11.22.33'));
  }
  writeFileSync(path.join(dir, 'src/parser.c'), PARSER_C
    .replace('= 1,', '= 11,').replace('= 2,', '= 22,').replace('= 3,', '= 33,'));
  // Compact JSON: no space after the colon.
  writeFileSync(path.join(dir, 'tree-sitter.json'), JSON.stringify(JSON.parse(read('tree-sitter.json'))));
  const result = versionPackages();
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(read('src/parser.c'), PARSER_C
    .replace('= 1,', '= 12,').replace('= 2,', '= 0,').replace('= 3,', '= 0,'));
  assert.equal(JSON.parse(read('tree-sitter.json')).metadata.version, '12.0.0');
});

for (const file of ['tree-sitter.json', 'Cargo.toml', 'pyproject.toml', 'Makefile', 'CMakeLists.txt']) {
  test(`fails when ${file} has no version`, () => {
    writeFileSync(path.join(dir, file), 'nothing to see\n');
    const result = versionPackages();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, new RegExp(`no version found in ${file.replace('.', '\\.')}`));
  });
}

test('fails when src/parser.c has no language metadata', () => {
  writeFileSync(path.join(dir, 'src/parser.c'), PARSER_C.replace('.metadata', '.other'));
  const result = versionPackages();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /no language metadata found in src\/parser\.c/);
  // Nothing after the failed step is written.
  assert.equal(JSON.parse(read('package-lock.json')).version, '1.2.3');
});

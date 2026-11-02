// Unit tests for scripts/release-check.sh and scripts/release-notes.sh. Each
// test runs the scripts in a temporary directory holding the manifests and
// CHANGELOG.md they read.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));

const CHANGELOG = `# pkg

## 2.0.0

### Major Changes

- Second release.

  With a second paragraph.


## 1.10.0

- Not this one.

## 1.0.0

### Patch Changes

- First release.

## 0.9.0
`;

const MANIFESTS = {
  'package.json': '{ "name": "pkg", "version": "2.0.0" }\n',
  'package-lock.json': '{ "name": "pkg", "version": "2.0.0", "packages": {} }\n',
  'tree-sitter.json': '{ "grammars": [], "metadata": { "version": "2.0.0" } }\n',
  'Cargo.toml': '[package]\nname = "pkg"\nversion = "2.0.0"\n\n[dependencies]\nversion = "0.1.0"\n',
  'pyproject.toml': '[project]\nname = "pkg"\nversion = "2.0.0"\n\n[tool.x]\nversion = "0.1.0"\n',
  'Makefile': 'NAME := pkg\nVERSION := 2.0.0\n',
  'CMakeLists.txt': 'project(pkg\n        VERSION "2.0.0"\n        LANGUAGES C)\n  VERSION "0.1.0"\n',
  'CHANGELOG.md': CHANGELOG,
};

let dir;

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'release-scripts-'));
  for (const [file, text] of Object.entries(MANIFESTS)) writeFileSync(path.join(dir, file), text);
});

afterEach(() => rmSync(dir, { recursive: true, force: true }));

const sh = (script, ...args) =>
  spawnSync('bash', [path.join(root, 'scripts', script), ...args], { cwd: dir, encoding: 'utf8' });

const edit = (file, from, to) => {
  const text = readFileSync(path.join(dir, file), 'utf8');
  assert.ok(text.includes(from), `${from} in ${file}`);
  writeFileSync(path.join(dir, file), text.replace(from, to));
};

describe('release-notes.sh', () => {
  test('prints the section of a version without its heading or surrounding blank lines', () => {
    const result = sh('release-notes.sh', '2.0.0');
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout,
      '### Major Changes\n\n- Second release.\n\n  With a second paragraph.\n');
  });

  test('matches the version exactly, not as a prefix or a pattern', () => {
    assert.equal(sh('release-notes.sh', '1.0.0').stdout, '### Patch Changes\n\n- First release.\n');
    assert.equal(sh('release-notes.sh', '1.1').stdout, '');
    assert.equal(sh('release-notes.sh', '1.10.0').stdout, '- Not this one.\n');
    assert.equal(sh('release-notes.sh', '1.0.0').stdout.includes('Not this one'), false);
  });

  test('prints nothing for an empty section or an unknown version', () => {
    assert.equal(sh('release-notes.sh', '0.9.0').stdout, '');
    assert.equal(sh('release-notes.sh', '3.0.0').stdout, '');
  });

  test('stops at the next ## heading but not at deeper headings', () => {
    edit('CHANGELOG.md', '- Not this one.', '- Not this one.\n\n### Minor\n\n- Still 1.10.0.');
    assert.equal(sh('release-notes.sh', '1.10.0').stdout,
      '- Not this one.\n\n### Minor\n\n- Still 1.10.0.\n');
  });

  test('needs a version argument', () => {
    const result = sh('release-notes.sh');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /unbound variable/);
  });
});

describe('release-check.sh', () => {
  test('prints the version when every manifest and CHANGELOG.md agree', () => {
    const result = sh('release-check.sh');
    assert.equal(result.stderr, '');
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '2.0.0\n');
  });

  const fails = (message) => {
    const result = sh('release-check.sh');
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, `release-check: ${message}\n`);
  };

  for (const version of ['2.0', '2.0.0-rc.1', 'v2.0.0', '2.0.0.1', 'x.y.z', '2-0.0', '2.0-0']) {
    test(`fails when package.json's version is ${version}`, () => {
      for (const [file, from, to] of [
        ['package.json', '"2.0.0"', `"${version}"`],
      ]) edit(file, from, to);
      fails(`package.json version '${version}' is not X.Y.Z`);
    });
  }

  const MISMATCHES = [
    ['tree-sitter.json', '"version": "2.0.0"', '"version": "2.0.1"', "tree-sitter.json has version '2.0.1'"],
    ['Cargo.toml', 'version = "2.0.0"', 'version = "2.0.1"', "Cargo.toml has version '2.0.1'"],
    ['pyproject.toml', 'version = "2.0.0"', 'version = "2.0.1"', "pyproject.toml has version '2.0.1'"],
    ['Makefile', 'VERSION := 2.0.0', 'VERSION := 2.0.1', "Makefile has version '2.0.1'"],
    ['CMakeLists.txt', 'VERSION "2.0.0"', 'VERSION "2.0.1"', "CMakeLists.txt has version '2.0.1'"],
    ['package-lock.json', '"version": "2.0.0"', '"version": "2.0.1"', "package-lock.json has version '2.0.1'"],
    ['Cargo.toml', 'version = "2.0.0"', 'edition = "2021"', "Cargo.toml has version '0.1.0'"],
    ['Makefile', 'VERSION := 2.0.0', 'VERSION = 2.0.0', "Makefile has version ''"],
  ];
  for (const [file, from, to, message] of MISMATCHES) {
    test(`fails when ${file} says: ${to}`, () => {
      edit(file, from, to);
      fails(`${message}, package.json has '2.0.0'`);
    });
  }

  test('fails without a CHANGELOG.md section for the version', () => {
    edit('CHANGELOG.md', '## 2.0.0', '## 2.0.0-rc.1');
    // `## 2.0.0-rc.1` is not the section of 2.0.0.
    fails("CHANGELOG.md has no '## 2.0.0' section for version 2.0.0");
    edit('CHANGELOG.md', '## 2.0.0-rc.1', 'Version 2.0.0');
    fails("CHANGELOG.md has no '## 2.0.0' section for version 2.0.0");
    // A deeper heading is not a version section.
    edit('CHANGELOG.md', 'Version 2.0.0', '### 2.0.0');
    fails("CHANGELOG.md has no '## 2.0.0' section for version 2.0.0");
  });

  test('fails when the section is empty', () => {
    edit('CHANGELOG.md', `### Major Changes

- Second release.

  With a second paragraph.
`, '');
    fails("the '## 2.0.0' section of CHANGELOG.md is empty");
  });

  test('passes on this repository', () => {
    const result = spawnSync('bash', ['scripts/release-check.sh'], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), JSON.parse(readFileSync(path.join(root, 'package.json'))).version);
  });
});

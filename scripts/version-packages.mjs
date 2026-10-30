// Apply pending changesets, then copy the new version from package.json to
// package-lock.json, the other manifests (the files `tree-sitter version`
// updates) and the language metadata in the generated src/parser.c, which CI
// checks against a fresh `tree-sitter generate`.
//
//   npm run version-packages
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const run = (cmd, args) =>
  execFileSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });

run('npx', ['changeset', 'version']);
const { version } = JSON.parse(readFileSync('package.json', 'utf8'));

// [file, pattern whose first match holds the version in group 2]
const manifests = [
  ['tree-sitter.json', /("version":\s*")([^"]+)(")/],
  ['Cargo.toml', /^(version = ")([^"]+)(")/m],
  ['pyproject.toml', /^(version = ")([^"]+)(")/m],
  ['Makefile', /^(VERSION := )(\S+)()/m],
  ['CMakeLists.txt', /(VERSION ")([^"]+)(")/],
];
for (const [file, pattern] of manifests) {
  const text = readFileSync(file, 'utf8');
  if (!pattern.test(text)) throw new Error(`no version found in ${file}`);
  writeFileSync(file, text.replace(pattern, `$1${version}$3`));
}

const [major, minor, patch] = version.split('.');
const parserPath = 'src/parser.c';
const parser = readFileSync(parserPath, 'utf8');
const metadata =
  /(\.metadata = \{\s*\.major_version = )\d+(,\s*\.minor_version = )\d+(,\s*\.patch_version = )\d+/;
if (!metadata.test(parser)) throw new Error(`no language metadata found in ${parserPath}`);
writeFileSync(parserPath, parser.replace(metadata, `$1${major}$2${minor}$3${patch}`));

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
lock.version = version;
lock.packages[''].version = version;
writeFileSync('package-lock.json', `${JSON.stringify(lock, null, 2)}\n`);

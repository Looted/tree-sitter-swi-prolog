// Compiles and runs test/unit/scanner_test.c, the C unit tests of
// src/scanner.c. Set CC to pick the compiler, and SCANNER_TEST_DIR and
// SCANNER_TEST_CFLAGS (for example `--coverage`) to keep the build where
// gcov can read it.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const cc = process.env.CC || 'cc';
const hasCompiler = spawnSync(cc, ['--version']).status === 0;

test('the C unit tests of src/scanner.c pass', { skip: !hasCompiler && `no C compiler (${cc})` }, () => {
  const dir = process.env.SCANNER_TEST_DIR || mkdtempSync(path.join(tmpdir(), 'scanner-test-'));
  mkdirSync(dir, { recursive: true });
  const binary = path.join(dir, 'scanner_test');
  const flags = (process.env.SCANNER_TEST_CFLAGS || '').split(/\s+/).filter(Boolean);
  const build = spawnSync(cc, [
    '-std=c11', '-Wall', '-Wextra', '-Werror', '-O0', ...flags, '-Isrc',
    'test/unit/scanner_test.c', 'src/scanner.c', '-o', binary,
  ], { cwd: root, encoding: 'utf8' });
  assert.equal(build.status, 0, build.stderr);
  const run = spawnSync(binary, { cwd: dir, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /^\d+ checks, 0 failures$/m);
});

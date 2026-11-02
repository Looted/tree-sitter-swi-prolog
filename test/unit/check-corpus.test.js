// Unit tests for scripts/check-corpus.mjs. They run the script on small
// generated source trees, so they need the Wasm parser
// (`npx tree-sitter build --wasm`).

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const script = path.join(root, 'scripts/check-corpus.mjs');
const wasm = path.join(root, 'tree-sitter-swi_prolog.wasm');

function run(args, cwd = root) {
  return spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });
}

// Writes `files` ({relative path: text}) under a new temporary directory.
function tree(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'check-corpus-'));
  for (const [file, text] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    writeFileSync(path.join(dir, file), text);
  }
  return dir;
}

const lines = stdout => stdout.replace(/\n$/, '').split('\n');
const summary = stdout => lines(stdout).at(-1);
const worst = stdout => lines(stdout).slice(0, -1);

describe('check-corpus', () => {
  let dir;
  before(() => {
    dir = tree({
      // 2 terms, both clean. The comment and #! line are not terms.
      'clean.pl': '#!/usr/bin/env swipl\n% comment\na.\nb :- a.\n',
      // 3 terms; `c :- fx ) d.` does not parse.
      'nested/deeper/broken.plt': 'c :- fx ) d.\ne.\nf.\n',
      // 2 terms, both broken: `fy` is not a prefix operator.
      'worse.pro': 'g :- fy q.\nh :- fy q.\n',
      // 1 term that is an ERROR node.
      'error.pl': ') .\n',
      // Not Prolog: never read.
      'notes.txt': 'this ) is ( not prolog',
      'pl.bak': ') ) )',
      'old.pl.bak': ') ) )',
      'notes.plx': ') ) )',
    });
  });
  after(() => rmSync(dir, { recursive: true, force: true }));

  test('without directories it prints its usage and exits with 2', () => {
    const result = run(['--min', '0.5']);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /^usage: check-corpus\.mjs \[--wasm path\] \[--min ratio\] dir\.\.\./);
    assert.equal(result.stdout, '');
  });

  test('counts terms and files, skipping comments, #! lines and other files', () => {
    const result = run(['--wasm', wasm, '--min', '0', dir]);
    assert.equal(result.status, 0, result.stderr);
    // 8 terms in 4 files, 4 of them broken; only clean.pl has no error.
    assert.equal(summary(result.stdout),
      'files 1/4 clean, terms 4/8 clean (50.00%, minimum 0.00%)');
  });

  test('lists the files with errors, most broken terms first', () => {
    const result = run(['--wasm', wasm, '--min', '0', dir]);
    assert.deepEqual(worst(result.stdout), [
      `    2  ${path.join(dir, 'worse.pro')}`,
      `    1  ${path.join(dir, 'error.pl')}`,
      `    1  ${path.join(dir, 'nested/deeper/broken.plt')}`,
    ]);
  });

  test('lists at most 15 files', () => {
    const files = {};
    for (let i = 0; i < 17; i++) files[`f${String(i).padStart(2, '0')}.pl`] = 'p :- fy q.\n'.repeat(i + 1);
    const many = tree(files);
    try {
      const result = run(['--wasm', wasm, '--min', '0', many]);
      const listed = worst(result.stdout);
      assert.equal(listed.length, 15);
      // The file with the most broken terms comes first, padded to 5.
      assert.match(listed[0], /^ {3}17 {2}.*f16\.pl$/);
      assert.match(listed[14], /^ {4}3 {2}.*f02\.pl$/);
    } finally {
      rmSync(many, { recursive: true, force: true });
    }
  });

  test('fails below the minimum and passes at or above it', () => {
    assert.equal(run(['--wasm', wasm, '--min', '0.51', dir]).status, 1);
    assert.equal(run(['--wasm', wasm, '--min', '0.49', dir]).status, 0);
    // The minimum is inclusive.
    assert.equal(run(['--wasm', wasm, '--min', '0.5', dir]).status, 0);
  });

  test('defaults to a 99.5% minimum', () => {
    const result = run(['--wasm', wasm, dir]);
    assert.equal(result.status, 1);
    assert.match(summary(result.stdout), /minimum 99\.50%\)$/);
    const clean = tree({ 'a.pl': 'a.\n' });
    try {
      assert.equal(run(['--wasm', wasm, clean]).status, 0);
    } finally {
      rmSync(clean, { recursive: true, force: true });
    }
  });

  test('reads several directories', () => {
    const other = tree({ 'x.pl': 'x.\ny.\nz.\n' });
    try {
      const result = run(['--wasm', wasm, '--min', '0', dir, other]);
      assert.equal(summary(result.stdout),
        'files 2/5 clean, terms 7/11 clean (63.64%, minimum 0.00%)');
    } finally {
      rmSync(other, { recursive: true, force: true });
    }
  });

  test('counts a directory without terms as fully clean', () => {
    const empty = tree({ 'only-comments.pl': '% nothing here\n' });
    try {
      const result = run(['--wasm', wasm, '--min', '1', empty]);
      assert.equal(result.status, 0);
      assert.equal(summary(result.stdout),
        'files 1/1 clean, terms 0/0 clean (100.00%, minimum 100.00%)');
    } finally {
      rmSync(empty, { recursive: true, force: true });
    }
  });

  test('loads tree-sitter-swi_prolog.wasm from the working directory by default', () => {
    const result = run(['--min', '0', dir]);
    assert.equal(result.status, 0, result.stderr);
    assert.match(summary(result.stdout), /^files 1\/4 clean/);
    const elsewhere = run(['--min', '0', dir], tmpdir());
    assert.notEqual(elsewhere.status, 0);
  });
});

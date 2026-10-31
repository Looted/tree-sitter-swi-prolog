// End-to-end proof tests that run the Wasm parser and scripts/check-corpus.mjs.
// They need `tree-sitter build --wasm` first, and TEST-corpus-real-prolog
// needs SWI-Prolog's sources in examples/swipl-devel; test/proof/steps.json
// runs both before these tests. Each test is named after the Kibi test
// entity it proves.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { sourceCertificate, writeCodeCertificate } from 'kibi-cli/proof-certificates';
import { Language, Parser } from 'web-tree-sitter';

const root = fileURLToPath(new URL('../..', import.meta.url));
const wasm = path.join(root, 'tree-sitter-swi_prolog.wasm');

function checkCorpus(...args) {
  return spawnSync(process.execPath, ['scripts/check-corpus.mjs', '--wasm', wasm, ...args],
    { cwd: root, encoding: 'utf8' });
}

test('TEST-corpus-real-prolog: SWI-Prolog\'s own boot/ and library/ parse', () => {
  const run = checkCorpus('--min', '0.995',
    'examples/swipl-devel/boot', 'examples/swipl-devel/library');
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /terms \d+\/\d+ clean/);
});

test('TEST-corpus-coverage-gate: check-corpus fails below the minimum and CI runs it at 99.5%', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'corpus-'));
  try {
    writeFileSync(path.join(dir, 'clean.pl'), 'a.\nb :- a.\n');
    writeFileSync(path.join(dir, 'broken.pl'), 'c :- fx ) d.\ne.\n');
    // Some terms of broken.pl do not parse, so the clean share is below 1.
    const below = checkCorpus('--min', '1', dir);
    assert.equal(below.status, 1, below.stdout + below.stderr);
    const above = checkCorpus('--min', '0', dir);
    assert.equal(above.status, 0, above.stdout + above.stderr);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  // Kibi reads the corpus job's steps from ci.yml itself and checks them
  // against the requirement's fact.
  writeCodeCertificate(sourceCertificate({ testId: 'TEST-corpus-coverage-gate' }));
});

test('TEST-corpus-wasm: the Wasm parser loads in web-tree-sitter', async () => {
  await Parser.init();
  const parser = new Parser();
  parser.setLanguage(await Language.load(wasm));
  const tree = parser.parse('max(X, Y, X) :- X >= Y, !.');
  assert.equal(tree.rootNode.hasError, false);
  const clause = tree.rootNode.namedChildren[0];
  assert.equal(clause.type, 'clause');
  assert.equal(clause.childForFieldName('neck').text, ':-');
});

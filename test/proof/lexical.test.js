// End-to-end proof tests for the clause terminator, which src/scanner.c
// lexes. Each test is named after the Kibi test entity it proves;
// test/proof/steps.json runs them one at a time.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { failedCalls, ruleCertificate, writeCodeCertificate } from 'kibi-cli/proof-certificates';
import { CLAUSE_END_FOLLOWERS, LAYOUT_CODE_POINTS } from '../../grammar/lexical.js';
import { endsClauseBefore, parse } from './harness.js';

const name = cp => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;

test('TEST-lexical-clause-terminator: a . before layout, a % comment or the end of the input ends the clause', async () => {
  const root = parse('a. b.%c\nc.　d.').rootNode;
  assert.equal(root.hasError, false);
  assert.deepEqual(root.namedChildren.filter(n => n.type === 'clause').map(n => n.text),
    ['a.', 'b.', 'c.', 'd.']);

  // Rule certificate: Kibi calls endsClauseBefore on every follower in
  // CLAUSE_END_FOLLOWERS (grammar/lexical.js): each layout character, a `%`
  // comment and the end of the input.
  const certificate = await ruleCertificate({
    testId: 'TEST-lexical-clause-terminator',
    domains: {
      follower: { symbolId: 'SYM-grammar-clause-end-followers', members: CLAUSE_END_FOLLOWERS },
    },
    predicates: {
      ends_clause_before: {
        symbolId: 'SYM-proof-ends-clause-before',
        argTypes: ['follower'],
        decide: endsClauseBefore,
      },
    },
  });
  assert.deepEqual(failedCalls(certificate), []);
  writeCodeCertificate(certificate);
});

test('TEST-lexical-dot-in-term: a . before any other character does not end the clause', () => {
  // Every character of the Basic Multilingual Plane that is not layout or
  // `%`, and a few beyond it. Kibi has no finite domain to range over here,
  // so this is a test, not a certificate.
  const ends = [];
  for (let cp = 0; cp <= 0xFFFF; cp++) {
    if (cp >= 0xD800 && cp <= 0xDFFF) continue;
    if (LAYOUT_CODE_POINTS.includes(cp) || cp === 0x25) continue;
    if (endsClauseBefore(name(cp))) ends.push(name(cp));
  }
  for (const cp of [0x10000, 0x1F600, 0xE0001, 0x10FFFF]) if (endsClauseBefore(name(cp))) ends.push(name(cp));
  assert.deepEqual(ends, []);

  const value = source => parse(`x :- X = ${source}.\n`).rootNode.namedChildren[0]
    .childForFieldName('body').childForFieldName('right');
  assert.equal(value('a.b').type, 'dict_call');
  assert.equal(value('1.5').type, 'float');
  assert.equal(value("'.'").type, 'atom');
  assert.equal(value('(=..)').namedChildren[0].text, '=..');
});

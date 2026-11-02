// Unit tests for src/scanner.c, the external scanner that lexes the clause
// terminator `end`, through the native parser.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CLAUSE_END_FOLLOWERS, LAYOUT_CODE_POINTS } from '../../grammar/lexical.js';
import { endsClauseBefore, parse } from '../proof/harness.js';

const name = cp => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;

test('a . ends the clause before layout, a % comment or the end of the input', () => {
  for (const follower of CLAUSE_END_FOLLOWERS) assert.ok(endsClauseBefore(follower), follower);
});

test('a . before any other character of the Basic Multilingual Plane does not end the clause', () => {
  const ends = [];
  for (let cp = 0; cp <= 0xFFFF; cp++) {
    if (cp >= 0xD800 && cp <= 0xDFFF) continue;
    if (LAYOUT_CODE_POINTS.includes(cp) || cp === 0x25) continue;
    if (endsClauseBefore(name(cp))) ends.push(name(cp));
  }
  assert.deepEqual(ends, []);
  for (const cp of [0x10000, 0x1F600, 0x10FFFF]) assert.equal(endsClauseBefore(name(cp)), false);
});

test('endsClauseBefore rejects a follower it does not know', () => {
  assert.throws(() => endsClauseBefore('space'), /unknown follower space/);
  assert.throws(() => endsClauseBefore('U+12'), /unknown follower U\+12/);
});

test('layout between the term and the . is skipped', () => {
  const root = parse('a .\nb\t.\n').rootNode;
  assert.deepEqual(root.namedChildren.map(c => [c.type, c.hasError]), [['clause', false], ['clause', false]]);
  assert.equal(root.namedChildren[1].namedChildren.at(-1).text, '.');
});

test('a . inside a term is an atom, a dict call or part of a number', () => {
  const body = source => parse(`x :- X = ${source}.\n`).rootNode.namedChildren[0]
    .childForFieldName('body').childForFieldName('right');
  assert.equal(body("'.'").type, 'atom');
  assert.equal(body('a.b').type, 'dict_call');
  assert.equal(body('1.5').type, 'float');
  assert.equal(body('(=..)').namedChildren[0].text, '=..');
  const clause = parse('x :- X = "a. b".\n').rootNode.namedChildren[0];
  assert.equal(clause.hasError, false);
});

test('a terminator is lexed as end even where the grammar expects an operand', () => {
  // The unknown prefix operator `fy` leaves `q` without an operator, so the
  // parser recovers; the `.` still ends the clause and `r.` parses.
  const root = parse('p :- fy q.\nr.\n').rootNode;
  assert.equal(root.namedChildren.length, 2);
  assert.equal(root.namedChildren[0].hasError, true);
  assert.equal(root.namedChildren[1].text, 'r.');
  assert.equal(root.namedChildren[1].hasError, false);
});

// End-to-end proof tests for the queries in queries/. Each test is named
// after the Kibi test entity it proves; test/proof/steps.json runs them one
// at a time.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import Parser from 'tree-sitter';
import { language, parse } from './harness.js';

const query = name =>
  new Parser.Query(language, readFileSync(new URL(`../../queries/${name}.scm`, import.meta.url), 'utf8'));

const SOURCE = [
  ':- module(shapes, [area/2]).',
  '% Area of a shape.',
  'area(square(S), A) :- A is S * S.',
  'shapes:perimeter(square(S), P) :- P is 4 * S.',
  'grow(X, Y), X > 0 => Y = "bigger".',
  'unit.',
].join('\n');

// The text of every node a query captures under `name`.
function captured(queryName, name, source = SOURCE) {
  return query(queryName).captures(parse(source).rootNode)
    .filter(c => c.name === name)
    .map(c => c.node.text);
}

test('TEST-queries-highlights: highlights.scm captures comments, strings, numbers and variables', () => {
  assert.deepEqual(captured('highlights', 'comment'), ['% Area of a shape.']);
  assert.deepEqual(captured('highlights', 'string'), ['"bigger"']);
  assert.ok(captured('highlights', 'number').includes('4'));
  for (const variable of ['S', 'A', 'P', 'X', 'Y']) {
    assert.ok(captured('highlights', 'variable').includes(variable), variable);
  }
});

test('TEST-queries-tags: tags.scm tags definitions, modules and calls', () => {
  const tags = query('tags').matches(parse(SOURCE).rootNode).map(m => {
    const kind = m.captures.find(c => c.name.startsWith('definition.') || c.name.startsWith('reference.'));
    const name = m.captures.find(c => c.name === 'name');
    return `${kind.name} ${name.node.text}`;
  });
  for (const tag of [
    'definition.module shapes',
    'definition.function area',
    'definition.function perimeter',
    'definition.function grow',
    'definition.function unit',
    'reference.call square',
  ]) {
    assert.ok(tags.includes(tag), `${tag} in ${tags.join(', ')}`);
  }
});

test('TEST-queries-locals: locals.scm scopes variables to their clause, directive or query', () => {
  const source = 'p(X) :- q(X).\nr(X).\n:- s(Y).\n?- t(Z).';
  const captures = query('locals').captures(parse(source).rootNode);
  const scopes = captures.filter(c => c.name === 'local.scope').map(c => c.node.type);
  assert.deepEqual(scopes, ['clause', 'clause', 'directive', 'query']);
  // Every variable reference sits inside exactly one captured scope.
  const scopeNodes = captures.filter(c => c.name === 'local.scope').map(c => c.node);
  for (const ref of captures.filter(c => c.name === 'local.reference')) {
    const owners = scopeNodes.filter(s => s.startIndex <= ref.node.startIndex && ref.node.endIndex <= s.endIndex);
    assert.equal(owners.length, 1, ref.node.text);
  }
});

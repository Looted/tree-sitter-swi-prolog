// End-to-end proof tests for the queries in queries/. Each test is named
// after the Kibi test entity it proves; test/proof/steps.json runs them one
// at a time.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import Parser from 'tree-sitter';
import {
  exhaustiveCertificate, failedMembers, writeCodeCertificate,
} from 'kibi-cli/proof-certificates';
import { TOKEN_TYPES, TOP_LEVEL_TERM_TYPES } from '../../grammar/node-types.js';
import { TAG_KINDS } from '../../queries/tags.js';
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

// Runs `check` on every member of a domain the code defines, fails the test
// if any member fails, and leaves the exhaustive certificate for Kibi.
async function certifyEvery(testId, symbolId, members, check) {
  const certificate = await exhaustiveCertificate({ testId, domain: { symbolId, members }, check });
  assert.deepEqual(failedMembers(certificate), []);
  writeCodeCertificate(certificate);
}

// The text of every node a query captures under `name`.
function captured(queryName, name, source = SOURCE) {
  return query(queryName).captures(parse(source).rootNode)
    .filter(c => c.name === name)
    .map(c => c.node.text);
}

test('TEST-queries-highlights: highlights.scm captures comments, strings, numbers and variables', async () => {
  assert.deepEqual(captured('highlights', 'comment'), ['% Area of a shape.']);
  assert.deepEqual(captured('highlights', 'string'), ['"bigger"']);
  assert.ok(captured('highlights', 'number').includes('4'));
  for (const variable of ['S', 'A', 'P', 'X', 'Y']) {
    assert.ok(captured('highlights', 'variable').includes(variable), variable);
  }

  // Every token type of the generated parser gets a highlight.
  const source = [
    '#!/usr/bin/env swipl',
    '% comment',
    'p(X) :- X = f(a, "s", `b`, 0\'c, 1, 1.5, 1r3), X + 1.',
  ].join('\n');
  const highlighted = new Set(query('highlights').captures(parse(source).rootNode).map(c => c.node.type));
  await certifyEvery('TEST-queries-highlights', 'SYM-grammar-token-types', TOKEN_TYPES, type => {
    assert.ok(highlighted.has(type), `no highlight for ${type}`);
  });
});

test('TEST-queries-tags: tags.scm tags definitions, modules and calls', async () => {
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

  // Every kind of tag tags.scm declares, with the README's cases for each:
  // plain, module-qualified and guarded single-sided-unification heads,
  // module declarations and calls.
  await certifyEvery('TEST-queries-tags', 'SYM-queries-tag-kinds', TAG_KINDS, kind => {
    const expected = TAG_EXPECTATIONS[kind];
    assert.ok(expected, `no expectation for tag kind ${kind}`);
    for (const name of expected) assert.ok(tags.includes(`${kind} ${name}`), `${kind} ${name}`);
  });
});

const TAG_EXPECTATIONS = {
  'definition.function': ['area', 'perimeter', 'grow', 'unit'],
  'definition.module': ['shapes'],
  'reference.call': ['square'],
};

test('TEST-queries-locals: locals.scm scopes variables to their clause, directive or query', async () => {
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

  // Every top-level term type of the generated parser is a scope that holds
  // its own variables.
  await certifyEvery('TEST-queries-locals', 'SYM-grammar-top-level-term-types', TOP_LEVEL_TERM_TYPES, type => {
    const term = scopeNodes.find(n => n.type === type);
    assert.ok(term, `${type} is not a scope`);
    const own = captures.filter(c => c.node.startIndex >= term.startIndex && c.node.endIndex <= term.endIndex);
    assert.ok(own.some(c => c.name === 'local.reference' && c.node.type === 'variable'), `no variable in ${type}`);
  });
});

// End-to-end proof tests for the syntax the README promises. Each test is
// named after the Kibi test entity it proves; test/proof/steps.json runs
// them one at a time.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parse } from './harness.js';

function* descendants(node) {
  yield node;
  for (const child of node.namedChildren) yield* descendants(child);
}

const ofType = (node, type) => [...descendants(node)].filter(n => n.type === type);

function parseClean(source) {
  const tree = parse(source);
  assert.equal(tree.rootNode.hasError, false, `${source}\n${tree.rootNode}`);
  return tree.rootNode;
}

// The value on the right of `X = Value` in `x :- X = Value.`
function valueOf(source) {
  const clause = parseClean(`x :- X = ${source}.`).namedChildren[0];
  return clause.childForFieldName('body').childForFieldName('right');
}

test('TEST-syntax-dicts: dicts and functional notation on dicts parse', () => {
  const anonymous = valueOf('_{name: "x"}');
  assert.equal(anonymous.type, 'dict');
  assert.equal(anonymous.childForFieldName('tag').text, '_');
  assert.equal(ofType(anonymous, 'dict_pair').length, 1);

  const tagged = valueOf('Tag{a: 1, b: 2}');
  assert.equal(tagged.type, 'dict');
  assert.equal(tagged.childForFieldName('tag').text, 'Tag');
  assert.equal(ofType(tagged, 'dict_pair').length, 2);

  const key = valueOf('D.key');
  assert.equal(key.type, 'dict_call');
  assert.equal(key.childForFieldName('dict').text, 'D');
  assert.equal(key.childForFieldName('function').text, 'key');

  const put = valueOf('D.put(k, V)');
  assert.equal(put.type, 'dict_call');
  assert.equal(put.childForFieldName('function').type, 'compound_term');
});

test('TEST-syntax-literals: strings, codes and number forms parse', () => {
  const literals = [
    ['"a string"', 'string'],
    ['`back quoted`', 'back_quoted_string'],
    ["0'c", 'char_code'],
    ["16'FF", 'integer'],
    ['1 000 000', 'integer'],
    ['1r3', 'rational'],
    ['1.0Inf', 'float'],
  ];
  for (const [source, type] of literals) {
    const node = valueOf(source);
    assert.equal(node.type, type, source);
    assert.equal(node.text, source);
  }
});

test('TEST-syntax-lexical: Unicode names, multi-line quotes, comments and #! parse', () => {
  const root = parseClean([
    '#!/usr/bin/env swipl',
    '% a line comment',
    '/* a block',
    '   comment */',
    "größe('multi",
    "line', Ünïcode).",
  ].join('\n'));
  assert.equal(root.namedChildren[0].type, 'shebang');
  assert.equal(ofType(root, 'comment').length, 2);
  const [clause] = ofType(root, 'clause');
  const head = clause.childForFieldName('head');
  assert.equal(head.childForFieldName('functor').text, 'größe');
  const [quoted, variable] = head.childForFieldName('arguments').namedChildren;
  assert.equal(quoted.type, 'atom');
  assert.equal(quoted.text, "'multi\nline'");
  assert.equal(variable.type, 'variable');
  assert.equal(variable.text, 'Ünïcode');
});

test('TEST-syntax-tree-shape: top-level terms are clauses, directives or queries', () => {
  const root = parseClean([
    ':- module(m, [max/3]).',
    'fact(a).',
    'max(X, Y, X) :- X >= Y, !.',
    'greeting --> [hello].',
    'p(X), X > 0 => q.',
    '?- max(1, 2, M).',
  ].join('\n'));
  assert.deepEqual(root.namedChildren.map(n => n.type),
    ['directive', 'clause', 'clause', 'clause', 'clause', 'query']);
  const [, fact, rule, dcg, ssu] = root.namedChildren;
  assert.equal(fact.childForFieldName('head').text, 'fact(a)');
  assert.equal(fact.childForFieldName('neck'), null);
  for (const [clause, neck] of [[rule, ':-'], [dcg, '-->'], [ssu, '=>']]) {
    assert.ok(clause.childForFieldName('head'));
    assert.equal(clause.childForFieldName('neck').text, neck);
    assert.ok(clause.childForFieldName('body'));
  }
});

test('TEST-syntax-unknown-infix: an unknown infix operator reads at priority 700', () => {
  for (const op of ['===>', 'cis']) {
    const body = parseClean(`x :- a, b ${op} c + d.`).namedChildren[0].childForFieldName('body');
    // `,` (1000) is above 700 and `+` (500) below, so the unknown operator
    // takes `b` and `c + d` as its operands.
    assert.equal(body.childForFieldName('operator').text, ',');
    const unknown = body.childForFieldName('right');
    assert.equal(unknown.type, 'binary_operation');
    assert.equal(unknown.childForFieldName('operator').text, op);
    assert.equal(unknown.childForFieldName('left').text, 'b');
    assert.equal(unknown.childForFieldName('right').text, 'c + d');
  }
});

test('TEST-syntax-negative-number: a negative number is prefix minus on the number', () => {
  const value = valueOf('-1');
  assert.equal(value.type, 'prefix_operation');
  assert.equal(value.childForFieldName('operator').text, '-');
  const argument = value.childForFieldName('argument');
  assert.equal(argument.type, 'integer');
  assert.equal(argument.text, '1');
});

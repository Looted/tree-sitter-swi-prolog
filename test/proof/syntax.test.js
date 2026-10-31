// End-to-end proof tests for the syntax the README promises. Each test is
// named after the Kibi test entity it proves; test/proof/steps.json runs
// them one at a time.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  exhaustiveCertificate, failedCalls, failedMembers, ruleCertificate, writeCodeCertificate,
} from 'kibi-cli/proof-certificates';
import { NAMED_NODE_TYPES, NODE_TYPES, TOP_LEVEL_TERM_TYPES } from '../../grammar/node-types.js';
import { negatesAsPrefixMinus, parse, parsesExamples } from './harness.js';

function* descendants(node) {
  yield node;
  for (const child of node.namedChildren) yield* descendants(child);
}

const ofType = (node, type) => [...descendants(node)].filter(n => n.type === type);

// A rule certificate: Kibi calls `decide` on every named node type of the
// generated parser, at ingest as well, and checks the requirement's set
// fact (the node types the README names) against what it decides.
async function certifyNodeTypes(testId, predicate, symbolId, decide) {
  const certificate = await ruleCertificate({
    testId,
    domains: { node_type: { symbolId: 'SYM-grammar-named-node-types', members: NAMED_NODE_TYPES } },
    predicates: { [predicate]: { symbolId, argTypes: ['node_type'], decide } },
  });
  assert.deepEqual(failedCalls(certificate), []);
  writeCodeCertificate(certificate);
}

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

test('TEST-syntax-dicts: dicts and functional notation on dicts parse', async () => {
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

  for (const type of ['dict', 'dict_call']) assert.ok(parsesExamples(type), type);
  await certifyNodeTypes('TEST-syntax-dicts', 'parses_examples', 'SYM-proof-parses-examples', parsesExamples);
});

test('TEST-syntax-literals: strings, codes and number forms parse', async () => {
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
  await certifyNodeTypes('TEST-syntax-literals', 'parses_examples', 'SYM-proof-parses-examples', parsesExamples);
});

test('TEST-syntax-lexical: Unicode names, multi-line quotes, comments and #! parse', async () => {
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
  await certifyNodeTypes('TEST-syntax-lexical', 'parses_examples', 'SYM-proof-parses-examples', parsesExamples);
});

test('TEST-syntax-tree-shape: top-level terms are clauses, directives or queries', async () => {
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

  // Exhaustive certificate over the top-level term types of the generated
  // parser: each one parses, and a clause has head, neck and body fields.
  const certificate = await exhaustiveCertificate({
    testId: 'TEST-syntax-tree-shape',
    domain: { symbolId: 'SYM-grammar-top-level-term-types', members: TOP_LEVEL_TERM_TYPES },
    check: checkTopLevelTerm,
  });
  assert.deepEqual(failedMembers(certificate), []);
  writeCodeCertificate(certificate);
});

// Samples of each top-level term type; for a clause, the neck it has.
const TOP_LEVEL_SAMPLES = {
  clause: [
    ['fact(a).', null],
    ['max(X, Y, X) :- X >= Y, !.', ':-'],
    ['greeting --> [hello].', '-->'],
    ['p(X), X > 0 => q.', '=>'],
  ],
  directive: [[':- module(m, [max/3]).']],
  query: [['?- max(1, 2, M).']],
};

function checkTopLevelTerm(type) {
  const samples = TOP_LEVEL_SAMPLES[type];
  assert.ok(samples, `no sample for top-level term type ${type}`);
  for (const [sample, neck] of samples) {
    const [term] = parseClean(sample).namedChildren;
    assert.equal(term.type, type, sample);
    if (type !== 'clause') continue;
    assert.ok(term.childForFieldName('head'), sample);
    assert.equal(term.childForFieldName('neck')?.text ?? null, neck, sample);
    assert.equal(term.childForFieldName('body') !== null, neck !== null, sample);
  }
  if (type === 'clause') {
    const { fields } = NODE_TYPES.find(t => t.type === 'clause');
    assert.deepEqual(Object.keys(fields).sort(), ['body', 'head', 'neck']);
    assert.equal(fields.head.required, true);
  }
}

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

test('TEST-syntax-negative-number: a negative number is prefix minus on the number', async () => {
  const value = valueOf('-1');
  assert.equal(value.type, 'prefix_operation');
  assert.equal(value.childForFieldName('operator').text, '-');
  const argument = value.childForFieldName('argument');
  assert.equal(argument.type, 'integer');
  assert.equal(argument.text, '1');
  await certifyNodeTypes('TEST-syntax-negative-number', 'negates_as_prefix_minus',
    'SYM-proof-negates-as-prefix-minus', negatesAsPrefixMinus);
});

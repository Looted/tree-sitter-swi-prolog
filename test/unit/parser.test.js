// Grammar coverage: the generated parser produces every structure
// src/node-types.json says it can. An item is a node type, a field of a
// type holding a node of a given type, or an unnamed child of a given type.
// Each item gets a sample program that parses without errors and contains
// it, so a grammar change that adds a node type, field or child type fails
// here until a sample shows it.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { OPERATOR_NAMES } from '../../grammar/operators.js';
import { parse } from '../proof/harness.js';
import { corpusInputs, coveredItems, expectedItems } from './grammar-coverage.js';

// A term of each named type that can stand where a term is expected.
const TERMS = {
  atom: 'a',
  variable: 'V',
  integer: '1',
  float: '1.5',
  rational: '1r3',
  char_code: "0'c",
  string: '"s"',
  back_quoted_string: '`b`',
  compound_term: 'f(x)',
  list: '[1]',
  curly_term: '{c}',
  dict: '_{k: 1}',
  dict_call: 'D.k',
  index_term: 'A[1]',
  parenthesized_term: '(p)',
  binary_operation: '1 + 2',
  prefix_operation: '- x',
};

// Programs that put a term `t` in a field or child position.
const POSITIONS = {
  'clause.head': t => `${t}.`,
  'clause.body': t => `h :- ${t}.`,
  'directive.body': t => `:- ${t}.`,
  'query.body': t => `?- ${t}.`,
  'binary_operation.left': t => `x :- ${t} = y.`,
  'binary_operation.right': t => `x :- y = ${t}.`,
  'prefix_operation.argument': t => `x :- \\+ ${t}.`,
  'arguments[]': t => `x :- f(${t}).`,
  'list[]': t => `x :- X = [${t}].`,
  'list.tail': t => `x :- X = [a|${t}].`,
  'curly_term[]': t => `x :- X = {${t}}.`,
  'parenthesized_term[]': t => `x :- X = (${t}).`,
  'dict_pair.value': t => `x :- X = _{k: ${t}}.`,
  'index_term.index': t => `x :- X = A[${t}].`,
};

// Items no position above produces, each with a sample.
const SAMPLES = {
  'type index_term': 'x :- X = A[1].',
  'index_term.object variable': 'x :- X = A[1].',
  'index_term.object dict_call': 'x :- X = D.k[1].',
  'index_term.object index_term': 'x :- X = A[1][2].',
  'dict.tag atom': 'x :- X = t{}.',
  'dict.tag variable': 'x :- X = T{}.',
  'dict_call.dict atom': 'x :- X = a.b.',
  'dict_call.dict variable': 'x :- X = D.b.',
  'dict_call.dict dict': 'x :- X = _{a: 1}.a.',
  'dict_call.dict dict_call': 'x :- X = D.a.b.',
  'dict_call.dict index_term': 'x :- X = A[1].k.',
  'dict_call.function variable': 'x :- X = D.K.',
  'dict_call.function atom': "x :- X = D.'k'.",
  'dict_call.function integer': 'x :- X = D.1.',
  'dict_call.function compound_term': 'x :- X = D.put(k, 1).',
  'dict_pair.key atom': 'x :- X = _{k: 1}.',
  'dict_pair.key integer': 'x :- X = _{1: 1}.',
  'source_file[] shebang': '#!/usr/bin/env swipl\nx.',
  'type shebang': '#!/usr/bin/env swipl\nx.',
  'type comment': '% c\nx.',
  'clause.neck operator': 'h :- b.',
  'type "?-"': '?- x.',
  'type "."': 'x :- X = D.k.',
  'type "!"': 'x :- !.',
  'type "|"': 'x :- X = [a|b].',
};

// A program with the structure every Prolog file has: clauses, a
// directive, a query, compound terms, operators, lists, curly terms and
// dicts.
const BASIC = 'x :- f(a, b), [c] = {d}, _{k: 1} = (- e).\n:- y.\n?- z.\n';
const BASIC_ITEMS = [
  'type source_file', 'source_file[] clause', 'source_file[] directive', 'source_file[] query',
  'type clause', 'clause[] end', 'type directive', 'directive[] end', 'type query', 'query[] end',
  'type end', 'type operator', 'type arguments', 'compound_term.functor atom',
  'compound_term.arguments arguments', 'binary_operation.operator operator',
  'prefix_operation.operator operator', 'type dict_pair', 'dict[] dict_pair',
  'type "("', 'type ")"', 'type ","', 'type "["', 'type "]"', 'type "{"', 'type "}"',
];

function sampleFor(item) {
  if (SAMPLES[item]) return SAMPLES[item];
  if (BASIC_ITEMS.includes(item)) return BASIC;
  const [position, type] = item.split(' ');
  if (position === 'type') {
    // An anonymous operator token, written as a plain atom.
    const op = type.startsWith('"') ? JSON.parse(type) : null;
    if (op && OPERATOR_NAMES.includes(op)) return `x :- f(${op}).`;
    if (TERMS[type]) return `x :- X = ${TERMS[type]}.`;
    return null;
  }
  const program = POSITIONS[position];
  const term = TERMS[type];
  return program && term ? program(term) : null;
}

test('every node type, field and child type of the grammar has a sample that produces it', () => {
  const missing = [];
  for (const item of expectedItems()) {
    const sample = sampleFor(item);
    if (sample === null) {
      missing.push(`${item}: no sample`);
      continue;
    }
    const tree = parse(sample);
    if (tree.rootNode.hasError) missing.push(`${item}: ${JSON.stringify(sample)} has errors`);
    else if (!coveredItems(tree).has(item)) missing.push(`${item}: not in ${JSON.stringify(sample)}`);
  }
  assert.deepEqual(missing, []);
});

test('the tree-sitter corpus parses and covers part of the grammar', () => {
  const inputs = corpusInputs();
  assert.ok(inputs.length >= 20, String(inputs.length));
  const covered = new Set();
  for (const input of inputs) coveredItems(parse(input), covered);
  const expected = expectedItems();
  assert.ok([...covered].some(item => expected.has(item)));
});

test('an item outside node-types.json is never produced', () => {
  // Coverage counts only what node-types.json lists, and a parse of valid
  // Prolog never reaches anything else.
  const expected = expectedItems();
  for (const input of [...corpusInputs(), ...Object.values(SAMPLES)]) {
    const tree = parse(input);
    if (tree.rootNode.hasError) continue;
    for (const item of coveredItems(tree)) assert.ok(expected.has(item), `${item} in ${input}`);
  }
});

// Predicates that drive the generated parser, for Kibi rule certificates.
// Kibi calls each predicate on every member of its domain and records what
// the parser decides, so each one parses a real sample and inspects the tree.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodeGypBuild from 'node-gyp-build';
import Parser from 'tree-sitter';
import { Language as WasmLanguage, Parser as WasmParser } from 'web-tree-sitter';
import {
  INFIX_HIGH, INFIX_LOW, PREFIX_HIGH, PREFIX_LOW, NECKS, OPERATOR_NAMES,
} from '../../grammar/operators.js';

// Load the native parser directly: bindings/node/index.js looks for a
// prebuilt binary under Bun, and Kibi may evaluate this module with Bun.
const root = fileURLToPath(new URL('../..', import.meta.url));
export const language = nodeGypBuild(root);

const parser = new Parser();
parser.setLanguage(language);

/** Parses Prolog source and returns the syntax tree. */
export function parse(source) {
  return parser.parse(source);
}

function* descendants(node) {
  yield node;
  for (const child of node.namedChildren) yield* descendants(child);
}

// The source parses without errors and has a `type` node whose `field`
// child is exactly `text`.
function hasNodeWith(source, type, field, text) {
  const tree = parse(source);
  if (tree.rootNode.hasError) return false;
  for (const node of descendants(tree.rootNode)) {
    if (node.type === type && node.childForFieldName(field)?.text === text) return true;
  }
  return false;
}

const declaredIn = (table, op) => table.some(([, , ops]) => ops.includes(op));

/**
 * Whether the parser reads `op` as an operator in every role the grammar's
 * operator table gives it: the neck of a clause, an infix operator between
 * two operands, or a prefix operator before its argument.
 */
export function parsesAsOperator(op) {
  const checks = [];
  if (NECKS.includes(op)) {
    checks.push(hasNodeWith(`a ${op} b.`, 'clause', 'neck', op));
  }
  if (op === '?-') {
    checks.push(parse('?- a.').rootNode.namedChildren[0]?.type === 'query');
  }
  if (declaredIn([...INFIX_HIGH, ...INFIX_LOW], op)) {
    checks.push(hasNodeWith(`x :- (a ${op} b).`, 'binary_operation', 'operator', op));
  }
  if (declaredIn([...PREFIX_HIGH, ...PREFIX_LOW], op)) {
    checks.push(hasNodeWith(`x :- (${op} a).`, 'prefix_operation', 'operator', op));
  }
  return checks.length > 0 && checks.every(Boolean);
}

// The README's examples of each syntax form, by the node type the parser
// gives them. Each entry is [source, text]: `source` is a whole program and
// `text` the exact text of the node it must contain.
const value = text => [`x :- X = ${text}.`, text];
const leading = text => [`${text}\nx.`, text];

export const EXAMPLES = {
  // Literals (README: strings, back-quoted strings, 0'c character codes,
  // radix integers, digit groups, rationals and special floats).
  string: [value('"a string"'), value('"multi\nline"')],
  back_quoted_string: [value('`back quoted`')],
  char_code: [value("0'c")],
  integer: [value('42'), value("16'FF"), value('1 000 000')],
  rational: [value('1r3')],
  float: [value('1.5'), value('1.0Inf')],
  // Dicts and functional notation on dicts.
  dict: [value('_{name: "x"}'), value('Tag{a: 1, b: 2}')],
  dict_call: [value('D.key'), value('D.put(k, V)')],
  // Lexical syntax: Unicode names, multi-line quoted text, comments, #!.
  atom: [value('größe'), value("'multi\nline'")],
  variable: [value('X'), value('Ünïcode')],
  comment: [leading('% a line comment'), leading('/* a block\n   comment */')],
  shebang: [leading('#!/usr/bin/env swipl')],
};

/**
 * Whether every README example of node type `type` parses without errors to
 * a node of that type spanning exactly the example. False for a type with
 * no examples.
 */
export function parsesExamples(type) {
  const examples = EXAMPLES[type] ?? [];
  return examples.length > 0 && examples.every(([source, text]) => {
    const tree = parse(source);
    if (tree.rootNode.hasError) return false;
    return [...descendants(tree.rootNode)].some(n => n.type === type && n.text === text);
  });
}

/**
 * Whether every example of number type `type`, written with a leading `-`,
 * parses as the prefix operator `-` applied to that number. False for a
 * type that is not a number.
 */
export function negatesAsPrefixMinus(type) {
  if (!['integer', 'float', 'rational'].includes(type)) return false;
  return EXAMPLES[type].every(([, text]) => {
    const tree = parse(`x :- X = -${text}.`);
    if (tree.rootNode.hasError) return false;
    const negated = tree.rootNode.namedChildren[0]
      ?.childForFieldName('body')?.childForFieldName('right');
    const argument = negated?.childForFieldName('argument');
    return negated?.type === 'prefix_operation'
      && negated.childForFieldName('operator')?.text === '-'
      && argument?.type === type
      && argument.text === text;
  });
}

// Operators of each unknown-infix kind that no operator table declares.
export const UNKNOWN_INFIX_SAMPLES = {
  symbolic: ['===>', '<~>'],
  alphanumeric: ['cis', 'likes'],
};

/**
 * Whether the parser reads every sample operator of `kind` (symbolic or
 * alphanumeric) between two operands as an infix operator at priority 700:
 * the clause parses without errors and, in `a, b OP c + d`, the operator sits
 * below `,` (1000) and above `+` (500), so it takes `b` and `c + d`. False for
 * a kind with no samples or a sample the operator tables already declare.
 */
export function readsAsUnknownInfix(kind) {
  const samples = UNKNOWN_INFIX_SAMPLES[kind] ?? [];
  return samples.length > 0 && samples.every((op) => {
    if (OPERATOR_NAMES.includes(op)) return false;
    const tree = parse(`x :- a, b ${op} c + d.`);
    if (tree.rootNode.hasError) return false;
    const body = tree.rootNode.namedChildren[0]?.childForFieldName('body');
    const unknown = body?.childForFieldName('right');
    return body?.childForFieldName('operator')?.text === ','
      && unknown?.type === 'binary_operation'
      && unknown.childForFieldName('operator')?.text === op
      && unknown.childForFieldName('left')?.text === 'b'
      && unknown.childForFieldName('right')?.text === 'c + d';
  });
}

/**
 * Whether the Wasm parser in `file` (relative to the repository root) loads
 * in web-tree-sitter and parses a clause without errors.
 */
export async function loadsInWebTreeSitter(file) {
  await WasmParser.init();
  const wasmParser = new WasmParser();
  wasmParser.setLanguage(await WasmLanguage.load(path.join(root, file)));
  const tree = wasmParser.parse('max(X, Y, X) :- X >= Y, !.');
  const clause = tree.rootNode.namedChildren[0];
  return !tree.rootNode.hasError && clause?.type === 'clause'
    && clause.childForFieldName('neck')?.text === ':-';
}

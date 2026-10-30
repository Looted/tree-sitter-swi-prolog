// Predicates that drive the generated parser, for Kibi rule certificates.
// Kibi calls each predicate on every member of its domain and records what
// the parser decides, so each one parses a real sample and inspects the tree.

import { fileURLToPath } from 'node:url';
import nodeGypBuild from 'node-gyp-build';
import Parser from 'tree-sitter';
import {
  INFIX_HIGH, INFIX_LOW, PREFIX_HIGH, PREFIX_LOW, NECKS,
} from '../../grammar/operators.js';

// Load the native parser directly: bindings/node/index.js looks for a
// prebuilt binary under Bun, and Kibi may evaluate this module with Bun.
export const language = nodeGypBuild(fileURLToPath(new URL('../..', import.meta.url)));

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

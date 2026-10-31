/**
 * @file Node types of the generated SWI-Prolog parser
 * @license MIT
 */

// Sets of node types read from src/node-types.json, which `tree-sitter
// generate` writes from grammar.js. They are derived, never restated, so a
// grammar change that adds or removes a node type changes them too. The
// Kibi proofs in test/proof/ range over them.

import { readFileSync } from 'node:fs';

/** The node types of the generated parser, as tree-sitter describes them. */
export const NODE_TYPES = JSON.parse(
  readFileSync(new URL('../src/node-types.json', import.meta.url), 'utf8'),
);

/** Every named node type. */
export const NAMED_NODE_TYPES = NODE_TYPES.filter(t => t.named).map(t => t.type);

const sourceFile = NODE_TYPES.find(t => t.type === 'source_file');

/**
 * The node types a top-level term can have: the children of `source_file`,
 * without `shebang`, which is the `#!` line before the first term rather
 * than a term.
 */
export const TOP_LEVEL_TERM_TYPES = sourceFile.children.types
  .map(t => t.type)
  .filter(type => type !== 'shebang');

/**
 * The token types: named node types with no fields and no children, such as
 * `atom`, `variable`, `string` and `comment`.
 */
export const TOKEN_TYPES = NODE_TYPES
  .filter(t => t.named && !t.subtypes && !t.children
    && Object.keys(t.fields ?? {}).length === 0)
  .map(t => t.type);

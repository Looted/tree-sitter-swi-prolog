/**
 * @file Operator tables of the SWI-Prolog grammar
 * @license MIT
 */

// Default SWI-Prolog operator table (see `current_op/3` in a fresh `swipl`).
// Prolog priorities run the other way from tree-sitter precedences, so each
// rule uses `1200 - priority`.
//
// Operators at priority 1200 only appear as the neck of a clause, in a
// directive, or inside parentheses; see `clause`, `directive` and `_term_1200`.
export const INFIX_HIGH = [
  // [priority, type, operators]
  // library(chr)
  [1190, 'xfx', ['==>', '<=>']],
  [1180, 'xfx', ['\\']],
  [1150, 'xfx', ['pragma']],
  [1105, 'xfy', ['|']],
  [1100, 'xfy', [';']],
  [1050, 'xfy', ['->', '*->']],
  [1000, 'xfy', [',']],
];

export const INFIX_LOW = [
  [990, 'xfx', [':=']],
  // library(clpfd)
  [760, 'yfx', ['#<==>']],
  [750, 'xfy', ['#==>']],
  [750, 'yfx', ['#<==']],
  [740, 'yfx', ['#\\/']],
  [730, 'yfx', ['#\\']],
  [720, 'yfx', ['#/\\']],
  [700, 'xfx', ['#>', '#<', '#>=', '#=<', '#=', '#\\=', 'in', 'ins', 'in_set']],
  [450, 'xfx', ['..']],
  [700, 'xfx', [
    '=', '\\=', '==', '\\==', '@<', '@>', '@=<', '@>=', '=..', 'is', '=:=',
    '=\\=', '<', '>', '=<', '>=', '>:<', ':<', 'as', '=@=', '\\=@=', '?=',
  ]],
  [600, 'xfy', [':']],
  [500, 'yfx', ['+', '-', '/\\', '\\/', 'xor']],
  [400, 'yfx', ['*', '/', '//', 'rem', 'mod', 'div', '<<', '>>', 'divmod', 'rdiv']],
  [200, 'xfx', ['**']],
  [200, 'xfy', ['^']],
  // library(semweb/rdf_db) literals: Value^^Type, Text@Lang
  [110, 'xfx', ['^^']],
];

export const PREFIX_HIGH = [
  [1150, 'fx', [
    'dynamic', 'discontiguous', 'initialization', 'meta_predicate',
    'module_transparent', 'multifile', 'public', 'thread_local',
    'thread_initialization', 'volatile', 'table',
    // declarations from common libraries
    'rdf_meta', 'persistent', 'record', 'html_meta', 'chr_constraint', 'chr_type', 'chr_option',
  ]],
];

export const PREFIX_LOW = [
  [900, 'fy', ['\\+']],
  [710, 'fy', ['#\\']],
  [500, 'fx', ['?']],
  [200, 'fy', ['-', '+', '\\']],
  [100, 'fx', ['@']],
  // library(wasm)
  [50, 'fx', ['#']],
  [1, 'fx', ['$']],
];

export const NECKS = [':-', '-->', '=>'];

// Every operator name. Each one is also a plain atom wherever an operand is
// not expected, e.g. `foo(-, +)` or `X = (=)`.
export const OPERATOR_NAMES = [...new Set([
  ...NECKS, '?-',
  ...[...INFIX_HIGH, ...INFIX_LOW, ...PREFIX_HIGH, ...PREFIX_LOW]
    .flatMap(([, , ops]) => ops),
])].filter(op => op !== ',' && op !== '|');


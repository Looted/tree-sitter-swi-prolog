/**
 * @file Lexical classes of the SWI-Prolog grammar
 * @license MIT
 */

// Layout is Unicode White_Space, as in SWI-Prolog, where `code_type(C,
// space)` holds for these characters. grammar.js skips it between tokens,
// and src/scanner.c's is_layout() must accept exactly the same code points:
// a `.` followed by one of them ends a clause.

/** The code points of Unicode White_Space. */
export const LAYOUT_CODE_POINTS = [
  0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x20, 0x85, 0xA0, 0x1680,
  0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
  0x2028, 0x2029, 0x202F, 0x205F, 0x3000,
];

const hex = cp => `\\u{${cp.toString(16)}}`;

/** A regular expression that matches one layout character. */
export const LAYOUT = new RegExp(`[${LAYOUT_CODE_POINTS.map(hex).join('')}]`, 'u');

/**
 * What can follow a `.` that ends a clause: each layout character, by its
 * `U+XXXX` name, a `%` line comment and the end of the input.
 */
export const CLAUSE_END_FOLLOWERS = [
  ...LAYOUT_CODE_POINTS.map(cp => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`),
  'line_comment',
  'end_of_input',
];

/**
 * @file SWI-Prolog grammar for tree-sitter
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

import {
  INFIX_HIGH, INFIX_LOW, PREFIX_HIGH, PREFIX_LOW, NECKS, OPERATOR_NAMES,
} from './grammar/operators.js';

const precOf = priority => 1200 - priority;

function infix($, [priority, type, ops], operand) {
  const op = field('operator', choice(...ops.map(o => alias(o, $.operator))));
  const body = seq(field('left', operand), op, field('right', operand));
  const p = precOf(priority);
  return type === 'xfy' ? prec.right(p, body) : prec.left(p, body);
}

function prefix($, [priority, type, ops], operand) {
  const op = field('operator', choice(...ops.map(o => alias(o, $.operator))));
  const body = seq(op, field('argument', operand));
  const p = precOf(priority);
  return type === 'fy' ? prec.right(p, body) : prec.left(p, body);
}

const LOWER = /[\p{Ll}]/u.source;
const UPPER = /[\p{Lu}_]/u.source;
const ALNUM = /[\p{L}\p{N}_]/u.source;

export default grammar({
  name: 'swi_prolog',

  extras: $ => [/\s/, $.comment],

  externals: $ => [$.end, $._error_sentinel],

  word: $ => $._name,


  rules: {
    source_file: $ => seq(optional($.shebang), repeat(choice(
      $.directive,
      $.query,
      $.clause,
    ))),

    shebang: _ => token(prec(2, /#![^\n]*/)),

    directive: $ => seq(':-', field('body', $._term), $.end),

    query: $ => seq('?-', field('body', $._term), $.end),

    // A fact, rule, DCG rule or single-sided-unification rule. The head of a
    // rule is any term below 1200, which covers `Head, Guard => Body`.
    clause: $ => seq(
      field('head', $._term),
      optional(seq(
        field('neck', choice(...NECKS.map(n => alias(n, $.operator)))),
        field('body', $._term),
      )),
      $.end,
    ),

    // Priority 1199 and below.
    _term: $ => choice(
      $._arg,
      alias($._binary_operation_high, $.binary_operation),
      alias($._prefix_operation_high, $.prefix_operation),
    ),

    _binary_operation_high: $ => choice(
      ...INFIX_HIGH.map(op => infix($, op, $._term)),
    ),

    _prefix_operation_high: $ => choice(
      ...PREFIX_HIGH.map(op => prefix($, op, $._term)),
    ),

    // Priority 999 and below: list elements and arguments.
    _arg: $ => choice(
      $._primary,
      $.binary_operation,
      $.prefix_operation,
    ),

    binary_operation: $ => choice(
      ...INFIX_LOW.map(op => infix($, op, $._arg)),
      // Operators declared with op/3 are not known to the parser. A symbol
      // atom or a plain name between two operands is read as an infix operator
      // at 700: two adjacent operands are never valid Prolog otherwise.
      prec.left(precOf(700), seq(
        field('left', $._arg),
        field('operator', alias(choice($._graphic, $._name), $.operator)),
        field('right', $._arg),
      )),
    ),

    prefix_operation: $ => choice(
      ...PREFIX_LOW.map(op => prefix($, op, $._arg)),
    ),

    // Full 1200 term, only reachable inside brackets.
    _term_1200: $ => choice(
      $._term,
      alias($._neck_operation, $.binary_operation),
      alias($._prefix_neck_operation, $.prefix_operation),
    ),

    _neck_operation: $ => prec.left(0, seq(
      field('left', $._term),
      field('operator', choice(...NECKS.map(n => alias(n, $.operator)))),
      field('right', $._term),
    )),

    _prefix_neck_operation: $ => seq(
      field('operator', alias(choice(':-', '?-'), $.operator)),
      field('argument', $._term),
    ),

    _primary: $ => choice(
      $.atom,
      $.variable,
      $.integer,
      $.float,
      $.rational,
      $.char_code,
      $.string,
      $.back_quoted_string,
      $.compound_term,
      $.list,
      $.curly_term,
      $.dict,
      $.dict_call,
      $.index_term,
      $.parenthesized_term,
    ),

    // `Expr[Index]`, the postfix `[]` operator of library(wasm).
    index_term: $ => prec.left(precOf(40), seq(
      field('object', choice($.variable, $.dict_call, $.index_term)),
      token.immediate('['),
      field('index', $._arg),
      ']',
    )),

    parenthesized_term: $ => seq('(', $._term_1200, ')'),

    // `foo(...)`: the functor must touch the opening bracket.
    compound_term: $ => seq(
      field('functor', $.atom),
      token.immediate('('),
      field('arguments', $.arguments),
      ')',
    ),

    arguments: $ => seq($._arg, repeat(seq(',', $._arg))),

    list: $ => seq(
      '[',
      $._arg,
      repeat(seq(',', $._arg)),
      optional(seq('|', field('tail', $._arg))),
      ']',
    ),

    curly_term: $ => seq('{', $._term_1200, '}'),

    // `Tag{Key: Value, ...}`
    dict: $ => seq(
      field('tag', choice($.atom, $.variable)),
      token.immediate('{'),
      optional(seq(
        $.dict_pair,
        repeat(seq(',', $.dict_pair)),
      )),
      '}',
    ),

    dict_pair: $ => seq(
      field('key', choice($.atom, $.integer)),
      ':',
      field('value', $._arg),
    ),

    // `Dict.key` and `Dict.put(...)`: the dot touches both sides.
    dict_call: $ => prec.left(precOf(100), seq(
      field('dict', choice($.variable, $.atom, $.dict, $.dict_call, $.index_term)),
      token.immediate('.'),
      field('function', choice(
        alias($._immediate_name, $.atom),
        alias($._immediate_variable, $.variable),
        alias($._immediate_quoted_atom, $.atom),
        alias($._immediate_compound, $.compound_term),
        alias($._immediate_integer, $.integer),
      )),
    )),

    _immediate_name: _ => token.immediate(new RegExp(`${LOWER}${ALNUM}*`, 'u')),
    _immediate_variable: _ => token.immediate(new RegExp(`${UPPER}${ALNUM}*`, 'u')),
    _immediate_quoted_atom: _ => token.immediate(seq(
      '\'',
      repeat(choice(/[^'\\]/, '\'\'', /\\(.|\n)/)),
      '\'',
    )),
    _immediate_integer: _ => token.immediate(/\d+/),
    _immediate_compound: $ => seq(
      field('functor', alias($._immediate_name, $.atom)),
      token.immediate('('),
      field('arguments', $.arguments),
      ')',
    ),

    atom: $ => choice(
      $._name,
      $._graphic,
      $._quoted_atom,
      seq('[', ']'),
      seq('{', '}'),
      '!',
      ';',
      prec(-10, choice(...OPERATOR_NAMES)),
    ),

    _name: _ => new RegExp(`${LOWER}${ALNUM}*`, 'u'),

    // Symbol-character atoms that are not in the default operator table.
    // A dot directly before layout is handled by the external `end` token.
    _graphic: _ => token(/[#$&*+\-./:<=>?@^~\\]+/),

    _quoted_atom: _ => token(seq(
      '\'',
      repeat(choice(/[^'\\]/, '\'\'', /\\(.|\n)/, /\\x[0-9a-fA-F]+\\?/, /\\[0-7]+\\?/)),
      '\'',
    )),

    variable: _ => new RegExp(`${UPPER}${ALNUM}*`, 'u'),

    integer: _ => token(choice(
      /\d(_?\d)*/,
      /0x[0-9a-fA-F](_?[0-9a-fA-F])*/,
      /0o[0-7](_?[0-7])*/,
      /0b[01](_?[01])*/,
      /[1-9]\d*'[0-9a-zA-Z]+/,
      // SWI digit groups: 1 000 000
      /\d{1,3}( \d{3})+/,
    )),

    float: _ => token(choice(
      /\d(_?\d)*\.\d+([eE][+-]?\d+)?(Inf|NaN)?/,
      /\d(_?\d)*[eE][+-]?\d+/,
    )),

    rational: _ => token(/\d+r\d+/),

    char_code: _ => token(seq('0\'', choice(/\\(.|x[0-9a-fA-F]+\\?|[0-7]+\\?)/, '\'\'', '\'', /[^\\']/))),

    string: _ => token(seq(
      '"',
      repeat(choice(/[^"\\]/, '""', /\\(.|\n)/)),
      '"',
    )),

    back_quoted_string: _ => token(seq(
      '`',
      repeat(choice(/[^`\\]/, '``', /\\(.|\n)/)),
      '`',
    )),

    comment: _ => token(prec(1, choice(
      seq('%', /.*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),
    ))),
  },
});

// Unit tests for the token rules and operator associativity in grammar.js:
// each test pins the exact text of a token or the shape of a term, so a
// change to a token's regular expression or to an operator's associativity
// shows up here.

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { parse } from '../proof/harness.js';

// The value on the right of `X = Value` in `x :- X = Value.`
function valueOf(source) {
  const tree = parse(`x :- X = ${source}.\n`);
  assert.equal(tree.rootNode.hasError, false, `${source}: ${tree.rootNode}`);
  return tree.rootNode.namedChildren[0].childForFieldName('body').childForFieldName('right');
}

function token(source, type) {
  const node = valueOf(source);
  assert.equal(node.type, type, source);
  assert.equal(node.text, source);
}

describe('numbers', () => {
  test('floats with an exponent', () => {
    for (const source of ['1.5', '12.5', '1_0.25', '1e10', '12e3', '1_000e5', '1e-5', '1e+5', '1.5e10', '1.5E-3', '1.0Inf', '1.5NaN']) {
      token(source, 'float');
    }
  });

  test('rationals', () => {
    for (const source of ['1r3', '12r34']) token(source, 'rational');
  });

  test('integers', () => {
    for (const source of ['0', '42', '1_000_000', '0x1F', '0xFF_FF', '0o7', '0o17', '0o1_777', '0b1', '0b101', '0b1_0',
      "16'FF", "36'ZZ", '1 000 000']) {
      token(source, 'integer');
    }
  });
});

describe('quoted text', () => {
  test('character codes, with escapes', () => {
    for (const source of ["0'c", "0''", "0'''", "0'\\n", "0'\\x41\\", "0'\\101\\", "0'\\\\"]) {
      token(source, 'char_code');
    }
  });

  test('quoted atoms with doubled quotes and escapes', () => {
    for (const source of ["'it''s'", "'a\\'b'", "'\\x41\\'", "'\\x41'", "'\\101\\'", "'\\101'", "'a\\\nb'"]) {
      token(source, 'atom');
    }
    // The escape ends at its closing backslash, so the atom ends at its quote.
    const clause = parse("x :- X = '\\x41\\', Y = b.\n").rootNode.namedChildren[0];
    assert.equal(clause.hasError, false);
    assert.equal(clause.childForFieldName('body').childForFieldName('right').text, 'Y = b');
  });

  test('keys in functional notation on dicts', () => {
    for (const [key, type] of [['k', 'atom'], ['key_2', 'atom'], ['K', 'variable'], ['Key_2', 'variable'],
      ['1', 'integer'], ['12', 'integer'], ['put(k, 1)', 'compound_term']]) {
      const fn = valueOf(`D.${key}`).childForFieldName('function');
      assert.equal(fn.type, type, key);
      assert.equal(fn.text, key);
    }
  });

  test('a quoted key in functional notation on dicts', () => {
    for (const key of ["'k'", "'it''s'", "'a\\'b'"]) {
      const call = valueOf(`D.${key}`);
      assert.equal(call.type, 'dict_call');
      const fn = call.childForFieldName('function');
      assert.equal(fn.type, 'atom');
      assert.equal(fn.text, key);
    }
  });

  test('strings and back-quoted strings with doubled quotes and escapes', () => {
    for (const source of ['"a ""b"" c"', '"a\\"b"']) token(source, 'string');
    for (const source of ['`a ``b`` c`', '`a\\`b`']) token(source, 'back_quoted_string');
  });
});

describe('comments', () => {
  test('block comments end at the first */, however many stars come before it', () => {
    for (const comment of ['/* a */', '/* a **/', '/** a */', '/* a * bc */', '/* a ** bc **/', '/**/']) {
      const root = parse(`${comment}\nx.\n`).rootNode;
      assert.equal(root.hasError, false, comment);
      assert.equal(root.namedChildren[0].type, 'comment');
      assert.equal(root.namedChildren[0].text, comment);
      assert.equal(root.namedChildren[1].text, 'x.');
    }
    const two = parse('/* a */ x. /* b */\n').rootNode;
    assert.deepEqual(two.namedChildren.map(n => n.type), ['comment', 'clause', 'comment']);
  });
});

describe('prefix operator associativity', () => {
  test('an fy operator takes an argument of its own priority', () => {
    // `-` is fy 200 and `^` xfy 200: `- a ^ b` is -(a ^ b).
    const value = valueOf('- a ^ b');
    assert.equal(value.type, 'prefix_operation');
    assert.equal(value.childForFieldName('argument').text, 'a ^ b');
    const nested = valueOf('- - a');
    assert.equal(nested.childForFieldName('argument').type, 'prefix_operation');
  });

  test('an fx operator takes an argument below its priority', () => {
    // `?` is fx 500 and `+` yfx 500: `? a + b` is (? a) + b.
    const value = valueOf('? a + b');
    assert.equal(value.type, 'binary_operation');
    assert.equal(value.childForFieldName('left').text, '? a');
    assert.equal(value.childForFieldName('left').type, 'prefix_operation');
  });
});

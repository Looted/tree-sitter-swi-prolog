// Unit tests for the hand-written modules that grammar.js and the queries
// are built from: grammar/operators.js, grammar/lexical.js,
// grammar/node-types.js and queries/tags.js. The last test regenerates the
// grammar from grammar.js and checks it is the committed one.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  INFIX_HIGH, INFIX_LOW, NECKS, OPERATOR_NAMES, PREFIX_HIGH, PREFIX_LOW,
  UNKNOWN_INFIX_KINDS, UNKNOWN_INFIX_PRIORITY, UNKNOWN_INFIX_RULES,
} from '../../grammar/operators.js';
import { CLAUSE_END_FOLLOWERS, LAYOUT, LAYOUT_CODE_POINTS } from '../../grammar/lexical.js';
import {
  NAMED_NODE_TYPES, NODE_TYPES, TOKEN_TYPES, TOP_LEVEL_TERM_TYPES,
} from '../../grammar/node-types.js';
import { TAG_KINDS, tagKinds } from '../../queries/tags.js';

const root = fileURLToPath(new URL('../..', import.meta.url));

describe('grammar/operators.js', () => {
  const tables = { INFIX_HIGH, INFIX_LOW, PREFIX_HIGH, PREFIX_LOW };
  const opsOf = table => table.flatMap(([, , ops]) => ops);

  test('every table entry is [priority, type, operators] with a type of its kind', () => {
    for (const [name, table] of Object.entries(tables)) {
      const types = name.startsWith('INFIX') ? ['xfx', 'xfy', 'yfx'] : ['fx', 'fy'];
      for (const [priority, type, ops] of table) {
        assert.ok(Number.isInteger(priority) && priority >= 1 && priority <= 1200, `${name} ${priority}`);
        assert.ok(types.includes(type), `${name} ${type}`);
        assert.ok(ops.length > 0 && ops.every(op => typeof op === 'string' && op.length > 0));
      }
    }
  });

  test('high tables hold priorities from 1000, low tables below 1000', () => {
    // `_arg` (list elements and arguments) is priority 999 and below.
    for (const [priority] of [...INFIX_HIGH, ...PREFIX_HIGH]) assert.ok(priority >= 1000, String(priority));
    for (const [priority] of [...INFIX_LOW, ...PREFIX_LOW]) assert.ok(priority < 1000, String(priority));
  });

  test('OPERATOR_NAMES lists every operator once, without , and |', () => {
    const expected = new Set([...NECKS, '?-', ...Object.values(tables).flatMap(opsOf)]);
    expected.delete(',');
    expected.delete('|');
    assert.deepEqual([...OPERATOR_NAMES].sort(), [...expected].sort());
    assert.equal(new Set(OPERATOR_NAMES).size, OPERATOR_NAMES.length);
    assert.ok(opsOf(INFIX_HIGH).includes(','));
    assert.ok(opsOf(INFIX_HIGH).includes('|'));
    // `-` is both infix and prefix; it is listed once.
    assert.equal(OPERATOR_NAMES.filter(op => op === '-').length, 1);
  });

  test('NECKS are the clause necks', () => {
    assert.deepEqual(NECKS, [':-', '-->', '=>']);
  });

  test('unknown infix operators have one kind per grammar rule, at priority 700', () => {
    assert.deepEqual(UNKNOWN_INFIX_RULES, { symbolic: '_graphic', alphanumeric: '_name' });
    assert.deepEqual(UNKNOWN_INFIX_KINDS, ['symbolic', 'alphanumeric']);
    assert.equal(UNKNOWN_INFIX_PRIORITY, 700);
  });
});

describe('grammar/lexical.js', () => {
  // Unicode's White_Space property, from the Unicode Character Database.
  const WHITE_SPACE = [
    [0x09, 0x0D], [0x20, 0x20], [0x85, 0x85], [0xA0, 0xA0], [0x1680, 0x1680],
    [0x2000, 0x200A], [0x2028, 0x2029], [0x202F, 0x202F], [0x205F, 0x205F], [0x3000, 0x3000],
  ].flatMap(([from, to]) => Array.from({ length: to - from + 1 }, (_, i) => from + i));

  test('LAYOUT_CODE_POINTS is Unicode White_Space', () => {
    assert.deepEqual(LAYOUT_CODE_POINTS, WHITE_SPACE);
  });

  test('LAYOUT matches exactly one layout character', () => {
    for (let cp = 0; cp <= 0xFFFF; cp++) {
      if (cp >= 0xD800 && cp <= 0xDFFF) continue;
      const char = String.fromCodePoint(cp);
      assert.equal(LAYOUT.test(char), WHITE_SPACE.includes(cp), `U+${cp.toString(16)}`);
    }
    assert.equal(LAYOUT.test('\u{1F600}'), false);
    assert.equal(LAYOUT.source.startsWith('['), true);
    assert.equal(LAYOUT.flags, 'u');
  });

  test('CLAUSE_END_FOLLOWERS names each layout character, % comments and the end of input', () => {
    assert.equal(CLAUSE_END_FOLLOWERS.length, WHITE_SPACE.length + 2);
    assert.deepEqual(CLAUSE_END_FOLLOWERS.slice(0, 6), ['U+0009', 'U+000A', 'U+000B', 'U+000C', 'U+000D', 'U+0020']);
    assert.ok(CLAUSE_END_FOLLOWERS.includes('U+00A0'));
    assert.ok(CLAUSE_END_FOLLOWERS.includes('U+200A'));
    assert.ok(CLAUSE_END_FOLLOWERS.includes('U+3000'));
    assert.deepEqual(CLAUSE_END_FOLLOWERS.slice(-2), ['line_comment', 'end_of_input']);
  });
});

describe('grammar/node-types.js', () => {
  const committed = JSON.parse(readFileSync(path.join(root, 'src/node-types.json'), 'utf8'));

  test('NODE_TYPES is src/node-types.json', () => {
    assert.deepEqual(NODE_TYPES, committed);
  });

  test('NAMED_NODE_TYPES lists the named types only', () => {
    assert.deepEqual(NAMED_NODE_TYPES, committed.filter(t => t.named).map(t => t.type));
    assert.ok(NAMED_NODE_TYPES.includes('clause'));
    assert.ok(!NAMED_NODE_TYPES.includes(':-'));
  });

  test('TOP_LEVEL_TERM_TYPES are the children of source_file but shebang', () => {
    assert.deepEqual([...TOP_LEVEL_TERM_TYPES].sort(), ['clause', 'directive', 'query']);
  });

  test('TOKEN_TYPES are the named types without fields, children or subtypes', () => {
    assert.deepEqual([...TOKEN_TYPES].sort(), [
      'atom', 'back_quoted_string', 'char_code', 'comment', 'end', 'float', 'integer',
      'operator', 'rational', 'shebang', 'string', 'variable',
    ]);
    // `arguments` has children but no fields; `dict` has fields and maybe
    // no children; neither is a token.
    assert.ok(!TOKEN_TYPES.includes('arguments'));
    assert.ok(!TOKEN_TYPES.includes('dict'));
    assert.ok(!TOKEN_TYPES.includes('source_file'));
  });
});

describe('queries/tags.js', () => {
  test('TAG_KINDS are the tag kinds tags.scm captures, once each', () => {
    assert.deepEqual(TAG_KINDS, ['definition.function', 'definition.module', 'reference.call']);
  });

  test('tagKinds reads definition and reference captures, once each, outside comments', () => {
    const source = [
      '; @definition.commented is not a capture',
      '(a) @definition.function',
      '(b) @definition.function @name ; @reference.trailing',
      '(c) @reference.call.nested @_hidden @local.scope',
      '(d) @reference.call',
    ].join('\n');
    assert.deepEqual(tagKinds(source), ['definition.function', 'reference.call.nested', 'reference.call']);
    assert.deepEqual(tagKinds('(x) @definition'), []);
  });
});

describe('grammar.js', () => {
  // A grammar mutation run (test/mutation/grammar-check.sh) regenerates
  // src/ from the mutant, so this check would compare the mutant with itself.
  const skip = process.env.GRAMMAR_MUTATION ? 'src/ is generated from a grammar mutant' : false;
  test('generates the committed grammar.json and node-types.json', { skip }, () => {
    const out = mkdtempSync(path.join(tmpdir(), 'generate-'));
    try {
      const result = spawnSync('npx', ['--no-install', 'tree-sitter', 'generate', '--no-parser', '-o', out],
        { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' });
      assert.equal(result.status, 0, result.stderr);
      for (const file of ['grammar.json', 'node-types.json']) {
        assert.deepEqual(
          JSON.parse(readFileSync(path.join(out, file), 'utf8')),
          JSON.parse(readFileSync(path.join(root, 'src', file), 'utf8')),
          `src/${file} is out of date: run npx tree-sitter generate`,
        );
      }
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  });
});

// A small mutation tester for the code Stryker cannot mutate: src/scanner.c
// and scripts/*.sh. Each mutant changes one occurrence of one operator on
// one code line; the tests run in a temporary copy of the files they need,
// and a mutant is killed when they fail.
//
//   node test/mutation/mutants.mjs scanner|shell [--json report.json]
//
// scanner: the C unit tests (test/unit/scanner_test.c), then, for mutants
// they miss, the tree-sitter corpus with the mutated scanner.
// shell: test/unit/release-scripts.test.js.

import { spawnSync } from 'node:child_process';
import {
  cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));

// [name, pattern, replacement]: one mutant per match of the pattern.
const C_OPERATORS = [
  ['equality', /==/g, '!='],
  ['equality', /!=/g, '=='],
  ['boundary', />=/g, '>'],
  ['boundary', /<=/g, '<'],
  ['relational', />=/g, '<'],
  ['relational', /<=/g, '>'],
  ['logical', /&&/g, '||'],
  ['logical', /\|\|/g, '&&'],
  ['negation', /if \(!/g, 'if ('],
  ['boolean', /\btrue\b/g, 'false'],
  ['boolean', /\bfalse\b/g, 'true'],
  ['constant', /\b0x([0-9A-F]+)\b/g, m => `0x${(parseInt(m.slice(2), 16) + 1).toString(16).toUpperCase()}`],
  ['case label', /case [^:]+: ?/g, ''],
  ['symbol', /\bEND\b(?!_)/g, 'END_GUARD'],
  ['symbol', /\bERROR_SENTINEL\]/g, 'END_GUARD]'],
  ['character', /'%'/g, "'#'"],
  ['character', /'\.'/g, "','"],
];

const SH_OPERATORS = [
  ['test', / != /g, ' = '],
  ['test', / == /g, ' != '],
  ['test', /-z /g, '-n '],
  ['negation', /if ! /g, 'if '],
  ['exit', /exit 1/g, 'exit 0'],
  ['exit', /exit !found/g, 'exit found'],
  ['awk', /found = 1/g, 'found = 0'],
  ['awk', /if \(found\)/g, 'if (!found)'],
  ['awk', /\bnext\b/g, ''],
  ['awk', /\^## /g, '^##'],
  ['line', /head -n 1/g, 'tail -n 1'],
  ['regex', /\^\[0-9\]\+/g, '[0-9]+'],
  ['regex', /\+\$ \]\]/g, '+ ]]'],
  ['regex', /\\\./g, '.'],
  ['sed', /\/\.\/,\$!d/g, '/./,$d'],
  ['shell', /set -euo pipefail/g, 'set -eo pipefail'],
  ['output', />&2/g, ''],
];

// Lines that are code: not blank, not a comment, not a preprocessor line.
const isCode = (line, lang) => {
  const t = line.trim();
  if (t === '' || t.startsWith('//') || t.startsWith('#') && lang === 'c') return false;
  if (lang === 'sh' && t.startsWith('#')) return false;
  return true;
};

function* mutants(source, operators, lang) {
  const lines = source.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!isCode(line, lang)) continue;
    for (const [name, pattern, replacement] of operators) {
      for (const match of line.matchAll(pattern)) {
        const replaced = typeof replacement === 'function' ? replacement(match[0]) : replacement;
        const mutated = line.slice(0, match.index) + replaced + line.slice(match.index + match[0].length);
        if (mutated === line) continue;
        yield { line: i + 1, operator: name, original: line.trim(), mutated: mutated.trim(),
          source: [...lines.slice(0, i), mutated, ...lines.slice(i + 1)].join('\n') };
      }
    }
    // Statement deletion: a C statement that is a call or an assignment
    // (not a `(void)x;` that only silences an unused-parameter warning), or a
    // shell command line.
    const deletable = lang === 'c'
      ? /^\s*lexer->[\w]+(\(|\s*=)/.test(line)
      : /^\s*(check |fail |echo |rm |awk |\[ )/.test(line);
    if (deletable) {
      yield { line: i + 1, operator: 'statement deletion', original: line.trim(), mutated: '',
        source: [...lines.slice(0, i), '', ...lines.slice(i + 1)].join('\n') };
    }
  }
}

const run = (cmd, args, options) =>
  spawnSync(cmd, args, { encoding: 'utf8', timeout: 120000, ...options });

function scannerSuite() {
  const work = mkdtempSync(path.join(tmpdir(), 'mutants-scanner-'));
  cpSync(path.join(root, 'src'), path.join(work, 'src'), { recursive: true });
  mkdirSync(path.join(work, 'test/unit'), { recursive: true });
  cpSync(path.join(root, 'test/unit/scanner_test.c'), path.join(work, 'test/unit/scanner_test.c'));
  cpSync(path.join(root, 'test/corpus'), path.join(work, 'test/corpus'), { recursive: true });
  for (const file of ['tree-sitter.json', 'grammar.js']) cpSync(path.join(root, file), path.join(work, file));
  cpSync(path.join(root, 'grammar'), path.join(work, 'grammar'), { recursive: true });
  cpSync(path.join(root, 'package.json'), path.join(work, 'package.json'));
  cpSync(path.join(root, 'queries'), path.join(work, 'queries'), { recursive: true });
  // The generated parser is compiled once.
  const parserObject = path.join(work, 'parser.o');
  const built = run('cc', ['-c', '-fPIC', '-O1', '-Isrc', 'src/parser.c', '-o', parserObject], { cwd: work });
  if (built.status !== 0) throw new Error(built.stderr);
  return {
    file: 'src/scanner.c',
    lang: 'c',
    operators: C_OPERATORS,
    work,
    test(source) {
      writeFileSync(path.join(work, 'src/scanner.c'), source);
      const compile = run('cc', ['-std=c11', '-O0', '-Isrc', 'test/unit/scanner_test.c', 'src/scanner.c',
        '-o', 'scanner_test'], { cwd: work });
      if (compile.status !== 0) return { status: 'compile error' };
      const unit = run('./scanner_test', [], { cwd: work, timeout: 30000 });
      if (unit.status !== 0) return { status: 'killed', by: unit.signal ? `unit tests (${unit.signal})` : 'unit tests' };
      const lib = run('cc', ['-shared', '-fPIC', '-O0', '-Isrc', 'src/scanner.c', parserObject,
        '-o', 'swi_prolog.so'], { cwd: work });
      if (lib.status !== 0) return { status: 'compile error' };
      const corpus = run(path.join(root, 'node_modules/.bin/tree-sitter'), ['test', '--lib-path',
        'swi_prolog.so', '--lang-name', 'swi_prolog'], { cwd: work });
      if (corpus.status !== 0) return { status: 'survived unit tests', by: 'tree-sitter corpus' };
      return { status: 'survived' };
    },
  };
}

function shellSuite(file) {
  const work = mkdtempSync(path.join(tmpdir(), 'mutants-shell-'));
  cpSync(path.join(root, 'scripts'), path.join(work, 'scripts'), { recursive: true });
  mkdirSync(path.join(work, 'test/unit'), { recursive: true });
  cpSync(path.join(root, 'test/unit/release-scripts.test.js'), path.join(work, 'test/unit/release-scripts.test.js'));
  for (const manifest of ['package.json', 'package-lock.json', 'tree-sitter.json', 'Cargo.toml',
    'pyproject.toml', 'Makefile', 'CMakeLists.txt', 'CHANGELOG.md']) {
    cpSync(path.join(root, manifest), path.join(work, manifest));
  }
  return {
    file,
    lang: 'sh',
    operators: SH_OPERATORS,
    work,
    test(source) {
      writeFileSync(path.join(work, file), source);
      const result = run(process.execPath, ['--test', 'test/unit/release-scripts.test.js'], { cwd: work });
      return result.status === 0 ? { status: 'survived' } : { status: 'killed', by: 'unit tests' };
    },
  };
}

const [kind, ...rest] = process.argv.slice(2);
const jsonIndex = rest.indexOf('--json');
const suites = kind === 'scanner' ? [scannerSuite()]
  : kind === 'shell' ? ['scripts/release-check.sh', 'scripts/release-notes.sh'].map(shellSuite)
    : null;
if (!suites) {
  console.error('usage: mutants.mjs scanner|shell [--json report.json]');
  process.exit(2);
}

const results = [];
for (const suite of suites) {
  const original = readFileSync(path.join(root, suite.file), 'utf8');
  for (const mutant of mutants(original, suite.operators, suite.lang)) {
    const outcome = suite.test(mutant.source);
    results.push({ file: suite.file, line: mutant.line, operator: mutant.operator,
      original: mutant.original, mutated: mutant.mutated, ...outcome });
  }
  suite.test(original);
  rmSync(suite.work, { recursive: true, force: true });
}

const count = status => results.filter(r => r.status === status).length;
const killed = count('killed');
const valid = results.filter(r => r.status !== 'compile error').length;
for (const r of results.filter(r => r.status !== 'killed' && r.status !== 'compile error')) {
  console.log(`${r.status}${r.by ? ` (killed by ${r.by})` : ''}: ${r.file}:${r.line} ${r.operator}\n  - ${r.original}\n  + ${r.mutated}`);
}
console.log(`${kind}: ${results.length} mutants, ${count('compile error')} compile errors, `
  + `${killed}/${valid} killed by the unit tests (${(100 * killed / valid).toFixed(2)}%)`);
if (jsonIndex >= 0) writeFileSync(rest[jsonIndex + 1], `${JSON.stringify(results, null, 2)}\n`);

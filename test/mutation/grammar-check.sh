#!/usr/bin/env bash
# The test command of the grammar mutation run (stryker.grammar.config.json).
# A grammar mutant changes the generated parser, so each run regenerates and
# rebuilds the parser from the mutated grammar, then runs every test that
# exercises the parser: the tree-sitter corpus, the unit tests and the proof
# tests. The check that src/ matches grammar.js is skipped
# (GRAMMAR_MUTATION): it compares the mutant with itself.
set -euo pipefail
export GRAMMAR_MUTATION=1
# Each sandbox builds its own parser library for `tree-sitter test`.
export TREE_SITTER_LIBDIR=$PWD/.tree-sitter-lib
npx --no-install tree-sitter generate > /dev/null
if [ -f build/Makefile ]; then npx --no-install node-gyp build > /dev/null 2>&1
else npx --no-install node-gyp rebuild > /dev/null 2>&1; fi
npx --no-install tree-sitter test > /dev/null
node --test \
  test/unit/grammar-modules.test.js test/unit/parser.test.js test/unit/queries.test.js \
  test/unit/scanner.test.js test/unit/lexical.test.js \
  test/proof/syntax.test.js test/proof/queries.test.js test/proof/operators.proof.test.js \
  > /dev/null

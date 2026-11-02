#!/usr/bin/env bash
# Measures how much of the project's own code the unit tests in test/unit/
# run, and fails below 100%. Generated code (src/parser.c, the bindings) is
# not measured.
#
#   - grammar.js, grammar/*.js, queries/*.js and scripts/*.mjs: statements,
#     branches, functions and lines, with c8
#   - src/scanner.c: lines and branches, with gcov, from test/unit/scanner_test.c
#   - scripts/*.sh: lines, with bashcov (`gem install bashcov`)
#
# What the grammar and the queries cover is checked by unit tests of their
# own: test/unit/parser.test.js (every node type, field and child type in
# src/node-types.json) and test/unit/queries.test.js (every query pattern).
#
#   npm run coverage
#
# Needs the native binding (`npx node-gyp rebuild`) and the Wasm parser
# (`npx tree-sitter build --wasm`). Reports go to coverage/.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf coverage
mkdir -p coverage/c

echo '== shell scripts (bashcov)'
bashcov --root . --skip-uncovered -- test/coverage/shell.sh > coverage/shell.log 2>&1 \
  || { cat coverage/shell.log; exit 1; }
node -e '
  const { coverage } = Object.values(require("./coverage/.resultset.json"))[0];
  let failed = false;
  for (const [file, { lines }] of Object.entries(coverage)) {
    const relevant = lines.filter(n => n !== null);
    const missed = lines.flatMap((n, i) => (n === 0 ? [i + 1] : []));
    console.log(`${file}: ${relevant.length - missed.length}/${relevant.length} lines`
      + (missed.length ? `, missed ${missed.join(", ")}` : ""));
    failed ||= missed.length > 0;
  }
  if (Object.keys(coverage).length < 2) { console.log("no shell script was traced"); failed = true; }
  process.exit(failed ? 1 : 0);
'

echo '== JavaScript (c8) and the C scanner tests'
SCANNER_TEST_DIR=$PWD/coverage/c SCANNER_TEST_CFLAGS=--coverage npx --no-install c8 \
  --reporter=text --reporter=html --report-dir coverage/js --temp-directory coverage/js/tmp \
  --all --include grammar.js --include 'grammar/*.js' --include 'queries/*.js' --include 'scripts/*.mjs' \
  --check-coverage --100 \
  node --test test/unit/*.test.js > coverage/unit.log 2>&1 \
  || { cat coverage/unit.log; exit 1; }
sed -n '/^-*|/,$p' coverage/unit.log

echo '== src/scanner.c (gcov)'
summary=$(gcov -b -c -n -o coverage/c/scanner_test-scanner.gcda src/scanner.c)
echo "$summary"
if ! grep -q 'Lines executed:100.00%' <<< "$summary" \
  || ! grep -q 'Taken at least once:100.00%' <<< "$summary"; then
  gcov -b -c -t -o coverage/c/scanner_test-scanner.gcda src/scanner.c | grep -E '#####|never|taken 0%'
  exit 1
fi

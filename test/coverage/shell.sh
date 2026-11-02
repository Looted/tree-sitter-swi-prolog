#!/usr/bin/env bash
# Run by bashcov (see test/coverage.sh): runs the unit tests of the shell
# scripts with tracing on, then passes the trace to bashcov.
set -euo pipefail
trace_fd=$BASH_XTRACEFD
trace=$(mktemp)
SHELL_TRACE_FILE=$trace BASHCOV_BASH_ENV=${BASH_ENV:-} BASH_ENV=$PWD/test/coverage/bash-env.sh \
  env -u BASH_XTRACEFD node --test test/unit/release-scripts.test.js
# bashcov reads the trace from a non-blocking pipe: write it in chunks and
# retry while the pipe is full.
node -e '
  const fs = require("node:fs");
  const [file, fd] = [process.argv[1], Number(process.argv[2])];
  const data = fs.readFileSync(file);
  for (let offset = 0; offset < data.length;) {
    try { offset += fs.writeSync(fd, data, offset, Math.min(65536, data.length - offset)); }
    catch (e) { if (e.code !== "EAGAIN") throw e; Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5); }
  }' "$trace" "$trace_fd"
rm -f "$trace"

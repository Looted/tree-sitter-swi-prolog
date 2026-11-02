# Sourced by every bash the unit tests start (BASH_ENV), while bashcov
# measures shell coverage: it appends xtrace output to $SHELL_TRACE_FILE,
# because bashcov's trace descriptor does not reach scripts that node starts.
# test/coverage/shell.sh hands the file to bashcov afterwards.
{ set +x; } 2>/dev/null
if [ -n "${BASHCOV_BASH_ENV:-}" ]; then . "$BASHCOV_BASH_ENV"; fi
exec {__trace_fd}>>"$SHELL_TRACE_FILE"
BASH_XTRACEFD=$__trace_fd
set -x

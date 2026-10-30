#!/usr/bin/env bash
# Print the CHANGELOG.md section for a version, without its heading.
#
#   scripts/release-notes.sh X.Y.Z
set -euo pipefail

awk -v v="$1" '
  /^## / { if (found) exit; if ($2 == v) { found = 1; next } }
  found
' CHANGELOG.md | sed -e '/./,$!d' | sed -e ':a' -e '/^\n*$/{$d;N;ba' -e '}'

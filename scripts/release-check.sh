#!/usr/bin/env bash
# Check that every manifest has the version in package.json and that
# CHANGELOG.md has a section for it (`npm run version-packages` keeps them in
# step).
#
#   scripts/release-check.sh
#
# Prints the version on success. Run from the repository root.
set -euo pipefail

fail() { echo "release-check: $*" >&2; exit 1; }

version=$(node -p "require('./package.json').version")
if ! [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  fail "package.json version '$version' is not X.Y.Z"
fi

check() {
  local file=$1 found=$2
  if [ "$found" != "$version" ]; then
    fail "$file has version '$found', package.json has '$version'"
  fi
}
check tree-sitter.json "$(node -p "require('./tree-sitter.json').metadata.version")"
check Cargo.toml "$(sed -n 's/^version = "\([^"]*\)"/\1/p' Cargo.toml | head -n 1)"
check pyproject.toml "$(sed -n 's/^version = "\([^"]*\)"/\1/p' pyproject.toml | head -n 1)"
check Makefile "$(sed -n 's/^VERSION := //p' Makefile)"
check CMakeLists.txt "$(sed -n 's/^ *VERSION "\([^"]*\)"/\1/p' CMakeLists.txt | head -n 1)"
check package-lock.json "$(node -p "require('./package-lock.json').version")"

if ! awk -v v="$version" '/^## / && $2 == v { found = 1 } END { exit !found }' CHANGELOG.md; then
  fail "CHANGELOG.md has no '## $version' section for version $version"
fi
if [ -z "$("$(dirname "$0")/release-notes.sh" "$version")" ]; then
  fail "the '## $version' section of CHANGELOG.md is empty"
fi

echo "$version"

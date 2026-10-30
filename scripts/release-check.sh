#!/usr/bin/env bash
# Check that the version in package.json is ready to release.
#
#   scripts/release-check.sh               check the manifests against CHANGELOG.md
#   scripts/release-check.sh --untagged    also require that its tag is unused
#   scripts/release-check.sh --tag vX.Y.Z  also require the version to match a tag
#
# Prints the version on success. Run from the repository root.
set -euo pipefail

fail() { echo "release-check: $*" >&2; exit 1; }

version=$(node -p "require('./package.json').version")
[[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] \
  || fail "package.json version '$version' is not X.Y.Z"

check() {
  local file=$1 found=$2
  [ "$found" = "$version" ] \
    || fail "$file has version '$found', package.json has '$version'"
}
check tree-sitter.json "$(node -p "require('./tree-sitter.json').metadata.version")"
check Cargo.toml "$(sed -n 's/^version = "\([^"]*\)"/\1/p' Cargo.toml | head -n 1)"
check pyproject.toml "$(sed -n 's/^version = "\([^"]*\)"/\1/p' pyproject.toml | head -n 1)"
check package-lock.json "$(node -p "require('./package-lock.json').version")"

grep -q "^## $version\b" CHANGELOG.md \
  || fail "CHANGELOG.md has no '## $version' section for version $version"
[ -n "$(scripts/release-notes.sh "$version")" ] \
  || fail "the '## $version' section of CHANGELOG.md is empty"

case "${1:-}" in
  --untagged)
    if git ls-remote --exit-code --tags origin "refs/tags/v$version" > /dev/null; then
      fail "tag v$version already exists; bump the version and add a CHANGELOG.md section"
    fi ;;
  --tag)
    [ "${2:-}" = "v$version" ] || fail "tag ${2:-} does not match version $version" ;;
  '') ;;
  *) fail "unknown option $1" ;;
esac

echo "$version"

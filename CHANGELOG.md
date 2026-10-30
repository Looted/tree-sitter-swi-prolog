# tree-sitter-swi-prolog

## 0.1.1

### Patch Changes

- 593713f: Point the npm package's `main` and `types` at `bindings/node/index.js` and `index.d.ts`, so `import` no longer prints Node's DEP0151 deprecation warning.

## 0.1.0 (2026-10-30)

First release.

- Parses SWI-Prolog, not only ISO Prolog: the default SWI-Prolog operator table (module qualification with `:`, `=>` single-sided unification, `=@=`, `>:<`, `:<`, `as`, `$`, and declaration prefixes such as `dynamic`, `meta_predicate`, `multifile` and `table`), dicts and dict functional notation (`D.key`, `D.put(k, V)`), strings, back-quoted strings, `0'c` character codes, radix integers, digit groups, rationals, special floats, Unicode names and a leading `#!` line.
- Knows the operators of `library(clpfd)`, `library(chr)`, `library(semweb/rdf_db)` and `library(wasm)`, and the `rdf_meta`, `persistent`, `record` and `html_meta` declarations.
- An unknown infix operator declared with `op/3`, symbolic or alphanumeric, is read at priority 700 so the clause still parses.
- Every top-level term is a `clause` with `head`, `neck` and `body` fields, a `directive` or a `query`.
- Ships `highlights.scm`, `tags.scm` (predicate definitions, module declarations and calls) and `locals.scm`.
- Bindings for Node, Rust, Python, Go, Swift and C, plus a WebAssembly build. Published to npm, crates.io and PyPI.
- CI parses SWI-Prolog's own `boot/` and `library/` sources and fails below 99.5% of top-level terms parsing cleanly; 0.1.0 parses 99.88%.

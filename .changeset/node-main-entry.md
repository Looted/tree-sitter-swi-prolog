---
"tree-sitter-swi-prolog": patch
---

Point the npm package's `main` and `types` at `bindings/node/index.js` and `index.d.ts`, so `import` no longer prints Node's DEP0151 deprecation warning.

---
title: The Wasm parser loads in web-tree-sitter
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:33:07.375Z'
id: SCEN-corpus-wasm
type: scenario
---
Given the parser built with `tree-sitter build --wasm`, when `tree-sitter-swi_prolog.wasm` is loaded with web-tree-sitter, then it parses a clause into a `clause` node with the `:-` neck and no errors.

The expected behavior comes from the README line this requirement cites.

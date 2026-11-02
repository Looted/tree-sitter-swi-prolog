---
title: The Go binding returns the generated parser
status: active
origin:
  kind: agent
  recorded_at: '2026-11-02T11:24:36.465Z'
id: SCEN-bindings-go-language
type: scenario
---
Given the Go binding in bindings/go/binding.go, when Kibi reads it with the kibi-lang-go grammar, then what it calls includes C.tree_sitter_swi_prolog, the entry point of the parser generated from grammar.js.

The expected behavior comes from the README line this requirement cites.
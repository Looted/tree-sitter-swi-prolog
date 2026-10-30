---
title: The parser does not lower operator priorities in argument positions the way SWI-Prolog does, so foo(:- a) and foo(a|b) are errors.
status: active
fact_kind: observation
text_ref: readme:README.md#L37
tags:
  - bootstrap
  - knowledge-source:readme
  - claim:observation
origin:
  kind: agent
  recorded_at: '2026-10-30T19:53:05.495Z'
id: FACT-BOOTSTRAP-OBSERVATION-26F3A6B015706BDF
type: fact
---
The parser does not lower operator priorities in argument positions the way SWI-Prolog does, so foo(:- a) and foo(a|b) are errors.

## Source

> the parser does not lower operator priorities the way SWI-Prolog does in some argument positions, so `foo(:- a)` or `foo(a|b)` are errors

Source: tree-sitter-swi-prolog README - README.md#L37

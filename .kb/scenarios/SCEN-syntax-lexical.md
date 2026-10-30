---
title: 'Unicode names, multi-line quotes, comments and a #! line parse'
status: active
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:00.634Z'
id: SCEN-syntax-lexical
type: scenario
---
Given a file that starts with a `#!` line, has `%` and `/* */` comments, a Unicode atom, a Unicode variable and a quoted atom spanning two lines, when it is parsed, then it has a `shebang` node, two `comment` nodes, and a clause whose functor, quoted atom and variable keep their exact text, with no errors.

The expected behavior comes from the README line this requirement cites.

---
"tree-sitter-swi-prolog": patch
---

An unknown prefix or postfix operator (one declared with `op/3` in the file, such as `p :- fy q.`) is now an `ERROR` inside its own clause. Before, the parser read the clause's terminating `.` as an atom and swallowed the clauses after it.

---
"tree-sitter-swi-prolog": patch
---

Read any Unicode white space character as layout, as SWI-Prolog does: a no-break space or an ideographic space between tokens no longer gives an `ERROR` node, and a `.` followed by one ends the clause.

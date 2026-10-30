; Predicate definitions: the head of every clause. Names are captured
; without arity; consumers that need name/arity count the head's arguments
; (and add two for DCG rules, whose neck is `-->`).

(clause
  head: (compound_term
    functor: (atom) @name) @definition.function)

(clause
  head: (atom) @name @definition.function)

; Module-qualified heads: `Module:Head :- ...`
(clause
  head: (binary_operation
    operator: (operator) @_colon
    right: [
      (compound_term
        functor: (atom) @name)
      (atom) @name
    ]) @definition.function
  (#eq? @_colon ":"))

; Single-sided unification with a guard: `Head, Guard => Body`
(clause
  head: (binary_operation
    left: [
      (compound_term
        functor: (atom) @name)
      (atom) @name
    ] @definition.function
    operator: (operator) @_comma)
  neck: (operator) @_neck
  (#eq? @_comma ",")
  (#eq? @_neck "=>"))

; Module declaration: `:- module(Name, Exports).`
(directive
  body: (compound_term
    functor: (atom) @_module
    arguments: (arguments
      .
      (atom) @name)) @definition.module
  (#eq? @_module "module"))

; Calls
(compound_term
  functor: (atom) @name) @reference.call

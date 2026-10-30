; Literals

(comment) @comment
(shebang) @keyword.directive

(string) @string
(back_quoted_string) @string
(char_code) @character

[
  (integer)
  (rational)
] @number

(float) @number.float

(variable) @variable

((variable) @variable.builtin
  (#eq? @variable.builtin "_"))

(atom) @string.special.symbol

; Clauses

(clause
  head: (compound_term
    functor: (atom) @function))

(clause
  head: (atom) @function)

(clause
  head: (binary_operation
    left: (compound_term
      functor: (atom) @function)))

(clause
  head: (binary_operation
    operator: (operator) @_op
    right: (compound_term
      functor: (atom) @function))
  (#eq? @_op ":"))

(compound_term
  functor: (atom) @function.call)

(directive
  body: (compound_term
    functor: (atom) @keyword.import)
  (#any-of? @keyword.import
    "module" "use_module" "ensure_loaded" "reexport" "include" "autoload"
    "use_foreign_library"))

(directive
  body: (prefix_operation
    operator: (operator) @keyword.modifier))

(prefix_operation
  operator: (operator) @keyword.modifier
  (#any-of? @keyword.modifier
    "dynamic" "discontiguous" "initialization" "meta_predicate"
    "module_transparent" "multifile" "public" "thread_local"
    "thread_initialization" "volatile" "table"))

(dict
  tag: (_) @type)

(dict_pair
  key: (_) @property)

(dict_call
  function: (atom) @property)

(dict_call
  function: (compound_term
    functor: (atom) @function.method.call))

; Operators and punctuation

(operator) @operator

((operator) @keyword.operator
  (#any-of? @keyword.operator "is" "rem" "mod" "div" "xor" "rdiv" "divmod" "as"))

[
  ":-"
  "?-"
] @keyword.directive

"!" @keyword

(end) @punctuation.delimiter

[
  ","
  "|"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

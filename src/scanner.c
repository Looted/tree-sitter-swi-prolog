#include "tree_sitter/parser.h"

enum TokenType {
  END,
  ERROR_SENTINEL,
  END_GUARD,
};

void *tree_sitter_swi_prolog_external_scanner_create(void) { return NULL; }

void tree_sitter_swi_prolog_external_scanner_destroy(void *payload) { (void)payload; }

unsigned tree_sitter_swi_prolog_external_scanner_serialize(void *payload, char *buffer) {
  (void)payload;
  (void)buffer;
  return 0;
}

void tree_sitter_swi_prolog_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  (void)payload;
  (void)buffer;
  (void)length;
}

// Layout is Unicode White_Space: LAYOUT_CODE_POINTS in grammar/lexical.js,
// which grammar.js skips between tokens.
static bool is_layout(int32_t c) {
  switch (c) {
    case '\t': case '\n': case '\v': case '\f': case '\r': case ' ':
    case 0x85: case 0xA0: case 0x1680: case 0x2028: case 0x2029:
    case 0x202F: case 0x205F: case 0x3000:
      return true;
    default:
      return c >= 0x2000 && c <= 0x200A;
  }
}

// The clause terminator is a `.` followed by layout, a `%` comment or the end
// of input. Any other `.` belongs to a symbol atom or a dict call.
//
// The terminator is lexed as `end` even where the grammar does not expect
// one, such as right after an unknown prefix operator's argument: Prolog
// never reads it as an atom, and lexing it as `end` keeps a syntax error
// inside its own clause instead of swallowing the clauses after it.
bool tree_sitter_swi_prolog_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
  (void)payload;
  if (valid_symbols[ERROR_SENTINEL]) return false;

  while (is_layout(lexer->lookahead)) lexer->advance(lexer, true);
  if (lexer->lookahead != '.') return false;
  lexer->advance(lexer, false);
  lexer->mark_end(lexer);

  int32_t next = lexer->lookahead;
  if (lexer->eof(lexer) || is_layout(next) || next == '%') {
    lexer->result_symbol = END;
    return true;
  }
  return false;
}

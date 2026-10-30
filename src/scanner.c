#include "tree_sitter/parser.h"

enum TokenType {
  END,
  ERROR_SENTINEL,
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

static bool is_layout(int32_t c) {
  return c == ' ' || c == '\t' || c == '\n' || c == '\r' || c == '\f' || c == '\v';
}

// The clause terminator is a `.` followed by layout, a `%` comment or the end
// of input. Any other `.` belongs to a symbol atom or a dict call.
bool tree_sitter_swi_prolog_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
  (void)payload;
  if (valid_symbols[ERROR_SENTINEL] || !valid_symbols[END]) return false;

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

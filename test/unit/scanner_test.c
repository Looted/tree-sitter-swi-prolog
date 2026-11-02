// Unit tests for src/scanner.c. They call the external scanner directly with
// a lexer over a fixed string of code points, so every branch is reached
// without the generated parser. test/unit/scanner-c.test.js compiles and
// runs this file.

#include <stdarg.h>
#include <stdio.h>
#include <string.h>

#include "tree_sitter/parser.h"

void *tree_sitter_swi_prolog_external_scanner_create(void);
void tree_sitter_swi_prolog_external_scanner_destroy(void *payload);
unsigned tree_sitter_swi_prolog_external_scanner_serialize(void *payload, char *buffer);
void tree_sitter_swi_prolog_external_scanner_deserialize(void *payload, const char *buffer,
                                                         unsigned length);
bool tree_sitter_swi_prolog_external_scanner_scan(void *payload, TSLexer *lexer,
                                                  const bool *valid_symbols);

enum { END, ERROR_SENTINEL, END_GUARD };

typedef struct {
  TSLexer lexer;
  const int32_t *input;
  unsigned length;
  unsigned position;
  unsigned skipped;      // characters advanced over as skipped layout
  int marked_end;        // position of the last mark_end, or -1
} FakeLexer;

static void fake_set_lookahead(FakeLexer *f) {
  f->lexer.lookahead = f->position < f->length ? f->input[f->position] : 0;
}

static void fake_advance(TSLexer *lexer, bool skip) {
  FakeLexer *f = (FakeLexer *)lexer;
  if (f->position < f->length) {
    if (skip) f->skipped++;
    f->position++;
  }
  fake_set_lookahead(f);
}

static void fake_mark_end(TSLexer *lexer) { ((FakeLexer *)lexer)->marked_end = (int)((FakeLexer *)lexer)->position; }

static bool fake_eof(const TSLexer *lexer) {
  const FakeLexer *f = (const FakeLexer *)lexer;
  return f->position >= f->length;
}

static FakeLexer fake(const int32_t *input, unsigned length) {
  FakeLexer f;
  memset(&f, 0, sizeof f);
  f.lexer.advance = fake_advance;
  f.lexer.mark_end = fake_mark_end;
  f.lexer.eof = fake_eof;
  f.lexer.result_symbol = 0xFFFF;
  f.input = input;
  f.length = length;
  f.marked_end = -1;
  fake_set_lookahead(&f);
  return f;
}

static int failures = 0;
static int checks = 0;

static void check(bool ok, const char *what, ...) {
  checks++;
  if (ok) return;
  failures++;
  va_list args;
  va_start(args, what);
  fprintf(stderr, "FAIL: ");
  vfprintf(stderr, what, args);
  fprintf(stderr, "\n");
  va_end(args);
}

static const bool NORMAL[] = {true, false, true};
static const bool RECOVERING[] = {true, true, true};

// Scans `input`; returns whether it found `end` and leaves the lexer in *out.
static bool scan(const int32_t *input, unsigned length, const bool *valid, FakeLexer *out) {
  *out = fake(input, length);
  return tree_sitter_swi_prolog_external_scanner_scan(NULL, &out->lexer, valid);
}

static bool is_white_space(int32_t c) {
  return (c >= 0x09 && c <= 0x0D) || c == 0x20 || c == 0x85 || c == 0xA0 || c == 0x1680 ||
         (c >= 0x2000 && c <= 0x200A) || c == 0x2028 || c == 0x2029 || c == 0x202F ||
         c == 0x205F || c == 0x3000;
}

static void test_lifecycle(void) {
  void *payload = tree_sitter_swi_prolog_external_scanner_create();
  check(payload == NULL, "create returns no state");
  char buffer[TREE_SITTER_SERIALIZATION_BUFFER_SIZE];
  check(tree_sitter_swi_prolog_external_scanner_serialize(payload, buffer) == 0,
        "serialize writes nothing");
  tree_sitter_swi_prolog_external_scanner_deserialize(payload, buffer, 0);
  tree_sitter_swi_prolog_external_scanner_destroy(payload);
}

static void test_error_recovery(void) {
  // During error recovery every symbol is valid; the scanner then lexes
  // nothing and leaves the input alone.
  const int32_t input[] = {' ', '.', '\n'};
  FakeLexer f;
  check(!scan(input, 3, RECOVERING, &f), "no token during error recovery");
  check(f.position == 0 && f.marked_end == -1, "error recovery consumes nothing");
}

static void test_end(void) {
  // Every code point after a `.`: the dot is `end` exactly before layout
  // and `%`, and the token is the dot alone.
  for (int32_t c = 1; c <= 0x10FFFF; c++) {
    if (c >= 0xD800 && c <= 0xDFFF) continue;
    const int32_t input[] = {'.', c, 'b'};
    FakeLexer f;
    bool found = scan(input, 3, NORMAL, &f);
    bool expected = is_white_space(c) || c == '%';
    if (found != expected) check(false, "`.` before U+%04X: end %d, expected %d", c, found, expected);
    if (found && (f.lexer.result_symbol != END || f.marked_end != 1)) {
      check(false, "`.` before U+%04X: symbol %d, marked end %d", c, f.lexer.result_symbol,
            f.marked_end);
    }
  }
  check(true, "every code point after a dot");
}

static void test_end_of_input(void) {
  const int32_t input[] = {'.'};
  FakeLexer f;
  check(scan(input, 1, NORMAL, &f), "`.` at the end of the input is end");
  check(f.lexer.result_symbol == END, "the symbol is END");
  check(f.marked_end == 1, "the token is the dot");
}

static void test_leading_layout(void) {
  // Layout before the dot is skipped, not part of the token.
  const int32_t input[] = {' ', '\t', 0x3000, '\n', '.', ' '};
  FakeLexer f;
  check(scan(input, 6, NORMAL, &f), "layout, then `. ` is end");
  check(f.skipped == 4, "4 layout characters skipped, not %u", f.skipped);
  check(f.marked_end == 5, "the token ends after the dot, not at %d", f.marked_end);
  check(f.lexer.result_symbol == END, "the symbol is END");
}

static void test_not_a_dot(void) {
  const int32_t only_layout[] = {' ', '\n'};
  FakeLexer f;
  check(!scan(only_layout, 2, NORMAL, &f), "layout alone is not end");
  check(f.marked_end == -1, "nothing is marked");
  const int32_t atom[] = {' ', 'a', '.', ' '};
  check(!scan(atom, 4, NORMAL, &f), "`a. ` does not start with end");
  check(f.position == 1, "the scanner stops at `a`, after the layout");
  check(f.marked_end == -1, "nothing is marked");
  check(f.lexer.result_symbol == 0xFFFF, "no symbol is set");
}

static void test_dot_in_a_term(void) {
  // `a.b`, `=..`, `'.'`: the dot is part of a term; the scanner lexes nothing.
  const int32_t dict_call[] = {'.', 'b'};
  const int32_t univ[] = {'.', '.', ' '};
  FakeLexer f;
  check(!scan(dict_call, 2, NORMAL, &f), "`.b` is not end");
  check(!scan(univ, 3, NORMAL, &f), "`.. ` is not end");
  check(f.lexer.result_symbol == 0xFFFF, "no symbol is set");
}

static void test_only_end_guard_valid(void) {
  // At an operand position only `_end_guard` may be valid; the scanner still
  // lexes a terminator as `end`, so the clause ends there.
  const bool guard_only[] = {false, false, true};
  const int32_t input[] = {'.', '\n'};
  FakeLexer f;
  check(scan(input, 2, guard_only, &f), "`.` before a newline is end at an operand position");
  check(f.lexer.result_symbol == END, "the symbol is END, not the guard");
}

int main(void) {
  test_lifecycle();
  test_error_recovery();
  test_end();
  test_end_of_input();
  test_leading_layout();
  test_not_a_dot();
  test_dot_in_a_term();
  test_only_end_guard_valid();
  printf("%d checks, %d failures\n", checks, failures);
  return failures == 0 ? 0 : 1;
}

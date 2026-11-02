// Proof tests for the generated language bindings. Kibi reads the binding
// sources itself through kibi-plugin-treesitter and its kibi-lang-* grammar
// packs (see "kibi" in package.json), so these tests only leave the
// certificate. Each test is named after the Kibi test entity it proves.

import { test } from 'node:test';
import { sourceCertificate, writeCodeCertificate } from 'kibi-cli/proof-certificates';

test('TEST-bindings-go-language: the Go binding returns the generated parser', () => {
  // Kibi parses bindings/go/binding.go with the kibi-lang-go grammar and
  // checks that what it calls includes C.tree_sitter_swi_prolog.
  writeCodeCertificate(sourceCertificate({ testId: 'TEST-bindings-go-language' }));
});

// Proof tests for the release process the README describes. Kibi reads the
// workflow files itself and checks each requirement's fact against the steps
// it finds, so these tests only leave the certificate. Each test is named
// after the Kibi test entity it proves.

import { test } from 'node:test';
import { sourceCertificate, writeCodeCertificate } from 'kibi-cli/proof-certificates';

test('TEST-process-changeset: CI fails a pull request without a changeset', () => {
  // Kibi reads the `run` of each step of the `changeset` job in ci.yml.
  writeCodeCertificate(sourceCertificate({ testId: 'TEST-process-changeset' }));
});

test('TEST-process-release-workflow: the Release workflow creates the tag and release', () => {
  // Kibi reads the `run` of each step of the `github` job in release.yml.
  writeCodeCertificate(sourceCertificate({ testId: 'TEST-process-release-workflow' }));
});

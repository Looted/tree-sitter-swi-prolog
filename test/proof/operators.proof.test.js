// Rule certificates for the operator requirements: the parser reads every
// operator in the grammar's table as an operator in each role the table
// gives it. Kibi re-runs parsesAsOperator on every member when it ingests
// the certificate.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  failedCalls, ruleCertificate, writeCodeCertificate,
} from 'kibi-cli/proof-certificates';
import { OPERATOR_NAMES } from '../../grammar/operators.js';
import { parsesAsOperator } from './harness.js';

const TESTS = [
  'TEST-operators-default-table',
  'TEST-operators-library-tables',
];

for (const testId of TESTS) {
  test(`${testId}: every operator in the table parses as an operator`, async () => {
    const certificate = await ruleCertificate({
      testId,
      domains: {
        operator: { symbolId: 'SYM-grammar-operator-names', members: OPERATOR_NAMES },
      },
      predicates: {
        parses_as_operator: {
          symbolId: 'SYM-proof-parses-as-operator',
          argTypes: ['operator'],
          decide: parsesAsOperator,
        },
      },
    });
    assert.deepEqual(failedCalls(certificate), []);
    const rejected = OPERATOR_NAMES.filter(op => !parsesAsOperator(op));
    assert.deepEqual(rejected, []);
    writeCodeCertificate(certificate);
  });
}

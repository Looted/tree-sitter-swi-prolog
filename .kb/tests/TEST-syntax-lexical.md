---
title: 'Unicode names, multi-line quotes, comments and #! parse'
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-syntax-tests
      target: default
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:02.320Z'
id: TEST-syntax-lexical
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-6f7c11750d7b66d52eb97cd0
    test_id: TEST-syntax-lexical
    scope: end_to_end
    outcome: passed
    code_snapshot: eaec8849b72521aed9373f166419bd88bcca4986ee6b1cc249715aa547ee74f9
    environment_hash: 70794eb189f6bb0bd59b638fedca584356a0b61f01329f6f9f4e9f53a3b5be53
    started_at: '2026-10-30T23:37:18.161Z'
    finished_at: '2026-10-30T23:37:22.227Z'
    artifact_digest: d42a7d80c5e829f4cc8b5b246592257ab7848f6f9fd9fcf5936e9c2d2c7b46e2
    contract_hash: 107df8049231adf2d44bf6091aaa259ba7e56c86d7e2d122ba5b12fb44940b10
    binding_hash: 60f031b4ea66f52449920251110e7a8be49d48c8b14ee05c31df44a56adb16b7
    fingerprint: fa49ce7d26d15c92de65d2e295a57e2ad200b38ec4c024956261f0b0d18b55e4
    fingerprint_components:
      contract: 107df8049231adf2d44bf6091aaa259ba7e56c86d7e2d122ba5b12fb44940b10
      integration: af87672080273366855cb4df145063c269d9f3126f8fdd25ceb7fb1373fea76d
      command: 299e4663ffa1f966e4081e6a5aed2b64cbe3a0e010b03f09d04d5616344a1346
      bindings: 4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945
      producer: 3f1ef45ea6f7a150dff44ba43ea098e729d8dcd4e35f67bb455191a7f38609be
    integration_id: unit
    producer:
      name: kibi-command-producer
    command_argv:
      - npx
      - '--no-install'
      - kibi
      - proof
      - run-steps
      - test/proof/steps.json
    run_outcome: passed
    proof_results:
      - symbol_id: SYM-proof-syntax-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: e2e
    evidence_level: tested
---
End-to-end test `Unicode names, multi-line quotes, comments and #! parse` in test/proof/syntax.test.js, run through `kibi prove`.

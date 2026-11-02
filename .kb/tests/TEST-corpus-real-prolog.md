---
title: SWI-Prolog's own boot/ and library/ parse
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-corpus-tests
      target: default
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:59.425Z'
id: TEST-corpus-real-prolog
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-103dbd23ef19e7379e68520b
    test_id: TEST-corpus-real-prolog
    scope: end_to_end
    outcome: passed
    code_snapshot: 0202941c4f45423b9416dc21798f1ccf171b9c35629d7da4498a2019fecaedee
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T12:19:39.355Z'
    finished_at: '2026-11-02T12:19:45.638Z'
    artifact_digest: 1b0fdc7e9111a88a8f7116cae95e74d5a9792e1bf756beb9536e6c6efb06744f
    contract_hash: 662295058add4c7d165413df194ca90d2ab73786888707ede78598dfc99706e6
    binding_hash: 34b551b66559d8a4a67840a6a4c4f3b0e6a0f9eb18f06950c83e0aafd0376a87
    fingerprint: 5c68291f608560e286f09a50c79cacf095401f32e3c14ac8008b93e2c2b3ba7b
    fingerprint_components:
      contract: 662295058add4c7d165413df194ca90d2ab73786888707ede78598dfc99706e6
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
      - symbol_id: SYM-proof-corpus-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: e2e
    evidence_level: tested
---
End-to-end test `SWI-Prolog's own boot/ and library/ parse` in test/proof/corpus.test.js, run through `kibi prove`.

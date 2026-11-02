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
    receipt_id: PR-da6e8b21e9c6e34c0f9034a4
    test_id: TEST-corpus-real-prolog
    scope: end_to_end
    outcome: passed
    code_snapshot: b195ac80a85bbe18a6d3c36c38b7c7fb507dfc97fbf1abeb6442dd1874d951ad
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T11:24:53.103Z'
    finished_at: '2026-11-02T11:24:59.210Z'
    artifact_digest: 1246b8a0eeb12625bf902dcd4d24f74fd2e40aa72872809b791e248c8db2518a
    contract_hash: 662295058add4c7d165413df194ca90d2ab73786888707ede78598dfc99706e6
    binding_hash: f1bddab4480cf359c0c776f250eaeedc66d9b303f920d2360f4a0aeb4a9d4975
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

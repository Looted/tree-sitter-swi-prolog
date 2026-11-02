---
title: A . before any other character does not end the clause
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-lexical-tests
      target: default
origin:
  kind: agent
  recorded_at: '2026-11-02T15:32:05.995Z'
id: TEST-lexical-dot-in-term
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-f5c43d793b0a58549e99097c
    test_id: TEST-lexical-dot-in-term
    scope: end_to_end
    outcome: passed
    code_snapshot: 6c7770794d09206056458f53c25c91ca9f5687a363f5eef577c9abf9c1ae0ed2
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T15:40:22.050Z'
    finished_at: '2026-11-02T15:40:26.388Z'
    artifact_digest: 88d00c17f5c08795dce33cb54a87f79e2a76a670deb1d1f8bc1f42198fef3020
    contract_hash: 31e8997fdd62a36799a01f0dcd283a68a70f2012c5eea7187ba81c95fb24b1c3
    binding_hash: 76581d52448f39b06fdc26bc398351118182538da5d9b94dd8139fd6775ac979
    fingerprint: fe2af42807660d566b6d817d46df781f4b5833ee0114856ed790006bade1a5ea
    fingerprint_components:
      contract: 31e8997fdd62a36799a01f0dcd283a68a70f2012c5eea7187ba81c95fb24b1c3
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
      - symbol_id: SYM-proof-lexical-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: e2e
    evidence_level: tested
---
Parses a `.` followed by every character of the Basic Multilingual Plane that is not layout or `%`, and a few characters beyond it, and checks that none of them ends the clause.

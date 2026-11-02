---
title: Top-level terms are clauses, directives or queries
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
  kind: exhaustive
  domain_source:
    symbol_id: SYM-grammar-top-level-term-types
    export: TOP_LEVEL_TERM_TYPES
  proves:
    - CLAIM-AD1DB6E52F6BEADE
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:10.523Z'
id: TEST-syntax-tree-shape
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-949fe774c3b08420bd9bb538
    test_id: TEST-syntax-tree-shape
    scope: end_to_end
    outcome: passed
    code_snapshot: e2f8c3823193a7cc259363566c6b69e7814834a1d5c789781e910eef18dc1301
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T15:41:23.604Z'
    finished_at: '2026-11-02T15:41:36.200Z'
    artifact_digest: 7140a6d341430f8a2d2f1d96eead3f21acb818bd49625d30579a2b39c4c13d7b
    contract_hash: 6deb1afbeae1e1daec6d0448d0bcf75693fd662e4dc6bc725cfeb02e50071fce
    binding_hash: 9cb6ef05a88d7982b4141de211031263956819d11cfa6d057ee1a5b48e6c0e5c
    fingerprint: 5f02d06e70980b16a2c31f9b059ae5ee397d68f0b2870954ae60d378b244c0dc
    fingerprint_components:
      contract: 6deb1afbeae1e1daec6d0448d0bcf75693fd662e4dc6bc725cfeb02e50071fce
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
    kind: exhaustive
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: exhaustive
      test_id: TEST-syntax-tree-shape
      domain:
        symbol_id: SYM-grammar-top-level-term-types
        members:
          - clause
          - directive
          - query
      results:
        - member: clause
          outcome: passed
        - member: directive
          outcome: passed
        - member: query
          outcome: passed
    certificate_digest: 0dc5cc29f6bdbf2551025912e453f098a658522d75f3b92ced1b6bd043551221
    claim_bindings:
      - claim_key: CLAIM-AD1DB6E52F6BEADE
        requirement_id: REQ-AUTO-EF2C5E65EAED7FE7
        fact_id: FACT-PROP-D6F7BF045B03E8C4
        binding: derived
        scope: code
        obligation:
          kind: set_equals
          members:
            - clause
            - directive
            - query
---
Exhaustive certificate over `TOP_LEVEL_TERM_TYPES`, the top-level term types of the generated parser read from src/node-types.json: it must be exactly clause, directive and query, each parses at the top level, and a clause has head, neck and body fields.
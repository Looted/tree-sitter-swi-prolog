---
title: highlights.scm captures comments, strings, numbers and variables
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  required_proofs:
    - symbol_id: SYM-proof-queries-tests
      target: default
  kind: exhaustive
  domain_source:
    symbol_id: SYM-grammar-token-types
    export: TOKEN_TYPES
  proves:
    - CLAIM-C4EB7C9AFF4E6A06
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:35.219Z'
id: TEST-queries-highlights
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-7b35e65cdacd9fc2bc9cf8df
    test_id: TEST-queries-highlights
    scope: end_to_end
    outcome: passed
    code_snapshot: e2f8c3823193a7cc259363566c6b69e7814834a1d5c789781e910eef18dc1301
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T15:41:23.604Z'
    finished_at: '2026-11-02T15:41:36.200Z'
    artifact_digest: 7140a6d341430f8a2d2f1d96eead3f21acb818bd49625d30579a2b39c4c13d7b
    contract_hash: f6e484841b1fd0100a758109e78767272bfc5f253a7b5ae7740cea7bdbfc8d84
    binding_hash: 5ce23a9f4fbea16ed616a10079c373ce185151532be8f15a6d802f5bb93fa4d2
    fingerprint: 9cf7431eacb031110c91d160eb55d009b531658b9bd1213a6acfca0a76029c83
    fingerprint_components:
      contract: f6e484841b1fd0100a758109e78767272bfc5f253a7b5ae7740cea7bdbfc8d84
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
      - symbol_id: SYM-proof-queries-tests
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
      test_id: TEST-queries-highlights
      domain:
        symbol_id: SYM-grammar-token-types
        members:
          - atom
          - back_quoted_string
          - char_code
          - comment
          - end
          - float
          - integer
          - operator
          - rational
          - shebang
          - string
          - variable
      results:
        - member: atom
          outcome: passed
        - member: back_quoted_string
          outcome: passed
        - member: char_code
          outcome: passed
        - member: comment
          outcome: passed
        - member: end
          outcome: passed
        - member: float
          outcome: passed
        - member: integer
          outcome: passed
        - member: operator
          outcome: passed
        - member: rational
          outcome: passed
        - member: shebang
          outcome: passed
        - member: string
          outcome: passed
        - member: variable
          outcome: passed
    certificate_digest: a14f7e989698daf32eb0cc52d8e47d5a87ce46324c7708ac2e71b48610a8e374
    claim_bindings:
      - claim_key: CLAIM-C4EB7C9AFF4E6A06
        requirement_id: REQ-AUTO-0BCBA82BF5EB995A
        fact_id: FACT-PROP-3B87F50E8377E1C2
        binding: derived
        scope: code
        obligation:
          kind: set_equals
          members:
            - atom
            - back_quoted_string
            - char_code
            - comment
            - end
            - float
            - integer
            - operator
            - rational
            - shebang
            - string
            - variable
---
Exhaustive certificate over `TOKEN_TYPES`, every token type of the generated parser read from src/node-types.json: highlights.scm captures each one.
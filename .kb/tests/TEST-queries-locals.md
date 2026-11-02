---
title: locals.scm scopes variables to their clause, directive or query
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
    symbol_id: SYM-grammar-top-level-term-types
    export: TOP_LEVEL_TERM_TYPES
  proves:
    - CLAIM-C20A8BA7A7156E99
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:51.654Z'
id: TEST-queries-locals
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-b7c65c1f36265bd5845d7c7b
    test_id: TEST-queries-locals
    scope: end_to_end
    outcome: passed
    code_snapshot: b195ac80a85bbe18a6d3c36c38b7c7fb507dfc97fbf1abeb6442dd1874d951ad
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T11:24:53.103Z'
    finished_at: '2026-11-02T11:24:59.210Z'
    artifact_digest: 1246b8a0eeb12625bf902dcd4d24f74fd2e40aa72872809b791e248c8db2518a
    contract_hash: aae66c5049558a5be350d6f576bd4580c38e6253e519f137bfda94ded17d6aa9
    binding_hash: 3ebd4ea60ff674693148da0b79ed4eb43781dffdf441547ade3ce59fcf4b84a9
    fingerprint: 94330b0dc3635b971944b0771a8394edf730381002a4f5120c569c690e331a21
    fingerprint_components:
      contract: aae66c5049558a5be350d6f576bd4580c38e6253e519f137bfda94ded17d6aa9
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
      test_id: TEST-queries-locals
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
    certificate_digest: a684a56a65de0eb31fefcc5463cf448548441f401d3e0a69a7ad086d9f2db4ee
    claim_bindings:
      - claim_key: CLAIM-C20A8BA7A7156E99
        requirement_id: REQ-AUTO-8646498CAB4538B3
        fact_id: FACT-PROP-AF865207702FB697
        binding: derived
        scope: code
        obligation:
          kind: set_equals
          members:
            - clause
            - directive
            - query
---
Exhaustive certificate over `TOP_LEVEL_TERM_TYPES`: locals.scm makes every top-level term type of the generated parser a scope, and every variable reference sits in exactly one scope.
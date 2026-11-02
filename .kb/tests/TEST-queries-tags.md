---
title: tags.scm tags definitions, modules and calls
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
    symbol_id: SYM-queries-tag-kinds
    export: TAG_KINDS
  proves:
    - CLAIM-D3E32A226B88EAF2
origin:
  kind: agent
  recorded_at: '2026-10-30T23:32:43.386Z'
id: TEST-queries-tags
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-a9f4243064bd20a6cd61684a
    test_id: TEST-queries-tags
    scope: end_to_end
    outcome: passed
    code_snapshot: 0202941c4f45423b9416dc21798f1ccf171b9c35629d7da4498a2019fecaedee
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T12:19:39.355Z'
    finished_at: '2026-11-02T12:19:45.638Z'
    artifact_digest: 1b0fdc7e9111a88a8f7116cae95e74d5a9792e1bf756beb9536e6c6efb06744f
    contract_hash: 1f7a977ff82b85a8c485199e7ce25d8b28a9bd44cba723320c6a5abb8c7cdd67
    binding_hash: 72f1b2f132bd5ec46a8774cecfabfbf1a355b45d3aac6401c9dbc22b107952a7
    fingerprint: 99c9f118e7abe3955366c50b39203d81169ce45af18218ea23bc2734c61b43ec
    fingerprint_components:
      contract: 1f7a977ff82b85a8c485199e7ce25d8b28a9bd44cba723320c6a5abb8c7cdd67
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
      test_id: TEST-queries-tags
      domain:
        symbol_id: SYM-queries-tag-kinds
        members:
          - definition.function
          - definition.module
          - reference.call
      results:
        - member: definition.function
          outcome: passed
        - member: definition.module
          outcome: passed
        - member: reference.call
          outcome: passed
    certificate_digest: 084bd68dfddd9592abfaa60ea12b3cd224984bf2e700dbca131ef768fb88821f
    claim_bindings:
      - claim_key: CLAIM-D3E32A226B88EAF2
        requirement_id: REQ-AUTO-B3E92EA9ED11C179
        fact_id: FACT-PROP-DF763336B969A60E
        binding: derived
        scope: code
        obligation:
          kind: set_equals
          members:
            - definition.function
            - definition.module
            - reference.call
---
Exhaustive certificate over `TAG_KINDS`, the tag kinds read from tags.scm: each one tags the README cases (plain, module-qualified and guarded single-sided-unification heads, module declarations, calls).
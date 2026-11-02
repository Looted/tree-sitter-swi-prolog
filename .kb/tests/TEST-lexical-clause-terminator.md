---
title: A . before layout, a % comment or the end of the input ends the clause
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  kind: rule
  required_proofs:
    - symbol_id: SYM-proof-lexical-tests
      target: default
  predicate_source:
    ends_clause_before:
      symbol_id: SYM-proof-ends-clause-before
      export: endsClauseBefore
      harness_for:
        - SYM-scanner
        - SYM-grammar-rules
  domains:
    follower:
      symbol_id: SYM-grammar-clause-end-followers
      export: CLAUSE_END_FOLLOWERS
  proves:
    - CLAIM-DF75498C8D46506A
origin:
  kind: agent
  recorded_at: '2026-11-02T15:32:04.772Z'
id: TEST-lexical-clause-terminator
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-1fe65343775de301334548e7
    test_id: TEST-lexical-clause-terminator
    scope: end_to_end
    outcome: passed
    code_snapshot: e2f8c3823193a7cc259363566c6b69e7814834a1d5c789781e910eef18dc1301
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T15:41:23.604Z'
    finished_at: '2026-11-02T15:41:36.200Z'
    artifact_digest: 7140a6d341430f8a2d2f1d96eead3f21acb818bd49625d30579a2b39c4c13d7b
    contract_hash: 510d8c2729e71fb232285d0a1aab5e9b8198d43cebfd2753245cdb39a342f10e
    binding_hash: 28bc85894cd49efda2679dc71973021045724c4884e3e46784b65d9035a941d8
    fingerprint: 59c67ecd27d3cff9719bed3258920a4fbcdca1d28ab87b3956a83d398c801fbb
    fingerprint_components:
      contract: 510d8c2729e71fb232285d0a1aab5e9b8198d43cebfd2753245cdb39a342f10e
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
    kind: rule
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: rule
      test_id: TEST-lexical-clause-terminator
      domains:
        follower:
          symbol_id: SYM-grammar-clause-end-followers
          members:
            - U+0009
            - U+000A
            - U+000B
            - U+000C
            - U+000D
            - U+0020
            - U+0085
            - U+00A0
            - U+1680
            - U+2000
            - U+2001
            - U+2002
            - U+2003
            - U+2004
            - U+2005
            - U+2006
            - U+2007
            - U+2008
            - U+2009
            - U+200A
            - U+2028
            - U+2029
            - U+202F
            - U+205F
            - U+3000
            - line_comment
            - end_of_input
      predicates:
        ends_clause_before:
          symbol_id: SYM-proof-ends-clause-before
          arg_types:
            - follower
          rows:
            - args:
                - U+0009
              value: true
            - args:
                - U+000A
              value: true
            - args:
                - U+000B
              value: true
            - args:
                - U+000C
              value: true
            - args:
                - U+000D
              value: true
            - args:
                - U+0020
              value: true
            - args:
                - U+0085
              value: true
            - args:
                - U+00A0
              value: true
            - args:
                - U+1680
              value: true
            - args:
                - U+2000
              value: true
            - args:
                - U+2001
              value: true
            - args:
                - U+2002
              value: true
            - args:
                - U+2003
              value: true
            - args:
                - U+2004
              value: true
            - args:
                - U+2005
              value: true
            - args:
                - U+2006
              value: true
            - args:
                - U+2007
              value: true
            - args:
                - U+2008
              value: true
            - args:
                - U+2009
              value: true
            - args:
                - U+200A
              value: true
            - args:
                - U+2028
              value: true
            - args:
                - U+2029
              value: true
            - args:
                - U+202F
              value: true
            - args:
                - U+205F
              value: true
            - args:
                - U+3000
              value: true
            - args:
                - line_comment
              value: true
            - args:
                - end_of_input
              value: true
    certificate_digest: e79ba8663d76d2623f8f53963740ada1fdcb72a2cc44a378b611d3be3592d460
    claim_bindings:
      - claim_key: CLAIM-DF75498C8D46506A
        requirement_id: REQ-AUTO-86BD3B0BF0F0C58F
        fact_id: FACT-PROP-25AF559EEDB7C48E
        binding: derived
        scope: harness
        obligation:
          kind: every_member
          members:
            - U+0009
            - U+000A
            - U+000B
            - U+000C
            - U+000D
            - U+0020
            - U+0085
            - U+00A0
            - U+1680
            - U+2000
            - U+2001
            - U+2002
            - U+2003
            - U+2004
            - U+2005
            - U+2006
            - U+2007
            - U+2008
            - U+2009
            - U+200A
            - U+2028
            - U+2029
            - U+202F
            - U+205F
            - U+3000
            - end_of_input
            - line_comment
          predicate: ends_clause_before
---
Parses a clause ended by a `.` before each member of CLAUSE_END_FOLLOWERS (grammar/lexical.js), after a fact and after a rule body, and leaves a rule certificate over that domain for Kibi to re-check.

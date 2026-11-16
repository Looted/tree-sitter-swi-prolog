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
        - SYM-scanner-scan
        - SYM-scanner-is-layout
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
    receipt_id: PR-8f62588220c0e29120643ca3
    test_id: TEST-lexical-clause-terminator
    scope: end_to_end
    outcome: passed
    code_snapshot: 957086f23a4d6f0a72702eb99ed059d538cdc3d4b4b3d9573dd134624cc9c0ce
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-16T18:05:28.479Z'
    finished_at: '2026-11-16T18:05:35.976Z'
    artifact_digest: 475c25a994b7c60e6e0ba923466739ae8732fd832f90cc39b83385bd6218c0cd
    contract_hash: 9595e1f0481f7b464bcc00832045f83e161c6ab6bac3008f93f2fd72cf724d29
    binding_hash: 588dddfaa258a4002e7c79fc8499e3aba5e9d9a3152765afb8bbaf04068b6de3
    fingerprint: 1345857c571ee063a4184eaa4f8b796452205204e6f24c47fe96f9f7988673b0
    fingerprint_components:
      contract: 9595e1f0481f7b464bcc00832045f83e161c6ab6bac3008f93f2fd72cf724d29
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

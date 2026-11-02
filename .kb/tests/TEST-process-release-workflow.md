---
title: The Release workflow creates the tag and release
status: passing
verification_scope: end_to_end
verification_perspective: consumer
proof_contract:
  version: kibi.proof-contract.v1
  integration: unit
  success_policy: all_required_first_attempt
  kind: source
  required_proofs:
    - symbol_id: SYM-proof-process-tests
      target: default
  source:
    reader: yaml
    file: .github/workflows/release.yml
    path: jobs.github.steps
    select: items
    field: run
  proves:
    - CLAIM-F6B3DF6E32FAF19E
origin:
  kind: agent
  recorded_at: '2026-11-02T12:14:42.981Z'
id: TEST-process-release-workflow
type: test
proof_receipts:
  - version: kibi.proof-receipt.v2
    receipt_id: PR-3d3ed57d408b8cda3524f7c8
    test_id: TEST-process-release-workflow
    scope: end_to_end
    outcome: passed
    code_snapshot: 9be8506cb37ad895b6c1f1f2ca6c991e879e9d0a6213956da317f4d09483c6c8
    environment_hash: 0fe4faff3abd9383846f773ccd03a2e551c0e1792023b3084ed58b8687bccfaa
    started_at: '2026-11-02T15:38:18.214Z'
    finished_at: '2026-11-02T15:38:32.857Z'
    artifact_digest: 2bb0930ab0bb0ce37eba88d500e91646e20d4441ba56b8390c962e7dbab39338
    contract_hash: 507ab8340b7d984f8777ae47e59ee9fc54d7e267d9414a9f31dbe48b94a1c284
    binding_hash: c663e915d902ef1ef26af09b09e56ab92b6f5b301dd96f95e7a8a0650e452939
    fingerprint: 0ece3c91d82383f8b1cd6b74e1f733f9144053b04c31f8942ba759bb52d5375c
    fingerprint_components:
      contract: 507ab8340b7d984f8777ae47e59ee9fc54d7e267d9414a9f31dbe48b94a1c284
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
      - symbol_id: SYM-proof-process-tests
        target: default
        outcome: passed
        binding: aggregate_run
        attempts:
          status: unavailable
    kind: source
    evidence_level: proved
    certificate:
      version: kibi.code-certificate.v1
      kind: source
      test_id: TEST-process-release-workflow
      source:
        reader: yaml
        file: .github/workflows/release.yml
        path: jobs.github.steps
        select: items
        field: run
      model:
        members:
          - |-
            scripts/release-notes.sh "$VERSION" > "$RUNNER_TEMP/notes.md"
            gh release create "v$VERSION" *.wasm tree-sitter-swi-prolog.tar.gz \
              --target "$GITHUB_SHA" --title "tree-sitter-swi-prolog $VERSION" \
              --notes-file "$RUNNER_TEMP/notes.md"
          - |
            tree-sitter build --wasm
            git ls-files > "$RUNNER_TEMP/files"
            tar czf tree-sitter-swi-prolog.tar.gz -T "$RUNNER_TEMP/files"
        sequence:
          - |
            tree-sitter build --wasm
            git ls-files > "$RUNNER_TEMP/files"
            tar czf tree-sitter-swi-prolog.tar.gz -T "$RUNNER_TEMP/files"
          - |-
            scripts/release-notes.sh "$VERSION" > "$RUNNER_TEMP/notes.md"
            gh release create "v$VERSION" *.wasm tree-sitter-swi-prolog.tar.gz \
              --target "$GITHUB_SHA" --title "tree-sitter-swi-prolog $VERSION" \
              --notes-file "$RUNNER_TEMP/notes.md"
    certificate_digest: 607db4d889fe33d52e427aaad73a8a6639550ee085d25f076a76cb7c60ed1e06
    claim_bindings:
      - claim_key: CLAIM-F6B3DF6E32FAF19E
        requirement_id: REQ-AUTO-65EF0234A0D677D8
        fact_id: FACT-PROP-76000F194637230E
        binding: derived
        scope: source
        obligation:
          kind: set_relation
          members:
            - |-
              scripts/release-notes.sh "$VERSION" > "$RUNNER_TEMP/notes.md"
              gh release create "v$VERSION" *.wasm tree-sitter-swi-prolog.tar.gz \
                --target "$GITHUB_SHA" --title "tree-sitter-swi-prolog $VERSION" \
                --notes-file "$RUNNER_TEMP/notes.md"
          operator: includes
---
Source certificate: Kibi reads the `run` of each step of the `github` job in .github/workflows/release.yml and checks the requirement's fact against it.
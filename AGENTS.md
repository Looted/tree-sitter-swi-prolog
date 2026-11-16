# Agent notes

This repository is the SWI-Prolog grammar for tree-sitter. Its requirements live in a [Kibi](https://github.com/Looted/kibi) knowledge base under `.kb/`.

- Kibi runs as the project-local `kibi-mcp` server (configured in `.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`, `.codex/config.toml` and `opencode.json`). Without MCP, use the CLI JSON routes, for example `printf '%s\n' '{}' | npx kibi status --input -`.
- Before changing grammar behaviour, ask the knowledge base which requirements govern it (`kb_search`), and keep them true or supersede them with the owner's agreement.
- After editing `grammar.js` or `grammar/operators.js`, run `npx tree-sitter generate`, `npx tree-sitter test`, and `node scripts/check-corpus.mjs <dirs>` on real Prolog sources.
- Requirements are proved by the tests in `test/proof/` (run per test from `test/proof/steps.json`). After a behaviour change, rebuild the native binding (`npx node-gyp rebuild`) and run `npx kibi prove --all`; CI reruns it before publishing the requirement-health report. Most proofs are certificates Kibi re-checks over domains read from the code: node types from `src/node-types.json` (`grammar/node-types.js`), tag kinds from `queries/tags.scm` (`queries/tags.js`) and the operator tables, so a grammar or query change that adds a node type or tag kind needs its proof updated too.
- Every user-visible change adds a changeset (`npx changeset`, or a file in `.changeset/`). Don't edit versions or `CHANGELOG.md` by hand: the Release workflow's Version packages pull request applies the changesets, and merging it releases (see the README's Releasing section). Never create release tags by hand.
- The unit tests in `test/unit/` cover all of the project's own code (grammar.js, grammar/, queries/, src/scanner.c, scripts/); CI runs `npm run coverage` and fails below 100%. New code gets unit tests; a new node type, field or query pattern fails `test/unit/parser.test.js` or `test/unit/queries.test.js` until it has a sample. `npm run mutation` runs mutation testing (about 25 minutes); see the README's Development section.

<!-- BEGIN kibi-managed: written by `kibi init`; edit outside these markers -->
## Kibi

This repository records its requirements, decisions, tests and code ownership in a Kibi knowledge base (`.kb/`).

- Before changing behavior, ask it: `kb_search` with the question, and `kb_query` with `sourceFile` for a file you edit. Without the MCP tools, use the project-local CLI (`npx --no-install kibi search "<question>"`, or your package manager's runner).
- A request that conflicts with a recorded requirement or decision is a question for the person, not a task.
- Record new or changed behavior with `kb_upsert` and finish with `kb_check`. Do not edit `.kb/` files by hand.
- Commits must pass `kibi check --staged`, which the pre-commit hook runs. A fresh clone has no git hooks until the project's dependencies are installed or `kibi hooks install` runs.
- Workflow guidance: the `kibi-usage` skill (`kb_skills` with `action: "load"`, or `kibi skills load kibi-usage`).
<!-- END kibi-managed -->

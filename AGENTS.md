# Agent notes

This repository is the SWI-Prolog grammar for tree-sitter. Its requirements live in a [Kibi](https://github.com/Looted/kibi) knowledge base under `.kb/`.

- Kibi runs as the project-local `kibi-mcp` server (configured in `.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`, `.codex/config.toml` and `opencode.json`). Without MCP, use the CLI JSON routes, for example `printf '%s\n' '{}' | npx kibi status --input -`.
- Before changing grammar behaviour, ask the knowledge base which requirements govern it (`kb_search`), and keep them true or supersede them with the owner's agreement.
- After editing `grammar.js`, run `npx tree-sitter generate`, `npx tree-sitter test`, and `node scripts/check-corpus.mjs <dirs>` on real Prolog sources.

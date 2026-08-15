# Runtime support

AI Product Team has one product contract and four host adapters. The host chooses the model, provider, permissions, and available tools; the Working Backwards process remains unchanged.

| Host | Delivery mechanism | Status | Required adapter behavior |
|---|---|---|---|
| Codex CLI | Repository `AGENTS.md` plus `.codex/` workflow instructions | Supported | Open the repository root and follow the shared contract. |
| Codex app | Repository `AGENTS.md` plus `.codex/` workflow instructions | Supported | Attach or open the repository root and follow the shared contract. |
| Claude Code | Repository `.claude/` instructions and native plugin manifest | Supported | Run from the repository root or load the plugin. |
| Claude Cowork | Native `.claude-plugin/plugin.json` package | Supported through plugin installation | Install the repository as a custom plugin, then invoke its Working Backwards skill. |

## What portability guarantees

- Identical stage order, session schema, artifact paths, and Critic gates.
- Identical shared rubrics and portable role contract.
- No model or provider selection in `shared/`.
- Text-only stages work without subagents, shell access, browsing, Git, or external integrations.

## What adapters may vary

- How the host asks a user for missing context.
- How it delegates work, uses tools, manages permissions, or persists to Git.
- Which model a user or administrator enables.
- Whether demo and site stages can run local verification in the active environment.

Run `npm run validate` after changing any shared contract, adapter manifest, pipeline stage, session template, or rubric reference.

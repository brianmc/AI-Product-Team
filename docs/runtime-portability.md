# Runtime Portability Plan

AI-Product-Team supports Codex CLI, the Codex app, Claude Code, and Claude Cowork without splitting into four products. The product logic belongs in provider- and runtime-neutral shared files; host adapters are thin execution and packaging layers over the same Working Backwards pipeline.

## Goals

- Keep one canonical Working Backwards methodology, pipeline, rubric set, role contract, and output structure.
- Never select or require a particular model or provider in the shared core.
- Preserve compatible execution in all supported hosts.
- Avoid drift between host prompts, rubrics, stage definitions, and session artifacts.

## Non-Goals

- Replacing any host's native tooling.
- Creating separate implementations of the product process.
- Making host-specific tools or subagents mandatory for text-only stages.
- Changing the Working Backwards methodology or stage gate rules during the portability work.

## Target Structure

```text
shared/
  pipeline.json
  runtime-contract.json
  roles.md
  README.md
  methodology/
  rubrics/

.claude/
  agents/
  skills/

.codex/
  skills/

.claude-plugin/
  plugin.json

AGENTS.md
```

## Shared Core

The shared core is the source of truth for product behavior. It contains:

- Stage order and gate rules.
- Runtime-neutral role definitions.
- Critic rubrics.
- Output templates.
- Session schema expectations.
- Methodology reference material.

Runtime adapters may add tool-specific instructions, but they must not redefine stage semantics or pin a model/provider.

## Claude Code and Cowork adapter

The existing `.claude/` files provide host-specific execution instructions. The root `.claude-plugin/plugin.json` packages those skills and agents for Claude Code and Claude Cowork. The adapter reads the shared core before execution and leaves model selection to the host.

## Codex CLI and app adapter

The Codex adapter provides:

- A repo-level `AGENTS.md` that tells Codex how to operate the pipeline.
- `.codex/skills/working-backwards/SKILL.md` for starting or resuming a session.
- `.codex/skills/wb-status/SKILL.md` for read-only status inspection.
- The same `working-backwards/{session-id}/` output layout as every other host.

Codex is especially well suited for stages that require editing, running, and verifying generated apps, such as Visual Demo and Site Builder.

## Migration Sequence

1. Define and validate the portable product contract.
2. Point each adapter at the shared core.
3. Package the Claude adapter for Cowork while preserving Claude Code support.
4. Verify every host produces a compatible session artifact set.
5. Only then add optional host integrations or new product features.

## Compatibility Contract

Every adapter must produce sessions with:

- `session.json`
- `press-release.md`
- `faq-external.md`
- `faq-internal.md`
- `demo/`
- `docs/`
- `telemetry.md`
- `requirements.md`
- `site/`

Both runtimes must enforce the same gate: no stage advances until the Critic returns `VERDICT: PASS`, except where the documented max-revision pause behavior applies.

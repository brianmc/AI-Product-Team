# Runtime Portability Plan

AI-Product-Team should support both Claude Code and Codex without splitting into two products. The product logic belongs in shared, runtime-neutral files; Claude and Codex should be thin adapters over the same Working Backwards pipeline.

## Goals

- Keep one canonical Working Backwards methodology, pipeline, rubric set, and output structure.
- Preserve the existing Claude Code extension experience.
- Add a Codex-native workflow that can run the same stages and write the same session artifacts.
- Avoid drift between Claude and Codex prompts, rubrics, and stage definitions.

## Non-Goals

- Replacing Claude support.
- Creating two separate implementations of the product process.
- Changing the Working Backwards methodology or stage gate rules during the portability work.

## Target Structure

```text
shared/
  pipeline.json
  README.md
  agents/
  methodology/
  rubrics/
  templates/

.claude/
  agents/
  skills/

.codex/
  skills/

AGENTS.md
```

## Shared Core

The shared core is the source of truth for product behavior. It should contain:

- Stage order and gate rules.
- Agent role definitions.
- Critic rubrics.
- Output templates.
- Session schema expectations.
- Methodology reference material.

Runtime adapters may add tool-specific instructions, but they should not redefine stage semantics.

## Claude Adapter

The existing `.claude/` files remain the Claude Code adapter. Over time, the Claude agent and skill files should reference the shared core instead of duplicating the full stage definitions inline.

## Codex Adapter

The Codex adapter should provide:

- A repo-level `AGENTS.md` that tells Codex how to operate the pipeline.
- `.codex/skills/working-backwards/SKILL.md` for starting or resuming a session.
- `.codex/skills/wb-status/SKILL.md` for read-only status inspection.
- The same `working-backwards/{session-id}/` output layout as Claude.

Codex is especially well suited for stages that require editing, running, and verifying generated apps, such as Visual Demo and Site Builder.

## Migration Sequence

1. Add shared core files without changing existing Claude behavior.
2. Add Codex adapter instructions that consume the shared core.
3. Update README and PRD to describe dual-runtime support.
4. Gradually refactor `.claude/` files to reference shared files and reduce duplication.
5. Add validation checks that confirm both runtimes produce compatible session artifacts.

## Compatibility Contract

Both runtimes must produce sessions with:

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

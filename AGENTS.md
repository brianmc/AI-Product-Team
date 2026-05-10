# Codex Guide for AI-Product-Team

This repo defines a Working Backwards product pipeline that can run in Claude Code and Codex.

Codex should treat `shared/` as the product source of truth and `.codex/` as the Codex adapter. The existing `.claude/` directory remains the Claude Code adapter.

## Working Directory

When working locally, use:

```text
code/AI-Product-Team
```

## Core Rule

Do not skip stages. The pipeline order is:

1. Press Release
2. External FAQ
3. Internal FAQ
4. Visual Demo
5. Documentation
6. Telemetry
7. Requirements

A stage advances only after Critic PASS, subject to the max-revision pause behavior documented in `shared/pipeline.json` and the runtime adapter instructions.

## Codex Responsibilities

When running the pipeline in Codex:

- Read `shared/pipeline.json` first.
- Use the existing session layout under `working-backwards/{session-id}/`.
- Preserve compatibility with Claude-generated sessions.
- Write artifacts to disk before reporting completion.
- For demo and site work, run available local checks when shell access and dependencies permit.
- Do not silently resolve `[OPEN]` or `[BLOCKER]` items.

## Adapter Boundary

Codex-specific workflow instructions belong under `.codex/`.

Product behavior, stage definitions, rubrics, templates, and methodology belong under `shared/`.

If the same behavior is described in both places, prefer `shared/` unless the difference is explicitly about Codex tooling.

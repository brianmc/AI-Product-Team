---
name: working-backwards
description: Start or resume a Working Backwards session in Codex using the shared AI-Product-Team pipeline.
argument-hint: "[feature idea] [--repo org/repo] | resume [session-id]"
---

# Codex Working Backwards Orchestrator

Use this skill to run the AI-Product-Team Working Backwards pipeline in Codex.

## Source of Truth

Before acting, read:

1. `shared/pipeline.json`
2. `shared/README.md`
3. Existing session state, if resuming

The `.claude/` directory is useful reference material, but Codex behavior should be grounded in `shared/` so both runtimes remain compatible.

## New Session

1. Parse the feature idea and optional `--repo org/repo` flag.
2. Create a session ID: `wb-YYYYMMDD-HHMMSS`.
3. Create `working-backwards/{session-id}/session.json` using the shared pipeline stages.
4. Start at `press-release`.
5. Save artifacts locally by default. If GitHub persistence is requested, commit and push after each Critic PASS.

## Resume Session

1. Read `working-backwards/{session-id}/session.json`.
2. Resume from `current_stage`.
3. Preserve artifacts already marked complete.
4. Do not restart earlier stages unless the user explicitly asks.

## Stage Execution

For each stage:

1. Read all prerequisite artifacts.
2. Produce or revise only the current stage artifact.
3. Run the Critic against the stage rubric.
4. If PASS, update `session.json` and advance.
5. If NEEDS REVISION, revise only failing dimensions.
6. After 3 failed revision cycles, save the best draft and pause for more evidence.

## Codex Notes

- Use file edits directly for generated artifacts.
- For Visual Demo and Site Builder stages, prefer runnable React/Vite/Express output consistent with the existing Claude adapter.
- Run local verification when available.
- Keep Claude compatibility: session schema and artifact paths must remain the same.

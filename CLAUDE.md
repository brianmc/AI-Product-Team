# AI-Product-Team

This repository is a Claude Code extension that guides product managers through Amazon's Working Backwards methodology using a multi-agent pipeline.

## What this does

Running `/working-backwards` starts a strict, stage-gated pipeline:

1. **Stage 1 — Press Release**: Write a customer-centric Press Release before any requirements
2. **Stage 2 — External FAQ**: Stress-test the PR with hard customer questions
3. **Stage 2 — Internal FAQ**: Stress-test with hard engineering/leadership questions
4. **Stage 3 — Requirements**: Translate the validated PR + FAQ into engineer-ready specs

Each stage must pass a Critic review before the next stage unlocks. No skipping.

All session outputs are committed to this repo under `working-backwards/{session-id}/`.

## Prerequisites

- `gh` CLI installed and authenticated: `brew install gh && gh auth login`
- Git configured with push access to this repo

## Available commands

- `/working-backwards [feature idea]` — Start a new Working Backwards session
- `/working-backwards resume [session-id]` — Resume an in-progress session
- `/wb-status [session-id]` — View current session state (read-only)

## Session output structure

```
working-backwards/
  {session-id}/
    press-release.md     ← committed on Stage 1 Critic PASS
    faq-external.md      ← committed on Stage 2 External Critic PASS
    faq-internal.md      ← committed on Stage 2 Internal Critic PASS
    requirements.md      ← committed on Stage 3 Critic PASS
    session.json         ← updated after every agent interaction
```

## Agents

- `press-release-writer` — Stage 1 worker
- `faq-writer` — Stage 2 worker (External and Internal modes)
- `requirements-writer` — Stage 3 worker
- `critic` — Reviews all stage outputs against versioned rubrics

## Rubrics

Stage-specific Critic rubrics live in `.claude/rubrics/`. They are versioned JSON files — update them without redeploying any agent.

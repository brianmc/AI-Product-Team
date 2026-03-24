# AI-Product-Team

This repository is a Claude Code extension that guides product managers through Amazon's Working Backwards methodology using a multi-agent pipeline.

## What this does

Running `/working-backwards` starts a strict, stage-gated pipeline:

1. **Stage 1 — Press Release**: Write a customer-centric Press Release before any requirements
2. **Stage 2 — External FAQ**: Stress-test the PR with hard customer questions
3. **Stage 2 — Internal FAQ**: Stress-test with hard engineering/leadership questions
4. **Stage 3 — Visual Demo**: Build a working React + Express prototype of the core user journey
5. **Stage 4 — Documentation**: Write user-facing documentation as if the product ships today
6. **Stage 5 — Telemetry**: Define measurement and instrumentation specs
7. **Stage 6 — Requirements**: Translate the validated artifacts into engineer-ready specs

Each stage must pass a Critic review before the next stage unlocks. No skipping.

After each Critic PASS for Stages 1–4, the validated content is automatically published to a marketing-ready website (`site/`) that builds progressively as the pipeline advances.

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
    press-release.md     ← Stage 1 Critic PASS
    faq-external.md      ← Stage 2 External Critic PASS
    faq-internal.md      ← Stage 2 Internal Critic PASS
    demo/                ← Stage 3 Critic PASS  (npm install && npm start → localhost:3000)
    docs/                ← Stage 4 Critic PASS
    telemetry.md         ← Stage 5 Critic PASS
    requirements.md      ← Stage 6 Critic PASS
    site/                ← built at Stage 1, updated through Stage 4  (npm install && npm run dev → localhost:5173)
    session.json         ← updated after every agent interaction
```

## Agents

- `press-release-writer` — Stage 1 worker
- `faq-writer` — Stage 2 worker (External and Internal modes)
- `demo-builder` — Stage 3 worker
- `docs-writer` — Stage 4 worker
- `telemetry-writer` — Stage 5 worker
- `requirements-writer` — Stage 6 worker
- `critic` — Reviews all stage outputs against versioned rubrics
- `site-builder` — Publishes validated artifacts to a marketing-ready website after each Stage 1–4 Critic PASS

## Rubrics

Stage-specific Critic rubrics live in `.claude/rubrics/`. They are versioned JSON files — update them without redeploying any agent.

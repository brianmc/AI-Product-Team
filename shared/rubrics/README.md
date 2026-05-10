# Shared Critic Rubrics

These rubrics are the runtime-neutral Critic standards for AI-Product-Team.

Claude Code and Codex adapters should use these files as the source of truth for stage evaluation.

## Files

- `stage-1-press-release.json`
- `stage-2-external-faq.json`
- `stage-2-internal-faq.json`
- `stage-3-demo.json`
- `stage-4-docs.json`
- `stage-5-telemetry.json`
- `stage-5-requirements.json`

## Compatibility Note

The existing Claude adapter currently keeps equivalent rubrics under `.claude/rubrics/`. During migration, changes should be made in `shared/rubrics/` first, then synchronized to runtime adapters until adapters read shared files directly.

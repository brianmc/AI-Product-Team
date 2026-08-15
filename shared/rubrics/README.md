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

Claude and Codex both read these rubric files. The older copies in `.claude/rubrics/` remain only for compatibility with earlier Claude sessions and must not be edited for new behavior.

After changing a rubric, run `npm run validate` from the repository root. The validator confirms that every pipeline stage has a valid shared rubric and that both runtime adapters point to this directory.

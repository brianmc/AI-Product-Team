# Codex Adapter

This directory contains Codex-specific workflow instructions for AI-Product-Team.

Codex should use the shared pipeline definition in `../shared/pipeline.json` and produce the same session artifacts as the Claude Code adapter.

## Skills

- `skills/working-backwards/SKILL.md` - start or resume a session
- `skills/wb-status/SKILL.md` - inspect session status without changing files

## Status

The shared pipeline, methodology, and Critic rubrics are now the canonical product definition. Both runtime adapters read the same shared rubrics; run `npm run validate` before changing pipeline behavior.

The remaining migration work is to extract the detailed stage-role instructions and output templates into `shared/` without changing the session compatibility contract.

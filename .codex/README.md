# Codex Adapter

This directory contains Codex-specific workflow instructions for AI-Product-Team.

Codex should use the shared pipeline definition in `../shared/pipeline.json` and produce the same session artifacts as the Claude Code adapter.

## Skills

- `skills/working-backwards/SKILL.md` - start or resume a session
- `skills/wb-status/SKILL.md` - inspect session status without changing files

## Status

This adapter is currently scaffolded. The next implementation step is to move shared methodology, rubrics, templates, and role definitions into `shared/`, then update both Claude and Codex adapters to reference them.

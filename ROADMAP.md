# Roadmap

This roadmap focuses first on making AI-Product-Team a model-, provider-, and runtime-neutral Working Backwards product.

## Now: Portability Foundation

### 1. Portable Product Contract

Maintain one source of truth that does not select a model or provider and can be executed by any compatible host.

Deliverables:

- `shared/pipeline.json`
- `shared/runtime-contract.json`
- `shared/roles.md`
- `shared/README.md`
- Shared methodology, rubrics, templates, and role definitions
- Compatibility contract for session artifacts and Critic verdicts
- Contract validation in local checks and CI

### 2. Host Adapters

Keep host-specific instructions thin and make the same pipeline available in Codex CLI, the Codex app, Claude Code, and Claude Cowork.

Deliverables:

- `AGENTS.md`
- `.codex/skills/working-backwards/SKILL.md`
- `.codex/skills/wb-status/SKILL.md`
- `.claude/` execution instructions
- `.claude-plugin/plugin.json` packaging for Claude Code and Cowork
- A runtime support matrix with installation and verification guidance

No new product features will be added until all four adapters run the same contract successfully.

## Next: Product Truth Refresh

The README reflects the current pipeline better than the PRD in several places. Refresh the PRD so it describes the current 6-stage flow plus dual-runtime strategy.

Deliverables:

- Updated `prd-pm-ai-team.md`
- Resolved/obsolete open questions marked clearly
- New feature backlog captured in the PRD

## Next: Session Index

Add a local session index so PMs can inspect all sessions without remembering IDs.

Deliverables:

- `working-backwards/index.md` generation guidance
- Session status table
- Links to artifacts, demo, docs, and site

## Later: Evidence Locker

Add a durable place for research inputs that agents and the Critic can cite.

Deliverables:

- `evidence.md` or `evidence/` folder per session
- Evidence citation conventions
- Critic guidance for unsupported claims

## Later: Per-Team Rubric Customization

Allow teams to extend base rubrics without forking the methodology.

Deliverables:

- Team override file format
- Rubric version logging
- Merge rules for base and team-specific dimensions

## Later: Exporters

Add selected output integrations after the core pipeline is portable.

Candidate targets:

- Linear issues from requirements
- Notion page export
- Confluence-ready documentation

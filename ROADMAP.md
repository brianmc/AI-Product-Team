# Roadmap

This roadmap focuses on making AI-Product-Team a dual-runtime Working Backwards product for Claude Code and Codex.

## Now: Dual-Runtime Foundation

### 1. Shared Core

Create a runtime-neutral source of truth for the Working Backwards pipeline.

Deliverables:

- `shared/pipeline.json`
- `shared/README.md`
- Shared locations for methodology, rubrics, templates, and agent roles
- Compatibility contract for session artifacts

### 2. Codex Adapter

Add Codex-native instructions that can run the same pipeline without depending on Claude Code conventions.

Deliverables:

- `AGENTS.md`
- `.codex/skills/working-backwards/SKILL.md`
- `.codex/skills/wb-status/SKILL.md`

### 3. Claude Adapter Preservation

Keep the existing Claude Code extension working while reducing duplication over time.

Deliverables:

- Existing `.claude/` behavior remains intact
- Future refactor plan for pointing `.claude/` files at `shared/`

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

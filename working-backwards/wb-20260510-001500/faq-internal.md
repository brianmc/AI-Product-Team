# Internal FAQ: AI-Product-Team Shared Runtime Core

## Q1: What does "dual-runtime support" mean beyond adding `.codex/` files?

Dual-runtime support means Claude Code and Codex can both run the same Working Backwards process from a shared source of truth and produce compatible session artifacts. A cosmetic Codex folder is not enough. The minimum bar is:

- A shared pipeline definition for stage order, artifacts, and gate rules.
- Shared Critic rubrics used by both runtimes.
- A stable session schema both runtimes can read and update.
- Codex adapter instructions that can start, resume, and inspect sessions.
- Validation that a session produced by one runtime remains understandable by the other.

Until those pieces work, Codex support should be described as scaffolded rather than complete.

## Q2: What is the biggest technical risk?

The biggest risk is adapter drift. If `.claude/` and `.codex/` each contain full copies of the process, they will diverge over time. One adapter may add a stage, update a rubric, or change artifact expectations while the other remains stale. That would break the product promise.

Mitigation: define product behavior in `shared/` first, then make runtime adapters thin. During migration, duplicated adapter content should be treated as compatibility glue and synchronized from `shared/`.

## Q3: Should we refactor the existing Claude adapter immediately to read only from `shared/`?

Not all at once. The existing Claude adapter is the working implementation and should not be destabilized just to make the repo look cleaner. The safer sequence is:

1. Add shared core files.
2. Add Codex adapter scaffold.
3. Update docs to define the adapter boundary.
4. Move one low-risk source at a time, starting with rubrics and methodology.
5. Add validation checks for parity.
6. Only then reduce large duplicated orchestration sections.

## Q4: What validation do we need before marking Codex support as ready?

We need at least one end-to-end Codex-authored session that reaches Requirements with the expected artifact layout. We also need compatibility checks that confirm:

- `session.json` contains every stage from `shared/pipeline.json`.
- Every completed stage has its required artifact.
- Every Critic review records a rubric version.
- `[OPEN]` and `[BLOCKER]` items propagate to downstream stages.
- Demo and site artifacts are structurally runnable when local shell access is available.

[OPEN - owner: engineering] Decide whether these checks should be a script, a Codex skill, a GitHub Action, or all three.

## Q5: How do we prevent runtime-specific tool assumptions from leaking into the shared core?

The shared core should describe product behavior, not tool mechanics. It can say "run the Critic using the stage rubric" but should not say "use Claude Agent tool" or "use Codex apply_patch." Those belong in adapters.

A practical rule: if an instruction would be true in both Claude Code and Codex, it belongs in `shared/`. If it names a runtime tool, permission model, slash command, or local verification capability, it belongs in the adapter.

## Q6: Can a session move between Claude Code and Codex mid-pipeline?

[OPEN - owner: product maintainer] The desired answer is yes, but the contract is not proven yet. It requires both runtimes to preserve the same session schema, artifact paths, stage IDs, and Critic review records. Mid-pipeline handoff should not be promised until we test a session started in Claude and resumed in Codex, plus the reverse.

## Q7: What are the legal, privacy, or security implications?

No new data category is introduced by dual-runtime support. The same session artifacts are written to local disk or optionally pushed to GitHub. The main security concern is clarity: users must understand which runtime is handling their product context and where artifacts are persisted.

If future integrations export to Notion, Linear, Confluence, or other systems, those integrations should have separate security review. They are not required for dual-runtime support.

## Q8: What is the maintenance cost?

Maintenance cost increases if adapters duplicate the process. Maintenance cost decreases if the shared core becomes the true source of truth. The core tradeoff is upfront migration work versus long-term clarity.

Near-term maintainers must keep `.claude/rubrics/` and `shared/rubrics/` synchronized until Claude reads shared rubrics directly. That is acceptable as a transition state but should not become permanent.

## Q9: What should ship first?

The first shippable milestone should be "Codex-compatible scaffold," not "complete Codex parity." It should include:

- `shared/pipeline.json`
- Shared methodology and rubrics
- `AGENTS.md`
- `.codex/skills/working-backwards/SKILL.md`
- `.codex/skills/wb-status/SKILL.md`
- A pilot Working Backwards session generated on the Codex branch
- Clear documentation that Codex support is scaffolded and what remains before parity

## Q10: What blocks implementation from proceeding safely?

[BLOCKER - owner: engineering] Local shell execution is currently failing in the active desktop session, which prevents local validation of generated demos, sites, and any future validation scripts. Documentation and GitHub-side artifact work can continue, but Codex parity cannot be considered complete until local execution and verification work reliably.

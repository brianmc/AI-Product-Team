# AI-Product-Team — Capabilities Roadmap

**Author:** brianmc
**Status:** Approved (roadmap); per-phase specs to follow
**Last Updated:** 2026-05-25
**Type:** Master roadmap (decomposes into per-phase specs → plans → builds)

---

## 1. Purpose

Evolve **AI-Product-Team** from a CLI-only Claude Code extension into a
production-grade, multi-surface product that PMs actually use day-to-day, by
incorporating Anthropic's current capabilities: **memory**, **managed agents**,
**Cowork**, and **Claude Design** — while deliberately building each feature so
it also stands as a clean, legible example of the Claude capability behind it.

A second repo, **AI-Product-Knowledge**, becomes the long-term organizational
product-memory store: a structured Markdown wiki (loosely modeled on Karpathy's
LLM wiki) that scales toward enterprise use.

## 2. Goals & non-goals

**Goals**
- A complete, reliable Working Backwards tool a PM can run end-to-end.
- Persistent product knowledge that compounds across enhancement/learning cycles.
- The tool runs from **CLI**, **Cowork**, and (later) a **web** surface.
- Each capability ships with a lightweight "this is an example of X" framing.

**Primary emphasis:** production tool first; the "example of the technology"
framing is layered in where it is cheap (mostly documentation byproducts).

**Non-goals (for now)**
- Multi-tenant SaaS sold to other orgs (assume single-org until decided — see §9).
- Replacing the existing elegant skills/agents/rubrics design.
- Generic PM tooling beyond Working Backwards (per the original PRD's scope).

## 3. Current state (baseline)

- Orchestrator (`/working-backwards`) runs an explicit state machine enforcing
  Press Release → External FAQ → Internal FAQ → Requirements.
- Worker subagents: `press-release-writer`, `faq-writer` (External/Internal).
  `critic` grades against versioned JSON rubrics in `.claude/rubrics/`.
- Persistence via `gh`/`git`: `session.json` + Markdown artifacts under
  `working-backwards/{session-id}/`.
- **Gaps:** no `requirements-writer` agent; Stage 3 is not wired into the
  orchestrator; resume is only implemented for Stage 1. (PRD's "Phase 4".)
- **AI-Product-Knowledge** is effectively empty (LICENSE + README only).

## 4. Key decisions (resolved)

| Decision | Resolution | Rationale |
|---|---|---|
| Primary emphasis | Production tool first; showcase where cheap | User direction |
| Single source of truth for agent logic | **Plugin format** (skills/agents/rubrics) | Runs in CLI + Cowork as-is; least rework |
| When to adopt Managed Agents | **Later**, only to power the hosted web/API surface | Avoids re-platforming before it's needed |
| Build order | 0 → A → B as critical path; C, D after; E cross-cutting | Finish the core, then compound value |
| Documentation | **README updated at every phase** (standing requirement) | User direction |

## 5. Target architecture (end state)

```
        ┌─────────────── SURFACES ───────────────┐
        │  CLI (Claude Code)   Cowork plugin   Web (Claude Design) │
        └──────────────────────┬──────────────────┘
                               │  same skills / slash commands / subagents
        ┌──────────────────────▼──────────────────┐
        │  ENGINE: orchestrator → PR / FAQ /        │
        │  Requirements writers → Critic            │
        │  (today: Claude Code subagents;           │
        │   Phase C: optional Managed Agents)       │
        └──────────────────────┬──────────────────┘
                               │  memory tool (memory_20250818)
        ┌──────────────────────▼──────────────────┐
        │  MEMORY                                   │
        │  • session memory  → working-backwards/   │
        │  • org product memory → AI-Product-       │
        │    Knowledge (Karpathy-style MD wiki)     │
        └───────────────────────────────────────────┘
```

The plugin format is the one authoring source. CLI and Cowork consume it
directly. The web surface (Phase D) calls a Managed Agents deployment (Phase C)
that reuses the same versioned rubrics and prompts.

## 6. The roadmap

### Phase 0 — Finish the core pipeline *(prerequisite)*
A production tool must deliver its full advertised package.
- Build `requirements-writer` agent.
- Add Stage 3 Requirements rubric (`.claude/rubrics/stage-3-requirements.json`).
- Wire Stage 3 into the orchestrator loop (the PR's "Phase 4").
- Implement resume for `faq-external`, `faq-internal`, `requirements`.
- **README:** document the now-complete 4-stage pipeline + Stage 3 usage.
- Effort/Risk: **Low / Low.** No new external tech.
- Showcase: — (completeness).

### Phase A — Organizational Product Memory *(keystone)*
Wire **AI-Product-Knowledge** in as the persistent memory layer via the memory
tool (`memory_20250818`).
- Define the wiki schema (Karpathy-style, scalable). Indicative shape:
  - `products/{product}/overview.md`, `.../features/{feature}.md`,
    `.../decisions/`, `.../personas.md`, `.../glossary.md`
  - cross-product: `org/strategy.md`, `org/personas/`, `org/glossary.md`
  - a navigable index / map-of-content the agent views first.
- **Read-at-start:** at session open, pull relevant product context so the
  PR/FAQ/Requirements agents are grounded in what's already known.
- **Write-at-end:** distill each session's PR/FAQ/Requirements into structured
  updates to that product's wiki pages (features, decisions, open questions).
- Two memory scopes: session/working memory stays in `working-backwards/`;
  long-term org memory lives in AI-Product-Knowledge.
- **README:** document the memory loop and the wiki schema.
- Effort/Risk: **Med / Med.** Schema design is the hard part.
- Showcase: **Claude memory** — the "product knowledge" example.

### Phase B — Cowork surface
Package the (complete, memory-aware) extension as a **Cowork plugin** so PMs use
it without the CLI.
- Plugin manifest + private org plugin marketplace.
- MCP connector if a remote store is needed to reach AI-Product-Knowledge.
- PM-friendly slash-command UX (Cowork's audience is non-technical PMs).
- **README:** add Cowork install/usage instructions alongside CLI.
- Effort/Risk: **Low–Med / Low.** Same format = mostly packaging.
- Showcase: **Cowork plugins.**

### Phase C — Managed Agents engine *(for hosted/web)*
Run the same pipeline server-side via **multiagent orchestration** (lead
orchestrator + specialist subagents), reusing the versioned rubrics/prompts.
- Hosted state persistence, permissions, error recovery.
- Optional: "dreaming" research preview to self-improve critic calibration.
- **README:** document the hosted engine + how it reuses the rubrics.
- Effort/Risk: **Med–High / Med.** New hosted platform (beta).
- Showcase: **Managed agents.**

### Phase D — Claude Design web surface
Use **Claude Design** to read the repos → establish the org design system, then
generate the web experience.
- Product-suite reasoning view over the wiki (browse/relate products).
- Session/package viewer for Working Backwards outputs; pipeline status UI.
- Polished PR/FAQ/Requirements deck & one-pager exports.
- Output feeds the production web app that calls Phase C's API.
- **README:** document the web surface and design system.
- Effort/Risk: **Med / Med.**
- Showcase: **Claude Design.**

### Phase E — Capability showcase layer *(cross-cutting)*
Each phase ships a short "what Claude capability this demonstrates + how to demo
it" note. Produced as a byproduct, not a separate build.
- Maintain a top-level mapping (see §8) of feature → capability → demo path.
- Effort/Risk: **Low / Low.**

**Critical path:** 0 → A → B yields a complete, memory-backed, PM-usable
production tool. C and D extend to web/enterprise and can wait.

## 7. The compounding-knowledge loop (core narrative)

Every Working Backwards session:
1. **Opens** by reading what's already known about the product from
   AI-Product-Knowledge (features shipped, decisions made, personas, open
   questions, glossary).
2. **Runs** the pipeline grounded in that context — so new work builds on prior
   work instead of starting cold.
3. **Closes** by distilling the validated PR/FAQ/Requirements into structured
   updates to the product's wiki pages.

Across many enhancement cycles, the wiki accumulates a coherent, queryable
account of the product suite. That read-at-start / write-at-end loop is the
canonical example of Claude memory in this product.

## 8. Showcase mapping

| Feature in the product | Claude capability it demonstrates |
|---|---|
| Org Product Memory (Phase A) | Memory tool (`memory_20250818`) |
| The PM "team" (Phase C) | Managed agents / multiagent orchestration |
| Cowork plugin (Phase B) | Cowork surfaces & plugins |
| Web dashboard (Phase D) | Claude Design |

## 9. Open questions (resolve in per-phase specs)

1. **Tenancy:** single-org store, or multi-tenant (sold to other orgs)?
   Assumed single-org for now. Affects Phase A schema and Phase C/D auth.
2. **Memory backing seam:** CLI/Cowork can use a local clone + git;
   web/Managed Agents (C/D) need a *remote* memory store that syncs with the
   repo. Designing this seam is the main Phase A↔C dependency.
3. **Phase D output:** is exported HTML from Claude Design sufficient, or is a
   real framework app handed to engineering required?

## 10. Cross-cutting requirements

- **Documentation:** the README is updated as part of every phase's definition
  of done (standing requirement).
- **Rubric versioning:** rubrics remain versioned JSON; any reuse in Managed
  Agents (Phase C) references the same files.
- **Backwards compatibility:** existing CLI sessions and the
  `working-backwards/{session-id}/` layout keep working through every phase.

## 11. Next steps

This roadmap decomposes into independent per-phase efforts. Each phase gets its
own spec → implementation plan → build. The immediate next step is to write the
implementation plan for **Phase 0 (finish the core pipeline)**, the prerequisite
on the critical path.

## 12. References

- Memory tool — Claude API Docs: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
- Claude Managed Agents overview: https://platform.claude.com/docs/en/managed-agents/overview
- Managed Agents new features (multiagent orchestration, dreaming): https://9to5mac.com/2026/05/07/anthropic-updates-claude-managed-agents-with-three-new-features/
- Claude Cowork: https://www.anthropic.com/product/claude-cowork
- Use plugins in Claude Cowork: https://support.claude.com/en/articles/13837440-use-plugins-in-claude-cowork
- Claude Design (Anthropic Labs): https://www.anthropic.com/news/claude-design-anthropic-labs
- Original PRD: `prd-pm-ai-team.md`

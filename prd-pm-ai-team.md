# Working Backwards AI — Multi-Agent PM Team

**Author:** [name]
**Status:** Draft
**Last Updated:** 2026-03-08
**Target Release:** [milestone]

---

> This PRD is itself written Working Backwards.
> The Press Release and FAQ were written first.
> The requirements follow from them — not the other way around.

---

## Press Release

**FOR IMMEDIATE RELEASE**

### Introducing [ProductName]: The AI Team That Makes You Start With the Customer — Every Time

*PM teams can now run Amazon's Working Backwards process for any product idea in under an hour, with an AI team that won't let them skip the hard parts.*

**[City], March 2026** — [Company] today announced [ProductName], a multi-agent AI system that guides product managers through Amazon's Working Backwards methodology — from a raw idea to a validated Press Release, External FAQ, Internal FAQ, and engineer-ready requirements — without letting anyone cut corners.

Most product teams jump straight to solutions. They write requirements for features that haven't been validated. They build products customers didn't ask for. They discover the hard questions — from engineering, from leadership, from legal — only after the build has started.

Working Backwards was designed to prevent exactly this. But doing it rigorously is hard. Writing a compelling Press Release for a product that doesn't exist yet is a skill. Anticipating every question a skeptical engineer or CFO will ask requires experience. Most teams know they should do it, and most teams don't.

[ProductName] makes it unavoidable.

A PM describes an idea in plain language. A Press Release Agent helps them articulate it from the customer's perspective — who has the problem, what the product does, why it matters — until it's genuinely compelling. A FAQ Agent then stress-tests the PR with the hardest questions customers and internal stakeholders would ask, and won't move on until those questions are answered. Only once the PR and FAQ pass a Critic Agent's review does the system unlock the Requirements stage, where a Requirements Agent translates the validated narrative into engineer-ready specifications.

The result is not just a better PRD. It's a product that was worth building before anyone wrote a line of code.

**"Most PM tools help you write faster. [ProductName] helps you think better. There's a big difference between a PM who can type and a PM who can tell you clearly who the customer is, what they need, and why this is the right solution. [ProductName] closes that gap."** — [Spokesperson Name, Title]

[ProductName] is available via [API / CLI / web]. PM teams can get started at [URL]. [Pricing or access details.]

**"We'd been trying to run Working Backwards for two years. The process always fell apart at the FAQ stage — we'd answer the easy questions and declare victory. [ProductName] kept asking the hard ones until we actually had answers. The resulting requirements were the clearest we've ever shipped to engineering."** — [PM Lead, Company]

---

## External FAQ

*Questions a PM or PM team lead would ask before adopting [ProductName].*

**Q: Why Working Backwards specifically? Why not another PM methodology?**
Working Backwards is the most rigorous customer-first framework in practice at scale. The Press Release discipline — writing the product announcement before building the product — forces clarity that no template or ticket system achieves. We picked one methodology and built the entire product around it rather than building a generic AI assistant that produces mediocre output for everything.

**Q: Do I have to know Working Backwards before using this?**
No. The agents guide you through each stage with questions and context. If you've never written a Press Release for an unbuilt product before, the Press Release Agent will teach you the format and push back on vague answers. The methodology is embedded in the process.

**Q: Can I skip the Press Release and go straight to requirements?**
No. This is intentional. The pipeline enforces stage order: Press Release → External FAQ → Internal FAQ → Requirements. If you could skip the PR, you'd be back to writing requirements for an unvalidated idea. The whole point is to prevent that.

**Q: What if my Press Release isn't compelling? Does the system tell me not to build the product?**
Yes — or at least, it tells you clearly that the PR isn't passing and why. A Press Release that can't be made compelling is a signal that the product idea, the customer definition, or the problem statement needs more work. The system doesn't make the build/no-build decision — but it makes the evidence visible.

**Q: What does the output look like?**
A complete Working Backwards package in markdown: (1) a validated Press Release, (2) External FAQ with answers, (3) Internal FAQ with answers, (4) engineer-ready requirements with acceptance criteria, edge cases, and non-functional requirements. Ready to drop into your doc system or repo.

**Q: How long does the full process take?**
Target: under an hour for a well-scoped feature idea. The Press Release stage is typically the longest — 20-30 minutes — because it requires real thinking. FAQ and Requirements flow faster once the PR is locked.

**Q: What if I already have a draft Press Release or some research?**
Paste it in. The agents work from what you provide. If you have a strong PR draft, the Press Release Agent validates and refines rather than starting from scratch. If you have customer quotes or research, the FAQ Agent uses them as evidence.

**Q: Does this work for internal tools and infrastructure, not just customer-facing products?**
Yes. The "customer" in the Press Release can be an internal team. The methodology applies equally — "we are building X for engineers who need Y" is a perfectly valid Press Release premise.

---

## Internal FAQ

*Questions from engineering, leadership, legal, and go-to-market teams.*

**Q: Why build this as a multi-agent system instead of a single model with a long prompt?**
Each Working Backwards stage has distinct goals and failure modes. The Press Release Agent's job is to make a narrative compelling. The FAQ Agent's job is to be adversarial — to find the questions that will sink the product if left unanswered. The Critic's job is to evaluate objectively without the bias of having written the artifact. Conflating these roles in a single prompt produces worse output and makes it impossible to tune specific stages. Separation also enables different model tiers per role and cleaner observability.

**Q: Why enforce stage sequencing instead of letting PMs work flexibly?**
Because flexibility is how teams skip the hard parts. If the system allowed jumping to requirements, most PMs would. The stage gate is the product. Without it, [ProductName] is just another AI writing tool.

**Q: What are the biggest risks to this product?**
1. **PM resistance to the gated process.** If PMs find the stage gates frustrating rather than valuable, they'll stop using it. Mitigation: the quality of the Critic's feedback is everything — it must be specific, fair, and educational, not bureaucratic.
2. **Critic calibration.** A Critic that's too strict creates infinite revision loops. A Critic that's too lenient produces rubber-stamp approvals. Rubric calibration against real PM artifacts before launch is essential.
3. **PR stage bottleneck.** If PMs consistently get stuck at the Press Release stage, the product feels hard rather than helpful. Mitigation: the Press Release Agent must be genuinely collaborative — asking good questions, offering examples, not just pointing out what's wrong.

**Q: How does the system prevent PMs from gaming the Critic?**
It can't prevent deliberate gaming, but the Critic evaluates substance, not form. A PR that uses the right words but doesn't clearly identify a customer or a specific problem will fail. The rubric checks for evidence and specificity, not keyword matching.

**Q: What's the build plan?**
v1: Orchestrator + Press Release Agent + FAQ Agent + Requirements Agent + Critic. Stage-gated pipeline. Markdown output. Built on the Anthropic SDK.
Phase 2: Doc system integrations (Notion, Confluence, Linear). Session persistence. Per-team Critic rubric customization.
Phase 3: Analytics (which stages take longest, which teams produce the strongest PRs). Team-level Working Backwards coaching.

**Q: What's the go-to-market motion? Who are the first teams?**
[OPEN] — needs to be identified. Ideal launch team profile: PM team that has tried Working Backwards before, knows the methodology's value, and is frustrated by inconsistent execution. An internal champion is required.

**Q: What's the business model?**
[OPEN] — separate decision, not in scope for this PRD.

---

## Problem

Most product teams skip the hard thinking. They jump from idea to requirements, from requirements to build, discovering the unanswered questions — from customers, from engineering, from leadership — only after significant time has been invested.

Working Backwards was designed to fix this. By writing the Press Release and FAQ before any design or engineering begins, teams are forced to answer the hard questions while changing course is still cheap. Amazon has run this process for decades. It works.

But doing it rigorously is hard. Writing a genuinely compelling Press Release for a product that doesn't exist requires skill and discipline most PMs haven't developed. Anticipating every hard question from every stakeholder requires experience. The FAQ stage in particular collapses under pressure — teams answer the easy questions and move on. Without a mechanism to enforce rigor, Working Backwards becomes a checkbox, not a discipline.

The result: PRDs that start with requirements instead of customers. Products that solve the wrong problem. Engineering cycles wasted on features that didn't need to be built.

**What happens if we do nothing:** PM teams continue producing artifacts that vary by individual skill. Engineering waste from underspecified or wrongly-specified features continues. Working Backwards remains something teams "try to do" rather than something they actually do.

---

## Success Criteria

- 80% of Working Backwards packages produced with the system receive a PASS from the Critic at the Requirements stage within 90 minutes of the PM starting
- PMs who complete the full pipeline report that the process changed or sharpened their thinking (not just produced an output) — measured via post-session survey, target: ≥4/5
- Engineering teams receiving requirements produced by the system report fewer clarification requests compared to previous PM artifacts — target: ≥30% reduction, measured at 60 days
- At least 3 PM teams with weekly active usage within 90 days of launch
- Zero completed packages where the Press Release was not authored before the Requirements

---

## User Journey

A PM has an idea for a new feature: *"I want to build a bulk export tool for enterprise customers."*

**Stage 1 — Press Release**

1. PM opens [ProductName] and describes the idea in plain language
2. Orchestrator identifies this as a new Working Backwards session and activates the Press Release Agent
3. Press Release Agent asks: *"Who specifically is the customer? What problem are they experiencing today? What does success look like for them?"*
4. PM answers: enterprise admins who need data for compliance audits and currently export records one by one
5. Press Release Agent drafts a Press Release: headline, problem paragraph, solution paragraph, spokesperson quote, customer quote
6. PM reviews the draft — the headline is too vague; the customer quote doesn't feel real
7. Press Release Agent revises; Critic evaluates: customer is specific, problem is evidenced, benefit is clear — **PASS**
8. Orchestrator unlocks Stage 2

**Stage 2 — External FAQ**

9. FAQ Agent generates the 6 hardest questions a skeptical enterprise customer would ask about this feature
10. FAQ Agent drafts initial answers based on the PR context
11. PM reviews — one question ("How does this handle PII in exported data?") doesn't have a good answer yet
12. PM notes this is unresolved; FAQ Agent marks it `[OPEN — requires legal review]`
13. Critic evaluates: all questions answered or explicitly flagged — **PASS**

**Stage 2 continued — Internal FAQ**

14. FAQ Agent switches to Internal mode, generates the hardest questions from engineering, legal, and leadership
15. Engineering question: *"What's the expected export volume? Do we need async processing?"* — PM answers with current data
16. Legal question: *"Does bulk export create GDPR deletion complexity?"* — PM flags as `[OPEN]`
17. Critic evaluates: substantive answers or explicit flags on all questions — **PASS**
18. Orchestrator unlocks Stage 3

**Stage 3 — Requirements**

19. Requirements Agent reads the validated PR and FAQ and drafts engineering requirements with acceptance criteria, edge cases, and non-functional requirements
20. Requirements Agent flags two `[OPEN]` items from the FAQ as gaps in the requirements that need resolution before build
21. Critic evaluates the requirements: acceptance criteria are testable, edge cases are covered, NFRs present — **PASS**
22. PM receives the complete Working Backwards package — PR, External FAQ, Internal FAQ, Requirements — in markdown
23. PM exports to their doc system and shares with engineering

---

## Requirements

### Requirement 1: Orchestrator — Pipeline Sequencing

The Orchestrator must manage the Working Backwards pipeline, enforce stage order, and route each stage to the correct agent. A PM must not be able to proceed to a later stage until the current stage has received a Critic PASS.

**Acceptance Criteria:**
- Given a new session, the Orchestrator always begins at Stage 1 (Press Release) regardless of what the PM describes
- Given a Critic PASS on Stage 1, the Orchestrator advances to Stage 2 (External FAQ) and activates the FAQ Agent in External mode
- Given a Critic PASS on Stage 2 External FAQ, the Orchestrator activates the FAQ Agent in Internal mode
- Given a Critic PASS on Stage 2 Internal FAQ, the Orchestrator advances to Stage 3 (Requirements) and activates the Requirements Agent
- Given a Critic FAIL at any stage, the Orchestrator holds at that stage and returns control to the relevant worker agent for revision — it does not advance
- Given a PM explicitly requesting to skip a stage, the Orchestrator declines and explains why the stage is required
- The Orchestrator passes the full session context (all prior stage outputs) to each agent it activates

---

### Requirement 2: Press Release Agent

The Press Release Agent must help PMs draft a compelling, specific, customer-centric Press Release for their product idea. It must ask clarifying questions until it has enough information to produce a high-quality first draft, and must revise based on Critic feedback.

**Acceptance Criteria:**
- Given a product idea with no customer definition, the Press Release Agent asks for: (a) who specifically is the customer, (b) what problem they experience today, (c) what success looks like for them — before drafting
- Given sufficient context, the Press Release Agent produces a draft containing all required sections: headline, subheading, problem paragraph, solution paragraph, spokesperson quote, getting-started description, and customer quote
- Given a Critic FAIL with specific gaps, the Press Release Agent revises only the failing sections — not the full document
- The Press Release Agent must not write a customer quote that invents specific metrics or outcomes not grounded in PM-provided context; it must use representative language or flag the quote as `[placeholder — replace with real customer quote]`
- Given a product idea with no clear customer benefit, the Press Release Agent surfaces this explicitly rather than drafting a vague PR: *"I can't write a compelling headline because it's not clear what the customer gets. Let's start there."*

---

### Requirement 3: FAQ Agent

The FAQ Agent must operate in two modes — External (customer questions) and Internal (engineering/leadership/legal questions) — generating hard questions and drafting initial answers from the validated Press Release context.

**Acceptance Criteria:**
- Given a validated Press Release (Stage 1 PASS), the FAQ Agent in External mode generates 5-8 questions a skeptical target customer would ask, prioritized by the questions most likely to reveal product weaknesses
- Given a validated Press Release and External FAQ (Stage 2 External PASS), the FAQ Agent in Internal mode generates 5-8 questions from engineering, legal, finance, and leadership, prioritized by the questions most likely to block the build
- For each question, the FAQ Agent drafts an initial answer using context from the PR and any PM-provided information
- Given a question the PM cannot answer, the FAQ Agent marks it `[OPEN — owner: X]` rather than drafting a speculative answer
- The FAQ Agent must not generate softball questions. Each question must represent a genuine challenge to the product's viability, customer definition, or implementation feasibility
- Given a PM answer that is vague or non-committal, the FAQ Agent flags it: *"This answer doesn't fully resolve the question. Do you want to go deeper or mark it open?"*

---

### Requirement 4: Requirements Agent

The Requirements Agent must translate a validated Working Backwards package (Press Release + External FAQ + Internal FAQ) into engineer-ready requirements. It activates only after all Stage 2 Critic checks have passed.

**Acceptance Criteria:**
- Given a complete validated Working Backwards package, the Requirements Agent produces a requirements document containing: (a) problem statement derived from the PR, (b) success criteria derived from the PR's stated customer benefit, (c) user journey, (d) functional requirements with acceptance criteria, (e) scope (in/out), (f) edge cases, (g) non-functional requirements
- Each acceptance criterion must follow a given/when/then structure
- Given `[OPEN]` items in the FAQ, the Requirements Agent surfaces them explicitly as `[OPEN]` gaps in the relevant requirements section — it does not silently drop them or draft requirements around unresolved questions
- Given a requirement that cannot be made testable, the Requirements Agent flags it `[NEEDS CLARIFICATION]` rather than writing vague criteria
- Requirements output must be valid markdown importable to standard doc systems

---

### Requirement 5: Critic Agent — Stage-Specific Rubrics

The Critic Agent must evaluate outputs at each stage against a rubric specific to that stage. It returns a structured PASS or NEEDS REVISION verdict with inline, actionable feedback.

**Stage 1 — Press Release Rubric:**

**Acceptance Criteria:**
- Given a PR draft, the Critic evaluates: (a) Is the customer defined specifically — not "users" or "enterprises" but a named persona or segment? (b) Is the problem evidenced — with a specific pain, not a general frustration? (c) Is the benefit concrete — does a customer know what they get? (d) Is the spokesperson quote substantive — not generic marketing language? (e) Is the customer quote specific and believable?
- Given a PR where any dimension fails, the Critic returns NEEDS REVISION with the specific failing dimension(s) and a concrete suggestion per gap
- Given a PR where all dimensions pass, the Critic returns PASS and a one-sentence summary of what makes this PR strong

**Stage 2 — FAQ Rubric (External and Internal):**

**Acceptance Criteria:**
- Given an External FAQ, the Critic evaluates: (a) Do the questions represent genuine customer challenges — not softballs? (b) Is every question answered or explicitly marked `[OPEN]`? (c) Are any critical customer concerns missing entirely?
- Given an Internal FAQ, the Critic evaluates: (a) Do the questions cover engineering feasibility, legal/compliance, and business model? (b) Is every question answered or explicitly `[OPEN]`? (c) Are open items assigned an owner?
- Given a FAQ where a question's answer is vague or evasive, the Critic flags it as NEEDS REVISION: *"This answer restates the question without resolving it."*

**Stage 3 — Requirements Rubric:**

**Acceptance Criteria:**
- Given a requirements document, the Critic evaluates: (a) Does every requirement trace back to the PR or FAQ? (b) Can every acceptance criterion be tested? (c) Are edge cases covered? (d) Are non-functional requirements (performance, security, scale) present or explicitly `[OPEN]`? (e) Are all `[OPEN]` items from the FAQ surfaced in the requirements?
- The Critic must not alter the content of any document — it annotates only
- The Critic must complete review within 10 seconds for documents up to 5,000 tokens

---

### Requirement 6: Quality Rubric Configuration

The rubrics used by the Critic must be stored as versioned, configurable structured configuration — not hardcoded in the Critic's prompt.

**Acceptance Criteria:**
- Rubrics for all three stages are defined in structured configuration with explicit pass/fail criteria per dimension
- Changes to any rubric are versioned; the rubric version used in each Critic review is logged with the output
- Rubric updates do not require agent redeployment
- [OPEN] Per-team rubric customization — v1 or Phase 2?

---

## Scope

### In Scope
- Orchestrator with stage-gated Working Backwards pipeline (Stage 1 → 2 → 3 → 4 → 5)
- Press Release Agent
- FAQ Agent (External and Internal modes)
- Demo Builder Agent — generates a working React + Express app demonstrating the core user journey
- Documentation Agent — writes user-facing documentation (getting started, how-to guides) as if the product already ships
- Requirements Agent
- Critic Agent with stage-specific rubrics
- Complete Working Backwards output package: PR + External FAQ + Internal FAQ + Demo app + Docs + Requirements
- Natural language input — no templates or forms required

### Out of Scope (Future)
- Roadmaps, research synthesis, stakeholder communications — the product is Working Backwards, not generic PM tooling
- Doc system integrations beyond GitHub (Notion, Confluence, Linear) — future
- Per-team rubric customization — future
- Analytics and team-level coaching — future
- Automated output publishing — future

---

## Edge Cases

- **PM tries to skip a stage:** Orchestrator declines and explains the stage's purpose — it does not route around the pipeline
- **Press Release can't be made compelling after 3 revision cycles:** System surfaces this explicitly: *"After multiple revisions, the PR is not passing the customer-definition and problem-evidence checks. This may indicate the idea needs more customer research before a Working Backwards process can succeed."* Returns the best draft with a summary of unresolved gaps
- **FAQ generates a question the PM explicitly refuses to answer:** The FAQ Agent marks it `[OPEN — PM declined to answer]` and the Critic notes it as a risk in the Stage 2 review — it does not block progress but makes the gap visible
- **PM provides a pre-written Press Release:** Press Release Agent validates it against the Stage 1 rubric directly rather than starting from scratch — skips the drafting process, not the validation process
- **Internal FAQ reveals a build-blocking issue (e.g., legal risk):** The Requirements Agent surfaces it as a `[BLOCKER — requires resolution before build]` item — it does not draft requirements that assume the blocker is resolved
- **Very long input (e.g., pasting a long research document):** The relevant agent processes up to 50,000 tokens and notes if input was truncated — it does not silently ignore content
- **Resuming an in-progress session:** When a PM returns to a session, the Orchestrator reads the current state from GitHub (which files exist, which Critic reviews have passed) and resumes at the correct stage — it does not restart the pipeline from Stage 1
- **GitHub repo not accessible:** If the configured repo cannot be reached at session start, the system surfaces an error before the PM begins work — it does not allow a session to proceed without a confirmed persistence target
- **Concurrent edits to session files:** If a session file has been manually edited in GitHub since the last agent write, the Orchestrator surfaces a conflict warning and asks the PM to confirm which version to proceed from

---

## Technical Requirements

- **Latency:** Each stage (agent output + Critic review) must complete within 30 seconds for standard inputs; full pipeline (all three stages, no revision cycles) must complete within 90 seconds
- **Model:** Built on Claude via the Anthropic SDK; `claude-opus-4-6` for Critic and Orchestrator, `claude-sonnet-4-6` acceptable for worker agents
- **Agent communication:** Structured message passing between agents (not raw text); each message includes: stage identifier, prior stage outputs, current artifact, and Critic review history
- **Session context:** Full prior-stage outputs must be available to every downstream agent — the Requirements Agent must have the complete PR and FAQ when generating requirements
- **Persistence:** Every stage output (PR draft, FAQ, Requirements) must be committed to the configured GitHub repository after each Critic PASS using standard `git` commands. Session state (current stage, revision history, Critic verdicts) must be stored in a `session.json` file in the same repo. A PM must be able to close and resume a session with no loss of progress.
- **GitHub tooling:** All GitHub operations use the `gh` CLI and standard `git` commands — no MCP server required. Prerequisite: `gh` CLI installed and authenticated (`brew install gh && gh auth login`). The system must verify `gh` is authenticated before starting a session.
- **Observability:** Each agent invocation logged with: agent name, stage, input/output token counts, latency, Critic pass/fail, and revision cycle count
- **API key management:** User-provided Anthropic API key; not stored beyond the session
- **Rate limiting:** Anthropic API rate limit errors must surface a user-facing message with a suggested retry time — no silent failures

---

## Technical Context

- Built as Claude Code extensions: slash commands for the Orchestrator, subagents for each worker and the Critic
- All GitHub operations use `gh` CLI and `git` — no MCP server. A `skills/github-operations/SKILL.md` file provides shared instructions for all agents: *"Use `gh` CLI and standard git commands for all GitHub operations. Use `git add/commit/push` to persist stage outputs. Use `gh api repos/{owner}/{repo}/contents/{path}` to read files outside a working directory."*
- Stage outputs (PR, FAQ, Requirements) are written to disk and committed to GitHub as markdown files after each PASS — not buffered in memory only
- The stage-gate logic lives in the Orchestrator command, not in the individual agents — agents produce and revise; the Orchestrator controls flow
- Session state is stored as `session.json` in the GitHub repo alongside the artifact files; it records: current stage, revision counts per stage, Critic verdicts, and `[OPEN]` item count per stage
- Suggested repo structure per Working Backwards session:
  ```
  /working-backwards/
    {session-id}/
      press-release.md        ← committed on Stage 1 PASS
      faq-external.md         ← committed on Stage 2 External PASS
      faq-internal.md         ← committed on Stage 2 Internal PASS
      demo/                   ← committed on Stage 3 PASS
        package.json
        src/                  ← React front end
          App.jsx
          components/
        server/
          index.js            ← Express backend with mock data
        README.md             ← npm install && npm start
      docs/                   ← committed on Stage 4 PASS
        getting-started.md
        how-to-guides.md
      requirements.md         ← committed on Stage 5 PASS
      session.json            ← updated after every agent interaction
  ```
- Prerequisites for running the demo: Node.js ≥18 and npm. The Demo Builder agent generates a `README.md` inside `demo/` with exact run instructions.
- [RESOLVED 2026-03-08] Orchestrator routing: explicit state machine over model-based classifier. A fixed pipeline with known stages maps cleanly to a state machine — simpler, more predictable, easier to debug.
- [RESOLVED 2026-03-08] GitHub integration: `gh` CLI + `git` over GitHub MCP server. Simpler setup, transparent operations, no additional configuration required beyond `gh auth login`.

---

## Open Questions

- [OPEN] Per-team Critic rubric customization — v1 or Phase 2?
- [OPEN] Input UX — CLI, web UI, or API-only for v1? Biggest single lever on adoption.
- [RESOLVED 2026-03-08] Session persistence — all stage outputs and session state are persisted to a GitHub repository after each Critic PASS. GitHub is the only supported persistence target for v1. PMs must configure a repo and token at session start.
- [OPEN] First 3 launch teams — who are they? Ideal profile: already familiar with Working Backwards, frustrated by inconsistent execution, has an internal champion.
- [OPEN] Business model — separate decision, not in scope for this PRD.
- [RESOLVED 2026-03-11] Phase structure — 5 stages: Press Release → FAQ (External + Internal) → Visual Demo (React + Express app, runnable on localhost) → Documentation (user-facing docs written before requirements) → Requirements (PRD). This aligns with Amazon's full Working Backwards process and ensures requirements are grounded in a demonstrable, documented customer experience.
- [RESOLVED 2026-03-08] Methodology scope — strict Working Backwards pipeline, not generic PM tooling. The product is opinionated by design.
- [RESOLVED 2026-03-07] Agent architecture — Orchestrator + specialized agents + Critic review loop, over single-model or generic PM assistant approaches.

---

## References

- [Anthropic SDK documentation]
- [Claude model capabilities and context windows]
- [Working Backwards by Colin Bryar and Bill Carr — source methodology]
- [OPEN] Competitive analysis: Notion AI, Atlassian Intelligence, Amazon internal WB tooling (if publicly documented)
- [OPEN] User research / PM team interviews

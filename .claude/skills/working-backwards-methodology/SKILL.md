---
name: working-backwards-methodology
description: Reference knowledge for Amazon's Working Backwards methodology. Loaded automatically by all agents in the Working Backwards pipeline.
user-invocable: false
---

# Working Backwards Methodology

Working Backwards is Amazon's product development discipline: start from the customer experience and work backwards to the technology. The Press Release and FAQ are written *before* any design or engineering begins.

> "If you can't write a clear, compelling Press Release, you don't understand what you're building yet."

## The pipeline (in order, no skipping)

### Stage 1: Press Release

Written as if the product has already shipped. Forces the team to describe the product from the customer's perspective.

**Required sections:**
1. **Headline** — One sentence. Product name + the customer benefit. Not a feature list.
2. **Subheading** — Who is the customer and what can they now do?
3. **Problem paragraph** — The specific pain the customer has today. Evidenced, not assumed.
4. **Solution paragraph** — How the product solves it. Key capabilities in plain language.
5. **Spokesperson quote** — Why this matters from the company's perspective. Substantive, not generic.
6. **Getting started** — How does a customer begin using it?
7. **Customer quote** — A realistic quote from a representative customer. Specific and believable.

**What makes a Press Release fail the Critic:**
- Customer is vague ("users", "enterprises") rather than a named persona or segment
- Problem is generic ("it's frustrating") rather than specific and evidenced
- Benefit is unclear — the customer can't tell what they actually get
- Spokesperson quote is marketing boilerplate
- Customer quote invents specific metrics not grounded in real data

---

### Stage 2: External FAQ

The hardest questions a skeptical target customer would ask. Prioritised by which questions are most likely to reveal product weaknesses.

**What makes a strong External FAQ:**
- 5–8 questions minimum
- Every question is a genuine challenge — not a softball
- Every question is answered honestly, or explicitly marked `[OPEN — owner: X]`
- No evasive answers that restate the question without resolving it

**Common External FAQ questions to consider:**
- Does this replace something I already have?
- What happens to my data?
- What does this cost?
- What do I have to change about my current workflow?
- What happens when it goes wrong?
- How is this different from [competitor]?

---

### Stage 2: Internal FAQ

The hardest questions from engineering, legal, finance, and leadership. Prioritised by which questions are most likely to block the build.

**What makes a strong Internal FAQ:**
- Covers engineering feasibility, legal/compliance, and business model
- Every question answered or explicitly `[OPEN — owner: X]`
- Open items have an assigned owner — not just "TBD"
- Build-blocking issues are flagged as `[BLOCKER]`

**Common Internal FAQ questions to consider:**
- Why now? Why us?
- What's the build plan? What does v1 include?
- What are the biggest technical risks?
- What are the biggest adoption risks?
- How do we measure success?
- What's the business model?
- Are there legal or compliance implications?

---

### Stage 3: Requirements

Translated directly from the validated Press Release and FAQ. The requirements justify themselves by tracing back to the PR and FAQ — not invented independently.

**Every requirement must have:**
- A clear description
- Acceptance criteria in given/when/then format
- Any `[OPEN]` items from the FAQ surfaced as explicit gaps

**What makes requirements fail the Critic:**
- Acceptance criteria that can't be tested
- Requirements with no traceable connection to the PR or FAQ
- `[OPEN]` items from the FAQ silently dropped
- Missing non-functional requirements (performance, security, scale)
- Edge cases not covered

---

## [OPEN] item handling

Throughout the pipeline, unresolved questions are marked `[OPEN — owner: X]`. They:
- Do not block stage progression (but are noted in the Critic review)
- Are carried forward to the next stage
- Surface as explicit gaps in the Requirements document
- Must never be silently dropped or worked around

A `[BLOCKER — owner: X]` is an [OPEN] item that prevents the build from proceeding until resolved. These are flagged prominently in the Requirements.

---

## What this is not

- **Not a feature wishlist.** The PR describes customer outcomes, not a list of features.
- **Not a solution spec.** The PR is written before the solution is designed.
- **Not a template exercise.** A PR that uses the right words but lacks specificity fails the Critic.
- **Not optional.** The pipeline enforces stage order. You cannot write Requirements before the PR and FAQ pass.

# Working Backwards Methodology

Working Backwards is a product development discipline: start from the customer experience and work backwards to the technology. The Press Release and FAQ are written before implementation requirements.

The AI-Product-Team pipeline is intentionally stage-gated. Each stage must pass Critic review before the next stage unlocks.

## Pipeline

1. Press Release
2. External FAQ
3. Internal FAQ
4. Visual Demo
5. Documentation
6. Telemetry
7. Requirements

## Stage 1: Press Release

Written as if the product has already shipped. It forces the team to describe the product from the customer's perspective.

Required sections:

- Headline: one sentence with product name and specific customer benefit.
- Subheading: who the customer is and what they can now do.
- Problem paragraph: specific, evidenced pain.
- Solution paragraph: what the product does in plain language.
- Spokesperson quote: why this matters, not generic launch copy.
- Getting started: how a customer begins using it.
- Customer quote: specific and believable, marked as placeholder when not validated.

## Stage 2: External FAQ

The hardest questions a skeptical target customer would ask. Questions should focus on adoption blockers such as data/privacy, cost, workflow change, failure modes, and alternatives.

Every question must be answered or marked `[OPEN - owner: X]`.

## Stage 2: Internal FAQ

The hardest questions from engineering, legal, finance, leadership, and go-to-market stakeholders.

Open items that prevent a safe build must be marked `[BLOCKER - owner: X]`.

## Stage 3: Visual Demo

A working React + Express app that demonstrates the core user journey from the validated Press Release and FAQs. The demo should make the customer, problem, core action, and outcome visible.

## Stage 4: Documentation

Documentation written as if the product already ships. The format should match the product type: user guide, API/developer docs, admin/ops guide, or a combination.

## Stage 5: Telemetry

A measurement and instrumentation spec that defines how the product's success will be validated in production. It must cover adoption, non-adoption, time-to-value, and customer delight.

## Stage 6: Requirements

Engineer-ready requirements derived from the validated prior artifacts. Requirements must include testable acceptance criteria and must surface every relevant `[OPEN]` and `[BLOCKER]` item.

## Open Item Handling

Unresolved questions are marked `[OPEN - owner: X]`. They do not disappear. They must be carried forward and surfaced in downstream artifacts.

A `[BLOCKER - owner: X]` is an open item that prevents the build from proceeding safely until resolved.

## What This Is Not

- Not a feature wishlist.
- Not a generic AI writing assistant.
- Not a template exercise.
- Not a process where stages can be skipped.

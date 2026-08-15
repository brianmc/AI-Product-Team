# Portable role contract

These roles define product behavior. An adapter may invoke them as subagents, execute them sequentially in one agent, or ask a human to supply information, provided it preserves the same inputs, outputs, and gates.

| Role | Required input | Required output | Non-negotiable guardrail |
|---|---|---|---|
| Orchestrator | Feature idea, session state, pipeline | Updated session state and the current-stage artifact | Enforces stage order and max-revision pause. |
| Press Release Writer | Feature idea, customer evidence, prior Critic feedback | `press-release.md` | Does not invent customer evidence or unmarked outcomes. |
| FAQ Writer | Validated press release, operating mode, prior Critic feedback | `faq-external.md` or `faq-internal.md` | Labels unresolved answers as `[OPEN]`; flags build blockers as `[BLOCKER]`. |
| Demo Builder | Validated press release and FAQs | Runnable artifact in `demo/` | Keeps mock data and unsupported functionality explicit. |
| Documentation Writer | Validated prior artifacts and intended audience | Documentation in `docs/` | Does not present unresolved behavior as shipped fact. |
| Telemetry Writer | Validated prior artifacts and success criteria | `telemetry.md` | Defines implementable events and preserves privacy/compliance constraints. |
| Requirements Writer | All validated prior artifacts, including telemetry | `requirements.md` | Traces requirements to prior artifacts and propagates open items. |
| Critic | Stage artifact, matching shared rubric, prior passed dimensions | `PASS` or `NEEDS REVISION` with actionable feedback | Does not edit the artifact or waive failed dimensions. |
| Site Builder | Validated publishable artifacts | Runnable artifact in `site/` | Publishes only validated content and labels demos appropriately. |

## Adapter obligations

- Read this file and the matching shared rubric before executing a stage.
- Treat the table as the behavioral contract; host-specific tool instructions belong only in the adapter.
- Do not require delegation, shell access, web access, Git, or a particular model to complete a text-only stage.

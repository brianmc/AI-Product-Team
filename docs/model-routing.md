# Model routing

Model selection is an adapter concern. The Working Backwards pipeline stays provider- and model-neutral, while a local routing manifest selects a model for each role.

## Configure a runtime

1. Copy `.ai-product-team/model-routing.example.json` to `.ai-product-team/model-routing.local.json`.
2. Set the referenced environment variables, or replace the placeholders with your approved provider and model identifiers.
3. Run `node scripts/validate-model-routing.mjs .ai-product-team/model-routing.local.json` in the target environment before starting a session.

`npm run validate:model-routing` checks the committed, provider-neutral example.

The local file is ignored by Git. It may identify providers and models, but must never contain API keys or other credentials.

## Suggested model capabilities by role

| Role | Select a model suited for |
|---|---|
| Orchestrator | Long-context reasoning and reliable state management |
| Press Release, FAQ, Documentation | Product writing, synthesis, and instruction following |
| Telemetry, Requirements | Structured reasoning and technical specification writing |
| Demo Builder, Site Builder | Full-stack code generation and local debugging |
| Critic | Independent, adversarial review with strong rubric adherence |

## Routing rules

- Every role must resolve to a non-empty provider and model.
- Worker roles may use the same provider or different providers.
- The Critic must set `independent_review: true` and resolve to a provider different from every non-Critic role.
- A runtime that cannot invoke the configured Critic provider must report that independent review is unavailable; it must not describe a host-native review as independent.

## Host responsibilities

Hosts may expose model selection differently. The adapter maps each route to the host's model-selection mechanism or to an approved external provider adapter. Provider credentials, network access, and user approvals remain host-local.

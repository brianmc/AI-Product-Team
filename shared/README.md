# Shared Working Backwards Core

This directory contains provider- and runtime-neutral product definitions for AI-Product-Team.

Every adapter must consume this core rather than redefining the Working Backwards process independently. The core must not name or require a particular model, model provider, agent framework, or tool API.

## Contents

- `pipeline.json` - canonical stage order, artifact names, gate rules, and runtime compatibility expectations.
- `runtime-contract.json` - portability guarantees and the minimum capabilities an adapter must provide.
- `roles.md` - runtime-neutral responsibilities, inputs, outputs, and guardrails for every pipeline role.

Shared directories:

- `methodology/` - Working Backwards reference material.
- `rubrics/` - Critic rubrics used by every runtime.

## Rule

If a behavior affects the product process, define it here first. Runtime-specific adapters may explain how to execute it with their host's tools, but they must not invent different stage semantics, select a model, or require a provider-specific service.

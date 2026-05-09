# Shared Working Backwards Core

This directory contains runtime-neutral product definitions for AI-Product-Team.

Claude Code and Codex adapters should both consume this shared core rather than redefining the Working Backwards process independently.

## Contents

- `pipeline.json` - canonical stage order, artifact names, gate rules, and runtime compatibility expectations.

Planned shared directories:

- `agents/` - runtime-neutral role definitions for each stage agent.
- `methodology/` - Working Backwards reference material.
- `rubrics/` - Critic rubrics used by every runtime.
- `templates/` - output and session templates.

## Rule

If a behavior affects the product process, define it here first. Runtime-specific adapters may explain how to execute the behavior in Claude Code or Codex, but they should not invent different stage semantics.

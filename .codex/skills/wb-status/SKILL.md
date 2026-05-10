---
name: wb-status
description: Display the current state of a Working Backwards session in Codex. Read-only.
argument-hint: "[session-id]"
---

# Codex Working Backwards Status

This skill is read-only. It must not modify session files.

## Steps

1. Resolve the session ID from arguments. If omitted, inspect `working-backwards/` and choose automatically only when exactly one session exists.
2. Read `working-backwards/{session-id}/session.json`.
3. Display:
   - session ID
   - feature idea
   - created and updated timestamps
   - current stage
   - each stage status, critic verdict, and revision count
   - present and missing artifacts
4. Suggest the next command:
   - resume if in progress
   - review package if complete

## Compatibility

Use the stage list from `shared/pipeline.json` so Codex and Claude status output do not drift.

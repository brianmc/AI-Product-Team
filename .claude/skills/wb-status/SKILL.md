---
name: wb-status
description: Display the current state of a Working Backwards session. Read-only — does not modify any session files.
argument-hint: "[session-id]"
allowed-tools: Bash, Read
skills:
  - github-operations
---

# Working Backwards Session Status

Display the current status of a Working Backwards session. This command is read-only.

## Step 1: Resolve the session ID

If `$ARGUMENTS` is provided, use it as the session ID.

If no argument is provided, list available sessions:
```bash
ls working-backwards/
```

If there is only one session, use it automatically. If there are multiple, ask the PM which one to view.

## Step 2: Read session state

```bash
git pull --quiet
cat working-backwards/{session-id}/session.json
```

If `session.json` does not exist:
> "No session found with ID `{session-id}`. Run `/working-backwards` to start a new session, or check the session ID and try again."

## Step 3: Display status

Parse the `session.json` and display in this format:

```
─────────────────────────────────────────────────────────────
  WORKING BACKWARDS SESSION
  ID:      {session_id}
  Feature: {feature_idea}
  Started: {created_at}
  Updated: {updated_at}
─────────────────────────────────────────────────────────────
  Stage 1: Press Release        [ {STATUS} ]  {revision note}
  Stage 2: External FAQ         [ {STATUS} ]  {revision note}
  Stage 2: Internal FAQ         [ {STATUS} ]  {revision note}
  Stage 3: Requirements         [ {STATUS} ]  {revision note}
─────────────────────────────────────────────────────────────
  Current stage: {current_stage}
─────────────────────────────────────────────────────────────
```

Status values:
- `PENDING` — not yet started
- `IN PROGRESS` — currently active
- `PASS` — Critic approved, committed to GitHub

Revision note format: `({n} revision(s))` if revision_count > 0, otherwise blank.

## Step 4: Show committed artifacts

List which output files have been committed:
```bash
ls working-backwards/{session-id}/
```

For each artifact file present (press-release.md, faq-external.md, faq-internal.md, requirements.md), show:
```
  Committed artifacts:
    ✓ press-release.md
    ✗ faq-external.md   (pending)
    ...
```

## Step 5: Show next action

Based on `current_stage` and its status, suggest the next step:

- If any stage is `in-progress`: "Run `/working-backwards resume {session-id}` to continue."
- If all stages are `PASS`: "This session is complete. All artifacts are committed to GitHub."
- If `current_stage` is `pending`: "Run `/working-backwards resume {session-id}` to begin {stage name}."

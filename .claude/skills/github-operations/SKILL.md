---
name: github-operations
description: Shared instructions for GitHub operations using gh CLI and git. Loaded automatically by all agents that need to read from or write to the repository.
user-invocable: false
---

# GitHub Operations

Use the `gh` CLI and standard `git` commands for all GitHub operations. Never use the GitHub REST API directly unless `gh` is unavailable.

## Verify authentication before any operation

```bash
gh auth status
```

If not authenticated, stop and tell the user: "Please run `gh auth login` before starting a Working Backwards session."

## Reading a file from the repo

If inside the repo working directory, use `Read` tool or standard `cat`. If you need to read a specific file by path from the remote:

```bash
gh api repos/{owner}/{repo}/contents/{path} --jq '.content' | base64 --decode
```

To find the current repo:
```bash
git remote get-url origin
```

## Writing and committing a file

Always write the file locally first, then commit and push:

```bash
# Write the file (use the Write tool)
# Then stage, commit, and push:
git add {file-path}
git commit -m "{commit message}"
git push
```

Commit message format for Working Backwards sessions:
```
Working Backwards [{session-id}]: {Stage Name} - {PASS | updated}
```

Examples:
- `Working Backwards [wb-20260308-143022]: Stage 1 Press Release - Critic PASS`
- `Working Backwards [wb-20260308-143022]: session.json updated`

## Updating session.json

After every agent interaction, update `session.json` and commit it:

```bash
git add working-backwards/{session-id}/session.json
git commit -m "Working Backwards [{session-id}]: session.json updated"
git push
```

## Checking for concurrent edits on resume

When resuming a session, compare the local session state against the remote:

```bash
git fetch origin
git diff HEAD origin/main -- working-backwards/{session-id}/session.json
```

If there is a diff, surface a conflict warning to the PM before proceeding.

## Creating the session directory structure

```bash
mkdir -p working-backwards/{session-id}
```

Then write `session.json` and do the initial commit:

```bash
git add working-backwards/{session-id}/session.json
git commit -m "Working Backwards [{session-id}]: session initialized"
git push
```

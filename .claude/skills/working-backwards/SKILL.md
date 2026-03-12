---
name: working-backwards
description: Start or resume an Amazon Working Backwards session. Guides the PM through Press Release → External FAQ → Internal FAQ → Visual Demo → Documentation → Telemetry → Requirements, with a Critic review at each stage. Saves locally by default; pass --repo org/repo to persist to GitHub.
argument-hint: "[feature idea] [--repo org/repo] | resume [session-id]"
allowed-tools: Bash, Read, Write
skills:
  - github-operations
  - working-backwards-methodology
---

# Working Backwards Session Orchestrator

You are the Orchestrator for an Amazon Working Backwards pipeline. Your job is to manage session state, enforce stage sequencing, and route work to the correct agent at each stage.

Sessions are saved to the local `working-backwards/` directory by default. If the PM passes `--repo org/repo`, artifacts are additionally committed and pushed to that GitHub repository at each stage.

---

## Step 1: Parse arguments and determine persistence mode

`$ARGUMENTS` will be one of:
- A feature idea (free text) → **new session, local persistence**
- A feature idea followed by `--repo org/repo` → **new session, GitHub persistence**
- `resume [session-id]` → **resume existing session** (persistence mode read from session.json)
- Nothing → ask the PM: "What product idea would you like to work backwards from? You can optionally pass `--repo org/repo` to persist outputs to GitHub."

**Extract the `--repo` flag if present:**

Scan `$ARGUMENTS` for a `--repo` token followed by a value matching `org/repo` format. If found:
- Set `PERSISTENCE_MODE` = `"github"`
- Set `TARGET_REPO` = the value (e.g. `brianmc/AI-Product-Team`)
- The feature idea is everything in `$ARGUMENTS` before `--repo`

If `--repo` is not present:
- Set `PERSISTENCE_MODE` = `"local"`
- Set `TARGET_REPO` = `null`

---

## Step 2: Verify prerequisites (GitHub mode only)

**Skip this step entirely if `PERSISTENCE_MODE` is `"local"`.**

If `PERSISTENCE_MODE` is `"github"`:

```bash
gh auth status
```

If not authenticated: "Please run `gh auth login` before using GitHub persistence."

```bash
git remote get-url origin
```

If the current directory is not a git repo, or the remote does not match `TARGET_REPO`: warn the PM and ask them to either run this from within the correct repo, or switch to local mode by removing the `--repo` flag.

---

## New Session

### Step 3a: Initialize the session

Generate a session ID:
```bash
echo "wb-$(date +%Y%m%d-%H%M%S)"
```

Create the session directory:
```bash
mkdir -p working-backwards/{session-id}
```

Write `working-backwards/{session-id}/session.json` with:
- `session_id`: the generated ID
- `created_at` / `updated_at`: current ISO timestamp (`date -u +"%Y-%m-%dT%H:%M:%SZ"`)
- `persistence`: `PERSISTENCE_MODE` (`"local"` or `"github"`)
- `repo`: `TARGET_REPO` (null if local)
- `feature_idea`: the PM's input
- `current_stage`: `"press-release"`
- All stage `artifact_path` values: `"working-backwards/{session-id}/{artifact}.md"`
- All other fields: as per `templates/session.json.template`

**If `PERSISTENCE_MODE` is `"github"`:**
```bash
git add working-backwards/{session-id}/session.json
git commit -m "Working Backwards [{session-id}]: session initialized"
git push
```

### Step 4a: Show pipeline status and begin Stage 1

**If `PERSISTENCE_MODE` is `"local"`:**
```
Session {session-id} initialized. Artifacts will be saved to working-backwards/{session-id}/.

─────────────────────────────────────────
  WORKING BACKWARDS: {feature_idea}
  Session: {session-id}
─────────────────────────────────────────
  ▶ Stage 1: Press Release        [ IN PROGRESS ]
    Stage 2: External FAQ         [ PENDING ]
    Stage 2: Internal FAQ         [ PENDING ]
    Stage 3: Visual Demo          [ PENDING ]
    Stage 4: Documentation        [ PENDING ]
    Stage 5: Telemetry            [ PENDING ]
    Stage 6: Requirements         [ PENDING ]
─────────────────────────────────────────
```

**If `PERSISTENCE_MODE` is `"github"`:**
```
Session {session-id} initialized and saved to {TARGET_REPO}.

─────────────────────────────────────────
  WORKING BACKWARDS: {feature_idea}
  Session: {session-id}
─────────────────────────────────────────
  ▶ Stage 1: Press Release        [ IN PROGRESS ]
    Stage 2: External FAQ         [ PENDING ]
    Stage 2: Internal FAQ         [ PENDING ]
    Stage 3: Visual Demo          [ PENDING ]
    Stage 4: Documentation        [ PENDING ]
    Stage 5: Telemetry            [ PENDING ]
    Stage 6: Requirements         [ PENDING ]
─────────────────────────────────────────
```

Then proceed to **Stage 1: Press Release loop** below.

---

## Resume Session

### Step 3b: Read existing session state

Read `working-backwards/{session-id}/session.json` from disk.

Set `PERSISTENCE_MODE` and `TARGET_REPO` from the `persistence` and `repo` fields in session.json.

**If `PERSISTENCE_MODE` is `"github"`:** pull latest state and check for concurrent edits:
```bash
git pull
git fetch origin
git diff HEAD origin/main -- working-backwards/{session-id}/session.json
```
If there is a diff, warn the PM and ask which version to use before proceeding.

**If `PERSISTENCE_MODE` is `"local"`:** no git operations needed — session.json on disk is authoritative.

### Step 4b: Resume at current stage

Read `current_stage` from `session.json` and route accordingly:

- `press-release` → **Stage 1: Press Release loop**, passing any existing draft as context
- `faq-external` → **Stage 2: External FAQ loop**
- `faq-internal` → **Stage 2: Internal FAQ loop**
- `demo` → **Stage 3: Visual Demo loop**
- `docs` → **Stage 4: Documentation loop**
- `telemetry` → **Stage 5: Telemetry loop**
- `requirements` → **Stage 6: Requirements loop**
- All stages `PASS` → display complete package, confirm session is finished

---

## Persistence helper (refer to this throughout)

At each stage, after writing artifacts and updating session.json on disk:

**If `PERSISTENCE_MODE` is `"github"`**, run the commit block shown for that stage.
**If `PERSISTENCE_MODE` is `"local"`**, skip the git block entirely. Artifacts and session.json are already written to disk.

In all status displays, replace "committed to GitHub" with "saved locally" when `PERSISTENCE_MODE` is `"local"`.

---

## Stage 1: Press Release loop

### Invoke the Press Release Writer

Use the Agent tool to delegate to the `press-release-writer` agent. Pass:
- The feature idea
- The existing draft (if resuming — read from `working-backwards/{session-id}/press-release.md` if it exists)
- Any prior Critic feedback (if this is a revision cycle)

The agent will ask the PM clarifying questions and return a Press Release draft.

### Invoke the Critic

Once the `press-release-writer` returns a draft, use the Agent tool to delegate to the `critic` agent. Pass:
- The full draft text
- Rubric path: `.claude/rubrics/stage-1-press-release.json`
- Which dimensions already passed (if this is revision cycle 2 or 3)

The Critic returns a structured verdict.

### Branch on verdict

**If `VERDICT: PASS`:**

1. Write the draft to `working-backwards/{session-id}/press-release.md`
2. Update `session.json`:
   - `stages.press-release.status` → `"complete"`
   - `stages.press-release.critic_verdict` → `"PASS"`
   - `current_stage` → `"faq-external"`
   - `updated_at` → current timestamp
3. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/press-release.md working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 1 Press Release - Critic PASS"
   git push
   ```
4. Display to the PM:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ▶ Stage 2: External FAQ         [ IN PROGRESS ]
       Stage 2: Internal FAQ         [ PENDING ]
       Stage 3: Visual Demo          [ PENDING ]
       Stage 4: Documentation        [ PENDING ]
       Stage 5: Telemetry            [ PENDING ]
       Stage 6: Requirements         [ PENDING ]
   ─────────────────────────────────────────
   Press Release saved. Moving to Stage 2: External FAQ.
   ```
5. Proceed to **Stage 2: External FAQ loop** below.

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `press-release`
2. If `revision_count < 3`:
   - Increment `revision_count` in `session.json`, update `updated_at`
   - **If GitHub:** commit updated session.json:
     ```bash
     git add working-backwards/{session-id}/session.json
     git commit -m "Working Backwards [{session-id}]: Stage 1 revision {n}"
     git push
     ```
   - Show the PM the Critic's feedback:
     ```
     The Critic reviewed your Press Release and found issues to address:

     [For each failing dimension:]
     ❌ {Dimension Name}
        Issue: {specific issue}
        Fix:   {concrete suggested revision}
     ```
   - Return to **Invoke the Press Release Writer** with the current draft + Critic feedback
3. If `revision_count >= 3`:
   - Write the best available draft to `working-backwards/{session-id}/press-release.md`
   - Update `session.json` (`updated_at`, save revision count)
   - **If GitHub:** commit:
     ```bash
     git add working-backwards/{session-id}/press-release.md working-backwards/{session-id}/session.json
     git commit -m "Working Backwards [{session-id}]: Stage 1 - max revisions reached, draft saved"
     git push
     ```
   - Tell the PM:
     ```
     After 3 revision cycles, the Press Release hasn't passed all Critic checks.
     The current draft has been saved.

     Unresolved issues:
     [list remaining failing dimensions and their feedback]

     This usually means the product idea needs more customer research before
     a Working Backwards process can succeed. Consider:
     - Talking to 2-3 customers to get specific evidence for the problem
     - Narrowing the customer definition further
     - Revisiting whether this is the right problem to solve

     Run `/working-backwards resume {session-id}` when you're ready to try again.
     ```

---

---

## Stage 2: External FAQ loop

### Invoke the FAQ Writer (External mode)

Use the Agent tool to delegate to the `faq-writer` agent. Pass:
- Mode: `EXTERNAL`
- The validated Press Release (read from `working-backwards/{session-id}/press-release.md`)
- Any existing External FAQ draft + Critic feedback (if this is a revision cycle)

The agent generates 5–8 hard customer questions, drafts answers, and returns the FAQ.

### Invoke the Critic

Use the Agent tool to delegate to the `critic` agent. Pass:
- The full External FAQ text
- Rubric path: `.claude/rubrics/stage-2-external-faq.json`
- Which dimensions already passed (if revision cycle 2 or 3)

### Branch on verdict

**If `VERDICT: PASS`:**

1. Write the artifact to `working-backwards/{session-id}/faq-external.md`
2. Update `session.json`:
   - `stages.faq-external.status` → `"complete"`
   - `stages.faq-external.critic_verdict` → `"PASS"`
   - `current_stage` → `"faq-internal"`
   - `updated_at` → current timestamp
3. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/faq-external.md working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 2 External FAQ - Critic PASS"
   git push
   ```
4. Display:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ✓ Stage 2: External FAQ         [ PASS ]
     ▶ Stage 2: Internal FAQ         [ IN PROGRESS ]
       Stage 3: Visual Demo          [ PENDING ]
       Stage 4: Documentation        [ PENDING ]
       Stage 5: Telemetry            [ PENDING ]
       Stage 6: Requirements         [ PENDING ]
   ─────────────────────────────────────────
   External FAQ saved. Moving to Stage 2: Internal FAQ.
   ```
5. Proceed to **Stage 2: Internal FAQ loop** below.

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `faq-external`
2. If `revision_count < 3`:
   - Increment `revision_count`, update `updated_at`
   - **If GitHub:** commit updated session.json
   - Show the PM the Critic's feedback per failing dimension
   - Return to **Invoke the FAQ Writer (External mode)** with current draft + feedback
3. If `revision_count >= 3`:
   - Save best draft to `working-backwards/{session-id}/faq-external.md`
   - **If GitHub:** commit, push
   - Tell the PM what's unresolved and suggest gathering more customer evidence before resuming

---

## Stage 2: Internal FAQ loop

### Invoke the FAQ Writer (Internal mode)

Use the Agent tool to delegate to the `faq-writer` agent. Pass:
- Mode: `INTERNAL`
- The validated Press Release (read from `working-backwards/{session-id}/press-release.md`)
- The validated External FAQ (read from `working-backwards/{session-id}/faq-external.md`)
- Any existing Internal FAQ draft + Critic feedback (if this is a revision cycle)

The agent generates 5–8 hard engineering/leadership questions, drafts answers, flags blockers, and returns the FAQ.

### Invoke the Critic

Use the Agent tool to delegate to the `critic` agent. Pass:
- The full Internal FAQ text
- Rubric path: `.claude/rubrics/stage-2-internal-faq.json`
- Which dimensions already passed (if revision cycle 2 or 3)

### Branch on verdict

**If `VERDICT: PASS`:**

1. Write the artifact to `working-backwards/{session-id}/faq-internal.md`
2. Update `session.json`:
   - `stages.faq-internal.status` → `"complete"`
   - `stages.faq-internal.critic_verdict` → `"PASS"`
   - `current_stage` → `"demo"`
   - `updated_at` → current timestamp
3. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/faq-internal.md working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 2 Internal FAQ - Critic PASS"
   git push
   ```
4. Display:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ✓ Stage 2: External FAQ         [ PASS ]
     ✓ Stage 2: Internal FAQ         [ PASS ]
     ▶ Stage 3: Visual Demo          [ IN PROGRESS ]
       Stage 4: Documentation        [ PENDING ]
       Stage 5: Telemetry            [ PENDING ]
       Stage 6: Requirements         [ PENDING ]
   ─────────────────────────────────────────
   Internal FAQ saved. Moving to Stage 3: Visual Demo.
   ```
5. Proceed to **Stage 3: Visual Demo loop** below.

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `faq-internal`
2. If `revision_count < 3`:
   - Increment `revision_count`, update `updated_at`
   - **If GitHub:** commit updated session.json
   - Show the PM the Critic's feedback per failing dimension
   - Return to **Invoke the FAQ Writer (Internal mode)** with current draft + feedback
3. If `revision_count >= 3`:
   - Save best draft to `working-backwards/{session-id}/faq-internal.md`
   - **If GitHub:** commit, push
   - Tell the PM what's unresolved (typically: missing stakeholder coverage or unowned open items) and suggest resolving blockers with the relevant team before resuming

---

## Stage 3: Visual Demo loop

### Invoke the Demo Builder

Use the Agent tool to delegate to the `demo-builder` agent. Pass:
- The session ID and session directory path
- Paths to all validated artifacts:
  - `working-backwards/{session-id}/press-release.md`
  - `working-backwards/{session-id}/faq-external.md`
  - `working-backwards/{session-id}/faq-internal.md`

The Demo Builder will ask the PM clarifying questions, wait for answers, confirm the build plan, then generate the complete React + Express app into `working-backwards/{session-id}/demo/`.

**Important:** The Demo Builder fronts all its questions before writing any code. Do not interrupt the build once the PM has confirmed the plan.

### Invoke the Critic

Once the `demo-builder` returns, use the Agent tool to delegate to the `critic` agent. Pass:
- The path to the demo directory: `working-backwards/{session-id}/demo/`
- Rubric path: `.claude/rubrics/stage-3-demo.json`
- The Press Release for PR traceability evaluation: `working-backwards/{session-id}/press-release.md`
- Which dimensions already passed (if revision cycle 2 or 3)

### Branch on verdict

**If `VERDICT: PASS`:**

1. The demo files are already written to the session directory — no additional write step needed
2. Update `session.json`:
   - `stages.demo.status` → `"complete"`
   - `stages.demo.critic_verdict` → `"PASS"`
   - `current_stage` → `"docs"`
   - `updated_at` → current timestamp
3. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/demo/ working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 3 Visual Demo - Critic PASS"
   git push
   ```
4. Display:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ✓ Stage 2: External FAQ         [ PASS ]
     ✓ Stage 2: Internal FAQ         [ PASS ]
     ✓ Stage 3: Visual Demo          [ PASS ]
     ▶ Stage 4: Documentation        [ IN PROGRESS ]
       Stage 5: Telemetry            [ PENDING ]
       Stage 6: Requirements         [ PENDING ]
   ─────────────────────────────────────────
   Demo saved.

   To run the demo:
     cd working-backwards/{session-id}/demo
     npm install
     npm start

   Opens at http://localhost:3000

   Moving to Stage 4: Documentation.
   ```
5. Proceed to **Stage 4: Documentation loop** below.

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `demo`
2. If `revision_count < 3`:
   - Increment `revision_count`, update `updated_at`
   - **If GitHub:** commit updated session.json
   - Show the PM the Critic's feedback per failing dimension:
     ```
     The Critic reviewed the demo and found issues to address:

     [For each failing dimension:]
     ❌ {Dimension Name}
        Issue: {specific issue}
        Fix:   {concrete suggested revision}
     ```
   - Return to **Invoke the Demo Builder** with the current demo files + Critic feedback
   - The Demo Builder fixes only the failing dimensions — it does not rebuild from scratch
3. If `revision_count >= 3`:
   - **If GitHub:** commit whatever exists in the demo directory as-is, push
   - Tell the PM which Critic dimensions remain unresolved and what to address before resuming

---

---

## Stage 4: Documentation loop

### Invoke the Documentation Writer

Use the Agent tool to delegate to the `docs-writer` agent. Pass:
- The session ID and session directory path
- Paths to all validated artifacts:
  - `working-backwards/{session-id}/press-release.md`
  - `working-backwards/{session-id}/faq-external.md`
  - `working-backwards/{session-id}/faq-internal.md`

The docs-writer will ask the PM clarifying questions (API name, auth method, core operations, sandbox URL, compliance requirements), confirm the plan, then generate the complete documentation set into `working-backwards/{session-id}/docs/`.

### Invoke the Critic

Once the `docs-writer` returns, use the Agent tool to delegate to the `critic` agent. Pass:
- The path to the docs directory: `working-backwards/{session-id}/docs/`
- Rubric path: `.claude/rubrics/stage-4-docs.json`
- The Press Release for PR grounding evaluation: `working-backwards/{session-id}/press-release.md`
- The Internal FAQ for open item check: `working-backwards/{session-id}/faq-internal.md`
- Which dimensions already passed (if revision cycle 2 or 3)

### Branch on verdict

**If `VERDICT: PASS`:**

1. Update `session.json`:
   - `stages.docs.status` → `"complete"`
   - `stages.docs.critic_verdict` → `"PASS"`
   - `current_stage` → `"telemetry"`
   - `updated_at` → current timestamp
2. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/docs/ working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 4 Documentation - Critic PASS"
   git push
   ```
3. Display:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ✓ Stage 2: External FAQ         [ PASS ]
     ✓ Stage 2: Internal FAQ         [ PASS ]
     ✓ Stage 3: Visual Demo          [ PASS ]
     ✓ Stage 4: Documentation        [ PASS ]
     ▶ Stage 5: Telemetry            [ IN PROGRESS ]
       Stage 6: Requirements         [ PENDING ]
   ─────────────────────────────────────────
   Documentation saved. Moving to Stage 5: Telemetry.
   ```
4. Proceed to **Stage 5: Telemetry loop** below.

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `docs`
2. If `revision_count < 3`:
   - Increment `revision_count`, update `updated_at`
   - **If GitHub:** commit updated session.json
   - Show the PM the Critic's feedback per failing dimension
   - Return to **Invoke the Documentation Writer** with current docs + Critic feedback
   - The docs-writer fixes only the failing dimensions — it does not rewrite the full set
3. If `revision_count >= 3`:
   - **If GitHub:** commit whatever exists in the docs directory as-is, push
   - Tell the PM which dimensions remain unresolved. Most common: internal consistency failures (field names differ between sections) or documentation that doesn't match the product type described in the Press Release

---

---

## Stage 5: Telemetry loop

### Invoke the Telemetry Writer

Use the Agent tool to delegate to the `telemetry-writer` agent. Pass:
- The session ID and session directory path
- Paths to all validated artifacts:
  - `working-backwards/{session-id}/press-release.md`
  - `working-backwards/{session-id}/faq-external.md`
  - `working-backwards/{session-id}/faq-internal.md`
  - `working-backwards/{session-id}/docs/`

The telemetry-writer will ask the PM clarifying questions (north star confirmation, activation event, compliance constraints, analytics infrastructure), confirm the plan, then generate `working-backwards/{session-id}/telemetry.md`.

### Invoke the Critic

Once the `telemetry-writer` returns, use the Agent tool to delegate to the `critic` agent. Pass:
- The full telemetry spec text
- Rubric path: `.claude/rubrics/stage-5-telemetry.json`
- The Press Release for outcome coverage evaluation: `working-backwards/{session-id}/press-release.md`
- Which dimensions already passed (if revision cycle 2 or 3)

### Branch on verdict

**If `VERDICT: PASS`:**

1. Update `session.json`:
   - `stages.telemetry.status` → `"complete"`
   - `stages.telemetry.critic_verdict` → `"PASS"`
   - `current_stage` → `"requirements"`
   - `updated_at` → current timestamp
2. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/telemetry.md working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 5 Telemetry - Critic PASS"
   git push
   ```
3. Display:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ✓ Stage 2: External FAQ         [ PASS ]
     ✓ Stage 2: Internal FAQ         [ PASS ]
     ✓ Stage 3: Visual Demo          [ PASS ]
     ✓ Stage 4: Documentation        [ PASS ]
     ✓ Stage 5: Telemetry            [ PASS ]
     ▶ Stage 6: Requirements         [ IN PROGRESS ]
   ─────────────────────────────────────────
   Telemetry spec saved. Moving to Stage 6: Requirements — the final stage.
   ```
4. Proceed to **Stage 6: Requirements loop** below.

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `telemetry`
2. If `revision_count < 3`:
   - Increment `revision_count`, update `updated_at`
   - **If GitHub:** commit updated session.json
   - Show the PM the Critic's feedback per failing dimension:
     ```
     The Critic reviewed the telemetry spec and found issues to address:

     [For each failing dimension:]
     ❌ {Dimension Name}
        Issue: {specific issue}
        Fix:   {concrete suggested revision}
     ```
   - Return to **Invoke the Telemetry Writer** with the current draft + Critic feedback
   - The telemetry-writer fixes only the failing dimensions — it does not rewrite from scratch
3. If `revision_count >= 3`:
   - **If GitHub:** commit whatever exists as `telemetry.md`, push
   - Tell the PM which dimensions remain unresolved. Most common: metrics not tied to PR outcomes, missing instrumentation requirements, or vague activation event definition

---

---

## Stage 6: Requirements loop

### Invoke the Requirements Writer

Use the Agent tool to delegate to the `requirements-writer` agent. Pass:
- The session ID and session directory path
- Paths to all validated artifacts:
  - `working-backwards/{session-id}/press-release.md`
  - `working-backwards/{session-id}/faq-external.md`
  - `working-backwards/{session-id}/faq-internal.md`
  - `working-backwards/{session-id}/telemetry.md`

The requirements-writer will ask the PM clarifying questions, confirm the requirements structure, then generate `working-backwards/{session-id}/requirements.md`.

### Invoke the Critic

Once the `requirements-writer` returns, use the Agent tool to delegate to the `critic` agent. Pass:
- The full requirements document text
- Rubric path: `.claude/rubrics/stage-5-requirements.json`
- The Press Release for traceability evaluation: `working-backwards/{session-id}/press-release.md`
- The Internal FAQ for open item check: `working-backwards/{session-id}/faq-internal.md`
- Which dimensions already passed (if revision cycle 2 or 3)

### Branch on verdict

**If `VERDICT: PASS`:**

1. Update `session.json`:
   - `stages.requirements.status` → `"complete"`
   - `stages.requirements.critic_verdict` → `"PASS"`
   - `current_stage` → `"complete"`
   - `updated_at` → current timestamp
2. **If GitHub:** commit:
   ```bash
   git add working-backwards/{session-id}/requirements.md working-backwards/{session-id}/session.json
   git commit -m "Working Backwards [{session-id}]: Stage 6 Requirements - Critic PASS"
   git push
   ```
3. Display the complete package:
   ```
   ─────────────────────────────────────────
     ✓ Stage 1: Press Release        [ PASS ]
     ✓ Stage 2: External FAQ         [ PASS ]
     ✓ Stage 2: Internal FAQ         [ PASS ]
     ✓ Stage 3: Visual Demo          [ PASS ]
     ✓ Stage 4: Documentation        [ PASS ]
     ✓ Stage 5: Telemetry            [ PASS ]
     ✓ Stage 6: Requirements         [ PASS ]
   ─────────────────────────────────────────
   Working Backwards session complete.

   Your Working Backwards package (working-backwards/{session-id}/):
     ✓ press-release.md      — validated customer narrative
     ✓ faq-external.md       — customer Q&A
     ✓ faq-internal.md       — engineering & leadership Q&A
     ✓ demo/                 — working prototype (npm install && npm start)
     ✓ docs/                 — user-facing documentation
     ✓ telemetry.md          — measurement & instrumentation spec
     ✓ requirements.md       — engineer-ready requirements
   ```
   If GitHub mode, append: `All artifacts committed to {TARGET_REPO}.`

   [If any [OPEN] or [BLOCKER] items were surfaced in requirements.md, list them here so the PM sees them before closing the session.]

**If `VERDICT: NEEDS REVISION`:**

1. Read `revision_count` from `session.json` for `requirements`
2. If `revision_count < 3`:
   - Increment `revision_count`, update `updated_at`
   - **If GitHub:** commit updated session.json
   - Show the PM the Critic's feedback per failing dimension:
     ```
     The Critic reviewed the requirements and found issues to address:

     [For each failing dimension:]
     ❌ {Dimension Name}
        Issue: {specific issue}
        Fix:   {concrete suggested revision}
     ```
   - Return to **Invoke the Requirements Writer** with the current draft + Critic feedback
   - The requirements-writer fixes only the failing dimensions — it does not rewrite from scratch
3. If `revision_count >= 3`:
   - **If GitHub:** commit whatever exists as `requirements.md`, push
   - Tell the PM which dimensions remain unresolved. Most common: acceptance criteria that aren't testable, or `[OPEN]` items from the FAQ that haven't been surfaced in the requirements

---

## Stage-gate rule (enforce always)

If the PM asks to skip a stage or jump ahead:

> "The [requested stage] is locked until [prerequisite stage(s)] pass the Critic review. You are currently at [current stage]. Working Backwards requires completing each stage in order — this is what makes the methodology work."

Do not route around the pipeline under any circumstances.

# AI-Product-Team

A Claude Code extension that guides product managers through Amazon's **Working Backwards** methodology using a multi-agent pipeline.

Instead of jumping straight to requirements, Working Backwards forces you to start from the customer: write the Press Release first, stress-test it with hard questions, then — and only then — write the engineering spec. This extension makes that process rigorous, structured, and impossible to shortcut.

---

## What it does

Runs a stage-gated pipeline with four stages:

```
Stage 1: Press Release     → Who is the customer? What do they get?
Stage 2: External FAQ      → What would a skeptical customer ask?
Stage 2: Internal FAQ      → What would engineering and leadership ask?
Stage 3: Requirements      → Engineer-ready spec derived from the above
```

Each stage is reviewed by a **Critic agent** before the next stage unlocks. You cannot write requirements until your Press Release and FAQ have passed. That's the point.

All outputs are committed to GitHub after each stage passes — giving you a complete, version-controlled Working Backwards package for every feature you build.

---

## Prerequisites

1. **Claude Code** — [Install Claude Code](https://claude.ai/claude-code)
2. **`gh` CLI** — installed and authenticated:
   ```bash
   brew install gh
   gh auth login
   ```
3. **Git** — configured with push access to this repo

---

## Setup

### 1. Clone this repo

```bash
git clone git@github.com:brianmc/AI-Product-Team.git
cd AI-Product-Team
```

### 2. Open Claude Code in this directory

```bash
claude
```

The skills and agents load automatically from `.claude/` when Claude Code opens in this directory.

### 3. Verify setup

Run this in Claude Code to confirm the skills are available:

```
/working-backwards
```

If prompted for a feature idea, setup is working. If you see an authentication error, run `gh auth login` and try again.

---

## Usage

### Start a new session

```
/working-backwards [your feature idea]
```

**Examples:**
```
/working-backwards "bulk export tool for enterprise customers"
/working-backwards "a way for admins to see real-time audit logs"
/working-backwards "self-serve billing for SMB customers"
```

You'll be walked through the full pipeline. The Press Release Agent will ask you about your customer, their problem, and what the product does for them — before writing a single word.

### Resume a session

```
/working-backwards resume [session-id]
```

**Example:**
```
/working-backwards resume wb-20260308-143022
```

The session picks up exactly where you left off. All prior stage outputs are loaded from GitHub automatically.

### Check session status

```
/wb-status [session-id]
```

If you omit the session ID and only one session exists, it displays that one automatically. With multiple sessions, it lists them and asks which to show.

**Example output:**
```
─────────────────────────────────────────────────────────────
  WORKING BACKWARDS SESSION
  ID:      wb-20260308-143022
  Feature: bulk export tool for enterprise customers
  Started: 2026-03-08T14:30:22Z
  Updated: 2026-03-08T15:12:44Z
─────────────────────────────────────────────────────────────
  Stage 1: Press Release        [ PASS ]
  Stage 2: External FAQ         [ IN PROGRESS ]  (1 revision)
  Stage 2: Internal FAQ         [ PENDING ]
  Stage 3: Requirements         [ PENDING ]
─────────────────────────────────────────────────────────────
  Current stage: faq-external

  Committed artifacts:
    ✓ press-release.md
    ✗ faq-external.md   (pending)
    ✗ faq-internal.md   (pending)
    ✗ requirements.md   (pending)
─────────────────────────────────────────────────────────────
  Run `/working-backwards resume wb-20260308-143022` to continue.
```

---

## The pipeline in detail

### Stage 1: Press Release

The Press Release is written as if the product has already shipped. This forces you to describe it from the customer's perspective before a single requirement is written.

**The Press Release Agent will ask:**
- Who specifically is the customer? (Not "users" — a named role, persona, or segment)
- What is their problem today? What are they doing instead?
- What does the product do for them?

**Required sections in the output:**
| Section | What it contains |
|---|---|
| Headline | One sentence: product name + specific customer benefit |
| Subheading | Who is the customer and what can they now do? |
| Problem paragraph | Specific, evidenced pain — not generic frustration |
| Solution paragraph | What the product does in plain language |
| Spokesperson quote | Why this matters — substantive, not marketing copy |
| Getting started | How a customer begins using it |
| Customer quote | Specific and believable — marked `[placeholder]` if not yet validated |

**Critic rubric (5 dimensions):**
- Customer definition — specific, not vague
- Problem evidence — concrete, not generic
- Customer benefit — clear and specific
- Spokesperson quote — substantive, not boilerplate
- Customer quote — specific and honest about placeholders

The stage passes when all 5 dimensions pass. Maximum 3 revision cycles before the pipeline pauses and asks you to gather more customer evidence.

---

### Stage 2: External FAQ *(coming in Phase 3)*

The hardest questions a skeptical target customer would ask. 5–8 questions minimum, prioritised by which ones are most likely to reveal product weaknesses. Every question must be answered or explicitly marked `[OPEN — owner: X]`.

---

### Stage 2: Internal FAQ *(coming in Phase 3)*

The hardest questions from engineering, legal, finance, and leadership. Covers feasibility, compliance, business model, and build plan. Build-blocking issues are flagged as `[BLOCKER]`.

---

### Stage 3: Requirements *(coming in Phase 4)*

Translated directly from the validated Press Release and FAQ. Every requirement traces back to the PR or FAQ — nothing invented independently. Open items from the FAQ surface as explicit `[OPEN]` gaps. Engineer-ready, with acceptance criteria in given/when/then format.

---

## Output structure

Every session produces a directory in this repo:

```
working-backwards/
  {session-id}/
    press-release.md      ← committed when Stage 1 passes the Critic
    faq-external.md       ← committed when Stage 2 External passes
    faq-internal.md       ← committed when Stage 2 Internal passes
    requirements.md       ← committed when Stage 3 passes
    session.json          ← updated after every agent interaction
```

Each stage output is committed to GitHub the moment the Critic approves it — not at the end of the session. If you close Claude Code mid-session, your work is safe.

### session.json schema

```json
{
  "session_id": "wb-20260308-143022",
  "created_at": "2026-03-08T14:30:22Z",
  "updated_at": "2026-03-08T15:12:44Z",
  "repo": "brianmc/AI-Product-Team",
  "feature_idea": "bulk export tool for enterprise customers",
  "current_stage": "faq-external",
  "stages": {
    "press-release": {
      "status": "complete",
      "critic_verdict": "PASS",
      "revision_count": 1,
      "artifact_path": "working-backwards/wb-20260308-143022/press-release.md"
    },
    "faq-external": {
      "status": "in-progress",
      "critic_verdict": null,
      "revision_count": 1,
      "artifact_path": "working-backwards/wb-20260308-143022/faq-external.md"
    },
    ...
  },
  "invocation_log": []
}
```

---

## Agents

| Agent | Role | Invoked by |
|---|---|---|
| `press-release-writer` | Drafts and revises Press Releases | Orchestrator (Stage 1) |
| `faq-writer` | Generates and answers hard questions (External + Internal modes) | Orchestrator (Stage 2) — *Phase 3* |
| `requirements-writer` | Translates validated PR + FAQ into engineering specs | Orchestrator (Stage 3) — *Phase 4* |
| `critic` | Reviews all stage outputs against versioned rubrics | Orchestrator (after each worker) |

Agents live in `.claude/agents/`. They are invoked by the Orchestrator — you never call them directly.

---

## Critic rubrics

Rubrics live in `.claude/rubrics/` as versioned JSON files. They define the pass/fail criteria the Critic uses for each stage.

| File | Stage | Dimensions |
|---|---|---|
| `stage-1-press-release.json` | Press Release | Customer definition, problem evidence, customer benefit, spokesperson quote, customer quote |
| `stage-2-external-faq.json` | External FAQ | Question quality, answer completeness, open item handling — *Phase 3* |
| `stage-2-internal-faq.json` | Internal FAQ | Coverage of engineering/legal/business, open items, blocker flagging — *Phase 3* |
| `stage-3-requirements.json` | Requirements | Requirement traceability, testable ACs, edge cases, NFRs, open item propagation — *Phase 4* |

**To update a rubric:** edit the JSON file and increment the `version` field. No agent redeployment needed. The version used in each Critic review is recorded in `session.json`.

---

## Skills

Skills are loaded automatically when Claude Code opens in this directory. You do not need to load them manually.

| Skill | Purpose |
|---|---|
| `working-backwards` | Main Orchestrator — `/working-backwards [idea]` |
| `wb-status` | Session status — `/wb-status [session-id]` |
| `github-operations` | Shared gh CLI + git instructions for all agents |
| `working-backwards-methodology` | Shared Working Backwards reference knowledge |

---

## Handling edge cases

**"I already have a draft Press Release"**
Start a session normally and paste your draft when the Press Release Agent asks for context. It will validate against the rubric rather than starting from scratch.

**"The Critic keeps failing my Press Release"**
After 3 revision cycles without a PASS, the pipeline pauses and saves your best draft. The Critic's feedback will tell you specifically what's missing. In most cases, this means you need more customer evidence — talk to 2–3 customers and come back with real data and quotes. Resume with `/working-backwards resume [session-id]`.

**"I want to skip the FAQ and go straight to requirements"**
The pipeline won't allow this. Stage 2 is locked until Stage 1 passes; Stage 3 is locked until both Stage 2 stages pass. This is intentional — requirements written without a validated PR and FAQ are requirements for the wrong product.

**"Someone edited my session files directly in GitHub"**
On resume, the Orchestrator detects a conflict between your local state and the remote. It will show you the diff and ask which version to use before proceeding.

**"I need to run this in a different repo"**
The skills are project-level and run in the `AI-Product-Team` directory. Session outputs are committed to this repo. Support for configuring a separate target repo is planned for Phase 2.

---

## Project structure

```
AI-Product-Team/
├── .claude/
│   ├── agents/
│   │   ├── press-release-writer.md
│   │   ├── faq-writer.md              (Phase 3)
│   │   ├── requirements-writer.md     (Phase 4)
│   │   └── critic.md
│   ├── rubrics/
│   │   ├── stage-1-press-release.json
│   │   ├── stage-2-external-faq.json  (Phase 3)
│   │   ├── stage-2-internal-faq.json  (Phase 3)
│   │   └── stage-3-requirements.json  (Phase 4)
│   └── skills/
│       ├── working-backwards/
│       │   └── SKILL.md
│       ├── wb-status/
│       │   └── SKILL.md
│       ├── github-operations/
│       │   └── SKILL.md
│       └── working-backwards-methodology/
│           └── SKILL.md
├── templates/
│   ├── session.json.template
│   └── output-formats/
│       ├── press-release.md.template
│       ├── faq.md.template            (Phase 3)
│       └── requirements.md.template   (Phase 4)
├── working-backwards/
│   └── {session-id}/                  ← created per session
├── CLAUDE.md
├── prd-pm-ai-team.md
└── README.md
```

---

## Roadmap

| Phase | What ships |
|---|---|
| ✅ Phase 1 | Project skeleton, session management, GitHub persistence, `/wb-status` |
| ✅ Phase 2 | Press Release Agent, Critic, Stage 1 rubric, full revision loop |
| Phase 3 | FAQ Agent (External + Internal), Stage 2 rubrics, full Stage 2 loop |
| Phase 4 | Requirements Agent, Stage 3 rubric, end-to-end pipeline |
| Phase 5 | Edge case hardening, observability logging, error surfacing |

---

## Contributing

The PRD for this project lives at [`prd-pm-ai-team.md`](./prd-pm-ai-team.md). All agent behaviours, Critic rubrics, acceptance criteria, and edge case handling are specified there.

To propose a change: update `prd-pm-ai-team.md` first, then implement. The PRD is the source of truth.

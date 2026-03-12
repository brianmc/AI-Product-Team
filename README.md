# AI-Product-Team

A Claude Code extension that guides product managers through Amazon's **Working Backwards** methodology using a multi-agent pipeline.

Instead of jumping straight to requirements, Working Backwards forces you to start from the customer: write the Press Release first, stress-test it with hard questions, then — and only then — write the engineering spec. This extension makes that process rigorous, structured, and impossible to shortcut.

---

## What it does

Runs a stage-gated pipeline with five stages:

```
Stage 1: Press Release     → Who is the customer? What do they get?
Stage 2: External FAQ      → What would a skeptical customer ask?
Stage 2: Internal FAQ      → What would engineering and leadership ask?
Stage 3: Visual Demo       → A working React + Express app, runnable on localhost
Stage 4: Documentation     → User-facing docs written as if the product already ships
Stage 5: Requirements      → Engineer-ready PRD derived from all of the above
```

Each stage is reviewed by a **Critic agent** before the next stage unlocks. You cannot write requirements until your Press Release, FAQ, demo, and documentation have passed. That's the point.

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

### Stage 3: Visual Demo *(coming in Phase 4)*

A working React + Express front-end application generated from the validated Press Release and FAQ. Demonstrates the core user journey so stakeholders can see and interact with the product concept before any production code is written.

**Output:** `demo/` directory inside the session folder, containing a self-contained React + Express app.

```bash
cd working-backwards/{session-id}/demo
npm install
npm start   # opens on localhost
```

The quality of the demo is directly constrained by the quality of the Press Release. A specific PR with a clear user journey produces a genuinely demoable app. If the demo looks wrong, it usually means the PR needs revision.

---

### Stage 4: Documentation

Issuer-facing developer documentation styled after **Visa Developer Center** — written as if the product already ships. Targeted at card issuers integrating the Xfinite card product into their consumer banking apps.

The Documentation Agent asks the PM about API naming, authentication method, core operations, sandbox URLs, and compliance requirements before writing. Then produces a complete documentation set.

**Output:** `docs/` directory inside the session folder:

| File | Contents |
|---|---|
| `index.md` | Product overview, capabilities, integration-at-a-glance table |
| `getting-started.md` | Prerequisites, sandbox access, first API call |
| `authentication.md` | mTLS / OAuth setup with code examples in JS + Python |
| `integration-guide.md` | Step-by-step primary use case with request/response examples |
| `api-reference.md` | All endpoints with field-level docs, request/response schemas |
| `code-examples.md` | Copy-paste-ready examples in cURL, JavaScript, Python |
| `error-codes.md` | All error codes with HTTP status, description, and resolution |
| `testing.md` | Sandbox setup, test card IDs, scenarios checklist |
| `going-live.md` | Pre-launch checklist, certification, compliance requirements |
| `faq.md` | Common issuer integration questions |

---

### Stage 5: Requirements *(coming in Phase 6)*

Translated directly from the validated Press Release, FAQ, demo, and documentation. Every requirement traces back to the established customer narrative — nothing invented independently. Open items from the FAQ surface as explicit `[OPEN]` gaps. Engineer-ready, with acceptance criteria in given/when/then format.

---

## Output structure

Every session produces a directory in this repo:

```
working-backwards/
  {session-id}/
    press-release.md      ← committed when Stage 1 passes the Critic
    faq-external.md       ← committed when Stage 2 External passes
    faq-internal.md       ← committed when Stage 2 Internal passes
    demo/                 ← committed when Stage 3 passes the Critic
      package.json
      src/
        App.jsx
        components/
      server/
        index.js
      README.md           ← npm install && npm start
    docs/                 ← committed when Stage 4 passes the Critic
      getting-started.md
      how-to-guides.md
    requirements.md       ← committed when Stage 5 passes the Critic
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

## Prerequisites

- **Claude Code** — [Install Claude Code](https://claude.ai/claude-code)
- **`gh` CLI** — `brew install gh && gh auth login`
- **Node.js ≥18 + npm** — required to run the Stage 3 demo app locally (`brew install node`)
- **Git** — configured with push access to this repo

## Roadmap

| Phase | What ships |
|---|---|
| ✅ Phase 1 | Project skeleton, session management, GitHub persistence, `/wb-status` |
| ✅ Phase 2 | Press Release Agent, Critic, Stage 1 rubric, full revision loop |
| ✅ Phase 3 | FAQ Agent (External + Internal), Stage 2 rubrics, full Stage 2 loop |
| ✅ Phase 4 | Demo Builder Agent — generates a working React + Express app from validated PR + FAQ |
| ✅ Phase 5 | Documentation Agent — Visa Developer Center-style issuer integration docs |
| Phase 6 | Requirements Agent, Stage 5 rubric, end-to-end pipeline complete |

---

## Contributing

The PRD for this project lives at [`prd-pm-ai-team.md`](./prd-pm-ai-team.md). All agent behaviours, Critic rubrics, acceptance criteria, and edge case handling are specified there.

To propose a change: update `prd-pm-ai-team.md` first, then implement. The PRD is the source of truth.

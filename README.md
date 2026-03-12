# AI-Product-Team

A Claude Code extension that guides product managers through Amazon's **Working Backwards** methodology using a multi-agent pipeline.

Instead of jumping straight to requirements, Working Backwards forces you to start from the customer: write the Press Release first, stress-test it with hard questions, build and document the experience, then — and only then — write the engineering spec. This extension makes that process rigorous, structured, and impossible to shortcut.

---

## What it does

Runs a stage-gated pipeline with five stages:

```
Stage 1: Press Release     → Who is the customer? What do they get?
Stage 2: External FAQ      → What would a skeptical customer ask?
Stage 2: Internal FAQ      → What would engineering and leadership ask?
Stage 3: Visual Demo       → A working React + Express app, runnable on localhost
Stage 4: Documentation     → Issuer developer docs written as if the product ships
Stage 5: Requirements      → Engineer-ready PRD derived from all of the above
```

Each stage is reviewed by a **Critic agent** before the next stage unlocks. You cannot write requirements until your Press Release, FAQ, demo, and documentation have all passed. That's the point.

All outputs are committed to GitHub after each stage passes — giving you a complete, version-controlled Working Backwards package for every feature you build.

---

## Prerequisites

- **Claude Code** — [Install Claude Code](https://claude.ai/claude-code)
- **`gh` CLI** — `brew install gh && gh auth login`
- **Node.js ≥18 + npm** — required to run the Stage 3 demo locally (`brew install node`)
- **Git** — configured with push access to this repo

---

## Setup

### 1. Get the repo

**Option A — Clone (recommended):**
```bash
git clone git@github.com:brianmc/AI-Product-Team.git
cd AI-Product-Team
```

**Option B — Download ZIP (if git clone is blocked by a corporate firewall):**
1. Go to `https://github.com/brianmc/AI-Product-Team`
2. Click **Code → Download ZIP**
3. Unzip and move the folder to where you want to work from
4. Open a terminal in the unzipped folder

> Note: If you download via ZIP instead of cloning, GitHub persistence (`--repo`) will not be available. Sessions will be saved locally only.

### 2. Open Claude Code in this directory

```bash
claude
```

Skills and agents load automatically from `.claude/` when Claude Code opens here.

### 3. Verify setup

```
/working-backwards
```

If prompted for a feature idea, setup is working. If you see an auth error, run `gh auth login` and try again.

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

### Resume a session

```
/working-backwards resume [session-id]
```

The session picks up exactly where you left off. All prior stage outputs are loaded from GitHub automatically.

### Check session status

```
/wb-status [session-id]
```

If you omit the session ID and only one session exists, it displays that one automatically.

**Example output:**
```
─────────────────────────────────────────────────────────────
  WORKING BACKWARDS SESSION
  ID:      wb-20260308-143022
  Feature: bulk export tool for enterprise customers
  Started: 2026-03-08T14:30:22Z
  Updated: 2026-03-08T15:44:11Z
─────────────────────────────────────────────────────────────
  Stage 1: Press Release        [ PASS ]
  Stage 2: External FAQ         [ PASS ]
  Stage 2: Internal FAQ         [ PASS ]
  Stage 3: Visual Demo          [ IN PROGRESS ]  (1 revision)
  Stage 4: Documentation        [ PENDING ]
  Stage 5: Requirements         [ PENDING ]
─────────────────────────────────────────────────────────────
  Current stage: demo

  Committed artifacts:
    ✓ press-release.md
    ✓ faq-external.md
    ✓ faq-internal.md
    ✗ demo/          (in progress)
    ✗ docs/          (pending)
    ✗ requirements.md (pending)
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

**Required sections:**
| Section | What it contains |
|---|---|
| Headline | One sentence: product name + specific customer benefit |
| Subheading | Who is the customer and what can they now do? |
| Problem paragraph | Specific, evidenced pain — not generic frustration |
| Solution paragraph | What the product does in plain language |
| Spokesperson quote | Why this matters — substantive, not marketing copy |
| Getting started | How a customer begins using it |
| Customer quote | Specific and believable — marked `[placeholder]` if not yet validated |

**Critic rubric (5 dimensions):** customer definition, problem evidence, customer benefit, spokesperson quote, customer quote.

Maximum 3 revision cycles before the pipeline pauses and asks you to gather more customer evidence.

---

### Stage 2: External FAQ

The hardest questions a skeptical target customer would ask. 5–8 questions minimum, prioritised by which ones are most likely to reveal product weaknesses. Every question must be answered or explicitly marked `[OPEN — owner: X]`.

**Critic rubric (4 dimensions):** question quality (no softballs), answer completeness, no evasive answers, coverage of critical concerns (data/privacy, workflow change, cost, failure modes, competition).

---

### Stage 2: Internal FAQ

The hardest questions from engineering, legal, finance, and leadership. Covers feasibility, compliance, business model, and build plan. Build-blocking issues are flagged as `[BLOCKER — owner: X]`.

**Critic rubric (4 dimensions):** stakeholder coverage, answer completeness, blocker identification, no evasive answers.

---

### Stage 3: Visual Demo

A working React + Express front-end application generated from the validated Press Release and FAQ. Demonstrates the core user journey so stakeholders can experience the product concept before any production code is written.

The Demo Builder Agent asks upfront about existing screenshots or mockups, visual style, key screens, and the primary user action — then builds. If you have existing UI assets, share them and the demo will match your visual language.

**To run after Stage 3 passes:**
```bash
cd working-backwards/{session-id}/demo
npm install
npm start   # opens at http://localhost:3000
```

**Critic rubric (4 dimensions):** PR traceability, core user journey coverage, structural runnability (all imports and routes exist), mock data honesty.

---

### Stage 4: Documentation

Documentation written as if the product already ships. The Documentation Agent reads the validated Press Release and FAQs to determine who the documentation is for and what format it should take — then produces a complete, professional documentation set.

The agent determines the appropriate documentation type from the product:

| Product type | Documentation format |
|---|---|
| API / integration / SDK | Developer portal style — overview, auth, reference, code examples, error codes, going live |
| Consumer / business app | User documentation style — getting started, feature guides, troubleshooting, FAQ |
| Admin / operations tool | Operator documentation style — setup, configuration, operations, monitoring |
| B2B SaaS | Combination — end-user docs plus admin/integration docs as needed |

The Documentation Agent asks clarifying questions (only what can't be determined from the artifacts) before writing, then confirms the file plan with the PM.

**Critic rubric (5 dimensions):** audience journey completeness, technical internal consistency, format fit for product type, product specificity, PR/FAQ grounding.

---

### Stage 5: Requirements

Translated directly from all validated prior stages: Press Release, both FAQs, demo, and documentation. Every requirement traces back to the established customer narrative — nothing invented independently. Open items from the FAQ surface as explicit `[OPEN]` gaps. Engineer-ready, with acceptance criteria in given/when/then format.

---

## Output structure

Every session produces a directory in this repo:

```
working-backwards/
  {session-id}/
    press-release.md        ← committed on Stage 1 Critic PASS
    faq-external.md         ← committed on Stage 2 External Critic PASS
    faq-internal.md         ← committed on Stage 2 Internal Critic PASS
    demo/                   ← committed on Stage 3 Critic PASS
      package.json
      vite.config.js
      index.html
      src/
        App.jsx
        App.css
        components/
      server/
        index.js
      README.md             ← npm install && npm start
    docs/                   ← committed on Stage 4 Critic PASS
      index.md
      getting-started.md
      authentication.md
      integration-guide.md
      api-reference.md
      code-examples.md
      error-codes.md
      testing.md
      going-live.md
      faq.md
    requirements.md         ← committed on Stage 5 Critic PASS
    session.json            ← updated after every agent interaction
```

### session.json schema

```json
{
  "session_id": "wb-20260308-143022",
  "created_at": "2026-03-08T14:30:22Z",
  "updated_at": "2026-03-08T15:44:11Z",
  "repo": "brianmc/AI-Product-Team",
  "feature_idea": "bulk export tool for enterprise customers",
  "current_stage": "demo",
  "stages": {
    "press-release": { "status": "complete", "critic_verdict": "PASS", "revision_count": 1 },
    "faq-external":  { "status": "complete", "critic_verdict": "PASS", "revision_count": 0 },
    "faq-internal":  { "status": "complete", "critic_verdict": "PASS", "revision_count": 1 },
    "demo":          { "status": "in-progress", "critic_verdict": null, "revision_count": 1 },
    "docs":          { "status": "pending", "critic_verdict": null, "revision_count": 0 },
    "requirements":  { "status": "pending", "critic_verdict": null, "revision_count": 0 }
  },
  "invocation_log": []
}
```

---

## Agents

| Agent | Role | Stage |
|---|---|---|
| `press-release-writer` | Drafts and revises the customer-centric Press Release | Stage 1 |
| `faq-writer` | Generates hard questions and drafts answers (External + Internal modes) | Stage 2 |
| `demo-builder` | Asks clarifying questions then generates a working React + Express app | Stage 3 |
| `docs-writer` | Writes 10-file Visa-style issuer developer documentation | Stage 4 |
| `requirements-writer` | Translates all validated artifacts into engineer-ready requirements | Stage 5 |
| `critic` | Reviews every stage output against a versioned, stage-specific rubric | All stages |

Agents live in `.claude/agents/`. They are invoked by the Orchestrator — you never call them directly.

---

## Critic rubrics

Rubrics live in `.claude/rubrics/` as versioned JSON files. Update a rubric by editing the file and incrementing the `version` field — no agent redeployment needed.

| File | Stage | Dimensions |
|---|---|---|
| `stage-1-press-release.json` | Press Release | Customer definition, problem evidence, customer benefit, spokesperson quote, customer quote |
| `stage-2-external-faq.json` | External FAQ | Question quality, answer completeness, no evasion, critical concern coverage |
| `stage-2-internal-faq.json` | Internal FAQ | Stakeholder coverage, answer completeness, blocker identification, no evasion |
| `stage-3-demo.json` | Visual Demo | PR traceability, user journey coverage, structural runnability, mock data honesty |
| `stage-4-docs.json` | Documentation | Issuer journey completeness, technical consistency, enterprise docs style, Xfinite specificity, PR/FAQ grounding |
| `stage-5-requirements.json` | Requirements | Requirement traceability, testable ACs, edge cases, NFRs, open item propagation |

---

## Skills

| Skill | Purpose |
|---|---|
| `working-backwards` | Main Orchestrator — `/working-backwards [idea]` or `resume [session-id]` |
| `wb-status` | Session status — `/wb-status [session-id]` |
| `github-operations` | Shared `gh` CLI + git instructions loaded by all agents |
| `working-backwards-methodology` | Shared Working Backwards reference knowledge loaded by all agents |

---

## Handling edge cases

**"I already have a draft Press Release"**
Start a session normally and paste your draft when the Press Release Agent asks for context. It validates against the rubric rather than starting from scratch.

**"I have existing UI screenshots for the demo"**
When the Demo Builder Agent asks its upfront questions, share the screenshots. It will match the visual language, layout, and terminology of your existing UI.

**"The Critic keeps failing my Press Release"**
After 3 revision cycles, the pipeline pauses and saves your best draft. The Critic's feedback will tell you exactly what's missing. In most cases it means you need more customer evidence — talk to 2–3 customers and resume with `/working-backwards resume [session-id]`.

**"I want to skip a stage"**
The pipeline won't allow it. Each stage is locked until all prior stages pass the Critic. This is intentional — requirements written without a validated PR, FAQ, demo, and documentation are requirements for the wrong product.

**"Someone edited my session files directly in GitHub"**
On resume, the Orchestrator detects the conflict and asks which version to use before proceeding.

---

## Project structure

```
AI-Product-Team/
├── .claude/
│   ├── agents/
│   │   ├── press-release-writer.md  ← Stage 1
│   │   ├── faq-writer.md            ← Stage 2
│   │   ├── demo-builder.md          ← Stage 3
│   │   ├── docs-writer.md           ← Stage 4
│   │   ├── requirements-writer.md   ← Stage 5
│   │   └── critic.md                ← All stages
│   ├── rubrics/
│   │   ├── stage-1-press-release.json
│   │   ├── stage-2-external-faq.json
│   │   ├── stage-2-internal-faq.json
│   │   ├── stage-3-demo.json
│   │   ├── stage-4-docs.json
│   │   └── stage-5-requirements.json
│   └── skills/
│       ├── working-backwards/SKILL.md
│       ├── wb-status/SKILL.md
│       ├── github-operations/SKILL.md
│       └── working-backwards-methodology/SKILL.md
├── templates/
│   ├── session.json.template
│   └── output-formats/
│       ├── press-release.md.template
│       ├── faq.md.template
│       └── requirements.md.template
├── working-backwards/
│   └── {session-id}/                  ← created per session
├── CLAUDE.md
├── prd-pm-ai-team.md
└── README.md
```

---

## Roadmap

| Phase | Status | What shipped |
|---|---|---|
| Phase 1 | ✅ | Project skeleton, session management, GitHub persistence, `/wb-status` |
| Phase 2 | ✅ | Press Release Agent, Critic, Stage 1 rubric, full revision loop |
| Phase 3 | ✅ | FAQ Agent (External + Internal), Stage 2 rubrics, full Stage 2 loop |
| Phase 4 | ✅ | Demo Builder Agent — React + Vite + Express app with screenshot support |
| Phase 5 | ✅ | Documentation Agent — 10-file Visa Developer Center-style issuer docs |
| Phase 6 | ✅ | Requirements Agent, Stage 5 rubric, end-to-end pipeline complete |

---

## Contributing

The PRD for this project lives at [`prd-pm-ai-team.md`](./prd-pm-ai-team.md). All agent behaviours, Critic rubrics, acceptance criteria, and edge case handling are specified there.

To propose a change: update `prd-pm-ai-team.md` first, then implement. The PRD is the source of truth.

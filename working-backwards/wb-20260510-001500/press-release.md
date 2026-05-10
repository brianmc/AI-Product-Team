# AI-Product-Team Shared Runtime Core Lets PM Teams Run Working Backwards in Codex or Claude Code

**Product teams and AI-tooling owners can now run the same rigorous Working Backwards pipeline in Codex and Claude Code without maintaining two divergent prompt systems.**

**Seattle, May 2026** - AI-Product-Team today introduced Shared Runtime Core, a portability layer that lets teams run the AI-Product-Team Working Backwards process in both Codex and Claude Code from one canonical methodology, rubric set, and session format.

Product teams adopting AI-assisted product planning often face a quiet but expensive problem: their best process becomes trapped in one agent runtime. A team starts with Claude Code because slash commands and subagents are convenient, then another team wants Codex because it is stronger for code editing, local verification, and generated demos. Soon the same Working Backwards process exists in two places, with slightly different rubrics, stage names, templates, and handoff rules. The divergence is subtle at first, then costly: PMs get different outputs depending on which tool they use, and maintainers have to update the methodology twice.

Shared Runtime Core solves this by separating the product process from the runtime adapter. The stage order, Critic rubrics, methodology, templates, and session compatibility contract live in a shared directory. Claude Code keeps its existing `.claude/` adapter. Codex gains a `.codex/` adapter and repo-level operating guide. Both runtimes produce the same `working-backwards/{session-id}/` package, enforce the same Critic gates, and preserve the same artifact names from Press Release through Requirements.

"The product is not the slash command or the tool wrapper. The product is the discipline: start with the customer, ask the hard questions, prove the experience, document it, measure it, and only then write requirements," said the AI-Product-Team maintainer. "Shared Runtime Core lets teams keep that discipline intact even as they choose the AI coding environment that fits the job."

Teams get started by opening the repo in either Claude Code or Codex. Claude users continue running `/working-backwards`. Codex users follow `AGENTS.md` and the `.codex/skills/working-backwards` adapter. In both cases, sessions are saved to the same artifact structure and can be inspected with the same status model.

"We wanted Codex for demo generation and local verification, but our Working Backwards process already lived in Claude Code," said a product operations lead using AI-Product-Team [placeholder - replace with real customer quote]. "The shared core means we do not have to pick one tool or explain why the same product idea gets reviewed by different standards in different environments."

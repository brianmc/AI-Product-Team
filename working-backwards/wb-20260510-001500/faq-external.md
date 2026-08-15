# External FAQ: AI-Product-Team Shared Runtime Core

## Q1: Why should I care whether AI-Product-Team works in both Codex and Claude Code? I only use one tool today.

If your team truly uses only one AI coding environment and expects that to remain true, this may not matter immediately. The problem appears when process artifacts become tied to a tool rather than to the team's product discipline. If the Working Backwards methodology, rubrics, and templates live only inside one runtime's adapter, switching tools or adding a second tool means rebuilding the process or accepting drift. Shared Runtime Core protects the process from tool choice.

## Q2: Does supporting two runtimes make the product more complicated for PMs?

It should not. PMs should still experience one Working Backwards pipeline: Press Release, External FAQ, Internal FAQ, Visual Demo, Documentation, Telemetry, Requirements. The runtime adapter should be mostly invisible once a session starts. The added complexity is for maintainers, who now have a clearer boundary between shared product behavior and runtime-specific execution instructions.

## Q3: Will Claude Code and Codex produce identical outputs?

No, not word-for-word. They are different AI environments, and their writing style and tool behavior may differ. The promise is compatibility, not byte-for-byte identity: the same stage order, artifact names, Critic rubrics, gate rules, session schema, and open-item handling. A team should be able to understand and continue a session regardless of which supported runtime produced it.

## Q4: How do I know the Codex version is not a weaker copy of the Claude version?

Codex support should be measured against the shared compatibility contract, not against whether it copies Claude implementation details. In fact, Codex may be stronger for stages that require file editing, running local checks, generated demos, and UI verification. The key requirement is that Codex uses the same shared pipeline and rubrics, not that it mimics Claude's slash-command mechanics.

## Q5: What happens if the shared core and a runtime adapter disagree?

The shared core should win unless the difference is explicitly about runtime tooling. For example, stage order, rubrics, and artifact names belong to `shared/`. Tool invocation details belong to `.claude/` or `.codex/`. During the migration period, adapter copies may exist for compatibility, but changes should be made in `shared/` first and synchronized outward.

## Q6: Does this mean teams have to migrate old Claude sessions?

No. Existing Claude-generated sessions should remain valid because the compatibility contract preserves the same `working-backwards/{session-id}/` artifact layout. Migration work should focus on future adapters reading shared definitions, not rewriting prior session artifacts.

## Q7: What is the main risk of this feature?

The main risk is false portability: adding Codex files that look official but do not actually execute the same process. That would create the very drift the feature is meant to prevent. The mitigation is to define a shared pipeline spec, shared rubrics, and validation checks before treating Codex support as complete.

## Q8: When should a team choose Codex versus Claude Code for a session?

[OPEN - owner: product maintainer] The initial guidance is that Claude Code remains the established path, while Codex is attractive for implementation-heavy stages like Visual Demo and generated site verification. We need real usage to decide whether teams should choose one runtime for the full session or move sessions between runtimes by stage.

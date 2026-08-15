import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const errors = [];

function readText(relativePath) {
  const path = resolve(root, relativePath);
  if (!existsSync(path)) {
    errors.push(`Missing required file: ${relativePath}`);
    return "";
  }
  return readFileSync(path, "utf8");
}

function readJson(relativePath) {
  const text = readText(relativePath);
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`Invalid JSON in ${relativePath}: ${error.message}`);
    return null;
  }
}

const pipeline = readJson("shared/pipeline.json");
const sessionTemplate = readJson("templates/session.json.template");
const runtimeContract = readJson("shared/runtime-contract.json");
const claudePlugin = readJson(".claude-plugin/plugin.json");

if (runtimeContract) {
  for (const key of ["model_agnostic", "provider_agnostic", "runtime_agnostic"]) {
    if (!runtimeContract.principles?.[key]) {
      errors.push(`Runtime contract is missing principles.${key}.`);
    }
  }

  for (const capability of [
    "read-and-write-workspace-files",
    "ask-user-for-missing-product-context",
    "read-json-and-markdown",
    "run-a-critic-review",
    "preserve-session-state",
    "report-open-and-blocked-items",
  ]) {
    if (!runtimeContract.required_adapter_capabilities?.includes(capability)) {
      errors.push(`Runtime contract is missing required adapter capability: ${capability}.`);
    }
  }
}

if (claudePlugin) {
  if (claudePlugin.name !== "ai-product-team") {
    errors.push("Claude plugin manifest must use the ai-product-team name.");
  }
  if (!claudePlugin.skills || !Array.isArray(claudePlugin.agents) || claudePlugin.agents.length === 0) {
    errors.push("Claude plugin manifest must include the portable skills and agents.");
  }
  for (const pluginPath of [claudePlugin.skills, ...(claudePlugin.agents ?? [])]) {
    if (typeof pluginPath === "string" && !existsSync(resolve(root, pluginPath))) {
      errors.push(`Claude plugin manifest references a missing component: ${pluginPath}.`);
    }
  }
  if (Object.keys(claudePlugin).some((key) => ["model", "provider"].includes(key.toLowerCase()))) {
    errors.push("Claude plugin manifest must not pin a model or provider.");
  }
}

if (pipeline && sessionTemplate) {
  const stages = pipeline.stages ?? [];
  const stageIds = stages.map(({ id }) => id);
  const templateStageIds = Object.keys(sessionTemplate.stages ?? {});

  if (new Set(stageIds).size !== stageIds.length) {
    errors.push("Pipeline contains duplicate stage IDs.");
  }

  if (stageIds.join(",") !== templateStageIds.join(",")) {
    errors.push(
      `Pipeline stages (${stageIds.join(", ")}) do not match session template stages (${templateStageIds.join(", ")}).`,
    );
  }

  const requiredArtifacts = new Set(pipeline.required_session_artifacts ?? []);
  for (const stage of stages) {
    if (!stage.id || !stage.artifact || !stage.critic_rubric) {
      errors.push(`Stage is missing an id, artifact, or critic_rubric: ${JSON.stringify(stage)}`);
      continue;
    }

    if (!requiredArtifacts.has(stage.artifact)) {
      errors.push(`Required session artifacts do not include ${stage.artifact} for ${stage.id}.`);
    }

    const rubricPath = `shared/rubrics/${stage.critic_rubric}`;
    const rubric = readJson(rubricPath);
    if (rubric && (!rubric.version || !Array.isArray(rubric.dimensions) || rubric.dimensions.length === 0)) {
      errors.push(`${rubricPath} must include a version and at least one dimension.`);
    }
  }

  if (!requiredArtifacts.has("session.json")) {
    errors.push("Required session artifacts do not include session.json.");
  }

  const pipelineAdapters = pipeline.supported_runtimes?.map(({ id }) => id) ?? [];
  const contractAdapters = runtimeContract?.supported_adapters ?? [];
  if (pipelineAdapters.join(",") !== contractAdapters.join(",")) {
    errors.push(
      `Pipeline adapters (${pipelineAdapters.join(", ")}) do not match runtime contract adapters (${contractAdapters.join(", ")}).`,
    );
  }

  for (const adapter of pipeline.supported_runtimes ?? []) {
    if (!existsSync(resolve(root, adapter.adapter_root))) {
      errors.push(`Pipeline adapter ${adapter.id} has a missing root: ${adapter.adapter_root}.`);
    }
  }
}

for (const adapterPath of [
  ".claude/skills/working-backwards/SKILL.md",
  ".claude/agents/critic.md",
  ".codex/skills/working-backwards/SKILL.md",
]) {
  const adapter = readText(adapterPath);
  if (adapter.includes(".claude/rubrics/")) {
    errors.push(`${adapterPath} still references deprecated .claude/rubrics files.`);
  }
}

for (const sharedPath of ["shared/README.md", "shared/roles.md"]) {
  const sharedContent = readText(sharedPath);
  if (/\b(gpt|claude|anthropic|openai|gemini|bedrock)\b/i.test(sharedContent)) {
    errors.push(`${sharedPath} must not name a specific model or provider.`);
  }
}

if (errors.length > 0) {
  console.error("Pipeline validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Pipeline validation passed.");
}

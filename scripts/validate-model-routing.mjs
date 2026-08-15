import { existsSync, readFileSync } from "node:fs";

const configPath = process.argv[2] ?? ".ai-product-team/model-routing.example.json";
const requiredRoles = [
  "orchestrator",
  "press-release-writer",
  "faq-writer",
  "demo-builder",
  "docs-writer",
  "telemetry-writer",
  "requirements-writer",
  "site-builder",
  "critic",
];

if (!existsSync(configPath)) {
  console.error(`Model-routing configuration not found: ${configPath}`);
  process.exit(1);
}

let config;
try {
  config = JSON.parse(readFileSync(configPath, "utf8"));
} catch (error) {
  console.error(`Invalid JSON in ${configPath}: ${error.message}`);
  process.exit(1);
}

const errors = [];
const resolveValue = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => process.env[name] ?? "");
};

if (config.version !== "1.0.0") errors.push("Model-routing configuration must use version 1.0.0.");

for (const role of requiredRoles) {
  const route = config.routes?.[role];
  if (!route) {
    errors.push(`Missing route for ${role}.`);
    continue;
  }
  if (typeof route.provider !== "string" || route.provider.length === 0) {
    errors.push(`${role} must declare a provider.`);
  }
  if (typeof route.model !== "string" || route.model.length === 0) {
    errors.push(`${role} must declare a model.`);
  }
}

const critic = config.routes?.critic;
if (critic?.independent_review !== true) {
  errors.push("Critic must set independent_review to true.");
}

const hasUnresolvedPlaceholder = requiredRoles.some((role) => {
  const route = config.routes?.[role];
  return [route?.provider, route?.model].some((value) =>
    [...String(value ?? "").matchAll(/\$\{([A-Z0-9_]+)\}/g)].some(([, name]) => !process.env[name]),
  );
});

if (!hasUnresolvedPlaceholder) {
  const criticProvider = resolveValue(critic?.provider);
  const workerProviders = requiredRoles
    .filter((role) => role !== "critic")
    .map((role) => resolveValue(config.routes[role]?.provider));
  if (workerProviders.includes(criticProvider)) {
    errors.push("Critic provider must differ from every non-Critic provider.");
  }
}

if (errors.length > 0) {
  console.error("Model-routing validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else if (hasUnresolvedPlaceholder) {
  console.log("Model-routing example is structurally valid. Set its environment variables or use a local configuration before running an independent Critic.");
} else {
  console.log("Model-routing configuration is valid and uses an independent Critic provider.");
}

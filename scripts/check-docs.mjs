import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const failures = [];
const config = JSON.parse(readFileSync(join(root, "docs.json"), "utf8"));
const ignoredDirectories = new Set([".git", ".mintlify", "node_modules"]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const publicFiles = walk(root).filter((path) => [".md", ".mdx"].includes(extname(path)));
const credibilityPatterns = [
  /\bthis is real\b/i,
  /\bnot an example\b/i,
  /\bproduction[- ]ready\b/i,
  /\bworld[- ]class\b/i,
  /\bAI[- ]slop\b/i,
];
const hypePatterns = [
  /\bseamless(?:ly)?\b/i,
  /\beffortless(?:ly)?\b/i,
  /\brobust\b/i,
  /\bpowerful\b/i,
  /\bcutting[- ]edge\b/i,
  /\bgame[- ]changing\b/i,
  /\brevolutionary\b/i,
  /\bleverage[sd]?\b/i,
];
for (const path of publicFiles) {
  const content = readFileSync(path, "utf8");
  const label = relative(root, path);
  if (content.includes("\u2014")) failures.push(`${label}: em dash`);
  if (/\b(?:TODO|FIXME)\b|\[VERIFY\]/i.test(content)) failures.push(`${label}: internal marker`);
  if (credibilityPatterns.some((pattern) => pattern.test(content))) {
    failures.push(`${label}: credibility-seeking copy`);
  }
  if (hypePatterns.some((pattern) => pattern.test(content))) {
    failures.push(`${label}: vague or promotional copy`);
  }
}

const specPath = join(root, "openapi", "heyrafiki.openapi.yaml");
const spec = readFileSync(specPath, "utf8");
const operations = new Set();
let currentPath = "";
for (const line of spec.split(/\r?\n/)) {
  const pathMatch = line.match(/^  (\/[^:]*):\s*$/);
  if (pathMatch) {
    currentPath = pathMatch[1];
    continue;
  }
  const methodMatch = line.match(/^    (get|post|put|patch|delete):\s*$/);
  if (currentPath && methodMatch) operations.add(`${methodMatch[1].toUpperCase()} ${currentPath}`);
}

const activePages = config.navigation.groups.flatMap((group) => group.pages ?? []);
for (const page of activePages) {
  if (/^(GET|POST|PUT|PATCH|DELETE) \//.test(page)) {
    if (!operations.has(page)) failures.push(`docs.json: unknown OpenAPI operation ${page}`);
    continue;
  }
  if (!existsSync(join(root, `${page}.mdx`))) failures.push(`docs.json: missing page ${page}`);
}

const activeContent = activePages
  .filter((page) => !/^(GET|POST|PUT|PATCH|DELETE) \//.test(page))
  .map((page) => readFileSync(join(root, `${page}.mdx`), "utf8"))
  .join("\n");
const unreleasedClaims = [
  "Idempotency-Key",
  "X-Heyrafiki-Signature",
  "starting_after",
  "session.booked",
  "practitioner.verified",
];
for (const claim of unreleasedClaims) {
  if (activeContent.includes(claim)) failures.push(`active docs: unreleased contract ${claim}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Documentation boundary passed: ${publicFiles.length} pages, ${operations.size} operations.`);

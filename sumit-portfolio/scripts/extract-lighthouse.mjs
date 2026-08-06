/**
 * Extracts the median Lighthouse run from .lighthouseci/ into
 * telemetry/lighthouse.json: performance score, lab LCP, CLS.
 * Run by CI after `lhci collect`. Values come from Lighthouse
 * itself — this script only copies, never invents.
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), ".lighthouseci");
try {
  const runs = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
  if (!runs.length) throw new Error("no lhr-*.json files");

  runs.sort(
    (a, b) => a.categories.performance.score - b.categories.performance.score,
  );
  const median = runs[Math.floor(runs.length / 2)];

  const out = {
    categories: { performance: median.categories.performance.score },
    lcpMs: Math.round(median.audits["largest-contentful-paint"].numericValue),
    cls:
      Math.round(median.audits["cumulative-layout-shift"].numericValue * 1000) /
      1000,
    accessibility: median.categories.accessibility?.score ?? null,
    seo: median.categories.seo?.score ?? null,
    sha: process.env.GITHUB_SHA ?? null,
    generatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(path.join(process.cwd(), "telemetry"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "telemetry", "lighthouse.json"),
    JSON.stringify(out, null, 2) + "\n",
  );
  console.log("lighthouse:", out);
} catch (err) {
  console.error("extract-lighthouse: nothing extracted.", err.message);
  process.exitCode = 1;
}

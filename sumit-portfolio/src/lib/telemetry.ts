import fs from "node:fs";
import path from "node:path";

/**
 * HONEST TELEMETRY — the brand's non-negotiable rule:
 * every value comes from a real source, or is null and renders "—".
 * No code path in this module can output an invented number.
 *
 * Sources:
 *  - deployHash    Vercel/CI git env
 *  - buildTime     captured once at build (next.config.mjs)
 *  - lighthouse,   telemetry/lighthouse.json — written and committed by
 *    lcp, cls      the GitHub Actions pipeline (median of 3 real runs)
 *  - firstLoadKb   telemetry/bundle.json — measured from build output by CI
 *  - uptimePct     UptimeRobot read-only API (UPTIMEROBOT_API_KEY),
 *                  30-day ratio, refreshed via hourly ISR
 *  - p95Ms         optional JSON endpoint (TELEMETRY_P95_URL → { p95Ms }),
 *                  e.g. a tiny proxy over your analytics provider
 */

export type Telemetry = {
  deployHash: string | null;
  deployUrl: string | null;
  buildTime: string | null;
  lighthouse: number | null;
  lcpMs: number | null;
  cls: number | null;
  firstLoadKb: number | null;
  p95Ms: number | null;
  uptimePct: number | null;
};

function readJson(rel: string): Record<string, unknown> | null {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), rel), "utf8"),
    ) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function readLighthouse(): { score: number | null; lcpMs: number | null; cls: number | null } {
  const parsed = readJson("telemetry/lighthouse.json");
  const none = { score: null, lcpMs: null, cls: null };
  if (!parsed) return none;
  const cats = parsed.categories as { performance?: number } | undefined;
  const perf = cats?.performance ?? (parsed.performance as number | undefined);
  let score: number | null = null;
  if (typeof perf === "number" && perf >= 0 && perf <= 1) score = Math.round(perf * 100);
  else if (typeof perf === "number" && perf > 1 && perf <= 100) score = Math.round(perf);
  return {
    score,
    lcpMs: typeof parsed.lcpMs === "number" ? parsed.lcpMs : null,
    cls: typeof parsed.cls === "number" ? parsed.cls : null,
  };
}

function readBundle(): number | null {
  const parsed = readJson("telemetry/bundle.json");
  const kb = parsed?.firstLoadKb;
  return typeof kb === "number" && kb > 0 ? kb : null;
}

async function fetchUptime(): Promise<number | null> {
  const key = process.env.UPTIMEROBOT_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.uptimerobot.com/v2/getMonitors", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_key: key,
        format: "json",
        custom_uptime_ratios: "30",
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      monitors?: { custom_uptime_ratio?: string }[];
    };
    const ratio = parseFloat(data.monitors?.[0]?.custom_uptime_ratio ?? "");
    return Number.isFinite(ratio) ? Math.round(ratio * 100) / 100 : null;
  } catch {
    return null;
  }
}

async function fetchP95(): Promise<number | null> {
  const url = process.env.TELEMETRY_P95_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { p95Ms?: number };
    return typeof data.p95Ms === "number" && data.p95Ms > 0
      ? Math.round(data.p95Ms)
      : null;
  } catch {
    return null;
  }
}

export async function getTelemetry(): Promise<Telemetry> {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null;
  const repo = process.env.VERCEL_GIT_REPO_SLUG;
  const owner = process.env.VERCEL_GIT_REPO_OWNER;

  const lh = readLighthouse();
  const [uptimePct, p95Ms] = await Promise.all([fetchUptime(), fetchP95()]);

  return {
    deployHash: sha ? sha.slice(0, 7) : null,
    deployUrl:
      sha && repo && owner
        ? `https://github.com/${owner}/${repo}/commit/${sha}`
        : null,
    buildTime: process.env.BUILD_TIME ?? null,
    lighthouse: lh.score,
    lcpMs: lh.lcpMs,
    cls: lh.cls,
    firstLoadKb: readBundle(),
    p95Ms,
    uptimePct,
  };
}

export { EMPTY } from "./constants";

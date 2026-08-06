import { getTelemetry, EMPTY } from "@/lib/telemetry";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * 06 · HOW THIS SITE IS BUILT — Exhibit A.
 * The one section no other candidate has: the artifact you are
 * standing in, presented as a production system, with its budget
 * and its live measurements side by side. Numbers come from the
 * CI pipeline and telemetry sources — never typed in.
 */

const fmt = {
  kb: (v: number | null) => (v !== null ? `${v} kB` : EMPTY),
  score: (v: number | null) => (v !== null ? `${v}` : EMPTY),
  s: (v: number | null) => (v !== null ? `${(v / 1000).toFixed(2)} s` : EMPTY),
  raw: (v: number | null) => (v !== null ? `${v}` : EMPTY),
};

const rejections = [
  {
    what: "Three.js",
    why: "~150 kB against a 170 kB budget. The hero's Load Field does the job in a single canvas for 1.8 kB.",
  },
  {
    what: "A loading screen",
    why: "Fast sites don't have loaders — they have small pages. The p95 number is the loading experience.",
  },
  {
    what: "Third-party font hosting",
    why: "Three variable families, self-hosted, zero external requests on the critical path.",
  },
  {
    what: "Animation libraries (so far)",
    why: "Reveals, counters, and self-drawing diagrams are IntersectionObserver + CSS. Nothing moves unless it reports state.",
  },
];

export async function Colophon() {
  const t = await getTelemetry();

  const budget = [
    { metric: "first-load JS (gzip)", budget: "< 170 kB", actual: fmt.kb(t.firstLoadKb) },
    { metric: "lighthouse performance", budget: "≥ 95", actual: fmt.score(t.lighthouse) },
    { metric: "LCP · lab, desktop", budget: "< 1.2 s", actual: fmt.s(t.lcpMs) },
    { metric: "CLS", budget: "0", actual: fmt.raw(t.cls) },
  ];

  const repoUrl = process.env.NEXT_PUBLIC_REPO_URL;

  return (
    <section
      id="colophon"
      aria-label="How this site is built"
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="type-mono-label">06 · How this site is built</p>
          <h2 className="type-display mt-4 max-w-[20ch]">
            The claims here are instrumented.
          </h2>
          <p
            className="mt-4 max-w-measure text-text-mid"
            style={{ fontSize: "var(--fs-body-lg)" }}
          >
            The site making these claims is itself a small production system:
            statically generated Next.js with hourly revalidation for live
            telemetry, a token file as the single source of truth for the
            design system, and a CI pipeline that measures every push. The
            numbers below are produced by that pipeline — not typed into it.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-14 overflow-hidden rounded-[var(--radius-card)] border border-line">
            <div className="grid grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)] border-b border-line bg-bg-1 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-text-low">
              <span>metric</span>
              <span className="text-right">budget</span>
              <span className="text-right">measured</span>
            </div>
            {budget.map((row) => (
              <div
                key={row.metric}
                className="grid grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)] border-b border-line px-5 py-3.5 last:border-b-0"
              >
                <span className="font-mono text-[0.8125rem] text-text-mid">
                  {row.metric}
                </span>
                <span className="text-right font-mono text-[0.8125rem] text-text-low tabular-nums">
                  {row.budget}
                </span>
                <span className="text-right font-mono text-[0.8125rem] text-text-hi tabular-nums">
                  {row.actual}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[0.75rem] text-text-low">
            measured = CI pipeline output committed per push · {"\u2014"} means
            not measured yet, never estimated
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-14">
            <p className="type-mono-label mb-5">evaluated and rejected</p>
            <div className="flex flex-col gap-5">
              {rejections.map((r) => (
                <div
                  key={r.what}
                  className="grid gap-2 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12"
                >
                  <p className="text-text-hi">{r.what}</p>
                  <p className="text-text-mid">{r.why}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p
              className="font-display font-semibold tracking-tight text-text-hi"
              style={{ fontSize: "var(--fs-heading)" }}
            >
              This page is the smallest production system I maintain.
            </p>
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
              >
                source on GitHub →
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

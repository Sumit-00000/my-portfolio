import { site } from "@/content/site";
import { LoadField } from "./LoadField";

/**
 * 01 · THESIS — the claim, stated once, perfectly.
 * Headline #7. No entrance theatrics in Phase 1: a plain,
 * perfectly-timed settle arrives with the Load Field in Phase 2.
 * The gradient wash is the ONLY accent use in this viewport.
 */
export function Thesis() {
  return (
    <section
      id="top"
      aria-label="Thesis"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-32"
    >
      {/* The Load Field: accent wash → canvas → fade mask, all under content */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90rem 40rem at 70% 115%, var(--accent-dim), transparent 60%)",
          }}
        />
        <LoadField />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--bg-0))",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-content px-4 sm:px-6">
        <p className="type-mono-label mb-6">
          {site.role} · {site.location}
        </p>

        <h1 className="type-display-xl max-w-[14ch]">
          {site.headline[0]}
          <br />
          <span style={{ color: "var(--text-mid)" }}>{site.headline[1]}</span>
        </h1>

        <p
          className="mt-8 max-w-[52ch] text-text-mid"
          style={{ fontSize: "var(--fs-body-lg)" }}
        >
          {site.subline}
        </p>

        <div className="mt-10">
          <a
            href={site.cta.href}
            className="inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-bg-1 px-6 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-hi transition-colors duration-[var(--dur-micro-in)] hover:border-accent hover:bg-bg-2"
          >
            {site.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

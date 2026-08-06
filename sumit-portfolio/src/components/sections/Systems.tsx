import Link from "next/link";
import { systems } from "@/content/systems";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * 03 · SYSTEMS — two briefs, not six cards.
 * Each brief earns its click; depth lives at /systems/[slug].
 */
export function Systems() {
  return (
    <section
      id="systems"
      aria-label="Systems"
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="type-mono-label">03 · Systems</p>
          <h2 className="type-display mt-4 max-w-[22ch]">
            Documented the way they were designed.
          </h2>
          <p className="mt-4 max-w-measure text-text-mid" style={{ fontSize: "var(--fs-body-lg)" }}>
            Context, constraint, architecture, trade-offs, outcome — the parts
            of the work that don&apos;t fit on a card.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {systems.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <article className="grid gap-8 border-t border-line pt-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                <div>
                  <p className="type-mono-label">system / {s.index}</p>
                  <h3
                    className="mt-3 font-display font-semibold tracking-tight text-text-hi"
                    style={{ fontSize: "var(--fs-heading)" }}
                  >
                    <Link
                      href={`/systems/${s.slug}`}
                      className="transition-colors duration-[var(--dur-micro-in)] hover:text-accent"
                    >
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-text-mid" style={{ fontSize: "var(--fs-body-lg)" }}>
                    {s.oneLiner}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.75rem] text-text-low">
                    {s.stack.map((t) => (
                      <li key={t} className="rounded-[var(--radius-chip)] border border-line px-2 py-0.5">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <ul className="flex flex-col gap-3">
                    {s.outcomes.slice(0, 2).map((o) => (
                      <li key={o} className="flex gap-3 text-text-mid">
                        <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-text-low" />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/systems/${s.slug}`}
                    className="inline-flex w-fit items-center gap-2 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-hi transition-colors duration-[var(--dur-micro-in)] hover:text-accent"
                  >
                    Read the brief <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

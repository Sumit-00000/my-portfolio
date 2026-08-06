import { ledger, ledgerNote } from "@/content/ledger";
import { MetricCounter } from "@/components/primitives/MetricCounter";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * 04 · IMPACT LEDGER — a career set like a financial statement.
 * Scannable in eight seconds; every figure resume-backed.
 */
export function Ledger() {
  return (
    <section
      id="ledger"
      aria-label="Impact ledger"
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="type-mono-label">04 · Impact ledger</p>
          <h2 className="type-display mt-4 max-w-[20ch]">
            Zero critical bugs isn&apos;t luck.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {ledger.map((entry, i) => (
            <Reveal key={entry.org} delay={i * 80}>
              <div className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-text-hi">
                    {entry.org}
                  </h3>
                  <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-text-low">
                    {entry.role} · {entry.period}
                  </p>
                </div>

                <dl className="flex flex-col">
                  {entry.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"
                    >
                      <dt className="font-mono text-[0.8125rem] text-text-mid">
                        {row.label}
                      </dt>
                      <dd className="text-right font-mono text-lg text-text-hi tabular-nums">
                        {row.value !== null ? (
                          <MetricCounter
                            value={row.value}
                            prefix={row.prefix}
                            suffix={row.suffix}
                            approx={row.approx}
                          />
                        ) : (
                          <span className="text-base text-text-mid">{row.text}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 font-mono text-[0.75rem] text-text-low">{ledgerNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

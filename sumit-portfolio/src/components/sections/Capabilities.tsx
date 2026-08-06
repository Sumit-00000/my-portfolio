"use client";

import { useState } from "react";
import { domains, alsoFluent } from "@/content/capabilities";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * 05 · CAPABILITIES — the anti-progress-bar.
 * Rule enforced by the data shape itself: no cell without a citation.
 * Hover or focus a capability and its production evidence renders in
 * the panel — skills as proof, not percentages. Uncited skills live
 * in the quiet "also fluent" line instead of inflating the matrix.
 */
export function Capabilities() {
  const first = domains[0].items[0];
  const [active, setActive] = useState(first);

  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="type-mono-label">05 · Capabilities</p>
          <h2 className="type-display mt-4 max-w-[20ch]">
            No skill without evidence.
          </h2>
          <p
            className="mt-4 max-w-measure text-text-mid"
            style={{ fontSize: "var(--fs-body-lg)" }}
          >
            Every capability below cites the production work behind it.
            Select one.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            {/* -- Matrix ------------------------------------------ */}
            <div className="flex flex-col gap-8">
              {domains.map((domain) => (
                <div key={domain.name}>
                  <h3 className="type-mono-label mb-3">{domain.name}</h3>
                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                    {domain.items.map((item) => {
                      const isActive = active.skill === item.skill;
                      return (
                        <li key={item.skill}>
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          onPointerEnter={(e) => {
                            if (e.pointerType === "mouse") setActive(item);
                          }}
                          onFocus={() => setActive(item)}
                          aria-pressed={isActive}
                          className={`rounded-[var(--radius-chip)] border px-3 py-1.5 font-mono text-[0.8125rem] transition-colors duration-[var(--dur-micro-in)] ${
                            isActive
                              ? "border-accent bg-bg-2 text-text-hi"
                              : "border-line bg-bg-1 text-text-mid hover:border-text-low hover:text-text-hi"
                          }`}
                        >
                          {item.skill}
                        </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <p className="font-mono text-[0.75rem] text-text-low">
                also fluent: {alsoFluent.join(" · ")}
              </p>
            </div>

            {/* -- Evidence panel ----------------------------------- */}
            <div
              className="h-fit rounded-[var(--radius-card)] border border-line bg-bg-1 p-6 lg:sticky lg:top-24"
              aria-live="polite"
            >
              <p className="type-mono-label">evidence</p>
              <p className="mt-3 font-display text-lg font-semibold tracking-tight text-text-hi">
                {active.skill}
              </p>
              <p className="mt-3 text-text-mid">{active.evidence}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

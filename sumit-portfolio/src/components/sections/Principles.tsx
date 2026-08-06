import { principles } from "@/content/principles";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * 02 · PRINCIPLES — replaces "About". Nobody reads a bio;
 * everybody remembers how a candidate thinks.
 */
export function Principles() {
  return (
    <section
      id="principles"
      aria-label="Operating principles"
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="type-mono-label">02 · Principles</p>
          <h2 className="type-display mt-4 max-w-[18ch]">
            How I build.
          </h2>
        </Reveal>

        <ol className="mt-14 flex flex-col">
          {principles.map((p, i) => (
            <Reveal key={p.line} delay={i * 60}>
              <li className="grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12">
                <p
                  className="font-display font-semibold tracking-tight text-text-hi"
                  style={{ fontSize: "var(--fs-heading)", lineHeight: 1.2 }}
                >
                  {p.line}
                </p>
                <p className="self-end text-text-mid">
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-text-low">
                    in practice ·{" "}
                  </span>
                  {p.anchor}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

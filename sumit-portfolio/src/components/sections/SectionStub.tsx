/**
 * Quiet placeholder for sections arriving in later phases.
 * Honest about being a placeholder — no fake content, ever.
 * Each stub already carries its final anchor id, so nav and
 * shared links survive every phase unchanged.
 */
export function SectionStub({
  id,
  index,
  title,
  phase,
}: {
  id: string;
  index: string;
  title: string;
  phase: string;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <p className="type-mono-label">
          {index} · {title}
        </p>
        <p className="mt-3 font-mono text-[0.75rem] text-text-low">
          in build · {phase.toLowerCase()}
        </p>
      </div>
    </section>
  );
}

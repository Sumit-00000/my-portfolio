import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems, getSystem } from "@/content/systems";
import { ArchDiagram } from "@/components/briefs/ArchDiagram";
import { Reveal } from "@/components/primitives/Reveal";
import { Nav } from "@/components/chrome/Nav";
import { TelemetryBar } from "@/components/chrome/TelemetryBar";

export const revalidate = 3600;

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doc = getSystem(params.slug);
  if (!doc) return {};
  return {
    title: `${doc.name} — System Brief · Sumit Rawat`,
    description: doc.oneLiner,
    openGraph: {
      title: `${doc.name} — System Brief`,
      description: doc.oneLiner,
      images: [
        {
          url: `/og?title=${encodeURIComponent(doc.name)}&sub=${encodeURIComponent(doc.oneLiner)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return <p className="type-mono-label mb-4">{children}</p>;
}

export default function SystemPage({ params }: { params: { slug: string } }) {
  const doc = getSystem(params.slug);
  if (!doc) notFound();

  const idx = systems.findIndex((s) => s.slug === doc.slug);
  const next = systems[(idx + 1) % systems.length];

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-content px-4 sm:px-6">
        {/* ---- Brief header ---------------------------------------- */}
        <header className="pt-40" style={{ paddingBottom: "var(--section-y)" }}>
          <Reveal>
            <Link
              href="/#systems"
              className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-low transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
            >
              ← All systems
            </Link>
            <p className="type-mono-label mt-10">System brief / {doc.index}</p>
            <h1 className="type-display-xl mt-4">{doc.name}</h1>
            <p
              className="mt-6 max-w-[52ch] text-text-mid"
              style={{ fontSize: "var(--fs-body-lg)" }}
            >
              {doc.oneLiner}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.75rem] text-text-low">
              {doc.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-[var(--radius-chip)] border border-line px-2 py-0.5"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </header>

        {/* ---- Context / Constraint -------------------------------- */}
        <section className="grid gap-12 border-t border-line py-20 md:grid-cols-2">
          <Reveal>
            <BlockLabel>Context</BlockLabel>
            <p className="max-w-measure text-text-mid">{doc.context}</p>
          </Reveal>
          <Reveal delay={80}>
            <BlockLabel>Constraint</BlockLabel>
            <p className="max-w-measure text-text-mid">{doc.constraint}</p>
          </Reveal>
        </section>

        {/* ---- Architecture ----------------------------------------- */}
        <section className="border-t border-line py-20">
          <Reveal>
            <BlockLabel>Architecture</BlockLabel>
            <div className="rounded-[var(--radius-card)] border border-line bg-bg-1 p-4 sm:p-8">
              <ArchDiagram
                viewBox={doc.diagram.viewBox}
                nodes={doc.diagram.nodes}
                edges={doc.diagram.edges}
                title={doc.name}
              />
            </div>
            <p className="mt-6 max-w-measure text-text-mid">
              {doc.architectureNote}
            </p>
          </Reveal>
        </section>

        {/* ---- Decisions & trade-offs ------------------------------- */}
        <section className="border-t border-line py-20">
          <Reveal>
            <BlockLabel>Decisions &amp; trade-offs</BlockLabel>
          </Reveal>
          <div className="flex flex-col gap-10">
            {doc.decisions.map((d, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="grid gap-4 md:grid-cols-2 md:gap-12">
                  <p className="text-text-hi">{d.decision}</p>
                  <p className="text-text-mid">
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-text-low">
                      trade-off ·{" "}
                    </span>
                    {d.tradeoff}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Outcome ---------------------------------------------- */}
        <section className="border-t border-line py-20">
          <Reveal>
            <BlockLabel>Outcome</BlockLabel>
            <ul className="flex max-w-measure flex-col gap-4">
              {doc.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-text-hi">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-px w-4 shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ---- Footer nav ------------------------------------------- */}
        <footer
          className="flex flex-wrap items-center justify-between gap-6 border-t border-line py-16"
          style={{ marginBottom: "var(--telemetry-h)" }}
        >
          <Link
            href="/#engage"
            className="inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-bg-1 px-6 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-hi transition-colors duration-[var(--dur-micro-in)] hover:border-accent hover:bg-bg-2"
          >
            Discuss a role <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={`/systems/${next.slug}`}
            className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
          >
            Next system: {next.name} →
          </Link>
        </footer>
      </main>
      <TelemetryBar />
    </>
  );
}

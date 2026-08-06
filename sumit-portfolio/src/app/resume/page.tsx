import type { Metadata } from "next";
import Link from "next/link";
import { resume } from "@/content/resume";
import { Nav } from "@/components/chrome/Nav";
import { TelemetryBar } from "@/components/chrome/TelemetryBar";

export const metadata: Metadata = {
  title: "Resume — Sumit Rawat",
  description:
    "Full Stack Developer — MERN, Python FastAPI, multi-tenant SaaS and RBAC systems. Print-optimized resume with PDF download.",
};

/**
 * /resume — the fast path for the 45-second recruiter.
 * Screen: brand-styled. Print (Ctrl+P): clean black-on-white document,
 * chrome hidden — see the @media print rules in globals.css.
 */
export default function ResumePage() {
  return (
    <>
      <div className="no-print">
        <Nav />
      </div>

      <main id="main" className="resume-root mx-auto max-w-[52rem] px-4 pt-32 sm:px-6">
        {/* -- Actions (screen only) -------------------------------- */}
        <div className="no-print mb-10 flex flex-wrap items-center gap-4">
          <a
            href="/resume.pdf"
            download="Sumit_Rawat_Resume.pdf"
            className="inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-bg-1 px-5 py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-hi transition-colors duration-[var(--dur-micro-in)] hover:border-accent hover:bg-bg-2"
          >
            Download PDF ↓
          </a>
          <span className="font-mono text-[0.75rem] text-text-low">
            or print this page — it&apos;s print-optimized (Ctrl/Cmd + P)
          </span>
        </div>

        {/* -- Header ------------------------------------------------ */}
        <header className="border-b border-line pb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-text-hi">
            {resume.name}
          </h1>
          <p className="mt-2 text-text-mid">{resume.title}</p>
          <p className="mt-3 font-mono text-[0.75rem] text-text-low">
            {resume.contact.location} · {resume.contact.phone} ·{" "}
            {resume.contact.email} · {resume.contact.github} ·{" "}
            {resume.contact.linkedin}
          </p>
        </header>

        {/* -- Summary ----------------------------------------------- */}
        <section className="border-b border-line py-6">
          <h2 className="type-mono-label mb-3">Professional summary</h2>
          <p className="text-text-mid">{resume.summary}</p>
        </section>

        {/* -- Experience -------------------------------------------- */}
        <section className="border-b border-line py-6">
          <h2 className="type-mono-label mb-4">Experience</h2>
          <div className="flex flex-col gap-7">
            {resume.experience.map((e) => (
              <article key={e.org}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold text-text-hi">
                    {e.role} · {e.org}
                  </h3>
                  <p className="font-mono text-[0.75rem] text-text-low">
                    {e.period}
                  </p>
                </div>
                <p className="mt-1 font-mono text-[0.75rem] text-text-low">
                  {e.stack}
                </p>
                <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-text-mid">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* -- Projects ----------------------------------------------- */}
        <section className="border-b border-line py-6">
          <h2 className="type-mono-label mb-4">Key projects</h2>
          <div className="flex flex-col gap-7">
            {resume.projects.map((p) => (
              <article key={p.name}>
                <h3 className="font-semibold text-text-hi">{p.name}</h3>
                <p className="mt-1 font-mono text-[0.75rem] text-text-low">
                  {p.stack}
                </p>
                <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-text-mid">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* -- Skills -------------------------------------------------- */}
        <section className="border-b border-line py-6">
          <h2 className="type-mono-label mb-4">Technical skills</h2>
          <dl className="flex flex-col gap-2">
            {resume.skills.map((s) => (
              <div key={s.group} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
                <dt className="font-mono text-[0.8125rem] text-text-low">
                  {s.group}
                </dt>
                <dd className="text-text-mid">{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* -- Education ----------------------------------------------- */}
        <section className="py-6">
          <h2 className="type-mono-label mb-3">Education</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="text-text-hi">
              {resume.education.degree} — {resume.education.school}
            </p>
            <p className="font-mono text-[0.75rem] text-text-low">
              {resume.education.period} · {resume.education.detail}
            </p>
          </div>
          <p className="mt-6 text-text-mid">{resume.availability}</p>
        </section>

        <div className="no-print pb-24 pt-4">
          <Link
            href="/"
            className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-low transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
          >
            ← Back to the system
          </Link>
        </div>
      </main>

      <div className="no-print">
        <TelemetryBar />
      </div>
    </>
  );
}

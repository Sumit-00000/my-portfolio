import { site } from "@/content/site";
import { Reveal } from "@/components/primitives/Reveal";
import { EmailReveal } from "@/components/primitives/EmailReveal";

/**
 * 07 · ENGAGE — no contact form. Forms are friction; EMs email.
 * One oversized line, the email one click from the clipboard,
 * links as mono tokens, availability in plain words.
 */
export function Engage() {
  const year = new Date().getFullYear();

  return (
    <section
      id="engage"
      aria-label="Contact"
      className="border-t border-line"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="type-mono-label">07 · Engage</p>
          <h2 className="type-display-xl mt-6 max-w-[14ch]">
            Let&apos;s build something that holds.
          </h2>
          <p
            className="mt-6 max-w-[52ch] text-text-mid"
            style={{ fontSize: "var(--fs-body-lg)" }}
          >
            Open to Full-Stack, Python FastAPI, and Backend roles — remote,
            hybrid, or on-site across India.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <EmailReveal />
            <nav aria-label="Profiles" className="flex items-center gap-6">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
              >
                github ↗
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
              >
                linkedin ↗
              </a>
              <a
                href="/resume"
                className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
              >
                resume →
              </a>
            </nav>
          </div>
        </Reveal>

        <Reveal>
          <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[0.75rem] text-text-low">
            <span>
              © {year} {site.name} · built in the open
            </span>
            <a
              href="#colophon"
              className="transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
            >
              how this site is built ↑
            </a>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}

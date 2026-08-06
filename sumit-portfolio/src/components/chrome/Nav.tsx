"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Chrome, not decoration. Transparent over the hero; gains a
 * surface + hairline once the page is scrolled (reporting state:
 * "you have left the top").
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-micro-out)] ${
        scrolled
          ? "border-b border-line bg-bg-0/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          aria-label={`${site.name} — home`}
          className="font-display text-lg font-semibold tracking-tight text-text-hi"
        >
          {site.wordmark}
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 sm:gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

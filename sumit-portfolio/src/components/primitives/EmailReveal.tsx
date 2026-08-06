"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * Copy-to-clipboard email. The "copied" flip is a state report —
 * the only kind of motion allowed. Falls back to a mailto link
 * when the clipboard API is unavailable.
 */
export function EmailReveal() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-bg-1 px-6 py-3 font-mono text-[0.8125rem] tracking-[0.02em] text-text-hi transition-colors duration-[var(--dur-micro-in)] hover:border-accent hover:bg-bg-2"
    >
      {site.email}
      <span
        className="font-mono text-[0.75rem] uppercase tracking-[0.08em]"
        style={{ color: copied ? "var(--ok)" : "var(--text-low)" }}
      >
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}

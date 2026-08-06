import type { Config } from "tailwindcss";

/**
 * Tailwind consumes the design system — it never defines it.
 * Single source of truth: src/styles/tokens.css
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-0": "var(--bg-0)",
        "bg-1": "var(--bg-1)",
        "bg-2": "var(--bg-2)",
        line: "var(--line)",
        "text-hi": "var(--text-hi)",
        "text-mid": "var(--text-mid)",
        "text-low": "var(--text-low)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        ok: "var(--ok)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      maxWidth: {
        content: "var(--w-content)",
        measure: "var(--w-measure)",
      },
      transitionTimingFunction: {
        settle: "var(--ease-settle)",
        exit: "var(--ease-exit)",
      },
    },
  },
  plugins: [],
};

export default config;

/**
 * 04 · IMPACT LEDGER — career as measured deltas, not a timeline.
 * CREDIBILITY RULE: every figure below appears on the resume.
 * `approx: true` renders a "~" — the resume says ~90%, so the site does too.
 */
export type LedgerRow = {
  label: string;
  /** numeric part that the counter animates; null = non-numeric value */
  value: number | null;
  prefix?: string; // e.g. "↓ "
  suffix?: string; // e.g. "%", "k+"
  approx?: boolean;
  /** rendered when value is null */
  text?: string;
};

export type LedgerEntry = {
  org: string;
  role: string;
  period: string;
  rows: LedgerRow[];
};

export const ledger: LedgerEntry[] = [
  {
    org: "Technocraze",
    role: "Software Developer",
    period: "2025 → now",
    rows: [
      { label: "permission-related incidents", value: 90, prefix: "↓ ", suffix: "%", approx: true },
      { label: "critical production bugs", value: 0 },
      { label: "permission granularity", value: null, text: "module · role · field" },
      { label: "platform model", value: null, text: "multi-tenant, isolated" },
    ],
  },
  {
    org: "TechPro ComSoft",
    role: "Software Developer",
    period: "2025",
    rows: [
      { label: "avg API response time", value: 30, prefix: "↓ ", suffix: "%" },
      { label: "CRM records at scale", value: 100, suffix: "k+" },
      { label: "operational roles modelled", value: 4 },
    ],
  },
];

export const ledgerNote =
  "Figures as reported on my resume — each one survives an interview.";

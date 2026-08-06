# sumit-portfolio · Sumit Rawat — Engineering Brand

> Zero critical bugs isn't luck. It's architecture.

Not a portfolio. A small production system that happens to describe its
engineer. Built against the brand doc (v2): credibility > memorability > beauty.

## Phase 7 (this commit) — audit pass
Findings and fixes, all verified against the running production build:
1. **Contrast (AA failure — real bug):** `--text-low` measured 2.99:1 on
   bg-0 / 2.85:1 on bg-1. Recalculated to `#7b7b85` → 4.73:1 / 4.50:1.
   All token pairs now pass WCAG AA (text-hi 16.9:1, text-mid 7.5:1,
   accent 6.2:1).
2. **Semantics:** capability chips used `role="list"/"listitem"` on
   div/button, which strips button semantics for assistive tech →
   replaced with a real `ul/li` around plain buttons.
3. **Dead anchor:** nav wordmark linked `#top`, broken on /resume and
   /systems/* → now links `/`.
4. **Screen readers:** ledger counters announced "↓ ~90%" literally →
   aria-label now speaks "down approximately 90 percent".
5. **Short viewports:** hero relied on vertical centering alone; content
   could slide under the fixed nav on landscape phones → safe py-32.
Battery run on /, /systems/acurio, /resume: one h1 per page, sane heading
order, landmarks, skip-link target, decorative canvas hidden — all pass.
Routes verified live: all 200, /colophon→307→/#colophon, /og serves
image/png, /resume.pdf serves the real document. `tsc --noEmit` clean.

## Phase 6 — Engage · /resume · SEO
- `07 · Engage`: "Let's build something that holds." Email copies to
  clipboard with an honest state flip (falls back to mailto), profile
  links as mono tokens, availability in plain words, site footer with
  a link back up to the colophon. No contact form — forms are friction.
- `/resume`: the 45-second-recruiter fast path. Screen version in the
  brand system; Ctrl/Cmd+P prints a clean black-on-white document
  (chrome hidden via print styles). "Download PDF" serves the real
  resume at `public/resume.pdf` — replace that file to update it.
- SEO layer: dynamic OG images at `/og` (homepage + per-system-brief),
  JSON-LD Person schema, sitemap.xml, robots.txt.
- ⚠ Update the domain in THREE places when you have it:
  `src/app/layout.tsx` (metadataBase + JSON-LD url),
  `src/app/sitemap.ts`, `src/app/robots.ts`.

## Phase 5 — Colophon + the honest pipeline
- `06 · How this site is built`: budget vs **measured** table, the
  evaluated-and-rejected list, and the closing line. Measured values are
  read from `telemetry/*.json`; anything unmeasured renders "—".
- `.github/workflows/telemetry.yml`: on every push to main — build, measure
  real first-load JS (`scripts/measure-first-load.mjs`), run Lighthouse 3×
  against the built site, extract the median (`scripts/extract-lighthouse.mjs`),
  commit `telemetry/{bundle,lighthouse}.json`. `paths-ignore` prevents loops.
- Telemetry lib is now async with two optional live sources, refreshed by
  hourly ISR (`export const revalidate = 3600`):
  - **uptime** — set `UPTIMEROBOT_API_KEY` (read-only key) in Vercel env
  - **p95** — set `TELEMETRY_P95_URL` to any JSON endpoint returning
    `{ "p95Ms": <number> }` (e.g. a tiny proxy over your analytics)
- `/colophon` redirects to `/#colophon` for shareable links.
- Optional: set `NEXT_PUBLIC_REPO_URL` to show the "source on GitHub" link.

### To light the pipeline up (one-time, your side)
1. Push this repo to GitHub (`main` branch) — the workflow is already in it.
2. In the repo: Settings → Actions → General → Workflow permissions →
   "Read and write permissions" (the bot commits telemetry files).
3. Import the repo in Vercel. Deploy hash + commit link populate instantly;
   lighthouse / first-load appear after the first Action run lands its commit.
4. (Optional) Add UPTIMEROBOT_API_KEY / TELEMETRY_P95_URL / NEXT_PUBLIC_REPO_URL
   in Vercel → Project → Environment Variables.

## Phase 4 — Principles · Impact Ledger · Capabilities
- `02 · Principles`: four operating principles, each anchored to production
  work — the quotable section.
- `04 · Impact Ledger`: career as measured deltas set like a financial
  statement. Counters animate on first view (a metric arriving = state
  being reported). The ~ on 90% is deliberate: the resume says ~90%,
  so the site says ~90%.
- `05 · Capabilities`: the anti-progress-bar. Every skill cell cites its
  production evidence (hover/tap/keyboard); uncited skills live in the
  quiet "also fluent" line instead of inflating the matrix.
- Content lives in `src/content/{principles,ledger,capabilities}.ts`.

## Phase 3 — System Briefs
- Homepage `03 · Systems`: two briefs (Acurio, Blended WorkForce) with
  outcomes and stack — depth lives at `/systems/[slug]`.
- Deep-dive pages: Context → Constraint → Architecture (self-drawing SVG
  diagram, pathLength CSS trick, zero library cost) → Decisions & trade-offs
  → Outcome, with next-system nav and a "Discuss a role" CTA.
- New primitives: `Reveal` (fires once at 20% visibility) and `ArchDiagram`.
- All copy lives in `src/content/systems.ts` — adding a system = adding data.
- ⚠ ACTION REQUIRED (Sumit): review the `decisions` blocks in
  `src/content/systems.ts` and edit each one to match the decision you
  actually made. The credibility rule applies to prose, not just numbers.

## Phase 2 — the Load Field
The hero's ambient system: request-pulses flow left→right through routed
lanes, occasionally re-routing between them. Cursor movement adds load —
throughput rises, lanes near the pointer brighten, pulses accelerate —
then the load decays and the field settles. Pushed, it scales.

Engineering constraints (the constraints ARE the design):
- single canvas · single rAF · DPR capped at 2 · no shadowBlur (pre-rendered
  glow sprite) · pulse cap 70 desktop / 34 touch
- pauses when the hero scrolls out of view or the tab hides (IntersectionObserver
  + visibilitychange) — zero background CPU
- `prefers-reduced-motion` → one static frame, no animation, live-switchable
- touch devices → calmer ambient field, no pointer coupling
- decorative and honest: aria-hidden, pointer-events none, +1.8 kB JS

## Phase 1
- **Design tokens** — `src/styles/tokens.css` is the single source of truth;
  Tailwind consumes it, never redefines it.
- **Typography** — Archivo Variable (display) · Instrument Sans Variable (body)
  · JetBrains Mono Variable (telemetry/labels). Self-hosted via Fontsource.
- **Layout shell** — Thesis hero (headline #7), quiet stubs for sections
  02–07 with their final anchor ids already in place.
- **Telemetry bar** — the signature. Real values or "—", never fabricated:
  - `deploy` → `VERCEL_GIT_COMMIT_SHA` (links to the commit on GitHub)
  - `built` → build timestamp captured in `next.config.mjs`, rendered as
    relative age client-side (hydration-safe)
  - `lighthouse` → reads `telemetry/lighthouse.json` (written by CI in
    Phase 5); renders "—" until it exists
  - `p95`, `uptime` → wired in Phase 5; "—" until then

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 90 kB first load — budget is <170 kB, LCP <1.2s
```

## Deploy (Vercel)
Push to GitHub → import in Vercel → zero config. The deploy hash and commit
link populate automatically from Vercel's git env vars.

## The honesty rule (non-negotiable)
No value on this site is ever hand-written where a metric is expected.
If a source is unavailable, the cell renders "—". This rule is the brand.

## Roadmap
~~2 Thesis Load Field~~ ✓ → ~~3 System Briefs~~ ✓ → ~~4 Ledger + Capabilities + Principles~~ ✓ → ~~5 Colophon + live telemetry + CI perf gate~~ ✓ → ~~6 Engage + /resume + SEO/OG~~ ✓ → ~~7 audit pass~~ ✓
 
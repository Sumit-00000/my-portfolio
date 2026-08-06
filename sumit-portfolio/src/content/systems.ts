/**
 * 03 · SYSTEMS — content-as-data.
 * CREDIBILITY RULE: every claim below is backed by the resume.
 * No metric appears here that Sumit cannot defend in an interview.
 *
 * ⚠ VERIFY (Sumit): the `decisions` blocks describe the architectural
 * choice each resume line implies. Read each one and edit it to match
 * the decision you ACTUALLY made — these must be your decisions,
 * in your words, before this ships to production.
 */

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

export type SystemDoc = {
  slug: string;
  index: string;
  name: string;
  oneLiner: string;
  stack: string[];
  context: string;
  constraint: string;
  architectureNote: string;
  diagram: {
    viewBox: [number, number];
    nodes: DiagramNode[];
    edges: DiagramEdge[];
  };
  decisions: { decision: string; tradeoff: string }[];
  outcomes: string[];
  repo?: string;
};

export const systems: SystemDoc[] = [
  {
    slug: "acurio",
    index: "01",
    name: "Acurio",
    oneLiner:
      "A multi-tenant enterprise SaaS core where every tenant sees a different system — and none can see each other.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Socket.IO", "Mantis API"],
    context:
      "Multiple client organisations run on one platform, each with its own modules, roles, and rules. One codebase has to behave like many products — while guaranteeing that nothing ever crosses a tenant boundary.",
    constraint:
      "Isolation and flexibility pull in opposite directions. The stricter the tenant separation, the harder per-tenant customisation becomes. Acurio needed both at once: strict cross-tenant data isolation, and permission routing that reconfigures itself per tenant.",
    architectureNote:
      "Every request enters through the FastAPI core, is resolved against the tenant's own permission configuration, and only then reaches data. Real-time state flows back over a bi-directional Socket.IO channel that targets specific user sessions rather than broadcasting blindly. Issue reporting is not a separate destination — Mantis is embedded into the dashboard via its API.",
    diagram: {
      viewBox: [760, 420],
      nodes: [
        { id: "client", x: 40, y: 180, w: 160, h: 64, label: "React Client", sub: "per-tenant UI" },
        { id: "api", x: 300, y: 180, w: 170, h: 64, label: "FastAPI Core", sub: "JWT · REST", accent: true },
        { id: "cfg", x: 300, y: 36, w: 170, h: 56, label: "Tenant Config", sub: "modules · roles" },
        { id: "rbac", x: 560, y: 90, w: 160, h: 64, label: "Permission Engine", sub: "dynamic routing" },
        { id: "db", x: 560, y: 280, w: 160, h: 64, label: "PostgreSQL", sub: "tenant-isolated" },
        { id: "mantis", x: 300, y: 330, w: 170, h: 56, label: "Mantis Tracker", sub: "embedded via API" },
      ],
      edges: [
        { from: "client", to: "api", label: "REST" },
        { from: "client", to: "api", label: "Socket.IO", dashed: true },
        { from: "cfg", to: "rbac", label: "per-tenant rules" },
        { from: "api", to: "rbac", label: "resolve" },
        { from: "rbac", to: "db", label: "scoped access" },
        { from: "api", to: "mantis", label: "1-click issue" },
      ],
    },
    decisions: [
      {
        decision:
          "Permission routing is resolved dynamically from each tenant's configuration at request time — one deployable artifact serves every tenant.",
        tradeoff:
          "Runtime resolution costs more per request than baking tenant behaviour into separate builds. Accepted: paying that cost keeps deployment singular and onboarding a tenant a configuration change, not a release.",
      },
      {
        decision:
          "Real-time notifications are state-aware and targeted at specific user sessions and browsers, not broadcast to everyone connected.",
        tradeoff:
          "Targeting requires session bookkeeping that naive broadcast avoids. Accepted: broadcast is simple until it leaks irrelevant — or cross-tenant — noise; precision is worth the bookkeeping in a multi-tenant system.",
      },
      {
        decision:
          "Issue tracking was integrated, not built: Mantis embedded into the product dashboard via its API for 1-click reporting.",
        tradeoff:
          "Depending on an external tracker's API instead of owning the feature. Accepted: a custom ticketing module is a second product to maintain; integration shipped the workflow immediately.",
      },
    ],
    outcomes: [
      "Strict cross-tenant data isolation — enforced by design, not by review",
      "Instant, state-aware UI notifications across targeted sessions and browsers",
      "1-click issue reporting embedded in the dashboard, cutting average IT resolution time",
    ],
  },
  {
    slug: "blended-workforce",
    index: "02",
    name: "Blended WorkForce",
    oneLiner:
      "A CRM backend where four roles see four different systems — Admins, Partners, Engineers, Customers — on one API.",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "REST", "Angular client"],
    context:
      "Field-service operations run through it end to end: customers raise service requests, engineers are assigned tasks, and every status change is tracked as it happens. Four very different kinds of users work against the same data.",
    constraint:
      "Role logic tends to leak into every endpoint until nobody can change anything safely. The RBAC layer had to keep Admin, Partner, Engineer, and Customer capabilities cleanly separated while sharing one data model — and stay aligned to how the client actually operates, not to generic role flags.",
    architectureNote:
      "Requests authenticate with JWT, pass through RBAC middleware that maps each of the four roles to its real operational capabilities, and land in purpose-built modules — service requests, task assignment, status tracking — backed by MongoDB schemas designed for large CRM datasets.",
    diagram: {
      viewBox: [760, 380],
      nodes: [
        { id: "client", x: 40, y: 150, w: 160, h: 64, label: "Angular Client", sub: "4 role views" },
        { id: "auth", x: 300, y: 30, w: 170, h: 56, label: "JWT Auth" },
        { id: "api", x: 300, y: 150, w: 170, h: 64, label: "Express API", sub: "RBAC middleware", accent: true },
        { id: "db", x: 560, y: 150, w: 160, h: 64, label: "MongoDB", sub: "CRM datasets" },
        { id: "mods", x: 300, y: 290, w: 170, h: 56, label: "Modules", sub: "requests · tasks · status" },
      ],
      edges: [
        { from: "client", to: "api", label: "REST" },
        { from: "auth", to: "api", label: "verify" },
        { from: "api", to: "db", label: "scoped queries" },
        { from: "api", to: "mods", label: "route" },
      ],
    },
    decisions: [
      {
        decision:
          "RBAC was modelled on the client's operational workflow — what an Engineer actually does on site — rather than generic admin/user flags.",
        tradeoff:
          "More upfront domain modelling than dropping in a role library. Accepted: endpoints that mirror the real operation stay understandable as the business changes; generic flags rot the moment reality diverges from them.",
      },
      {
        decision:
          "The backend is modular — service requests, task assignment, and status tracking are separate modules rather than one entangled API surface.",
        tradeoff:
          "More structure and more boundaries to maintain than a single controller layer. Accepted: each module evolves and fails independently, which is where the reliability and downtime gains came from.",
      },
    ],
    outcomes: [
      "Four-role RBAC aligned to real operational workflows",
      "RESTful flows for service requests, engineer assignment, and live task status",
      "Improved backend reliability and reduced downtime",
    ],
  },
];

export function getSystem(slug: string): SystemDoc | undefined {
  return systems.find((s) => s.slug === slug);
}

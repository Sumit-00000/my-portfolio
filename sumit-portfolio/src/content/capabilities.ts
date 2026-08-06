/**
 * 05 · CAPABILITIES — no cell without a citation.
 * A skill only earns a cell if there is a production story behind it.
 * Everything else lives in the quiet "also fluent" line.
 */
export type Capability = {
  skill: string;
  evidence: string;
};

export type Domain = {
  name: string;
  items: Capability[];
};

export const domains: Domain[] = [
  {
    name: "Backend & APIs",
    items: [
      {
        skill: "RBAC design",
        evidence:
          "Tier-3 engine at Technocraze: module-, role-, and field-level permission granularity securing a multi-tenant SaaS platform.",
      },
      {
        skill: "Python · FastAPI",
        evidence:
          "Self-healing auto-discovery that syncs database permission tables on startup — ~90% fewer permission-related incidents.",
      },
      {
        skill: "Node.js · Express",
        evidence:
          "Cut average API response time by 30% at TechPro through targeted query optimisation and strategic indexing.",
      },
      {
        skill: "REST API design",
        evidence:
          "Full CRM API surface — service requests, engineer assignment, live task status — in Blended WorkForce.",
      },
      {
        skill: "WebSockets · Socket.IO",
        evidence:
          "State-aware bi-directional notifications targeted at specific user sessions and browsers in Acurio.",
      },
      {
        skill: "Auth · JWT / OAuth2",
        evidence:
          "Axios interceptors with automated JWT refresh for seamless, secure sessions across the Technocraze dashboard.",
      },
    ],
  },
  {
    name: "Frontend",
    items: [
      {
        skill: "React",
        evidence:
          "Enterprise dashboard features delivered on tight Agile timelines with zero critical production bugs.",
      },
      {
        skill: "TypeScript",
        evidence:
          "Full-stack API flows typed end to end with Ant Design and Axios at Technocraze.",
      },
      {
        skill: "Next.js",
        evidence:
          "This site: statically generated, ~99 kB first load against a 170 kB budget, honest telemetry built in.",
      },
      {
        skill: "Tailwind CSS",
        evidence:
          "This site's token system — tokens.css as the single source of truth, Tailwind consuming it, never redefining it.",
      },
    ],
  },
  {
    name: "Data",
    items: [
      {
        skill: "PostgreSQL",
        evidence:
          "Tenant-isolated data layer behind dynamic per-tenant permission routing in Acurio.",
      },
      {
        skill: "MongoDB",
        evidence:
          "Schemas designed for large-scale CRM ingestion and retrieval across hundreds of thousands of records at TechPro.",
      },
    ],
  },
  {
    name: "Systems & practice",
    items: [
      {
        skill: "Multi-tenant SaaS",
        evidence:
          "Acurio's core: strict cross-tenant isolation with permission routing reconfigured per tenant.",
      },
      {
        skill: "Agile delivery",
        evidence:
          "Enterprise features shipped on tight timelines in an Agile environment — while holding the zero-critical-bug record.",
      },
    ],
  },
];

export const alsoFluent = [
  "MySQL",
  "Docker",
  "Git & GitHub",
  "Redux",
  "Ant Design",
  "Postman",
  "Microservices",
];

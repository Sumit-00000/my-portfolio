/**
 * /resume — content-as-data, transcribed from the source PDF.
 * public/resume.pdf is the canonical downloadable document.
 */
export const resume = {
  name: "Sumit Rawat",
  title: "Full Stack Developer | MERN Stack | Python FastAPI | SaaS & RBAC Systems",
  contact: {
    location: "Delhi, India",
    phone: "+91 9675735811",
    email: "sumitrawat5811@gmail.com",
    github: "github.com/Sumit-00000",
    linkedin: "linkedin.com/in/sumit-rawat-611706269",
  },
  summary:
    "Results-driven Full Stack Developer with 2+ years of hands-on experience building production-grade SaaS platforms, RESTful APIs, and real-time systems. Expert in the MERN stack and Python FastAPI for high-performance backends. Proven track record of architecting multi-tenant RBAC engines, WebSocket integrations, and complex CRM backends. Strong proficiency in TypeScript and comfortable across the full software development lifecycle.",
  skills: [
    { group: "Languages", items: "Python, JavaScript (ES6+), TypeScript" },
    { group: "Frontend", items: "React.js, Next.js, TypeScript, Ant Design, Axios, Redux, HTML5, CSS3, Tailwind CSS" },
    { group: "Backend", items: "Node.js, Express.js, FastAPI, REST APIs, WebSockets / Socket.IO, JWT Auth, OAuth2" },
    { group: "Databases", items: "MongoDB, PostgreSQL, MySQL" },
    { group: "DevOps & Tools", items: "Docker, Git, GitHub, Postman, VS Code, Mantis Bug Tracker" },
    { group: "Specialisations", items: "Multi-Tenant SaaS, Tier-3 RBAC, SDLC, Agile, Microservices" },
  ],
  experience: [
    {
      role: "Software Developer",
      org: "Technocraze Computing Solutions — Noida, UP",
      period: "Dec 2025 – Present",
      stack: "Python FastAPI · React.js · TypeScript · PostgreSQL · RBAC · REST APIs · Git",
      bullets: [
        "Architected a Tier-3 enterprise RBAC engine with module-level, role-level, and field-level permission granularity, securing a multi-tenant SaaS platform serving multiple client organisations.",
        "Built a self-healing FastAPI auto-discovery script that auto-syncs database permission tables on startup, eliminating manual admin overhead and reducing permission-related incidents by ~90%.",
        "Engineered full-stack API flows using React.js, TypeScript, Ant Design, and Axios interceptors with automated JWT refresh handling for seamless and secure user sessions.",
        "Delivered enterprise dashboard features on tight timelines in an Agile environment while maintaining zero critical production bugs.",
      ],
    },
    {
      role: "Software Developer (Full-Time)",
      org: "TechPro ComSoft Pvt Ltd — Noida, UP",
      period: "Jan 2025 – Dec 2025",
      stack: "Node.js · Express.js · MongoDB · JavaScript · REST APIs · Git · Postman",
      bullets: [
        "Developed and optimised RESTful APIs using Node.js and Express.js, reducing average API response time by 30% through targeted query optimisation and strategic indexing.",
        "Designed flexible, high-performance MongoDB schemas for large-scale CRM datasets, enabling efficient ingestion and retrieval across hundreds of thousands of records.",
        "Built a modular CRM backend with custom RBAC logic for Admin, Partner, Engineer, and Customer roles, aligning tightly to client operational workflows.",
      ],
    },
  ],
  projects: [
    {
      name: "Acurio — Enterprise SaaS Platform",
      stack: "Python · FastAPI · React.js · PostgreSQL · WebSockets · Socket.IO · Mantis",
      bullets: [
        "Designed a highly scalable multi-tenant SaaS core with strict cross-tenant data isolation and dynamic permission routing per tenant configuration.",
        "Engineered real-time bi-directional Socket.IO integration broadcasting instant, state-aware UI notifications across targeted user sessions and browsers.",
        "Embedded Mantis Bug Tracker via API directly into the product dashboard, enabling 1-click issue reporting and cutting average IT resolution time significantly.",
      ],
    },
    {
      name: "Blended WorkForce — CRM Backend System",
      stack: "Node.js · Express.js · MongoDB · JWT · REST APIs · Angular",
      bullets: [
        "Built a scalable, modular CRM backend with custom RBAC logic for Admins, Partners, Engineers, and Customers aligned to client workflows.",
        "Implemented RESTful APIs for service requests, engineer task assignments, and real-time task status tracking, improving backend reliability and reducing downtime.",
      ],
    },
  ],
  education: {
    degree: "B.Tech in Computer Science (Artificial Intelligence)",
    school: "AKTU University, Lucknow, UP",
    period: "Aug 2024",
    detail: "CGPA: 7.59 / 10",
  },
  availability:
    "Open to Full Stack, Python FastAPI, and Backend roles — Remote, Hybrid, or On-site across India",
} as const;

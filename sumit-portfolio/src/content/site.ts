/**
 * All copy lives in /content — components never hard-code content.
 * (Brand doc v2 §Folder Structure: content-as-data.)
 */
export const site = {
  name: "Sumit Rawat",
  wordmark: "SUMIT RAWAT",
  role: "Full-Stack / Systems Engineer",
  headline: ["Zero critical bugs isn't luck.", "It's architecture."],
  subline:
    "Sumit Rawat — engineer of multi-tenant SaaS, real-time infrastructure, and permission systems that production depends on.",
  cta: { label: "Inspect the systems", href: "#systems" },
  email: "sumitrawat5811@gmail.com",
  links: {
    github: "https://github.com/Sumit-00000",
    linkedin: "https://www.linkedin.com/in/sumit-rawat-611706269/",
  },
  location: "Delhi, India · Remote-ready",
  nav: [
    { label: "Systems", href: "/#systems" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/#engage" },
  ],
} as const;


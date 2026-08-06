import type { MetadataRoute } from "next";
import { systems } from "@/content/systems";

const base = "https://sumitrawat.dev"; // update to final domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.8 },
    ...systems.map((s) => ({
      url: `${base}/systems/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}

import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://sumitrawat.dev"), // update to final domain
  title: `${site.name} — ${site.role}`,
  description:
    "Full-stack systems engineer. Multi-tenant SaaS, tier-3 RBAC engines, and real-time infrastructure — designed for production, measured in the open.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: "Zero critical bugs isn't luck. It's architecture.",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: "Zero critical bugs isn't luck. It's architecture.",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // JSON-LD Person schema for rich results
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: site.role,
              email: `mailto:${site.email}`,
              url: "https://sumitrawat.dev",
              sameAs: [site.links.github, site.links.linkedin],
            }),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

// src/app/case-studies/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | AutoPlanet Corporation - AI Success Stories",
  description: "Real AI automation case studies from AutoPlanet Corporation. See how we helped businesses eliminate 83% of manual work with custom LLMs, AI agents, and workflow automation.",
  keywords: ["ai case studies", "automation success stories", "llm implementation", "ai saas case study", "workflow automation results"],
  openGraph: {
    title: "AI Case Studies | AutoPlanet Corporation",
    description: "Real results. Real AI. See how businesses transformed with AutoPlanet.",
    type: "website",
    url: "https://autoplanetcorp.com/case-studies",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Case Studies | AutoPlanet",
    description: "Real AI automation success stories and results.",
  },
  alternates: { canonical: "https://autoplanetcorp.com/case-studies" },
};

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "AI Automation Case Studies | AutoPlanet Corporation",
  "url": "https://autoplanetcorp.com/case-studies",
  "description": "Real AI automation case studies with measurable results.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://autoplanetcorp.com/case-studies" }
    ]
  }
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }} />
      {children}
    </>
  );
}
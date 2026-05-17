// src/app/faq/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | AutoPlanet Corporation - AI Development Questions Answered",
  description: "Frequently asked questions about AutoPlanet's AI development services. Learn about timelines, pricing, AI models, support, and how we work with startups and enterprises.",
  keywords: ["ai development faq", "autoplanet faq", "ai saas questions", "llm development questions", "ai automation help"],
  openGraph: {
    title: "FAQ | AutoPlanet Corporation",
    description: "Common questions about our AI development services answered.",
    type: "website",
    url: "https://autoplanetcorp.com/faq",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | AutoPlanet Corporation",
    description: "AI development questions answered. Timelines, pricing, models, support.",
  },
  alternates: {
    canonical: "https://autoplanetcorp.com/faq",
  },
};

const faqBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "FAQ - AutoPlanet Corporation",
  "url": "https://autoplanetcorp.com/faq",
  "description": "Frequently asked questions about AutoPlanet's AI development services.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://autoplanetcorp.com/faq" }
    ]
  },
  "mainEntity": {
    "@type": "FAQPage",
    "name": "AutoPlanet FAQ",
    "description": "Common questions about AI development services, timelines, pricing, and technology."
  }
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqBreadcrumbSchema) }} />
      {children}
    </>
  );
}
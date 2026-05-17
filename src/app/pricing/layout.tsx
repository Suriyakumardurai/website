// src/app/pricing/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models | AutoPlanet Corporation",
  description: "Transparent AI development pricing. Quick Build (2 weeks), Full Product (4-8 weeks), or Ongoing Partner retainers. Fixed pricing, no hourly billing. Get a free scope estimate.",
  keywords: ["ai development pricing", "ai saas cost", "llm development pricing india", "ai automation pricing", "custom ai cost", "fixed price ai development"],
  openGraph: {
    title: "Pricing & Engagement | AutoPlanet",
    description: "Transparent AI development pricing. Fixed pricing, no hourly billing.",
    type: "website",
    url: "https://autoplanetcorp.com/pricing",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Pricing | AutoPlanet",
    description: "Fixed pricing AI development. No hourly billing, no surprises.",
  },
  alternates: {
    canonical: "https://autoplanetcorp.com/pricing",
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "AI Development Pricing | AutoPlanet Corporation",
  "url": "https://autoplanetcorp.com/pricing",
  "description": "Transparent AI development pricing with fixed-price engagement models.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://autoplanetcorp.com/pricing" }
    ]
  },
  "mainEntity": {
    "@type": "OfferCatalog",
    "name": "AI Development Plans",
    "itemListElement": [
      { "@type": "Offer", "name": "Quick Build", "description": "Single AI feature or integration in 2 weeks", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "Full Product", "description": "End-to-end AI SaaS in 4-8 weeks", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
      { "@type": "Offer", "name": "Ongoing Partner", "description": "Dedicated AI engineering retainer", "priceCurrency": "INR", "availability": "https://schema.org/InStock" }
    ]
  }
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      {children}
    </>
  );
}
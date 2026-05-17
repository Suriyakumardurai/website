// src/app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AutoPlanet Corporation | AI-Native Company Built in India",
  description: "AutoPlanet Corporation is an AI-native automation company founded by Suriya in Villupuram, Tamil Nadu. We build custom LLMs, AI SaaS products, and workflow automation systems deployed globally.",
  keywords: ["about autoplanet", "ai company india", "ai automation villupuram", "suriya autoplanet", "enterprise ai company", "ai native engineering"],
  openGraph: {
    title: "About AutoPlanet Corporation",
    description: "AI-native automation company built from the ground up. Custom LLMs, AI SaaS, workflow engines — built in India, deployed globally.",
    type: "website",
    url: "https://autoplanetcorp.com/about",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AutoPlanet Corporation",
    description: "AI-native automation company. Custom LLMs, AI SaaS, workflow engines.",
  },
  alternates: {
    canonical: "https://autoplanetcorp.com/about",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About AutoPlanet Corporation",
  "description": "AI-native automation company founded in 2024 in Villupuram, Tamil Nadu, India.",
  "url": "https://autoplanetcorp.com/about",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://autoplanetcorp.com/#organization",
    "name": "AutoPlanet Corporation",
    "founder": { "@type": "Person", "name": "Suriya", "jobTitle": "Founder & CEO" },
    "foundingDate": "2024",
    "foundingLocation": { "@type": "Place", "name": "Villupuram, Tamil Nadu, India" },
    "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 50 },
    "knowsAbout": ["Artificial Intelligence", "Large Language Models", "SaaS Development", "Workflow Automation"]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://autoplanetcorp.com/about" }
    ]
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      {children}
    </>
  );
}
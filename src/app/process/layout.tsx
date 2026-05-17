// src/app/process/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process | AutoPlanet Corporation - How We Build AI",
  description: "AutoPlanet's proven 4-step AI development process: Discovery call, scope & proposal, build sprints, and deployment with full ownership handoff. Ships in weeks, not months.",
  keywords: ["ai development process", "how we build ai", "agile ai development", "ai project management", "autoplanet workflow"],
  openGraph: {
    title: "Our Process | AutoPlanet Corporation",
    description: "Proven 4-step AI development process. Ships in weeks, not months.",
    type: "website",
    url: "https://autoplanetcorp.com/process",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our AI Development Process | AutoPlanet",
    description: "Discovery → Scope → Build → Deploy. Ships in weeks.",
  },
  alternates: { canonical: "https://autoplanetcorp.com/process" },
};

const processSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "AutoPlanet AI Development Process",
  "description": "Our proven 4-step process to build and deploy production AI in weeks.",
  "url": "https://autoplanetcorp.com/process",
  "totalTime": "P4W",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "INR", "value": "Contact for quote" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Discovery Call", "text": "Free 30-minute call to understand your problem, stack, and goals." },
    { "@type": "HowToStep", "position": 2, "name": "Scope & Proposal", "text": "Clear scope document, timeline, and fixed price within 48 hours." },
    { "@type": "HowToStep", "position": 3, "name": "Build Sprint", "text": "Focused 1-2 week sprints with live demos every Friday." },
    { "@type": "HowToStep", "position": 4, "name": "Deploy & Handoff", "text": "Deploy to your infrastructure with full documentation and ownership transfer." }
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "Process", "item": "https://autoplanetcorp.com/process" }
    ]
  }
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }} />
      {children}
    </>
  );
}
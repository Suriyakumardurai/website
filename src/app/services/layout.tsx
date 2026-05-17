// src/app/services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Development Services | AutoPlanet Corporation",
  description: "Full-spectrum AI development services: Custom LLM Development, AI SaaS Products, Workflow Automation, AI Integrations, AI Strategy, and Enterprise Security. Built in India, deployed globally.",
  keywords: ["ai development services", "custom llm", "ai saas development", "workflow automation", "ai integrations", "enterprise ai security", "ai strategy consulting"],
  openGraph: {
    title: "AI Development Services | AutoPlanet",
    description: "Full-spectrum AI development services. Custom LLMs, AI SaaS, workflow automation — built in India, deployed globally.",
    type: "website",
    url: "https://autoplanetcorp.com/services",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Development Services | AutoPlanet",
    description: "Custom LLMs, AI SaaS, workflow automation — built in India.",
  },
  alternates: {
    canonical: "https://autoplanetcorp.com/services",
  },
};

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "AI Development Services | AutoPlanet Corporation",
  "url": "https://autoplanetcorp.com/services",
  "description": "Full-spectrum AI development services including Custom LLM Development, AI SaaS Products, and Workflow Automation.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://autoplanetcorp.com/services" }
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Custom LLM Development", "url": "https://autoplanetcorp.com/services/ai-solutions" },
      { "@type": "ListItem", "position": 2, "name": "AI SaaS Products", "url": "https://autoplanetcorp.com/services/web-development" },
      { "@type": "ListItem", "position": 3, "name": "Mobile Apps", "url": "https://autoplanetcorp.com/services/mobile-apps" },
      { "@type": "ListItem", "position": 4, "name": "UI/UX Design", "url": "https://autoplanetcorp.com/services/ui-ux-design" },
      { "@type": "ListItem", "position": 5, "name": "Cloud & DevOps", "url": "https://autoplanetcorp.com/services/cloud-devops" },
      { "@type": "ListItem", "position": 6, "name": "Performance Optimization", "url": "https://autoplanetcorp.com/services/performance" }
    ]
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
      {children}
    </>
  );
}
import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import ServicesContent from "@/components/site/services-content";
import { ServiceListJsonLd } from "@/components/site/structured-data";
import { services } from "@/lib/content";
import MobileServiceRecommender from "@/components/site/mobile-service-recommender";

export const metadata: Metadata = {
  title: "AI Capabilities & Services",
  description:
    "Fourteen enterprise AI capabilities — autonomous agents, custom LLMs with RAG, AI SaaS products, workflow automation, mobile apps, computer vision, predictive analytics, VPC deployment, and more. 100% code ownership.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI Capabilities & Services · AutoPlanet Corporation",
    description:
      "Fourteen enterprise AI capabilities — autonomous agents, custom LLMs, AI SaaS, workflow automation, and more. 100% code ownership.",
    url: "/services",
  },
  keywords: [
    "AI services",
    "AI capabilities",
    "autonomous AI agents",
    "custom LLM development",
    "RAG pipelines",
    "AI SaaS",
    "workflow automation",
    "computer vision",
    "predictive analytics",
    "AI integration",
    "enterprise AI solutions",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <ServiceListJsonLd services={services.map((s) => ({ name: s.title, description: s.desc }))} />
      <PageIntro
        eyebrow="Capabilities"
        title="Fourteen ways we put"
        titleAccent="AI to work."
        description="Core AI, product delivery, and enterprise intelligence — every layer of your business, automated and owned by you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
        stats={[
          { value: "14", label: "AI capabilities" },
          { value: "4", label: "Service groups" },
          { value: "100%", label: "Code ownership" },
        ]}
      />
      {/* Mobile-only Service Recommender quiz */}
      <MobileServiceRecommender />
      <ServicesContent />
    </>
  );
}

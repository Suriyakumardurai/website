import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import PricingContent from "@/components/site/pricing-content";

export const metadata: Metadata = {
  title: "Pricing — Fixed-Price AI Engagement",
  description:
    "Fixed-price AI engagements: Quick Build, Full Product, and Ongoing Partner. Never hourly, never surprise invoices. 48-hour quote guarantee or your next sprint is free. 100% source code ownership.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Fixed-Price AI · AutoPlanet Corporation",
    description:
      "Three fixed-price tiers. 48-hour quote guarantee. 100% code ownership. Never hourly, never surprise invoices.",
    url: "/pricing",
  },
  keywords: [
    "AI development pricing",
    "fixed-price AI",
    "AI project cost",
    "AI development cost",
    "custom LLM pricing",
    "AI SaaS pricing",
    "AI agent pricing",
    "enterprise AI pricing",
  ],
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Fixed-price only"
        title="Pricing that"
        titleAccent="holds."
        description="Never hourly. Never surprise invoices. Pick a tier, get a quote in 48 hours, and the number holds — or your next sprint is free."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        stats={[
          { value: "3", label: "Engagement tiers" },
          { value: "48 hrs", label: "Quote turnaround" },
          { value: "100%", label: "Source code & IP" },
        ]}
      />
      <PricingContent />
    </>
  );
}

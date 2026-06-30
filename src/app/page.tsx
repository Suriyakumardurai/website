import type { Metadata } from "next";
import Hero from "@/components/site/hero";
import Stats, { Marquee, LiveOps } from "@/components/site/stats";
import {
  ServicesPreview,
  ProcessPreview,
  PricingPreview,
  TestimonialsSection,
  TechStrip,
} from "@/components/site/home-sections";
import { CtaBand } from "@/components/site/shared";
import MobileROICalculator from "@/components/site/mobile-roi-calculator";

export const metadata: Metadata = {
  title: "AutoPlanet Corporation — Enterprise AI, Engineered to Ship",
  description:
    "AutoPlanet Corporation ships production-ready AI systems for enterprise — autonomous agents, custom LLMs, RAG pipelines, and full SaaS builds. 100% code ownership. 99.9% uptime SLA. VPC-ready. Fixed-price. 48-hour proposals.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AutoPlanet Corporation — Enterprise AI, Engineered to Ship",
    description:
      "Production-ready AI in weeks. Autonomous agents, custom LLMs, full SaaS builds. 100% code ownership, 99.9% uptime SLA, VPC-ready deployment.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Marquee />
      <TechStrip />
      <Stats />
      <ServicesPreview />
      <LiveOps />
      <ProcessPreview />
      <PricingPreview />
      {/* Mobile-only ROI Calculator */}
      <MobileROICalculator />
      <TestimonialsSection />
      <CtaBand />
    </div>
  );
}

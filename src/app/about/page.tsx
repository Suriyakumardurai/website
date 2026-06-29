import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import AboutContent from "@/components/site/about-content";

export const metadata: Metadata = {
  title: "About — AI-Native Engineering for Enterprise",
  description:
    "AutoPlanet Corporation is an AI-native engineering team that ships production-ready AI systems. Not a consultancy that adopted AI — born from it. 100% code ownership, VPC deployment, enterprise-grade security.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AutoPlanet Corporation — AI-Native Engineering",
    description:
      "An AI-native engineering team, not a consultancy. Production-ready systems, full ownership, enterprise-grade security as defaults.",
    url: "/about",
  },
  keywords: [
    "about AutoPlanet",
    "AI-native engineering",
    "AI engineering team",
    "enterprise AI company",
    "AI automation company",
    "production AI",
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="The company"
        title="AI-native engineering for"
        titleAccent="enterprise."
        description="Not a consultancy that adopted AI — a team born from it. Production-ready systems, full ownership, and enterprise-grade security as defaults."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        stats={[
          { value: "40+", label: "AI systems shipped" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "100%", label: "Data sovereignty" },
        ]}
      />
      <AboutContent />
    </>
  );
}

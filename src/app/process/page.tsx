import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import ProcessContent from "@/components/site/process-content";

export const metadata: Metadata = {
  title: "Process — How We Ship AI",
  description:
    "Our 4-step delivery process: discovery call, 48-hour scope & proposal, build sprint with Friday demos, and deploy & hand-off with full source code and documentation. Fixed-price, guaranteed.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process — How We Ship AI · AutoPlanet Corporation",
    description:
      "Discovery call → 48-hour proposal → build sprint → deploy & hand-off. Fixed-price, 100% code ownership, deadline guarantees in writing.",
    url: "/process",
  },
  keywords: [
    "AI development process",
    "AI delivery process",
    "fixed-price AI development",
    "48-hour proposal",
    "AI build sprint",
    "AI project delivery",
    "AI engineering process",
  ],
};

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="How we ship"
        title="A process engineered for"
        titleAccent="speed without compromise."
        description="From discovery call to deployed system — focused sprints, live demos every Friday, and a clean hand-off with everything you need."
        crumbs={[{ label: "Home", href: "/" }, { label: "Process" }]}
        stats={[
          { value: "48 hrs", label: "To scoped proposal" },
          { value: "1–2 wks", label: "Sprint cycle" },
          { value: "30–90 days", label: "Support period" },
        ]}
      />
      <ProcessContent />
    </>
  );
}

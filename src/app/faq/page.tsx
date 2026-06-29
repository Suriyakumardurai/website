import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import FaqContent from "@/components/site/faq-content";
import { FaqJsonLd } from "@/components/site/structured-data";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Questions Answered",
  description:
    "Answers on engagement model, code ownership, VPC deployment, supported AI models (GPT-4o, Claude 3.5, Gemini, Llama 3), performance SLAs, deadline guarantees, and post-launch support. No corporate waffle.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ · AutoPlanet Corporation",
    description:
      "Engagement, ownership, tech, process, and support — answered straight, no waffle.",
    url: "/faq",
  },
  keywords: [
    "AI development FAQ",
    "AI project questions",
    "code ownership AI",
    "VPC AI deployment",
    "AI model selection",
    "AI uptime SLA",
    "AI deadline guarantee",
  ],
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      <PageIntro
        eyebrow="Questions, answered straight"
        title="No corporate"
        titleAccent="waffle."
        description="Everything you need to know about working with us — engagement, ownership, tech, process, and support."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        stats={[
          { value: "5", label: "Categories" },
          { value: "48 hrs", label: "To proposal" },
          { value: "100%", label: "Code ownership" },
        ]}
      />
      <FaqContent />
    </>
  );
}

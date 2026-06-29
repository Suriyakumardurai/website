import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import ContactContent from "@/components/site/contact-content";

export const metadata: Metadata = {
  title: "Contact — Start Your AI Project",
  description:
    "Book a free 30-minute discovery call with AutoPlanet Corporation. Problem deep-dive, technical assessment, and a scoped fixed-price proposal within 48 hours — or your next sprint is free.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AutoPlanet Corporation — Start Your AI Project",
    description:
      "Free 30-minute discovery call. Scoped fixed-price proposal within 48 hours. No sales pitch.",
    url: "/contact",
  },
  keywords: [
    "contact AutoPlanet",
    "AI project consultation",
    "AI discovery call",
    "AI project quote",
    "hire AI engineers",
    "AI development contact",
  ],
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Start the conversation"
        title="Let's scope your"
        titleAccent="AI project."
        description="A discovery call — no sales pitch. You walk away with a scoped proposal in 48 hours, or your next sprint is free."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        stats={[
          { value: "30 min", label: "Discovery call" },
          { value: "48 hrs", label: "To proposal" },
          { value: "24 hrs", label: "Reply time" },
        ]}
      />
      <ContactContent />
    </>
  );
}

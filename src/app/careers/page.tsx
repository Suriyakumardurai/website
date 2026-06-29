import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import CareersContent from "@/components/site/careers-content";

export const metadata: Metadata = {
  title: "Careers — Build AI That Ships",
  description:
    "Join AutoPlanet Corporation. Remote, performance-based roles for AI engineers, frontend engineers, and business development. Production AI from day one — not busywork, not shadowing.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at AutoPlanet Corporation — Build AI That Ships",
    description:
      "Remote, performance-based roles. Production AI from day one. AI Engineer, Frontend Engineer, Business Development.",
    url: "/careers",
  },
  keywords: [
    "AI engineer jobs",
    "AI developer jobs",
    "remote AI jobs",
    "frontend engineer jobs",
    "Three.js jobs",
    "AI careers",
    "AI company hiring",
  ],
};

export default function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Careers · remote"
        title="Build AI that"
        titleAccent="actually ships."
        description="Production AI from day one — not busywork, not shadowing, not slide decks. Remote, performance-based, engineering-led."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        stats={[
          { value: "100%", label: "Remote" },
          { value: "3", label: "Open roles" },
          { value: "Day 1", label: "Production impact" },
        ]}
      />
      <CareersContent />
    </>
  );
}

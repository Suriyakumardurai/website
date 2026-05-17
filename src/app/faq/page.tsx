// src/app/faq/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, Search, MessageSquare, Rocket, Brain, CreditCard, Globe } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, RevealSection, StaggerGrid, StaggerItem } from "@/components/Animate";

const faqCategories = [
  {
    category: "Getting Started",
    icon: Rocket,
    items: [
      { q: "How long does a typical project take?", a: "Most AI agent builds and integrations ship within 2–4 weeks. Full SaaS products take 6–10 weeks. We move fast because we've built the playbook across 40+ AI products." },
      { q: "Do you work with early-stage startups?", a: "Yes. We work with founders from pre-product to Series B. Some of our best work started as napkin ideas. We help you validate, build, and ship — fast." },
      { q: "How do I get started?", a: "Book a free 30-minute call. We'll listen to your idea, assess feasibility, and tell you exactly what we'd build, how long it'd take, and what it'd cost. No pressure, no sales pitch." },
    ],
  },
  {
    category: "Technology",
    icon: Brain,
    items: [
      { q: "Which AI models do you work with?", a: "GPT-4o, Claude 3.5, Gemini, Mistral, Llama 3 — we're model agnostic. We recommend what's right for your use case, latency requirements, and budget. No vendor lock-in." },
      { q: "Can you integrate AI into our existing product?", a: "Absolutely. That's one of our most common engagements — from 10-year-old Rails apps to modern Next.js products. We plug AI into your existing stack via APIs, middleware, or embedded models." },
      { q: "What tech stack do you use?", a: "Next.js, React, TypeScript, Python, Node.js for development. GPT-4o, Claude, Gemini, Llama for AI. AWS, Vercel, Docker for infrastructure. We pick what's right for your project." },
    ],
  },
  {
    category: "Business & Pricing",
    icon: CreditCard,
    items: [
      { q: "What's your pricing model?", a: "Fixed pricing, always. No hourly billing, no surprise invoices. We scope every project upfront with a clear timeline and deliverables. You know exactly what you're paying before work begins." },
      { q: "Do I own the code and IP?", a: "100%. Every line of code, every trained model, every piece of documentation — it's all yours. Full source code ownership with no recurring license fees or vendor lock-in." },
      { q: "Do you offer ongoing support after launch?", a: "Yes. Every project comes with 30-day post-launch support included. We also offer monthly retainers for ongoing AI development, optimization, and new feature builds." },
    ],
  },
  {
    category: "Company",
    icon: Globe,
    items: [
      { q: "Where is AutoPlanet based?", a: "We're headquartered in Villupuram, Tamil Nadu, India. We work with clients globally — most of our communication happens async via Slack, email, and weekly video calls." },
      { q: "How big is the team?", a: "We're a lean, focused team of AI-native engineers. No project managers, no account managers — just engineers who ship. You talk directly to the people building your product." },
      { q: "What makes AutoPlanet different?", a: "We're not an agency that bolted AI on. We were born from AI. Every engineer on our team has built production AI systems. We ship in weeks, not quarters — and you own every line of code." },
    ],
  },
];

function FAQItem({ item, isOpen, toggle }: { item: { q: string; a: string }; isOpen: boolean; toggle: () => void }) {
  return (
    <motion.div
      className="faq-page-item"
      style={{ cursor: "pointer", padding: "1.75rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
      onClick={toggle}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: isOpen ? "var(--accent)" : "var(--white)", fontWeight: 400, transition: "color 0.3s", lineHeight: 1.4 }}>
          {item.q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ flexShrink: 0, marginTop: "2px" }}
        >
          <Plus size={18} style={{ color: "var(--accent)", opacity: 0.6 }} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, paddingTop: "1rem", maxWidth: "600px" }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allFaqs = faqCategories.flatMap((c) => c.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "AutoPlanet Corporation - Frequently Asked Questions",
            url: "https://autoplanetcorp.com/faq",
            mainEntity: allFaqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <PageNavbar />

      {/* HERO */}
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>FAQ</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}
        >
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          Frequently Asked Questions
        </motion.div>

        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: "1.5rem" }}>
          <WordReveal text="Questions we always get asked" />
        </h1>

        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "600px" }}>
            Everything you need to know about working with AutoPlanet. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>Book a free call</Link>.
          </p>
        </FadeUp>
      </div>

      {/* FAQ CATEGORIES */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        {faqCategories.map((cat, ci) => (
          <RevealSection key={cat.category}>
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(200,169,110,0.08)", border: "0.5px solid rgba(200,169,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <cat.icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--white)", fontWeight: 400 }}>
                  {cat.category}
                </h2>
                <div style={{ flex: 1, height: "0.5px", background: "rgba(200,169,110,0.15)" }} />
              </div>

              <div>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  return (
                    <FAQItem
                      key={key}
                      item={item}
                      isOpen={!!openItems[key]}
                      toggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </div>
          </RevealSection>
        ))}
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* STILL HAVE QUESTIONS */}
      <div style={{ padding: "5rem 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <MessageSquare size={32} style={{ color: "var(--accent)", margin: "0 auto 1.5rem", opacity: 0.7, position: "relative", zIndex: 1 }} />
            <h2>Still have questions?</h2>
            <p>Book a free 30-minute call and we&apos;ll answer everything directly. No sales pitch.</p>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Book a free call <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </div>

      <PageFooter />
    </>
  );
}
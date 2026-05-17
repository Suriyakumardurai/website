// src/app/pricing/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Timer, Layout, Users, Sparkles, MessageSquare } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, StaggerGrid, StaggerItem, RevealSection } from "@/components/Animate";

const plans = [
  {
    name: "Quick Build",
    icon: Timer,
    focus: "Speed & Integration",
    timeline: "2 weeks avg.",
    desc: "For founders who need a specific AI feature or integration live in record time.",
    features: ["Single-agent deployment", "Core API integration", "Clean hand-off", "30-day monitoring"],
    highlight: false,
  },
  {
    name: "Full Product",
    icon: Layout,
    focus: "Scale & Market Ready",
    timeline: "4–8 week cycle",
    desc: "End-to-end AI SaaS development from napkin idea to production-ready product.",
    features: ["Architecture & UI/UX", "Full AI backend pipeline", "Auth & Stripe integration", "90-day maintenance"],
    highlight: true,
  },
  {
    name: "Ongoing Partner",
    icon: Users,
    focus: "R&D & Optimization",
    timeline: "Retainer-based",
    desc: "Dedicated AI engineering embedded in your team for continuous innovation.",
    features: ["Dedicated lead engineer", "Weekly sprint reviews", "Infinite iterations", "Priority R&D access"],
    highlight: false,
  },
];

const pricingFaqs = [
  { q: "Do you charge hourly?", a: "Never. Every engagement is scoped with a fixed price and timeline before work begins. You know exactly what you're paying." },
  { q: "What's included in the price?", a: "Everything: architecture, design, development, testing, deployment, documentation, and post-launch support. No hidden fees." },
  { q: "Can I switch plans mid-project?", a: "Absolutely. If your scope evolves, we adjust the engagement model to match. We're flexible by design." },
  { q: "What if I just need a consultation?", a: "Your first 30-minute call is always free. We'll assess your needs and recommend the right path — no pressure." },
];

export default function PricingPage() {
  return (
    <>
      <PageNavbar />

      {/* HERO */}
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Pricing</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}
        >
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          Engagement Models
        </motion.div>

        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: "1.5rem", textAlign: "center", maxWidth: "700px", margin: "0 auto 1.5rem" }}>
          <WordReveal text="Scoping your ambition." />
        </h1>

        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "600px", textAlign: "center", margin: "0 auto" }}>
            Elite AI engineering isn&apos;t a commodity. We don&apos;t charge by the hour — we build for outcomes. Select the engagement model that fits your stage.
          </p>
        </FadeUp>
      </div>

      {/* PLANS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        <StaggerGrid className="plans-grid">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`plan-card ${plan.highlight ? "featured" : ""}`}>
                {plan.highlight && <div className="plan-badge">Elite Choice</div>}
                <div style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>
                  <plan.icon size={32} />
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--white)", marginBottom: "0.25rem" }}>{plan.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                  {plan.focus} &bull; {plan.timeline}
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "2rem" }}>{plan.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
                      <Check size={14} style={{ color: "var(--accent)", flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={plan.highlight ? "btn-primary" : "btn-ghost"}
                  style={{ width: "100%", justifyContent: "center", marginTop: "2rem", display: "flex" }}
                >
                  Get started <ArrowRight size={16} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* HOW PRICING WORKS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Transparency
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--white)", marginBottom: "3rem" }}>
            How pricing works
          </h2>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "900px" }}>
          {pricingFaqs.map((item, i) => (
            <RevealSection key={i}>
              <div className="glass-card" style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <MessageSquare size={16} style={{ color: "var(--accent)", opacity: 0.7 }} />
                  <h3 style={{ fontSize: "1rem", color: "var(--white)", fontWeight: 400 }}>{item.q}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* GUARANTEE */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <RevealSection>
          <div className="accent-card" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <Sparkles size={32} style={{ color: "var(--accent)", margin: "0 auto 1.5rem", opacity: 0.8 }} />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--white)", marginBottom: "1.5rem" }}>
              Our guarantee
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "550px", margin: "0 auto", position: "relative", zIndex: 1 }}>
              If we can&apos;t scope your project within 48 hours of our first call, or if we miss a deadline by more than 3 days — your next sprint is on us. No questions asked.
            </p>
          </div>
        </RevealSection>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 40px 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <h2>Get a fixed-price proposal</h2>
            <p>Tell us what you&apos;re building. We&apos;ll send you a clear scope, timeline, and price within 48 hours.</p>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Request a proposal <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </div>

      <PageFooter />
    </>
  );
}
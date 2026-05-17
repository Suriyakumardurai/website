// src/app/process/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, FileText, Code, Rocket, CheckCircle, Clock, Shield, Zap } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, RevealSection, StaggerGrid, StaggerItem } from "@/components/Animate";

const steps = [
  { num: "01", title: "Free 30-min call", desc: "We understand your problem, stack, and goals. No sales pitch — just an honest conversation about what AI can do for you.", icon: Phone, color: "#c8a96e", details: ["Problem deep-dive", "Technical assessment", "Feasibility check", "Timeline estimate"] },
  { num: "02", title: "Scope & proposal", desc: "Within 48 hours, you get a clear scope document, timeline, and fixed price. No hourly billing, no surprise invoices.", icon: FileText, color: "#5ba4f5", details: ["Architecture blueprint", "Feature breakdown", "Fixed-price quote", "Clear milestones"] },
  { num: "03", title: "Build sprint", desc: "We ship in focused 1–2 week sprints with live demos every Friday. You see progress constantly, not at the end.", icon: Code, color: "#3dd68c", details: ["Weekly demos", "Daily async updates", "Direct engineer access", "Iterative refinement"] },
  { num: "04", title: "Deploy & hand off", desc: "We deploy to your infrastructure, write the docs, and transfer full ownership. Then stick around for 30–60 days.", icon: Rocket, color: "#a78bfa", details: ["Production deployment", "Full documentation", "Source code transfer", "30-60 day support"] },
];

const guarantees = [
  { title: "Fixed Pricing", desc: "No hourly billing. Know exactly what you pay before work begins.", icon: Shield },
  { title: "Ships in Weeks", desc: "Most projects ship in 2-8 weeks. We move fast without cutting corners.", icon: Clock },
  { title: "Full Ownership", desc: "100% of code, models, and IP is yours. No lock-in, no recurring fees.", icon: CheckCircle },
  { title: "Direct Access", desc: "Talk directly to the engineers building your product. No middlemen.", icon: Zap },
];

export default function ProcessPage() {
  return (
    <>
      <PageNavbar />
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Process</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          How We Work
        </motion.div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--white)", marginBottom: "1.5rem" }}>
          <WordReveal text="From call to production in weeks." />
        </h1>
        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "650px" }}>
            Our battle-tested 4-step process delivers production-ready AI in weeks, not months. Fixed pricing. Full ownership. No surprises.
          </p>
        </FadeUp>
      </div>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", left: "24px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent)" }} />
          {steps.map((step, i) => (
            <RevealSection key={step.num}>
              <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "2rem", padding: "3rem 0", position: "relative" }}>
                <motion.div whileHover={{ scale: 1.1, background: `${step.color}20` }} style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1px solid ${step.color}40`, background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, transition: "all 0.3s" }}>
                  <step.icon size={20} style={{ color: step.color }} />
                </motion.div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: step.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Step {step.num}</div>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, color: "var(--white)", marginBottom: "1rem" }}>{step.title}</h2>
                  <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "550px" }}>{step.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", maxWidth: "400px" }}>
                    {step.details.map((d) => (
                      <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
                        <CheckCircle size={14} style={{ color: step.color, flexShrink: 0, opacity: 0.7 }} /> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Our Guarantees
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--white)", marginBottom: "3rem" }}>Why teams trust our process</h2>
        </FadeUp>
        <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {guarantees.map((g) => (
            <StaggerItem key={g.title}>
              <div className="glass-card" style={{ height: "100%" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <g.icon size={22} style={{ color: "var(--accent)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--white)", marginBottom: "0.75rem", fontWeight: 400 }}>{g.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{g.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />
      <div style={{ padding: "5rem 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <h2>See this process in action</h2>
            <p>Every project starts with a conversation. Tell us what you&apos;re building and we&apos;ll map the fastest path to production.</p>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Start with step one <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </div>
      <PageFooter />
    </>
  );
}
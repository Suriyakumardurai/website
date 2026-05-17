// src/app/about/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Code, Shield, Zap, Brain, Globe, Users, Sparkles } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, StaggerGrid, StaggerItem, RevealSection } from "@/components/Animate";

const stats = [
  { num: "3 wks", label: "Avg. time to ship", icon: Clock },
  { num: "40+", label: "AI products launched", icon: Code },
  { num: "100%", label: "Code ownership yours", icon: Shield },
  { num: "24/7", label: "Agents run without you", icon: Zap },
];

const values = [
  { title: "AI-Native Engineering", description: "Every product we ship has AI at its core — not bolted on as an afterthought. We architect intelligence into the foundation.", icon: Brain },
  { title: "Speed Without Compromise", description: "We ship production-ready AI products in weeks, not months. Focused sprints with live demos every Friday.", icon: Zap },
  { title: "Full Ownership", description: "You own 100% of the source code, models, and infrastructure. No vendor lock-in, no recurring license fees.", icon: Shield },
  { title: "Global Quality, India Pricing", description: "Enterprise-grade engineering from Villupuram, Tamil Nadu — at a fraction of Silicon Valley costs.", icon: Globe },
];

const process = [
  { num: "01", title: "Free 30-min call", desc: "We understand your problem, your stack, and your goals. No sales pitch — just an honest conversation about what AI can do for you." },
  { num: "02", title: "Scope & proposal", desc: "Within 48 hours, you get a clear scope document, timeline, and fixed price. No hourly billing, no surprise invoices." },
  { num: "03", title: "Build sprint", desc: "We ship in focused 1–2 week sprints with live demos every Friday. You see progress constantly." },
  { num: "04", title: "Deploy & hand off", desc: "We deploy to your infrastructure, write the docs, and transfer full ownership. Then we stick around for 30–60 days." },
];

export default function AboutPage() {
  return (
    <>
      <PageNavbar />

      {/* HERO */}
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>About</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}
        >
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          About AutoPlanet
        </motion.div>

        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: "1.5rem" }}>
          <WordReveal text="Built from the ground up with AI." />
        </h1>

        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "650px" }}>
            AutoPlanet isn&apos;t an agency that adopted AI — we were born from it. Every product we ship, every workflow we design, every line of code we write is AI-native from day one.
          </p>
        </FadeUp>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass-card" style={{ textAlign: "left" }}>
                <s.icon size={24} style={{ color: "var(--accent)", marginBottom: "1rem", opacity: 0.8 }} />
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--white)", lineHeight: 1, marginBottom: "0.5rem" }}>{s.num}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* VALUES */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Our Values
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--white)", marginBottom: "3rem" }}>
            What We Stand For
          </h2>
        </FadeUp>

        <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="glass-card" style={{ height: "100%" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <v.icon size={22} style={{ color: "var(--accent)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--white)", marginBottom: "0.75rem", fontWeight: 400 }}>{v.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* PROCESS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Our Process
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--white)", marginBottom: "3rem" }}>
            How we actually work
          </h2>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: "700px", position: "relative" }}>
          <div style={{ position: "absolute", left: "24px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent)" }} />
          {process.map((step, i) => (
            <RevealSection key={step.num}>
              <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", padding: "2rem 0", position: "relative" }}>
                <motion.div
                  whileHover={{ scale: 1.1, background: "rgba(200,169,110,0.1)" }}
                  style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid rgba(200,169,110,0.3)", background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--accent)", flexShrink: 0, position: "relative", zIndex: 2, transition: "all 0.3s" }}
                >
                  {step.num}
                </motion.div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--white)", marginBottom: "0.5rem", fontWeight: 400 }}>{step.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* FOUNDER */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <RevealSection>
          <div className="accent-card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
                <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
                Leadership
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--white)", marginBottom: "1.5rem" }}>
                Founded by Suriya
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                AutoPlanet Corporation was founded in 2024 in Villupuram, Tamil Nadu with a singular belief: every business process that involves reading, writing, deciding, or routing can be automated with AI.
              </p>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                Today, we build custom LLMs, AI SaaS products, and intelligent workflow engines for businesses across India and beyond — from startups with napkin ideas to enterprises needing full-scale automation.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: Users, label: "Team", value: "AI-native engineers" },
                { icon: Globe, label: "Reach", value: "India + Global remote" },
                { icon: Sparkles, label: "Focus", value: "AI that actually ships" },
                { icon: Brain, label: "Stack", value: "GPT-4o, Claude, Gemini, Llama" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: "14px", border: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  <item.icon size={18} style={{ color: "var(--accent)", opacity: 0.7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--white)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 40px 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <h2>Work with engineers who ship</h2>
            <p>No account managers. No middlemen. Talk directly to the team that&apos;ll build your product.</p>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Start a conversation <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </div>

      <PageFooter />
    </>
  );
}
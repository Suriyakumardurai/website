// src/app/services/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, Repeat, Layers, Smartphone, Palette, Cloud, Rocket, ShieldCheck } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, StaggerGrid, StaggerItem, RevealSection } from "@/components/Animate";

const services = [
  { title: "Custom LLM Development", desc: "Fine-tuned models, RAG pipelines, and prompt architectures trained on your data.", href: "/services/ai-solutions", icon: Brain, color: "#c8a96e" },
  { title: "AI SaaS Products", desc: "End-to-end product builds — AI backend, UI, auth, billing. From idea to deployed SaaS.", href: "/services/web-development", icon: Zap, color: "#3dd68c" },
  { title: "Workflow Automation", desc: "Replace every repetitive process with an intelligent pipeline. Sales, ops, marketing.", href: "/services/ai-solutions", icon: Repeat, color: "#5ba4f5" },
  { title: "AI Integrations", desc: "Plug AI into your existing stack. CRM, ERP, Slack, databases — wired together.", href: "/services/ai-solutions", icon: Layers, color: "#a78bfa" },
  { title: "Mobile Apps", desc: "AI-powered mobile apps for iOS and Android. React Native, Flutter — native performance.", href: "/services/mobile-apps", icon: Smartphone, color: "#f472b6" },
  { title: "UI/UX Design", desc: "Human-centered design for AI products. Intuitive interfaces that feel simple.", href: "/services/ui-ux-design", icon: Palette, color: "#fb923c" },
  { title: "Cloud & DevOps", desc: "Scalable cloud infrastructure and CI/CD pipelines for AI workloads.", href: "/services/cloud-devops", icon: Cloud, color: "#38bdf8" },
  { title: "Performance Optimization", desc: "Speed optimization, Core Web Vitals, load testing. Blazingly fast.", href: "/services/performance", icon: Rocket, color: "#34d399" },
  { title: "Enterprise Security", desc: "Red-teaming, prompt injection defense, private model deployment.", href: "/services/ai-solutions", icon: ShieldCheck, color: "#f87171" },
];

const stats = [
  { value: "83%", label: "Avg. manual work eliminated" },
  { value: "3 wks", label: "Avg. time to ship" },
  { value: "40+", label: "AI products launched" },
  { value: "100%", label: "Code ownership yours" },
];

export default function ServicesPage() {
  return (
    <>
      <PageNavbar />
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Services</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          What We Build
        </motion.div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--white)", marginBottom: "1.5rem" }}>
          <WordReveal text="AI Automation. Built in India." />
        </h1>
        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "650px" }}>
            Every service we offer has AI at the core. We don&apos;t bolt AI on — we engineer it in from the start. From custom LLMs to full SaaS products, we build what others only pitch.
          </p>
        </FadeUp>
      </div>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass-card" style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--white)", lineHeight: 1, marginBottom: "0.5rem" }}>{s.value}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Our Services
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--white)", marginBottom: "3rem" }}>Full-spectrum AI development</h2>
        </FadeUp>
        <div className="services-page-grid">
          {services.map((s, i) => (
            <RevealSection key={s.title}>
              <Link href={s.href} style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} style={{ display: "block", padding: "2.5rem 2rem", background: "var(--black)", position: "relative", overflow: "hidden" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${s.color}12`, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.75rem", fontWeight: 400 }}>{s.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{s.desc}</p>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "6px" }}>Learn more <ArrowRight size={14} /></span>
                </motion.div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />
      <div style={{ padding: "5rem 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <h2>Tell us what you need built</h2>
            <p>Whether it&apos;s a custom LLM, an AI agent, or a full SaaS product — we&apos;ll tell you exactly how we&apos;d approach it.</p>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </div>
      <PageFooter />
    </>
  );
}
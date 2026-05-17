// src/app/case-studies/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Bot, Users, BarChart3, Zap } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, StaggerGrid, StaggerItem, RevealSection } from "@/components/Animate";

const caseStudies = [
  { title: "E-Commerce AI Agent", client: "FastCart Inc.", metric: "83%", metricLabel: "Tickets automated", desc: "Built an autonomous AI support agent handling product inquiries, order tracking, returns, and escalations — replacing L1/L2 support entirely.", tags: ["AI Agent", "GPT-4o", "RAG Pipeline"], icon: Bot, color: "#c8a96e" },
  { title: "Legal Document Automation", client: "LawBridge LLP", metric: "70%", metricLabel: "Time saved", desc: "Custom LLM fine-tuned on 50K legal documents. Extracts clauses, flags risks, generates summaries — cutting contract review from days to hours.", tags: ["Custom LLM", "Fine-tuning", "NLP"], icon: BarChart3, color: "#5ba4f5" },
  { title: "SaaS Analytics Dashboard", client: "MetricFlow", metric: "4wks", metricLabel: "Time to ship", desc: "Full AI SaaS build — auth, billing, AI-powered analytics engine, real-time dashboards. Shipped production-ready in under a month.", tags: ["AI SaaS", "Next.js", "Stripe"], icon: TrendingUp, color: "#3dd68c" },
  { title: "Sales Pipeline Automation", client: "GrowthStack", metric: "3x", metricLabel: "Lead quality", desc: "Intelligent lead scoring, automated outreach, CRM enrichment pipeline using multi-model AI. Sales went from 100 to 300 qualified leads/month.", tags: ["Automation", "Multi-model", "CRM"], icon: Users, color: "#a78bfa" },
];

const results = [
  { value: "83%", label: "Avg. manual work eliminated" },
  { value: "4 wks", label: "Avg. delivery time" },
  { value: "3x", label: "Avg. ROI improvement" },
  { value: "100%", label: "Client satisfaction" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageNavbar />
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Case Studies</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          Success Stories
        </motion.div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--white)", marginBottom: "1.5rem" }}>
          <WordReveal text="Real AI. Real results." />
        </h1>
        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "650px" }}>
            See how businesses transformed their operations with AutoPlanet&apos;s AI automation. Every case study represents a real engagement with measurable outcomes.
          </p>
        </FadeUp>
      </div>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {results.map((r) => (
            <StaggerItem key={r.label}>
              <div className="glass-card" style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--accent)", lineHeight: 1, marginBottom: "0.5rem" }}>{r.value}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>{r.label}</div>
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
            Featured Projects
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--white)", marginBottom: "3rem" }}>How we delivered</h2>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {caseStudies.map((cs, i) => (
            <RevealSection key={cs.title}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="glass-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${cs.color}12`, border: `1px solid ${cs.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <cs.icon size={24} style={{ color: cs.color }} />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: cs.color, lineHeight: 1 }}>{cs.metric}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{cs.metricLabel}</div>
                  </div>
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{cs.client}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--white)", marginBottom: "1rem", fontWeight: 400 }}>{cs.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, flex: 1, marginBottom: "1.5rem" }}>{cs.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {cs.tags.map((tag) => (
                    <span key={tag} style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(200,169,110,0.08)", border: "0.5px solid rgba(200,169,110,0.15)", color: "var(--accent)", fontSize: "0.7rem" }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />
      <div style={{ padding: "5rem 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <h2>Your project could be next</h2>
            <p>We&apos;re selective about the work we take on — but if the fit is right, we move fast. Let&apos;s find out.</p>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Discuss your project <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </div>
      <PageFooter />
    </>
  );
}
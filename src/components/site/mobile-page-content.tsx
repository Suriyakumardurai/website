"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  ShieldCheck,
  FileText,
  GitBranch,
  Layers,
  Cpu,
  Bot,
  Database,
  Cloud,
  Server,
  Mail,
  Phone,
  Send,
  Sparkles,
  Star,
  Zap,
  MapPin,
  ChevronDown,
  Plus,
  GitCompare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  services,
  techStack,
  capabilities,
  coreValues,
  processSteps,
  pricingGuarantees,
  tiers,
  faqs,
  jobs,
  testimonials,
  company,
} from "@/lib/content";
import MobileQuickQuote from "@/components/site/mobile-quick-quote";
import MobileQuoteHistory from "@/components/site/mobile-quote-history";
import { useContactDraft, MobileDraftRestorePrompt, MobileDraftSavedIndicator } from "@/components/site/mobile-draft-autosave";
import { useCompareToggle } from "@/components/site/mobile-compare";

const ease = [0.22, 1, 0.36, 1] as const;

const groups = [
  { label: "Core AI", range: [0, 4] as const },
  { label: "Product & Delivery", range: [4, 9] as const },
  { label: "Enterprise & Intelligence", range: [9, 14] as const },
];

/* ═══════════════════════════════════════════════════════════════
   MOBILE SERVICES CONTENT
   ═══════════════════════════════════════════════════════════════ */
export function MobileServicesContent() {
  const { selected, toggle, max } = useCompareToggle();

  return (
    <>
      <section className="lg:hidden py-8">
        <div className="safe-px">
          {groups.map((g, gi) => {
            const slice = services.slice(g.range[0], g.range[1]);
            return (
              <div key={g.label} className={gi > 0 ? "mt-10" : ""}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] lime-text">{String(gi + 1).padStart(2, "0")}</span>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
                    {g.label}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-mono text-[10px] text-muted-foreground">{slice.length}</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {slice.map((s, i) => {
                    const Icon = (Icons as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Box;
                    const isSelected = selected.includes(s.id);
                    const isMaxed = selected.length >= max && !isSelected;
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease }}
                        className={`rounded-2xl m-card p-4 relative ${
                          isSelected ? "ring-2 ring-lime-500" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-9 w-9 rounded-lg bg-foreground text-background flex items-center justify-center">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Add to compare toggle */}
                            <button
                              onClick={() => toggle(s.id)}
                              disabled={isMaxed}
                              aria-label={isSelected ? "Remove from compare" : "Add to compare"}
                              aria-pressed={isSelected}
                              className={`m-tap m-press h-7 px-2 rounded-full text-[10px] font-medium transition-all ${
                                isSelected
                                  ? "bg-lime-400 text-foreground"
                                  : isMaxed
                                  ? "m-card-flat text-muted-foreground/40"
                                  : "m-card-flat text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {isSelected ? (
                                <span className="flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Added
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Plus className="h-3 w-3" /> Compare
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm mb-1.5">{s.title}</h3>
                        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                        <ul className="space-y-1">
                          {s.points.slice(0, 3).map((p) => (
                            <li key={p} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                              <Check className="h-3 w-3 lime-text mt-0.5 shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech stack — swipe rail */}
      <section className="lg:hidden py-8 border-y border-border bg-muted/30">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Models &amp; infrastructure
          </p>
        </div>
        <div className="snap-rail no-scrollbar overflow-x-auto flex gap-2 safe-px">
          {techStack.map((t) => (
            <div
              key={t.name}
              className="shrink-0 min-w-[130px] rounded-2xl m-card p-3.5"
            >
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{t.vendor}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE ABOUT CONTENT
   ═══════════════════════════════════════════════════════════════ */
const platformPillars = [
  { icon: Layers, title: "AI-native architecture", desc: "Intelligence at the foundation — not bolted onto legacy systems. Every workflow designed around model capabilities from day one." },
  { icon: GitBranch, title: "Full source ownership", desc: "100% of code, model weights, and infrastructure transfer to you. No vendor lock-in, no recurring license fees, no hostage data." },
  { icon: ShieldCheck, title: "Enterprise security", desc: "Private model deployment inside your VPC, red-teaming, and prompt-injection defense as defaults — not upgrades." },
  { icon: Server, title: "Production-grade infra", desc: "CI/CD for AI workloads, observability, and zero-downtime deploys. Hardened for scale from the first commit." },
];

const stackLayers = [
  { icon: Bot, title: "Applications", subtitle: "Agents · SaaS · Mobile", desc: "User-facing AI products" },
  { icon: Cpu, title: "Models", subtitle: "Custom LLMs · RAG", desc: "Domain-specific intelligence" },
  { icon: Database, title: "Data Layer", subtitle: "Pipelines · Vector DB", desc: "Proprietary knowledge" },
  { icon: Cloud, title: "Infrastructure", subtitle: "VPC · CI/CD", desc: "Enterprise-grade delivery" },
];

export function MobileAboutContent() {
  return (
    <>
      {/* Story */}
      <section className="lg:hidden py-8">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-2">
            The company
          </p>
          <h2 className="text-2xl font-semibold tracking-tight leading-tight">
            An AI-native engineering team
            <br />
            <span className="text-muted-foreground">not a consultancy that adopted AI.</span>
          </h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              AutoPlanet Corporation exists on a single belief:{" "}
              <span className="text-foreground">every business process that involves reading, writing, deciding, or routing can be automated with AI.</span>
            </p>
            <p>
              We ship production-ready AI systems — autonomous agents, custom LLMs, and full SaaS builds — engineered for enterprise scale. Clients receive complete source code, model weights, and IP. No vendor lock-in, no recurring license fees.
            </p>
          </div>

          {/* Capabilities — 2x2 bento */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                className={`rounded-2xl p-3.5 ${i === 0 ? "bg-foreground text-background" : "m-card-flat"}`}
              >
                <div className={`text-base font-semibold tracking-tight ${i === 0 ? "text-lime-400" : ""}`}>
                  {c.value}
                </div>
                <div className={`text-[10px] mt-0.5 ${i === 0 ? "text-background/70" : "text-muted-foreground"}`}>
                  {c.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform architecture — vertical stack */}
      <section className="lg:hidden py-8 border-y border-border bg-muted/30">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Platform architecture
          </p>
          <p className="text-sm font-semibold mb-4">Full-stack AI delivery</p>

          <div className="space-y-2">
            {stackLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                  className="relative flex items-center gap-3 rounded-2xl m-card p-3.5"
                >
                  <span className="font-mono text-[9px] text-muted-foreground/50 absolute top-2 right-3">
                    L{4 - i}
                  </span>
                  <div className="h-9 w-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-semibold text-sm">{layer.title}</span>
                      <span className="text-[10px] text-muted-foreground">{layer.subtitle}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{layer.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">100% deployable in your VPC</span>
            <span className="font-mono lime-text">enterprise-ready</span>
          </div>
        </div>
      </section>

      {/* Platform pillars — vertical stack */}
      <section className="lg:hidden py-8">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-2">
            Platform principles
          </p>
          <h2 className="text-2xl font-semibold tracking-tight leading-tight mb-5">
            What we won&apos;t compromise on.
          </h2>
          <div className="space-y-2.5">
            {platformPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease }}
                  className="rounded-2xl m-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values — vertical list */}
      <section className="lg:hidden py-8 border-t border-border">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-2">
            Core values
          </p>
          <h2 className="text-2xl font-semibold tracking-tight leading-tight mb-5">
            How we operate.
          </h2>
          <div className="space-y-2">
            {coreValues.map((v, i) => {
              const Icon = (Icons as Record<string, Icons.LucideIcon>)[v.icon] ?? Icons.Sparkles;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                  className="flex items-start gap-3 rounded-2xl m-card-flat p-4"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/60 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 lime-text shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech stack — swipe rail */}
      <section className="lg:hidden py-8 border-y border-border bg-muted/30">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Models &amp; infrastructure
          </p>
        </div>
        <div className="snap-rail no-scrollbar overflow-x-auto flex gap-2 safe-px">
          {techStack.map((t) => (
            <div key={t.name} className="shrink-0 min-w-[130px] rounded-2xl m-card p-3.5">
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{t.vendor}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE PRICING CONTENT
   ═══════════════════════════════════════════════════════════════ */
const comparison = [
  { feature: "Source code ownership", quick: true, full: true, partner: true },
  { feature: "Production deployment", quick: true, full: true, partner: true },
  { feature: "Architecture & UI/UX", quick: false, full: true, partner: true },
  { feature: "Auth & Stripe integration", quick: false, full: true, partner: true },
  { feature: "Support period", quick: "30 days", full: "90 days", partner: "Ongoing" },
  { feature: "Dedicated lead engineer", quick: false, full: false, partner: true },
  { feature: "Infinite iterations", quick: false, full: false, partner: true },
  { feature: "Priority R&D access", quick: false, full: false, partner: true },
];

export function MobilePricingContent() {
  return (
    <>
      {/* Quick Quote Calculator — interactive 3-step estimator */}
      <MobileQuickQuote />

      {/* Quote History — shows previously calculated quotes */}
      <MobileQuoteHistory />

      {/* Tier cards — vertical stack */}
      <section className="lg:hidden py-8">
        <div className="safe-px space-y-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className={`rounded-3xl border p-5 relative overflow-hidden ${
                tier.highlight
                  ? "border-foreground bg-foreground text-background shadow-xl"
                  : "border-border bg-card text-foreground m-card"
              }`}
            >
              {tier.highlight && (
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-lime-400/15 blur-3xl"
                />
              )}
              {tier.badge && (
                <div className="relative inline-flex items-center gap-1 rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-semibold text-foreground mb-3">
                  <Star className="h-3 w-3 fill-foreground" />
                  {tier.badge}
                </div>
              )}
              <h3 className={`relative text-base font-semibold ${tier.highlight ? "text-background" : ""}`}>
                {tier.name}
              </h3>
              <p className={`relative text-xs mt-0.5 ${tier.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                {tier.tagline}
              </p>
              <div className="relative mt-4 flex items-baseline gap-2">
                <span className={`text-3xl font-semibold tracking-tight ${tier.highlight ? "text-lime-400" : ""}`}>
                  {tier.price}
                </span>
              </div>
              <p className={`relative text-[10px] mt-1 ${tier.highlight ? "text-background/50" : "text-muted-foreground"}`}>
                {tier.priceNote} · {tier.timeline}
              </p>
              <p className={`relative mt-4 text-xs leading-relaxed ${tier.highlight ? "text-background/80" : "text-muted-foreground"}`}>
                {tier.for}
              </p>
              <div className="relative mt-4 space-y-1.5">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs">
                    <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${tier.highlight ? "text-lime-400" : "lime-text"}`} />
                    <span className={tier.highlight ? "text-background/90" : "text-foreground/90"}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className={`relative mt-5 flex items-center justify-center gap-1.5 h-11 rounded-full font-semibold text-sm m-press ${
                  tier.highlight
                    ? "bg-lime-400 text-foreground"
                    : "bg-foreground text-background"
                }`}
              >
                Start with {tier.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="safe-px mt-6 space-y-2">
          {pricingGuarantees.map((g, i) => {
            const Icon = [ShieldCheck, Zap, Check][i] ?? Check;
            return (
              <div key={g} className="flex items-start gap-2.5 rounded-2xl m-card-flat p-3.5">
                <div className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{g}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison — accordion per feature */}
      <section className="lg:hidden py-8 border-y border-border bg-muted/30">
        <div className="safe-px">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-2">
            Compare tiers
          </p>
          <h2 className="text-2xl font-semibold tracking-tight leading-tight mb-5">
            What&apos;s included, side by side.
          </h2>

          <div className="space-y-1.5">
            {comparison.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04, ease }}
                className="rounded-2xl m-card p-3"
              >
                <div className="text-xs font-semibold mb-2">{row.feature}</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "Quick", value: row.quick },
                    { label: "Full", value: row.full, highlight: true },
                    { label: "Partner", value: row.partner },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className={`rounded-lg p-2 text-center ${
                        c.highlight ? "bg-foreground/[0.04] border border-lime-600/20" : ""
                      }`}
                    >
                      <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                        {c.label}
                      </div>
                      <MobileCell value={c.value} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-lime-600/30 bg-lime-500/[0.06] p-4">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 lime-text shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-sm">Not sure which tier fits?</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Book a free discovery call — we&apos;ll recommend the right scope within 48 hours.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 h-9 rounded-full bg-foreground text-background px-4 text-xs font-semibold m-press"
                >
                  Book a call <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MobileCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-[10px] font-mono text-foreground/80">{value}</span>;
  }
  if (value) {
    return <Check className="h-3.5 w-3.5 lime-text mx-auto" />;
  }
  return <span className="text-muted-foreground/40 text-xs">—</span>;
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE PROCESS CONTENT
   ═══════════════════════════════════════════════════════════════ */
const artifacts = [
  { icon: FileText, label: "Architecture blueprint", note: "System diagram + tech selection" },
  { icon: GitBranch, label: "Feature breakdown", note: "Scoped milestones + acceptance criteria" },
  { icon: ShieldCheck, label: "Security review", note: "Threat model + data flow" },
];

export function MobileProcessContent() {
  return (
    <section className="lg:hidden py-8">
      <div className="safe-px">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-lime-500 via-border to-transparent" />
          <div className="space-y-3">
            {processSteps.map((step, i) => {
              const Icon = (Icons as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Circle;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease }}
                  className="relative flex gap-3.5"
                >
                  <div className="relative shrink-0">
                    <div className="h-11 w-11 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-lime-500 text-foreground text-[9px] font-mono font-bold flex items-center justify-center border-2 border-background">
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1 rounded-2xl m-card p-4">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <span className="text-[9px] font-mono lime-text whitespace-nowrap">{step.detail}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mt-6 rounded-2xl m-card p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
            What you receive
          </p>
          <div className="space-y-3">
            {artifacts.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className="flex items-start gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{a.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{a.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-3 rounded-2xl border border-lime-600/30 bg-lime-500/[0.06] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] lime-text mb-3">
            Guarantees in writing
          </p>
          <div className="space-y-2">
            {pricingGuarantees.map((g) => (
              <div key={g} className="flex items-start gap-2 text-xs text-foreground/90">
                <ShieldCheck className="h-3.5 w-3.5 lime-text mt-0.5 shrink-0" />
                <span className="leading-relaxed">{g}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2.5 rounded-2xl m-card p-3.5">
          <Clock className="h-4 w-4 lime-text shrink-0" />
          <p className="text-xs text-muted-foreground">
            First proposal in <span className="font-semibold text-foreground">48 hours</span> — or your next sprint is free.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE FAQ CONTENT
   ═══════════════════════════════════════════════════════════════ */
const categories = ["All", "Engagement", "Ownership", "Tech", "Process", "Support"];

export function MobileFaqContent() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? faqs : faqs.filter((f) => f.category === cat);

  return (
    <section className="lg:hidden py-8">
      <div className="safe-px">
        {/* Category filter — swipe rail */}
        <div className="snap-rail no-scrollbar overflow-x-auto flex gap-1.5 mb-5 -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium m-press transition-colors ${
                cat === c
                  ? "bg-foreground text-background"
                  : "m-chip text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {filtered.map((f, i) => (
              <AccordionItem
                key={`${cat}-${i}`}
                value={`item-${i}`}
                className="rounded-2xl m-card px-4 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-4 text-sm">
                  <div className="flex items-start gap-2.5 pr-2">
                    <span className="font-mono text-[10px] lime-text mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{f.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4 pl-7">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-6 text-center rounded-2xl m-card-flat p-5">
          <p className="text-base font-semibold">Still have questions?</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Book a discovery call. No sales pitch — just answers.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-xs font-semibold m-press"
          >
            Talk to us <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE CONTACT CONTENT
   ═══════════════════════════════════════════════════════════════ */
const channels = [
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}` },
];

const assurances = [
  { icon: Clock, title: "48-hour scope", desc: "Or next sprint free" },
  { icon: ShieldCheck, title: "100% ownership", desc: "Code, models, IP" },
  { icon: FileText, title: "Fixed-price only", desc: "No surprise invoices" },
];

export function MobileContactContent() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { draftValues, restoreDraft, dismissPrompt, saveDraft, savedAt, clearDraft } = useContactDraft();

  // Autosave on input change (debounced via useEffect)
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onChange = () => {
      const data = new FormData(form);
      const obj: Record<string, string> = {};
      ["name", "email", "company", "message"].forEach((k) => {
        const v = data.get(k);
        if (typeof v === "string") obj[k] = v;
      });
      saveDraft(obj);
    };
    // Debounced save
    let timer: number | undefined;
    const debouncedChange = () => {
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(onChange, 800);
    };
    form.addEventListener("input", debouncedChange);
    return () => {
      form.removeEventListener("input", debouncedChange);
      if (timer) clearTimeout(timer);
    };
  }, [saveDraft]);

  // Restore draft values into form fields
  useEffect(() => {
    if (draftValues && formRef.current) {
      const form = formRef.current;
      Object.entries(draftValues).forEach(([k, v]) => {
        if (k === "_ts") return;
        const el = form.querySelector(`[name="${k}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
        if (el && v) el.value = v;
      });
    }
  }, [draftValues]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      service: data.get("service"),
      message: data.get("message"),
    };
    if (!payload.name || !payload.email || !payload.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in name, email, and message.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      toast({
        title: "Message sent",
        description: "We'll scope your project within 48 hours — or your next sprint is free.",
      });
      form.reset();
      clearDraft(); // Clear draft on successful submit
    } catch {
      toast({
        title: "Saved locally",
        description: "Your message was recorded. We'll follow up at " + company.email,
      });
      form.reset();
      clearDraft();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="lg:hidden py-8">
      <div className="safe-px">
        {/* Channels — stacked tiles */}
        <h2 className="text-xl font-semibold tracking-tight">
          Start a conversation.
        </h2>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          A discovery call — problem deep-dive, technical assessment, feasibility check, and timeline estimate. You walk away with a scoped proposal in 48 hours.
        </p>

        <div className="mt-4 space-y-2">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-3 rounded-2xl m-card p-3.5 m-press"
              >
                <div className="h-9 w-9 rounded-xl bg-foreground text-background flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-muted-foreground">{c.label}</div>
                  <div className="text-xs font-medium truncate">{c.value}</div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Assurances — compact row */}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {assurances.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className="rounded-xl m-card-flat p-2.5 text-center">
                <Icon className="h-3.5 w-3.5 lime-text mx-auto mb-1" />
                <div className="text-[10px] font-semibold">{a.title}</div>
                <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{a.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="mt-5 rounded-2xl m-card p-4">
          {/* Draft restore prompt */}
          {draftValues && (
            <MobileDraftRestorePrompt onRestore={restoreDraft} onDismiss={dismissPrompt} />
          )}
          <form ref={formRef} onSubmit={onSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="m-name" className="text-xs">Name *</Label>
              <Input id="m-name" name="name" placeholder="Your name" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="m-email" className="text-xs">Work email *</Label>
              <Input id="m-email" name="email" type="email" placeholder="you@company.com" required className="h-11 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-company" className="text-xs">Company</Label>
                <Input id="m-company" name="company" placeholder="Company" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-service" className="text-xs">Need</Label>
                <Select name="service">
                  <SelectTrigger id="m-service" className="h-11 rounded-xl">
                    <SelectValue placeholder="Pick" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">AI Agent</SelectItem>
                    <SelectItem value="saas">AI SaaS Product</SelectItem>
                    <SelectItem value="automation">Workflow Automation</SelectItem>
                    <SelectItem value="llm">Custom LLM</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="m-message" className="text-xs">Project details *</Label>
              <Textarea
                id="m-message"
                name="message"
                placeholder="What are you trying to automate, build, or replace?"
                rows={5}
                required
                className="rounded-xl text-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 group h-12"
              size="lg"
            >
              {loading ? "Sending..." : "Send & book discovery call"}
              {!loading && (
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
            <p className="text-center text-[10px] text-muted-foreground">
              We reply within 24 hours. 48-hour proposal guarantee applies.
            </p>
            {/* Draft autosave indicator */}
            <MobileDraftSavedIndicator savedAt={savedAt} />
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE CAREERS CONTENT
   ═══════════════════════════════════════════════════════════════ */
export function MobileCareersContent() {
  return (
    <section className="lg:hidden py-8">
      <div className="safe-px space-y-3">
        {jobs.map((job, i) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease }}
            className="rounded-2xl m-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="rounded-full text-[10px]">
                {job.type.split("·")[0].trim()}
              </Badge>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold mb-2">{job.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{job.desc}</p>

            <div className="space-y-1 mb-3 text-[10px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3 w-3" /> {job.location}
              </div>
              <div className="text-muted-foreground">{job.pay}</div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-center h-10 rounded-full border border-border text-xs font-semibold m-press"
            >
              Apply now
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl m-card-flat p-4 text-center"
        >
          <p className="font-semibold text-sm">Don&apos;t see your role?</p>
          <p className="text-xs text-muted-foreground mt-1">
            We&apos;re always looking for exceptional AI-native builders.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-xs font-semibold m-press"
          >
            Reach out <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Server, ShieldCheck, GitBranch, Layers, Cpu, Bot, Database, Cloud } from "lucide-react";
import { CtaBand } from "@/components/site/shared";
import { coreValues, techStack, capabilities } from "@/lib/content";
import { LiveOps } from "@/components/site/stats";
import { MobileAboutContent } from "@/components/site/mobile-page-content";

const platformPillars = [
  { icon: Layers, title: "AI-native architecture", desc: "Intelligence at the foundation — not bolted onto legacy systems. Every workflow designed around model capabilities from day one." },
  { icon: GitBranch, title: "Full source ownership", desc: "100% of code, model weights, and infrastructure transfer to you. No vendor lock-in, no recurring license fees, no hostage data." },
  { icon: ShieldCheck, title: "Enterprise security", desc: "Private model deployment inside your VPC, red-teaming, and prompt-injection defense as defaults — not upgrades." },
  { icon: Server, title: "Production-grade infra", desc: "CI/CD for AI workloads, observability, and zero-downtime deploys. Hardened for scale from the first commit." },
];

// Platform stack layers — enterprise architecture diagram
const stackLayers = [
  { icon: Bot, title: "Applications", subtitle: "Agents · SaaS · Mobile", desc: "User-facing AI products" },
  { icon: Cpu, title: "Models", subtitle: "Custom LLMs · RAG · Fine-tuned", desc: "Domain-specific intelligence" },
  { icon: Database, title: "Data Layer", subtitle: "Pipelines · Vector DB · Enrichment", desc: "Proprietary knowledge" },
  { icon: Cloud, title: "Infrastructure", subtitle: "VPC · CI/CD · Observability", desc: "Enterprise-grade delivery" },
];

export default function AboutContent() {
  return (
    <>
      {/* Mobile-only about content */}
      <MobileAboutContent />

      {/* Story — desktop only */}
      <section className="hidden lg:block relative py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] lime-text mb-4">
                The company
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.08]">
                An AI-native engineering team
                <br />
                <span className="text-muted-foreground">not a consultancy that adopted AI.</span>
              </h2>
              <div className="mt-7 space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  AutoPlanet Corporation exists on a single belief:{" "}
                  <span className="text-foreground">every business process that involves reading, writing, deciding, or routing can be automated with AI.</span>
                </p>
                <p>
                  We ship production-ready AI systems — autonomous agents, custom LLMs, and full SaaS builds — engineered for enterprise scale. Clients receive complete source code, model weights, and IP. No vendor lock-in, no recurring license fees.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
                {capabilities.map((c) => (
                  <div key={c.label} className="bg-card p-4">
                    <div className="text-lg font-semibold tracking-tight">{c.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise platform architecture stack */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 lift">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Platform architecture
                    </p>
                    <p className="text-sm font-semibold mt-1">Full-stack AI delivery</p>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/60">v2026</span>
                </div>

                <div className="space-y-2.5">
                  {stackLayers.map((layer, i) => {
                    const Icon = layer.icon;
                    return (
                      <motion.div
                        key={layer.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="group relative flex items-center gap-4 rounded-xl border border-border bg-background p-4 hover:border-foreground/20 hover:shadow-md transition-all"
                      >
                        {/* layer index */}
                        <span className="font-mono text-[10px] text-muted-foreground/50 absolute top-2 right-3">
                          L{4 - i}
                        </span>
                        <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0 group-hover:bg-lime-600 transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-sm">{layer.title}</span>
                            <span className="text-[11px] text-muted-foreground">{layer.subtitle}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{layer.desc}</div>
                        </div>
                        {i < stackLayers.length - 1 && (
                          <div className="absolute left-[2.1rem] -bottom-2.5 h-2.5 w-px bg-border" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">100% deployable in your VPC</span>
                  <span className="font-mono lime-text">enterprise-ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform pillars — desktop only */}
      <section className="hidden lg:block relative py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] lime-text mb-3">
            Platform principles
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] mb-12">
            What we won&apos;t compromise on.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {platformPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group rounded-2xl border border-border bg-card p-7 lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0 group-hover:bg-lime-600 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values — desktop only */}
      <section className="hidden lg:block relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] lime-text mb-3">
                Core values
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
                How we operate.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {coreValues.map((v, i) => {
                const Icon = (Icons as Record<string, Icons.LucideIcon>)[v.icon] ?? Icons.Sparkles;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="grid grid-cols-12 gap-4 items-start py-5 border-b border-border last:border-0"
                  >
                    <div className="col-span-1 font-mono text-xs text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-1">
                      <Icon className="h-5 w-5 lime-text" />
                    </div>
                    <div className="col-span-10">
                      <h3 className="font-semibold mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack — desktop only */}
      <section className="hidden lg:block relative py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Models &amp; infrastructure we build on
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {techStack.map((t) => (
              <div key={t.name} className="bg-card p-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.vendor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LiveOps />

      <CtaBand />
    </>
  );
}

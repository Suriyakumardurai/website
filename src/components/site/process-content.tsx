"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Clock, ShieldCheck, FileText, GitBranch } from "lucide-react";
import { CtaBand } from "@/components/site/shared";
import { processSteps, pricingGuarantees } from "@/lib/content";
import { MobileProcessContent } from "@/components/site/mobile-page-content";

const artifacts = [
  { icon: FileText, label: "Architecture blueprint", note: "System diagram + tech selection" },
  { icon: GitBranch, label: "Feature breakdown", note: "Scoped milestones + acceptance criteria" },
  { icon: ShieldCheck, label: "Security review", note: "Threat model + data flow" },
];

export default function ProcessContent() {
  return (
    <>
      {/* Mobile-only process content */}
      <MobileProcessContent />

      {/* Desktop process content — original (lg+ only) */}
      <section className="hidden lg:block relative py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: timeline */}
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-lime-500 via-border to-transparent" />
                <div className="space-y-6">
                  {processSteps.map((step, i) => {
                    const Icon = (Icons as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Circle;
                    return (
                      <motion.div
                        key={step.num}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="relative flex gap-5"
                      >
                        <div className="relative shrink-0">
                          <div className="h-12 w-12 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-lime-500 text-foreground text-[10px] font-mono font-bold flex items-center justify-center border-2 border-background">
                            {step.num}
                          </span>
                        </div>
                        <div className="flex-1 rounded-2xl border border-border bg-card p-6 lift">
                          <div className="flex items-baseline justify-between gap-4 mb-2">
                            <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                            <span className="text-[11px] font-mono lime-text whitespace-nowrap">{step.detail}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: deliverables + guarantees */}
            <div className="lg:col-span-5 lg:pl-4">
              <div className="lg:sticky lg:top-28 space-y-5">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5">
                    What you receive
                  </p>
                  <div className="space-y-4">
                    {artifacts.map((a) => {
                      const Icon = a.icon;
                      return (
                        <div key={a.label} className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{a.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{a.note}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-lime-600/30 bg-lime-500/[0.06] p-6">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] lime-text mb-4">
                    Guarantees in writing
                  </p>
                  <div className="space-y-3">
                    {pricingGuarantees.map((g) => (
                      <div key={g} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <ShieldCheck className="h-4 w-4 lime-text mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{g}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
                  <Clock className="h-5 w-5 lime-text shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    First proposal in <span className="font-semibold text-foreground">48 hours</span> — or your next sprint is free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

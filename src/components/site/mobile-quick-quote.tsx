"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/content";
import { useSaveQuote } from "@/components/site/mobile-quote-history";

/**
 * Mobile-only Quick Quote Calculator
 *
 * An interactive 3-step cost estimator that lives on the pricing page.
 * Lets mobile users pick: capability → complexity → timeline → live estimate.
 *
 * Desktop (lg+) renders nothing.
 */

type Capability = { id: string; title: string; base: number };
type Complexity = { id: string; label: string; multiplier: number; desc: string };
type Timeline = { id: string; label: string; factor: number; note: string };

// Base prices (₹) per capability — derived from the published tier prices
const capabilities: Capability[] = [
  { id: "agent", title: "AI Agent", base: 45000 },
  { id: "llm", title: "Custom LLM", base: 75000 },
  { id: "saas", title: "AI SaaS Product", base: 120000 },
  { id: "automation", title: "Workflow Automation", base: 35000 },
  { id: "mobile", title: "Mobile App", base: 90000 },
  { id: "integrations", title: "AI Integration", base: 28000 },
];

const complexities: Complexity[] = [
  { id: "mvp", label: "MVP", multiplier: 1, desc: "Single feature, core scope" },
  { id: "standard", label: "Standard", multiplier: 1.6, desc: "Production-ready, multi-feature" },
  { id: "enterprise", label: "Enterprise", multiplier: 2.4, desc: "VPC, security hardening, SLA" },
];

const timelines: Timeline[] = [
  { id: "rush", label: "Rush (2 wks)", factor: 1.25, note: "Priority queue" },
  { id: "normal", label: "Standard (4-6 wks)", factor: 1, note: "Recommended" },
  { id: "flexible", label: "Flexible (8+ wks)", factor: 0.9, note: "Cost-optimized" },
];

function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(n);
}

export default function MobileQuickQuote() {
  const [step, setStep] = useState(0); // 0=capability, 1=complexity, 2=timeline, 3=result
  const [cap, setCap] = useState<string | null>(null);
  const [cmp, setCmp] = useState<string | null>(null);
  const [tl, setTl] = useState<string | null>(null);
  const saveQuote = useSaveQuote();

  const estimate = useMemo(() => {
    if (!cap || !cmp || !tl) return null;
    const c = capabilities.find((x) => x.id === cap);
    const cm = complexities.find((x) => x.id === cmp);
    const t = timelines.find((x) => x.id === tl);
    if (!c || !cm || !t) return null;
    const total = Math.round((c.base * cm.multiplier * t.factor) / 1000) * 1000;
    return {
      low: Math.round(total * 0.85 / 1000) * 1000,
      high: Math.round(total * 1.15 / 1000) * 1000,
      mid: total,
      capability: c.title,
      scope: cm.label,
      timeline: t.label,
    };
  }, [cap, cmp, tl]);

  // Save quote to history when reaching the result step
  useEffect(() => {
    if (step === 3 && estimate) {
      saveQuote({
        capability: estimate.capability,
        scope: estimate.scope,
        timeline: estimate.timeline,
        low: estimate.low,
        high: estimate.high,
        mid: estimate.mid,
      });
    }
  }, [step, estimate, saveQuote]);

  const reset = () => {
    setStep(0);
    setCap(null);
    setCmp(null);
    setTl(null);
  };

  const steps = ["Capability", "Scope", "Timeline", "Estimate"];
  const progressPct = (step / (steps.length - 1)) * 100;

  return (
    <section className="lg:hidden py-10 relative overflow-hidden">
      {/* Top decorative glow */}
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full bg-lime-400/10 blur-[80px] pointer-events-none"
      />

      <div className="safe-px relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-1">
              <Calculator className="inline h-3 w-3 mr-1" />
              Quick quote
            </p>
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              Estimate your build
              <br />
              <span className="text-muted-foreground">in 3 taps.</span>
            </h2>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-1 mb-5">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1 rounded-full transition-colors ${
                  i <= step ? "lime-bg" : "bg-border"
                }`}
              />
              <div
                className={`mt-1 text-[9px] font-mono uppercase tracking-wider transition-colors ${
                  i <= step ? "text-foreground" : "text-muted-foreground/60"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl m-card p-4 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 0: Capability */}
            {step === 0 && (
              <motion.div
                key="step-cap"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-semibold mb-3">What do you need?</p>
                <div className="grid grid-cols-2 gap-2">
                  {capabilities.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCap(c.id);
                        setStep(1);
                      }}
                      className={`text-left rounded-2xl p-3 m-press transition-all border ${
                        cap === c.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border m-card-flat hover:bg-muted/40"
                      }`}
                    >
                      <div className="font-semibold text-sm">{c.title}</div>
                      <div className={`text-[10px] mt-1 font-mono ${cap === c.id ? "text-background/60" : "text-muted-foreground"}`}>
                        from {formatINR(c.base)}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Complexity */}
            {step === 1 && (
              <motion.div
                key="step-cmp"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-semibold mb-1">How complex is the scope?</p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  You picked: <span className="text-foreground font-medium">{capabilities.find((c) => c.id === cap)?.title}</span>
                </p>
                <div className="space-y-2">
                  {complexities.map((cm) => (
                    <button
                      key={cm.id}
                      onClick={() => {
                        setCmp(cm.id);
                        setStep(2);
                      }}
                      className={`w-full text-left rounded-2xl p-3 m-press transition-all border flex items-center justify-between ${
                        cmp === cm.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border m-card-flat hover:bg-muted/40"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">{cm.label}</div>
                        <div className={`text-[10px] mt-0.5 ${cmp === cm.id ? "text-background/60" : "text-muted-foreground"}`}>
                          {cm.desc}
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] ${cmp === cm.id ? "text-lime-400" : "lime-text"}`}>
                        ×{cm.multiplier}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Timeline */}
            {step === 2 && (
              <motion.div
                key="step-tl"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-semibold mb-1">When do you need it?</p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  <span className="text-foreground font-medium">{complexities.find((c) => c.id === cmp)?.label}</span> build
                </p>
                <div className="space-y-2">
                  {timelines.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTl(t.id);
                        setStep(3);
                      }}
                      className={`w-full text-left rounded-2xl p-3 m-press transition-all border flex items-center justify-between ${
                        tl === t.id
                          ? "border-foreground bg-foreground text-background"
                          : t.id === "normal"
                          ? "border-lime-600/30 bg-lime-500/[0.06]"
                          : "border-border m-card-flat hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className={`h-3.5 w-3.5 ${tl === t.id ? "text-lime-400" : "lime-text"}`} />
                        <div>
                          <div className="font-semibold text-sm">{t.label}</div>
                          <div className={`text-[10px] mt-0.5 ${tl === t.id ? "text-background/60" : "text-muted-foreground"}`}>
                            {t.note}
                          </div>
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] ${tl === t.id ? "text-lime-400" : "lime-text"}`}>
                        ×{t.factor}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Result */}
            {step === 3 && estimate && (
              <motion.div
                key="step-result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
                    className="inline-flex h-12 w-12 rounded-full bg-lime-400 text-foreground items-center justify-center mb-3"
                  >
                    <Check className="h-6 w-6" strokeWidth={3} />
                  </motion.div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-1">
                    Estimated range
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-3xl font-semibold tracking-tight tabular-nums"
                  >
                    {formatINR(estimate.low)}
                    <span className="text-muted-foreground text-xl"> – </span>
                    {formatINR(estimate.high)}
                  </motion.div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    Fixed-price quote. Code, models, and IP ownership included.
                    Final number scoped within 48 hours of our first call.
                  </p>
                </div>

                {/* Breakdown */}
                <div className="mt-4 rounded-2xl m-card-flat p-3 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capability</span>
                    <span className="font-medium">{capabilities.find((c) => c.id === cap)?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scope</span>
                    <span className="font-medium">{complexities.find((c) => c.id === cmp)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="font-medium">{timelines.find((c) => c.id === tl)?.label}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Mid estimate</span>
                    <span className="font-semibold lime-text">{formatINR(estimate.mid)}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-4 space-y-2">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-1.5 h-11 rounded-full bg-foreground text-background text-sm font-semibold m-press"
                  >
                    <Sparkles className="h-4 w-4 text-lime-400" />
                    Get exact quote in 48 hrs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={reset}
                    className="w-full flex items-center justify-center gap-1.5 h-10 rounded-full m-chip text-foreground text-xs font-medium m-press"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Recalculate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back button (steps 1-2) */}
          {step > 0 && step < 3 && (
            <button
              onClick={() => setStep(step - 1)}
              className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors m-press"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Trust line */}
        <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
          <Check className="inline h-3 w-3 lime-text mr-1" />
          Fixed-price only · No hourly · No surprise invoices
        </p>
      </div>
    </section>
  );
}

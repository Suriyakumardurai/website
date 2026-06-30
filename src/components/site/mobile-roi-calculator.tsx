"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Clock,
  IndianRupee,
  ArrowRight,
  RotateCcw,
  Calculator,
  Zap,
  Check,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

/**
 * Mobile-only ROI Calculator.
 *
 * Estimates the annual savings from AI automation based on:
 * - Number of employees doing manual work
 * - Average hourly cost per employee
 * - Hours per week spent on automatable tasks
 * - Automation percentage (how much can be automated)
 *
 * Shows: annual savings, ROI percentage, payback period, and a breakdown.
 * Lives on the home page (mobile only) as a new section.
 *
 * Desktop (lg+) renders nothing.
 */

function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toFixed(0)}`;
}

export default function MobileROICalculator() {
  const [employees, setEmployees] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(500);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [automationPct, setAutomationPct] = useState(80);

  const results = useMemo(() => {
    const weeklyCost = employees * hoursPerWeek * hourlyCost;
    const annualCost = weeklyCost * 52;
    const automatable = annualCost * (automationPct / 100);
    const implementationCost = 150000; // average project cost
    const roi = Math.round((automatable / implementationCost) * 100);
    const paybackMonths = Math.max(1, Math.round((implementationCost / (automatable / 12)) * 10) / 10);
    return {
      annualSavings: automatable,
      annualCost,
      roi,
      paybackMonths,
      weeklyHoursSaved: employees * hoursPerWeek * (automationPct / 100),
    };
  }, [employees, hourlyCost, hoursPerWeek, automationPct]);

  const reset = () => {
    setEmployees(5);
    setHourlyCost(500);
    setHoursPerWeek(20);
    setAutomationPct(80);
  };

  return (
    <section className="lg:hidden py-12 relative overflow-hidden">
      {/* Top decorative glow */}
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full bg-lime-400/8 blur-[80px] pointer-events-none"
      />

      <div className="safe-px relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
              <Calculator className="inline h-3 w-3 mr-1" />
              ROI estimator
            </p>
            <h2 className="text-2xl font-semibold tracking-tight leading-tight">
              What could AI save you?
            </h2>
          </div>
          <button
            onClick={reset}
            aria-label="Reset calculator"
            className="m-tap m-press h-9 w-9 rounded-full m-chip flex items-center justify-center shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="rounded-3xl m-card p-4 space-y-4">
          {/* Employees */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                Employees doing manual work
              </label>
              <span className="text-sm font-bold lime-text tabular-nums">{employees}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-foreground/10 accent-lime-500"
            />
          </div>

          {/* Hourly cost */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
                Avg hourly cost per employee
              </label>
              <span className="text-sm font-bold lime-text tabular-nums">₹{hourlyCost}</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-foreground/10 accent-lime-500"
            />
          </div>

          {/* Hours per week */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Hours/week on automatable tasks
              </label>
              <span className="text-sm font-bold lime-text tabular-nums">{hoursPerWeek}h</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-foreground/10 accent-lime-500"
            />
          </div>

          {/* Automation percentage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                Automation potential
              </label>
              <span className="text-sm font-bold lime-text tabular-nums">{automationPct}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={automationPct}
              onChange={(e) => setAutomationPct(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-foreground/10 accent-lime-500"
            />
          </div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 rounded-3xl bg-foreground text-background p-5 relative overflow-hidden"
        >
          <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-lime-400/15 blur-3xl" />

          {/* Annual savings — big number */}
          <div className="relative text-center mb-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-background/60 mb-2">
              Estimated annual savings
            </p>
            <motion.div
              key={results.annualSavings}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="text-4xl font-bold lime-text tabular-nums leading-none"
            >
              {formatINR(results.annualSavings)}
            </motion.div>
            <p className="text-[10px] text-background/50 mt-1.5">
              / year · after {results.paybackMonths} month payback
            </p>
          </div>

          {/* Stats grid */}
          <div className="relative grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-xl bg-background/8 p-2.5 text-center">
              <TrendingUp className="h-3.5 w-3.5 text-lime-400 mx-auto mb-1" />
              <div className="text-sm font-bold tabular-nums">{results.roi}%</div>
              <div className="text-[8px] text-background/50 uppercase tracking-wider">ROI</div>
            </div>
            <div className="rounded-xl bg-background/8 p-2.5 text-center">
              <Clock className="h-3.5 w-3.5 text-lime-400 mx-auto mb-1" />
              <div className="text-sm font-bold tabular-nums">{results.paybackMonths}mo</div>
              <div className="text-[8px] text-background/50 uppercase tracking-wider">Payback</div>
            </div>
            <div className="rounded-xl bg-background/8 p-2.5 text-center">
              <Briefcase className="h-3.5 w-3.5 text-lime-400 mx-auto mb-1" />
              <div className="text-sm font-bold tabular-nums">{Math.round(results.weeklyHoursSaved)}h</div>
              <div className="text-[8px] text-background/50 uppercase tracking-wider">Saved/wk</div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="relative rounded-xl bg-background/5 p-3 space-y-1.5 text-[10px] mb-4">
            <div className="flex justify-between">
              <span className="text-background/60">Current annual cost</span>
              <span className="font-medium tabular-nums">{formatINR(results.annualCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-background/60">Automatable portion ({automationPct}%)</span>
              <span className="font-medium tabular-nums lime-text">{formatINR(results.annualSavings)}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-background/10">
              <span className="text-background/60">Implementation cost (est.)</span>
              <span className="font-medium tabular-nums">₹1.5L</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="relative flex items-center justify-center gap-1.5 h-11 rounded-full bg-lime-400 text-foreground text-sm font-semibold m-press"
          >
            <Check className="h-4 w-4" />
            Claim these savings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-3 text-center text-[10px] text-muted-foreground/60 leading-relaxed">
          Estimates based on industry averages. Actual savings vary by use case.
          <br />
          Get a scoped proposal within 48 hours.
        </p>
      </div>
    </section>
  );
}

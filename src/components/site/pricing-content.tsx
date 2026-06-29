"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Star, Zap, ArrowRight, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/site/tilt-card";
import { CtaBand } from "@/components/site/shared";
import { Reveal, RevealHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { tiers, pricingGuarantees } from "@/lib/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function PricingContent() {
  return (
    <>
      {/* Tier cards */}
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
            {tiers.map((tier) => (
              <StaggerItem key={tier.name} className={tier.highlight ? "lg:-mt-4 lg:mb-4" : ""}>
                <TiltCard
                  intensity={tier.highlight ? 5 : 3}
                  className={`h-full rounded-2xl border p-7 sm:p-8 relative overflow-hidden ${
                    tier.highlight
                      ? "border-foreground bg-foreground text-background shadow-xl"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {/* hover glow */}
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-lime-400/0 group-hover:bg-lime-400/15 blur-3xl transition-all duration-500" />
                  {tier.badge && (
                    <div style={{ transform: "translateZ(36px)" }} className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-3 py-1 text-[11px] font-semibold text-foreground mb-5">
                      <Star className="h-3 w-3 fill-foreground" />
                      {tier.badge}
                    </div>
                  )}
                  <div style={{ transform: "translateZ(28px)" }}>
                    <h3 className={`text-lg font-semibold ${tier.highlight ? "text-background" : ""}`}>{tier.name}</h3>
                    <p className={`text-sm mt-1 ${tier.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                      {tier.tagline}
                    </p>
                  </div>
                  <div style={{ transform: "translateZ(24px)" }} className="mt-6 flex items-baseline gap-2">
                    <span className={`text-4xl font-semibold tracking-tight ${tier.highlight ? "text-lime-400" : ""}`}>
                      {tier.price}
                    </span>
                  </div>
                  <p style={{ transform: "translateZ(20px)" }} className={`text-xs mt-1 ${tier.highlight ? "text-background/50" : "text-muted-foreground"}`}>
                    {tier.priceNote} · {tier.timeline}
                  </p>
                  <p style={{ transform: "translateZ(18px)" }} className={`mt-5 text-sm leading-relaxed ${tier.highlight ? "text-background/80" : "text-muted-foreground"}`}>
                    {tier.for}
                  </p>
                  <div style={{ transform: "translateZ(14px)" }} className="mt-6 space-y-2.5">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlight ? "text-lime-400" : "lime-text"}`} />
                        <span className={tier.highlight ? "text-background/90" : "text-foreground/90"}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    className={`mt-7 w-full rounded-full h-11 ${
                      tier.highlight
                        ? "bg-lime-400 text-foreground hover:bg-lime-300"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    <Link href="/contact">
                      Start with {tier.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* guarantees */}
          <StaggerGroup className="mt-12 grid sm:grid-cols-3 gap-4">
            {pricingGuarantees.map((g, i) => {
              const Icon = [ShieldCheck, Zap, Check][i] ?? Check;
              return (
                <StaggerItem key={g}>
                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 h-full lift">
                    <div className="h-9 w-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{g}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Comparison table */}
      <section className="relative py-14 sm:py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] lime-text mb-3">
              Compare tiers
            </p>
            <RevealHeading className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
              What&apos;s included, side by side.
            </RevealHeading>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 sm:p-5 font-medium text-muted-foreground">Feature</th>
                    <th className="text-center p-4 sm:p-5 font-semibold">Quick Build</th>
                    <th className="text-center p-4 sm:p-5 font-semibold bg-foreground/[0.03]">
                      <span className="inline-flex items-center gap-1.5">
                        Full Product
                        <span className="rounded-full bg-lime-500 px-1.5 py-0.5 text-[9px] font-mono text-foreground">POPULAR</span>
                      </span>
                    </th>
                    <th className="text-center p-4 sm:p-5 font-semibold">Ongoing Partner</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                      <td className="p-4 sm:p-5 text-foreground/90">{row.feature}</td>
                      <td className="p-4 sm:p-5 text-center">
                        <Cell value={row.quick} />
                      </td>
                      <td className="p-4 sm:p-5 text-center bg-foreground/[0.03]">
                        <Cell value={row.full} />
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        <Cell value={row.partner} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-lime-600/30 bg-lime-500/[0.06] p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 lime-text shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Not sure which tier fits?</p>
                <p className="text-sm text-muted-foreground mt-0.5">Book a free discovery call — we&apos;ll recommend the right scope within 48 hours.</p>
              </div>
            </div>
            <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0">
              <Link href="/contact">
                Book a call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-xs font-mono text-foreground/80">{value}</span>;
  }
  if (value) {
    return <Check className="h-4 w-4 lime-text mx-auto" />;
  }
  return <span className="text-muted-foreground/40">—</span>;
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/site/tilt-card";
import { Reveal, RevealHeading, StaggerGroup, StaggerItem, Eyebrow } from "@/components/site/reveal";
import { services, processSteps, tiers, testimonials, techStack } from "@/lib/content";

/* ── Services preview: editorial bento ── */
export function ServicesPreview() {
  const featured = services[0];
  const rest = services.slice(1, 7);
  const FIcon = (Icons as Record<string, Icons.LucideIcon>)[featured.icon] ?? Icons.Box;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Eyebrow>Capabilities</Eyebrow>
            <RevealHeading className="display text-[clamp(1.75rem,3.2vw,2.6rem)] mt-4">
              Fourteen ways we put
              <br />
              <span className="text-muted-foreground">AI to work.</span>
            </RevealHeading>
          </div>
          <Reveal delay={0.1}>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium hover:lime-text transition-colors group underline-grow">
              All capabilities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Large feature card */}
          <Reveal delay={0.05} className="lg:col-span-5">
            <TiltCard intensity={4} className="h-full rounded-2xl border border-border bg-card p-8 lift shadow-premium group">
              <div style={{ transform: "translateZ(36px)" }} className="flex items-start justify-between mb-8">
                <div className="h-12 w-12 rounded-xl bg-foreground text-background flex items-center justify-center group-hover:bg-lime-600 transition-colors duration-300">
                  <FIcon className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs text-muted-foreground/70">{featured.num} / 14</span>
              </div>
              <h3 style={{ transform: "translateZ(28px)" }} className="text-2xl font-semibold tracking-tight mb-3">
                {featured.title}
              </h3>
              <p style={{ transform: "translateZ(20px)" }} className="text-muted-foreground leading-relaxed mb-6">
                {featured.desc}
              </p>
              <ul style={{ transform: "translateZ(14px)" }} className="space-y-2">
                {featured.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icons.Check className="h-4 w-4 lime-text mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>

          {/* Grid of 6 compact */}
          <StaggerGroup className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {rest.map((s) => {
              const Icon = (Icons as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Box;
              return (
                <StaggerItem key={s.id}>
                  <div className="group rounded-xl border border-border bg-card p-5 lift h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-9 w-9 rounded-lg bg-foreground text-background flex items-center justify-center group-hover:bg-lime-600 transition-colors duration-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground/60">{s.num}</span>
                    </div>
                    <h3 className="font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{s.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ── Process preview: horizontal strip ── */
export function ProcessPreview() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Eyebrow>How we ship</Eyebrow>
            <RevealHeading className="display text-[clamp(1.75rem,3.2vw,2.6rem)] mt-4">
              A process engineered
              <br />
              <span className="text-muted-foreground">for speed without compromise.</span>
            </RevealHeading>
          </div>
          <Reveal delay={0.1}>
            <Link href="/process" className="inline-flex items-center gap-2 text-sm font-medium hover:lime-text transition-colors group underline-grow">
              Full process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {processSteps.map((step) => {
            const Icon = (Icons as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Circle;
            return (
              <StaggerItem key={step.num}>
                <div className="bg-card p-6 group hover:bg-muted/40 transition-colors h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center group-hover:bg-lime-600 transition-colors duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground/60">{step.num}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-[11px] font-mono lime-text">{step.detail}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ── Pricing preview ── */
export function PricingPreview() {
  return (
    <section className="relative py-16 sm:py-24 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-lime" />
            <span className="eyebrow lime-text">Fixed-price only</span>
            <span className="h-px w-8 bg-lime" />
          </div>
          <RevealHeading className="display text-[clamp(1.75rem,3.2vw,2.6rem)]">
            Never hourly.
            <br />
            <span className="text-muted-foreground">Never surprise invoices.</span>
          </RevealHeading>
        </Reveal>

        <StaggerGroup className="grid lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name} className={tier.highlight ? "lg:-mt-3 lg:mb-3" : ""}>
              <div
                className={`group rounded-2xl border p-7 lift h-full ${
                  tier.highlight
                    ? "border-foreground bg-foreground text-background shadow-premium-lg"
                    : "border-border bg-card text-foreground shadow-premium"
                }`}
              >
                {tier.badge && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-3 py-1 text-[11px] font-semibold text-foreground mb-5">
                    {tier.badge}
                  </div>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className={`text-sm mt-1 ${tier.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                  {tier.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`text-4xl font-semibold tracking-tight tnum ${tier.highlight ? "text-lime-400" : ""}`}>
                    {tier.price}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${tier.highlight ? "text-background/50" : "text-muted-foreground"}`}>
                  {tier.priceNote} · {tier.timeline}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icons.Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlight ? "text-lime-400" : "lime-text"}`} />
                      <span className={tier.highlight ? "text-background/90" : "text-foreground/90"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Button asChild className="shine-btn rounded-full bg-foreground text-background hover:bg-foreground/90 h-12 px-7 group">
            <Link href="/pricing">
              See full pricing <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
export function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Eyebrow>In production</Eyebrow>
            <RevealHeading className="display text-[clamp(1.6rem,3vw,2.4rem)] mt-4">
              Teams who refused
              <br />
              <span className="text-muted-foreground">to stay slow.</span>
            </RevealHeading>
          </div>
          <StaggerGroup className="lg:col-span-8 space-y-5">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="rounded-2xl border border-border bg-card p-7 lift shadow-premium">
                  <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ── Tech stack strip ── */
export function TechStrip() {
  return (
    <section className="relative py-12 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <p className="eyebrow text-muted-foreground">Frontier models &amp; infrastructure</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {techStack.map((t) => (
                <span key={t.name} className="text-sm font-medium text-foreground/80">
                  {t.name}
                  <span className="text-muted-foreground/60 font-normal"> · {t.vendor}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, ArrowUpRight, Star, Quote } from "lucide-react";
import { services, processSteps, tiers, testimonials, techStack, stats, liveStats } from "@/lib/content";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import MobileShare from "@/components/site/mobile-share";
import MobileSwipeTestimonials from "@/components/site/mobile-swipe-testimonials";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Mobile marquee (denser, smaller) ── */
export function MobileMarquee() {
  const items = [
    "Autonomous Agents",
    "Custom LLMs",
    "RAG Pipelines",
    "Workflow Automation",
    "AI SaaS",
    "Computer Vision",
    "VPC Deploy",
    "MLOps",
  ];
  return (
    <div className="lg:hidden relative border-y border-border bg-foreground/95 py-2.5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <div key={`${dup}-${i}`} className="flex items-center">
                <span className="px-4 text-[10px] font-mono uppercase tracking-[0.22em] text-background/80">
                  {item}
                </span>
                <span className="text-lime-500 text-[10px]">/</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile tech strip ── */
export function MobileTechStrip() {
  return (
    <section className="lg:hidden py-6 border-b border-border">
      <p className="safe-px text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-3">
        Frontier models &amp; infra
      </p>
      <div className="snap-rail no-scrollbar overflow-x-auto flex gap-2 safe-px">
        {techStack.map((t) => (
          <span
            key={t.name}
            className="shrink-0 rounded-full m-chip px-3 py-1.5 text-xs font-medium text-foreground/85"
          >
            {t.name}
            <span className="text-muted-foreground/70 font-normal"> · {t.vendor}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── Mobile stats — bento grid with count-up ── */
export function MobileStats() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <section className="lg:hidden py-12">
      <div ref={ref} className="safe-px">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-2">
          Measured outcomes
        </p>
        <h2 className="text-2xl font-semibold tracking-tight leading-tight">
          We measure everything.
          <br />
          <span className="text-muted-foreground">Slogans don&apos;t ship AI.</span>
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {stats.slice(0, 6).map((s, i) => (
            <MobileStatCell key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileStatCell({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[number];
  index: number;
  inView: boolean;
}) {
  const display = useCountUp(stat.value, {
    decimals: stat.decimals ?? 0,
    start: inView,
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
      className={`rounded-2xl p-4 m-card-flat ${
        index === 0 ? "col-span-2 bg-foreground text-background border-foreground" : ""
      }`}
    >
      <div className={`text-2xl font-semibold tracking-tight tabular-nums ${index === 0 ? "text-lime-400" : ""}`}>
        {stat.prefix}
        {display}
        <span className={index === 0 ? "text-lime-400" : "lime-text"}>{stat.suffix}</span>
      </div>
      <div className={`mt-1 text-[11px] leading-snug ${index === 0 ? "text-background/70" : "text-muted-foreground"}`}>
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ── Mobile Live Ops — full-bleed dark band with 2x2 grid ── */
export function MobileLiveOps() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="lg:hidden relative py-12 bg-foreground text-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div ref={ref} className="relative safe-px">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-lime-400 mb-1.5">
              Live operations
            </p>
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              Autonomous systems,
              <br />
              <span className="text-background/60">running 24/7.</span>
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] text-lime-400 font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 m-live" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
            </span>
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {liveStats.map((s, i) => (
            <MobileLiveCounter key={s.label} stat={s} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileLiveCounter({
  stat,
  inView,
  index,
}: {
  stat: (typeof liveStats)[number];
  inView: boolean;
  index: number;
}) {
  const base = Math.floor(stat.value * 0.92);
  const display = useCountUp(stat.value, { start: inView });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06, ease }}
      className="rounded-2xl border border-background/12 bg-background/[0.04] p-3.5 backdrop-blur"
    >
      <div className="text-xl font-semibold tabular-nums text-lime-400">
        {Number(display) > base ? Number(display).toLocaleString() : base.toLocaleString()}
      </div>
      <div className="mt-1 text-[11px] text-background/60 leading-snug">{stat.label}</div>
    </motion.div>
  );
}

/* ── Mobile Services Preview — vertical stack with peek-card ── */
export function MobileServicesPreview() {
  const featured = services[0];
  const rest = services.slice(1, 6);
  const FIcon = (Icons as Record<string, Icons.LucideIcon>)[featured.icon] ?? Icons.Box;

  return (
    <section className="lg:hidden py-12">
      <div className="safe-px">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-2">
          Capabilities
        </p>
        <div className="flex items-end justify-between gap-3 mb-5">
          <h2 className="text-2xl font-semibold tracking-tight leading-tight">
            Fourteen ways
            <br />
            <span className="text-muted-foreground">we put AI to work.</span>
          </h2>
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-1 text-xs font-medium lime-text m-press"
          >
            All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Feature card — full-bleed-style */}
      <div className="safe-px">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease }}
          className="rounded-3xl bg-foreground text-background p-6 relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-lime-400/15 blur-3xl"
          />
          <div className="relative flex items-start justify-between mb-5">
            <div className="h-11 w-11 rounded-xl bg-lime-400 text-foreground flex items-center justify-center">
              <FIcon className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] text-background/60">{featured.num} / 14</span>
          </div>
          <h3 className="relative text-xl font-semibold tracking-tight mb-2">{featured.title}</h3>
          <p className="relative text-sm text-background/70 leading-relaxed mb-4">{featured.desc}</p>
          <ul className="relative space-y-1.5">
            {featured.points.slice(0, 3).map((p) => (
              <li key={p} className="flex items-start gap-2 text-xs text-background/85">
                <Icons.Check className="h-3.5 w-3.5 text-lime-400 mt-0.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Rest — swipe rail of compact cards */}
      <div className="snap-rail no-scrollbar overflow-x-auto flex gap-2.5 safe-px mt-3 pb-1">
        {rest.map((s, i) => {
          const Icon = (Icons as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Box;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              className="shrink-0 w-[200px] rounded-2xl m-card p-4 m-press"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/60">{s.num}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{s.desc}</p>
            </motion.div>
          );
        })}
        {/* trailing link card */}
        <Link
          href="/services"
          className="shrink-0 w-[140px] rounded-2xl m-card-flat p-4 flex flex-col justify-between m-press"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            +8 more
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}

/* ── Mobile Process Preview — vertical timeline ── */
export function MobileProcessPreview() {
  return (
    <section className="lg:hidden py-12 bg-muted/30">
      <div className="safe-px">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-2">
          How we ship
        </p>
        <div className="flex items-end justify-between gap-3 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight leading-tight">
            A process built
            <br />
            <span className="text-muted-foreground">for speed.</span>
          </h2>
          <Link
            href="/process"
            className="shrink-0 inline-flex items-center gap-1 text-xs font-medium lime-text m-press"
          >
            Full
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="relative">
          {/* vertical timeline line */}
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
                    <div className="h-11 w-11 rounded-2xl bg-foreground text-background flex items-center justify-center">
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
      </div>
    </section>
  );
}

/* ── Mobile Pricing Preview — single highlight + horizontal peek ── */
export function MobilePricingPreview() {
  const featured = tiers.find((t) => t.highlight) ?? tiers[0];
  return (
    <section className="lg:hidden py-12 bg-muted/30">
      <div className="safe-px">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-px w-6 bg-lime" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text">
            Fixed-price only
          </span>
          <span className="h-px w-6 bg-lime" />
        </div>
        <h2 className="text-center text-2xl font-semibold tracking-tight leading-tight">
          Never hourly.
          <br />
          <span className="text-muted-foreground">Never surprise invoices.</span>
        </h2>
      </div>

      {/* Featured tier card */}
      <div className="safe-px mt-6">
        <div className="m-conic-glow rounded-3xl bg-foreground text-background p-6 relative overflow-hidden shadow-xl">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-lime-400/20 blur-3xl"
          />
          {featured.badge && (
            <div className="relative inline-flex items-center gap-1 rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-semibold text-foreground mb-3">
              <Star className="h-3 w-3 fill-foreground" />
              {featured.badge}
            </div>
          )}
          <h3 className="relative text-lg font-semibold">{featured.name}</h3>
          <p className="relative text-xs text-background/60 mt-0.5">{featured.tagline}</p>
          <div className="relative mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-lime-400">{featured.price}</span>
          </div>
          <p className="relative text-[11px] text-background/50 mt-1">
            {featured.priceNote} · {featured.timeline}
          </p>
          <ul className="relative mt-4 space-y-1.5">
            {featured.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs">
                <Icons.Check className="h-3.5 w-3.5 text-lime-400 mt-0.5 shrink-0" />
                <span className="text-background/90">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            className="relative mt-5 flex items-center justify-center gap-1.5 h-11 rounded-full bg-lime-400 text-foreground font-semibold text-sm m-press"
          >
            See full pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Other tiers — peek rail */}
      <div className="snap-rail no-scrollbar overflow-x-auto flex gap-2.5 safe-px mt-3 pb-1">
        {tiers
          .filter((t) => !t.highlight)
          .map((t) => (
            <div
              key={t.name}
              className="shrink-0 w-[180px] rounded-2xl m-card p-4"
            >
              <h3 className="font-semibold text-sm">{t.name}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t.tagline}</p>
              <div className="mt-3 text-lg font-semibold tracking-tight">{t.price}</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t.timeline}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

/* ── Mobile Testimonials — now uses swipe carousel ── */
export function MobileTestimonials() {
  return <MobileSwipeTestimonials />;
}

/* ── Mobile CTA Band — full-bleed dark ── */
export function MobileCtaBand() {
  return (
    <section className="lg:hidden relative py-14 bg-foreground text-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-lime-400/15 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative safe-px text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-lime-400 mb-3">
          Start the conversation
        </p>
        <h2 className="text-3xl font-semibold tracking-tight leading-[1.05]">
          See what 10x
          <br />
          feels like.
        </h2>
        <p className="mt-4 text-sm text-background/70 leading-relaxed max-w-xs mx-auto">
          Production-ready AI in weeks. 100% code ownership. A scoped proposal within 48 hours —
          or your next sprint is free.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/contact"
            className="m-press flex items-center justify-center gap-1.5 h-12 rounded-full bg-lime-400 text-foreground font-semibold text-sm"
          >
            Book a discovery call
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="m-press flex items-center justify-center gap-1.5 h-12 rounded-full border border-background/30 text-background font-semibold text-sm"
          >
            View pricing
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

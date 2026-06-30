"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { capabilities, company } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Mobile-only immersive hero.
 *
 * - Stacked vertical layout, full-bleed editorial.
 * - Sticky fade as the user scrolls (parallax on the headline).
 * - Live status pill, capability ticker, dual CTA, trust microcopy.
 * - Capability panel becomes a swipeable rail instead of a static grid.
 *
 * Desktop (lg+) renders nothing — the original `Hero` takes over.
 */
export default function MobileHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="lg:hidden relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Top fade for legibility over the 3D bg */}
      <div className="absolute inset-0 z-0 pointer-events-none m-hero-fade" />

      {/* Top floating status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="relative z-10 pt-24 safe-px"
      >
        <div className="inline-flex items-center gap-2 rounded-full m-glass px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-500 m-live" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-600" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/80">
            Enterprise AI · production-ready
          </span>
        </div>
      </motion.div>

      {/* Headline block */}
      <motion.div
        style={{ y: headlineY, opacity: headlineOpacity }}
        className="relative z-10 px-5 mt-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease }}
          className="display text-[clamp(2.4rem,11vw,3.6rem)] leading-[0.95]"
        >
          Enterprise AI
          <br />
          <span className="lime-text">engineered</span>
          <br />
          to ship.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease }}
          className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-[88%]"
        >
          We design and deploy{" "}
          <span className="text-foreground font-medium">production-grade AI systems</span> —
          autonomous agents, custom LLMs, and full SaaS builds.
        </motion.p>

        {/* Trust microcopy — pill cluster */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-5 flex flex-wrap gap-1.5"
        >
          {[
            { icon: ShieldCheck, label: "99.9% SLA" },
            { icon: Zap, label: "VPC-ready" },
            { icon: Sparkles, label: "40+ shipped" },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <span
                key={t.label}
                className="inline-flex items-center gap-1 rounded-full m-chip px-2.5 py-1 text-[10px] font-medium text-foreground/80"
              >
                <Icon className="h-3 w-3 lime-text" />
                {t.label}
              </span>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Capability swipe rail (replaces desktop side panel) */}
      <motion.div
        style={{ y: panelY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease }}
        className="relative z-10 mt-7"
      >
        <div className="flex items-center justify-between safe-px mb-2.5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Platform overview
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono lime-text">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-500 m-live" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-600" />
            </span>
            LIVE
          </span>
        </div>
        <div className="snap-rail no-scrollbar overflow-x-auto flex gap-2.5 safe-px pb-1 m-rail-fade">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.4, ease }}
              className="shrink-0 w-[150px] rounded-2xl m-card p-3.5"
            >
              <div className="text-base font-semibold tracking-tight tnum">{c.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{c.label}</div>
            </motion.div>
          ))}
          {/* trailing card with link */}
          <Link
            href="/services"
            className="shrink-0 w-[150px] rounded-2xl bg-foreground text-background p-3.5 flex flex-col justify-between m-press"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-background/60">
              All capabilities
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
              View work
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
        {/* swipe hint */}
        <div className="safe-px mt-2 flex justify-end">
          <span className="m-swipe-hint inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
            swipe
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </motion.div>

      {/* Sticky CTA pair */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease }}
        className="relative z-10 mt-7 safe-px"
      >
        <div className="grid grid-cols-5 gap-2">
          <Link
            href="/contact"
            className="col-span-3 m-press m-ripple flex items-center justify-center gap-1.5 h-12 rounded-full bg-foreground text-background text-sm font-semibold shine-btn"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="col-span-2 m-press m-ripple flex items-center justify-center gap-1.5 h-12 rounded-full m-glass text-foreground text-sm font-semibold"
          >
            Explore
          </Link>
        </div>
        <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
          {company.tagline2}
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 mt-6 mb-3 flex flex-col items-center gap-1 text-muted-foreground/50"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

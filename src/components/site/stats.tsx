"use client";

import { motion } from "framer-motion";
import { stats, liveStats } from "@/lib/content";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import { Reveal, RevealHeading } from "@/components/site/reveal";
import { MobileMarquee, MobileStats, MobileLiveOps } from "@/components/site/mobile-home-sections";

export function Marquee() {
  const items = [
    "Autonomous Agents",
    "Custom LLMs",
    "RAG Pipelines",
    "Workflow Automation",
    "Enterprise AI SaaS",
    "Computer Vision",
    "Predictive Analytics",
    "VPC Deployment",
    "Data Sovereignty",
    "MLOps",
  ];
  return (
    <>
      {/* Mobile-only marquee */}
      <MobileMarquee />

      {/* Desktop marquee — original (lg+ only) */}
      <div className="hidden lg:block relative border-y border-border bg-foreground/95 py-3.5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <div key={`${dup}-${i}`} className="flex items-center">
                <span className="px-6 text-[11px] font-mono uppercase tracking-[0.25em] text-background/80">
                  {item}
                </span>
                <span className="text-lime-500 text-xs">/</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);

  return (
    <>
      {/* Mobile-only stats */}
      <MobileStats />

      {/* Desktop stats — original (lg+ only) */}
      <section className="hidden lg:block relative py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-8">
          <Reveal className="lg:col-span-7">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] lime-text mb-3">
              Measured outcomes
            </p>
            <RevealHeading className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em]">
              We measure everything.
              <br />
              <span className="text-muted-foreground">Slogans don&apos;t ship AI.</span>
            </RevealHeading>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-muted-foreground leading-relaxed">
              Every engagement is tracked against accuracy, throughput, and uptime SLAs.
              These are the numbers our systems deliver in production — not projections.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {stats.map((s, i) => (
            <StatCell key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

function StatCell({
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="bg-card p-6 hover:bg-muted/40 transition-colors"
    >
      <div className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">
        {stat.prefix}
        {display}
        <span className="lime-text">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function LiveOps() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <>
      {/* Mobile-only live ops */}
      <MobileLiveOps />

      {/* Desktop live ops — original (lg+ only) */}
      <section className="hidden lg:block relative py-20 sm:py-24 bg-foreground text-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-lime-400 mb-3">
              Live operations
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em]">
              Autonomous systems,
              <br />
              <span className="text-background/60">running around the clock.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-lime-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-lime-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Live · aggregate across deployments
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {liveStats.map((s, i) => (
            <LiveCounter key={s.label} stat={s} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

function LiveCounter({
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl border border-background/12 bg-background/[0.04] p-6 backdrop-blur"
    >
      <div className="text-xl sm:text-2xl font-semibold tabular-nums text-lime-400">
        {Number(display) > base ? Number(display).toLocaleString() : base.toLocaleString()}
      </div>
      <div className="mt-2 text-sm text-background/60">{stat.label}</div>
    </motion.div>
  );
}

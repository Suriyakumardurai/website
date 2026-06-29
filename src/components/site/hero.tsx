"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/site/magnetic-button";
import { capabilities, company } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[94vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* legibility gradient over the global 3D background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(255,255,255,0.5) 0%, transparent 75%), linear-gradient(to right, rgba(255,255,255,0.6) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: editorial copy */}
          <motion.div style={{ y: contentY, opacity: contentOpacity }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-lime-500" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-600" />
              </span>
              Enterprise AI automation · production-ready
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-6 display text-[clamp(2rem,4.2vw,3.5rem)]"
            >
              Enterprise AI
              <br />
              <span className="lime-text">engineered to ship.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              We design and deploy <span className="text-foreground font-medium">production-grade AI systems</span> —
              autonomous agents, custom LLMs, and full SaaS builds — with{" "}
              <span className="text-foreground font-medium">100% code ownership</span> and zero vendor lock-in.
            </motion.p>

            {/* trust bar — enterprise density */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                99.9% uptime SLA
              </span>
              <span className="hidden sm:inline text-border">|</span>
              <span>VPC-ready deployment</span>
              <span className="hidden sm:inline text-border">|</span>
              <span>SOC 2 aligned</span>
              <span className="hidden sm:inline text-border">|</span>
              <span>40+ AI systems shipped</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton>
                <Button asChild size="lg" className="shine-btn rounded-full bg-foreground text-background hover:bg-foreground/90 group h-12 px-7">
                  <Link href="/contact">
                    Start a project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/15 bg-white/60 backdrop-blur hover:bg-white h-12 px-7">
                  <Link href="/services">
                    Explore capabilities
                    <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: enterprise capability panel */}
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="lg:col-span-5 lg:pl-6"
          >
            <div className="glass-strong hairline rounded-2xl p-5 sm:p-6 shadow-premium">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="eyebrow text-muted-foreground">Platform overview</p>
                  <p className="text-xs font-semibold mt-1.5">Production AI, by default</p>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-mono lime-text">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-lime-500" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-600" />
                  </span>
                  LIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">
                {capabilities.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease }}
                    className="bg-card p-3.5"
                  >
                    <div className="text-base font-semibold tracking-tight tnum">{c.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{c.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Trusted by enterprise teams</span>
                <Link href="/services" className="font-medium underline-grow hover:lime-text transition-colors inline-flex items-center gap-1">
                  View work <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* tagline strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 lg:mt-20 flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60"
        >
          <div className="h-px flex-1 bg-border" />
          <span>{company.tagline2}</span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

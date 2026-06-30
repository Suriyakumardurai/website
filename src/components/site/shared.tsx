"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { MobileCtaBand } from "@/components/site/mobile-home-sections";

export function CtaBand() {
  return (
    <>
      {/* Mobile-only CTA band */}
      <MobileCtaBand />

      {/* Desktop CTA band — original (lg+ only) */}
      <section className="hidden lg:block relative py-16 sm:py-24 bg-foreground text-background overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* animated lime glow that pulses */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full bg-lime-400/15 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* floating accent dots */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 left-[15%] h-1.5 w-1.5 rounded-full bg-lime-400"
        animate={{ y: [0, -16, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/4 right-[18%] h-1 w-1 rounded-full bg-lime-400"
        animate={{ y: [0, 12, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 right-[10%] h-2 w-2 rounded-full border border-lime-400/50"
        animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-lime-400 mb-5">
            Start the conversation
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] break-words">
            See what 10x feels like.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 text-base sm:text-lg text-background/70 max-w-xl mx-auto leading-relaxed">
            Production-ready AI in weeks. 100% code ownership. A scoped proposal within
            48 hours — or your next sprint is free.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-lime-400 text-foreground hover:bg-lime-300 group h-12 px-7 w-full sm:w-auto"
            >
              <Link href="/contact">
                Book a discovery call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-background/30 bg-transparent text-background hover:bg-background/10 h-12 px-7 w-full sm:w-auto"
            >
              <Link href="/pricing">
                View pricing
                <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Check } from "lucide-react";
import { TiltCard } from "@/components/site/tilt-card";
import { CtaBand } from "@/components/site/shared";
import { services, techStack } from "@/lib/content";
import { MobileServicesContent } from "@/components/site/mobile-page-content";

// Group services into editorial tiers
const groups = [
  { label: "Core AI", range: [0, 4] },
  { label: "Product & Delivery", range: [4, 9] },
  { label: "Enterprise & Intelligence", range: [9, 14] },
];

export default function ServicesContent() {
  return (
    <>
      {/* Mobile-only services content */}
      <MobileServicesContent />

      {/* Desktop services content — original (lg+ only) */}
      <section className="hidden lg:block relative py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {groups.map((g, gi) => {
            const slice = services.slice(g.range[0], g.range[1]);
            return (
              <div key={g.label} className={gi > 0 ? "mt-16" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs lime-text">{String(gi + 1).padStart(2, "0")}</span>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                    {g.label}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {slice.length} capabilities
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {slice.map((s, i) => {
                    const Icon = (Icons as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Box;
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                        className="group"
                      >
                        <TiltCard
                          intensity={5}
                          className="h-full rounded-2xl border border-border bg-card p-6 lift"
                        >
                          <div style={{ transform: "translateZ(32px)" }} className="flex items-start justify-between mb-5">
                            <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center group-hover:bg-lime-600 transition-colors">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground/60">{s.num}</span>
                          </div>
                          <h3 style={{ transform: "translateZ(22px)" }} className="font-semibold mb-2">
                            {s.title}
                          </h3>
                          <p style={{ transform: "translateZ(14px)" }} className="text-xs text-muted-foreground leading-relaxed mb-4">
                            {s.desc}
                          </p>
                          <ul style={{ transform: "translateZ(10px)" }} className="space-y-1.5">
                            {s.points.slice(0, 3).map((p) => (
                              <li key={p} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                                <Check className="h-3 w-3 lime-text mt-0.5 shrink-0" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </TiltCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech stack — desktop only (mobile version is in MobileServicesContent) */}
      <section className="hidden lg:block relative py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Models &amp; infrastructure we build on
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {techStack.map((t) => (
              <div key={t.name} className="bg-card p-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.vendor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

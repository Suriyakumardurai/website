"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/site/shared";
import { faqs } from "@/lib/content";

const categories = ["All", "Engagement", "Ownership", "Tech", "Process", "Support"];

export default function FaqContent() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? faqs : faqs.filter((f) => f.category === cat);

  return (
    <>
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  cat === c
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {filtered.map((f, i) => (
                <AccordionItem
                  key={`${cat}-${i}`}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs lime-text mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{f.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-8">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <div className="mt-12 text-center rounded-2xl border border-border bg-muted/40 p-8">
            <p className="text-lg font-semibold">Still have questions?</p>
            <p className="mt-2 text-muted-foreground">
              Book a discovery call. No sales pitch — just answers.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Talk to us →
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

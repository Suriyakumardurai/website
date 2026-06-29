"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CtaBand } from "@/components/site/shared";
import { jobs } from "@/lib/content";

export default function CareersContent() {
  return (
    <>
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="lg:col-span-4 group rounded-2xl border border-border bg-card p-7 lift flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <Badge variant="secondary" className="rounded-full">{job.type.split("·")[0].trim()}</Badge>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:lime-text group-hover:rotate-12 transition-all" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{job.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{job.desc}</p>

                <div className="space-y-2 mb-5 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                  </div>
                  <div className="text-muted-foreground">{job.pay}</div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {job.skills.map((s) => (
                    <span key={s} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full group-hover:bg-foreground group-hover:text-background transition-colors"
                >
                  <Link href="/contact">Apply now</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="font-semibold">Don&apos;t see your role?</p>
              <p className="text-sm text-muted-foreground mt-1">We&apos;re always looking for exceptional AI-native builders.</p>
            </div>
            <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              <Link href="/contact">
                Reach out <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

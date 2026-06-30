"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";
import { company } from "@/lib/content";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "AI Agents", href: "/services" },
      { label: "Custom LLMs", href: "/services" },
      { label: "AI SaaS", href: "/services" },
      { label: "Mobile Apps", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Home", href: "/" },
    ],
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: `https://${company.linkedin}` },
  { icon: Instagram, label: "Instagram", href: `https://${company.instagram}` },
  { icon: Mail, label: "Email", href: `mailto:${company.email}` },
];

/**
 * Mobile-only footer — compact, accordion-style link groups.
 *
 * - Brand row at top with socials.
 * - Accordion link groups (saves vertical space).
 * - Back-to-top pill + legal strip at bottom.
 * - Respects bottom nav height via safe-pb.
 *
 * Desktop (lg+) renders nothing — original `Footer` takes over.
 */
export default function MobileFooter() {
  const [open, setOpen] = useState<string | null>("Services");

  return (
    <footer className="lg:hidden bg-foreground text-background safe-pb" style={{ paddingBottom: "calc(var(--m-nav-h) + env(safe-area-inset-bottom) + 24px)" }}>
      {/* Top: brand row */}
      <div className="safe-px pt-10 pb-6">
        <Link href="/" className="flex items-center gap-3 group m-press">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg ring-1 ring-background/15">
            <img
              src="/autoplanet-logo.png"
              alt="AutoPlanet Corporation logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="font-semibold tracking-tight">{company.name}</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-background/50">
              Enterprise AI automation
            </div>
          </div>
        </Link>
        <p className="mt-4 text-sm text-background/65 leading-relaxed">
          {company.mission}
        </p>
        <div className="mt-4 flex items-center gap-2">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="m-tap m-press flex h-9 w-9 items-center justify-center rounded-full border border-background/15 hover:bg-background hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Accordion link groups */}
      <div className="safe-px border-t border-background/10">
        {footerLinks.map((col) => {
          const isOpen = open === col.title;
          return (
            <div key={col.title} className="border-b border-background/10">
              <button
                onClick={() => setOpen(isOpen ? null : col.title)}
                className="w-full flex items-center justify-between py-4 m-press text-left"
                aria-expanded={isOpen}
              >
                <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-background/50">
                  {col.title}
                </h4>
                <ChevronDown
                  className={`h-4 w-4 text-background/60 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-4 space-y-2">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="inline-flex items-center text-sm text-background/75 hover:text-lime-400 transition-colors m-press"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div className="safe-px pt-6 flex flex-col items-center gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="m-press inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-2 text-xs text-background/80"
        >
          <ArrowUp className="h-3 w-3" />
          Back to top
        </button>
        <a
          href={`mailto:${company.email}`}
          className="text-[11px] font-mono text-background/55 hover:text-lime-400 transition-colors"
        >
          {company.email}
        </a>
        <p className="text-[10px] text-background/40 text-center">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

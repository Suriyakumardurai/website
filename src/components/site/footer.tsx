"use client";

import Link from "next/link";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { company } from "@/lib/content";
import MobileFooter from "@/components/site/mobile-footer";

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

export default function Footer() {
  return (
    <>
      {/* Mobile-only footer (renders below lg) */}
      <MobileFooter />

      {/* Desktop footer — original (lg+ only) */}
      <footer className="hidden lg:block relative bg-foreground text-background mt-auto">
      {/* main */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                <img
                  src="/autoplanet-logo.png"
                  alt="AutoPlanet Corporation logo"
                  className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[-4deg]"
                />
              </div>
              <div>
                <div className="font-bold tracking-tight">{company.name}</div>
                <div className="text-xs text-background/50">
                  Enterprise AI automation
                </div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-background/60 leading-relaxed max-w-sm">
              {company.mission}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 hover:bg-background hover:text-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-background/40 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-background/70 hover:text-lime-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <a href={`mailto:${company.email}`} className="hover:text-lime-400 transition-colors">
              {company.email}
            </a>
            <span>·</span>
            <Link href="/" className="hover:text-lime-400 transition-colors">
              Back to top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

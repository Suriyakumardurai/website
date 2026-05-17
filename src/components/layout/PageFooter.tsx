// src/components/layout/PageFooter.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "Performance", href: "/services/performance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "LLM Calculator", href: "/tools/llm-cost-calculator" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter / X", href: "https://x.com/ceoofautoplanet", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/autoplanet-corporation", external: true },
      { label: "Instagram", href: "https://www.instagram.com/autoplanet.corp", external: true },
      { label: "Email Us", href: "mailto:sales@autoplanetcorp.com", external: true },
    ],
  },
];

export default function PageFooter() {
  return (
    <footer
      style={{
        borderTop: "0.5px solid rgba(200, 169, 110, 0.15)",
        padding: "clamp(40px, 8vw, 80px) clamp(16px, 4vw, 40px) clamp(24px, 4vw, 40px)",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <div
        className="footer-grid"
        style={{
          marginBottom: "4rem",
        }}
      >
        {/* Brand Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif, 'Instrument Serif', serif)",
              fontSize: "1.5rem",
              color: "var(--white, #f5f3ef)",
              marginBottom: "1rem",
            }}
          >
            AutoPlanet
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "280px",
              marginBottom: "1.5rem",
            }}
          >
            AI-native automation company. We build custom LLMs, AI SaaS products,
            and workflow engines that actually ship.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { label: "𝕏", href: "https://x.com/ceoofautoplanet" },
              { label: "in", href: "https://www.linkedin.com/company/autoplanet-corporation" },
              { label: "IG", href: "https://www.instagram.com/autoplanet.corp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  border: "0.5px solid rgba(200, 169, 110, 0.2)",
                  background: "rgba(200, 169, 110, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent, #c8a96e)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Link Columns */}
        {footerSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent, #c8a96e)",
                marginBottom: "1.25rem",
                fontWeight: 500,
              }}
            >
              {section.title}
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {section.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.45)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.45)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "0.5px solid rgba(255, 255, 255, 0.07)",
          paddingTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
          © 2026 AutoPlanet Corporation. All rights reserved.
        </span>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
          Built with AI, from Villupuram to the world.
        </span>
      </div>
    </footer>
  );
}
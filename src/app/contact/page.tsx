// src/app/contact/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Clock, Globe, Send } from "lucide-react";
import PageNavbar from "@/components/layout/PageNavbar";
import PageFooter from "@/components/layout/PageFooter";
import { FadeUp, WordReveal, StaggerGrid, StaggerItem, RevealSection } from "@/components/Animate";

const contactMethods = [
  { label: "Email", value: "sales@autoplanetcorp.com", href: "mailto:sales@autoplanetcorp.com", icon: Mail, color: "#c8a96e" },
  { label: "Phone", value: "+91 7904914455", href: "tel:+917904914455", icon: Phone, color: "#3dd68c" },
  { label: "LinkedIn", value: "AutoPlanet Corporation", href: "https://www.linkedin.com/company/autoplanet-corporation", icon: Globe, color: "#5ba4f5" },
  { label: "Twitter / X", value: "@ceoofautoplanet", href: "https://x.com/ceoofautoplanet", icon: Send, color: "#a78bfa" },
  { label: "Instagram", value: "@autoplanet.corp", href: "https://www.instagram.com/autoplanet.corp", icon: Globe, color: "#f472b6" },
];

const quickLinks = [
  { label: "View Services", href: "/services", desc: "See what we build" },
  { label: "Read Our Blog", href: "/blog", desc: "AI engineering insights" },
  { label: "Pricing Plans", href: "/pricing", desc: "Transparent engagement models" },
  { label: "FAQ", href: "/faq", desc: "Common questions answered" },
];

export default function ContactPage() {
  return (
    <>
      <PageNavbar />

      {/* HERO */}
      <div className="page-hero">
        <div style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Contact</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
          <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
          Get in Touch
        </motion.div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--white)", marginBottom: "1.5rem" }}>
          <WordReveal text="Ready to ship real AI?" />
        </h1>
        <FadeUp delay={0.3}>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "600px" }}>
            Book a free 30-minute call. We&apos;ll tell you exactly what we&apos;d build, how long it&apos;d take, and what it&apos;d cost.
          </p>
        </FadeUp>
      </div>

      {/* PRIMARY CTA */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 5rem" }}>
        <RevealSection>
          <div className="accent-card" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <Send size={32} style={{ color: "var(--accent)", margin: "0 auto 1.5rem", opacity: 0.8, position: "relative", zIndex: 1 }} />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 400, color: "var(--white)", marginBottom: "1rem", position: "relative", zIndex: 1 }}>Book a Free Consultation</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 2rem", position: "relative", zIndex: 1 }}>
              30 minutes. No cost. We&apos;ll assess your AI opportunity and give you a clear roadmap.
            </p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@autoplanetcorp.com&su=Free%20AI%20Consultation%20Request" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Book a free call <ArrowRight size={18} />
            </a>
          </div>
        </RevealSection>
      </div>

      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* CONTACT METHODS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Ways to Reach Us
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--white)", marginBottom: "3rem" }}>Choose your channel</h2>
        </FadeUp>
        <StaggerGrid className="contact-grid">
          {contactMethods.map((m) => (
            <StaggerItem key={m.label}>
              <motion.a href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined} className="contact-method" whileHover={{ y: -4 }} style={{ textDecoration: "none" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${m.color}15`, border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <m.icon size={20} style={{ color: m.color }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>{m.label}</div>
                  <div style={{ fontSize: "1rem", color: "var(--white)" }}>{m.value}</div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* OFFICE */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <RevealSection>
          <div className="glass-card" style={{ maxWidth: "600px" }}>
            <MapPin size={24} style={{ color: "var(--accent)", marginBottom: "1rem", opacity: 0.7 }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--white)", marginBottom: "0.75rem", fontWeight: 400 }}>AutoPlanet Corporation</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1.5rem" }}>Villupuram, Tamil Nadu 605602, India</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ padding: "8px 16px", borderRadius: "100px", background: "rgba(200,169,110,0.1)", color: "var(--accent)", fontSize: "0.8rem", border: "0.5px solid rgba(200,169,110,0.2)" }}>
                <Clock size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />Mon–Fri: 9AM–6PM IST
              </span>
              <span style={{ padding: "8px 16px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", border: "0.5px solid rgba(255,255,255,0.06)" }}>
                <Globe size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />Global clients welcome
              </span>
            </div>
          </div>
        </RevealSection>
      </div>

      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }} />

      {/* QUICK LINKS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 40px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.25rem" }}>
            <span style={{ width: "14px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
            Explore More
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "var(--white)", marginBottom: "2rem" }}>Quick links</h2>
        </FadeUp>
        <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {quickLinks.map((link) => (
            <StaggerItem key={link.label}>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href={link.href} className="glass-card" style={{ display: "block", textDecoration: "none", height: "100%" }}>
                  <div style={{ fontSize: "1rem", color: "var(--white)", marginBottom: "6px", fontWeight: 400 }}>{link.label}</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{link.desc}</div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 40px 5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <RevealSection>
          <div className="page-cta-block">
            <h2>Let&apos;s talk about your project</h2>
            <p>Drop us a line at sales@autoplanetcorp.com or reach out on any channel above. We respond within 24 hours.</p>
            <a href="mailto:sales@autoplanetcorp.com" className="btn-primary" style={{ position: "relative", zIndex: 1 }}>
              Email us directly <ArrowRight size={18} />
            </a>
          </div>
        </RevealSection>
      </div>

      <PageFooter />
    </>
  );
}
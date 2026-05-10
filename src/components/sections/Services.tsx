'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Laptop, Smartphone, Palette, Cloud, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    href: "/services/ai-solutions",
    title: "AI Solutions",
    description: "Custom LLMs, intelligent automation, and machine learning systems that eliminate manual work and surface insights at scale.",
    icon: <Brain size={22} strokeWidth={1.5} />,
    tags: ["LLM Development", "ML Models", "Process Automation"],
  },
  {
    href: "/services/web-development",
    title: "Web Development",
    description: "Full-stack web applications built with Next.js and React — blazing fast, globally deployed, and engineered to convert.",
    icon: <Laptop size={22} strokeWidth={1.5} />,
    tags: ["Next.js & React", "Full-Stack", "API Development"],
  },
  {
    href: "/services/mobile-apps",
    title: "Mobile Apps",
    description: "Native-quality iOS and Android apps with React Native — one codebase, two platforms, zero compromise on performance.",
    icon: <Smartphone size={22} strokeWidth={1.5} />,
    tags: ["React Native", "iOS & Android", "Offline-first"],
  },
  {
    href: "/services/ui-ux-design",
    title: "UI/UX Design",
    description: "Research-backed, visually stunning interfaces that reduce friction, increase trust, and turn visitors into customers.",
    icon: <Palette size={22} strokeWidth={1.5} />,
    tags: ["Design Systems", "Prototyping", "User Research"],
  },
  {
    href: "/services/cloud-devops",
    title: "Cloud & DevOps",
    description: "Enterprise-grade cloud infrastructure, CI/CD pipelines, and containerised deployments that scale to millions.",
    icon: <Cloud size={22} strokeWidth={1.5} />,
    tags: ["AWS & Azure", "Kubernetes", "CI/CD"],
  },
  {
    href: "/services/performance",
    title: "Performance Optimization",
    description: "Systematic speed improvements across frontend, backend, and database layers — measurable gains, not guesswork.",
    icon: <Zap size={22} strokeWidth={1.5} />,
    tags: ["Core Web Vitals", "Bundle Optimization", "CDN"],
  },
];

const metrics = [
  { value: "83%", label: "Avg. manual work eliminated" },
  { value: "< 6wk", label: "Avg. time to first deployment" },
  { value: "99.9%", label: "Uptime SLA on all products" },
  { value: "47+", label: "Projects shipped globally" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as any },
  }),
};

export default function Services() {
  return (
    <section id="services" style={{
      padding: '100px 40px 120px',
      position: 'relative',
      maxWidth: 'none',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end', marginBottom: 56 }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: 16 }}>What We Build</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, fontWeight: 400, color: 'var(--white)', margin: 0 }}>
              Services that <em style={{ fontStyle: 'italic' }}>transform</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 380, textAlign: 'right', fontWeight: 300, margin: 0 }}>
              From concept to deployment — end-to-end digital solutions engineered to give your business an unfair advantage.
            </p>
            <Link href="/#services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
              color: 'var(--accent)', fontSize: 13, fontWeight: 400, letterSpacing: '0.04em',
              borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 2,
            }}>
              Explore all capabilities <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              marginBottom: 56, border: '0.5px solid rgba(200,169,110,0.1)',
              borderRadius: 14, overflow: 'hidden',
            }}
          >
            {metrics.map((m, i) => (
              <div key={i} style={{
                padding: '24px 20px', textAlign: 'center',
                background: 'rgba(245,243,239,0.015)',
                borderRight: i < 3 ? '0.5px solid rgba(200,169,110,0.08)' : 'none',
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--white)', fontFamily: 'var(--font-serif)', marginBottom: 6 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4, fontWeight: 300 }}>{m.label}</div>
              </div>
            ))}
          </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          border: '0.5px solid rgba(200,169,110,0.08)', borderRadius: 20, overflow: 'hidden',
        }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              variants={fadeUp}
            >
              <Link href={s.href} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  style={{
                    padding: '36px 36px',
                    borderRight: i % 2 === 0 ? '0.5px solid rgba(200,169,110,0.06)' : 'none',
                    borderBottom: i < services.length - 2 ? '0.5px solid rgba(200,169,110,0.06)' : 'none',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'background 0.3s ease', cursor: 'pointer',
                  }}
                  whileHover={{ background: 'rgba(200,169,110,0.025)' } as never}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: 'rgba(200,169,110,0.06)',
                      border: '0.5px solid rgba(200,169,110,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent)',
                    }}>{s.icon}</div>
                    <ArrowRight size={15} style={{ color: 'var(--muted)', opacity: 0.35, marginTop: 4 }} />
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem', fontWeight: 400, color: 'var(--white)', marginBottom: 10,
                    fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em',
                  }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20, flexGrow: 1, fontWeight: 300 }}>{s.description}</p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {s.tags.map((tag, ti) => (
                      <span key={ti} style={{
                        fontSize: 11, padding: '3px 9px', borderRadius: 9999,
                        background: 'rgba(200,169,110,0.05)', color: 'var(--muted)',
                        border: '0.5px solid rgba(200,169,110,0.1)', fontWeight: 300,
                      }}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 56,
            background: 'linear-gradient(135deg, rgba(200,169,110,0.08) 0%, rgba(8,8,8,0.9) 100%)',
            border: '0.5px solid rgba(200,169,110,0.12)',
            borderRadius: 20, padding: '48px 48px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", opacity: 0.02, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', marginBottom: 10, lineHeight: 1.2, fontWeight: 400 }}>
              Not sure where to <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>start?</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 420, lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
              Drop us a message. We&apos;ll assess your needs and recommend the right engagement within 24 hours.
            </p>
          </div>
          <Link href="/#contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: '0.9rem', flexShrink: 0, position: 'relative', zIndex: 1 }}>
            Talk to Us <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

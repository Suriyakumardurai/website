'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface ServiceTemplateProps {
  title: string;
  tagline: string;
  description: string;
  features: { title: string; description: string; icon: React.ReactNode }[];
  process: { step: string; title: string; description: string }[];
  stats?: { value: string; label: string }[];
  relatedServices?: { title: string; href: string; icon: React.ReactNode }[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as any }
  }),
};

export default function ServiceTemplate({
  title, tagline, description, features, process, stats, relatedServices,
}: ServiceTemplateProps) {
  const words = title.split(' ');

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '148px', paddingBottom: '72px' }}>
        {/* Gold radial glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Subtle grid — matches globals.css body */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(200,169,110,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, color: 'var(--muted)', fontSize: 13, letterSpacing: '0.02em' }}
          >
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} style={{ opacity: 0.4 }} />
            <Link href="/#services" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Services</Link>
            <ChevronRight size={12} style={{ opacity: 0.4 }} />
            <span style={{ color: 'var(--accent)' }}>{title}</span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

            {/* Left col */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
                  padding: '5px 14px', borderRadius: 9999,
                  border: '0.5px solid rgba(200,169,110,0.35)',
                  background: 'rgba(200,169,110,0.06)',
                  color: 'var(--accent)', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}
              >
                AutoPlanet · Premium Service
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', fontFamily: 'var(--font-serif)',
                  color: 'var(--white)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20, fontWeight: 400,
                }}
              >
                {words.slice(0, -1).join(' ')}{words.length > 1 ? ' ' : ''}
                <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{words[words.length - 1]}</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 36, maxWidth: 460, fontWeight: 300 }}
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: 'flex', gap: 12 }}
              >
                <Link href="/#contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px' }}>
                  Start Your Project <ArrowRight size={15} />
                </Link>
                <Link href="/#services" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px' }}>
                  All Services
                </Link>
              </motion.div>
            </div>

            {/* Right col — tagline card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              style={{
                background: 'rgba(245,243,239,0.02)',
                border: '0.5px solid rgba(200,169,110,0.12)',
                borderRadius: 20, padding: '40px 36px',
              }}
            >
              <p style={{
                fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--white)',
                lineHeight: 1.6, marginBottom: 32, fontStyle: 'italic', fontWeight: 400,
              }}>
                &ldquo;{tagline}&rdquo;
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {features.slice(0, 4).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} strokeWidth={2} />
                    {f.title}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
                marginTop: 64, border: '0.5px solid rgba(200,169,110,0.1)',
                borderRadius: 14, overflow: 'hidden',
              }}
            >
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: '24px 20px', textAlign: 'center',
                  background: 'rgba(245,243,239,0.02)',
                  borderRight: i < stats.length - 1 ? '0.5px solid rgba(200,169,110,0.08)' : 'none',
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--white)', fontFamily: 'var(--font-serif)', marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em', fontWeight: 300 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="section-tag" style={{ marginBottom: 14 }}>Capabilities</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', lineHeight: 1.1, margin: 0, fontWeight: 400 }}>
              What we <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>deliver</em>
            </h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 380, lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
            Every engagement is backed by the full depth of our technical expertise.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          border: '0.5px solid rgba(200,169,110,0.08)', borderRadius: 20, overflow: 'hidden',
        }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              style={{
                padding: '36px 32px',
                borderRight: (i + 1) % 3 !== 0 ? '0.5px solid rgba(200,169,110,0.06)' : 'none',
                borderBottom: i < features.length - 3 ? '0.5px solid rgba(200,169,110,0.06)' : 'none',
                transition: 'background 0.3s ease',
              }}
              whileHover={{ background: 'rgba(200,169,110,0.03)' } as never}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(200,169,110,0.06)',
                border: '0.5px solid rgba(200,169,110,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', marginBottom: 20,
              }}>{f.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--white)', marginBottom: 10, letterSpacing: '0.01em' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'flex-start' }}>

          {/* Sticky label */}
          <div style={{ position: 'sticky', top: 120 }}>
            <div className="section-tag" style={{ marginBottom: 14 }}>Process</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', lineHeight: 1.1, marginBottom: 20, fontWeight: 400 }}>
              How we <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>work</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
              A proven, transparent workflow built for speed without sacrificing quality.
            </p>
            <Link href="/#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
              color: 'var(--accent)', fontSize: 13, fontWeight: 400,
              letterSpacing: '0.04em', borderBottom: '0.5px solid rgba(200,169,110,0.4)', paddingBottom: 2,
            }}>
              Start the conversation <ArrowRight size={13} />
            </Link>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 19, top: 20, bottom: 0, width: 1,
              background: 'linear-gradient(to bottom, rgba(200,169,110,0.3), transparent)',
            }} />
            {process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex', gap: 28, alignItems: 'flex-start',
                  paddingBottom: i < process.length - 1 ? 44 : 0, position: 'relative', zIndex: 1,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--black)',
                  border: '0.5px solid rgba(200,169,110,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 400, color: 'var(--accent)', letterSpacing: '0.02em', fontFamily: 'var(--font-serif)',
                }}>
                  {p.step}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--white)', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED SERVICES ─────────────────────────────── */}
      {relatedServices && relatedServices.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 72px' }}>
          <div style={{ borderTop: '0.5px solid rgba(200,169,110,0.08)', paddingTop: 56 }}>
            <div className="section-tag" style={{ marginBottom: 20 }}>Also Explore</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {relatedServices.map((s, i) => (
                <Link key={i} href={s.href} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ borderColor: 'rgba(200,169,110,0.35)', background: 'rgba(200,169,110,0.05)' } as never}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 18px', borderRadius: 10,
                      border: '0.5px solid rgba(200,169,110,0.12)',
                      background: 'rgba(200,169,110,0.02)',
                      color: 'var(--muted)', fontSize: 14, fontWeight: 300,
                      transition: 'all 0.2s ease', cursor: 'pointer',
                    }}
                  >
                    <span style={{ color: 'var(--accent)' }}>{s.icon}</span>
                    {s.title}
                    <ArrowRight size={13} style={{ opacity: 0.4 }} />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, rgba(200,169,110,0.08) 0%, rgba(8,8,8,0.9) 100%)',
            border: '0.5px solid rgba(200,169,110,0.15)',
            borderRadius: 24, padding: '56px 56px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Noise texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.025, mixBlendMode: 'overlay', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', marginBottom: 12, lineHeight: 1.15, fontWeight: 400 }}>
              Ready to build something <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>exceptional?</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 440, lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
              Tell us about your project — we respond within 24 hours with a tailored proposal.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link href="/#contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: '0.9rem' }}>
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link href="/#services" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', fontSize: '0.9rem' }}>
              See All Services
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

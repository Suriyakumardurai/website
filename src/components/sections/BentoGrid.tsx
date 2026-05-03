'use client';

import { motion } from 'framer-motion';

const items = [
  { title: '10x Faster Development', desc: 'Our optimized workflows and AI-assisted development deliver results at unprecedented speed without compromising quality.', icon: '⚡', span: 2 },
  { title: '24/7 Support', desc: 'Round-the-clock monitoring and dedicated support for your mission-critical applications and services.', icon: '🛡️', span: 1 },
  { title: 'Enterprise Security', desc: 'Bank-grade security protocols with SOC2 compliance and end-to-end encryption for all data.', icon: '🔒', span: 1 },
  { title: 'Global Scale', desc: 'Built to handle millions of concurrent users across 50+ CDN regions worldwide with 99.99% uptime.', icon: '🌍', span: 2 },
];

export default function BentoGrid() {
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#7c3aed', marginBottom: 20 }}>Why Choose Us</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            Built for <span className="gradient-text">Excellence</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#9b9bc0', maxWidth: 600, margin: '0 auto' }}>
            We don&apos;t just build products — we engineer competitive advantages that propel your business forward.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="!grid-cols-1 md:!grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                gridColumn: `span ${item.span}`,
                padding: 36, borderRadius: 20, cursor: 'pointer',
                background: 'rgba(15, 12, 40, 0.5)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                transition: 'all 0.4s ease',
              }}
              className={item.span === 2 ? 'md:!col-span-2' : ''}
            >
              <span style={{ fontSize: 40, display: 'block', marginBottom: 20 }}>{item.icon}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12, letterSpacing: '-0.02em' }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#9b9bc0' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'Deep dive into your vision, goals, audience, and competitive landscape to craft a winning roadmap.', icon: '🔍', color: '#a78bfa' },
  { num: '02', title: 'Design & Prototype', desc: 'Stunning, user-centered interfaces brought to life through interactive prototypes and meticulous iterations.', icon: '🎨', color: '#f472b6' },
  { num: '03', title: 'Develop & Build', desc: 'Robust, scalable, and performant solutions built with cutting-edge technologies and engineering best practices.', icon: '⚡', color: '#34d399' },
  { num: '04', title: 'Deploy & Scale', desc: 'Launch with confidence — continuous deployment, real-time monitoring, and ongoing performance optimization.', icon: '🚀', color: '#60a5fa' },
];

const tech = ['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'TypeScript', 'Docker', 'GraphQL'];

export default function About() {
  return (
    <section id="about" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 500, height: 500, top: '20%', left: '-12%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: 64 }} className="lg:!grid-cols-2">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#7c3aed', marginBottom: 20 }}>How We Work</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 24 }}>
            From Idea to <span className="gradient-text">Launch</span>
            <br />in Record Time
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9b9bc0', marginBottom: 36, maxWidth: 480 }}>
            Our battle-tested process ensures every project is delivered on time,
            on budget, and beyond expectations. Agile methodology meets creative excellence.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
            {tech.map((t) => (
              <span key={t} style={{
                padding: '10px 18px', borderRadius: 12, fontSize: 13, fontWeight: 500,
                background: 'rgba(20, 16, 48, 0.8)', border: '1px solid rgba(124, 58, 237, 0.1)',
                color: '#9b9bc0', transition: 'border-color 0.3s',
              }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Right - Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '24px 28px', borderRadius: 18,
                background: 'rgba(15, 12, 40, 0.5)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                flexShrink: 0, width: 48, height: 48, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                background: `${step.color}12`, color: step.color,
                border: `1px solid ${step.color}25`,
              }}>{step.num}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{step.icon}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>{step.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9b9bc0' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

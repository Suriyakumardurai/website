'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  { title: 'E-Commerce Platform', category: 'Web Development', desc: 'A full-stack e-commerce solution with real-time inventory, secure payments, and AI-powered recommendations.', tech: ['Next.js', 'Stripe', 'PostgreSQL'], gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)', accent: '#a78bfa' },
  { title: 'FinTech Dashboard', category: 'UI/UX Design', desc: 'Interactive financial analytics dashboard with real-time data visualization and portfolio management.', tech: ['React', 'D3.js', 'Node.js'], gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', accent: '#67e8f9' },
  { title: 'AI Content Engine', category: 'AI Solutions', desc: 'AI-powered content generation platform with NLP, automated publishing, and performance analytics.', tech: ['Python', 'GPT-4', 'FastAPI'], gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', accent: '#f0abfc' },
  { title: 'Healthcare App', category: 'Mobile App', desc: 'Telemedicine platform with HD video calls, prescription management, and secure patient records.', tech: ['React Native', 'Firebase', 'WebRTC'], gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', accent: '#6ee7b7' },
];

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#7c3aed', marginBottom: 20 }}>Portfolio</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#9b9bc0', maxWidth: 600, margin: '0 auto' }}>
            A curated showcase of projects that demonstrate our expertise across industries.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }} className="!grid-cols-1 lg:!grid-cols-2">
          {projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                background: 'rgba(15, 12, 40, 0.5)', border: '1px solid rgba(124, 58, 237, 0.1)',
                transition: 'all 0.4s ease',
                transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === i ? '0 12px 40px rgba(124, 58, 237, 0.12)' : 'none',
              }}>
              {/* Header */}
              <div style={{ position: 'relative', height: 220, background: p.gradient, overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                  <div style={{
                    width: '70%', maxWidth: 260, height: '65%', borderRadius: 16,
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.title}</span>
                  </div>
                </div>
                {hovered === i && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', transition: 'opacity 0.3s',
                  }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: '32px 36px 36px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: p.accent, marginBottom: 10 }}>{p.category}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 14, letterSpacing: '-0.02em' }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#9b9bc0', marginBottom: 24 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                  {p.tech.map((t, ti) => (
                    <span key={ti} style={{ fontSize: 12, padding: '5px 14px', borderRadius: 9999, background: 'rgba(124,58,237,0.08)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.12)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

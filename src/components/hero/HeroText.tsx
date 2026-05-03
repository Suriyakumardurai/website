'use client';

import { motion } from 'framer-motion';

export default function HeroText() {
  return (
    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ marginBottom: 56 }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 22px', borderRadius: 9999,
          fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
          background: 'rgba(124, 58, 237, 0.1)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          color: '#c4b5fd',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          Transforming Ideas Into Reality
        </span>
      </motion.div>

      {/* Line 1: We Build */}
      <motion.h1
        initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(3rem, 7.5vw, 7rem)',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          margin: 0,
          textAlign: 'center',
        }}
      >
        We Build
      </motion.h1>

      {/* Line 2: Digital Experiences */}
      <motion.h1
        initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="gradient-text"
        style={{
          fontSize: 'clamp(3rem, 7.5vw, 7rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          margin: 0,
          textAlign: 'center',
        }}
      >
        Digital Experiences
      </motion.h1>

      {/* Line 3: That Drive Growth */}
      <motion.h1
        initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(3rem, 7.5vw, 7rem)',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          margin: 0,
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        That Drive Growth
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#9b9bc0',
          lineHeight: 1.8,
          maxWidth: 560,
          margin: '0 auto 56px auto',
          textAlign: 'center',
        }}
      >
        We craft cutting-edge websites, applications, and digital solutions that
        elevate brands and accelerate business growth.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 80, flexWrap: 'wrap' }}
      >
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '16px 36px', borderRadius: 9999,
          fontSize: 15, fontWeight: 600, color: 'white',
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #06b6d4 100%)',
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(124, 58, 237, 0.35)',
          transition: 'all 0.3s ease',
        }}>
          Start Your Project
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a href="#work" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '16px 36px', borderRadius: 9999,
          fontSize: 15, fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
        }}>
          View Our Work
        </a>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, maxWidth: 750, margin: '0 auto' }}
      >
        {[
          { value: '150+', label: 'Projects Delivered' },
          { value: '50+', label: 'Happy Clients' },
          { value: '99%', label: 'Client Satisfaction' },
          { value: '5+', label: 'Years Experience' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#5b5b80', letterSpacing: '0.03em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

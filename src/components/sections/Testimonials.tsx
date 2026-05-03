'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  { name: 'Sarah Chen', role: 'CEO, TechVenture', text: 'AutoPlanet transformed our digital presence completely. The website they built increased our conversion rate by 340% within the first quarter. Absolutely phenomenal work.', avatar: 'SC' },
  { name: 'Marcus Johnson', role: 'CTO, DataFlow', text: 'The AI solutions they developed automated 70% of our manual processes. Incredible technical expertise, attention to detail, and seamless communication throughout.', avatar: 'MJ' },
  { name: 'Emily Rodriguez', role: 'Founder, CreativeHub', text: 'Working with AutoPlanet felt like having an entire tech department. They delivered our mobile app ahead of schedule with zero critical bugs at launch.', avatar: 'ER' },
  { name: 'David Park', role: 'VP Engineering, ScaleUp', text: 'Their cloud architecture saved us $50K monthly in infrastructure costs while improving performance by 3x. Best technical decision we ever made.', avatar: 'DP' },
  { name: 'Lisa Thompson', role: 'CMO, BrandForge', text: 'The UI/UX design work was outstanding. Our users consistently describe the new interface as intuitive, beautiful, and a joy to use.', avatar: 'LT' },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Top divider */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#7c3aed', marginBottom: 20 }}>Testimonials</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: 800, margin: '0 auto 48px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: 'clamp(36px, 5vw, 60px)', borderRadius: 24, textAlign: 'center',
                background: 'rgba(15, 12, 40, 0.5)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 28 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" fill="#fbbf24" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, marginBottom: 32, fontStyle: 'italic', fontWeight: 300 }}>
                &ldquo;{testimonials[active].text}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: 'white',
                }}>{testimonials[active].avatar}</div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{testimonials[active].name}</p>
                  <p style={{ fontSize: 13, color: '#5b5b80' }}>{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }} suppressHydrationWarning>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} suppressHydrationWarning
              style={{
                height: 8, borderRadius: 9999, border: 'none', cursor: 'pointer',
                width: i === active ? 32 : 8,
                background: i === active ? '#7c3aed' : 'rgba(124, 58, 237, 0.2)',
                boxShadow: i === active ? '0 0 12px rgba(124, 58, 237, 0.5)' : 'none',
                transition: 'all 0.5s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

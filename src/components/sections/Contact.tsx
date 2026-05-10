'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const inputBase: React.CSSProperties = {
  width: '100%', padding: '14px 18px', borderRadius: 14,
  background: 'rgba(20, 16, 48, 0.6)', border: '1px solid rgba(124, 58, 237, 0.12)',
  color: 'white', fontSize: 15, outline: 'none',
  transition: 'border-color 0.3s ease',
  lineHeight: 1.6,
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', service: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, top: '10%', left: '-12%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#7c3aed', marginBottom: 20 }}>Get In Touch</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            Let&apos;s Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#9b9bc0', maxWidth: 560, margin: '0 auto' }}>
            Ready to transform your digital presence? Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 48, maxWidth: 1100, margin: '0 auto', alignItems: 'start' }} className="!grid-cols-1 lg:!grid-cols-[2fr_3fr]">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📧', label: 'Email', value: 'sales@autoplanetcorp.com', sub: 'Drop us a line anytime' },
              { icon: '📞', label: 'Phone', value: '+91 7904914455', sub: 'Available Mon-Fri, 9am-6pm' },
              { icon: '📍', label: 'Location', value: 'Villupuram, Tamil Nadu', sub: 'Global Business Excellence' },
              { icon: '⏰', label: 'Response Time', value: 'Within 24 hours', sub: 'We value your time' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 24px', borderRadius: 18,
                  background: 'rgba(15, 12, 40, 0.5)', border: '1px solid rgba(124, 58, 237, 0.1)',
                }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.12)',
                }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#5b5b80', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 2 }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: '#9b9bc0' }}>{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <form onSubmit={handleSubmit} style={{
              padding: 'clamp(28px, 4vw, 48px)', borderRadius: 24,
              background: 'rgba(15, 12, 40, 0.5)', border: '1px solid rgba(124, 58, 237, 0.1)',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="!grid-cols-1 sm:!grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 10 }}>Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inputBase} suppressHydrationWarning />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 10 }}>Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={inputBase} suppressHydrationWarning />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 10 }}>Service Needed</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={{ ...inputBase, appearance: 'none' as const }} suppressHydrationWarning>
                  <option value="" style={{ background: '#0a0520' }}>Select a service</option>
                  <option value="web" style={{ background: '#0a0520' }}>Web Development</option>
                  <option value="mobile" style={{ background: '#0a0520' }}>Mobile App</option>
                  <option value="design" style={{ background: '#0a0520' }}>UI/UX Design</option>
                  <option value="ai" style={{ background: '#0a0520' }}>AI Solutions</option>
                  <option value="cloud" style={{ background: '#0a0520' }}>Cloud & DevOps</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 10 }}>Message</label>
                <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project, goals, and timeline..." style={{ ...inputBase, resize: 'none' as const }} />
              </div>
              <button type="submit" suppressHydrationWarning style={{
                width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
                fontSize: 16, fontWeight: 600, color: 'white', cursor: 'pointer',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 58, 23, 0.54)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.3)'; e.currentTarget.style.transform = 'translateY(0px)'; }}
              >
                {submitted ? '✓ Message Sent Successfully!' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

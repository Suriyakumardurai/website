'use client';

import { motion } from 'framer-motion';

const footerLinks = [
  { title: 'Services', links: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'AI Solutions', 'Cloud & DevOps'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Case Studies', 'Contact'] },
  { title: 'Resources', links: ['Documentation', 'Privacy Policy', 'Terms of Service', 'Support', 'FAQ'] },
];

export default function Footer() {
  return (
    <footer style={{ position: 'relative', padding: '80px clamp(20px, 4vw, 80px) 40px' }}>
      {/* Top divider */}
      <div style={{ maxWidth: '80%', height: 1, margin: '0 auto 80px', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18 }}>A</div>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>AutoPlanet</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#9b9bc0', maxWidth: 300, marginBottom: 24 }}>
              Transforming ideas into digital reality. We build the future of the web, one project at a time.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['𝕏', 'in', 'GH', 'IG'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 40, height: 40, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  background: 'rgba(124, 58, 237, 0.06)', border: '1px solid rgba(124, 58, 237, 0.1)',
                  color: '#9b9bc0', textDecoration: 'none', transition: 'all 0.3s',
                }}>{icon}</a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((col, ci) => (
            <motion.div key={ci} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 * (ci + 1) }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 24 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href="#" style={{ fontSize: 14, color: '#9b9bc0', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#c4b5fd'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#9b9bc0'; }}>{link}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 16, borderTop: '1px solid rgba(124, 58, 237, 0.06)' }}>
          <p style={{ fontSize: 12, color: '#5b5b80' }}>© 2024 AutoPlanet. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#5b5b80' }}>Crafted with precision by the AutoPlanet team</p>
        </div>
      </div>
    </footer>
  );
}

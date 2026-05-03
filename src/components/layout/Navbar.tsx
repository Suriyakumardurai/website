'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 300);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          padding: '14px 20px',
        }}
      >
        <nav style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderRadius: 16, padding: '12px 28px',
          background: isScrolled ? 'rgba(3, 0, 20, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
          border: isScrolled ? '1px solid rgba(124, 58, 237, 0.1)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
          transition: 'background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
        }}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 16,
            }}>A</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              AutoPlanet
            </span>
          </a>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  padding: '8px 18px', borderRadius: 10, border: 'none',
                  fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  color: hoveredLink === link.name ? 'white' : '#9b9bc0',
                  background: hoveredLink === link.name ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  transition: 'all 0.25s ease',
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('#contact')}
              style={{
                padding: '10px 24px', borderRadius: 9999, border: 'none',
                fontSize: 13.5, fontWeight: 600, color: 'white', cursor: 'pointer',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(124, 58, 237, 0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
            suppressHydrationWarning
          >
            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }} style={{ display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2 }} />
            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} style={{ display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2 }} />
            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }} style={{ display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2 }} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              paddingTop: 100, paddingLeft: 32, paddingRight: 32,
              background: 'rgba(3, 0, 20, 0.97)',
              backdropFilter: 'blur(40px)',
            }}
            className="md:hidden"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    textAlign: 'left', fontSize: 28, fontWeight: 600,
                    color: 'white', padding: '20px 0', background: 'none', border: 'none',
                    borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
                    cursor: 'pointer',
                  }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollToSection('#contact')}
                style={{
                  marginTop: 32, width: '100%', padding: '18px 0',
                  borderRadius: 16, border: 'none', fontSize: 18, fontWeight: 600,
                  color: 'white', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)',
                }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

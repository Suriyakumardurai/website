'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Brain, Laptop, Smartphone, Palette, Cloud, Zap, ChevronDown, ArrowRight } from 'lucide-react';

const serviceLinks = [
  { name: 'AI Solutions', href: '/services/ai-solutions', icon: <Brain size={18} strokeWidth={1.5} />, desc: 'LLMs, automation & machine learning' },
  { name: 'Web Development', href: '/services/web-development', icon: <Laptop size={18} strokeWidth={1.5} />, desc: 'Next.js, React & full-stack apps' },
  { name: 'Mobile Apps', href: '/services/mobile-apps', icon: <Smartphone size={18} strokeWidth={1.5} />, desc: 'iOS, Android & cross-platform' },
  { name: 'UI/UX Design', href: '/services/ui-ux-design', icon: <Palette size={18} strokeWidth={1.5} />, desc: 'Design systems & prototyping' },
  { name: 'Cloud & DevOps', href: '/services/cloud-devops', icon: <Cloud size={18} strokeWidth={1.5} />, desc: 'AWS, Docker & CI/CD pipelines' },
  { name: 'Performance', href: '/services/performance', icon: <Zap size={18} strokeWidth={1.5} />, desc: 'Speed, SEO & Core Web Vitals' },
];

const otherLinks = [
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomepage = pathname === '/';
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    if (isHomepage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/' + href);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '14px 20px' }}
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 16,
            }}>A</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>AutoPlanet</span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">

            {/* Services Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '8px 18px', borderRadius: 10, border: 'none',
                  fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  color: servicesOpen ? 'white' : '#9b9bc0',
                  background: servicesOpen ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  transition: 'all 0.25s ease',
                }}
              >
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
                      transform: 'translateX(-50%)',
                      width: 440, borderRadius: 16,
                      background: 'rgba(8, 4, 30, 0.97)',
                      backdropFilter: 'blur(30px)',
                      border: '1px solid rgba(124, 58, 237, 0.15)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.05)',
                      padding: '12px',
                      zIndex: 100,
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          style={{ textDecoration: 'none' }}
                        >
                          <motion.div
                            whileHover={{ background: 'rgba(124, 58, 237, 0.1)' }}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 12,
                              padding: '12px 14px', borderRadius: 10,
                              background: 'transparent', cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                          >
                            <div style={{
                              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                              background: 'rgba(124, 58, 237, 0.12)',
                              border: '1px solid rgba(124, 58, 237, 0.2)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#a78bfa',
                            }}>
                              {s.icon}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 3 }}>{s.name}</div>
                              <div style={{ fontSize: 11.5, color: '#6b6b90', lineHeight: 1.4 }}>{s.desc}</div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div style={{ borderTop: '1px solid rgba(124,58,237,0.1)', marginTop: 8, paddingTop: 10, paddingLeft: 4, paddingRight: 4 }}>
                    <button
                        onClick={() => { setServicesOpen(false); handleAnchorClick('#services'); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%',
                          padding: '10px 14px', borderRadius: 10, textDecoration: 'none',
                          color: '#a78bfa', fontSize: 12.5, fontWeight: 600,
                          background: 'rgba(124,58,237,0.06)',
                          transition: 'background 0.2s', border: 'none', cursor: 'pointer',
                          letterSpacing: '0.02em',
                        }}
                      >
                        View all services
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {otherLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleAnchorClick(link.href)}
                style={{
                  padding: '8px 18px', borderRadius: 10, border: 'none',
                  fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  color: '#9b9bc0', background: 'transparent',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9b9bc0'; e.currentTarget.style.background = 'transparent'; }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleAnchorClick('#contact')}
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
              paddingTop: 100, paddingLeft: 24, paddingRight: 24,
              background: 'rgba(3, 0, 20, 0.97)',
              backdropFilter: 'blur(40px)',
              overflowY: 'auto',
            }}
            className="md:hidden"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Services accordion */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  textAlign: 'left', fontSize: 26, fontWeight: 600,
                  color: 'white', padding: '18px 0', background: 'none', border: 'none',
                  borderBottom: '1px solid rgba(124, 58, 237, 0.1)', cursor: 'pointer',
                }}
              >
                Services
                <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }}>
                  <ChevronDown size={20} color="#9b9bc0" />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0 16px 0' }}>
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 16px', borderRadius: 12, textDecoration: 'none',
                            background: 'rgba(124,58,237,0.06)',
                            color: '#c4b5fd', fontSize: 15, fontWeight: 500,
                          }}
                        >
                          <span style={{ color: '#a78bfa' }}>{s.icon}</span>
                          {s.name}
                        </Link>
                      ))}
                      <button
                        onClick={() => { setMobileMenuOpen(false); handleAnchorClick('#services'); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%',
                          padding: '12px 16px', borderRadius: 12, textDecoration: 'none',
                          background: 'rgba(124,58,237,0.12)',
                          color: '#a78bfa', fontSize: 14, fontWeight: 600,
                          marginTop: 4, border: 'none', cursor: 'pointer',
                        }}
                      >
                        View all services <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {otherLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 1) * 0.08 }}
                  onClick={() => handleAnchorClick(link.href)}
                  style={{
                    textAlign: 'left', fontSize: 26, fontWeight: 600,
                    color: 'white', padding: '18px 0', background: 'none', border: 'none',
                    borderBottom: '1px solid rgba(124, 58, 237, 0.1)', cursor: 'pointer',
                  }}
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleAnchorClick('#contact')}
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

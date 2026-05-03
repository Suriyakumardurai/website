'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import BrandLogo from "@/components/layout/BrandLogo";
import { WordReveal, Magnetic } from "@/components/Animate";

export default function NotFound() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <nav>
        <BrandLogo />
        <ul className="nav-links">
          <li><a href="/#about">About</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="/#process">Process</a></li>
          <li><a href="/#faq">FAQ</a></li>
        </ul>
        <a href="/#cta" className="nav-cta">Book a call</a>
      </nav>

      <section id="hero" style={{ 
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        maxWidth: 'none'
      }}>
        <motion.div className="mosaic" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="mosaic-tile" />
          ))}
        </motion.div>
        <div className="mosaic-overlay" />

        <div className="hero-content">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            404 Error — Location Unknown
          </motion.div>

          <h1 className="hero-h1">
            <WordReveal text="Lost in deep space" />
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            The coordinates you&apos;re looking for don&apos;t exist in our galaxy. 
            Let&apos;s get you back to base where we ship real AI products.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Magnetic>
              <a href="/" className="btn-primary">Back to Base <Home size={18} /></a>
            </Magnetic>
            <Magnetic>
              <a href="/#services" className="btn-ghost">Explore Services</a>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

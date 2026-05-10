'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceTemplateProps {
  title: string;
  description: string;
  features: { title: string; description: string; icon: string }[];
  process: { step: string; title: string; description: string }[];
}

export default function ServiceTemplate({ title, description, features, process }: ServiceTemplateProps) {
  return (
    <div className="service-page-wrapper" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Premium Hero */}
      <section className="service-hero" style={{ paddingTop: '180px', paddingBottom: '100px', textAlign: 'center', position: 'relative' }}>
         {/* Subtle background glow */}
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(200, 169, 110, 0.05) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
         
         <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', border: '0.5px solid rgba(200, 169, 110, 0.3)', background: 'rgba(200, 169, 110, 0.05)', color: 'var(--accent)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}
            >
               Premium Service
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', marginBottom: '24px', lineHeight: 1.0, letterSpacing: '-0.02em' }}
            >
              {title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <em key={i} style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{word}</em> : <span key={i}>{word} </span>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
            >
              <Link href="/#contact" className="btn-primary">
                Start Your Project
              </Link>
              <Link href="/#work" className="btn-ghost">
                View Our Work
              </Link>
            </motion.div>
         </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', lineHeight: 1.1 }}>
            Key <em>Capabilities</em>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: '16px', fontSize: '1.1rem' }}>Everything you need to scale and dominate.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-50px' }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               style={{
                 background: 'rgba(255, 255, 255, 0.015)',
                 border: '0.5px solid rgba(200, 169, 110, 0.08)',
                 padding: '48px 40px',
                 borderRadius: '24px',
                 transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                 position: 'relative',
                 overflow: 'hidden'
               }}
               whileHover={{ 
                 borderColor: 'rgba(200, 169, 110, 0.3)', 
                 background: 'rgba(200, 169, 110, 0.04)',
                 transform: 'translateY(-4px)'
               }}
             >
               <div style={{ fontSize: '2.5rem', marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(200,169,110,0.3))' }}>{f.icon}</div>
               <h3 style={{ fontSize: '1.3rem', fontWeight: 400, color: 'var(--white)', marginBottom: '16px', fontFamily: 'var(--font-sans)', letterSpacing: '0.02em' }}>{f.title}</h3>
               <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{f.description}</p>
             </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: '120px 24px', maxWidth: '1000px', margin: '0 auto' }}>
         <div style={{ textAlign: 'center', marginBottom: '80px' }}>
           <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', lineHeight: 1.1 }}>
            Our <em>Process</em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
          {/* Connecting Line */}
          <div style={{ position: 'absolute', left: '28px', top: '24px', bottom: '24px', width: '1px', background: 'linear-gradient(to bottom, rgba(200,169,110,0.5), transparent)', zIndex: 0 }} />
          
          {process.map((p, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: '-50px' }}
               transition={{ delay: i * 0.15, duration: 0.7 }}
               style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', position: 'relative', zIndex: 1, paddingBottom: i !== process.length - 1 ? '64px' : '0' }}
             >
               <div style={{ 
                 width: '56px', height: '56px', borderRadius: '50%', 
                 border: '1px solid rgba(200, 169, 110, 0.4)', 
                 background: 'var(--black)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: 'var(--accent)', fontWeight: 500, flexShrink: 0,
                 fontSize: '1.2rem', fontFamily: 'var(--font-serif)',
                 boxShadow: '0 0 20px rgba(200, 169, 110, 0.1)'
               }}>
                 {p.step}
               </div>
               <div style={{ paddingTop: '8px' }}>
                 <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '12px', fontWeight: 400 }}>{p.title}</h3>
                 <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '1.05rem', maxWidth: '600px' }}>{p.description}</p>
               </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           style={{ 
             background: 'linear-gradient(135deg, rgba(200, 169, 110, 0.1) 0%, rgba(8, 8, 8, 0.8) 100%)',
             border: '0.5px solid rgba(200, 169, 110, 0.2)',
             padding: '80px 40px',
             borderRadius: '32px',
             position: 'relative',
             overflow: 'hidden'
           }}
         >
           <div style={{ position: 'absolute', inset: 0, background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", opacity: 0.03, mixBlendMode: 'overlay' }} />
           
           <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '24px', color: 'var(--white)', position: 'relative', zIndex: 1 }}>
             Ready to <em>elevate</em> your business?
           </h2>
           <p style={{ color: 'var(--muted)', marginBottom: '40px', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px', position: 'relative', zIndex: 1 }}>
             Partner with AutoPlanet to build intelligent, scalable, and stunning digital experiences.
           </p>
           <div style={{ position: 'relative', zIndex: 1 }}>
             <Link href="/#contact" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}>Get in Touch</Link>
           </div>
         </motion.div>
      </section>
    </div>
  );
}

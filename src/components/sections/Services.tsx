'use client';

import { motion } from 'framer-motion';

const services = [
  {
    icon: '💻', title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies for blazing-fast performance and seamless user experiences.',
    features: ['Next.js & React', 'Full-Stack Solutions', 'API Development'],
    color: '#a78bfa',
  },
  {
    icon: '📱', title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver seamless user experiences across all devices and platforms.',
    features: ['React Native', 'iOS & Android', 'App Store Ready'],
    color: '#f472b6',
  },
  {
    icon: '🎨', title: 'UI/UX Design',
    description: 'Human-centered design that transforms complex ideas into intuitive, beautiful interfaces that users love to interact with.',
    features: ['Design Systems', 'Prototyping', 'User Research'],
    color: '#67e8f9',
  },
  {
    icon: '🧠', title: 'AI Solutions',
    description: 'Intelligent automation and AI-powered tools that give your business a competitive edge in the rapidly evolving market.',
    features: ['Machine Learning', 'Chatbots & LLMs', 'Data Analytics'],
    color: '#fbbf24',
  },
  {
    icon: '☁️', title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and CI/CD pipelines for seamless deployment, real-time monitoring, and operations.',
    features: ['AWS & Azure', 'Docker & K8s', 'CI/CD Pipelines'],
    color: '#34d399',
  },
  {
    icon: '⚡', title: 'Performance',
    description: 'Optimization and scaling solutions to ensure your digital products run at peak performance at all times.',
    features: ['Speed Optimization', 'SEO & Core Vitals', 'Load Testing'],
    color: '#fb7185',
  },
];

const cardStyle: React.CSSProperties = {
  background: 'rgba(15, 12, 40, 0.5)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(124, 58, 237, 0.1)',
  borderRadius: 20,
  padding: '36px 32px',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative' as const,
  overflow: 'hidden',
};

export default function Services() {
  return (
    <section id="services" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Background orb */}
      <div style={{ position: 'absolute', width: 600, height: 600, top: '10%', right: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#7c3aed', marginBottom: 20 }}>
            What We Do
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            Services That <span className="gradient-text">Transform</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#9b9bc0', maxWidth: 600, margin: '0 auto' }}>
            From concept to deployment, we provide end-to-end digital solutions
            that help businesses innovate, scale, and dominate their markets.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              style={cardStyle}
              className="group"
              whileHover={{ y: -6, boxShadow: '0 8px 40px rgba(124, 58, 237, 0.15)' }}
            >
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 24,
                background: `${service.color}15`,
                border: `1px solid ${service.color}25`,
              }}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 14, letterSpacing: '-0.02em' }}>
                {service.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#9b9bc0', marginBottom: 24 }}>
                {service.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
                {service.features.map((f, fi) => (
                  <span key={fi} style={{
                    fontSize: 12, padding: '6px 14px', borderRadius: 9999,
                    fontWeight: 500, background: 'rgba(124, 58, 237, 0.08)',
                    color: '#c4b5fd', border: '1px solid rgba(124, 58, 237, 0.12)',
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

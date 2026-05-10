import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services | AutoPlanet",
  description: "Comprehensive digital solutions including AI, Web Development, Cloud Infrastructure, and more.",
};

const servicesList = [
  { href: "/services/ai-solutions", title: "AI Solutions", description: "Intelligent automation and AI-powered tools.", icon: "🧠" },
  { href: "/services/web-development", title: "Web Development", description: "Custom websites and web applications.", icon: "💻" },
  { href: "/services/mobile-apps", title: "Mobile Apps", description: "Native and cross-platform mobile applications.", icon: "📱" },
  { href: "/services/ui-ux-design", title: "UI/UX Design", description: "Human-centered design and beautiful interfaces.", icon: "🎨" },
  { href: "/services/cloud-devops", title: "Cloud & DevOps", description: "Scalable cloud infrastructure and CI/CD.", icon: "☁️" },
  { href: "/services/performance", title: "Performance", description: "Optimization and scaling solutions.", icon: "⚡" },
];

export default function ServicesIndexPage() {
  return (
    <div className="service-page-wrapper" style={{ minHeight: '100vh', padding: '180px 24px 80px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', color: 'var(--white)', marginBottom: '24px', lineHeight: 1.1 }}>
          Our <em>Services</em>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          End-to-end digital solutions engineered to give your business an unfair advantage.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {servicesList.map((s, i) => (
          <Link href={s.href} key={i} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.015)',
              border: '0.5px solid rgba(200, 169, 110, 0.08)',
              padding: '40px 32px',
              borderRadius: '24px',
              height: '100%',
              transition: 'all 0.4s ease',
              display: 'flex',
              flexDirection: 'column'
            }} className="group hover:bg-[rgba(200,169,110,0.04)] hover:border-[rgba(200,169,110,0.3)] hover:-translate-y-1">
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{s.icon}</div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '12px', fontWeight: 500 }}>{s.title}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{s.description}</p>
              <div style={{ marginTop: 'auto', paddingTop: '24px', color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Explore Service →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

export default function Marquee() {
  const items = ['Next.js', 'React', 'TypeScript', 'Python', 'AI / ML', 'AWS', 'Node.js', 'Three.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL'];

  return (
    <div style={{
      position: 'relative', padding: '24px 0', overflow: 'hidden',
      borderTop: '1px solid rgba(124, 58, 237, 0.06)',
      borderBottom: '1px solid rgba(124, 58, 237, 0.06)',
    }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 150, zIndex: 2, background: 'linear-gradient(90deg, #030014, transparent)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 150, zIndex: 2, background: 'linear-gradient(270deg, #030014, transparent)' }} />

      <div className="animate-marquee" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{ margin: '0 32px', fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.01em' }}>
            {item}
            <span className="gradient-text" style={{ display: 'inline-block', margin: '0 32px', fontSize: 10 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';
import PageNavbar from '@/components/layout/PageNavbar';
import PageFooter from '@/components/layout/PageFooter';

export const metadata: Metadata = {
  title: 'AutoPlanet Engineering Blog | AI Automation Deep Dives',
  description: 'No fluff. No "10 tips" listicles. Raw engineering breakdowns of how we build AI systems that actually work. Updated weekly.',
  keywords: ['ai engineering', 'llm development', 'ai saas', 'automation', 'machine learning', 'artificial intelligence', 'enterprise ai'],
  openGraph: {
    title: 'AutoPlanet Engineering Blog | AI Automation Deep Dives',
    description: 'Raw engineering breakdowns of how we build AI systems that actually work. Updated weekly.',
    type: 'website',
    url: 'https://autoplanetcorp.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoPlanet Engineering Blog',
    description: 'Raw engineering breakdowns of how we build AI systems that actually work. Updated weekly.',
  },
  alternates: {
    canonical: 'https://autoplanetcorp.com/blog',
  },
};

export default function BlogPage() {
  return (
    <>
    <PageNavbar />
    <div className="page-hero">
      <div style={{ marginBottom: "40px" }}>
        <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>Home</Link>
        <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>Blog</span>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
        <span style={{ width: "20px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
        Engineering Insights
      </div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.05, color: "var(--white)", marginBottom: "1.5rem" }}>
        Engineering Blog
      </h1>
      <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: "650px" }}>
        Deep dives into how we architect and ship production AI systems. No fluff — just engineering.
      </p>
    </div>
    <div style={{ paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>

      <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <article className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginBottom: '1rem' }}>
                {post.category}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: '1rem', lineHeight: 1.3, fontWeight: 400 }}>
                {post.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.9rem', flex: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={12} /> {post.author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {post.readTime}</span>
                </div>
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>Read <ArrowRight size={14} /></span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="page-cta-block" style={{ marginTop: '5rem' }}>
        <h2>Have a project in mind?</h2>
        <p>We write about what we build. If something here resonated, let&apos;s talk about applying it to your business.</p>
        <Link href="/contact" className="btn-primary" style={{ position: 'relative', zIndex: 1 }}>Let&apos;s talk <ArrowRight size={18} /></Link>
      </div>
    </div>
    <PageFooter />
    </>
  );
}
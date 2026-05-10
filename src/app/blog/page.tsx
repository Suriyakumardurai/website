import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Clock, User, Calendar } from 'lucide-react';

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
};

export default function BlogPage() {
  return (
    <div className="blog-page" style={{ paddingTop: '140px', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="blog-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '24px', lineHeight: '1.1' }}>
          Engineering Blog
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto' }}>
          Raw engineering breakdowns of how we build AI systems that actually work. Updated weekly.
        </p>
      </div>

      <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-card" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="blog-card-content" style={{ padding: '30px' }}>
              <div className="category-tag" style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px' }}>
                {post.category}
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '16px', lineHeight: '1.3' }}>
                <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px', lineHeight: '1.6' }}>
                {post.excerpt}
              </p>
              <div className="post-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={12} /> {post.author}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={12} /> {post.date}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12} /> {post.readTime} read</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="blog-cta" style={{ marginTop: '80px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '24px', padding: '60px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', marginBottom: '16px', fontSize: '2rem' }}>Stay ahead of the AI curve</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
          Get cutting-edge AI engineering insights delivered to your inbox every week.
        </p>
        <a href="#newsletter" className="btn-primary" style={{ display: 'inline-block' }}>Subscribe to newsletter</a>
      </div>
    </div>
  );
}
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';

interface Props {
  params: { slug: string };
}

interface FAQItem {
  q: string;
  a: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  // FAQ Schema for Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((item: FAQItem) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <article className="blog-post-container" style={{ paddingTop: '140px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <a href="/blog" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '40px', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to blog
      </a>

      <header className="post-header" style={{ marginBottom: '60px' }}>
        <div className="category-tag" style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px' }}>
          {post.category}
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '24px', lineHeight: '1.1' }}>
          {post.title}
        </h1>

        <div className="post-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {post.author}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {post.date}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {post.readTime} read</div>
        </div>
      </header>

      <div
        className="post-content blog-rich-text"
        style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '1.1rem' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section className="post-faq" style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ color: 'white', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        {post.faq.map((item: FAQItem, i: number) => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '12px' }}>{item.q}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{item.a}</p>
          </div>
        ))}
      </section>

      <div className="post-cta" style={{ marginTop: '80px', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>Ready to build your {post.category.toLowerCase()} solution?</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          Book a free 30-minute architecture review with our lead engineers.
        </p>
        <a href="/contact" className="btn-primary">Book a free call</a>
      </div>
    </article>
  );
}
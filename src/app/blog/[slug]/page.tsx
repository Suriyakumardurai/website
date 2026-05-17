import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { Clock, User, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import PageNavbar from '@/components/layout/PageNavbar';
import PageFooter from '@/components/layout/PageFooter';

interface FAQItem {
  q: string;
  a: string;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://autoplanetcorp.com/blog/${slug}`,
    },
    alternates: {
      canonical: `https://autoplanetcorp.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return notFound();
  }

  // BlogPosting Schema for Rich Snippets
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "AutoPlanet Corporation",
      "url": "https://autoplanetcorp.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://autoplanetcorp.com/blog/${slug}`
    },
    "keywords": post.keywords.join(', ')
  };

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
    <>
    <PageNavbar />
    <article className="blog-post-container" style={{ paddingTop: '140px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '40px', fontSize: '0.85rem', transition: 'color 0.2s' }}>
        <ArrowLeft size={16} /> Back to blog
      </Link>

      <header className="post-header" style={{ marginBottom: '60px' }}>
        <div style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', marginBottom: '1rem' }}>
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

      <div className="page-cta-block" style={{ marginTop: '5rem' }}>
        <h2>Ready to build your {post.category.toLowerCase()} solution?</h2>
        <p>Book a free 30-minute architecture review with our lead engineers.</p>
        <Link href="/contact" className="btn-primary" style={{ position: 'relative', zIndex: 1 }}>Book a free call <ArrowRight size={18} /></Link>
      </div>
    </article>
    <PageFooter />
    </>
  );
}
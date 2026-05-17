// src/app/blog/layout.tsx
import type { Metadata } from "next";

const blogBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://autoplanetcorp.com/blog" },
  ],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }} />
      {children}
    </>
  );
}
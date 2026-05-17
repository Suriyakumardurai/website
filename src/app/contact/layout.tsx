// src/app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact AutoPlanet Corporation | Book a Free AI Consultation",
  description: "Get in touch with AutoPlanet Corporation. Book a free 30-minute AI consultation call, email us at sales@autoplanetcorp.com, or connect on LinkedIn, Twitter, and Instagram.",
  keywords: ["contact autoplanet", "ai consultation", "book ai call", "ai development inquiry", "autoplanet email"],
  openGraph: {
    title: "Contact AutoPlanet Corporation",
    description: "Book a free 30-minute AI consultation. Email: sales@autoplanetcorp.com",
    type: "website",
    url: "https://autoplanetcorp.com/contact",
    siteName: "AutoPlanet Corporation",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact AutoPlanet Corporation",
    description: "Book a free AI consultation. Email: sales@autoplanetcorp.com",
  },
  alternates: {
    canonical: "https://autoplanetcorp.com/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact AutoPlanet Corporation",
  "url": "https://autoplanetcorp.com/contact",
  "description": "Book a free 30-minute AI consultation with AutoPlanet Corporation.",
  "mainEntity": {
    "@type": "Organization",
    "name": "AutoPlanet Corporation",
    "email": "sales@autoplanetcorp.com",
    "telephone": "+91-7904914455",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Villupuram",
      "addressRegion": "Tamil Nadu",
      "postalCode": "605602",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-7904914455",
        "contactType": "sales",
        "email": "sales@autoplanetcorp.com",
        "availableLanguage": ["English", "Tamil"],
        "areaServed": "IN"
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://autoplanetcorp.com" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://autoplanetcorp.com/contact" }
    ]
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      {children}
    </>
  );
}
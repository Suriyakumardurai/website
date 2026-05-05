import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorBlob from "@/components/CursorBlob";
import FaviconAnimation from "../components/FaviconAnimation";
import SmartPreconnect from "@/components/SmartPreconnect";
import NoscriptFallbacks from "@/components/NoscriptFallbacks";
import { IntentSatisfier } from "@/components/IntentSatisfier";
import { emotionalMeta } from "@/lib/seo/emotional-meta";
import { ResourceOrchestrator } from "@/components/ResourceOrchestrator";
import { generateKnowledgePanelSeed } from "@/lib/seo/knowledge-panel-seed";
import { getFreshnessLabel } from "@/lib/seo/freshness-engine";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://autoplanetcorp.com'),
  title: {
    default: emotionalMeta['/'].title,
    template: "%s | AutoPlanet Corporation",
  },
  description: emotionalMeta['/'].description,
  keywords: ["Enterprise AI Solutions", "Autonomous Workflows", "AI Automation India", "Corporate AI SaaS", "AutoPlanet Corporation", "Digital Transformation"],
  alternates: {
    canonical: "https://autoplanetcorp.com",
    languages: {
      'en-IN': 'https://autoplanetcorp.com',
      'en': 'https://autoplanetcorp.com',
      'x-default': 'https://autoplanetcorp.com',
    },
  },
  openGraph: {
    title: "AutoPlanet Corporation",
    description: "AI-Powered Automation & Solutions for Your Business",
    url: "https://autoplanetcorp.com",
    siteName: "AutoPlanet Corporation",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AutoPlanet Corporation - AI-Powered Automation for Your Business",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ceoofautoplanet",
    creator: "@ceoofautoplanet",
    title: "AutoPlanet Corporation",
    description: "AI-Powered Automation & Solutions for Your Business",
    images: ["/logo.png"],
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Villupuram',
    'geo.position': '11.9401;79.4861',
    'ICBM': '11.9401, 79.4861',
    'content-language': 'en',
    'theme-color': '#080808',
    'color-scheme': 'dark',
    'format-detection': 'telephone=yes',
  },
  applicationName: 'AutoPlanet Corporation',
  category: 'Technology',
  classification: 'Business',
  verification: {
    google: 'your-google-verification-code', // User should replace this
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AutoPlanet Corporation",
  "url": "https://autoplanetcorp.com",
  "logo": "https://autoplanetcorp.com/logo.png",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Suriya"
  },
  "sameAs": [
    "https://www.linkedin.com/company/autoplanet-corporation",
    "https://x.com/ceoofautoplanet",
    "https://www.instagram.com/autoplanet.corp"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7904914455",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Tamil"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Villupuram",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "IN"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://autoplanetcorp.com"
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "AutoPlanet Corporation",
  "image": "https://autoplanetcorp.com/logo.png",
  "url": "https://autoplanetcorp.com",
  "telephone": "+91-7904914455",
  "email": "ceo@autoplanetcorp.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Villupuram",
    "addressLocality": "Villupuram",
    "addressRegion": "Tamil Nadu",
    "postalCode": "605602",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.9401,
    "longitude": 79.4861
  },
  "areaServed": [
    { "@type": "City", "name": "Villupuram" },
    { "@type": "City", "name": "Chennai" },
    { "@type": "City", "name": "Bangalore" },
    { "@type": "State", "name": "Tamil Nadu" },
    { "@type": "Country", "name": "India" }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7904914455",
    "contactType": "CEO / Customer Service",
    "email": "ceo@autoplanetcorp.com",
    "areaServed": "IN",
    "availableLanguage": ["English", "Tamil"]
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "12"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marcus T." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "AutoPlanet built our entire AI support agent in 3 weeks. ROI was instant."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Priya R." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Shipped a working SaaS with AI at its core in under 6 weeks. Insane execution speed."
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/autoplanet-corporation",
    "https://x.com/ceoofautoplanet",
    "https://www.instagram.com/autoplanet.corp"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a typical project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most AI agent builds and integrations ship within 2–4 weeks. Full SaaS products take 6–10 weeks. We move fast."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with early-stage startups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We work with founders from pre-product to Series B. Some of our best work started as napkin ideas."
      }
    },
    {
      "@type": "Question",
      "name": "Which AI models do you work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPT-4o, Claude 3.5, Gemini, Mistral, Llama 3 — model agnostic. We recommend what's right for your use case and budget."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer ongoing support after launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every project comes with 30-day post-launch support. We also do monthly retainers for ongoing AI development."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate AI into our existing product?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. That's one of our most common engagements — from 10-year-old Rails apps to modern Next.js products."
      }
    }
  ]
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Automation & SaaS Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "AutoPlanet Corporation"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom LLM Development",
          "description": "Fine-tuned models, RAG pipelines, and prompt architectures."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI SaaS Product Development",
          "description": "End-to-end product builds from idea to deployed SaaS."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Workflow Automation",
          "description": "Intelligent pipelines for sales, operations, and marketing."
        }
      }
    ]
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AutoPlanet AI Suite",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "description": "Contact for enterprise pricing"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "47",
    "bestRating": "5"
  },
  "author": {
    "@type": "Organization",
    "name": "AutoPlanet Corporation"
  }
};

const entityGraphSchema = generateKnowledgePanelSeed();

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "AutoPlanet Corporation",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".hero-headline",
      ".section-sub",
      ".service-featured-content"
    ]
  },
  "url": "https://autoplanetcorp.com"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" dir="ltr" className={`${instrumentSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <ResourceOrchestrator route="/" />
        <SmartPreconnect />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Context File" />
        <link rel="alternate" href="/llms-full.txt" type="text/plain" title="LLM Full Context" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraphSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="glow-orb glow-1" aria-hidden="true" />
        <div className="glow-orb glow-2" aria-hidden="true" />
        <NoscriptFallbacks />
        <IntentSatisfier />
        <SmoothScroll>
          <FaviconAnimation />
          <CursorBlob />
          {children}
          <div className="freshness-footer" style={{ textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {getFreshnessLabel()}
          </div>
          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}

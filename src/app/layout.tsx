import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorBlob from "@/components/CursorBlob";
import FaviconAnimation from "../components/FaviconAnimation";

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
  title: "AutoPlanet Corporation | AI-Powered Automation for Your Business",
  description: "AutoPlanet Corporation builds elite AI-powered solutions to automate workflows, reduce costs, and accelerate growth for modern businesses.",
  keywords: ["Enterprise AI Solutions", "Autonomous Workflows", "AI Automation India", "Corporate AI SaaS", "AutoPlanet Corporation", "Digital Transformation"],
  alternates: {
    canonical: "https://autoplanetcorp.com",
  },
  openGraph: {
    title: "AutoPlanet Corporation",
    description: "AI-Powered Automation & Solutions for Your Business",
    url: "https://autoplanetcorp.com",
    siteName: "AutoPlanet Corporation",
    images: [
      {
        url: "https://autoplanetcorp.com/logo.png",
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
    description: "AI-Powered Automation & Solutions for Indian SMBs",
    images: ["https://autoplanetcorp.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="glow-orb glow-1" aria-hidden="true" />
        <div className="glow-orb glow-2" aria-hidden="true" />
        <SmoothScroll>
          <FaviconAnimation />
          <CursorBlob />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

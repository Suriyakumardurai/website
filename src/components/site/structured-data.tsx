import { SITE_CONFIG } from "@/lib/site";

/**
 * Comprehensive JSON-LD structured data for maximum SEO + LLM crawlability.
 * - Organization (expanded with brand aliases, geo, hours, aggregateRating)
 * - ProfessionalService (service business schema)
 * - WebSite (with SearchAction)
 * - Offers (pricing tiers)
 * - Brand schema
 */

export function GlobalStructuredData() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "Corporation"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: ["AutoPlanet", "APC", "AutoPlanet Corp", "AutoPlanet Corporation", "autoplanetcorp"],
    legalName: "AutoPlanet Corporation",
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/google-search-icon.png`,
      width: 512,
      height: 512,
      caption: "AutoPlanet Corporation — AI-Powered Automation | Solutions",
    },
    image: `${SITE_CONFIG.url}/google-search-icon.png`,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    description: SITE_CONFIG.description,
    slogan: "Enterprise AI, engineered to ship.",
    foundingDate: "2024",
    founders: [{ "@type": "Person", name: "Suriya" }],
    numberOfEmployees: { "@type": "QuantitativeValue", value: "11-50" },
    knowsLanguage: ["en"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "TN",
      addressLocality: "Villupuram",
      postalCode: "605602",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.9401,
      longitude: 79.4861,
    },
    areaServed: [{ "@type": "Place", name: "Worldwide" }],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹",
    currenciesAccepted: "INR, USD, EUR",
    paymentAccepted: "Bank Transfer, Stripe, Credit Card",
    sameAs: [
      SITE_CONFIG.linkedin,
      SITE_CONFIG.instagram,
      "https://x.com/ceoofautoplanet",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.phone,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE_CONFIG.email,
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Large Language Models",
      "AI Agents",
      "Autonomous Agents",
      "Workflow Automation",
      "Custom LLM Development",
      "RAG Pipelines",
      "Retrieval Augmented Generation",
      "Enterprise AI",
      "AI SaaS Development",
      "Machine Learning",
      "Computer Vision",
      "Predictive Analytics",
      "AI Strategy",
      "AI Consulting",
      "LLM Fine-tuning",
      "Prompt Engineering",
      "AI Integration",
      "VPC AI Deployment",
      "Data Sovereignty",
      "MLOps",
      "Generative AI",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Capabilities",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agents" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom LLM Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI SaaS Products" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workflow Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integrations" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Apps" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Computer Vision" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Predictive Analytics" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Security" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Strategy Consulting" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "40",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    alternateName: "AutoPlanet",
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${SITE_CONFIG.url}/#brand`,
    name: SITE_CONFIG.name,
    alternateName: ["AutoPlanet", "APC"],
    logo: `${SITE_CONFIG.url}/google-search-icon.png`,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    slogan: "Enterprise AI, engineered to ship.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }} />
    </>
  );
}

/** BreadcrumbList JSON-LD */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/** Service ItemList JSON-LD */
export function ServiceListJsonLd({ services }: { services: { name: string; description: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Capabilities",
    description: "Fourteen enterprise AI capabilities offered by AutoPlanet Corporation.",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@id": `${SITE_CONFIG.url}/#organization` },
        areaServed: "Worldwide",
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/** FAQPage JSON-LD */
export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

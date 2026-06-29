// Central site config for SEO + canonical URLs
// In production, set NEXT_PUBLIC_SITE_URL=https://autoplanetcorp.com
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://autoplanetcorp.com";

export const SITE_CONFIG = {
  url: SITE_URL,
  name: "AutoPlanet Corporation",
  shortName: "AutoPlanet",
  description:
    "AutoPlanet Corporation is an AI-native engineering team that ships production-ready AI systems for enterprise. Custom LLMs, autonomous agents, workflow automation, and full SaaS builds. 100% code ownership.",
  email: "sales@autoplanetcorp.com",
  phone: "+91 7904914455",
  logo: "/autoplanet-logo.png",
  twitter: "@ceoofautoplanet",
  linkedin: "https://linkedin.com/company/autoplanet-corporation",
  instagram: "https://instagram.com/autoplanet.corp",
  // All routes for sitemap + internal linking
  routes: [
    { path: "/", priority: 1.0, changefreq: "weekly" },
    { path: "/services", priority: 0.9, changefreq: "monthly" },
    { path: "/process", priority: 0.8, changefreq: "monthly" },
    { path: "/pricing", priority: 0.9, changefreq: "monthly" },
    { path: "/about", priority: 0.7, changefreq: "monthly" },
    { path: "/careers", priority: 0.7, changefreq: "weekly" },
    { path: "/faq", priority: 0.6, changefreq: "monthly" },
    { path: "/contact", priority: 0.8, changefreq: "monthly" },
  ],
};

export type RouteEntry = (typeof SITE_CONFIG.routes)[number];

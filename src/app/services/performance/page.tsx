import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";

export const metadata: Metadata = {
  title: "Performance Optimization | AutoPlanet",
  description: "Optimization and scaling solutions to ensure your digital products run at peak performance at all times.",
  keywords: ["performance optimization", "core web vitals", "speed optimization", "load testing", "seo"],
  openGraph: {
    title: "Performance Optimization - AutoPlanet",
    description: "Make your web applications blazingly fast.",
    type: "website",
    url: "https://autoplanetcorp.com/services/performance",
    siteName: "AutoPlanet Corporation",
    locale: "en_US",
  },
};

const features = [
  { icon: "🏎️", title: "Core Web Vitals", description: "Meticulous optimization of LCP, FID, and CLS to ensure you pass Google's performance metrics with flying colors." },
  { icon: "🖼️", title: "Asset Optimization", description: "Advanced image compression, lazy loading, and modern format (WebP/AVIF) implementation to slash load times." },
  { icon: "🗜️", title: "Code Minification", description: "Aggressive reduction of JavaScript and CSS payloads, removing dead code, and optimizing bundle delivery." },
  { icon: "🌐", title: "Edge Caching", description: "Strategic implementation of Content Delivery Networks (CDNs) to serve your content instantaneously worldwide." },
  { icon: "🧪", title: "Load Testing", description: "Simulating massive traffic spikes to identify bottlenecks and ensure your application remains stable under pressure." },
  { icon: "🛠️", title: "Database Tuning", description: "Optimizing queries, implementing indexing strategies, and caching layers to drastically reduce backend latency." },
];

const process = [
  { step: "01", title: "Performance Audit", description: "We conduct a comprehensive analysis of your current application, identifying exactly what is slowing it down." },
  { step: "02", title: "Strategy & Prioritization", description: "Creating an actionable roadmap, prioritizing the quick wins and high-impact optimizations." },
  { step: "03", title: "Implementation", description: "Our engineers execute the optimizations, refactoring code and tweaking infrastructure for maximum speed." },
  { step: "04", title: "Validation", description: "Rigorous testing to confirm improvements, ensuring no regressions and measuring the impact on Core Web Vitals." },
  { step: "05", title: "Continuous Monitoring", description: "Setting up real-user monitoring (RUM) to track performance metrics over time and prevent future degradation." },
];

export default function PerformancePage() {
  return (
    <ServiceTemplate 
      title="Performance Optimization"
      description="Transform sluggish applications into lightning-fast experiences that improve conversion rates, boost SEO rankings, and delight your users."
      features={features}
      process={process}
    />
  );
}
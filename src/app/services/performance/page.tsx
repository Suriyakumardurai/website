import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";
import { Timer, ImagePlay, FileCode2, Globe2, FlaskConical, DatabaseZap, Brain, Laptop, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Performance Optimization | AutoPlanet",
  description: "Optimization and scaling solutions to ensure your digital products run at peak performance at all times.",
  openGraph: {
    title: "Performance Optimization | AutoPlanet",
    description: "Make your web applications blazingly fast.",
    type: "website",
    url: "https://autoplanetcorp.com/services/performance",
    siteName: "AutoPlanet Corporation",
  },
};

const features = [
  { icon: <Timer size={22} strokeWidth={1.5} />, title: "Core Web Vitals", description: "Meticulous optimization of LCP, FID, and CLS to ensure you pass Google's performance metrics with flying colors." },
  { icon: <ImagePlay size={22} strokeWidth={1.5} />, title: "Asset Optimization", description: "Advanced image compression, lazy loading, and modern format (WebP/AVIF) implementation to slash load times." },
  { icon: <FileCode2 size={22} strokeWidth={1.5} />, title: "Code Minification", description: "Aggressive reduction of JavaScript and CSS payloads, removing dead code, and optimizing bundle delivery." },
  { icon: <Globe2 size={22} strokeWidth={1.5} />, title: "Edge Caching", description: "Strategic implementation of Content Delivery Networks (CDNs) to serve your content instantaneously worldwide." },
  { icon: <FlaskConical size={22} strokeWidth={1.5} />, title: "Load Testing", description: "Simulating massive traffic spikes to identify bottlenecks and ensure your application remains stable under pressure." },
  { icon: <DatabaseZap size={22} strokeWidth={1.5} />, title: "Database Tuning", description: "Optimizing queries, implementing indexing strategies, and caching layers to drastically reduce backend latency." },
];

const process = [
  { step: "01", title: "Performance Audit", description: "We conduct a comprehensive analysis of your current application, identifying exactly what is slowing it down." },
  { step: "02", title: "Strategy & Prioritization", description: "Creating an actionable roadmap, prioritizing the quick wins and high-impact optimizations." },
  { step: "03", title: "Implementation", description: "Our engineers execute the optimizations, refactoring code and tweaking infrastructure for maximum speed." },
  { step: "04", title: "Validation", description: "Rigorous testing to confirm improvements, ensuring no regressions and measuring the impact on Core Web Vitals." },
  { step: "05", title: "Continuous Monitoring", description: "Setting up real-user monitoring (RUM) to track performance metrics over time and prevent future degradation." },
];

const stats = [
  { value: "3×", label: "Avg. page speed improvement" },
  { value: "100", label: "PageSpeed Insights target" },
  { value: "60%", label: "Avg. bundle size reduction" },
  { value: "1 wk", label: "Avg. audit-to-fix turnaround" },
];

const relatedServices = [
  { title: "Web Development", href: "/services/web-development", icon: <Laptop size={16} strokeWidth={1.5} /> },
  { title: "Cloud & DevOps", href: "/services/cloud-devops", icon: <Cloud size={16} strokeWidth={1.5} /> },
  { title: "AI Solutions", href: "/services/ai-solutions", icon: <Brain size={16} strokeWidth={1.5} /> },
];

export default function PerformancePage() {
  return (
    <ServiceTemplate
      title="Performance Optimization"
      tagline="A 1-second delay in page load costs you 7% of conversions. We treat speed as a product feature, not an afterthought."
      description="Transform sluggish applications into lightning-fast experiences that improve conversion rates, boost SEO rankings, and delight your users."
      features={features}
      process={process}
      stats={stats}
      relatedServices={relatedServices}
    />
  );
}
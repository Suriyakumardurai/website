import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";

export const metadata: Metadata = {
  title: "Web Development Services | AutoPlanet",
  description: "Custom websites and web applications built with cutting-edge technologies for blazing-fast performance and seamless user experiences.",
  keywords: ["web development", "nextjs", "react", "full-stack", "web applications"],
  openGraph: {
    title: "Professional Web Development Services - AutoPlanet",
    description: "Expert web development solutions with cutting-edge performance optimization",
    type: "website",
    url: "https://autoplanetcorp.com/services/web-development",
    siteName: "AutoPlanet Corporation",
    locale: "en_US",
  },
};

const features = [
  { icon: "⚡", title: "Blazing Fast Performance", description: "Optimized for speed and Core Web Vitals to ensure instantaneous load times and higher search rankings." },
  { icon: "⚛️", title: "Modern Tech Stack", description: "Built with Next.js, React, and cutting-edge tools for unmatched scalability, security, and developer experience." },
  { icon: "📱", title: "Responsive by Design", description: "Flawless experiences across all devices, from ultra-wide desktop monitors to the smallest mobile screens." },
  { icon: "🔐", title: "Enterprise Security", description: "Robust security architectures protecting your data and your users from modern web vulnerabilities." },
  { icon: "🔌", title: "Seamless Integrations", description: "Custom API development and third-party integrations to connect your platform with the tools you need." },
  { icon: "📈", title: "SEO Optimized", description: "Built-in technical SEO best practices to ensure your digital presence is highly visible to your target audience." },
];

const process = [
  { step: "01", title: "Architecture & Planning", description: "We define the technical foundation, select the optimal stack, and map out the data structures required for your application." },
  { step: "02", title: "Frontend Engineering", description: "Our developers translate design into pixel-perfect, interactive user interfaces with smooth animations and intuitive flows." },
  { step: "03", title: "Backend Systems", description: "We build scalable, secure, and performant server-side architectures to power your application's logic and data management." },
  { step: "04", title: "Quality Assurance", description: "Rigorous testing across browsers, devices, and network conditions to guarantee a flawless user experience." },
  { step: "05", title: "Deployment & Scaling", description: "Zero-downtime deployment pipelines and infrastructure configuration to handle traffic spikes and global scale." },
];

export default function WebDevelopmentPage() {
  return (
    <ServiceTemplate 
      title="Web Development"
      description="Architecting and engineering high-performance web applications that deliver exceptional user experiences and drive measurable business results."
      features={features}
      process={process}
    />
  );
}
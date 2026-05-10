import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";

export const metadata: Metadata = {
  title: "AI Solutions | AutoPlanet - Intelligent Automation & LLMs",
  description: "Intelligent automation and AI-powered tools that give your business a competitive edge in the rapidly evolving market.",
  keywords: ["ai solutions", "machine learning", "chatbots", "llm development", "data analytics", "artificial intelligence", "ai integration", "intelligent automation", "enterprise ai"],
  openGraph: {
    title: "AI Solutions | AutoPlanet - Intelligent Automation & LLMs",
    description: "Intelligent automation and AI-powered tools that give your business a competitive edge in the rapidly evolving market.",
    type: "website",
    url: "https://autoplanetcorp.com/services/ai-solutions",
    siteName: "AutoPlanet Corporation",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions - AutoPlanet",
    description: "Intelligent automation and AI-powered tools that give your business a competitive edge.",
  },
};

const features = [
  { icon: "🤖", title: "Custom LLM Development", description: "Tailored language models trained on your proprietary data to automate workflows and enhance decision-making." },
  { icon: "🧠", title: "Machine Learning Solutions", description: "Predictive analytics and intelligent algorithms that uncover hidden patterns and optimize your business operations." },
  { icon: "💬", title: "Conversational AI Agents", description: "Next-generation chatbots and virtual assistants that provide human-like customer support 24/7." },
  { icon: "⚙️", title: "Intelligent Process Automation", description: "End-to-end automation of complex, multi-step processes using AI to reduce errors and increase efficiency." },
  { icon: "👁️", title: "Computer Vision", description: "Advanced image and video analysis systems for quality control, security, and automated data extraction." },
  { icon: "📊", title: "Predictive Analytics", description: "Transform raw data into actionable insights, forecasting trends and driving strategic business growth." },
];

const process = [
  { step: "01", title: "Discovery & Strategy", description: "We analyze your business processes, identify AI opportunities, and develop a comprehensive integration strategy aligned with your goals." },
  { step: "02", title: "Data Preparation", description: "Our experts gather, clean, and structure your data to ensure it's optimized for training robust and accurate AI models." },
  { step: "03", title: "Model Development", description: "We design, build, and fine-tune custom AI models, employing the latest architectures to achieve optimal performance." },
  { step: "04", title: "Integration & Deployment", description: "Seamless integration of AI capabilities into your existing systems, ensuring a smooth transition and immediate value creation." },
  { step: "05", title: "Monitoring & Optimization", description: "Continuous monitoring, retraining, and optimization of AI models to maintain accuracy and adapt to evolving business needs." },
];

export default function AISolutionsPage() {
  return (
    <ServiceTemplate 
      title="AI Solutions"
      description="Leverage the power of artificial intelligence to automate workflows, uncover insights, and build a sustainable competitive advantage in the rapidly evolving market."
      features={features}
      process={process}
    />
  );
}
import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";

export const metadata: Metadata = {
  title: "Cloud & DevOps Solutions | AutoPlanet",
  description: "Scalable cloud infrastructure and CI/CD pipelines for seamless deployment, real-time monitoring, and operations.",
  keywords: ["cloud infrastructure", "devops", "ci/cd", "aws", "azure", "kubernetes"],
  openGraph: {
    title: "Cloud & DevOps Solutions - AutoPlanet",
    description: "Enterprise-grade cloud architecture and continuous integration.",
    type: "website",
    url: "https://autoplanetcorp.com/services/cloud-devops",
    siteName: "AutoPlanet Corporation",
    locale: "en_US",
  },
};

const features = [
  { icon: "☁️", title: "Cloud Architecture", description: "Design and implement highly available, fault-tolerant infrastructures on AWS, Azure, or Google Cloud." },
  { icon: "🔄", title: "CI/CD Pipelines", description: "Automated testing and deployment workflows that drastically reduce time-to-market and deployment anxiety." },
  { icon: "🐳", title: "Containerization", description: "Docker and Kubernetes orchestration for unparalleled scalability and consistent environments from dev to prod." },
  { icon: "🛡️", title: "DevSecOps", description: "Security integrated directly into the development lifecycle, ensuring compliance and robust threat protection." },
  { icon: "📊", title: "Monitoring & Alerting", description: "Comprehensive observability stacks (Prometheus, Grafana, ELK) for real-time insights into system health." },
  { icon: "📉", title: "Cost Optimization", description: "Strategic resource allocation and serverless architectures to maximize performance while minimizing cloud spend." },
];

const process = [
  { step: "01", title: "Infrastructure Audit", description: "We review your current setup, identify bottlenecks, security vulnerabilities, and areas for optimization." },
  { step: "02", title: "Architecture Design", description: "Designing a robust, scalable cloud topology tailored to your specific application requirements and traffic patterns." },
  { step: "03", title: "Automation Engineering", description: "Writing Infrastructure as Code (IaC) using Terraform or CloudFormation to make your environment reproducible." },
  { step: "04", title: "Pipeline Integration", description: "Setting up continuous integration and deployment workflows to automate testing and release processes." },
  { step: "05", title: "Ongoing Operations", description: "24/7 monitoring, incident response, and continuous optimization of your cloud environment." },
];

export default function CloudDevOpsPage() {
  return (
    <ServiceTemplate 
      title="Cloud & DevOps"
      description="Modernize your infrastructure, automate your workflows, and scale with confidence using our enterprise-grade cloud engineering and DevOps solutions."
      features={features}
      process={process}
    />
  );
}
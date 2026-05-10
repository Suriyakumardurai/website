import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";

export const metadata: Metadata = {
  title: "UI/UX Design Services | AutoPlanet",
  description: "Human-centered design that transforms complex ideas into intuitive, beautiful interfaces that users love to interact with.",
  keywords: ["ui/ux design", "user interface", "user experience", "design systems", "prototyping"],
  openGraph: {
    title: "UI/UX Design Services - AutoPlanet",
    description: "Premium digital product design for web and mobile.",
    type: "website",
    url: "https://autoplanetcorp.com/services/ui-ux-design",
    siteName: "AutoPlanet Corporation",
    locale: "en_US",
  },
};

const features = [
  { icon: "🎯", title: "User-Centric Approach", description: "Design decisions driven by deep user research, behavioral psychology, and rigorous usability testing." },
  { icon: "✨", title: "Premium Aesthetics", description: "Cinematic, high-end visual design that elevates your brand identity and commands immediate trust." },
  { icon: "🧩", title: "Design Systems", description: "Comprehensive, scalable component libraries that ensure consistency across all your digital touchpoints." },
  { icon: "🎬", title: "Micro-Interactions", description: "Delightful animations and fluid transitions that bring your interface to life and guide user focus." },
  { icon: "📱", title: "Responsive Layouts", description: "Adaptive designs that maintain their beauty and functionality across every conceivable screen size." },
  { icon: "♿", title: "Accessibility (a11y)", description: "Inclusive design practices ensuring your product is usable and enjoyable for everyone." },
];

const process = [
  { step: "01", title: "Research & Discovery", description: "We dive deep into your industry, competitors, and target audience to uncover insights that drive our design strategy." },
  { step: "02", title: "Information Architecture", description: "Mapping out the structure and flow of your product to ensure users can find what they need intuitively and rapidly." },
  { step: "03", title: "Wireframing", description: "Creating the structural blueprint of your interface, focusing on layout, hierarchy, and core interactions." },
  { step: "04", title: "Visual Design", description: "Applying typography, color theory, and our signature premium aesthetic to create stunning, high-fidelity mockups." },
  { step: "05", title: "Prototyping & Testing", description: "Building interactive prototypes to validate design decisions with real users before writing a single line of code." },
];

export default function UIUXDesignPage() {
  return (
    <ServiceTemplate 
      title="UI/UX Design"
      description="Crafting cinematic, intuitive, and conversion-optimized digital experiences that turn casual visitors into loyal advocates for your brand."
      features={features}
      process={process}
    />
  );
}
import type { Metadata } from "next";
import ServiceTemplate from "@/components/layout/ServiceTemplate";
import { Layers, Cpu, Sparkles, WifiOff, Bell, PackageCheck, Palette, Brain, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile App Development | AutoPlanet",
  description: "Native and cross-platform mobile applications that deliver seamless user experiences across all devices and platforms.",
  openGraph: {
    title: "Mobile App Development | AutoPlanet",
    description: "High-performance mobile applications for iOS and Android.",
    type: "website",
    url: "https://autoplanetcorp.com/services/mobile-apps",
    siteName: "AutoPlanet Corporation",
  },
};

const features = [
  { icon: <Layers size={22} strokeWidth={1.5} />, title: "Cross-Platform Mastery", description: "Deliver your app to both iOS and Android simultaneously using robust frameworks like React Native." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "Native Performance", description: "Fluid animations, rapid loading times, and hardware-accelerated performance that feels completely natural." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "Intuitive UI/UX", description: "Platform-specific design language combined with our premium aesthetics to maximize user engagement." },
  { icon: <WifiOff size={22} strokeWidth={1.5} />, title: "Offline Capabilities", description: "Resilient architectures that allow your users to access critical features even without an internet connection." },
  { icon: <Bell size={22} strokeWidth={1.5} />, title: "Push Notifications", description: "Smart, targeted engagement campaigns utilizing advanced push notification strategies." },
  { icon: <PackageCheck size={22} strokeWidth={1.5} />, title: "App Store Optimization", description: "End-to-end support for app submission, compliance, and store listing optimization." },
];

const process = [
  { step: "01", title: "Platform Strategy", description: "We determine the optimal technical approach (native vs cross-platform) based on your target audience and feature requirements." },
  { step: "02", title: "Prototyping", description: "Interactive wireframes and high-fidelity prototypes to validate the user journey and interaction paradigms before coding." },
  { step: "03", title: "Iterative Development", description: "Agile sprints delivering functional builds regularly, ensuring continuous feedback and alignment with your vision." },
  { step: "04", title: "Device Testing", description: "Comprehensive testing across a massive matrix of physical devices, OS versions, and screen sizes to ensure stability." },
  { step: "05", title: "Launch & Growth", description: "Strategic rollout planning, app store submission, and post-launch analytics integration to drive continuous improvement." },
];

const stats = [
  { value: "2", label: "Platforms, one codebase" },
  { value: "60fps", label: "Animation target" },
  { value: "8wk", label: "Avg. launch timeline" },
  { value: "4.8★", label: "Avg. App Store rating" },
];

const relatedServices = [
  { title: "UI/UX Design", href: "/services/ui-ux-design", icon: <Palette size={16} strokeWidth={1.5} /> },
  { title: "AI Solutions", href: "/services/ai-solutions", icon: <Brain size={16} strokeWidth={1.5} /> },
  { title: "Performance", href: "/services/performance", icon: <Zap size={16} strokeWidth={1.5} /> },
];

export default function MobileAppsPage() {
  return (
    <ServiceTemplate
      title="Mobile Apps"
      tagline="Users form opinions in 50ms. We obsess over every frame, every interaction, every loading state — so your app feels premium."
      description="Engineering premium mobile experiences that captivate users, drive engagement, and put your business directly into the hands of your audience."
      features={features}
      process={process}
      stats={stats}
      relatedServices={relatedServices}
    />
  );
}
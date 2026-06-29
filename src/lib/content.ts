// Centralized content for AutoPlanet Corporation — enterprise AI company

export const company = {
  name: "AutoPlanet Corporation",
  short: "APC",
  wordmark: "AUTOPLANETCORPORATION",
  tagline: "AI That Replaced 83% of Manual Work",
  tagline2: "See what 10x feels like.",
  mission:
    "Every business process that involves reading, writing, deciding, or routing can be automated with AI.",
  email: "sales@autoplanetcorp.com",
  phone: "+91 7904914455",
  linkedin: "linkedin.com/company/autoplanet-corporation",
  instagram: "instagram.com/autoplanet.corp",
};

export type ServiceItem = {
  id: string;
  num: string;
  title: string;
  desc: string;
  points: string[];
  icon: string;
};

export const services: ServiceItem[] = [
  {
    id: "ai-agents",
    num: "01",
    title: "AI Agents",
    desc: "Fully autonomous agents that replace L1/L2 support, run outreach, enrich CRMs, and operate internal workflows — around the clock.",
    points: [
      "Customer support (replaces L1/L2 entirely)",
      "Research & outreach agents",
      "Data extraction & enrichment agents",
      "Internal ops agents (HR, finance, ops)",
    ],
    icon: "Bot",
  },
  {
    id: "custom-llm",
    num: "02",
    title: "Custom LLM Development",
    desc: "Fine-tuned models on your proprietary data, RAG pipelines, and prompt architecture engineered for your domain.",
    points: [
      "Fine-tuned models on proprietary data",
      "RAG (Retrieval-Augmented Generation) pipelines",
      "Prompt architecture engineering",
      "Domain-specific model training",
    ],
    icon: "BrainCircuit",
  },
  {
    id: "ai-saas",
    num: "03",
    title: "AI SaaS Products",
    desc: "From architecture to production-deployed SaaS — AI backend, UI/UX, auth, and billing included.",
    points: [
      "End-to-end product builds",
      "AI backend + UI/UX",
      "Auth & billing (Stripe integration)",
      "Production-deployed SaaS",
    ],
    icon: "Rocket",
  },
  {
    id: "automation",
    num: "04",
    title: "Workflow Automation",
    desc: "Intelligent data pipelines and automated business logic that replace multi-step manual processes end to end.",
    points: [
      "Intelligent data pipelines",
      "Automated business logic",
      "Sales, ops, marketing automation",
      "Multi-step process replacement",
    ],
    icon: "Workflow",
  },
  {
    id: "integrations",
    num: "05",
    title: "AI Integrations",
    desc: "Plug AI into your existing stack — CRM, ERP, Slack, databases — as intelligent middleware between systems.",
    points: [
      "Plug AI into existing stacks (CRM, ERP, Slack)",
      "Intelligent middleware between systems",
      "Native connectors & webhooks",
      "Zero-rip-and-replace adoption",
    ],
    icon: "Plug",
  },
  {
    id: "mobile",
    num: "06",
    title: "Mobile Apps",
    desc: "AI-powered iOS and Android apps delivered with React Native & Flutter at native performance.",
    points: [
      "AI-powered iOS and Android apps",
      "React Native & Flutter",
      "Native-performance delivery",
      "On-device + cloud AI hybrid",
    ],
    icon: "Smartphone",
  },
  {
    id: "uiux",
    num: "07",
    title: "UI/UX Design",
    desc: "Human-centered design for AI products — interfaces that make complex AI feel simple and trustworthy.",
    points: [
      "Human-centered design for AI products",
      "Interfaces that make complex AI feel simple",
      "Design systems & component libraries",
      "Prototype → ship in days",
    ],
    icon: "Palette",
  },
  {
    id: "cloud-devops",
    num: "08",
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure and CI/CD pipelines purpose-built for AI workloads and fast iteration.",
    points: [
      "Scalable cloud infrastructure",
      "CI/CD pipelines for AI workloads",
      "Observability & cost control",
      "Zero-downtime deploys",
    ],
    icon: "Cloud",
  },
  {
    id: "performance",
    num: "09",
    title: "Performance Optimization",
    desc: "Core Web Vitals, load testing, and speed optimization. Measured performance, not promises.",
    points: [
      "Core Web Vitals",
      "Speed optimization",
      "Load testing",
      "Measured delivery",
    ],
    icon: "Gauge",
  },
  {
    id: "security",
    num: "10",
    title: "Enterprise Security",
    desc: "Red-teaming, prompt-injection defense, and private model deployment inside your VPC for total data sovereignty.",
    points: [
      "Red-teaming",
      "Prompt injection defense",
      "Private model deployment (within client's VPC)",
      "Total data sovereignty",
    ],
    icon: "ShieldCheck",
  },
  {
    id: "strategy",
    num: "11",
    title: "AI Strategy Consulting",
    desc: "Business process audit, AI opportunity mapping, and a prioritized roadmap you can actually execute.",
    points: [
      "Business process audit",
      "AI opportunity mapping",
      "Prioritized roadmap delivery",
      "48-hour scope turnaround",
    ],
    icon: "Compass",
  },
  {
    id: "ml",
    num: "12",
    title: "Machine Learning Solutions",
    desc: "Predictive analytics and intelligent algorithms that optimize business operations with measurable lift.",
    points: [
      "Predictive analytics",
      "Intelligent algorithms",
      "Business operations optimization",
      "MLOps from day one",
    ],
    icon: "Cpu",
  },
  {
    id: "cv",
    num: "13",
    title: "Computer Vision",
    desc: "Image & video analysis for quality control, automated data extraction, and security applications.",
    points: [
      "Image & video analysis",
      "Quality control systems",
      "Automated data extraction",
      "Security applications",
    ],
    icon: "Eye",
  },
  {
    id: "predictive",
    num: "14",
    title: "Predictive Analytics",
    desc: "Turn raw data into actionable insights — trend forecasting and strategic growth analytics.",
    points: [
      "Raw data → actionable insights",
      "Trend forecasting",
      "Strategic growth analytics",
      "Decision-grade dashboards",
    ],
    icon: "TrendingUp",
  },
];

export type Stat = { label: string; value: number; suffix?: string; prefix?: string; decimals?: number };

export const stats: Stat[] = [
  { label: "Manual work eliminated (avg.)", value: 83, suffix: "%" },
  { label: "AI products shipped", value: 40, suffix: "+" },
  { label: "Avg. time to deploy", value: 3, suffix: " wks" },
  { label: "Code ownership", value: 100, suffix: "% yours" },
  { label: "Model accuracy rate", value: 99.2, suffix: "%", decimals: 1 },
  { label: "Workflow throughput gain", value: 10, suffix: "x" },
  { label: "Autonomous operation", value: 24, suffix: "/7" },
  { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
  { label: "Data sovereignty", value: 100, suffix: "%" },
  { label: "Avg ROI improvement", value: 3, suffix: "x" },
];

export const liveStats = [
  { label: "Tasks processed today", value: 1247 },
  { label: "Leads scraped", value: 1041 },
  { label: "CRM entries enriched", value: 892 },
  { label: "Automations triggered", value: 768 },
];

export type Step = { num: string; title: string; desc: string; icon: string; detail: string };

export const processSteps: Step[] = [
  {
    num: "01",
    title: "Discovery call",
    desc: "Problem deep-dive, technical assessment, feasibility check, and timeline estimate. No sales pitch.",
    detail: "30 minutes · engineering-led",
    icon: "PhoneCall",
  },
  {
    num: "02",
    title: "Scope & Proposal",
    desc: "Within 48 hours: architecture blueprint, feature breakdown, fixed-price quote, and clear milestones.",
    detail: "48-hour turnaround",
    icon: "FileText",
  },
  {
    num: "03",
    title: "Build Sprint",
    desc: "Focused 1–2 week sprints. Live demos every Friday. Daily async updates. Direct engineer access.",
    detail: "1–2 week cycles",
    icon: "Hammer",
  },
  {
    num: "04",
    title: "Deploy & Hand-off",
    desc: "Production deployment, full documentation, source code transfer, and a structured support period.",
    detail: "30–90 day support",
    icon: "Rocket",
  },
];

export type CaseStudy = {
  id: string;
  company: string;
  industry: string;
  result: string;
  resultLabel: string;
  what: string;
  stack: string;
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "fastcart",
    company: "FastCart Inc.",
    industry: "E-Commerce",
    result: "83%",
    resultLabel: "tickets automated",
    what: "Autonomous AI support agent — handles product inquiries, order tracking, returns, and escalations. Replaced L1/L2 human support entirely.",
    stack: "AI Agent + GPT-4o + RAG Pipeline",
    accent: "Customer Support",
  },
  {
    id: "lawbridge",
    company: "LawBridge LLP",
    industry: "Legal",
    result: "70%",
    resultLabel: "time saved on contracts",
    what: "Custom LLM fine-tuned on 50,000 legal documents. Extracts clauses, flags risks, generates summaries — cuts days to hours.",
    stack: "Custom LLM + Fine-tuning + NLP",
    accent: "Document Automation",
  },
  {
    id: "metricflow",
    company: "MetricFlow",
    industry: "Analytics SaaS",
    result: "4 wks",
    resultLabel: "to production-ready",
    what: "Full AI SaaS — auth, billing, AI-powered analytics engine, and real-time dashboards shipped from architecture to production.",
    stack: "AI SaaS + Next.js + Stripe",
    accent: "Product Build",
  },
  {
    id: "growthstack",
    company: "GrowthStack",
    industry: "Sales Pipeline",
    result: "3x",
    resultLabel: "lead quality lift",
    what: "Intelligent lead scoring, automated outreach, and CRM enrichment pipeline using multi-model AI. 100 → 300 qualified leads per month.",
    stack: "Automation + Multi-model AI + CRM",
    accent: "Revenue Operations",
  },
];

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "AutoPlanet built our entire AI support agent in 3 weeks. It handles 80% of tickets with zero human involvement. ROI was instant.",
    name: "Marcus T.",
    role: "CTO at Stacklane",
  },
  {
    quote:
      "We came in with a napkin idea. AutoPlanet shipped a working SaaS with AI at its core in under 6 weeks. Insane execution speed.",
    name: "Priya R.",
    role: "Founder at Loopwise",
  },
  {
    quote:
      "The RAG pipeline they built cut our research time by 70%. It's not magic — it's just really good AI engineering.",
    name: "Daniel K.",
    role: "Head of Ops at Fivepath",
  },
];

export type Tier = {
  name: string;
  tagline: string;
  timeline: string;
  price: string;
  priceNote: string;
  for: string;
  features: string[];
  highlight: boolean;
  badge?: string;
};

export const tiers: Tier[] = [
  {
    name: "Quick Build",
    tagline: "Ship one AI capability fast",
    timeline: "~2 weeks",
    price: "From ₹29,000",
    priceNote: "Starter · fixed-price",
    for: "Teams needing a specific AI feature or integration live fast.",
    features: [
      "Single-agent deployment",
      "Core API integration",
      "Clean hand-off",
      "30-day monitoring",
      "Source code included",
    ],
    highlight: false,
  },
  {
    name: "Full Product",
    tagline: "Architecture to production SaaS",
    timeline: "4–8 week cycle",
    price: "From ₹89,000",
    priceNote: "Build · fixed-price",
    for: "End-to-end AI SaaS from architecture to production.",
    features: [
      "Architecture & UI/UX",
      "Full AI backend pipeline",
      "Auth & Stripe integration",
      "90-day maintenance",
      "100% source code & IP ownership",
    ],
    highlight: true,
    badge: "Most chosen",
  },
  {
    name: "Ongoing Partner",
    tagline: "Embedded AI engineering",
    timeline: "Retainer-based",
    price: "From ₹45,000",
    priceNote: "per month · Retainer",
    for: "Dedicated AI engineering embedded in your team.",
    features: [
      "Dedicated lead engineer",
      "Weekly sprint reviews",
      "Infinite iterations",
      "Priority R&D access",
      "Same-week pivots",
    ],
    highlight: false,
  },
];

export const pricingGuarantees = [
  "If we can't scope within 48hrs of first call → next sprint is free",
  "If we miss a deadline by more than 3 days → next sprint is free",
  "Everything included: architecture, design, dev, testing, deploy, docs, support",
];

export type FaqItem = { q: string; a: string; category: string };

export const faqs: FaqItem[] = [
  {
    category: "Engagement",
    q: "Do you work hourly or fixed-price?",
    a: "Fixed-price only. Never hourly, never surprise invoices. You get a clear quote within 48 hours of our first call and that number holds.",
  },
  {
    category: "Engagement",
    q: "How fast can we start?",
    a: "After the discovery call, you receive a scoped proposal within 48 hours. Build sprints typically kick off the same week and run in 1–2 week focused cycles.",
  },
  {
    category: "Ownership",
    q: "Who owns the code, models, and IP?",
    a: "You do — 100%. Source code, model weights, and infrastructure are all yours. No vendor lock-in, no recurring license fees, no hostage data.",
  },
  {
    category: "Ownership",
    q: "Can you deploy inside our VPC?",
    a: "Yes. For enterprise security workloads we deploy private models inside your own VPC for total data sovereignty, with red-teaming and prompt-injection defense baked in.",
  },
  {
    category: "Tech",
    q: "Which AI models do you work with?",
    a: "GPT-4o, Claude 3.5, Gemini, and Llama 3, plus fine-tuned custom models. We pick the right model per workload — cost, performance, and accuracy optimized.",
  },
  {
    category: "Tech",
    q: "How do you measure performance?",
    a: "We measure every workload against accuracy, throughput, and uptime targets. 99.9% uptime and 99.2% model accuracy are baseline SLAs, not aspirations.",
  },
  {
    category: "Process",
    q: "How do you handle changes mid-sprint?",
    a: "Friday live demos, daily async updates, and direct engineer access keep you in the loop. Retainer partners get infinite iterations and same-week pivots.",
  },
  {
    category: "Process",
    q: "What if you miss a deadline?",
    a: "If we miss a deadline by more than 3 days, your next sprint is free. That guarantee is in writing before we start.",
  },
  {
    category: "Support",
    q: "What happens after launch?",
    a: "30–90 day support period depending on tier, full documentation, and a clean hand-off. Retainer partners get ongoing embedded engineering.",
  },
];

export type Job = {
  title: string;
  type: string;
  location: string;
  pay: string;
  desc: string;
  skills: string[];
};

export const jobs: Job[] = [
  {
    title: "AI Engineer",
    type: "Full-time · Remote",
    location: "Remote",
    pay: "Competitive · performance-based",
    desc: "Build, fine-tune, and deploy custom LLMs and AI workflows using agentic frameworks. Ship production AI systems end to end.",
    skills: ["LLMs", "RAG", "Agentic frameworks", "Python", "Fine-tuning"],
  },
  {
    title: "Frontend Engineer",
    type: "Full-time · Remote",
    location: "Remote",
    pay: "Competitive · performance-based",
    desc: "React/Next.js development with a focus on 3D and immersive web experiences using Three.js and React Three Fiber.",
    skills: ["React", "Next.js", "Three.js", "R3F", "TypeScript"],
  },
  {
    title: "Business Development",
    type: "Full-time · Remote",
    location: "Remote",
    pay: "Competitive · performance-based",
    desc: "B2B sales for enterprise AI solutions. Map accounts, run outbound, and close AI automation engagements with CTOs and founders.",
    skills: ["B2B sales", "Outbound", "Enterprise AI", "Closing"],
  },
];

export const techStack = [
  { name: "GPT-4o", vendor: "OpenAI" },
  { name: "Claude 3.5", vendor: "Anthropic" },
  { name: "Gemini", vendor: "Google" },
  { name: "Llama 3", vendor: "Meta" },
  { name: "Next.js", vendor: "Framework" },
  { name: "React Native", vendor: "Mobile" },
  { name: "Flutter", vendor: "Mobile" },
  { name: "Stripe", vendor: "Billing" },
];

export const coreValues = [
  {
    title: "AI-Native Engineering",
    desc: "Intelligence at the foundation, not bolted on. We were born from AI, not a consultancy that adopted it.",
    icon: "Sparkles",
  },
  {
    title: "Speed Without Compromise",
    desc: "Production-ready AI in weeks, not quarters. Sprints measured in days, demos every Friday.",
    icon: "Zap",
  },
  {
    title: "Full Ownership",
    desc: "100% source code, models, and infrastructure belong to you. No lock-in. Ever.",
    icon: "KeyRound",
  },
  {
    title: "Enterprise-Grade Delivery",
    desc: "Hardened security, VPC deployment, and data sovereignty as defaults — not upgrades.",
    icon: "ShieldCheck",
  },
];

export const capabilities = [
  { label: "Autonomous Agents", value: "24/7 operation" },
  { label: "Model Accuracy", value: "99.2% baseline" },
  { label: "Uptime SLA", value: "99.9%" },
  { label: "Data Sovereignty", value: "100% yours" },
];

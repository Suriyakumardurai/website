"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Zap, 
  Repeat, 
  Layers, 
  BarChart3, 
  Bot, 
  Check, 
  ChevronRight, 
  ArrowRight,
  Mail,
  ShieldCheck,
  CloudLightning,
  Sparkles,
  Database,
  Brain,
  Wrench,
  CheckCircle
} from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import { FadeUp, StaggerGrid, StaggerItem, SlideIn, ScaleIn, WordReveal, Typewriter, RevealSection, Magnetic } from "@/components/Animate";
import LivePipeline from "@/components/sections/LivePipeline";
import ScrollProgress from "@/components/sections/ScrollProgress";
import { ProgressiveReveal } from "@/components/ProgressiveReveal";
import ScopeEstimator from "@/components/sections/ScopeEstimator";
import { Timer, Layout, Users } from "lucide-react";

const services = [
  { icon: Cpu, title: "Custom LLM Development", desc: "Fine-tuned models, RAG pipelines, and prompt architectures trained on your data. Your AI, your rules." },
  { icon: Zap, title: "AI SaaS Products", desc: "End-to-end product builds — AI backend, UI, auth, billing. From idea to deployed SaaS." },
  { icon: Repeat, title: "Workflow Automation", desc: "Replace every repetitive process with an intelligent pipeline. Sales, ops, marketing — automated." },
  { icon: Layers, title: "AI Integrations", desc: "Plug AI into your existing stack. CRM, ERP, Slack, databases — wired together with intelligent middleware." },
  { icon: BarChart3, title: "AI Strategy", desc: "We audit your business, map the highest-leverage AI opportunities, and hand you a prioritized roadmap." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "Red-teaming, prompt injection defense, and private model deployment within your VPC. Total data sovereignty." },
];

const testimonials = [
  { quote: "AutoPlanet built our entire AI support agent in 3 weeks. It handles 80% of tickets with zero human involvement. ROI was instant.", name: "Marcus T.", role: "CTO, Stacklane", avatar: "MT" },
  { quote: "We came in with a napkin idea. AutoPlanet shipped a working SaaS with AI at its core in under 6 weeks. Insane execution speed.", name: "Priya R.", role: "Founder, Loopwise", avatar: "PR" },
  { quote: "The RAG pipeline they built cut our research time by 70%. It's not magic — it's just really good AI engineering.", name: "Daniel K.", role: "Head of Ops, Fivepath", avatar: "DK" },
];

const faqs = [
  { q: "How long does a typical project take?", a: "Most AI agent builds and integrations ship within 2–4 weeks. Full SaaS products take 6–10 weeks. We move fast." },
  { q: "Do you work with early-stage startups?", a: "Yes. We work with founders from pre-product to Series B. Some of our best work started as napkin ideas." },
  { q: "Which AI models do you work with?", a: "GPT-4o, Claude 3.5, Gemini, Mistral, Llama 3 — model agnostic. We recommend what's right for your use case and budget." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. Every project comes with 30-day post-launch support. We also do monthly retainers for ongoing AI development." },
  { q: "Can you integrate AI into our existing product?", a: "Absolutely. That's one of our most common engagements — from 10-year-old Rails apps to modern Next.js products." },
];

const getGmailLink = (subject: string, body: string) => {
  const recipient = "ceo@autoplanetcorp.com";
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const formalTemplate = (subject: string, specificInterest: string) => {
  const body = `Dear AutoPlanet Executive Team,

I am writing to formally express interest in exploring a ${specificInterest}. We are currently evaluating AI-native solutions to enhance our operational efficiency and would like to discuss our specific requirements with your engineering leadership.

Introduction:
[Briefly introduce your company and role]

Primary Objectives:
[Detail the specific challenges or goals you wish to address with AI]

Preferred Consultation Time:
[Suggest 2-3 time slots for a 30-minute introductory call]

I look forward to a formal discussion on how AutoPlanet's expertise can align with our corporate vision.

Respectfully,
[Your Name]
[Your Company]`;
  return getGmailLink(subject, body);
};

const plans = [
  {
    name: "Quick Build",
    icon: Timer,
    desc: "For founders who need a specific AI feature or integration live in record time.",
    focus: "Speed & Integration",
    timeline: "2 weeks avg.",
    features: ["Single-agent deployment", "Core API integration", "Clean hand-off", "30-day monitoring"],
    cta: "Scope a feature",
    highlight: false,
    link: formalTemplate("Inquiry: Quick Build AI Feature", "single-feature AI build and rapid deployment")
  },
  {
    name: "Full Product",
    icon: Layout,
    desc: "End-to-end AI SaaS development from napkin idea to production-ready product.",
    focus: "Scale & Market Ready",
    timeline: "4–8 week cycle",
    features: ["Architecture & UI/UX", "Full AI backend pipeline", "Auth & Stripe integration", "90-day maintenance"],
    cta: "Scale your product",
    highlight: true,
    link: formalTemplate("Strategic Inquiry: End-to-End AI Product Development", "full-stack AI SaaS development and production launch")
  },
  {
    name: "Ongoing Partner",
    icon: Users,
    desc: "Dedicated AI engineering embedded in your team for continuous innovation.",
    focus: "R&D & Optimization",
    timeline: "Retainer-based",
    features: ["Dedicated lead engineer", "Weekly sprint reviews", "Infinite iterations", "Priority R&D access"],
    cta: "Embed a partner",
    highlight: false,
    link: formalTemplate("Partnership Inquiry: Continuous AI Engineering Partner", "ongoing strategic partnership and embedded AI engineering")
  },
];

function StatCounter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const numTarget = typeof target === "number" ? target : null;

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStarted(true);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || numTarget === null) return;
    let frame: number;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(numTarget * ease));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, numTarget]);

  return (
    <div ref={ref} className="stat-num">
      {numTarget !== null ? val + suffix : target}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id], div[id]");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a, .mobile-nav-links a");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <ScrollProgress />
      <nav>
        <BrandLogo />
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a 
          href={formalTemplate("Inquiry: Exploring AI Solutions & Products", "strategic partnership and exploring your AI products")} 
          target="_blank"
          className="nav-cta"
        >
          Book a call
        </a>
        
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-inner">
              <ul className="mobile-nav-links">
                <li><a href="#about" onClick={closeMenu}>About</a></li>
                <li><a href="#services" onClick={closeMenu}>Services</a></li>
                <li><a href="#process" onClick={closeMenu}>Process</a></li>
                <li><a href="#pricing" onClick={closeMenu}>Pricing</a></li>
                <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
              </ul>
              <div className="mobile-menu-footer">
                <a 
                  href={formalTemplate("Inquiry: Exploring AI Solutions & Products", "strategic partnership and exploring your AI products")} 
                  target="_blank"
                  className="btn-primary" 
                  onClick={closeMenu}
                >
                  Book a free call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="hero" ref={heroRef}>
        {/* Background effects removed for a cleaner look */}

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Fully AI Native Company
          </motion.div>

          <h1 className="hero-h1">
            <WordReveal text="We build AI that actually ships" />
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            We build AI SaaS products, automate your workflows, and craft digital experiences — powered by the latest in artificial intelligence.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Magnetic>
              <a href="#cta" className="btn-primary">Book a free call <ArrowRight size={18} /></a>
            </Magnetic>
            <Magnetic>
              <a href="#services" className="btn-ghost">See what we build</a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <span className="proof-item"><CloudLightning size={14} /> Ships in weeks, not months</span>
            <span className="proof-divider" />
            <span className="proof-item"><Bot size={14} /> 100% AI native</span>
            <span className="proof-divider" />
            <span className="proof-item"><ShieldCheck size={14} /> Full source code ownership</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker">
          {["AI Agents", "LLM Engineering", "RAG Pipelines", "SaaS Products", "Workflow Automation", "AI Integrations", "Fine-tuning", "AI Strategy", "GPT-4o", "Claude", "Gemini", "Llama 3",
            "AI Agents", "LLM Engineering", "RAG Pipelines", "SaaS Products", "Workflow Automation", "AI Integrations", "Fine-tuning", "AI Strategy", "GPT-4o", "Claude", "Gemini", "Llama 3"]
            .map((label, i) => <span key={i} className="ticker-item">{label}</span>)}
        </div>
      </div>

      <div className="section-divider" />

      {/* ABOUT */}
      <ProgressiveReveal>
      <section id="about" className="reveal-on-scroll">
        <div className="about-grid">
          <SlideIn from="left">
            <div className="about-visual">
              <LivePipeline />
            </div>
          </SlideIn>

          <SlideIn from="right">
            <div>
              <div className="section-tag">About</div>
              <h2 className="h2-reveal">
                <Typewriter text="Built from the ground up with AI." />
              </h2>
              <p className="section-sub" style={{ marginBottom: "1.5rem" }}>
                <Typewriter 
                  text="AutoPlanet isn't an agency that adopted AI — we were born from it. Every product we ship, every workflow we design, every line of code we write is AI-native from day one." 
                  speed={0.01}
                  delay={0.6}
                />
              </p>
              <p className="section-sub">
                <Typewriter 
                  text="We exist at the intersection of intelligence and design — where ambitious ideas meet the tools to make them inevitable."
                  speed={0.01}
                  delay={2.0}
                />
              </p>

              <StaggerGrid className="about-stats">
                {[
                  { num: 3, suffix: " wks", label: "Avg. time to ship" },
                  { num: 40, suffix: "+", label: "AI products launched" },
                  { num: 100, suffix: "%", label: "Code ownership yours" },
                  { num: 24, suffix: "/7", label: "Agents run without you" },
                ].map((s) => (
                  <StaggerItem key={s.label}>
                    <div className="stat-card">
                      <StatCounter target={s.num} suffix={s.suffix} />
                      <div className="stat-label">{s.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          </SlideIn>
        </div>
      </section>
      </ProgressiveReveal>

      <div className="section-divider" />

      {/* SERVICES */}
      <ProgressiveReveal>
      <section id="services" className="reveal-on-scroll">
        <div className="section-tag">Services</div>
        <div className="services-header">
          <h2 className="h2-reveal" style={{ margin: 0 }}>
            <Typewriter text="AI Automation. Built in India." />
          </h2>
          <p className="section-sub">
            <Typewriter 
              text="Every service we offer has AI at the core. We don't bolt AI on — we engineer it in from the start."
              speed={0.01}
              delay={0.8}
            />
          </p>
        </div>

        {/* Featured */}
        <RevealSection>
          <div className="service-featured">
            <div className="service-featured-content">
              <div className="service-featured-tag">Most in demand</div>
              <div className="service-featured-icon"><Bot size={32} /></div>
              <h3><Typewriter text="AI Agents" delay={1.2} /></h3>
              <p style={{ minHeight: "80px" }}>
                <Typewriter 
                  text="Fully autonomous agents that think, plan, and execute complex workflows end-to-end — across email, web, databases, APIs, and your internal tools. They don't just respond to prompts. They work."
                  speed={0.008}
                  delay={1.5}
                />
              </p>
              <ul className="service-featured-list">
                <li>Customer support agents (replaces L1/L2 entirely)</li>
                <li>Research & outreach agents</li>
                <li>Data extraction & enrichment agents</li>
                <li>Internal ops agents (HR, finance, ops workflows)</li>
              </ul>
              <Magnetic>
                <a href="#pricing" className="btn-primary" style={{ marginTop: "2rem", display: "inline-flex" }}>Build your agent <ArrowRight size={18} /></a>
              </Magnetic>
            </div>
            <div className="service-featured-visual" aria-hidden="true">
              <div className="enterprise-pipeline">
                <div className="pipeline-track">
                  <motion.div 
                    className="pipeline-particle"
                    animate={{ left: ["0%", "100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 1], ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="pipeline-particle"
                    animate={{ left: ["0%", "100%", "100%"] }}
                    transition={{ duration: 4, delay: 2, repeat: Infinity, times: [0, 0.8, 1], ease: "easeInOut" }}
                  />
                </div>
                
                <div className="floating-metric metric-1">
                  <div className="metric-val">42ms</div>
                  <div className="metric-lbl">Avg Latency</div>
                </div>
                <div className="floating-metric metric-2">
                  <div className="metric-val">99.9%</div>
                  <div className="metric-lbl">Uptime</div>
                </div>
                <div className="floating-metric metric-3">
                  <div className="metric-val">100%</div>
                  <div className="metric-lbl">Autonomous</div>
                </div>
                <div className="floating-metric metric-4">
                  <div className="metric-val">0</div>
                  <div className="metric-lbl">Data Leaks</div>
                </div>

                <div className="pipeline-nodes">
                  {[
                    { label: "Data Source", icon: <Database size={18} /> },
                    { label: "Reasoning Engine", icon: <Brain size={18} /> },
                    { label: "Tool Exec", icon: <Wrench size={18} /> },
                    { label: "Final Output", icon: <CheckCircle size={18} /> }
                  ].map((node, i) => (
                    <div key={node.label} className="pipeline-node-wrapper">
                      <div className="pipeline-node">
                        <div className="pipeline-icon">{node.icon}</div>
                        <div className="pipeline-label">{node.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <StaggerGrid className="services-grid">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="service-card" style={{ height: "100%" }}>
                <div className="service-icon"><s.icon size={28} /></div>
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      </ProgressiveReveal>

      <div className="section-divider" />

      {/* PROCESS */}
      <ProgressiveReveal>
      <section id="process" className="reveal-on-scroll">
        <div>
          <div className="section-tag">Process</div>
          <h2 className="h2-reveal">
            <WordReveal text="How we actually work" />
          </h2>
        </div>

        <div className="process-list">
          {[
            { num: "01", title: "Free 30-min call", desc: "We understand your problem, your stack, and your goals. No sales pitch — just an honest conversation about what AI can do for you." },
            { num: "02", title: "Scope & proposal", desc: "Within 48 hours, you get a clear scope document, timeline, and fixed price. No hourly billing, no surprise invoices." },
            { num: "03", title: "Build sprint", desc: "We ship in focused 1–2 week sprints with live demos every Friday. You see progress constantly, not at the end of a long wait." },
            { num: "04", title: "Deploy & hand off", desc: "We deploy to your infrastructure, write the docs, and transfer full ownership. Then we stick around for 30–60 days to make sure everything runs clean." },
          ].map((step, i) => (
            <RevealSection key={step.num}>
              <div className="process-item">
                <div className="process-num">{step.num}</div>
                <div className="process-title">{step.title}</div>
                <p className="process-desc">{step.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>
      </ProgressiveReveal>

      <div className="section-divider" />

      {/* TESTIMONIALS */}
      <ProgressiveReveal>
      <section id="testimonials" className="reveal-on-scroll">
        <div>
          <div className="section-tag">Testimonials</div>
          <h2 className="h2-reveal">
            <WordReveal text="From people who shipped with us" />
          </h2>
        </div>

        <StaggerGrid className="testimonials-grid">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="testimonial-card">
                <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      </ProgressiveReveal>

      <div className="section-divider" />

      {/* PRICING */}
      <ProgressiveReveal>
      <section id="pricing" className="reveal-on-scroll">
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="section-tag" style={{ justifyContent: "center" }}>Engagement</div>
          <h2 className="h2-reveal" style={{ justifyContent: "center" }}>
            <WordReveal text="Scoping your ambition." />
          </h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Elite AI engineering isn't a commodity. We don't charge by the hour; we build for outcomes. 
            Select your path or estimate your scope below.
          </p>
        </div>

        <StaggerGrid className="pricing-grid" style={{ marginBottom: "6rem" }}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`pricing-card ${plan.highlight ? "pricing-card--highlight" : ""}`} style={{ minHeight: "540px" }}>
                {plan.highlight && <div className="pricing-badge">Elite Choice</div>}
                <div className="pricing-icon" style={{ color: "#00ffc8", marginBottom: "1.5rem" }}>
                  <plan.icon size={32} />
                </div>
                <div className="pricing-name" style={{ fontSize: "1.5rem" }}>{plan.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#00ffc8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                  {plan.focus} • {plan.timeline}
                </div>
                <p className="pricing-desc" style={{ marginBottom: "2rem" }}>{plan.desc}</p>
                <ul className="pricing-features" style={{ marginBottom: "2.5rem" }}>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="check"><Check size={14} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Magnetic>
                  <a 
                    href={plan.link} 
                    target="_blank"
                    className={plan.highlight ? "btn-primary" : "btn-ghost"} 
                    style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
                  >
                    {plan.cta}
                  </a>
                </Magnetic>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <RevealSection>
          <div className="estimator-section">
            <div className="estimator-content">
              <div className="section-tag">Interactive Scoping</div>
              <h2>Don't guess. Estimate.</h2>
              <p>
                Every project has unique variables. Use our interactive scoping tool to get a custom roadmap 
                estimate based on your specific requirements.
              </p>
            </div>
            <ScopeEstimator />
          </div>
        </RevealSection>

        <FadeUp>
          <p className="pricing-note" style={{ marginTop: "5rem" }}>Looking for enterprise-wide transformation? <a href={formalTemplate("Enterprise Inquiry: AI Transformation & Architecture", "comprehensive AI architecture and enterprise-wide transformation")} target="_blank">Consult with our Lead Architect</a>.</p>
        </FadeUp>

        <style jsx>{`
          .estimator-section {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 5rem;
            align-items: center;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 32px;
            padding: 5rem;
            margin-top: 4rem;
          }

          .estimator-content h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
          }

          .estimator-content p {
            color: rgba(255, 255, 255, 0.5);
            line-height: 1.6;
            font-size: 1.1rem;
          }

          @media (max-width: 1024px) {
            .estimator-section {
              grid-template-columns: 1fr;
              padding: 3rem 2rem;
              gap: 3rem;
              text-align: center;
            }
          }
        `}</style>
      </section>
      </ProgressiveReveal>

      <div className="section-divider" />

      {/* FAQ */}
      <ProgressiveReveal>
      <section id="faq" className="reveal-on-scroll">
        <div>
          <div className="section-tag">FAQ</div>
          <h2 className="h2-reveal">
            <WordReveal text="Questions we always get asked" />
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <RevealSection key={i}>
              <div className={`faq-item ${openFaq === i ? "faq-item--open" : ""}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any }}
                      style={{ overflow: "hidden" }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>
      </ProgressiveReveal>

      <div className="section-divider" />

      {/* CTA */}
      <RevealSection>
        <div id="cta">
          <div className="section-tag" style={{ justifyContent: "center" }}>Let's build</div>
          <h2 className="h2-reveal" style={{ textAlign: "center", justifyContent: "center" }}>
            <WordReveal text="Ready to ship real AI?" />
          </h2>
          <p className="section-sub">
            Book a free 30-minute call. We'll tell you exactly what we'd build, how long it'd take, and what it'd cost. No fluff.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a 
                href={formalTemplate("Inquiry: Exploring AI Solutions & Products", "strategic partnership and exploring your AI products")} 
                target="_blank"
                className="btn-primary"
              >
                Book a free call <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ceo@autoplanetcorp.com" 
                target="_blank"
                className="btn-ghost"
              >
                <Mail size={18} /> ceo@autoplanetcorp.com
              </a>
            </Magnetic>
          </div>
        </div>
      </RevealSection>

      <footer>
        <div className="footer-copy">© 2026 AutoPlanet. All rights reserved.</div>
        <ul className="footer-links">
          <li><a href="https://x.com/ceoofautoplanet" target="_blank" rel="noopener noreferrer me">Twitter</a></li>
          <li><a href="https://www.linkedin.com/company/autoplanet-corporation" target="_blank" rel="noopener noreferrer me">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/autoplanet.corp" target="_blank" rel="noopener noreferrer me">Instagram</a></li>
          <li><a href={formalTemplate("General Business Inquiry", "general inquiry regarding AutoPlanet services")} target="_blank">Contact</a></li>
        </ul>
      </footer>
    </>
  );
}

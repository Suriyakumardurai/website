"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Brain,
  Bot,
  Rocket,
  Workflow,
  Smartphone,
  Eye,
  TrendingUp,
  Shield,
  Cpu,
  X,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/content";

/**
 * Mobile-only Service Recommender.
 *
 * A 4-question quiz that recommends the best AI service based on user needs.
 * Questions:
 *  1. What's your main goal? (automate support / build product / analyze data / replace manual work)
 *  2. What's your timeline? (rush / standard / flexible)
 *  3. What's your team size? (solo / small / medium / enterprise)
 *  4. What's most important? (speed / accuracy / cost / ownership)
 *
 * Recommends 1-2 services with reasoning.
 * Lives on the /services page (mobile only).
 *
 * Desktop (lg+) renders nothing.
 */

type Answer = {
  questionId: string;
  value: string;
};

type Question = {
  id: string;
  label: string;
  icon: typeof Sparkles;
  options: { value: string; label: string; desc?: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "goal",
    label: "What's your main goal?",
    icon: Sparkles,
    options: [
      { value: "support", label: "Automate support", desc: "Replace L1/L2 tickets" },
      { value: "product", label: "Build AI product", desc: "SaaS or app" },
      { value: "data", label: "Analyze data", desc: "Insights & predictions" },
      { value: "manual", label: "Replace manual work", desc: "Automate workflows" },
    ],
  },
  {
    id: "timeline",
    label: "What's your timeline?",
    icon: Rocket,
    options: [
      { value: "rush", label: "Rush", desc: "Need it in 2 weeks" },
      { value: "standard", label: "Standard", desc: "4-6 weeks" },
      { value: "flexible", label: "Flexible", desc: "8+ weeks" },
    ],
  },
  {
    id: "team",
    label: "What's your team size?",
    icon: Brain,
    options: [
      { value: "solo", label: "Solo founder" },
      { value: "small", label: "Small team", desc: "2-10 people" },
      { value: "medium", label: "Medium", desc: "11-50 people" },
      { value: "enterprise", label: "Enterprise", desc: "50+ people" },
    ],
  },
  {
    id: "priority",
    label: "What matters most?",
    icon: Check,
    options: [
      { value: "speed", label: "Speed", desc: "Ship fast" },
      { value: "accuracy", label: "Accuracy", desc: "99%+ precision" },
      { value: "cost", label: "Cost", desc: "Maximize ROI" },
      { value: "ownership", label: "Ownership", desc: "100% code + IP" },
    ],
  },
];

// Recommendation logic — maps answers to service IDs
function recommend(answers: Record<string, string>): string[] {
  const goal = answers.goal;
  const priority = answers.priority;
  const team = answers.team;

  const recs: string[] = [];

  // Primary recommendation based on goal
  switch (goal) {
    case "support":
      recs.push("ai-agents");
      break;
    case "product":
      recs.push("ai-saas");
      if (team === "solo" || team === "small") recs.push("mobile");
      break;
    case "data":
      recs.push("predictive");
      recs.push("ml");
      break;
    case "manual":
      recs.push("automation");
      recs.push("ai-agents");
      break;
  }

  // Add based on priority
  if (priority === "accuracy" && !recs.includes("custom-llm")) {
    recs.push("custom-llm");
  }
  if (priority === "ownership" && !recs.includes("security")) {
    recs.push("security");
  }
  if (priority === "speed" && !recs.includes("integrations")) {
    recs.push("integrations");
  }

  // Enterprise team → add security
  if (team === "enterprise" && !recs.includes("security")) {
    recs.push("security");
  }

  return recs.slice(0, 3); // Max 3 recommendations
}

const SERVICE_ICONS: Record<string, typeof Bot> = {
  "ai-agents": Bot,
  "ai-saas": Rocket,
  "custom-llm": Brain,
  automation: Workflow,
  mobile: Smartphone,
  integrations: Cpu,
  security: Shield,
  ml: Cpu,
  cv: Eye,
  predictive: TrendingUp,
  strategy: Sparkles,
};

export default function MobileServiceRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const recommendations = useMemo(() => {
    return recommend(answers).map((id) => services.find((s) => s.id === id)).filter(Boolean);
  }, [answers]);

  const isLastQuestion = step === QUESTIONS.length - 1;

  const selectAnswer = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true);
      } else {
        setStep(step + 1);
      }
    }, 200);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <section className="lg:hidden py-12 relative overflow-hidden">
      <div aria-hidden className="absolute -top-20 right-1/4 w-40 h-32 rounded-full bg-lime-400/8 blur-[60px] pointer-events-none" />

      <div className="safe-px relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] lime-text mb-1">
              <Sparkles className="inline h-3 w-3 mr-1" />
              Service finder
            </p>
            <h2 className="text-2xl font-semibold tracking-tight leading-tight">
              Not sure where to start?
            </h2>
          </div>
          {(step > 0 || showResults) && (
            <button
              onClick={reset}
              aria-label="Restart quiz"
              className="m-tap m-press h-9 w-9 rounded-full m-chip flex items-center justify-center shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {!showResults ? (
          <>
            {/* Progress bar */}
            <div className="flex items-center gap-1.5 mb-4">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    i <= step ? "lime-bg" : "bg-foreground/10"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] font-mono text-muted-foreground/60 mb-3">
              Step {step + 1} of {QUESTIONS.length}
            </p>

            {/* Question + options */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-semibold mb-3">{QUESTIONS[step].label}</p>
                <div className="grid grid-cols-2 gap-2">
                  {QUESTIONS[step].options.map((opt) => {
                    const isSelected = answers[QUESTIONS[step].id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectAnswer(QUESTIONS[step].id, opt.value)}
                        className={`text-left rounded-2xl p-3.5 m-press transition-all border ${
                          isSelected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border m-card-flat hover:bg-muted/40"
                        }`}
                      >
                        <div className="text-sm font-semibold">{opt.label}</div>
                        {opt.desc && (
                          <div className={`text-[10px] mt-1 ${isSelected ? "text-background/60" : "text-muted-foreground"}`}>
                            {opt.desc}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "backOut" }}
                className="inline-flex h-12 w-12 rounded-full bg-lime-400 text-foreground items-center justify-center mb-3"
              >
                <Check className="h-6 w-6" strokeWidth={3} />
              </motion.div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] lime-text mb-1">
                Recommended for you
              </p>
              <h3 className="text-lg font-semibold tracking-tight">
                {recommendations.length} service{recommendations.length !== 1 ? "s" : ""} matched
              </h3>
            </div>

            {/* Recommendation cards */}
            <div className="space-y-2.5">
              {recommendations.map((s, i) => {
                if (!s) return null;
                const Icon = SERVICE_ICONS[s.id] ?? Sparkles;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                    className={`rounded-2xl p-4 relative overflow-hidden ${
                      i === 0 ? "bg-foreground text-background" : "m-card"
                    }`}
                  >
                    {i === 0 && (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-lime-400 text-foreground px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="h-2.5 w-2.5" />
                        Best match
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${i === 0 ? "bg-lime-400 text-foreground" : "bg-foreground text-background"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono ${i === 0 ? "text-background/50" : "text-muted-foreground/50"}`}>
                            {s.num}
                          </span>
                          <h4 className="text-sm font-semibold">{s.title}</h4>
                        </div>
                        <p className={`text-[11px] mt-1 leading-relaxed ${i === 0 ? "text-background/70" : "text-muted-foreground"}`}>
                          {s.desc}
                        </p>
                        <ul className="mt-2 space-y-0.5">
                          {s.points.slice(0, 2).map((p) => (
                            <li key={p} className={`flex items-start gap-1.5 text-[10px] ${i === 0 ? "text-background/80" : "text-foreground/80"}`}>
                              <Check className={`h-3 w-3 mt-0.5 shrink-0 ${i === 0 ? "text-lime-400" : "lime-text"}`} />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center gap-1.5 h-11 rounded-full bg-foreground text-background text-sm font-semibold m-press"
            >
              <Sparkles className="h-4 w-4 text-lime-400" />
              Get a custom recommendation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

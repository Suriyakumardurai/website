"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Target, Rocket, ChevronLeft } from "lucide-react";
import { Magnetic } from "../Animate";

const questions = [
  {
    id: "type",
    title: "What are you building?",
    options: [
      { id: "feature", label: "Single AI Feature", icon: Sparkles, desc: "A specific tool or integration." },
      { id: "product", label: "End-to-End Product", icon: Rocket, desc: "A complete AI-native SaaS or App." },
      { id: "enterprise", label: "Enterprise Workflow", icon: Target, desc: "Complex autonomous agent pipelines." }
    ]
  },
  {
    id: "timeline",
    title: "What's your timeline?",
    options: [
      { id: "asap", label: "Aggressive", icon: Clock, desc: "I need this live in under 2-3 weeks." },
      { id: "standard", label: "Standard", icon: Clock, desc: "Quality-focused (4-8 weeks)." },
      { id: "partnership", label: "Ongoing", icon: Clock, desc: "Looking for an embedded AI partner." }
    ]
  },
  {
    id: "stage",
    title: "What's your current stage?",
    options: [
      { id: "idea", label: "Napkin Idea", icon: Sparkles, desc: "Early concept, needs full scoping." },
      { id: "mvp", label: "Existing MVP", icon: Rocket, desc: "We have something but need AI scaling." },
      { id: "enterprise", label: "Established Business", icon: Target, desc: "Integrating AI into complex systems." }
    ]
  }
];

export default function ScopeEstimator() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (questionId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [questionId]: optionId }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setSelections({});
    setShowResult(false);
  };

  const getGmailLink = () => {
    const recipient = "sales@autoplanetcorp.com";
    const subject = `Scope Estimate Request: ${selections.type} (${selections.timeline})`;
    const body = `Dear AutoPlanet Team,

I've just completed the Scope Estimator on your website. Here are my preliminary project details:

Project Type: ${selections.type}
Timeline: ${selections.timeline}
Current Stage: ${selections.stage}

I'm interested in receiving a formal scope document and precise timeline within 24 hours.

[Briefly describe your project here]

Best regards,
[Your Name]`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="scope-estimator-wrap">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="estimator-card"
          >
            <div className="estimator-header">
              <div className="step-count">Step {step + 1} of {questions.length}</div>
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="question-title">{questions[step].title}</h3>

            <div className="options-grid">
              {questions[step].options.map((opt) => (
                <button 
                  key={opt.id}
                  className={`option-btn ${selections[questions[step].id] === opt.id ? "selected" : ""}`}
                  onClick={() => handleSelect(questions[step].id, opt.id)}
                >
                  <div className="option-icon"><opt.icon size={20} /></div>
                  <div className="option-content">
                    <div className="option-label">{opt.label}</div>
                    <div className="option-desc">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                <ChevronLeft size={16} /> Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="result-card"
          >
            <div className="result-glow" />
            <div className="result-header">
              <div className="result-tag">Estimated Match</div>
              <h2>Targeting your roadmap.</h2>
            </div>

            <div className="estimate-metrics">
              <div className="metric">
                <div className="metric-label">Projected Timeline</div>
                <div className="metric-value">
                  {selections.timeline === 'asap' ? '14-21 Days' : selections.timeline === 'standard' ? '4-8 Weeks' : 'Ongoing Partner'}
                </div>
              </div>
              <div className="metric">
                <div className="metric-label">Architecture Focus</div>
                <div className="metric-value">
                  {selections.type === 'feature' ? 'Integration-First' : selections.type === 'product' ? 'Full AI Stack' : 'Autonomous Agents'}
                </div>
              </div>
            </div>

            <div className="result-actions">
              <Magnetic>
                <a href={getGmailLink()} target="_blank" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Final Scope in 24h <ArrowRight size={18} />
                </a>
              </Magnetic>
              <button className="reset-btn" onClick={reset}>Redo Estimation</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}

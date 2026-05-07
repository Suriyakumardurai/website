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
    const recipient = "ceo@autoplanetcorp.com";
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

      <style jsx>{`
        .scope-estimator-wrap {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .estimator-card, .result-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .result-card {
          border-color: rgba(200, 169, 110, 0.2);
        }

        .result-glow {
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(200, 169, 110, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .estimator-header {
          margin-bottom: 32px;
        }

        .step-count {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #c8a96e;
          box-shadow: 0 0 10px rgba(200, 169, 110, 0.5);
        }

        .question-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          margin-bottom: 32px;
          color: white;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .option-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .option-btn.selected {
          border-color: #c8a96e;
          background: rgba(200, 169, 110, 0.05);
        }

        .option-icon {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.2s;
        }

        .option-btn:hover .option-icon, .option-btn.selected .option-icon {
          color: #c8a96e;
          background: rgba(200, 169, 110, 0.1);
        }

        .option-label {
          font-weight: 500;
          color: white;
          margin-bottom: 2px;
        }

        .option-desc {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .back-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          margin-top: 10px;
        }

        .back-btn:hover {
          color: white;
        }

        .result-tag {
          font-size: 0.75rem;
          color: #c8a96e;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .result-card h2 {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          margin-bottom: 32px;
          line-height: 1.1;
        }

        .estimate-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 40px;
        }

        .metric {
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }

        .metric-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 8px;
        }

        .metric-value {
          font-size: 1.1rem;
          font-weight: 500;
          color: white;
        }

        .result-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .reset-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .reset-btn:hover {
          color: white;
        }

        @media (max-width: 600px) {
          .estimator-card, .result-card {
            padding: 30px 20px;
          }
          .estimate-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

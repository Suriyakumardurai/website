"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useInView, motion } from "framer-motion";

const JOBS = [
  {
    id: 'AP-0017', lead: 'Ravi Sharma · TechCorp India',
    events: [
      { step:0, color:'#3dd68c', action:'LinkedIn profile scraped', model:'GPT-4o', detail:'Found {val} leads matching ICP · sector: SaaS', val:'34', time:'0.3s' },
      { step:0, color:'#3dd68c', action:'Company data pulled', model:null, detail:'Employees: 120 · ARR: $2.1M · Tech stack: React, Node', val:null, time:'0.6s' },
      { step:1, color:'#5ba4f5', action:'ICP score calculated', model:'Claude 3.5', detail:'Score {val}/100 · Fit: High · Decision maker confirmed', val:'87', time:'0.9s' },
      { step:2, color:'#a78bfa', action:'CRM record enriched', model:'GPT-4o', detail:'Added job title, LinkedIn, phone, intent signals', val:null, time:'1.4s' },
      { step:2, color:'#a78bfa', action:'Pain points identified', model:'Claude 3.5', detail:'Manual reporting · No automation · Scaling issues', val:null, time:'1.8s' },
      { step:3, color:'#f59e0b', action:'Personalised email drafted', model:'GPT-4o', detail:'{val} tokens · Subject line A/B tested · Tone: warm', val:'312', time:'2.1s' },
      { step:3, color:'#f59e0b', action:'Email sent via Instantly', model:null, detail:'Delivered · Open tracking enabled · Follow-up queued in 3d', val:null, time:'2.4s' },
      { step:4, color:'#3dd68c', action:'HubSpot contact updated', model:null, detail:'Stage → Contacted · Tags: ICP-High, Q1-Outreach', val:null, time:'2.7s' },
      { step:5, color:'#c8a96e', action:'Slack alert fired', model:null, detail:'#sales-alerts · Hot lead notification sent to team', val:null, time:'2.9s' },
    ]
  },
  {
    id: 'AP-0018', lead: 'Priya Nair · GrowthOS',
    events: [
      { step:0, color:'#3dd68c', action:'Apollo.io search triggered', model:'GPT-4o', detail:'Query: "Head of Ops" · SaaS · 50-200 employees · India', val:null, time:'0.2s' },
      { step:0, color:'#3dd68c', action:'{val} prospects discovered', model:null, detail:'Filtered by tech stack, funding stage, growth signals', val:'58', time:'0.5s' },
      { step:1, color:'#5ba4f5', action:'Prospect qualified via AI', model:'Gemini', detail:'Buying signals detected · Budget indicators: strong', val:null, time:'0.9s' },
      { step:2, color:'#a78bfa', action:'Enrichment complete', model:'Claude 3.5', detail:'LinkedIn summary, company news, recent hires pulled', val:null, time:'1.3s' },
      { step:3, color:'#f59e0b', action:'Cold email personalised', model:'GPT-4o', detail:'Referenced: recent funding round · {val}% open rate expected', val:'41', time:'1.8s' },
      { step:3, color:'#f59e0b', action:'Sequence enrolled', model:null, detail:'5-step follow-up · SMS fallback at step 3', val:null, time:'2.1s' },
      { step:4, color:'#3dd68c', action:'Pipedrive deal created', model:null, detail:'Value: ₹4.2L est. · Owner: auto-assigned · Pipeline: Inbound AI', val:null, time:'2.5s' },
      { step:5, color:'#c8a96e', action:'Slack + Notion logged', model:null, detail:'Meeting link attached · CRM note synced', val:null, time:'2.8s' },
    ]
  },
  {
    id: 'AP-0019', lead: 'Ankit Mehta · FinPulse',
    events: [
      { step:0, color:'#3dd68c', action:'Website visitor deanonymised', model:'GPT-4o', detail:'Via Clearbit · Company: FinPulse · Page: /pricing × 3', val:null, time:'0.1s' },
      { step:1, color:'#5ba4f5', action:'Intent score: critical', model:'Claude 3.5', detail:'{val}/100 · Visited pricing 3x · Watched demo video', val:'94', time:'0.4s' },
      { step:2, color:'#a78bfa', action:'Deep enrichment run', model:'GPT-4o', detail:'Series A · $3.2M raised · Hiring ML Engineers', val:null, time:'0.8s' },
      { step:2, color:'#a78bfa', action:'Decision maker found', model:'Gemini', detail:'CTO: Ankit Mehta · Contact: verified · Seniority: C-level', val:null, time:'1.1s' },
      { step:3, color:'#f59e0b', action:'Hyper-personalised email', model:'Claude 3.5', detail:'Mentioned: recent Series A · hiring signal · demo interest', val:null, time:'1.6s' },
      { step:3, color:'#f59e0b', action:'LinkedIn DM queued', model:null, detail:'Sending via Expandi · personalized voice note draft ready', val:null, time:'2.0s' },
      { step:4, color:'#3dd68c', action:'CRM enriched + scored', model:null, detail:'Priority: P0 · Owner notified · Slack DM to founder', val:null, time:'2.4s' },
      { step:5, color:'#c8a96e', action:'Founder alert: HOT LEAD', model:null, detail:'All signals: intent + ICP + funding + visiting pricing', val:null, time:'2.7s' },
    ]
  }
];

export default function LivePipeline() {
  const [currentJobIdx, setCurrentJobIdx] = useState(0);
  const [currentEventIdx, setCurrentEventIdx] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ s1: 1041, s2: 892, s3: 768, s4: 2.5, taskCount: 1247, queueCount: 12, jobNum: 17 });
  const [stepStates, setStepStates] = useState([0, 0, 0, 0, 0, 0]); // 0=idle, 1=active, 2=done
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const job = JOBS[currentJobIdx % JOBS.length];

  // Random stats background updates
  useEffect(() => {
    if (!isInView || !mounted) return;
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        s1: prev.s1 + (Math.random() > 0.8 ? 1 : 0),
        s2: prev.s2 + (Math.random() > 0.9 ? 1 : 0),
        taskCount: prev.taskCount + (Math.random() > 0.7 ? 1 : 0),
        s4: 2.3 + Math.random() * 0.8
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, [isInView, mounted]);

  // Main pipeline logic
  useEffect(() => {
    if (!isInView || !mounted) return;

    if (currentEventIdx < job.events.length) {
      const event = job.events[currentEventIdx];
      const delay = 900 + Math.random() * 600;

      const timeout = setTimeout(() => {
        // Update step states
        setStepStates(prev => {
          const next = [...prev];
          const stepIdx = event.step;
          // Mark previous steps as done
          for (let i = 0; i < stepIdx; i++) {
            if (next[i] !== 2) next[i] = 2;
          }
          next[stepIdx] = 1;
          return next;
        });

        // Add log entry
        setLogs(prev => {
          const newLogs = [...prev, { ...event, id: Date.now() }];
          return newLogs.slice(-7);
        });

        // Update progress
        setProgress(Math.round(((currentEventIdx + 1) / job.events.length) * 100));

        // Randomly bump stats
        if (Math.random() > 0.6) {
          setStats(prev => ({
            ...prev,
            s1: prev.s1 + 1,
            s2: prev.s2 + (Math.random() > 0.5 ? 1 : 0),
            taskCount: prev.taskCount + 1
          }));
        }

        setCurrentEventIdx(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // Job complete
      const timeout = setTimeout(() => {
        setStepStates([2, 2, 2, 2, 2, 2]);
        setStats(prev => ({
          ...prev,
          s1: prev.s1 + Math.floor(Math.random() * 4) + 2,
          s2: prev.s2 + Math.floor(Math.random() * 3) + 1,
          s3: prev.s3 + Math.floor(Math.random() * 3) + 1,
          taskCount: prev.taskCount + Math.floor(Math.random() * 6) + 3,
          queueCount: Math.max(3, prev.queueCount - 1 + Math.floor(Math.random() * 3)),
          jobNum: prev.jobNum + 1,
          s4: 2.3 + Math.random() * 0.8
        }));

        setTimeout(() => {
          setCurrentJobIdx(prev => prev + 1);
          setCurrentEventIdx(0);
          setLogs([]);
          setProgress(0);
          setStepStates([0, 0, 0, 0, 0, 0]);
        }, 3200);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentEventIdx, currentJobIdx, job.events.length, isInView, mounted]);

  return (
    <motion.div 
      className="pipeline-container-root"
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <style jsx>{`
        .pipeline-container-root {
          --bg: #07080c;
          --surface: #0d0f16;
          --surface2: #12151f;
          --border: rgba(255,255,255,0.06);
          --border-active: rgba(255,255,255,0.14);
          --text: #e8e6e0;
          --muted: rgba(232,230,224,0.38);
          --accent: #c8a96e;
          --accent-dim: rgba(200,169,110,0.12);
          --green: #3dd68c;
          --green-dim: rgba(61,214,140,0.1);
          --blue: #5ba4f5;
          --blue-dim: rgba(91,164,245,0.1);
          --purple: #a78bfa;
          --purple-dim: rgba(167,139,250,0.1);
          --amber: #f59e0b;
          --amber-dim: rgba(245,158,11,0.1);
          --red: #f87171;
          --red-dim: rgba(248,113,113,0.1);
          
          width: 100%;
          height: 100%;
          font-family: 'Geist Mono', monospace;
          color: var(--text);
        }

        .pipeline-card {
          width: 100%;
          height: 100%;
          min-height: 600px;
          background: var(--surface);
          border-radius: 20px;
          border: 0.5px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .pipeline-card::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%);
          top: -100px; left: -100px;
          pointer-events: none;
          z-index: 0;
        }

        .pipeline-card::after {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(91,164,245,0.04) 0%, transparent 70%);
          bottom: -50px; right: -50px;
          pointer-events: none;
          z-index: 0;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 0.5px solid var(--border);
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        .header-left { display: flex; align-items: center; gap: 10px; }

        .live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--green);
          background: var(--green-dim);
          border: 0.5px solid rgba(61,214,140,0.2);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .live-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--green);
          animation: livePulse 1.8s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .header-title {
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .throughput { font-size: 10px; color: var(--muted); letter-spacing: 0.04em; }
        .throughput span { color: var(--accent); font-size: 12px; }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 0.5px solid var(--border);
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        .stat {
          padding: 12px 16px;
          border-right: 0.5px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .stat:last-child { border-right: none; }

        .stat-val {
          font-size: 18px;
          font-weight: 500;
          color: var(--text);
          line-height: 1;
          margin-bottom: 3px;
          font-family: 'Instrument Serif', serif;
          font-style: italic;
        }

        .stat-label { font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }

        .stat-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0.5;
          transition: width 0.8s ease;
        }

        .pipeline-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          z-index: 2;
        }

        .job-header {
          padding: 14px 20px 10px;
          border-bottom: 0.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .job-id { font-size: 10px; color: var(--muted); letter-spacing: 0.05em; }
        .job-id strong { color: var(--accent); font-weight: 400; }

        .job-progress-wrap {
          flex: 1;
          margin: 0 20px;
          height: 2px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
        }

        .job-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent) 0%, var(--blue) 100%);
          border-radius: 2px;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }

        .job-pct { font-size: 10px; color: var(--muted); min-width: 32px; text-align: right; }

        .steps-track { padding: 0 20px; flex-shrink: 0; margin-top: 14px; }
        .steps-row { display: flex; align-items: center; gap: 0; margin-bottom: 10px; }

        .step-node { display: flex; flex-direction: column; align-items: center; gap: 5px; position: relative; flex: 1; }

        .step-icon {
          width: 32px; height: 32px;
          border-radius: 9px;
          border: 0.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          background: var(--surface2);
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .step-icon.done { border-color: rgba(61,214,140,0.4); background: var(--green-dim); box-shadow: 0 0 12px rgba(61,214,140,0.12); }
        .step-icon.active { border-color: rgba(200,169,110,0.5); background: var(--accent-dim); box-shadow: 0 0 16px rgba(200,169,110,0.15); animation: stepPulse 1.2s ease-in-out infinite; }

        @keyframes stepPulse {
          0%, 100% { box-shadow: 0 0 16px rgba(200,169,110,0.15); }
          50% { box-shadow: 0 0 24px rgba(200,169,110,0.3); }
        }

        .step-label { font-size: 8.5px; letter-spacing: 0.04em; color: var(--muted); text-align: center; text-transform: uppercase; max-width: 60px; line-height: 1.3; transition: color 0.4s; }
        .step-label.active { color: var(--accent); }
        .step-label.done { color: var(--green); }

        .step-connector { flex: 1; height: 1px; background: var(--border); position: relative; overflow: hidden; margin-bottom: 18px; max-width: 40px; }
        .step-connector-fill { position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, var(--green), var(--accent)); transition: width 0.8s ease; }
        .step-connector-fill.active { animation: connectorFlow 1s ease infinite; }

        @keyframes connectorFlow {
          0% { width: 0%; left: 0; }
          100% { width: 100%; left: 0; }
        }

        .log-feed { flex: 1; padding: 6px 20px 12px; overflow: hidden; display: flex; flex-direction: column; gap: 3px; position: relative; }
        .log-feed::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 30px; background: linear-gradient(to bottom, var(--surface), transparent); z-index: 2; pointer-events: none; }

        .log-entry { display: flex; align-items: flex-start; gap: 10px; padding: 8px 12px; border-radius: 8px; border: 0.5px solid transparent; font-size: 11.5px; line-height: 1.4; opacity: 1; transform: translateY(0); transition: all 0.4s ease; flex-shrink: 0; position: relative; overflow: hidden; }
        .log-entry.new-entry { border-color: rgba(200,169,110,0.2); background: var(--accent-dim); }
        
        .log-entry.new-entry::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(200,169,110,0.07), transparent);
          animation: sweepShimmer 0.8s ease forwards;
        }

        @keyframes sweepShimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .log-indicator { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .log-content { flex: 1; min-width: 0; }
        .log-main { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .log-action { font-size: 11.5px; color: var(--text); font-weight: 400; }
        .log-model { font-size: 10px; color: var(--blue); background: var(--blue-dim); padding: 1px 7px; border-radius: 4px; border: 0.5px solid rgba(91,164,245,0.18); }
        .log-detail { font-size: 10px; color: var(--muted); margin-top: 2px; line-height: 1.4; }
        .log-detail .val { color: var(--accent); }
        .log-time { font-size: 9.5px; color: var(--muted); white-space: nowrap; flex-shrink: 0; align-self: flex-start; margin-top: 3px; letter-spacing: 0.02em; }

        .typing-cursor { display: inline-block; width: 5px; height: 11px; background: var(--accent); vertical-align: middle; margin-left: 3px; animation: blink 0.9s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .bottom-bar { border-top: 0.5px solid var(--border); padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; position: relative; z-index: 2; }
        .bottom-queue { font-size: 10px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
        .queue-count { background: rgba(245,158,11,0.12); border: 0.5px solid rgba(245,158,11,0.2); color: var(--amber); padding: 1px 7px; border-radius: 4px; font-size: 10px; }
        .bottom-models { display: flex; gap: 6px; align-items: center; }
        .model-pill { font-size: 9px; letter-spacing: 0.04em; padding: 2px 8px; border-radius: 4px; border: 0.5px solid var(--border); color: var(--muted); display: flex; align-items: center; gap: 4px; }
        .model-pill .dot { width: 4px; height: 4px; border-radius: 50%; }

        .scanlines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px); pointer-events: none; z-index: 10; border-radius: 20px; }

        @media (max-width: 1024px) {
          .pipeline-card { min-height: 550px; }
          .stats-row { grid-template-columns: repeat(4, 1fr); }
          .stat { padding: 12px; }
          .stat-val { font-size: 16px; }
          .steps-track { margin-top: 15px; }
        }

        @media (max-width: 640px) {
          .pipeline-card { min-height: 500px; }
          .header { flex-direction: column; align-items: flex-start; gap: 12px; padding: 12px 16px; }
          .header-right { align-self: flex-end; }
          
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .stat { padding: 10px 12px; }
          .stat:nth-child(2) { border-right: none; }
          .stat:nth-child(1), .stat:nth-child(2) { border-bottom: 0.5px solid var(--border); }
          .stat-val { font-size: 16px; }
          
          .job-header { padding: 10px 16px; flex-direction: column; align-items: flex-start; gap: 8px; }
          .job-progress-wrap { margin: 0; width: 100%; height: 1.5px; }
          .job-pct { align-self: flex-end; margin-top: -18px; }
          
          .steps-track { padding: 0 16px; margin-top: 10px; }
          .steps-row { flex-wrap: wrap; gap: 8px; justify-content: space-between; }
          .step-node { flex: 0 0 calc(33.33% - 8px); min-width: 0; }
          .step-connector { display: none; }
          .step-label { font-size: 7.5px; max-width: none; }
          .step-icon { width: 28px; height: 28px; font-size: 11px; }
          
          .log-feed { padding: 4px 16px 10px; }
          .log-entry { padding: 6px 10px; font-size: 10.5px; gap: 8px; }
          .log-main { gap: 6px; }
          
          .bottom-bar { padding: 10px 16px; flex-direction: column; gap: 10px; align-items: flex-start; }
          .bottom-models { width: 100%; overflow-x: auto; padding-bottom: 4px; }
        }

        @media (max-width: 380px) {
          .stat-val { font-size: 14px; }
          .step-node { flex: 0 0 calc(50% - 8px); }
          .header-title { font-size: 8px; letter-spacing: 0.02em; }
          .live-badge { padding: 3px 8px; font-size: 9px; }
        }
      `}</style>

      <div className="pipeline-card">
        <div className="scanlines"></div>

        <div className="header">
          <div className="header-left">
            <div className="live-badge">
              <div className="live-dot"></div>
              Live
            </div>
            <span className="header-title">AutoPlanet · AI Workflow Engine</span>
          </div>
          <div className="header-right">
            <div className="throughput">Tasks today <span>{mounted ? stats.taskCount.toLocaleString() : "1,247"}</span></div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-val">{mounted ? stats.s1.toLocaleString() : "1,041"}</div>
            <div className="stat-label">Leads scraped</div>
            <div className="stat-bar" style={{ width: `${Math.min(100, (stats.s1 / 12) % 100)}%` }}></div>
          </div>
          <div className="stat">
            <div className="stat-val">{mounted ? stats.s2.toLocaleString() : "892"}</div>
            <div className="stat-label">CRM entries enriched</div>
            <div className="stat-bar" style={{ width: `${Math.min(100, (stats.s2 / 9) % 100)}%`, background: 'var(--blue)' }}></div>
          </div>
          <div className="stat">
            <div className="stat-val">{mounted ? stats.s3.toLocaleString() : "768"}</div>
            <div className="stat-label">Emails sent</div>
            <div className="stat-bar" style={{ width: `${Math.min(100, (stats.s3 / 8) % 100)}%`, background: 'var(--green)' }}></div>
          </div>
          <div className="stat">
            <div className="stat-val">{mounted ? stats.s4.toFixed(1) : "2.5"}s</div>
            <div className="stat-label">Avg time / lead</div>
            <div className="stat-bar" style={{ width: '60%', background: 'var(--purple)' }}></div>
          </div>
        </div>

        <div className="pipeline-body">
          <div className="job-header">
            <div className="job-id">JOB <strong>#AP-{mounted ? String(stats.jobNum).padStart(4, '0') : "0017"}</strong></div>
            <div className="job-progress-wrap">
              <div className="job-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="job-pct">{progress}%</div>
          </div>

          <div className="steps-track">
            <div className="steps-row">
              {[
                { icon: '🔍', label: 'Discover' },
                { icon: '📋', label: 'Qualify' },
                { icon: '🧠', label: 'Enrich' },
                { icon: '✉️', label: 'Outreach' },
                { icon: '📬', label: 'CRM sync' },
                { icon: '🔔', label: 'Notify' }
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div className="step-node">
                    <div className={`step-icon ${stepStates[i] === 1 ? 'active' : stepStates[i] === 2 ? 'done' : ''}`}>{step.icon}</div>
                    <div className={`step-label ${stepStates[i] === 1 ? 'active' : stepStates[i] === 2 ? 'done' : ''}`}>{step.label}</div>
                  </div>
                  {i < 5 && (
                    <div className="step-connector">
                      <div className={`step-connector-fill ${stepStates[i] === 1 ? 'active' : ''}`} style={{ width: stepStates[i] === 2 ? '100%' : '0%' }}></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="log-feed">
            {logs.map((log, i) => (
              <div key={log.id} className={`log-entry ${i === logs.length - 1 ? 'new-entry' : ''}`}>
                <div className="log-indicator" style={{ background: log.color, boxShadow: `0 0 6px ${log.color}44` }}></div>
                <div className="log-content">
                  <div className="log-main">
                    <span className="log-action">
                      {log.action}
                      {i === logs.length - 1 && <span className="typing-cursor"></span>}
                    </span>
                    {log.model && <span className="log-model">{log.model}</span>}
                  </div>
                  {log.detail && (
                    <div className="log-detail" dangerouslySetInnerHTML={{ 
                      __html: log.detail.replace('{val}', `<span class="val">${log.val || ''}</span>`) 
                    }}></div>
                  )}
                </div>
                <div className="log-time">{log.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-bar">
          <div className="bottom-queue">
            Queued <span className="queue-count">{stats.queueCount}</span> workflows
          </div>
          <div className="bottom-models">
            <div className="model-pill"><div className="dot" style={{ background: 'var(--green)' }}></div>GPT-4o</div>
            <div className="model-pill"><div className="dot" style={{ background: 'var(--blue)' }}></div>Claude 3.5</div>
            <div className="model-pill"><div className="dot" style={{ background: 'var(--purple)' }}></div>Gemini</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

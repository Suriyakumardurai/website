'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Cpu, Database, Cloud, Zap, ArrowRight, Info } from 'lucide-react';
import { Magnetic } from '@/components/Animate';

export default function LLMCostCalculator() {
  const [dataSize, setDataSize] = useState(50000);
  const [modelType, setModelType] = useState('llama3-8b');
  const [deployment, setDeployment] = useState('cloud');
  const [isFineTuned, setIsFineTuned] = useState(true);
  
  const [estimate, setEstimate] = useState({ min: 0, max: 0 });

  useEffect(() => {
    // Logic for calculation
    let basePrice = 250000;
    
    // Model complexity
    if (modelType === 'llama3-70b') basePrice += 300000;
    if (modelType === 'mistral-large') basePrice += 200000;
    
    // Data scaling
    const dataMultiplier = Math.max(1, dataSize / 10000);
    basePrice += dataMultiplier * 5000;
    
    // Deployment
    if (deployment === 'on-prem') basePrice += 150000;
    
    // Fine-tuning overhead
    if (isFineTuned) basePrice *= 1.4;

    setEstimate({
      min: Math.round(basePrice * 0.9),
      max: Math.round(basePrice * 1.2)
    });
  }, [dataSize, modelType, deployment, isFineTuned]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="tool-container" style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="tool-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="section-tag" style={{ margin: '0 auto 1rem' }}>Programmatic SEO Tool</div>
        <h1 className="h1-reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
          LLM Development <span className="text-glow">Cost Calculator</span>
        </h1>
        <p className="section-sub" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Estimate the investment required for a custom, domain-specific language model tailored to your enterprise data and security needs.
        </p>
      </div>

      <div className="tool-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* INPUTS */}
        <div className="tool-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px' }}>
          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px', fontWeight: 500 }}>
              <Database size={18} className="text-glow" /> Estimated Training Data (Tokens/Samples)
            </label>
            <input 
              type="range" 
              min="10000" 
              max="1000000" 
              step="10000" 
              value={dataSize} 
              onChange={(e) => setDataSize(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              <span>10k</span>
              <span className="text-glow" style={{ color: 'white', fontWeight: 'bold' }}>{dataSize.toLocaleString()} units</span>
              <span>1M</span>
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px', fontWeight: 500 }}>
              <Cpu size={18} className="text-glow" /> Foundation Model Architecture
            </label>
            <select 
              value={modelType} 
              onChange={(e) => setModelType(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px', color: 'white', outline: 'none' }}
            >
              <option value="llama3-8b">Llama 3.1 - 8B (Fast, Efficient)</option>
              <option value="llama3-70b">Llama 3.1 - 70B (State-of-the-art Reasoning)</option>
              <option value="mistral-large">Mistral Large 2 (Multilingual Expert)</option>
              <option value="phi3">Phi-3 Mini (Edge Optimization)</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px', fontWeight: 500 }}>
              <Cloud size={18} className="text-glow" /> Deployment Environment
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button 
                onClick={() => setDeployment('cloud')}
                style={{ padding: '14px', borderRadius: '12px', border: '1px solid', borderColor: deployment === 'cloud' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', background: deployment === 'cloud' ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent', color: 'white', transition: 'all 0.3s' }}
              >
                Managed Cloud
              </button>
              <button 
                onClick={() => setDeployment('on-prem')}
                style={{ padding: '14px', borderRadius: '12px', border: '1px solid', borderColor: deployment === 'on-prem' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', background: deployment === 'on-prem' ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent', color: 'white', transition: 'all 0.3s' }}
              >
                On-Premise / VPC
              </button>
            </div>
          </div>

          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={isFineTuned} 
                onChange={(e) => setIsFineTuned(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
              />
              <span style={{ fontWeight: 500 }}>Include Deep Fine-Tuning (SFT + DPO)</span>
            </label>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', paddingLeft: '26px' }}>
              Highly recommended for specialized domains like Medical, Legal, or proprietary Internal Ops.
            </p>
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="output-card" style={{ position: 'sticky', top: '120px' }}>
          <motion.div 
            key={`${estimate.min}-${estimate.max}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.15) 0%, rgba(var(--accent-rgb), 0.05) 100%)', border: '1px solid var(--accent-primary)', borderRadius: '24px', padding: '50px', textAlign: 'center' }}
          >
            <Calculator size={48} className="text-glow" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', fontWeight: 500 }}>Estimated Investment</h3>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
              {formatPrice(estimate.min)} — {formatPrice(estimate.max)}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '32px' }}>
              *This is a preliminary estimate. Final pricing depends on data quality and specific integration complexity.
            </p>

            <Magnetic>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@autoplanetcorp.com&su=Custom LLM Architecture Review Request&body=Hi Suriya,%0D%0A%0D%0AWe used the LLM Cost Calculator and would like a formal architecture review for our project.%0D%0A%0D%0AProject Details:%0D%0A- Model: "
                target="_blank" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '18px' }}
              >
                Get Formal Architecture Review <ArrowRight size={20} />
              </a>
            </Magnetic>
          </motion.div>

          <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
              <Info size={16} className="text-glow" /> Why these variables matter?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>
              Google's ranking algorithm prioritizes 'Calculators' because they provide immediate utility, leading to higher <strong>dwell time</strong> and <strong>backlink potential</strong>. This tool is optimized to capture 'Transactional' intent from users looking to build custom AI solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

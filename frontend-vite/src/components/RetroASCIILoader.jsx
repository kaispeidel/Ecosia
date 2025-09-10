import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const RetroASCIILoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: "SCRAPING", duration: 800 },
    { text: "ANALYZING", duration: 800 },
    { text: "FORMING SUGGESTIONS", duration: 800 },
    { text: "FINDING PLACES", duration: 800 }
  ];

  useEffect(() => {
    let stepTimer;
    let progressTimer;

    const startStep = (stepIndex) => {
      setCurrentStep(stepIndex);
      setProgress(0);

      // Animate progress for current step
      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            
            // Move to next step or complete
            if (stepIndex < steps.length - 1) {
              setTimeout(() => startStep(stepIndex + 1), 200);
            } else {
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 300);
            }
            return 100;
          }
          return prev + 5;
        });
      }, steps[stepIndex].duration / 20);
    };

    startStep(0);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(stepTimer);
    };
  }, [onComplete]);

  const createProgressBar = (progress) => {
    const totalBars = 20;
    const filledBars = Math.floor((progress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return '█'.repeat(filledBars) + '░'.repeat(emptyBars);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'auto';
    };
  }, []);

  const cream = '#f5f4f0';
  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(45,63,47,0.98), rgba(60,79,62,0.98))',
        zIndex: 2147483647,
        pointerEvents: 'auto',
        backdropFilter: 'blur(3px)'
      }}
    >
      <div style={{ textAlign: 'center', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace' }}>
        {/* Main Box (border-only, square corners) */}
        <div style={{ border: `2px solid ${cream}`, padding: '2rem', background: 'transparent', borderRadius: '0px', boxShadow: 'none', maxWidth: '520px', margin: '0 1rem' }}>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-wider mb-4" style={{ color: cream }}>
              {steps[currentStep].text}
            </h2>

            {/* Animated area on white background (only lines inside) */}
            <div style={{ background: 'transparent', padding: '1rem', borderRadius: '0px', display: 'inline-block', minWidth: '320px',  }}>
              <div className="text-2xl mb-4" style={{ lineHeight: 1.1 }}>
                {currentStep === 0 && (
                  <span className="animate-pulse" style={{ color: cream }}>● ○ ○ ○</span>
                )}
                {currentStep === 1 && (
                  <span className="animate-pulse" style={{ color: cream }}>● ● ○ ○</span>
                )}
                {currentStep === 2 && (
                  <span className="animate-pulse" style={{ color: cream }}>● ● ● ○</span>
                )}
                {currentStep === 3 && (
                  <span className="animate-pulse" style={{ color: cream }}>● ● ● ●</span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="text-sm" style={{ color: cream, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace' }}>
                [<span style={{ color: cream }}>{createProgressBar(progress)}</span>] <span style={{ marginLeft: 6 }}>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default RetroASCIILoader;

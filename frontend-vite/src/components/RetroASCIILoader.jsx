import React, { useState, useEffect } from 'react';

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

  return (
    <div className="fixed inset-0 bg-white text-gray-800 font-mono flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Box */}
        <div className="border-2 border-gray-800 p-8 bg-white shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-wider mb-4">
              {steps[currentStep].text}
            </h2>
            
            {/* Simple animated dots */}
            <div className="text-2xl mb-6">
              {currentStep === 0 && (
                <span className="animate-pulse">● ○ ○ ○</span>
              )}
              {currentStep === 1 && (
                <span className="animate-pulse">● ● ○ ○</span>
              )}
              {currentStep === 2 && (
                <span className="animate-pulse">● ● ● ○</span>
              )}
              {currentStep === 3 && (
                <span className="animate-pulse">● ● ● ●</span>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="text-sm mb-2">
              [{createProgressBar(progress)}] {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroASCIILoader;

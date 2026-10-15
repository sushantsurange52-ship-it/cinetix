import React from 'react';
import { Check, User, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StepProgress({ currentStep, setStep }) {
  const steps = [
    { id: 1, title: 'ATTENDEE INFO', icon: User },
    { id: 2, title: 'PAYMENT', icon: CreditCard },
    { id: 3, title: 'CONFIRM & PASS', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative flex items-center justify-between">
        {/* Continuous background track line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0" />

        {/* Active Progress Fill */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#C8FF00] z-0 shadow-[0_0_10px_#C8FF00]"
          initial={false}
          animate={{
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        {/* Step Nodes — Sharp Solid CAMP Square/Hex Nodes */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (step.id < currentStep) setStep(step.id);
                }}
                disabled={step.id > currentStep}
                className={`w-10 h-10 flex items-center justify-center font-mono font-bold text-xs transition-all duration-200 border ${
                  isCompleted
                    ? 'bg-[#C8FF00] text-black border-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.4)] cursor-pointer'
                    : isCurrent
                    ? 'bg-[#0a0a0f] text-[#C8FF00] border-[#C8FF00] shadow-[0_0_20px_rgba(200,255,0,0.6)]'
                    : 'bg-[#11121a] text-slate-600 border-white/10 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </button>

              <span
                className={`mt-2 font-mono text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-[#C8FF00]'
                    : isCompleted
                    ? 'text-white'
                    : 'text-slate-600'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

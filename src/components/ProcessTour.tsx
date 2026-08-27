import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';

interface ProcessTourProps {
  onQuoteClick?: () => void;
}

export const ProcessTour: React.FC<ProcessTourProps> = ({ onQuoteClick }) => {
  const [activeStep, setActiveStep] = useState(0);

  const step = PROCESS_STEPS[activeStep];

  return (
    <section id="process-storytelling" className="py-24 bg-canvas-deep border-t border-white/10 relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-accent text-xs font-mono-code uppercase tracking-[0.2em]">
            <Layers className="w-3.5 h-3.5" />
            <span>The Construction Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mt-2 leading-tight">
            From Ground to Finish.
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
            Good concrete isn’t just what you see on the surface. Long-term durability in Ottawa requires uncompromising subgrade preparation, laser grading, structural steel placement, and precision curing.
          </p>
        </div>

        {/* Step Progress Navigation Bar */}
        <div className="hidden sm:grid grid-cols-5 gap-2 sm:gap-3 mb-8 border-b border-white/10 pb-6 overflow-x-auto">
          {PROCESS_STEPS.map((s, idx) => (
            <button
              key={s.number}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-3 sm:p-4 rounded-lg transition-all border ${
                activeStep === idx
                  ? 'bg-elevated border-accent shadow-lg text-white'
                  : 'bg-white/5 border-white/5 hover:border-white/20 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="text-[10px] sm:text-xs font-mono-code font-bold tracking-wider text-accent">
                STEP {s.number}
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate mt-1">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Step Detail Card */}
        <div className="bg-surface border-2 border-white/15 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Step Visual Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[320px] lg:min-h-[480px]">
              <img
                src={step.image}
                alt={`${step.title} - ${step.subtitle}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:hidden" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded text-xs font-mono-code text-accent font-bold">
                {step.timeline}
              </div>
            </div>

            {/* Step Explanation & Specs */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-accent">
                    {step.number}
                  </span>
                  <div className="h-6 w-px bg-white/20" />
                  <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {step.title}
                </h3>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Technical Highlights Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-stone-400 font-semibold">
                    Technical Specifications:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {step.technicalHighlights.map((tech, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-mono-code uppercase rounded bg-white/5 hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-stone-300 transition-colors"
                >
                  Previous Step
                </button>

                {activeStep < PROCESS_STEPS.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(prev => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                    className="px-5 py-2 text-xs font-mono-code font-bold uppercase rounded bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>Next: {PROCESS_STEPS[activeStep + 1].title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onQuoteClick}
                    className="px-5 py-2 text-xs font-mono-code font-bold uppercase rounded bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>Quote Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

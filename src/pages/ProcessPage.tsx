import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';
import { SeoHead } from '../components/SeoHead';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const commonShortcuts = [
    {
      bad: 'Shallow 3"–4" excavation into topsoil',
      good: '8"–14" excavation to virgin subgrade + non-woven geotextile',
      why: 'Topsoil organic matter rots and compresses, causing hollow spots and cracked slabs.'
    },
    {
      bad: 'Laying steel rebar directly on dirt',
      good: 'Rebar supported on concrete chairs in the middle third of the slab',
      why: 'Rebar on the bottom provides zero tensile strength and corrodes when wet.'
    },
    {
      bad: 'Low-strength standard concrete (20–25 MPa) with no air entrainment',
      good: 'Certified 32–35 MPa Class C-2 mix with 6%–8% air entrainment',
      why: 'Without air bubbles, freezing water in winter has nowhere to expand, shattering the top paste layer.'
    },
    {
      bad: 'No saw-cut control joints or late cuts days after pour',
      good: 'Early diamond saw-cuts within 24 hours at 1/4 slab depth',
      why: 'Concrete contracts naturally as it cures. Early joints force hairline shrinkage into clean, straight lines.'
    }
  ];

  return (
    <div id="process-page" className="pt-24 pb-20 bg-canvas text-stone-200">
      <SeoHead
        title="Our 5-Step Concrete Process | Coliseum Concrete Ottawa"
        description="Learn how Coliseum Concrete executes outdoor projects in Ottawa: Laser grading, deep aggregate base compaction, steel rebar reinforcement, and precision stamping."
        canonicalPath="/process"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-accent">
            <Layers className="w-3.5 h-3.5" />
            <span>The Construction Standard</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mt-2 leading-tight">
            From Ground to Finish.
          </h1>
          <p className="text-stone-400 text-base sm:text-lg mt-3 leading-relaxed">
            Concrete hardscapes in Ottawa must endure 50–80 freeze-thaw cycles in a typical year, expansive Leda clay, and harsh road salts. Here is how we approach every square foot for durability.
          </p>
        </div>

        {/* 5-Step Detailed Vertical Narrative */}
        <div className="space-y-16">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="bg-surface border-2 border-white/10 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Step Image */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[340px]">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-accent text-accent-fg text-xs font-mono-code font-bold px-3 py-1 rounded shadow">
                  STEP {step.number}
                </div>
              </div>

              {/* Step Content & Specs */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-accent">
                      {step.number}
                    </span>
                    <div className="h-6 w-px bg-white/20" />
                    <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400">
                      {step.subtitle}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {step.title}
                  </h2>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400 font-semibold block">
                      Engineering Standards:
                    </span>
                    <div className="space-y-2">
                      {step.technicalHighlights.map((tech, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-mono-code text-stone-400">
                  <span>Standard Quality Check: Verified before moving to Step 0{idx + 2 > 5 ? 5 : idx + 2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Difference Table: Coliseum vs Low-Bid Cut Corners */}
        <div className="mt-24 bg-surface border-2 border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-accent uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Why Workmanship Matters</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Coliseum Standards vs. Low-Bid Shortcuts
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-2xl">
              Concrete cannot be easily repaired once poured. Discover why cutting corners on base preparation or air entrainment leads to premature failure in Ottawa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonShortcuts.map((item, idx) => (
              <div key={idx} className="bg-canvas border-2 border-white/10 rounded-xl p-5 space-y-3">
                <div className="flex items-start gap-2 text-xs text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold uppercase font-mono-code block">Low-Bid Shortcut:</span>
                    <span>{item.bad}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-accent">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold uppercase font-mono-code block text-white">The Coliseum Way:</span>
                    <span className="text-stone-200">{item.good}</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 italic pt-2 border-t border-white/5">
                  {item.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-white">
            Ready to Build Your Project the Right Way?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
            Book an on-site consultation to review your property elevation and material choices.
          </p>
          <button
            onClick={() => onNavigate('/quote')}
            className="px-8 py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded shadow-xl transition-all"
          >
            Get a Free Detailed Quote
          </button>
        </div>

      </div>
    </div>
  );
};

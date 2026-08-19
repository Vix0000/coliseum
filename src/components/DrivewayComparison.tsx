import React, { useState } from 'react';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';

interface DrivewayComparisonProps {
  onSelectOption?: (optionName: string) => void;
}

export const DrivewayComparison: React.FC<DrivewayComparisonProps> = ({ onSelectOption }) => {
  const [activeTab, setActiveTab] = useState<'driveways' | 'patios'>('driveways');

  const options = [
    {
      name: 'Architectural Broom Concrete',
      tagline: 'Maximum structural value, clean modern lines & high winter traction',
      costIndex: '$$',
      lifespan: '30 – 40+ Years',
      freezeThawScore: 'Exceptional (Monolithic slab with 6-8% air entrainment)',
      maintenance: 'Low (Wash & seal every 3-5 years)',
      weedResistance: '100% (Solid concrete plane, no joints for seed ingress)',
      pros: [
        'Superior vehicle tire traction in snowy Ottawa winters',
        'Cost-effective high-durability residential investment',
        'Can be framed with decorative stamped borders',
        'Monolithic slab prevents shifting and rutting under heavy SUVs'
      ],
      bestFor: 'Homeowners prioritizing long-term durability, clean aesthetics, and minimal maintenance.'
    },
    {
      name: 'Stamped Decorative Concrete',
      tagline: 'The rich look of natural flagstone or ashlar slate with zero paver shifting',
      costIndex: '$$$',
      lifespan: '25 – 35+ Years',
      freezeThawScore: 'Superior (Engineered 32+ MPa mix with antique sealer)',
      maintenance: 'Medium (Reseal every 2-3 years for vibrant color depth)',
      weedResistance: '100% (Continuous poured slab with hand-stamped textures)',
      pros: [
        'Extensive palette of stone patterns and two-tone color releases',
        'Stunning architectural curb appeal and patio luxury',
        'No loose stones, no sinking individual bricks',
        'Integrated micro-grip polymer for wet safety'
      ],
      bestFor: 'Homeowners wanting high-end stone aesthetics without the weeding or shifting of unmortared pavers.'
    },
    {
      name: 'Architectural Interlock Pavers',
      tagline: 'High-format modular stone elegance with repairable individual units',
      costIndex: '$$$$',
      lifespan: '25 – 35+ Years',
      freezeThawScore: 'Excellent (When installed over open-graded aggregate base)',
      maintenance: 'Medium-High (Polymeric re-sanding & weed maintenance)',
      weedResistance: 'High (Requires quality polymeric sand joint maintenance)',
      pros: [
        'Modular flexibility: individual pavers can be lifted if underground repairs are needed',
        'Wide selection of contemporary high-format slabs and textures',
        'Ideal for driveway widening ribbons and garden retaining walls',
        'Permeable base options for rapid surface water drainage'
      ],
      bestFor: 'Homeowners seeking classic stonework modularity and matching garden retaining walls.'
    }
  ];

  return (
    <section id="hardscape-comparison" className="py-20 bg-raised border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-code uppercase tracking-wider text-accent mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Material Comparison Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            Which Hardscape Option is Right for Your Ottawa Home?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
            Understanding the real-world differences between brushed concrete, stamped decorative concrete, and interlock pavers helps you make the right long-term investment.
          </p>

          {/* Toggle Tab */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('driveways')}
              className={`px-5 py-2 text-xs font-mono-code rounded-full transition-all ${
                activeTab === 'driveways'
                  ? 'bg-accent text-accent-fg font-bold shadow'
                  : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Driveway Comparison
            </button>
            <button
              onClick={() => setActiveTab('patios')}
              className={`px-5 py-2 text-xs font-mono-code rounded-full transition-all ${
                activeTab === 'patios'
                  ? 'bg-accent text-accent-fg font-bold shadow'
                  : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Patio & Walkway Comparison
            </button>
          </div>
        </div>

        {/* 3-Column Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                idx === 1
                  ? 'bg-elevated border-accent/40 shadow-2xl relative ring-1 ring-accent/30'
                  : 'bg-surface border-white/10 hover:border-white/20'
              }`}
            >
              {idx === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-fg text-[10px] font-mono-code font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                  Most Popular for Ottawa Patios
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-code text-accent">
                    <span>Investment Index: {opt.costIndex}</span>
                    <span>{opt.lifespan}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-2">
                    {opt.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    {opt.tagline}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-stone-400 font-mono-code block text-[11px]">Ottawa Freeze-Thaw Endurance:</span>
                    <span className="text-stone-200 font-medium">{opt.freezeThawScore}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-mono-code block text-[11px]">Weed & Ant Resistance:</span>
                    <span className="text-stone-200 font-medium">{opt.weedResistance}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-mono-code block text-[11px]">Maintenance Needs:</span>
                    <span className="text-stone-200 font-medium">{opt.maintenance}</span>
                  </div>
                </div>

                {/* Pros List */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400 block">
                    Core Advantages:
                  </span>
                  <ul className="space-y-2">
                    {opt.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t border-white/10">
                <p className="text-[11px] text-stone-400 italic mb-4">
                  <span className="font-semibold text-stone-300">Best for:</span> {opt.bestFor}
                </p>
                <button
                  onClick={() => onSelectOption?.(opt.name)}
                  className={`w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    idx === 1
                      ? 'bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg shadow-lg'
                      : 'bg-white/10 hover:bg-white/15 active:bg-white/20 text-white'
                  }`}
                >
                  <span>Quote {opt.name.split(' ')[0]} Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

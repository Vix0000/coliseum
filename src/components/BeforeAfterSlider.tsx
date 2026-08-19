import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { IMAGES } from '../data/images';

interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  location: string;
  beforeUrl: string;
  beforeLabel: string;
  afterUrl: string;
  afterLabel: string;
  description: string;
  technicalHighlights: string[];
}

interface BeforeAfterSliderProps {
  items?: BeforeAfterItem[];
}

const DEFAULT_COMPARISONS: BeforeAfterItem[] = [
  {
    id: 'kanata-entry',
    title: 'Worn Concrete Steps → Ashlar Walkway & Rebuilt Entry Stairs',
    category: 'Front Entry & Walkway',
    location: 'Kanata, Ottawa',
    beforeUrl: IMAGES.projectEntryBefore,
    beforeLabel: 'BEFORE',
    afterUrl: IMAGES.projectEntryAfter,
    afterLabel: 'AFTER',
    description: 'Same front door, same tan siding, same fieldstone wall. A weathered two-step grey landing was rebuilt into a random-ashlar stamped walkway with rock-faced treads and fieldstone risers, pitched to drain off the threshold.',
    technicalHighlights: [
      'Existing unsound steps rebuilt to new critical heights',
      'Random ashlar stamp with deep joints for a wet-laid stone look',
      'Fieldstone veneer on risers matched to the house stone',
      'Laser-pitched landing to shed water off the threshold'
    ]
  }
];

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ items = DEFAULT_COMPARISONS }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeItem = items[selectedIdx];

  return (
    <section id="before-after-transformation" className="py-20 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-mono-code uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Before & After Workmanship.
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl">
              One front-entry job, photographed on the same house — worn grey steps on the left, stamped ashlar walkway and rebuilt stairs on the right.
            </p>
          </div>

          {items.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2 text-xs font-mono-code rounded transition-all ${
                  selectedIdx === idx
                    ? 'bg-accent text-accent-fg font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-2xl border-2 border-white/15 bg-black grid grid-cols-2">
              <div className="relative min-h-0 border-r border-white/40">
                <img
                  src={activeItem.beforeUrl}
                  alt={activeItem.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover object-bottom"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded text-[11px] font-mono-code text-stone-200 font-semibold">
                  {activeItem.beforeLabel}
                </div>
              </div>
              <div className="relative min-h-0">
                <img
                  src={activeItem.afterUrl}
                  alt={activeItem.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover object-[center_70%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-mono-code text-accent-fg font-bold">
                  {activeItem.afterLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5 bg-surface border-2 border-white/10 rounded-xl p-6">
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-accent">
                {activeItem.location}
              </span>
              <h3 className="text-xl font-display font-bold text-white mt-1 leading-snug">
                {activeItem.title}
              </h3>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {activeItem.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400 block">
                Technical Highlights:
              </span>
              <ul className="space-y-1.5">
                {activeItem.technicalHighlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2 text-xs text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

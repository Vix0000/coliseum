import React from 'react';
import { ArrowRight, Home, Compass } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div id="not-found-page" className="pt-32 pb-24 bg-canvas text-stone-200 min-h-[80vh] flex items-center">
      <SeoHead
        title="Page Not Found | Coliseum Concrete & Interlock"
        description="This path doesn't lead anywhere. Let's get you back to Coliseum Concrete & Interlock's Ottawa project gallery and services."
        canonicalPath="/404"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-white/5 border-2 border-white/10 text-sm font-mono-code text-accent uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Error 404</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight">
          THIS PATH DOESN'T LEAD ANYWHERE.
        </h1>

        <p className="text-stone-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          Let’s get you back to the good stuff. Explore our completed Ottawa projects or request a free quote for your property.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('/projects')}
            className="px-6 py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active border-[1.2px] border-accent hover:border-accent-hover active:border-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg flex items-center gap-2"
          >
            <span>View Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-3.5 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 text-white font-mono-code text-xs uppercase tracking-wider rounded transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Coliseum Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

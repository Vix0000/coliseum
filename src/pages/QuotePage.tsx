import React from 'react';
import { Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { QuoteWizard } from '../components/QuoteWizard';
import { SeoHead } from '../components/SeoHead';
import { usePhoneCall } from '../components/PhoneCallContext';
import { useCompany } from '../components/ThemeContext';

interface QuotePageProps {
  initialProjectType?: string;
  onNavigate: (path: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ initialProjectType, onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { openPhoneModal } = usePhoneCall();
  return (
    <div id="quote-experience-page" className="pt-24 pb-20 bg-canvas text-stone-200 min-h-screen">
      <SeoHead
        title="Request a Concrete & Interlock Quote | Coliseum Ottawa"
        description="Request a no-obligation quote for an Ottawa concrete driveway, stamped concrete patio, or interlock project."
        canonicalPath="/quote"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/15 border border-accent/30 text-xs font-mono-code uppercase tracking-wider text-accent">
            <span>Ottawa Hardscape Quote Request</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
            Request a Project Quote.
          </h1>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Tell us about the work, size, and location. We follow up with a written estimate after reviewing the details and, when needed, visiting the site.
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-stone-400 font-mono-code">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>City Licensed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>No-obligation quote request</span>
            </div>
          </div>
        </div>

        <QuoteWizard initialProjectType={initialProjectType} onNavigate={onNavigate} />

        <div className="mt-12 text-center text-xs font-mono-code text-stone-400 space-y-1">
          <div>Prefer a direct phone conversation?</div>
          <button
            type="button"
            onClick={openPhoneModal}
            className="text-white hover:text-accent text-sm font-semibold transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>Call us directly at {COMPANY_INFO.phoneFormatted}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

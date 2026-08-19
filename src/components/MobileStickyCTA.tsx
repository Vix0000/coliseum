import React from 'react';
import { Phone, FileText } from 'lucide-react';
import { usePhoneCall } from './PhoneCallContext';

interface MobileStickyCTAProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const showsMobileStickyCta = (currentPath: string) =>
  currentPath !== '/' && currentPath !== '/quote';

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onNavigate, currentPath }) => {
  const { openPhoneModal } = usePhoneCall();

  if (!showsMobileStickyCta(currentPath)) return null;

  return (
    <div
      id="mobile-persistent-cta-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-canvas/95 backdrop-blur-md border-t border-white/15 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <button
          id="mobile-call-cta-btn"
          type="button"
          onClick={openPhoneModal}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 rounded text-stone-200 text-xs font-mono-code font-semibold tracking-tight transition-all"
        >
          <Phone className="w-4 h-4 text-accent" />
          <span>Call Us</span>
        </button>

        <button
          id="mobile-quote-cta-btn"
          onClick={() => onNavigate('/quote')}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg text-xs font-bold uppercase tracking-wider rounded transition-all shadow-lg"
        >
          <FileText className="w-4 h-4" />
          <span>Free Quote</span>
        </button>
      </div>
    </div>
  );
};

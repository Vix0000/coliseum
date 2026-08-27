import React, { useEffect, useState } from 'react';
import { X, Phone, Copy, Check } from 'lucide-react';
import { useCompany } from './ThemeContext';

interface PhoneCallModalProps {
  onClose: () => void;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ onClose }) => {
  const COMPANY_INFO = useCompany();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY_INFO.phoneFormatted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      id="phone-call-modal"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-call-modal-title"
    >
      <div
        className="relative w-full max-w-sm bg-raised border-2 border-white/20 rounded-2xl shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-stone-300 hover:text-white transition-colors"
          aria-label="Close phone dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pt-1">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <h2 id="phone-call-modal-title" className="text-lg font-display font-bold text-white">
            Call Coliseum
          </h2>
          <p className="mt-2 font-mono-code text-xl text-accent tracking-wide">
            {COMPANY_INFO.phoneFormatted}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 text-white font-mono-code text-xs uppercase tracking-wider rounded transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-accent" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={COMPANY_INFO.phoneHref}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover active:bg-accent-active border-2 border-accent hover:border-accent-hover active:border-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

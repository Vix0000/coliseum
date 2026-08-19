import React, { useEffect, useState } from 'react';
import { X, Mail, Copy, Check } from 'lucide-react';
import { useCompany } from './ThemeContext';

interface EmailModalProps {
  onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ onClose }) => {
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
      await navigator.clipboard.writeText(COMPANY_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      id="email-modal"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
    >
      <div
        className="relative w-full max-w-sm bg-raised border-2 border-white/20 rounded-2xl shadow-2xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-stone-300 hover:text-white transition-colors"
          aria-label="Close email dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pt-1">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <h2 id="email-modal-title" className="text-lg font-display font-bold text-white">
            Email Coliseum
          </h2>
          <p className="mt-2 font-mono-code text-sm sm:text-base text-accent tracking-wide break-all">
            {COMPANY_INFO.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 text-white font-mono-code text-xs uppercase tracking-wider rounded transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-accent" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <a
            href={COMPANY_INFO.emailHref}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Email Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useCompany } from './ThemeContext';

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.2h2.4l.36-2.76h-2.76V9.3c0-.78.24-1.32 1.38-1.32H16.5V5.52A19 19 0 0 0 14.22 5.4c-2.28 0-3.84 1.38-3.84 3.9v2.16H8.1v2.76h2.28V21H13.5Z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M8.5 4h7A4.5 4.5 0 0 1 20 8.5v7A4.5 4.5 0 0 1 15.5 20h-7A4.5 4.5 0 0 1 4 15.5v-7A4.5 4.5 0 0 1 8.5 4Zm0 1.6A2.9 2.9 0 0 0 5.6 8.5v7a2.9 2.9 0 0 0 2.9 2.9h7a2.9 2.9 0 0 0 2.9-2.9v-7a2.9 2.9 0 0 0-2.9-2.9h-7Zm8.15 1.15a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM12 8.4A3.6 3.6 0 1 1 8.4 12 3.6 3.6 0 0 1 12 8.4Zm0 1.6A2 2 0 1 0 14 12a2 2 0 0 0-2-2Z" />
  </svg>
);

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  const { facebookUrl, instagramUrl } = useCompany();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Coliseum on Facebook"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white/15 bg-white/5 text-white transition-colors hover:border-[#1877f2] hover:bg-[#1877f2]"
      >
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Coliseum on Instagram"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white/15 bg-white/5 text-white transition-colors hover:border-[#E1306C] hover:bg-[#E1306C]"
      >
        <InstagramIcon className="h-4 w-4" />
      </a>
    </div>
  );
};

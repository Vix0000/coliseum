import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Award, Clock } from 'lucide-react';
import { useCompany } from './ThemeContext';
import { SERVICES } from '../data/services';
import { usePhoneCall } from './PhoneCallContext';
import { useEmail } from './EmailContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { openPhoneModal } = usePhoneCall();
  const { openEmailModal } = useEmail();
  return (
    <footer id="main-footer" className="bg-canvas-deep border-t border-white/10 text-stone-300">
      
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Verification Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-white">
                COLISEUM
              </span>
              <span className="text-xs font-mono-code tracking-[0.16em] text-stone-400 uppercase mt-0.5">
                Concrete & Interlock
              </span>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Specializing in stamped concrete patios, reinforced concrete driveways, architectural stairs, and high-format interlock stonework tailored to Ottawa’s unique freeze-thaw climate.
            </p>

            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>{COMPANY_INFO.licensing}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent shrink-0" />
                <span>{COMPANY_INFO.operatingHistory}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-2 font-mono-code text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
              <span>{COMPANY_INFO.fullAddress}</span>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-accent font-semibold">
              Services
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              {SERVICES.map((srv) => (
                <li key={srv.slug}>
                  <button
                    onClick={() => onNavigate(`/services/${srv.slug}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio & Process */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-accent font-semibold">
              Explore
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-white transition-colors text-left">
                  Project Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects?category=stamped-concrete')} className="hover:text-white transition-colors text-left">
                  Stamped Concrete Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects?category=driveways')} className="hover:text-white transition-colors text-left">
                  Driveway Transformations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects?category=interlock')} className="hover:text-white transition-colors text-left">
                  Interlock Patios & Walkways
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/process')} className="hover:text-white transition-colors text-left">
                  Our 5-Step Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors text-left">
                  Why Choose Coliseum
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-accent font-semibold">
              Contact & Direct
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <button
                type="button"
                onClick={openPhoneModal}
                className="flex items-center gap-2 hover:text-accent transition-colors font-mono-code"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>{COMPANY_INFO.phoneFormatted}</span>
              </button>

              <button
                type="button"
                onClick={openEmailModal}
                className="flex items-center gap-2 hover:text-accent transition-colors font-mono-code text-xs break-all"
              >
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </button>

              <div className="flex items-start gap-2 text-[11px] text-stone-400">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{COMPANY_INFO.workingHours}</span>
              </div>

              <div className="pt-2 text-[11px] text-stone-400">
                <span className="block text-stone-300 font-medium">Service Areas:</span>
                Ottawa, Kanata, Nepean, Barrhaven, Orleans, Stittsville, Manotick, Gloucester, Hunt Club.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono-code">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Ottawa, ON.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>City of Ottawa Licensed Hardscape Contractor</span>
            <button
              onClick={() => onNavigate('/contact')}
              className="hover:text-stone-300 transition-colors"
            >
              Support & Direct Inquiries
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

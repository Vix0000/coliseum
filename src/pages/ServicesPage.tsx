import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/services';
import { SeoHead } from '../components/SeoHead';
import { usePhoneCall } from '../components/PhoneCallContext';
import { useCompany } from '../components/ThemeContext';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { openPhoneModal } = usePhoneCall();
  return (
    <div id="services-page" className="pt-24 pb-20 bg-canvas text-stone-200">
      <SeoHead
        title="Concrete & Interlock Services | Coliseum Concrete Ottawa"
        description="Comprehensive concrete and hardscape services in Ottawa: Stamped concrete patios, concrete driveways, interlock stonework, entrance stairs, and garage slabs."
        canonicalPath="/services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ottawa Hardscape Craftsmanship</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mt-2 leading-tight">
            Our Concrete & Hardscape Services.
          </h1>
          <p className="text-stone-400 text-base sm:text-lg mt-3 leading-relaxed">
            From decorative stamped patios and heavy-duty concrete driveways to modern interlock pavers, we provide permanent, engineered outdoor transformations built specifically for Ottawa’s climate.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="space-y-16">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="bg-surface border-2 border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-white/20 transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Service Visual Image */}
              <div className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={service.heroImage}
                  alt={`${service.title} in Ottawa`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:hidden" />
              </div>

              {/* Service Content */}
              <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {service.title}
                  </h2>

                  <p className="text-stone-300 text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Core Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.features.slice(0, 4).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">{feature.title}</span>
                          <span className="text-[11px] text-stone-400">{feature.description.slice(0, 65)}...</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white rounded text-xs font-mono-code flex items-center gap-2 transition-colors"
                  >
                    <span>View Specifications & Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </button>

                  <button
                    onClick={() => onNavigate('/quote')}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg rounded text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Get a Quote
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-20 bg-surface border border-white/10 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Need Guidance on the Best Surface for Your Property?
          </h3>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            We provide free on-site consultations across Ottawa. We assess your lot slope, subsoil condition, and walk you through stamp patterns and material options.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/quote')}
              className="px-7 py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all"
            >
              Book Free On-Site Consultation
            </button>
            <button
              type="button"
              onClick={openPhoneModal}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 text-stone-200 rounded text-xs font-mono-code font-medium transition-all"
            >
              Call {COMPANY_INFO.phoneFormatted}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

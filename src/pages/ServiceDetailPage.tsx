import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { ServiceDetail, ProjectItem } from '../types';
import { PROJECTS } from '../data/projects';
import { SeoHead } from '../components/SeoHead';
import { usePhoneCall } from '../components/PhoneCallContext';
import { useCompany } from '../components/ThemeContext';

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onNavigate: (path: string) => void;
  onOpenProjectLightbox: (project: ProjectItem) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigate,
  onOpenProjectLightbox,
}) => {
  const COMPANY_INFO = useCompany();
  const { openPhoneModal } = usePhoneCall();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Filter projects matching this service category
  const relatedProjects = PROJECTS.filter(
    p => p.category === service.id || p.serviceType.toLowerCase().includes(service.title.toLowerCase())
  );

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <div id="service-detail-page" className="pt-20 bg-canvas text-stone-200">
      <SeoHead
        title={`${service.title} Ottawa | Coliseum Concrete & Interlock`}
        description={service.shortDescription}
        canonicalPath={`/services/${service.slug}`}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center bg-canvas-deep overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage}
            alt={`${service.title} Ottawa hardscape contractor`}
            className="w-full h-full object-cover brightness-75 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/20 border border-accent/40 text-xs font-mono-code text-accent uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ottawa Concrete & Hardscape Specialist</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight">
              {service.title}.
            </h1>

            <p className="text-base sm:text-xl text-stone-300 font-light leading-relaxed">
              {service.tagline}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('/quote')}
                className="px-7 py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active border border-accent hover:border-accent-hover active:border-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all shadow-xl flex items-center gap-2"
              >
                <span>Get a Free {service.title} Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={openPhoneModal}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 text-white font-mono-code text-xs rounded transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Call {COMPANY_INFO.phoneFormatted}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Full narrative & Features */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Narrative */}
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-accent block mb-2">
                Craftsmanship & Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Engineered for Long-Term Ottawa Performance
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-white">
                Key Advantages & Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="bg-surface border-2 border-white/10 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications List */}
            <div className="bg-surface border-2 border-white/10 rounded-xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-display font-bold text-white">
                Common Residential Applications in Ottawa:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.applications.map((app, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            {service.faqs.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-accent">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Common Questions About {service.title}
                </h3>

                <div className="space-y-3">
                  {service.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-surface border-2 border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-accent hover:bg-white/5 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {openFaqIdx === fIdx ? (
                          <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                      </button>

                      {openFaqIdx === fIdx && (
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Engineering Specs & Fast Quote Box */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Technical Specifications Card */}
            <div className="bg-surface border-2 border-white/15 rounded-2xl p-6 space-y-4 shadow-xl">
              <span className="text-xs font-mono-code uppercase tracking-wider text-accent font-bold block">
                Engineering Specifications
              </span>
              <div className="space-y-3 text-xs">
                {service.specifications.map((spec, sIdx) => (
                  <div key={sIdx} className="border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-stone-400 block font-mono-code text-[11px]">{spec.label}</span>
                    <span className="text-white font-medium mt-0.5 block">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Quote Card */}
            <div className="bg-gradient-to-b from-elevated to-raised border-2 border-accent/30 rounded-2xl p-6 space-y-4 shadow-2xl">
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-accent font-bold">
                Free Estimate
              </span>
              <h3 className="text-xl font-display font-bold text-white">
                Request a {service.title} Quote
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Contact us for a detailed on-site elevation measurement and transparent written estimate in Ottawa.
              </p>
              <button
                onClick={() => onNavigate('/quote')}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg text-xs font-bold uppercase tracking-wider rounded transition-all shadow-lg"
              >
                Start Quote Request
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={openPhoneModal}
                  className="text-xs font-mono-code text-stone-300 hover:text-accent transition-colors"
                >
                  Or call directly: {COMPANY_INFO.phoneFormatted}
                </button>
              </div>
            </div>

            {/* City of Ottawa License confirmation */}
            <div className="p-4 rounded-xl bg-white/5 border-2 border-white/10 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Licensed Ottawa Contractor</span>
              </div>
              <p className="text-[11px] leading-snug">
                {COMPANY_INFO.licensing}. Proudly serving Ottawa, Kanata, Nepean, Orleans, and Barrhaven.
              </p>
            </div>

          </div>

        </div>

        {/* Related Projects Showcase */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-accent">
                  Portfolio Samples
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  Recent {service.title} Work in Ottawa
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/projects')}
                className="text-xs font-mono-code text-accent hover:underline flex items-center gap-1"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onOpenProjectLightbox(p)}
                  className="group cursor-pointer bg-surface border-2 border-white/10 hover:border-accent/50 rounded-xl overflow-hidden transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono-code text-accent">
                      {p.location}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                      {p.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
};

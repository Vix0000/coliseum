import React from 'react';
import { ShieldCheck, MapPin, Award, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { IMAGES } from '../data/images';
import { useCompany } from '../components/ThemeContext';

export const AboutPage: React.FC = () => {
  const COMPANY_INFO = useCompany();
  return (
    <div id="about-page" className="pt-24 pb-20 bg-canvas text-stone-200">
      <SeoHead
        title="About Coliseum Concrete & Interlock | Ottawa Hardscape Craftsmen"
        description="Learn about Coliseum Concrete & Interlock: City of Ottawa licensed hardscape contractor. Established 2000 — 26 years of local hardscape work as of 2026."
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ottawa Roots & Craftsmanship</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mt-2 leading-tight">
            Craftsmanship Built for Permanence.
          </h1>
          <p className="text-stone-400 text-base sm:text-lg mt-3 leading-relaxed">
            Coliseum Concrete & Interlock is an established, licensed residential hardscape contractor serving homeowners throughout the Ottawa region.
          </p>
        </div>

        {/* Core Narrative & Factual Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
              Specialized Residential Hardscape Construction in the National Capital Region.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              We specialize exclusively in outdoor concrete and hardscape installations: decorative stamped concrete patios, steel-reinforced concrete driveways, frost-depth monolithic stairs, and architectural interlock stonework.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed">
              Rather than spreading ourselves across unrelated landscaping maintenance tasks, our equipment, crew training, and material specifications are dedicated entirely to structural concrete pouring, texture stamping, and precision stone setting.
            </p>

            {/* Factual Highlights List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>City of Ottawa Licensed:</strong> Officially listed among licensed hardscape contractors in the City of Ottawa.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                <Award className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Established History:</strong> Founded in 2000 — 26 years of Ottawa hardscape work as of 2026.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Local Presence:</strong> Based at {COMPANY_INFO.address.street} in Ottawa, Ontario.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 bg-black">
              <img
                src={IMAGES.interlockInstall}
                alt="Coliseum Concrete craftsmanship in Ottawa backyard"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border-2 border-white/20 text-xs font-mono-code text-stone-300">
                <span className="text-accent font-bold block mb-1">Our Core Commitment:</span>
                Every project is graded, reinforced, and sealed to outlast Ottawa freeze-thaw cycles without surface spalling.
              </div>
            </div>
          </div>

        </div>

        {/* The 4 Tenets of Coliseum Workmanship */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono-code uppercase tracking-wider text-accent">
              Our Philosophy
            </span>
            <h3 className="text-3xl font-display font-bold text-white mt-1">
              How We Approach Every Ottawa Home
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Laser Elevation Precision',
                desc: 'Water drainage is non-negotiable. We verify slope angles using digital laser levels to guide rainwater and spring snowmelt away from structures.'
              },
              {
                title: 'Certified Mix Formulations',
                desc: 'We never mix cheap bag cement on site. We order certified ready-mix concrete with 32+ MPa strength and 6%–8% microscopic air entrainment.'
              },
              {
                title: 'Heavy Structural Steel',
                desc: 'We elevate grade-400 10M steel rebar grids on chairs within the concrete core to provide authentic tensile resistance against ground movement.'
              },
              {
                title: 'Transparent Communication',
                desc: 'Detailed line-item quotes, clear timeline expectations, clean job site etiquette, and direct phone availability with the installer.'
              }
            ].map((tenet, idx) => (
              <div key={idx} className="bg-surface border-2 border-white/10 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono-code text-accent font-bold mb-3">
                    PRINCIPLE 0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {tenet.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {tenet.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

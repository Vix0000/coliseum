import React from 'react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ProcessTour } from '../components/ProcessTour';
import { LocalOttawaSection } from '../components/LocalOttawaSection';
import { SeoHead } from '../components/SeoHead';
import { IMAGES } from '../data/images';
import { usePhoneCall } from '../components/PhoneCallContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openPhoneModal } = usePhoneCall();

  const editorialWorkCategories = [
    {
      title: 'STAMPED CONCRETE',
      subtitle: 'Ashlar Slate, Seamless Stone & Antique Releases',
      description: 'Patios, driveways, and decorative walkways with rich stone textures that never shift or grow weeds.',
      image: IMAGES.projectEntryAfter,
      imagePosition: 'center 82%',
      path: '/services/stamped-concrete',
    },
    {
      title: 'CONCRETE DRIVEWAYS',
      subtitle: 'Reinforced Monolithic Slabs & Stamped Ribbons',
      description: 'High-strength 5"–6" air-entrained concrete engineered for Ottawa heavy SUVs and winter freeze-thaw cycles.',
      image: IMAGES.concreteDriveway,
      imagePosition: 'center center',
      path: '/services/concrete-driveways',
    },
    {
      title: 'INTERLOCK CRAFTSMANSHIP',
      subtitle: 'Architectural Pavers & Driveway Extensions',
      description: 'Modular paver terraces and driveway widening installed over free-draining open-graded aggregate.',
      image: IMAGES.interlockPatio,
      imagePosition: 'center 70%',
      path: '/services/interlock',
    },
    {
      title: 'CONCRETE PATIOS',
      subtitle: 'Outdoor Living, Kitchens & Pool Terraces',
      description: 'Backyard entertainment spaces contoured to your home architecture with integrated drainage slope.',
      image: IMAGES.stampedPatio,
      imagePosition: 'center 60%',
      path: '/services/concrete-patios',
    },
    {
      title: 'CONCRETE STAIRS & PORCHES',
      subtitle: 'Monolithic Steps Anchored Below Frost Depth',
      description: 'Permanent steel-reinforced entrance stairs pinned to foundation walls, replacing crumbling brick and wood.',
      image: IMAGES.projectEntryAfter,
      imagePosition: 'center 32%',
      path: '/services/concrete-stairs',
    },
    {
      title: 'GARAGE FLOORS & SLABS',
      subtitle: 'Power-Troweled Heavy Duty Shop Pads',
      description: 'Laser-screeded reinforced slabs sloped for rapid winter snowmelt drainage and road salt resistance.',
      image: IMAGES.concreteSlab,
      imagePosition: 'center center',
      path: '/services/garage-floors',
    },
  ];

  return (
    <div id="home-page-container">
      <SeoHead
        title="Coliseum Concrete & Interlock | Ottawa's Concrete & Hardscape Contractor"
        description="Premium concrete, stamped concrete, and interlock craftsmanship for Ottawa homes. Licensed contractor specializing in driveways, patios, and stairs."
        canonicalPath="/"
      />

      {/* HERO SECTION - Architectural, Cinematic & High Impact */}
      <section
        id="hero-section"
        className="relative min-h-[92vh] flex items-center justify-center bg-canvas-deep overflow-hidden pt-20"
      >
        {/* Full-bleed Hero Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.projectEntryAfter}
            alt="Ashlar stamped walkway and rebuilt stone-faced entry stairs"
            className="w-full h-full object-cover object-center brightness-75 scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Radial and Linear Dark Gradients for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-canvas/80" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-md text-xs font-mono-code uppercase tracking-wider text-stone-200">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="sm:hidden">Ottawa Licensed Hardscape Contractor</span>
              <span className="hidden sm:inline">City of Ottawa Licensed Hardscape Contractor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
              CONCRETE BUILT TO <br className="hidden sm:inline" />
              <span className="text-accent">DEFINE</span> YOUR OUTDOOR SPACE.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-stone-300 font-light leading-relaxed max-w-2xl">
              Stamped concrete, concrete, and interlock craftsmanship for Ottawa homes. Engineered for severe Canadian freeze-thaw endurance.
            </p>

            {/* Action Buttons Cluster */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-quote-cta"
                onClick={() => onNavigate('/quote')}
                className="h-14 px-8 bg-accent hover:bg-accent-hover text-accent-fg font-bold text-sm uppercase tracking-wider rounded transition-all shadow-2xl hover:shadow-accent/30 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-work-cta"
                onClick={() => onNavigate('/projects')}
                className="h-14 px-8 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 text-white font-mono-code text-xs uppercase tracking-wider rounded transition-all backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>Explore Our Work</span>
                <ChevronRight className="w-4 h-4 text-accent" />
              </button>

              <button
                id="hero-phone-cta"
                type="button"
                onClick={openPhoneModal}
                className="hidden lg:flex h-14 px-8 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 text-white font-mono-code text-xs uppercase tracking-wider rounded transition-all backdrop-blur-sm items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Call Us</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 flex flex-nowrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-stone-400 font-mono-code">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Free On-Site Quotes</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Serving you since 2000</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>32+ MPa Air-Entrained Mixes</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: THE WORK SPEAKS FOR ITSELF (Editorial Portfolio Cards) */}
      <section id="the-work-section" className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
                Architectural Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mt-2 leading-tight">
                The Work Speaks for Itself.
              </h2>
              <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
                Every project is an investment in permanent beauty and structural durability. Explore our core hardscape categories.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/projects')}
              className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-accent hover:underline"
            >
              <span>View All Project Galleries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Dominant Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorialWorkCategories.map((cat) => (
              <div
                key={cat.path}
                onClick={() => onNavigate(cat.path)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-surface border-2 border-white/10 hover:border-accent/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with hover zoom */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-black">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      style={{ objectPosition: cat.imagePosition }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Text Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-accent transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-mono-code text-accent mt-1">
                      {cat.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-400 mt-2.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Ribbon */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-mono-code text-stone-300 group-hover:text-accent border-t border-white/5">
                  <span>Explore Service & Gallery</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SIGNATURE SECTION: FROM GROUND TO FINISH (Interactive Storytelling) */}
      <ProcessTour onQuoteClick={() => onNavigate('/quote')} />

      {/* BEFORE / AFTER DUAL-IMAGE SLIDER */}
      <BeforeAfterSlider />

      {/* EDITORIAL SECTION: THE DIFFERENCE IS IN THE DETAILS */}
      <section id="details-section" className="py-24 bg-raised border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
              Craftsmanship Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mt-2 leading-tight">
              The Difference is in the Details.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
              Why do some concrete jobs crack after one winter while others stay level for 30 years? It comes down to verifiable engineering discipline on every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Laser Grading & Drainage',
                desc: 'Every project is laser-checked for a mandatory minimum 1.5% positive slope away from your foundation, preventing basement water seepage and ice dams.'
              },
              {
                title: 'Granular A Base Compaction',
                desc: 'We excavate deep into native subsoil and mechanically compact crushed aggregate in 3-inch lifts over non-woven geotextile stabilization fabric.'
              },
              {
                title: 'Elevated Rebar Grids',
                desc: 'Steel rebar is mounted on concrete chairs in the middle third of the slab — never placed on the ground where it offers zero tensile resistance.'
              },
              {
                title: 'Micro-Grip Acrylic Sealing',
                desc: 'Two coats of breathable, UV-stable solvent acrylic sealer with anti-slip polymer beads keep stamped textures rich without creating a slippery hazard.'
              }
            ].map((detail, dIdx) => (
              <div
                key={dIdx}
                className="bg-elevated border-2 border-white/10 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-accent font-mono-code font-bold text-xs flex items-center justify-center mb-4">
                    0{dIdx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {detail.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BUILT FOR OTTAWA (Local Climate Resilience Section) */}
      <LocalOttawaSection />

      {/* FAST ACTION QUOTE BANNER */}
      <section id="quote-callout" className="py-20 bg-gradient-to-b from-raised to-canvas-deep border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/10 border-2 border-accent/30 text-accent text-xs font-mono-code uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Booking Open</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
            Ready to Transform Your Ottawa Outdoor Living Space?
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get in touch for a comprehensive, no-pressure consultation and line-item estimate. We review dimensions, layout possibilities, and material options with you in person.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/quote')}
              className="w-full sm:w-auto h-14 px-8 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded transition-all shadow-xl hover:shadow-accent/25 flex items-center justify-center"
            >
              Start Free Quote Request
            </button>

            <button
              type="button"
              onClick={openPhoneModal}
              className="w-full sm:w-auto h-14 px-8 bg-white/10 hover:bg-white/15 active:bg-white/20 border-2 border-white/20 text-white font-mono-code text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call Us</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

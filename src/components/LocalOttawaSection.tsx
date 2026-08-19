import React from 'react';
import { Snowflake, ShieldAlert, Compass } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export const LocalOttawaSection: React.FC = () => {
  const localFactors = [
    {
      icon: Snowflake,
      title: 'Ottawa’s ~1.2 m (4-Foot) Frost Depth',
      desc: 'Ottawa sees some of the deepest frost penetration in southern Ontario. We install sonotube frost piers to the typical 1.2 m (about 4 ft) frost depth for stairs, and deep compacted granular aggregate for flatwork, to reduce ground heave.'
    },
    {
      icon: ShieldAlert,
      title: 'Expansive Marine Leda Clay Subsoil',
      desc: 'Gloucester, Orleans, Kanata, and Barrhaven sit on sensitive Leda clay that swells when wet and shrinks when dry. We install non-woven needle-punched geotextile membranes before placing base aggregates.'
    },
    {
      icon: Compass,
      title: '50–80 Annual Freeze-Thaw Cycles',
      desc: 'Ottawa’s fall and spring swing across 0°C dozens of times. We use CSA A23.1 Class C-2 ready-mix (32–35 MPa) with 6–8% microscopic air entrainment to give expanding water pressure relief chambers.'
    }
  ];

  return (
    <section id="built-for-ottawa" className="py-20 bg-canvas-deep border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
                Engineered for Regional Geography
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2 leading-tight">
                Built for Ottawa’s Severe Climate.
              </h2>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Outdoor concrete and hardscape installations in the National Capital Region face extreme environmental stresses: sub-zero winter deep freezes, heavy spring snowmelt runoff, and intense summer heat.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed">
              A contractor building in Ottawa cannot use standard generic building guidelines. Coliseum specifies excavation depths, air-entrained mix designs, and compaction protocols calibrated specifically for Eastern Ontario soil and frost conditions.
            </p>

            {/* Communities list */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400 block mb-2">
                Proudly Serving Ottawa Residential Communities:
              </span>
              <div className="flex flex-wrap gap-2">
                {COMPANY_INFO.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white/5 border-2 border-white/10 rounded text-xs font-mono-code text-stone-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Factor Cards */}
          <div className="lg:col-span-6 space-y-4">
            {localFactors.map((factor, idx) => {
              const Icon = factor.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface border-2 border-white/10 rounded-xl p-5 hover:border-white/20 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-accent mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {factor.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
                      {factor.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

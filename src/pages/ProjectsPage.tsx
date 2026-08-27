import React, { useState, useMemo } from 'react';
import { Sparkles, Search, MapPin, Eye, ArrowRight } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';
import { ProjectItem } from '../types';
import { SeoHead } from '../components/SeoHead';

interface ProjectsPageProps {
  initialCategory?: string;
  onOpenLightbox: (project: ProjectItem) => void;
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  initialCategory = 'all',
  onOpenLightbox,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat =
        selectedCategory === 'all' ||
        p.category === selectedCategory ||
        (selectedCategory === 'patios' && p.serviceType.toLowerCase().includes('patio'));

      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="projects-gallery-page" className="pt-24 pb-20 bg-canvas text-stone-200 min-h-screen">
      <SeoHead
        title="Ottawa Concrete & Interlock Project Portfolio | Coliseum Concrete"
        description="Explore our portfolio of stamped concrete patios, reinforced concrete driveways, interlock stonework, and entrance stairs completed across Ottawa, Kanata, Nepean, and Orleans."
        canonicalPath="/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ottawa Residential Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-2 leading-tight">
              Craftsmanship in the Field.
            </h1>
            <p className="text-stone-400 text-sm sm:text-base mt-2 leading-relaxed">
              Real projects completed across Ottawa neighborhoods. Click any project to inspect high-resolution photography, before & after transformations, and engineering specs.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by area (e.g. Kanata, patio)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-white/10 mb-10 overflow-x-auto">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono-code rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-accent text-accent-fg font-bold shadow-md'
                  : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-stone-400 space-y-4">
            <p className="text-base font-medium">No projects found matching your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-xs font-mono-code rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenLightbox(project)}
                className="group cursor-pointer bg-surface border border-white/10 hover:border-accent/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-black">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Location Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded text-[11px] font-mono-code text-accent flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>{project.location}</span>
                    </div>

                    {/* Before/After Indicator if available */}
                    {project.beforeAfter && (
                      <div className="absolute bottom-3 right-3 bg-accent text-accent-fg text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded shadow">
                        Before / After Available
                      </div>
                    )}

                    {/* Image count badge */}
                    <div className="absolute top-3 right-3 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono-code text-stone-300 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-stone-400" />
                      <span>{project.images.length} photos</span>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6">
                    <span className="text-[11px] font-mono-code uppercase tracking-wider text-stone-400 block mb-1">
                      {project.serviceType}
                    </span>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-accent transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-mono-code text-stone-400 group-hover:text-accent border-t border-white/5">
                  <span>Inspect Project & Specs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Box */}
        <div className="mt-20 border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface p-8 rounded-2xl border">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Have a Specific Design in Mind for Your Home?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              We can match patterns, customize integral color formulas, and design around your property's topography.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/quote')}
            className="px-6 py-3.5 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded shrink-0 shadow-lg transition-all"
          >
            Get a Custom Quote
          </button>
        </div>

      </div>
    </div>
  );
};

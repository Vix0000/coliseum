import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Check, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuote: (project: ProjectItem) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose, onRequestQuote }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveImageIdx(prev => (prev + 1) % project.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIdx(prev => (prev - 1 + project.images.length) % project.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.images[activeImageIdx] || project.images[0];

  return (
    <div
      id="project-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-raised border border-white/20 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col my-auto text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-mono-code uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.location}</span>
              {project.year && <span>• {project.year}</span>}
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-stone-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden border border-white/10">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Navigation arrows if multiple images */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx(prev => (prev - 1 + project.images.length) % project.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 text-white backdrop-blur border border-white/20 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIdx(prev => (prev + 1) % project.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 text-white backdrop-blur border border-white/20 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {currentImage.tag && (
                <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 rounded text-xs font-mono-code text-accent">
                  {currentImage.tag}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIdx === idx ? 'border-accent scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {currentImage.caption && (
              <p className="text-xs text-stone-400 font-mono-code italic">
                {currentImage.caption}
              </p>
            )}
          </div>

          {/* Project Details & Specs */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400 block">
                  Project Overview:
                </span>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Scope Checklist */}
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-stone-400 block mb-2">
                  Scope of Work Executed:
                </span>
                <ul className="space-y-1.5">
                  {project.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Specs */}
              {project.specs && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-1.5 text-xs">
                  <div className="font-mono-code text-[11px] uppercase tracking-wider text-accent font-semibold">
                    Technical Specifications:
                  </div>
                  <div><span className="text-stone-400">Material:</span> {project.specs.material}</div>
                  {project.specs.patternOrStyle && <div><span className="text-stone-400">Pattern:</span> {project.specs.patternOrStyle}</div>}
                  {project.specs.colorOrFinish && <div><span className="text-stone-400">Color/Finish:</span> {project.specs.colorOrFinish}</div>}
                  {project.specs.subBase && <div><span className="text-stone-400">Sub-base:</span> {project.specs.subBase}</div>}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onRequestQuote(project);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-fg text-xs font-bold uppercase tracking-wider rounded transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Request Quote for Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

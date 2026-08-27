import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { IMAGES } from '../../data/images';
import { SERVICES } from '../../data/services';

interface ServicesCarouselProps {
  onNavigate: (path: string) => void;
}

const CARD_IMAGES: Record<string, string> = {
  'stamped-concrete': IMAGES.stampedPatio,
  'concrete-driveways': IMAGES.concreteDriveway,
  interlock: IMAGES.interlockPatio,
  'concrete-patios': IMAGES.patioPool,
  'concrete-stairs': IMAGES.concreteStairs,
  'garage-floors': IMAGES.concreteSlab,
};

const AUTOPLAY_MS = 4000;
const RESUME_MS = 1000;
const cards = [...SERVICES, ...SERVICES, ...SERVICES];

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ onNavigate }) => {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const intervalRef = useRef<number | null>(null);
  const resumeRef = useRef<number | null>(null);
  const interactingRef = useRef(false);
  const hoveredRef = useRef(false);
  const skipClickRef = useRef(false);
  const pointerProgressRef = useRef(0);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi || interactingRef.current) return;
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, AUTOPLAY_MS);
  }, [emblaApi, stopAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    startAutoplay();

    const onPointerDown = () => {
      interactingRef.current = true;
      skipClickRef.current = false;
      pointerProgressRef.current = emblaApi.scrollProgress();
      if (resumeRef.current != null) {
        window.clearTimeout(resumeRef.current);
        resumeRef.current = null;
      }
      stopAutoplay();
    };

    const onPointerUp = () => {
      skipClickRef.current =
        Math.abs(emblaApi.scrollProgress() - pointerProgressRef.current) > 0.003;
      resumeRef.current = window.setTimeout(() => {
        if (!hoveredRef.current) {
          interactingRef.current = false;
          startAutoplay();
        }
      }, RESUME_MS);
    };

    const onMouseEnter = () => {
      hoveredRef.current = true;
      interactingRef.current = true;
      stopAutoplay();
    };

    const onMouseLeave = () => {
      hoveredRef.current = false;
      interactingRef.current = false;
      startAutoplay();
    };

    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('pointerUp', onPointerUp);
    const root = emblaApi.rootNode();
    root.addEventListener('mouseenter', onMouseEnter);
    root.addEventListener('mouseleave', onMouseLeave);

    return () => {
      stopAutoplay();
      if (resumeRef.current != null) window.clearTimeout(resumeRef.current);
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('pointerUp', onPointerUp);
      root.removeEventListener('mouseenter', onMouseEnter);
      root.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  return (
    <section id="home-v2-services-carousel" className="relative z-10 py-6 sm:py-8">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        <div className="relative">
          <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex cursor-grab select-none active:cursor-grabbing">
            {cards.map((service, index) => (
              <button
                key={`${service.slug}-${index}`}
                type="button"
                onClick={() => {
                  if (skipClickRef.current) return;
                  onNavigate(`/services/${service.slug}`);
                }}
                className="group relative mr-3 block h-[240px] w-[calc(100%-1.75rem)] flex-shrink-0 overflow-hidden border-[6px] border-accent sm:mr-4 sm:h-[280px] sm:w-[calc(50%-8px)] sm:border-[8px] lg:h-[260px] lg:w-[calc(25%-12px)]"
              >
                <img
                  src={CARD_IMAGES[service.slug] ?? service.heroImage}
                  alt={service.title}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                  <span className="text-base font-medium text-white sm:text-lg">{service.title}</span>
                </div>
              </button>
            ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/55 to-transparent sm:w-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/55 to-transparent sm:w-10"
          />
        </div>
      </div>
    </section>
  );
};

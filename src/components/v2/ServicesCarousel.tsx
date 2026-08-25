import React, { useEffect, useRef } from 'react';
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

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ onNavigate }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const axisRef = useRef<'x' | 'y' | null>(null);
  const lastXRef = useRef(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const cards = [...SERVICES, ...SERVICES, ...SERVICES];

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const el = trackRef.current;
      if (el && !pausedRef.current && !draggingRef.current) {
        offsetRef.current -= 0.45;
        const loopWidth = el.scrollWidth / 3;
        if (loopWidth > 0 && -offsetRef.current >= loopWidth) {
          offsetRef.current += loopWidth;
        }
        el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const wrapOffset = () => {
    const el = trackRef.current;
    if (!el) return;
    const loopWidth = el.scrollWidth / 3;
    if (loopWidth <= 0) return;
    if (offsetRef.current > 0) offsetRef.current -= loopWidth;
    if (-offsetRef.current >= loopWidth) offsetRef.current += loopWidth;
    el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    axisRef.current = null;
    draggingRef.current = false;
    movedRef.current = false;
    lastXRef.current = event.clientX;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    pausedRef.current = true;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (axisRef.current === 'y') return;

    if (axisRef.current === null) {
      const dx = Math.abs(event.clientX - startXRef.current);
      const dy = Math.abs(event.clientY - startYRef.current);
      if (dx < 8 && dy < 8) return;
      axisRef.current = dx > dy ? 'x' : 'y';
      if (axisRef.current === 'y') {
        pausedRef.current = false;
        return;
      }
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (axisRef.current !== 'x') return;
    event.preventDefault();
    const delta = event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
    if (Math.abs(event.clientX - startXRef.current) > 2) movedRef.current = true;
    offsetRef.current += delta;
    wrapOffset();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    axisRef.current = null;
    pausedRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="home-v2-services-carousel" className="relative z-10 py-6 sm:py-8">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        <div className="overflow-hidden overscroll-x-contain">
          <div
            ref={trackRef}
            className="flex cursor-grab select-none touch-pan-y will-change-transform active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {cards.map((service, index) => (
              <button
                key={`${service.slug}-${index}`}
                type="button"
                onClick={() => {
                  if (movedRef.current) return;
                  onNavigate(`/services/${service.slug}`);
                }}
                className="group relative mr-3 block h-[240px] w-[calc(100%-1.75rem)] flex-shrink-0 overflow-hidden border-[6px] border-accent sm:mr-4 sm:h-[280px] sm:w-[calc(50%-8px)] sm:border-[8px] lg:h-[260px] lg:w-[calc(25%-12px)]"
              >
                <img
                  src={CARD_IMAGES[service.slug] ?? service.heroImage}
                  alt={service.title}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                  <span className="text-base font-medium text-white sm:text-lg">{service.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

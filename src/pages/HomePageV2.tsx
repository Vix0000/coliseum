import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  HardHat,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  Send,
  ShieldCheck,
  Snowflake,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { FIELD_CLASS, FIELD_LABEL_CLASS, FormSelect } from '../components/FormSelect';
import { HomeScrollReveal } from '../components/v2/HomeScrollReveal';
import { ServicesCarousel } from '../components/v2/ServicesCarousel';
import { usePhoneCall } from '../components/PhoneCallContext';
import { useCompany, useTheme } from '../components/ThemeContext';
import { IMAGES, VIDEOS } from '../data/images';
import { REVIEWS } from '../data/reviews';
import { formatHoursChips } from '../theme/hours';
import { FacebookIcon, InstagramIcon } from '../components/SocialLinks';

interface HomePageV2Props {
  onNavigate: (path: string) => void;
}

const REQUEST_OPTIONS = [
  'Question about services',
  'Request a quote',
  'Project timeline',
  'Feedback',
  'Other',
];

const AccentGlyph: React.FC<{ icon: React.ElementType; label: string }> = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 sm:gap-4">
    <div className="flex flex-col items-center">
      <div className="h-5 w-0.5 bg-accent sm:h-6" />
      <div className="my-1 border border-accent bg-accent p-1.5 text-accent-fg sm:p-2">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
      </div>
      <div className="h-5 w-0.5 bg-accent sm:h-6" />
    </div>
    <span className="font-display text-lg font-semibold tracking-wide text-white sm:text-xl">
      {label}
    </span>
  </div>
);

export const HomePageV2: React.FC<HomePageV2Props> = ({ onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { hours } = useTheme();
  const { openPhoneModal } = usePhoneCall();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showHeroChrome, setShowHeroChrome] = useState(true);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(1);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({
    request: REQUEST_OPTIONS[0],
    details: '',
    name: '',
    phone: '',
    email: '',
    consent: false,
  });

  const hourChips = useMemo(
    () => formatHoursChips(hours).filter((chip) => chip.label.startsWith('Monday')),
    [hours]
  );
  const testimonialPages = useMemo(() => {
    const pages: (typeof REVIEWS)[] = [];
    for (let i = 0; i < REVIEWS.length; i += testimonialsPerPage) {
      pages.push(REVIEWS.slice(i, i + testimonialsPerPage));
    }
    return pages;
  }, [testimonialsPerPage]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.muted = muted;

    const replay = () => {
      if (!playing) return;
      if (video.currentTime !== 0) {
        video.currentTime = 0;
      }
      void video.play().catch(() => setPlaying(false));
    };

    const onEnded = () => replay();

    // Native `loop` can stall on the last frame (often black) in Chrome.
    const onTimeUpdate = () => {
      if (!playing || video.paused) return;
      const { duration, currentTime } = video;
      if (!Number.isFinite(duration) || duration < 0.5) return;
      if (currentTime > 0.25 && duration - currentTime < 0.12) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('timeupdate', onTimeUpdate);

    if (playing) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [muted, playing]);

  useEffect(() => {
    const onScroll = () => setShowHeroChrome(window.scrollY <= 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const apply = () => {
      setTestimonialsPerPage(media.matches ? 2 : 1);
      setTestimonialPage(0);
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  const scrollToCarousel = () => {
    document.getElementById('home-v2-services-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitContact = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.consent) {
      setFormError('Please complete the required fields and accept the privacy notice.');
      return;
    }
    setFormError('');
    setFormSuccess(true);
  };

  return (
    <div id="home-v2-page" className="bg-canvas">
      <SeoHead
        title="Coliseum Concrete & Interlock | Ottawa's Concrete & Hardscape Contractor"
        description="Premium concrete, stamped concrete, and interlock craftsmanship for Ottawa homes. Licensed and insured contractor specializing in driveways, patios, and stairs."
        canonicalPath="/"
      />

      <div className="relative">
        <div className="sticky top-0 z-0 h-[100dvh] overflow-hidden">
          <section
            id="home-v2-hero"
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-black md:block"
          >
            <div className="relative min-h-0 w-full flex-1 overflow-hidden md:absolute md:inset-0 md:h-full">
              <video
                ref={videoRef}
                id="home-v2-hero-video"
                src={VIDEOS.hero}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={VIDEOS.heroPoster}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] md:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,1) 100%)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
                }}
              />
              <div className="absolute inset-0 bg-canvas/30" />

              <div
                className={`fixed right-4 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] z-30 flex flex-col items-center gap-2 transition-all duration-700 ease-in-out lg:right-6 lg:bottom-20 ${
                  showHeroChrome
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-10 opacity-0'
                }`}
              >
                <button
                  type="button"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  onClick={() => setMuted((current) => !current)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-raised text-accent shadow-2xl transition-all hover:border-accent hover:bg-elevated active:scale-95"
                >
                  {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  aria-label={playing ? 'Pause' : 'Play'}
                  onClick={() => setPlaying((current) => !current)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-raised text-accent shadow-2xl transition-all hover:border-accent hover:bg-elevated active:scale-95"
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="button"
                aria-label="Scroll down"
                onClick={scrollToCarousel}
                className={`absolute bottom-3 left-3 z-10 flex flex-col items-center gap-2 bg-transparent p-0 transition-all duration-500 hover:opacity-80 md:fixed md:bottom-8 md:left-3 ${
                  showHeroChrome ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
                }`}
              >
                <span
                  className="text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  Scroll Down
                </span>
                <div className="relative h-8 w-px overflow-hidden bg-accent/40 sm:h-10">
                  <div className="absolute top-0 left-0 h-full w-full animate-scroll-line bg-accent" />
                </div>
              </button>
            </div>

            <div className="relative z-20 w-full bg-black md:absolute md:inset-0 md:bg-transparent md:pointer-events-none">
              <div className="relative flex h-full flex-col items-center justify-between">
                <div className="hidden flex-1 md:block" />
                <div
                  className={`pointer-events-auto relative w-full py-3 pr-16 pl-4 pb-[calc(5.25rem+env(safe-area-inset-bottom))] transition-all duration-700 ease-in-out sm:px-8 sm:pt-8 lg:pb-8 ${
                    showHeroChrome
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-10 opacity-0'
                  }`}
                >
                  <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-8 lg:gap-y-4">
                    <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:flex-wrap lg:gap-x-6 lg:gap-y-2 lg:text-left">
                      <div className="flex max-w-[20rem] items-start gap-2 text-[11px] leading-snug text-white sm:max-w-none sm:items-center sm:text-xs">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 sm:mt-0" />
                        <span>{COMPANY_INFO.fullAddress}</span>
                      </div>
                      <button
                        type="button"
                        onClick={openPhoneModal}
                        className="min-h-11 rounded-[4px] border-2 border-white px-3 py-2 text-xs text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg"
                      >
                        {COMPANY_INFO.phone}
                      </button>
                    </div>

                    <div className="flex w-full flex-col items-center gap-1.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-1.5 md:gap-4">
                      {hourChips.map((chip) => (
                        <div key={chip.label} className="flex items-center gap-2">
                          <span className="inline-flex min-h-11 items-center rounded-[4px] border-2 border-white px-3 py-2 text-xs text-white">
                            {chip.label}
                          </span>
                          <span className="text-xs text-white">{chip.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="relative z-10 bg-transparent">
          <ServicesCarousel onNavigate={onNavigate} />
        </div>
      </div>

      <section id="home-v2-about" className="scroll-mt-24 bg-transparent pt-6 pb-12 sm:pt-8 sm:pb-16">
        <h2 className="mb-6 px-4 text-center font-display text-2xl font-bold text-accent sm:mb-12 md:text-4xl">
          Concrete & Interlock – Ottawa
        </h2>
        <HomeScrollReveal>
          <p className="mx-auto mb-10 max-w-4xl px-4 text-center text-sm text-stone-400 sm:mb-16 sm:px-8">
            <span className="font-semibold text-white">Coliseum Concrete & Interlock</span> has been
            offering stamped concrete, driveways, and architectural hardscapes to homeowners across
            Ottawa for over 20 years. Most residential driveways and patios are completed in 3 to 7
            days during the May through October season. Request a quote.
          </p>
        </HomeScrollReveal>

        <div className="relative my-8 h-auto min-h-[240px] w-full py-14 sm:my-16 sm:h-[400px] sm:py-0 md:h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGES.rebarSlab}')` }}
          />
          <div className="absolute inset-0 bg-canvas/60" />
          <div
            className="absolute inset-x-0 top-0 z-[1] h-32"
            style={{ background: 'linear-gradient(to bottom, var(--canvas) 0%, transparent 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-[1] h-32"
            style={{ background: 'linear-gradient(to top, var(--canvas) 0%, transparent 100%)' }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-8">
            <HomeScrollReveal>
              <div className="flex flex-col items-center">
                <h1 className="text-center font-display text-2xl font-bold text-white md:text-4xl">
                  <span className="underline decoration-accent decoration-2 underline-offset-4">W</span>
                  e&apos;re Addicted To Concrete Perfection
                </h1>
                <button
                  type="button"
                  id="home-v2-perfection-cta"
                  onClick={() => onNavigate('/quote')}
                  className="btn-shine mt-6 bg-accent px-6 py-3 font-medium text-accent-fg transition-all hover:brightness-110 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_60%,transparent)] sm:mt-8"
                >
                  Get a Free Quote
                </button>
              </div>
            </HomeScrollReveal>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-8 lg:flex-row lg:gap-12">
          <div className="space-y-6 lg:w-1/2">
            <HomeScrollReveal>
              <h2 className="font-display text-2xl font-bold text-accent md:text-4xl">
                Old-World Craft, Modern Engineering
              </h2>
            </HomeScrollReveal>
            <HomeScrollReveal>
              <p className="text-sm leading-relaxed text-stone-400">
                Step onto a finished patio that blends traditional masonry character with structural
                concrete. Whether you&apos;re looking for a{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/services/stamped-concrete')}
                  className="font-bold text-accent underline underline-offset-2 hover:opacity-80"
                >
                  stamped stone terrace
                </button>{' '}
                or a clean architectural broom driveway, the experience at{' '}
                <span className="font-semibold text-white">Coliseum Concrete & Interlock</span> will
                have you wondering why you waited this long.
              </p>
            </HomeScrollReveal>
            <HomeScrollReveal>
              <p className="text-sm leading-relaxed text-stone-400">
                Our aim is to offer Ottawa homeowners what they want—everything from a{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/services/concrete-driveways')}
                  className="font-bold text-accent underline underline-offset-2 hover:opacity-80"
                >
                  classic broom finish
                </button>{' '}
                to an ultramodern stamped design—with no fuss, no shortcuts, and the greatest care in
                base prep and reinforcement. Give us a call to book your site visit today.
              </p>
            </HomeScrollReveal>
            <div className="pt-6">
              <HomeScrollReveal>
                <AccentGlyph icon={HardHat} label="We build what you want" />
              </HomeScrollReveal>
            </div>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <HomeScrollReveal className="flex w-full justify-center">
              <div
                className="v2-gold-offset aspect-square w-[min(85vw,calc(100%-1.5rem))] max-w-[520px] bg-cover bg-center"
                style={{ backgroundImage: `url('${IMAGES.finishedDriveway}')` }}
                role="img"
                aria-label="Finished concrete driveway"
              />
            </HomeScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-raised py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <HomeScrollReveal>
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-accent sm:mb-12 md:text-4xl">
              What Makes Us The Best?
            </h2>
          </HomeScrollReveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: Snowflake,
                title: 'Freeze-Thaw Engineered',
                text: 'We pour 32+ MPa air-entrained mixes specified for Ottawa winters, not builder-grade slabs that spall after one season.',
              },
              {
                icon: ShieldCheck,
                title: 'Written Quality Guarantee',
                text: 'Every installation is backed by a written quality guarantee. We stand behind the work after the crew leaves.',
              },
              {
                icon: CalendarCheck,
                title: 'May through October',
                text: 'The ideal pour window runs from late spring to late autumn. Most residential driveways and patios are completed in 3 to 7 days.',
              },
            ].map((card) => (
              <HomeScrollReveal key={card.title}>
                <div className="shadow-gold h-full bg-elevated p-6 sm:p-8">
                  <div className="flex flex-col items-start">
                    <card.icon className="mb-6 h-12 w-12 text-accent" />
                    <h3 className="mb-4 text-xl font-semibold text-accent">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-stone-400">{card.text}</p>
                  </div>
                </div>
              </HomeScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-canvas py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="my-4 flex justify-center overflow-hidden lg:my-0">
              <div className="relative w-full max-w-md">
                <div
                  className="absolute aspect-square w-[min(90vw,100%)] max-w-[560px] bg-contain bg-center bg-no-repeat opacity-15"
                  style={{
                    backgroundImage: `url('${IMAGES.stampedPatio}')`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.9))',
                  }}
                />
                <HomeScrollReveal>
                  <div
                    className="relative z-10 mx-auto aspect-square w-[min(75vw,100%)] max-w-[400px] bg-cover bg-center shadow-xl"
                    style={{ backgroundImage: `url('${IMAGES.projectEntryAfter}')` }}
                  />
                </HomeScrollReveal>
              </div>
            </div>
            <div className="space-y-6">
              <HomeScrollReveal>
                <h2 className="font-display text-2xl font-bold text-accent md:text-4xl">
                  Permanent Outdoor Living
                </h2>
              </HomeScrollReveal>
              <HomeScrollReveal>
                <p className="leading-relaxed text-stone-400">
                  As one of Ottawa&apos;s licensed and insured hardscape contractors,{' '}
                  <span className="font-bold text-white">Coliseum Concrete & Interlock</span> has you
                  covered whether you need a full{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/services/stamped-concrete')}
                    className="font-bold text-accent underline hover:opacity-80"
                  >
                    stamped patio
                  </button>
                  , a{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/services/concrete-driveways')}
                    className="font-bold text-accent underline hover:opacity-80"
                  >
                    structural driveway
                  </button>
                  , or rebuilt entrance stairs.
                </p>
              </HomeScrollReveal>
              <HomeScrollReveal>
                <p className="leading-relaxed text-stone-400">
                  Do you prefer a clean architectural broom, rich ashlar slate, or high-format
                  interlock? Tell us how you use the space, and we will leave you with a surface
                  built to last decades of freeze-thaw.
                </p>
              </HomeScrollReveal>
              <HomeScrollReveal>
                <p className="leading-relaxed text-stone-400">
                  Everything we do is to give you a finished outdoor space you can actually enjoy —
                  that&apos;s why we take drainage, compaction, and reinforcement so seriously. Book
                  early in spring for the May through October season.
                </p>
              </HomeScrollReveal>
              <div className="pt-4">
                <HomeScrollReveal>
                  <AccentGlyph icon={CalendarCheck} label="Most jobs wrap in 3–7 days" />
                </HomeScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <HomeScrollReveal>
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-accent sm:mb-12 md:text-4xl">
              Testimonials
            </h2>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div
              className="mb-8 overflow-hidden touch-pan-y"
              onPointerDown={(event) => {
                (event.currentTarget as HTMLDivElement).dataset.dragX = String(event.clientX);
              }}
              onPointerUp={(event) => {
                const start = Number((event.currentTarget as HTMLDivElement).dataset.dragX || 0);
                const delta = event.clientX - start;
                if (delta > 50) {
                  setTestimonialPage((page) => Math.max(0, page - 1));
                } else if (delta < -50) {
                  setTestimonialPage((page) => Math.min(testimonialPages.length - 1, page + 1));
                }
              }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${testimonialPage * 100}%)` }}
              >
                {testimonialPages.map((page, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className={`grid grid-cols-1 gap-5 ${page.length > 1 ? 'lg:grid-cols-2 lg:gap-8' : ''}`}>
                      {page.map((item) => (
                        <div
                          key={item.name}
                          className="flex min-h-[220px] gap-4 bg-elevated p-5 sm:h-[280px] sm:gap-6 sm:p-8"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-accent sm:h-14 sm:w-14">
                            <Star className="h-6 w-6 text-accent sm:h-8 sm:w-8" fill="currentColor" />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <p className="line-clamp-6 text-sm leading-relaxed text-stone-400">
                              {item.quote}
                            </p>
                            <div className="mt-4">
                              <h4 className="font-semibold text-white">{item.name}</h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div className="mb-8 flex justify-center gap-3">
              {testimonialPages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to testimonials page ${index + 1}`}
                  onClick={() => setTestimonialPage(index)}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border border-accent transition-all duration-300 lg:h-5 lg:w-5 ${
                      testimonialPage === index ? 'bg-accent' : 'bg-transparent'
                    }`}
                  />
                </button>
              ))}
            </div>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div className="flex justify-center">
              <a
                href={COMPANY_INFO.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read Coliseum reviews on Google"
                className="border-2 border-white px-8 py-3 font-medium text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg"
              >
                Reviews
              </a>
            </div>
          </HomeScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-canvas py-12 sm:py-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMAGES.excavate}')` }}
        />
        <div className="absolute inset-0 bg-canvas/60" />
        <div
          className="absolute inset-x-0 top-0 z-[1] h-32"
          style={{ background: 'linear-gradient(to bottom, var(--canvas) 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-[1] h-32"
          style={{ background: 'linear-gradient(to top, var(--canvas) 0%, transparent 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <HomeScrollReveal>
            <h2 className="mb-4 text-center font-display text-2xl font-bold text-white md:text-4xl">
              Get in touch with us using the form below.
            </h2>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <p className="mx-auto mb-8 max-w-4xl px-1 text-center text-sm text-white sm:mb-12 sm:text-base">
              If you are ready for a line-item estimate, please use the quote request on this page.
              This form is a demo and does not send messages.
            </p>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div className="mx-auto max-w-3xl">
              <div className="bg-surface border-2 border-white/15 rounded-2xl p-5 sm:p-8 shadow-2xl">
                <h3 className="mb-8 text-center font-display text-xl font-semibold text-white">
                  Contact
                </h3>
                {formSuccess ? (
                  <div className="space-y-4 py-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-accent/20 text-accent">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <p className="text-white">Demo confirmation — nothing was sent.</p>
                    <button
                      type="button"
                      onClick={() => onNavigate('/quote')}
                      className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-fg"
                    >
                      Start a quote instead
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={submitContact}>
                    {formError && (
                      <div className="flex items-center gap-2 rounded border-2 border-red-500 bg-red-900/40 p-3 text-xs text-red-200">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                        <span>{formError}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="v2-request" className={FIELD_LABEL_CLASS}>
                          Request
                        </label>
                        <FormSelect
                          id="v2-request"
                          aria-label="Request type"
                          value={form.request}
                          onChange={(request) => setForm({ ...form, request })}
                          options={REQUEST_OPTIONS}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="v2-details" className={FIELD_LABEL_CLASS}>
                          Details
                        </label>
                        <textarea
                          id="v2-details"
                          rows={4}
                          placeholder="Specify your request"
                          value={form.details}
                          onChange={(event) => setForm({ ...form, details: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>
                      <div>
                        <label htmlFor="v2-name" className={FIELD_LABEL_CLASS}>
                          Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="v2-name"
                          required
                          maxLength={100}
                          placeholder="e.g. David Miller"
                          value={form.name}
                          onChange={(event) => setForm({ ...form, name: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>
                      <div>
                        <label htmlFor="v2-phone" className={FIELD_LABEL_CLASS}>
                          Phone <span className="text-accent">*</span>
                        </label>
                        <input
                          id="v2-phone"
                          type="tel"
                          required
                          maxLength={20}
                          placeholder="e.g. (613) 555-0199"
                          value={form.phone}
                          onChange={(event) => setForm({ ...form, phone: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="v2-email" className={FIELD_LABEL_CLASS}>
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          id="v2-email"
                          type="email"
                          required
                          placeholder="e.g. david@example.com"
                          value={form.email}
                          onChange={(event) => setForm({ ...form, email: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            required
                            checked={form.consent}
                            onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-white/20 bg-canvas accent-[var(--accent)]"
                          />
                          <span className="text-xs text-stone-400">
                            By submitting this form, I accept that the information entered will be
                            used within the strict framework of my request{' '}
                            <span className="text-accent">*</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-mono-code text-[11px] text-stone-500">
                        Demo form — nothing is sent.
                      </span>
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded bg-accent px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-accent-fg shadow-xl transition-all hover:bg-accent-hover active:bg-accent-active"
                      >
                        <span>Send</span>
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-500">
                      <span className="text-accent">*</span> These fields are mandatory
                    </p>
                    <p className="text-xs text-stone-400">
                      Coliseum is committed to handling inquiries with care. To know and exercise
                      your rights, please consult our{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('/privacy')}
                        className="text-accent underline hover:text-accent-hover"
                      >
                        privacy policy
                      </button>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </HomeScrollReveal>
        </div>
      </section>

      <div className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col gap-1 min-[1100px]:flex">
        <button type="button" onClick={openPhoneModal} className="group relative flex items-center">
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-elevated px-3 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Call Us
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-elevated text-white">
            <Phone className="h-5 w-5" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-elevated px-3 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Contact
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-elevated text-white">
            <Mail className="h-5 w-5" />
          </span>
        </button>
        <a
          href={COMPANY_INFO.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Coliseum on Facebook"
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-[#1877f2] px-3 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Facebook
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-[#1877f2] text-white">
            <FacebookIcon className="h-5 w-5" />
          </span>
        </a>
        <a
          href={COMPANY_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Coliseum on Instagram"
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-[#E1306C] px-3 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Instagram
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-[#E1306C] text-white">
            <InstagramIcon className="h-5 w-5" />
          </span>
        </a>
      </div>
    </div>
  );
};

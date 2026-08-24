import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  FileText,
  HardHat,
  Layers,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  ShieldCheck,
  Snowflake,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { HomeScrollReveal } from '../components/v2/HomeScrollReveal';
import { ServicesCarousel } from '../components/v2/ServicesCarousel';
import { usePhoneCall } from '../components/PhoneCallContext';
import { useCompany, useTheme } from '../components/ThemeContext';
import { IMAGES, VIDEOS } from '../data/images';
import { formatHoursChips } from '../theme/hours';

interface HomePageV2Props {
  onNavigate: (path: string) => void;
}

const TESTIMONIALS = [
  {
    name: 'Daniel K',
    quote:
      'The stamped patio looks like real stone and has already been through a full Ottawa winter without a hairline crack. The crew was careful around our gardens and left the yard cleaner than they found it.',
  },
  {
    name: 'Sarah M',
    quote:
      'We replaced a rutted asphalt driveway with a broom-finish concrete pad and stamped ribbons. It drains properly, takes the plow, and completely changed the front of the house.',
  },
  {
    name: 'Marc T',
    quote:
      'Our brick steps were coming apart every spring. Coliseum poured solid stairs on frost piers and they have not moved. Best money we have spent on the house.',
  },
  {
    name: 'Priya S',
    quote:
      'The interlock walkway is perfectly level after two winters. They explained the base work before they started, and you can tell they did not skip it.',
  },
  {
    name: 'James R',
    quote:
      'Garage floor was pitted from road salt. The new slab is laser-pitched to the door and the finish is dense enough that salt no longer eats it. Highly recommend.',
  },
  {
    name: 'Elena P',
    quote:
      'From the quote visit to the final sealer coat, they were professional and on time. The patio is now the space we actually use all summer.',
  },
];

const REQUEST_OPTIONS = [
  'Question about services',
  'Request a quote',
  'Project timeline',
  'Feedback',
  'Other',
];

const AccentGlyph: React.FC<{ icon: React.ElementType; label: string }> = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-4">
    <div className="flex flex-col items-center">
      <div className="h-6 w-0.5 bg-accent" />
      <div className="my-1 border border-accent bg-accent p-2 text-accent-fg">
        <Icon className="h-8 w-8" />
      </div>
      <div className="h-6 w-0.5 bg-accent" />
    </div>
    <span className="font-display text-xl font-semibold tracking-wide text-white">{label}</span>
  </div>
);

export const HomePageV2: React.FC<HomePageV2Props> = ({ onNavigate }) => {
  const COMPANY_INFO = useCompany();
  const { hours } = useTheme();
  const { openPhoneModal } = usePhoneCall();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [testimonialPage, setTestimonialPage] = useState(0);
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

  const hourChips = useMemo(() => formatHoursChips(hours), [hours]);
  const testimonialPages = useMemo(() => {
    const pages: (typeof TESTIMONIALS)[] = [];
    for (let i = 0; i < TESTIMONIALS.length; i += 2) {
      pages.push(TESTIMONIALS.slice(i, i + 2));
    }
    return pages;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    if (playing) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [muted, playing]);

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 140);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  const inputClass =
    'w-full bg-[#F2F2F2] px-4 py-3 text-black outline-none placeholder:text-gray-500';

  return (
    <div id="home-v2-page" className="bg-canvas">
      <SeoHead
        title="Coliseum Concrete & Interlock | Ottawa's Concrete & Hardscape Contractor"
        description="Premium concrete, stamped concrete, and interlock craftsmanship for Ottawa homes. Licensed contractor specializing in driveways, patios, and stairs."
        canonicalPath="/"
      />

      <div className="relative">
        <div className="sticky top-0 z-0 h-screen overflow-hidden">
          <section
            id="home-v2-hero"
            className="relative flex h-dvh w-full flex-col overflow-hidden bg-black md:block"
          >
            <div className="relative w-full flex-1 overflow-hidden md:absolute md:inset-0 md:h-full">
              <video
                ref={videoRef}
                id="home-v2-hero-video"
                autoPlay
                loop
                muted
                playsInline
                poster={VIDEOS.heroPoster}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={VIDEOS.hero} type="video/mp4" />
              </video>
              <div
                className="pointer-events-none absolute inset-0 z-[1] md:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,1) 100%)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
                }}
              />
              <div className="absolute inset-0 bg-canvas/30" />
            </div>

            <div className="relative z-20 w-full bg-black md:absolute md:inset-0 md:bg-transparent md:pointer-events-none">
              <div className="relative flex h-full flex-col items-center justify-between">
                <div className="hidden flex-1 md:block" />
                <div className="pointer-events-auto relative w-full px-8 py-4 pb-6 sm:py-8">
                  <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-8 lg:gap-y-4">
                    <div className="flex flex-col items-center gap-2 lg:flex-row lg:flex-wrap lg:gap-x-6 lg:gap-y-2">
                      <div className="flex items-center gap-2 text-xs text-white">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>{COMPANY_INFO.fullAddress}</span>
                      </div>
                      <button
                        type="button"
                        onClick={openPhoneModal}
                        className="border-2 border-white px-2 py-0.5 text-xs text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg"
                      >
                        {COMPANY_INFO.phone}
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-3 2xl:flex-row 2xl:items-center">
                      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
                        {hourChips.map((chip) => (
                          <div key={chip.label} className="flex items-center gap-2">
                            <span className="border-2 border-white px-1.5 py-0.5 text-xs text-white">
                              {chip.label}
                            </span>
                            <span className="text-xs text-white">{chip.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-16 right-16 hidden items-center gap-2 md:top-1/2 md:right-16 md:flex md:-translate-y-1/2">
                    <button
                      type="button"
                      aria-label={muted ? 'Unmute' : 'Mute'}
                      onClick={() => setMuted((current) => !current)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70"
                    >
                      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <button
                      type="button"
                      aria-label={playing ? 'Pause' : 'Play'}
                      onClick={() => setPlaying((current) => !current)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70"
                    >
                      {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Scroll down"
                  onClick={scrollToCarousel}
                  className={`absolute top-4 left-4 z-50 flex flex-col items-center gap-2 bg-transparent p-0 transition-all duration-500 hover:opacity-80 md:fixed md:top-auto md:bottom-8 md:left-3 ${
                    showScrollHint ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
                  }`}
                >
                  <span
                    className="text-[10px] font-medium tracking-[0.3em] text-white/60 uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    Scroll Down
                  </span>
                  <div className="relative h-10 w-px overflow-hidden bg-accent/40">
                    <div className="absolute top-0 left-0 h-full w-full animate-scroll-line bg-accent" />
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="relative z-10 bg-transparent">
          <ServicesCarousel onNavigate={onNavigate} />
        </div>
      </div>

      <section id="home-v2-about" className="scroll-mt-24 bg-transparent pt-8 pb-16">
        <h2 className="mb-12 text-center font-display text-2xl font-bold text-accent md:text-4xl">
          Concrete & Interlock – Ottawa
        </h2>
        <HomeScrollReveal>
          <p className="mx-auto mb-16 max-w-4xl px-8 text-center text-sm text-stone-400">
            <span className="font-semibold text-white">Coliseum Concrete & Interlock</span> has been
            offering stamped concrete, driveways, and architectural hardscapes to homeowners across
            Ottawa since 2000. Request a quote.
          </p>
        </HomeScrollReveal>

        <div className="relative my-16 h-[300px] w-full sm:h-[400px] md:h-[500px]">
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
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
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
                  className="btn-shine mt-8 bg-accent px-6 py-3 font-medium text-accent-fg transition-all hover:brightness-110 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
                >
                  Get a Free Quote
                </button>
              </div>
            </HomeScrollReveal>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 lg:flex-row">
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
            <HomeScrollReveal>
              <div
                className="v2-gold-offset mx-auto aspect-square w-[85vw] max-w-[520px] bg-cover bg-center"
                style={{ backgroundImage: `url('${IMAGES.finishedDriveway}')` }}
              />
            </HomeScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-raised py-16">
        <div className="mx-auto max-w-6xl px-4">
          <HomeScrollReveal>
            <h2 className="mb-12 text-center font-display text-2xl font-bold text-accent md:text-4xl">
              What Makes Us The Best?
            </h2>
          </HomeScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Snowflake,
                title: 'Freeze-Thaw Engineered',
                text: 'We pour 32+ MPa air-entrained mixes specified for Ottawa winters, not builder-grade slabs that spall after one season.',
              },
              {
                icon: ShieldCheck,
                title: 'A Clean, Careful Site',
                text: 'We treat your property like our own — protected edges, raked lawns, and a finished site you can actually use.',
              },
              {
                icon: Layers,
                title: 'Built for Every Home',
                text: 'From compact city lots to wide suburban driveways, every layout is laser-graded and reinforced for the load it will see.',
              },
            ].map((card) => (
              <HomeScrollReveal key={card.title}>
                <div className="shadow-gold h-full bg-elevated p-8">
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

      <section className="relative bg-canvas py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="my-12 flex justify-center lg:my-0">
              <div className="relative w-full max-w-md">
                <div
                  className="absolute aspect-square w-[90vw] max-w-[560px] bg-contain bg-center bg-no-repeat opacity-15"
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
                    className="relative z-10 mx-auto aspect-square w-[75vw] max-w-[400px] bg-cover bg-center shadow-xl"
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
                  As one of Ottawa&apos;s licensed hardscape contractors,{' '}
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
                  your site visit today.
                </p>
              </HomeScrollReveal>
              <div className="pt-4">
                <HomeScrollReveal>
                  <AccentGlyph icon={CalendarCheck} label="Sit back — we handle the pour" />
                </HomeScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-6xl px-4">
          <HomeScrollReveal>
            <h2 className="mb-12 text-center font-display text-2xl font-bold text-accent md:text-4xl">
              Testimonials
            </h2>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div className="mb-8 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${testimonialPage * 100}%)` }}
              >
                {testimonialPages.map((page, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      {page.map((item) => (
                        <div key={item.name} className="flex h-[280px] gap-6 bg-elevated p-8">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-accent">
                            <Star className="h-8 w-8 text-accent" fill="currentColor" />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <p className="line-clamp-6 text-sm leading-relaxed text-stone-400">
                              {item.quote}
                            </p>
                            <div className="mt-4">
                              <h4 className="font-semibold text-white">{item.name}</h4>
                              <div className="flex items-center gap-3">
                                <div className="flex gap-1 text-accent">
                                  <span>★</span>
                                  <span>★</span>
                                  <span>★</span>
                                  <span>★</span>
                                  <span>★</span>
                                </div>
                                <span className="text-sm text-white">5/5</span>
                              </div>
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
                  className={`h-4 w-4 rounded-full border border-accent transition-all duration-300 lg:h-5 lg:w-5 ${
                    testimonialPage === index ? 'bg-accent' : 'bg-transparent hover:bg-accent/30'
                  }`}
                />
              ))}
            </div>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="border-2 border-white px-8 py-3 font-medium text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg"
              >
                Reviews
              </button>
            </div>
          </HomeScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-canvas py-16">
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
            <p className="mx-auto mb-12 max-w-4xl text-center text-white">
              If you are ready for a line-item estimate, please use the quote request on this page.
              This form is a demo and does not send messages.
            </p>
          </HomeScrollReveal>
          <HomeScrollReveal>
            <div className="mx-auto max-w-3xl">
              <div className="bg-surface p-8">
                <h3 className="mb-8 text-center font-display text-xl font-semibold text-white">
                  Contact
                </h3>
                {formSuccess ? (
                  <div className="space-y-4 py-8 text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
                    <p className="text-white">Demo confirmation — nothing was sent.</p>
                    <button
                      type="button"
                      onClick={() => onNavigate('/quote')}
                      className="btn-shine bg-accent px-6 py-3 font-medium text-accent-fg"
                    >
                      Start a quote instead
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={submitContact}>
                    {formError && (
                      <p className="text-sm text-red-400">{formError}</p>
                    )}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="v2-request" className="mb-2 block text-sm text-accent">
                          Request
                        </label>
                        <select
                          id="v2-request"
                          value={form.request}
                          onChange={(event) => setForm({ ...form, request: event.target.value })}
                          className={inputClass}
                        >
                          {REQUEST_OPTIONS.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="v2-details" className="mb-2 block text-sm text-accent">
                          Details
                        </label>
                        <textarea
                          id="v2-details"
                          placeholder="Specify your request"
                          value={form.details}
                          onChange={(event) => setForm({ ...form, details: event.target.value })}
                          className={`${inputClass} min-h-[46px] resize-y`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="v2-name" className="mb-2 block text-sm text-accent">
                          Name *
                        </label>
                        <input
                          id="v2-name"
                          required
                          maxLength={100}
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(event) => setForm({ ...form, name: event.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="v2-phone" className="mb-2 block text-sm text-accent">
                          Phone *
                        </label>
                        <input
                          id="v2-phone"
                          type="tel"
                          required
                          maxLength={20}
                          placeholder="Your phone number"
                          value={form.phone}
                          onChange={(event) => setForm({ ...form, phone: event.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="v2-email" className="mb-2 block text-sm text-accent">
                          Email *
                        </label>
                        <input
                          id="v2-email"
                          type="email"
                          required
                          placeholder="Your email address"
                          value={form.email}
                          onChange={(event) => setForm({ ...form, email: event.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            required
                            checked={form.consent}
                            onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                            className="mt-1 h-4 w-4 accent-[var(--accent)]"
                          />
                          <span className="text-sm text-stone-400">
                            By submitting this form, I accept that the information entered will be
                            used within the strict framework of my request*
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-start pt-4">
                      <button
                        type="submit"
                        className="bg-[#F2F2F2] px-8 py-3 font-medium text-black transition-colors hover:bg-white"
                      >
                        Send
                      </button>
                    </div>
                    <p className="text-sm text-stone-400">*These fields are mandatory</p>
                    <p className="mt-8 text-sm text-stone-400">
                      Coliseum is committed to handling inquiries with care. To know and exercise
                      your rights, please consult our{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('/privacy')}
                        className="text-accent underline"
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
        <button
          type="button"
          onClick={() => onNavigate('/quote')}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-accent px-3 text-sm whitespace-nowrap text-accent-fg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Free Quote
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-accent text-accent-fg">
            <FileText className="h-5 w-5" />
          </span>
        </button>
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
          onClick={() => onNavigate('/projects')}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-[#4e8df7] px-3 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Gallery
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-[#4e8df7] text-white">
            <Star className="h-5 w-5" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-1 flex h-12 translate-x-2 items-center bg-[#1877f2] px-3 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Contact
          </span>
          <span className="flex h-12 w-12 items-center justify-center bg-[#1877f2] text-white">
            <Mail className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
};

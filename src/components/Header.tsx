import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { usePhoneCall } from './PhoneCallContext';

const SERVICE_NAV_HINTS: Record<string, string> = {
  'stamped-concrete': 'Patios, walkways & decorative finishes',
  'concrete-driveways': 'Heavy-duty residential pads & borders',
  'concrete-patios': 'Outdoor living & entertainment terraces',
  'concrete-stairs': 'Monolithic steps with frost footings',
  'garage-floors': 'Power-troweled durable shop floors',
  interlock: 'Pavers, driveway extensions & walls',
};

const WORK_CATEGORIES = [
  { label: 'All Ottawa Projects', path: '/projects' },
  { label: 'Stamped Concrete', path: '/projects?category=stamped-concrete' },
  { label: 'Concrete Driveways', path: '/projects?category=driveways' },
  { label: 'Interlock Craftsmanship', path: '/projects?category=interlock' },
  { label: 'Patios & Terraces', path: '/projects?category=patios' },
  { label: 'Stairs & Walkways', path: '/projects?category=stairs-walkways' },
];

const NAV_BTN =
  'px-3.5 py-2 rounded-md hover:text-white transition-colors';
const PHONE_BTN =
  'items-center justify-center p-2.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border-2 border-white/15 text-accent rounded transition-all';
const QUOTE_BTN =
  'bg-accent hover:bg-accent-hover active:bg-accent-active border border-accent hover:border-accent-hover active:border-accent-active text-accent-fg font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-lg hover:shadow-accent/20 active:scale-[0.98] px-5 py-2.5';
const MOBILE_MENU_MS = 300;

const BrandLockup: React.FC = () => (
  <>
    <span className="font-display tracking-[0.22em] font-bold text-white group-hover:text-accent transition-colors leading-none text-xl sm:text-2xl">
      COLISEUM
    </span>
    <span className="font-mono-code tracking-[0.18em] text-stone-400 uppercase leading-none text-[10px] sm:text-[11px] mt-1">
      Concrete & Interlock
    </span>
  </>
);

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [mobileMenuEntered, setMobileMenuEntered] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const { openPhoneModal } = usePhoneCall();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuMounted(true);
      const enter = window.setTimeout(() => setMobileMenuEntered(true), 10);
      return () => window.clearTimeout(enter);
    }

    setMobileMenuEntered(false);
    const leave = window.setTimeout(() => setMobileMenuMounted(false), MOBILE_MENU_MS);
    return () => window.clearTimeout(leave);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-nav-open');

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('mobile-nav-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuMounted]);

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setWorkDropdownOpen(false);
    onNavigate(path);
  };

  const navActive = (active: boolean) =>
    `${NAV_BTN} ${active ? 'text-accent font-semibold' : ''}`;

  return (
    <header
      id="main-header"
      className={`py-5 transition-[background-color,box-shadow] duration-300 ${
        isScrolled || mobileMenuMounted
          ? 'bg-canvas border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-canvas/90 via-canvas/50 to-transparent border-b-0'
      }`}
    >
      <div className="relative z-[80] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('/')}
            className={`${mobileMenuOpen ? 'hidden' : 'flex'} lg:flex flex-col items-start text-left group`}
            aria-label="Coliseum Concrete & Interlock Home"
          >
            <BrandLockup />
          </button>

          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-stone-300">
            <div
              className="relative"
              onMouseEnter={() => setWorkDropdownOpen(true)}
              onMouseLeave={() => setWorkDropdownOpen(false)}
            >
              <button
                id="nav-work-btn"
                onClick={() => handleNav('/projects')}
                className={`${navActive(currentPath.startsWith('/projects') || currentPath === '/process')} flex items-center gap-1`}
              >
                WORK
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${workDropdownOpen ? 'rotate-180 text-accent' : ''}`} />
              </button>

              {workDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-elevated border-2 border-white/15 rounded-lg shadow-2xl p-2 backdrop-blur-xl">
                    {WORK_CATEGORIES.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNav(item.path)}
                        className="group w-full text-left px-3 py-2 text-xs text-stone-300 hover:text-white hover:bg-white/5 rounded transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                    <div className="h-px bg-white/10 my-1" />
                    <button
                      id="nav-process-btn"
                      onClick={() => handleNav('/process')}
                      className={`group w-full text-left px-3 py-2 text-xs rounded transition-colors flex items-center justify-between ${
                        currentPath === '/process'
                          ? 'text-accent font-semibold'
                          : 'text-stone-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>Our Process</span>
                      <ArrowRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-services-btn"
                onClick={() => handleNav('/services')}
                className={`${navActive(currentPath.startsWith('/services'))} flex items-center gap-1`}
              >
                SERVICES
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-accent' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-elevated border-2 border-white/15 rounded-lg shadow-2xl p-2.5 backdrop-blur-xl space-y-1">
                    <button
                      onClick={() => handleNav('/services')}
                      className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-xs font-semibold text-accent flex items-center justify-between transition-colors"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-px bg-white/10 my-1" />
                    {SERVICES.map((srv) => (
                      <button
                        key={srv.slug}
                        onClick={() => handleNav(`/services/${srv.slug}`)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 rounded transition-colors block"
                      >
                        <div className="font-medium text-stone-200">{srv.title}</div>
                        {SERVICE_NAV_HINTS[srv.slug] && (
                          <div className="text-[11px] text-stone-400 truncate">{SERVICE_NAV_HINTS[srv.slug]}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-about-btn"
              onClick={() => handleNav('/about')}
              className={navActive(currentPath === '/about')}
            >
              ABOUT
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => handleNav('/contact')}
              className={navActive(currentPath === '/contact')}
            >
              CONTACT
            </button>
          </nav>

          <div className={`${mobileMenuOpen ? 'hidden' : 'hidden sm:flex'} items-center gap-3`}>
            <button
              id="header-phone-link"
              type="button"
              onClick={openPhoneModal}
              className={`hidden lg:flex ${PHONE_BTN}`}
              aria-label="Call Coliseum Concrete"
            >
              <Phone className="w-4 h-4" />
            </button>

            <button
              id="header-quote-cta-btn"
              onClick={() => handleNav('/quote')}
              className={QUOTE_BTN}
            >
              Get a Free Quote
            </button>
          </div>

          <div className="flex gap-2 lg:hidden items-center ml-auto">
            <button
              type="button"
              onClick={openPhoneModal}
              className="shrink-0 p-2.5 rounded-lg bg-white/5 border-2 border-white/10 text-accent hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors"
              aria-label="Call Coliseum Concrete"
            >
              <Phone className="w-6 h-6" />
            </button>

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="shrink-0 p-2.5 rounded-lg bg-white/5 border-2 border-white/10 text-stone-300 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuMounted && (
        <div className="lg:hidden fixed inset-0 z-[70]">
          <button
            type="button"
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              mobileMenuEntered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            id="mobile-nav-drawer"
            className={`absolute top-0 right-0 h-full w-[min(22rem,88vw)] bg-raised border-l-2 border-white/15 shadow-2xl p-5 pt-20 space-y-4 overflow-y-auto transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:translate-x-0 ${
              mobileMenuEntered ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-label="Mobile navigation"
          >
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500 px-3 py-1">
              Navigation
            </div>
            {currentPath !== '/' && (
              <button
                onClick={() => handleNav('/')}
                className="w-full text-left px-3 py-2.5 text-stone-200 hover:text-white hover:bg-white/5 rounded text-sm font-medium"
              >
                Home
              </button>
            )}
            <button
              onClick={() => handleNav('/projects')}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:text-white hover:bg-white/5 rounded text-sm font-medium flex items-center justify-between"
            >
              <span>Work</span>
              <span className="text-xs text-stone-500 font-mono-code">6 Categories</span>
            </button>
            <button
              onClick={() => handleNav('/process')}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:text-white hover:bg-white/5 rounded text-sm font-medium"
            >
              Our Process
            </button>
            <button
              onClick={() => handleNav('/services')}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:text-white hover:bg-white/5 rounded text-sm font-medium"
            >
              All Services
            </button>

            <div className="pl-4 space-y-1 my-2">
              {SERVICES.map((srv) => (
                <button
                  key={srv.slug}
                  onClick={() => handleNav(`/services/${srv.slug}`)}
                  className="w-full text-left px-3 py-1.5 text-xs text-stone-400 hover:text-accent block"
                >
                  {srv.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNav('/about')}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:text-white hover:bg-white/5 rounded text-sm font-medium"
            >
              About Coliseum
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-3 py-2.5 text-stone-200 hover:text-white hover:bg-white/5 rounded text-sm font-medium"
            >
              Contact
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => handleNav('/quote')}
              className="w-full py-3 bg-accent hover:bg-accent-hover active:bg-accent-active border border-accent hover:border-accent-hover active:border-accent-active text-accent-fg font-bold text-xs uppercase tracking-wider rounded text-center shadow-lg transition-all"
            >
              Start Free Quote Request
            </button>
          </div>

          <div className="pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-2 text-[11px] font-mono-code text-stone-400">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>City of Ottawa Licensed Contractor</span>
            </div>
            <button
              type="button"
              onClick={() => handleNav('/privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
          </div>
          </nav>
        </div>
      )}
    </header>
  );
};

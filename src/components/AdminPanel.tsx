import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronRight, Clock, Megaphone, RotateCcw, Settings2, Wrench, X } from 'lucide-react';
import {
  ACCENT_PRESETS,
  BACKGROUND_PRESETS,
  DEFAULT_BACKGROUND_ID,
  isDefaultContact,
  isDefaultHours,
  useTheme,
} from './ThemeContext';
import {
  DEFAULT_ACCENT,
  deriveAccentPalette,
  hexToRgb,
  relativeLuminance,
} from '../theme/accent';
import { isValidEmail, isValidPhone } from '../theme/contact';
import { formatHoursDisplay } from '../theme/hours';
import { ColorPickerModal } from './ColorPickerModal';
import { AnnouncementModal } from './AnnouncementModal';
import { HoursModal } from './HoursModal';
import { useAnnouncement } from './AnnouncementContext';
import { showsMobileStickyCta } from './MobileStickyCTA';

const ADMIN_PANEL_MS = 300;
const SETTINGS_BOX = 'rounded-xl border-2 border-white/15 p-3 space-y-3';
const COLLAPSIBLE_BOX = 'rounded-xl border-2 border-white/15';
const COLLAPSIBLE_TITLE =
  'text-[11px] font-mono-code font-semibold uppercase tracking-wider text-stone-400';
const FIELD_CLASS =
  'w-full rounded-lg border-2 border-white/15 bg-canvas px-2.5 py-2 font-mono-code text-sm text-white outline-none focus:border-accent';
const FIELD_ERROR_CLASS =
  'w-full rounded-lg border-2 border-red-500/80 bg-canvas px-2.5 py-2 font-mono-code text-sm text-white outline-none focus:border-red-400';

const CollapsibleSettingsBox: React.FC<{
  title: string;
  expanded: boolean;
  onExpand: () => void;
  toggleId: string;
  children: React.ReactNode;
}> = ({ title, expanded, onExpand, toggleId, children }) => (
  <section className={COLLAPSIBLE_BOX}>
    <button
      type="button"
      id={toggleId}
      aria-expanded={expanded}
      onClick={() => {
        if (!expanded) onExpand();
      }}
      className={`flex w-full items-center justify-between gap-3 p-3 text-left ${
        expanded ? 'pointer-events-none' : ''
      }`}
    >
      <p className={COLLAPSIBLE_TITLE}>{title}</p>
      <span
        className={`flex shrink-0 items-center justify-end overflow-hidden transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? 'w-0 opacity-0' : 'w-4 opacity-100'
        }`}
        aria-hidden={expanded}
      >
        <ChevronRight className="h-4 w-4 text-accent" />
      </span>
    </button>
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="min-h-0 overflow-hidden" inert={!expanded}>
        <div
          className={`space-y-3 px-3 pb-3 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            expanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  </section>
);

interface AdminPanelProps {
  currentPath: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentPath }) => {
  const {
    palette,
    background,
    contact,
    hours,
    setAccent,
    setBackground,
    setPhone,
    setEmail,
    setHours,
    resetTheme,
  } = useTheme();
  const { announcement, setAnnouncement, clearAnnouncement } = useAnnouncement();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [expandedBox, setExpandedBox] = useState<'contact' | 'hours' | null>(null);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [hoursModalOpen, setHoursModalOpen] = useState(false);
  const [phoneDraft, setPhoneDraft] = useState(contact.phoneFormatted);
  const [emailDraft, setEmailDraft] = useState(contact.email);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    setPhoneDraft(contact.phoneFormatted);
    setPhoneError(null);
  }, [contact.phoneFormatted]);

  useEffect(() => {
    setEmailDraft(contact.email);
    setEmailError(null);
  }, [contact.email]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const enter = window.setTimeout(() => setEntered(true), 10);
      return () => window.clearTimeout(enter);
    }

    setEntered(false);
    const leave = window.setTimeout(() => setMounted(false), ADMIN_PANEL_MS);
    return () => window.clearTimeout(leave);
  }, [open]);

  useEffect(() => {
    if (!mounted) setExpandedBox(null);
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !colorModalOpen && !announcementModalOpen && !hoursModalOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, colorModalOpen, announcementModalOpen, hoursModalOpen]);

  const activePresetId = useMemo(
    () => ACCENT_PRESETS.find((preset) => preset.hex === palette.accent)?.id ?? null,
    [palette.accent]
  );

  const isDefault =
    palette.accent === DEFAULT_ACCENT &&
    background.id === DEFAULT_BACKGROUND_ID &&
    isDefaultContact(contact) &&
    isDefaultHours(hours);

  const liftAboveStickyCta = showsMobileStickyCta(currentPath);

  return (
    <>
    <div
      id="admin-panel-root"
      className={`fixed right-4 z-[60] lg:bottom-6 lg:right-6 ${
        liftAboveStickyCta
          ? 'bottom-[calc(5.25rem+env(safe-area-inset-bottom))]'
          : 'bottom-6'
      }`}
    >
      {mounted && (
        <button
          type="button"
          className={`fixed inset-0 z-[59] cursor-default bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none lg:backdrop-blur-none ${
            entered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close admin panel"
          onClick={() => setOpen(false)}
        />
      )}

      {mounted && (
        <div
          id="admin-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-panel-title"
          className={`absolute bottom-14 right-0 z-[61] w-[calc(100vw-2rem)] origin-bottom-right rounded-2xl border-2 border-white/20 bg-raised p-4 shadow-2xl transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none lg:w-[min(22rem,calc(100vw-2rem))] ${
            entered
              ? 'translate-y-0 scale-100 opacity-100'
              : 'translate-y-2 scale-[0.97] opacity-0'
          }`}
        >
          <div className="mb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
                  Admin
                </p>
                <h2 id="admin-panel-title" className="mt-1 font-display text-lg font-bold text-white">
                  Hi Jonathan
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="hidden shrink-0 rounded-full bg-white/10 p-2 text-stone-300 transition-colors hover:bg-white/20 hover:text-white lg:inline-flex"
                aria-label="Close admin panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              This is a quick-access admin menu demo, we can place anything here. Updates across the
              site are instant.
            </p>
          </div>

          <div className="space-y-3">
            <section className={SETTINGS_BOX}>
              <p className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-stone-400">
                Accent
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ACCENT_PRESETS.map((preset) => {
                  const selected = activePresetId === preset.id;
                  const light = relativeLuminance(hexToRgb(preset.hex)) > 0.72;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      title={preset.label}
                      aria-label={preset.label}
                      aria-pressed={selected}
                      onClick={() => setAccent(preset.hex)}
                      className={`relative h-7 w-7 rounded-full border-2 transition-transform ${
                        selected
                          ? 'scale-110 border-white'
                          : light
                            ? 'border-white/45 hover:scale-105 hover:border-white/70'
                            : 'border-white/20 hover:scale-105 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    >
                      {selected && (
                        <Check
                          className="absolute inset-0 m-auto h-3.5 w-3.5"
                          style={{ color: deriveAccentPalette(preset.hex).fg }}
                        />
                      )}
                    </button>
                  );
                })}
                <button
                  type="button"
                  title="Custom color"
                  aria-label="Pick a custom accent color"
                  aria-pressed={!activePresetId}
                  onClick={() => setColorModalOpen(true)}
                  className={`relative h-7 w-7 rounded-full border-2 bg-stone-400 transition-transform ${
                    activePresetId
                      ? 'border-white/20 hover:scale-105 hover:border-white/50'
                      : 'scale-110 border-white'
                  }`}
                >
                  <Wrench className="absolute inset-0 m-auto h-3 w-3 text-canvas" />
                </button>
              </div>

              <p className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-stone-400">
                Background
              </p>
              <div className="flex flex-wrap gap-1.5">
                {BACKGROUND_PRESETS.map((preset) => {
                  const selected = background.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      title={preset.label}
                      aria-label={preset.label}
                      aria-pressed={selected}
                      onClick={() => setBackground(preset.id)}
                      className={`relative h-7 w-7 rounded-full border-2 transition-transform ${
                        selected
                          ? 'scale-110 border-white'
                          : 'border-white/25 hover:scale-105 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    >
                      {selected && <Check className="absolute inset-0 m-auto h-3.5 w-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </section>

            <CollapsibleSettingsBox
              title="Public contact information"
              expanded={expandedBox === 'contact'}
              onExpand={() => setExpandedBox('contact')}
              toggleId="admin-contact-toggle"
            >
              <label className="block space-y-1.5">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
                  Phone
                </span>
                <input
                  id="admin-contact-phone"
                  value={phoneDraft}
                  inputMode="tel"
                  autoComplete="tel"
                  aria-label="Site phone number"
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? 'admin-contact-phone-error' : undefined}
                  onChange={(event) => {
                    const next = event.target.value;
                    setPhoneDraft(next);
                    if (isValidPhone(next)) {
                      setPhone(next);
                      setPhoneError(null);
                    }
                  }}
                  onBlur={() => {
                    if (isValidPhone(phoneDraft)) {
                      setPhone(phoneDraft);
                      setPhoneError(null);
                    } else {
                      setPhoneError('Enter a 10-digit phone number');
                    }
                  }}
                  className={phoneError ? FIELD_ERROR_CLASS : FIELD_CLASS}
                />
                {phoneError && (
                  <p id="admin-contact-phone-error" className="text-[11px] text-red-400">
                    {phoneError}
                  </p>
                )}
              </label>
              <label className="block space-y-1.5">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
                  Email
                </span>
                <input
                  id="admin-contact-email"
                  value={emailDraft}
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  aria-label="Site contact email"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'admin-contact-email-error' : undefined}
                  onChange={(event) => {
                    const next = event.target.value;
                    setEmailDraft(next);
                    if (isValidEmail(next)) {
                      setEmail(next);
                      setEmailError(null);
                    }
                  }}
                  onBlur={() => {
                    if (isValidEmail(emailDraft)) {
                      setEmail(emailDraft);
                      setEmailError(null);
                    } else {
                      setEmailError('Enter a valid email');
                    }
                  }}
                  className={emailError ? FIELD_ERROR_CLASS : FIELD_CLASS}
                />
                {emailError && (
                  <p id="admin-contact-email-error" className="text-[11px] text-red-400">
                    {emailError}
                  </p>
                )}
              </label>
            </CollapsibleSettingsBox>

            <CollapsibleSettingsBox
              title="Hours"
              expanded={expandedBox === 'hours'}
              onExpand={() => setExpandedBox('hours')}
              toggleId="admin-hours-toggle"
            >
              <p className="text-xs leading-relaxed text-stone-300">
                {formatHoursDisplay(hours)}
              </p>
              <button
                type="button"
                id="admin-hours-edit-btn"
                onClick={() => setHoursModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white/15 bg-white/5 px-3 py-2 font-mono-code text-[11px] uppercase tracking-wider text-stone-300 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <Clock className="h-3.5 w-3.5 text-accent" />
                Edit hours
              </button>
            </CollapsibleSettingsBox>

            <button
              type="button"
              id="admin-announcement-btn"
              onClick={() => setAnnouncementModalOpen(true)}
              className="flex w-full items-center gap-2.5 rounded-lg border-2 border-white/15 bg-white/5 px-3 py-2.5 text-left transition-colors hover:border-white/25 hover:bg-white/10"
            >
              <Megaphone className="h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0 flex-1">
                <span className="block font-mono-code text-[11px] font-semibold uppercase tracking-wider text-white">
                  Announcement
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-stone-400">
                  {announcement
                    ? announcement.message
                    : 'Show a notice across the site'}
                </span>
              </span>
              {announcement ? (
                <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono-code text-[10px] uppercase tracking-wider text-emerald-400">
                  Live
                </span>
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-stone-500" />
              )}
            </button>

            <button
              type="button"
              onClick={resetTheme}
              disabled={isDefault}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white/15 bg-white/5 px-3 py-2 font-mono-code text-[11px] uppercase tracking-wider text-stone-300 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset defaults
            </button>
          </div>
        </div>
      )}

      <button
        id="admin-panel-toggle"
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`relative z-[61] flex h-12 items-center justify-center rounded-full border-2 border-white/20 bg-raised text-accent shadow-2xl transition-all hover:border-accent hover:bg-elevated active:scale-95 ${
          open ? 'gap-1.5 px-4 lg:w-12 lg:gap-0 lg:px-0' : 'w-12'
        }`}
        aria-label={open ? 'Close admin panel' : 'Open admin panel'}
        aria-expanded={open}
        aria-controls="admin-panel"
      >
        {open ? (
          <>
            <Check className="h-5 w-5 lg:hidden" />
            <span className="font-mono-code text-xs font-semibold uppercase tracking-wider lg:hidden">
              Done
            </span>
            <Settings2 className="hidden h-5 w-5 lg:block" />
          </>
        ) : (
          <Settings2 className="h-5 w-5" />
        )}
      </button>
    </div>

    {colorModalOpen && (
      <ColorPickerModal
        value={palette.accent}
        onChange={setAccent}
        onClose={() => setColorModalOpen(false)}
      />
    )}

    {announcementModalOpen && (
      <AnnouncementModal
        initial={announcement}
        onSave={(next) => {
          setAnnouncement(next);
          if (window.matchMedia('(max-width: 1023px)').matches) setOpen(false);
        }}
        onRemove={announcement ? clearAnnouncement : undefined}
        onClose={() => setAnnouncementModalOpen(false)}
      />
    )}

    {hoursModalOpen && (
      <HoursModal
        initial={hours}
        onSave={setHours}
        onClose={() => setHoursModalOpen(false)}
      />
    )}
    </>
  );
};

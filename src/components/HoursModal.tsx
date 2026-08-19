import React, { useEffect, useId, useState } from 'react';
import { Check, Clock, X } from 'lucide-react';
import {
  HOURS_NOTE_MAX,
  WEEKDAYS,
  formatHoursDisplay,
  normalizeHours,
  type DayHours,
  type HoursInfo,
  type WeekdayId,
} from '../theme/hours';
import { TimeSelect } from './TimeSelect';

const FIELD_CLASS =
  'w-full rounded-lg border-2 border-white/15 bg-canvas px-2.5 py-2 font-mono-code text-sm text-white outline-none focus:border-accent';

interface HoursModalProps {
  initial: HoursInfo;
  onSave: (hours: HoursInfo) => void;
  onClose: () => void;
}

export const HoursModal: React.FC<HoursModalProps> = ({ initial, onSave, onClose }) => {
  const titleId = useId();
  const [draft, setDraft] = useState<HoursInfo>(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const updateDay = (id: WeekdayId, patch: Partial<DayHours>) => {
    setDraft((current) => ({
      ...current,
      days: {
        ...current.days,
        [id]: { ...current.days[id], ...patch },
      },
    }));
    setError(null);
  };

  const handleSave = () => {
    const next = normalizeHours(draft);
    if (!next) {
      setError('Set an opening time that is earlier than closing on every open day');
      return;
    }
    onSave(next);
    onClose();
  };

  const preview = formatHoursDisplay(draft);

  return (
    <div
      id="hours-modal"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="relative w-full min-h-0 max-h-full max-w-2xl space-y-5 overflow-y-auto rounded-2xl border-2 border-white/20 bg-raised p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-white/10 p-2 text-stone-300 transition-colors hover:bg-white/20 hover:text-white active:bg-white/25"
          aria-label="Close hours editor"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/10">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
              Admin
            </p>
            <h2 id={titleId} className="font-display text-lg font-bold text-white">
              Edit hours
            </h2>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <p className="text-xs leading-relaxed text-stone-400">
            These hours appear on the contact page, in the footer, and in search listings.
          </p>

          <div className="space-y-1.5">
            {WEEKDAYS.map((weekday) => {
              const day = draft.days[weekday.id];
              return (
                <div
                  key={weekday.id}
                  className="flex flex-col gap-2 rounded-lg border border-white/10 px-3 py-2 sm:flex-row sm:items-center sm:gap-3"
                >
                  <div className="flex items-center justify-between gap-2 sm:justify-start">
                    <span className="w-[5.5rem] shrink-0 font-mono-code text-[11px] uppercase tracking-wider text-stone-300">
                      {weekday.label}
                    </span>
                    <label
                      className={`group flex shrink-0 cursor-pointer select-none items-center gap-2 text-[11px] font-mono-code transition-colors ${
                        day.closed ? 'text-stone-200' : 'text-stone-400 hover:text-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={day.closed}
                        onChange={(event) => updateDay(weekday.id, { closed: event.target.checked })}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                          day.closed
                            ? 'border-accent bg-accent'
                            : 'border-white/20 bg-canvas group-hover:border-white/40'
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 text-accent-fg transition-opacity ${
                            day.closed ? 'opacity-100' : 'opacity-0'
                          }`}
                          strokeWidth={3}
                        />
                      </span>
                      Closed
                    </label>
                  </div>
                  <div className="flex min-w-0 items-center gap-1.5 sm:ml-auto">
                    <TimeSelect
                      value={day.open}
                      disabled={day.closed}
                      ariaLabel={`${weekday.label} opens`}
                      onChange={(next) => updateDay(weekday.id, { open: next })}
                    />
                    <span className="text-[11px] text-stone-500">–</span>
                    <TimeSelect
                      value={day.close}
                      disabled={day.closed}
                      ariaLabel={`${weekday.label} closes`}
                      onChange={(next) => updateDay(weekday.id, { close: next })}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <label className="block space-y-1.5">
            <span className="flex items-center justify-between text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
              Note <span className="normal-case tracking-normal text-stone-600">(optional)</span>
              <span className="normal-case tracking-normal text-stone-600">
                {draft.note.trim().length}/{HOURS_NOTE_MAX}
              </span>
            </span>
            <input
              id="hours-note"
              value={draft.note}
              maxLength={HOURS_NOTE_MAX}
              placeholder="Seasonal Operations"
              onChange={(event) => {
                setDraft((current) => ({ ...current, note: event.target.value }));
                setError(null);
              }}
              className={FIELD_CLASS}
            />
          </label>

          <div className="hidden space-y-1.5 sm:block">
            <p className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
              Preview
            </p>
            <p className="rounded-xl border-2 border-white/10 bg-white/5 px-3 py-2.5 text-sm leading-relaxed text-stone-200">
              {preview}
            </p>
          </div>

          {error && <p className="text-[11px] text-red-400">{error}</p>}

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-mono-code text-xs font-bold uppercase tracking-wider text-accent-fg transition-colors hover:bg-accent-hover active:bg-accent-active"
          >
            Save hours
          </button>
        </form>
      </div>
    </div>
  );
};

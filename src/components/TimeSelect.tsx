import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Clock } from 'lucide-react';
import { formatTime12 } from '../theme/hours';

const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTES = [0, 15, 30, 45];
const PERIODS = ['AM', 'PM'] as const;

function parseParts(hhmm: string): { hour12: number; minute: number; period: 'AM' | 'PM' } {
  const [hourStr, minuteStr] = hhmm.split(':');
  const hour24 = Number(hourStr) || 0;
  const minute = Number(minuteStr) || 0;
  return {
    hour12: hour24 % 12 || 12,
    minute,
    period: hour24 >= 12 ? 'PM' : 'AM',
  };
}

function toHhmm(hour12: number, minute: number, period: 'AM' | 'PM'): string {
  let hour24 = hour12 % 12;
  if (period === 'PM') hour24 += 12;
  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

interface TimeSelectProps {
  value: string;
  disabled?: boolean;
  ariaLabel: string;
  onChange: (next: string) => void;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({
  value,
  disabled = false,
  ariaLabel,
  onChange,
}) => {
  const listId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const parts = parseParts(value);
  const minuteOptions = MINUTES.includes(parts.minute)
    ? MINUTES
    : [...MINUTES, parts.minute].sort((a, b) => a - b);

  const updateCoords = () => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const menuWidth = Math.max(rect.width, 220);
    const menuHeight = menuRef.current?.offsetHeight ?? 220;
    const left = Math.min(rect.left, window.innerWidth - menuWidth - 16);
    const openUp = window.innerHeight - rect.bottom < menuHeight + 12 && rect.top > menuHeight + 12;
    setCoords({
      top: openUp ? rect.top - menuHeight - 6 : rect.bottom + 6,
      left: Math.max(16, left),
      width: menuWidth,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateCoords();
    menuRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    updateCoords();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      setOpen(false);
    };
    const onReposition = () => updateCoords();
    document.addEventListener('mousedown', close);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [open]);

  const commit = (next: { hour12?: number; minute?: number; period?: 'AM' | 'PM' }) => {
    onChange(
      toHhmm(next.hour12 ?? parts.hour12, next.minute ?? parts.minute, next.period ?? parts.period)
    );
  };

  const columnClass = 'max-h-48 overflow-y-auto py-0.5';
  const optionClass = (selected: boolean) =>
    `flex w-full items-center justify-center rounded px-2 py-1.5 font-mono-code text-xs transition-colors ${
      selected ? 'bg-accent/15 text-accent' : 'text-stone-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="relative min-w-0 flex-1">
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => {
          if (disabled) return;
          if (open) {
            setOpen(false);
            return;
          }
          const rect = buttonRef.current?.getBoundingClientRect();
          if (rect) {
            setCoords({
              top: rect.bottom + 6,
              left: rect.left,
              width: Math.max(rect.width, 220),
            });
          }
          setOpen(true);
        }}
        className={`flex w-full min-w-[7.25rem] items-center justify-between gap-2 rounded-lg border-2 bg-canvas px-2 py-1.5 font-mono-code text-xs text-white outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
          open ? 'border-accent' : 'border-white/15 hover:border-white/30'
        }`}
      >
        <span>{formatTime12(value)}</span>
        <Clock className="h-3.5 w-3.5 shrink-0 text-accent" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-label={ariaLabel}
            style={{ top: coords.top, left: coords.left, width: coords.width }}
            className="fixed z-[100] grid grid-cols-3 gap-1 rounded-lg border-2 border-white/15 bg-elevated p-1.5 shadow-2xl"
          >
            <div className={columnClass} role="presentation">
              {HOURS_12.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  role="option"
                  aria-selected={parts.hour12 === hour}
                  onClick={() => commit({ hour12: hour })}
                  className={optionClass(parts.hour12 === hour)}
                >
                  {hour}
                </button>
              ))}
            </div>
            <div className={columnClass} role="presentation">
              {minuteOptions.map((minute) => (
                <button
                  key={minute}
                  type="button"
                  role="option"
                  aria-selected={parts.minute === minute}
                  onClick={() => commit({ minute })}
                  className={optionClass(parts.minute === minute)}
                >
                  {String(minute).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className={columnClass} role="presentation">
              {PERIODS.map((period) => (
                <button
                  key={period}
                  type="button"
                  role="option"
                  aria-selected={parts.period === period}
                  onClick={() => commit({ period })}
                  className={optionClass(parts.period === period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

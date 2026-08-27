import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const FIELD_CLASS =
  'w-full bg-canvas border-2 border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent';

export const FIELD_LABEL_CLASS =
  'text-xs font-mono-code uppercase tracking-wider text-stone-300 block mb-1.5';

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  value,
  onChange,
  options,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={ariaLabelledBy}
        onClick={() => setOpen((current) => !current)}
        className={`${FIELD_CLASS} text-left flex items-center justify-between gap-3 pr-3 focus-visible:outline-none ${
          open ? 'border-accent' : ''
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-accent transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-30 top-full left-0 right-0 mt-1.5 bg-elevated border-2 border-white/15 rounded-lg shadow-2xl p-1.5"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-sm transition-colors flex items-center justify-between gap-2 ${
                  selected
                    ? 'bg-accent/10 text-accent'
                    : 'text-stone-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{option}</span>
                {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

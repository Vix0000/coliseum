import React, { useEffect, useRef, useState } from 'react';
import { Pipette, X } from 'lucide-react';
import { hexToHsv, hsvToHex, normalizeHex } from '../theme/accent';

interface ColorPickerModalProps {
  value: string;
  onChange: (hex: string) => void;
  onClose: () => void;
}

const HUE_GRADIENT =
  'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const initial = hexToHsv(normalizeHex(value) ?? value);
  const [hsv, setHsv] = useState(initial);
  const [hexDraft, setHexDraft] = useState((normalizeHex(value) ?? value).replace('#', ''));
  const hsvRef = useRef(hsv);
  hsvRef.current = hsv;

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

  const commitHsv = (next: { h: number; s: number; v: number }) => {
    setHsv(next);
    const hex = hsvToHex(next.h, next.s, next.v);
    setHexDraft(hex.replace('#', ''));
    onChange(hex);
  };

  const commitHex = (raw: string) => {
    const normalized = normalizeHex(raw);
    if (!normalized) return;
    const next = hexToHsv(normalized);
    setHsv((prev) => ({
      h: next.s === 0 ? prev.h : next.h,
      s: next.s,
      v: next.v,
    }));
    setHexDraft(normalized.replace('#', ''));
    onChange(normalized);
  };

  return (
    <div
      id="color-picker-modal"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="color-picker-modal-title"
    >
      <div
        className="relative w-full max-w-sm space-y-5 rounded-2xl border-2 border-white/20 bg-raised p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-white/10 p-2 text-stone-300 transition-colors hover:bg-white/20 hover:text-white active:bg-white/25"
          aria-label="Close color picker"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/10">
            <Pipette className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
              Accent
            </p>
            <h2 id="color-picker-modal-title" className="font-display text-lg font-bold text-white">
              Custom color
            </h2>
          </div>
        </div>

        <SaturationValuePad
          hue={hsv.h}
          saturation={hsv.s}
          value={hsv.v}
          onChange={(s, v) => commitHsv({ ...hsvRef.current, s, v })}
        />

        <HueSlider
          hue={hsv.h}
          onChange={(h) => commitHsv({ ...hsvRef.current, h })}
        />

        <div className="flex items-center gap-2">
          <div
            className="h-10 w-10 shrink-0 rounded-lg border-2 border-white/15"
            style={{ backgroundColor: hsvToHex(hsv.h, hsv.s, hsv.v) }}
            aria-hidden
          />
          <label className="flex min-w-0 flex-1 items-center rounded-lg border-2 border-white/15 bg-canvas px-2.5 font-mono-code text-sm text-white focus-within:border-accent">
            <span className="text-stone-500">#</span>
            <input
              id="color-picker-hex"
              value={hexDraft}
              maxLength={6}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Custom accent hex color"
              onChange={(event) => {
                const next = event.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
                setHexDraft(next);
                if (next.length === 6) commitHex(next);
              }}
              onBlur={() => {
                const normalized = normalizeHex(hexDraft);
                if (normalized) commitHex(normalized);
                else setHexDraft(hsvToHex(hsv.h, hsv.s, hsv.v).replace('#', ''));
              }}
              className="w-full bg-transparent py-2 pl-0.5 uppercase tracking-wider outline-none"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-mono-code text-xs font-bold uppercase tracking-wider text-accent-fg transition-colors hover:bg-accent-hover active:bg-accent-active"
        >
          Done
        </button>
      </div>
    </div>
  );
};

const SaturationValuePad: React.FC<{
  hue: number;
  saturation: number;
  value: number;
  onChange: (s: number, v: number) => void;
}> = ({ hue, saturation, value, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hueColor = hsvToHex(hue, 1, 1);

  const updateFromPointer = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const s = clamp01((clientX - rect.left) / rect.width);
    const v = clamp01(1 - (clientY - rect.top) / rect.height);
    onChange(s, v);
  };

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Saturation and brightness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(saturation * 100)}
      tabIndex={0}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        updateFromPointer(event.clientX, event.clientY);
      }}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 0.08 : 0.02;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          onChange(clamp01(saturation - step), value);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          onChange(clamp01(saturation + step), value);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          onChange(saturation, clamp01(value - step));
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          onChange(saturation, clamp01(value + step));
        }
      }}
      className="relative h-44 w-full cursor-crosshair touch-none overflow-hidden rounded-xl border-2 border-white/15 select-none"
      style={{
        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
      }}
    >
      <span
        className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
        style={{ left: `${saturation * 100}%`, top: `${(1 - value) * 100}%` }}
      />
    </div>
  );
};

const HueSlider: React.FC<{
  hue: number;
  onChange: (h: number) => void;
}> = ({ hue, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  const updateFromPointer = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    onChange(clamp01((clientX - rect.left) / rect.width) * 360);
  };

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Hue"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(hue)}
      tabIndex={0}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event.clientX);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        updateFromPointer(event.clientX);
      }}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 12 : 3;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          event.preventDefault();
          onChange((hue - step + 360) % 360);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          event.preventDefault();
          onChange((hue + step) % 360);
        }
      }}
      className="relative h-4 w-full cursor-ew-resize touch-none rounded-full border-2 border-white/15 select-none"
      style={{ background: HUE_GRADIENT }}
    >
      <span
        className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
        style={{ left: `${(hue / 360) * 100}%`, backgroundColor: hsvToHex(hue, 1, 1) }}
      />
    </div>
  );
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

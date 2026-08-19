export const THEME_STORAGE_KEY = 'coliseum-theme';
export const ACCENT_STORAGE_KEY = THEME_STORAGE_KEY;
export const DEFAULT_ACCENT = '#E0A84D';
export const TEXT_ACCENT = '#F3F4F6';

export interface AccentPalette {
  accent: string;
  hover: string;
  active: string;
  fg: string;
}

export interface AccentPreset {
  id: string;
  label: string;
  hex: string;
}

export const DEFAULT_PALETTE: AccentPalette = {
  accent: DEFAULT_ACCENT,
  hover: '#E8B868',
  active: '#D99B38',
  fg: '#121417',
};

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: 'gold', label: 'Coliseum Gold', hex: DEFAULT_ACCENT },
  { id: 'sage', label: 'Sage', hex: '#7A9E7E' },
  { id: 'steel', label: 'Steel', hex: '#6B8CAE' },
  { id: 'terracotta', label: 'Terracotta', hex: '#C45C3E' },
  { id: 'purple', label: 'Purple', hex: '#9B6EDC' },
  { id: 'red', label: 'Red', hex: '#D44A4A' },
  { id: 'white', label: 'White', hex: TEXT_ACCENT },
];

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function normalizeHex(input: string): string | null {
  const match = input.trim().match(HEX_RE);
  if (!match) return null;
  let value = match[1].toLowerCase();
  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }
  return `#${value.toUpperCase()}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const to = (channel: number) =>
    Math.round(Math.max(0, Math.min(255, channel)))
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const { r, g, b } = hexToRgb(hex);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
        break;
      case g1:
        h = (b1 - r1) / d + 2;
        break;
      default:
        h = (r1 - g1) / d + 4;
    }
    h /= 6;
  }
  return { h: h * 360, s: max === 0 ? 0 : d / max, v: max };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const hue = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return { h, s, l };
}

function hslToRgb({ h, s, l }: { h: number; s: number; l: number }) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) {
    const channel = l * 255;
    return { r: channel, g: channel, b: channel };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h) * 255,
    b: hue2rgb(p, q, h - 1 / 3) * 255,
  };
}

export function mixHex(from: string, to: string, amount: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount
  );
}

export function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const linearize = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function adjustLightness(hex: string, delta: number): string {
  const hsl = rgbToHsl(hexToRgb(hex));
  const rgb = hslToRgb({
    ...hsl,
    l: Math.max(0.08, Math.min(0.92, hsl.l + delta)),
  });
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export const WHITE_PALETTE: AccentPalette = {
  accent: TEXT_ACCENT,
  hover: '#E0E1E3',
  active: '#D0D2D4',
  fg: '#121417',
};

export function deriveAccentPalette(input: string): AccentPalette {
  const accent = normalizeHex(input) ?? DEFAULT_ACCENT;
  if (accent === DEFAULT_ACCENT) return { ...DEFAULT_PALETTE };
  if (accent === TEXT_ACCENT) return { ...WHITE_PALETTE };

  const rgb = hexToRgb(accent);
  const luminance = relativeLuminance(rgb);
  if (luminance > 0.8) {
    return {
      accent,
      hover: mixHex(accent, '#000000', 0.08),
      active: mixHex(accent, '#000000', 0.16),
      fg: '#121417',
    };
  }

  return {
    accent,
    hover: adjustLightness(accent, 0.07),
    active: adjustLightness(accent, -0.06),
    fg: luminance > 0.42 ? '#121417' : '#FFFFFF',
  };
}

export function applyAccentPalette(palette: AccentPalette) {
  const root = document.documentElement.style;
  root.setProperty('--accent', palette.accent);
  root.setProperty('--accent-hover', palette.hover);
  root.setProperty('--accent-active', palette.active);
  root.setProperty('--accent-fg', palette.fg);
}

export function readStoredPalette(): AccentPalette | null {
  try {
    const raw = localStorage.getItem(ACCENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AccentPalette>;
    const accent = parsed.accent ? normalizeHex(parsed.accent) : null;
    if (!accent) return null;
    return deriveAccentPalette(accent);
  } catch {
    return null;
  }
}

export function persistAccentPalette(palette: AccentPalette) {
  localStorage.setItem(ACCENT_STORAGE_KEY, JSON.stringify(palette));
}

export function clearStoredPalette() {
  localStorage.removeItem(ACCENT_STORAGE_KEY);
}

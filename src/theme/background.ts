import { mixHex, THEME_STORAGE_KEY } from './accent';

export interface BackgroundPalette {
  id: string;
  canvas: string;
  deep: string;
  raised: string;
  surface: string;
  elevated: string;
}

export interface BackgroundPreset {
  id: string;
  label: string;
  hex: string;
}

export const DEFAULT_BACKGROUND_ID = 'charcoal';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  { id: 'charcoal', label: 'Charcoal', hex: '#121417' },
  { id: 'ink', label: 'Ink', hex: '#0A0B0D' },
  { id: 'navy', label: 'Navy', hex: '#0D1520' },
  { id: 'forest', label: 'Forest', hex: '#101510' },
  { id: 'espresso', label: 'Espresso', hex: '#16110E' },
  { id: 'graphite', label: 'Graphite', hex: '#1B1E25' },
];

export const DEFAULT_BACKGROUND: BackgroundPalette = {
  id: DEFAULT_BACKGROUND_ID,
  canvas: '#121417',
  deep: '#101216',
  raised: '#14171D',
  surface: '#171A21',
  elevated: '#1C2027',
};

export function deriveBackgroundPalette(id: string): BackgroundPalette {
  const preset = BACKGROUND_PRESETS.find((item) => item.id === id) ?? BACKGROUND_PRESETS[0];
  if (preset.id === DEFAULT_BACKGROUND_ID) return { ...DEFAULT_BACKGROUND };

  return {
    id: preset.id,
    canvas: preset.hex,
    deep: mixHex(preset.hex, '#000000', 0.18),
    raised: mixHex(preset.hex, '#FFFFFF', 0.035),
    surface: mixHex(preset.hex, '#FFFFFF', 0.07),
    elevated: mixHex(preset.hex, '#FFFFFF', 0.11),
  };
}

export function applyBackgroundPalette(palette: BackgroundPalette) {
  const root = document.documentElement.style;
  root.setProperty('--canvas', palette.canvas);
  root.setProperty('--canvas-deep', palette.deep);
  root.setProperty('--raised', palette.raised);
  root.setProperty('--surface', palette.surface);
  root.setProperty('--elevated', palette.elevated);
}

export function readStoredBackground(): BackgroundPalette | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { backgroundId?: string };
    if (!parsed.backgroundId) return null;
    return deriveBackgroundPalette(parsed.backgroundId);
  } catch {
    return null;
  }
}

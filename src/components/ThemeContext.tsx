import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import {
  ACCENT_PRESETS,
  THEME_STORAGE_KEY,
  applyAccentPalette,
  clearStoredPalette,
  DEFAULT_PALETTE,
  deriveAccentPalette,
  readStoredPalette,
  type AccentPalette,
} from '../theme/accent';
import {
  applyBackgroundPalette,
  BACKGROUND_PRESETS,
  DEFAULT_BACKGROUND,
  DEFAULT_BACKGROUND_ID,
  deriveBackgroundPalette,
  readStoredBackground,
  type BackgroundPalette,
} from '../theme/background';
import {
  DEFAULT_CONTACT,
  isDefaultContact,
  parseEmail,
  parsePhone,
  type ContactInfo,
} from '../theme/contact';
import {
  DEFAULT_HOURS,
  formatHoursDisplay,
  formatOpeningHoursSchema,
  isDefaultHours,
  parseStoredHours,
  type HoursInfo,
} from '../theme/hours';

interface ThemeState {
  palette: AccentPalette;
  background: BackgroundPalette;
  contact: ContactInfo;
  hours: HoursInfo;
}

interface ThemeContextValue extends ThemeState {
  setAccent: (hex: string) => void;
  setBackground: (id: string) => void;
  setPhone: (raw: string) => void;
  setEmail: (raw: string) => void;
  setHours: (hours: HoursInfo) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredRaw(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function readStoredContact(): ContactInfo | null {
  const stored = readStoredRaw();
  const phone = typeof stored.phone === 'string' ? stored.phone : null;
  const email = typeof stored.email === 'string' ? stored.email : null;
  if (!phone && !email) return null;
  return {
    ...DEFAULT_CONTACT,
    ...(phone ? parsePhone(phone) : {}),
    ...(email ? parseEmail(email) : {}),
  };
}

function persistTheme(
  palette: AccentPalette,
  background: BackgroundPalette,
  contact: ContactInfo,
  hours: HoursInfo
) {
  const current = readStoredRaw();
  localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify({
      ...current,
      ...palette,
      backgroundId: background.id,
      canvas: background.canvas,
      canvasDeep: background.deep,
      raised: background.raised,
      surface: background.surface,
      elevated: background.elevated,
      phone: contact.phone,
      email: contact.email,
      hours,
    })
  );
}

const initialTheme = (): ThemeState => {
  if (typeof window === 'undefined') {
    return {
      palette: DEFAULT_PALETTE,
      background: DEFAULT_BACKGROUND,
      contact: DEFAULT_CONTACT,
      hours: DEFAULT_HOURS,
    };
  }
  const stored = readStoredRaw();
  const palette = readStoredPalette() ?? DEFAULT_PALETTE;
  const background = readStoredBackground() ?? DEFAULT_BACKGROUND;
  const contact = readStoredContact() ?? DEFAULT_CONTACT;
  const hours = parseStoredHours(stored.hours) ?? DEFAULT_HOURS;
  applyAccentPalette(palette);
  applyBackgroundPalette(background);
  return { palette, background, contact, hours };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ palette, background, contact, hours }, setTheme] = useState(initialTheme);

  const setAccent = useCallback((hex: string) => {
    const nextPalette = deriveAccentPalette(hex);
    applyAccentPalette(nextPalette);
    setTheme((current) => {
      persistTheme(nextPalette, current.background, current.contact, current.hours);
      return { ...current, palette: nextPalette };
    });
  }, []);

  const setBackground = useCallback((id: string) => {
    const nextBackground = deriveBackgroundPalette(id);
    applyBackgroundPalette(nextBackground);
    setTheme((current) => {
      persistTheme(current.palette, nextBackground, current.contact, current.hours);
      return { ...current, background: nextBackground };
    });
  }, []);

  const setPhone = useCallback((raw: string) => {
    const parsed = parsePhone(raw);
    setTheme((current) => {
      const nextContact = { ...current.contact, ...parsed };
      persistTheme(current.palette, current.background, nextContact, current.hours);
      return { ...current, contact: nextContact };
    });
  }, []);

  const setEmail = useCallback((raw: string) => {
    const parsed = parseEmail(raw);
    setTheme((current) => {
      const nextContact = { ...current.contact, ...parsed };
      persistTheme(current.palette, current.background, nextContact, current.hours);
      return { ...current, contact: nextContact };
    });
  }, []);

  const setHours = useCallback((nextHours: HoursInfo) => {
    setTheme((current) => {
      persistTheme(current.palette, current.background, current.contact, nextHours);
      return { ...current, hours: nextHours };
    });
  }, []);

  const resetTheme = useCallback(() => {
    applyAccentPalette(DEFAULT_PALETTE);
    applyBackgroundPalette(DEFAULT_BACKGROUND);
    clearStoredPalette();
    setTheme({
      palette: DEFAULT_PALETTE,
      background: DEFAULT_BACKGROUND,
      contact: DEFAULT_CONTACT,
      hours: DEFAULT_HOURS,
    });
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const useCompany = () => {
  const { contact, hours } = useTheme();
  return useMemo(
    () => ({
      ...COMPANY_INFO,
      phone: contact.phone,
      phoneFormatted: contact.phoneFormatted,
      phoneHref: contact.phoneHref,
      email: contact.email,
      emailHref: contact.emailHref,
      workingHours: formatHoursDisplay(hours),
      openingHours: formatOpeningHoursSchema(hours),
    }),
    [contact, hours]
  );
};

export { ACCENT_PRESETS, BACKGROUND_PRESETS, DEFAULT_BACKGROUND_ID, isDefaultContact, isDefaultHours };

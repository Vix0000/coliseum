export const WEEKDAYS = [
  { id: 'monday', label: 'Monday', short: 'Mo' },
  { id: 'tuesday', label: 'Tuesday', short: 'Tu' },
  { id: 'wednesday', label: 'Wednesday', short: 'We' },
  { id: 'thursday', label: 'Thursday', short: 'Th' },
  { id: 'friday', label: 'Friday', short: 'Fr' },
  { id: 'saturday', label: 'Saturday', short: 'Sa' },
  { id: 'sunday', label: 'Sunday', short: 'Su' },
] as const;

export type WeekdayId = (typeof WEEKDAYS)[number]['id'];

export interface DayHours {
  closed: boolean;
  open: string;
  close: string;
}

export interface HoursInfo {
  days: Record<WeekdayId, DayHours>;
  note: string;
}

export const HOURS_NOTE_MAX = 48;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const OPEN_DAY: DayHours = { closed: false, open: '07:00', close: '18:30' };
const CLOSED_DAY: DayHours = { closed: true, open: '07:00', close: '18:30' };

export const DEFAULT_HOURS: HoursInfo = {
  days: {
    monday: { ...OPEN_DAY },
    tuesday: { ...OPEN_DAY },
    wednesday: { ...OPEN_DAY },
    thursday: { ...OPEN_DAY },
    friday: { ...OPEN_DAY },
    saturday: { ...OPEN_DAY },
    sunday: { ...CLOSED_DAY },
  },
  note: 'Seasonal Operations',
};

export function isValidTime(value: string): boolean {
  return TIME_RE.test(value);
}

function cloneHours(hours: HoursInfo): HoursInfo {
  return {
    note: hours.note,
    days: WEEKDAYS.reduce(
      (days, day) => {
        days[day.id] = { ...hours.days[day.id] };
        return days;
      },
      {} as Record<WeekdayId, DayHours>
    ),
  };
}

function parseDayHours(raw: unknown, fallback: DayHours): DayHours {
  if (!raw || typeof raw !== 'object') return { ...fallback };
  const record = raw as Record<string, unknown>;
  const open = typeof record.open === 'string' && isValidTime(record.open) ? record.open : fallback.open;
  const close =
    typeof record.close === 'string' && isValidTime(record.close) ? record.close : fallback.close;
  return {
    closed: Boolean(record.closed),
    open,
    close,
  };
}

export function parseStoredHours(raw: unknown): HoursInfo | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as Record<string, unknown>;
  const daysRaw = record.days;
  if (!daysRaw || typeof daysRaw !== 'object') return null;

  const days = WEEKDAYS.reduce(
    (days, day) => {
      days[day.id] = parseDayHours(
        (daysRaw as Record<string, unknown>)[day.id],
        DEFAULT_HOURS.days[day.id]
      );
      return days;
    },
    {} as Record<WeekdayId, DayHours>
  );

  const note = typeof record.note === 'string' ? record.note.trim().slice(0, HOURS_NOTE_MAX) : '';
  return { days, note };
}

function sameDayHours(a: DayHours, b: DayHours): boolean {
  if (a.closed && b.closed) return true;
  return !a.closed && !b.closed && a.open === b.open && a.close === b.close;
}

export function formatTime12(hhmm: string): string {
  const [hourStr, minuteStr] = hhmm.split(':');
  const hour24 = Number(hourStr);
  const minute = Number(minuteStr);
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  return minute === 0 ? `${hour12}:00 ${suffix}` : `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
}

function dayRangeLabel(start: number, end: number, short: boolean): string {
  const from = WEEKDAYS[start];
  const to = WEEKDAYS[end];
  if (start === end) return short ? from.short : from.label;
  const left = short ? from.short : from.label;
  const right = short ? to.short : to.label;
  return `${left} – ${right}`;
}

export function formatHoursDisplay(hours: HoursInfo): string {
  const groups: { start: number; end: number; day: DayHours }[] = [];

  WEEKDAYS.forEach((weekday, index) => {
    const current = hours.days[weekday.id];
    const last = groups[groups.length - 1];
    if (last && sameDayHours(last.day, current)) {
      last.end = index;
      return;
    }
    groups.push({ start: index, end: index, day: current });
  });

  const openParts: string[] = [];

  for (const group of groups) {
    if (group.day.closed) continue;
    const label = dayRangeLabel(group.start, group.end, false);
    openParts.push(
      `${label}: ${formatTime12(group.day.open)} – ${formatTime12(group.day.close)}`
    );
  }

  let text = openParts.join(' · ') || 'Closed';
  if (hours.note.trim()) {
    text += ` (${hours.note.trim()})`;
  }
  return text;
}

export function formatOpeningHoursSchema(hours: HoursInfo): string | string[] | undefined {
  const groups: { start: number; end: number; day: DayHours }[] = [];

  WEEKDAYS.forEach((weekday, index) => {
    const current = hours.days[weekday.id];
    const last = groups[groups.length - 1];
    if (last && sameDayHours(last.day, current)) {
      last.end = index;
      return;
    }
    groups.push({ start: index, end: index, day: current });
  });

  const specs = groups
    .filter((group) => !group.day.closed)
    .map(
      (group) =>
        `${dayRangeLabel(group.start, group.end, true).replace(' – ', '-')} ${group.day.open}-${group.day.close}`
    );

  if (specs.length === 0) return undefined;
  return specs.length === 1 ? specs[0] : specs;
}

export function normalizeHours(hours: HoursInfo): HoursInfo | null {
  const next = cloneHours(hours);
  next.note = hours.note.trim().slice(0, HOURS_NOTE_MAX);

  for (const weekday of WEEKDAYS) {
    const day = next.days[weekday.id];
    if (day.closed) continue;
    if (!isValidTime(day.open) || !isValidTime(day.close) || day.close <= day.open) {
      return null;
    }
  }

  return next;
}

export function isDefaultHours(hours: HoursInfo): boolean {
  return (
    hours.note === DEFAULT_HOURS.note &&
    WEEKDAYS.every((weekday) => sameDayHours(hours.days[weekday.id], DEFAULT_HOURS.days[weekday.id]))
  );
}

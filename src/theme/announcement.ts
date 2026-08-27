export const ANNOUNCEMENT_STORAGE_KEY = 'coliseum-announcement';
export const ANNOUNCEMENT_MESSAGE_MAX = 160;
export const ANNOUNCEMENT_LABEL_MAX = 32;

export interface Announcement {
  message: string;
  linkHref?: string;
  linkLabel?: string;
}

export type AnnouncementLink =
  | { kind: 'internal'; path: string }
  | { kind: 'external'; href: string };

const INTERNAL_PATH_RE = /^\/(?!\/)[^\s]*$/;

export function parseAnnouncementLink(raw: string): AnnouncementLink | null {
  const href = raw.trim();
  if (!href) return null;

  if (INTERNAL_PATH_RE.test(href)) {
    return { kind: 'internal', path: href };
  }

  try {
    const url = new URL(href);
    if (
      url.protocol === 'http:' ||
      url.protocol === 'https:' ||
      url.protocol === 'mailto:' ||
      url.protocol === 'tel:'
    ) {
      return { kind: 'external', href };
    }
  } catch {
    return null;
  }

  return null;
}

export function isValidAnnouncementLink(raw: string): boolean {
  return parseAnnouncementLink(raw) !== null;
}

export function normalizeAnnouncement(input: {
  message: string;
  linkHref?: string;
  linkLabel?: string;
}): Announcement | null {
  const message = input.message.trim().slice(0, ANNOUNCEMENT_MESSAGE_MAX);
  if (!message) return null;

  const linkHref = input.linkHref?.trim() ?? '';
  if (!linkHref) {
    return { message };
  }

  if (!isValidAnnouncementLink(linkHref)) return null;

  const linkLabel =
    input.linkLabel?.trim().slice(0, ANNOUNCEMENT_LABEL_MAX) || 'Learn more';

  return { message, linkHref, linkLabel };
}

export function parseStoredAnnouncement(raw: unknown): Announcement | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as Record<string, unknown>;
  return normalizeAnnouncement({
    message: typeof record.message === 'string' ? record.message : '',
    linkHref: typeof record.linkHref === 'string' ? record.linkHref : undefined,
    linkLabel: typeof record.linkLabel === 'string' ? record.linkLabel : undefined,
  });
}

export function readStoredAnnouncement(): Announcement | null {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
    if (!raw) return null;
    return parseStoredAnnouncement(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function persistAnnouncement(announcement: Announcement | null) {
  if (!announcement) {
    localStorage.removeItem(ANNOUNCEMENT_STORAGE_KEY);
    return;
  }
  localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(announcement));
}

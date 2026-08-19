import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { parseAnnouncementLink } from '../theme/announcement';
import { useAnnouncement } from './AnnouncementContext';
import { AnnouncementModal } from './AnnouncementModal';
import { RemoveAnnouncementModal } from './RemoveAnnouncementModal';

const MENU_ITEM =
  'flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-stone-300 transition-colors hover:bg-white/5 hover:text-white';

interface AnnouncementBannerProps {
  onNavigate: (path: string) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onNavigate }) => {
  const { announcement, setAnnouncement, clearAnnouncement } = useAnnouncement();
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);

  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el || !announcement) {
      document.documentElement.style.setProperty('--announcement-h', '0px');
      return;
    }

    const apply = () => {
      document.documentElement.style.setProperty('--announcement-h', `${el.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--announcement-h', '0px');
    };
  }, [announcement]);

  useEffect(() => {
    if (!menuOpen) return;

    const close = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', close);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  if (!announcement) return null;

  const link = announcement.linkHref ? parseAnnouncementLink(announcement.linkHref) : null;
  const linkLabel = announcement.linkLabel || 'Learn more';

  const linkClassName =
    'inline-flex shrink-0 items-center justify-center rounded bg-canvas/90 px-3 py-1.5 font-mono-code text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-canvas active:bg-black';

  return (
    <div
      ref={barRef}
      id="site-announcement"
      role="region"
      aria-label="Site announcement"
      aria-live="polite"
      className="relative z-[90] border-b border-black/10 bg-accent text-accent-fg"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-6 lg:px-8">
        <p className="min-w-0 flex-1 text-sm font-medium leading-snug">
          {announcement.message}
        </p>

        <div className="flex shrink-0 items-center gap-1.5">
          {link?.kind === 'internal' && (
            <button type="button" className={linkClassName} onClick={() => onNavigate(link.path)}>
              {linkLabel}
            </button>
          )}
          {link?.kind === 'external' && (
            <a
              href={link.href}
              className={linkClassName}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {linkLabel}
            </a>
          )}

          <div ref={menuRef} className="relative">
            <button
              type="button"
              id="announcement-options-toggle"
              aria-label="Announcement options"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls="announcement-options-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded p-1.5 text-accent-fg/70 transition-colors hover:bg-black/10 hover:text-accent-fg"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {menuOpen && (
              <div
                id="announcement-options-menu"
                role="menu"
                aria-labelledby="announcement-options-toggle"
                className="absolute top-full right-0 z-[52] mt-1.5 w-56 rounded-lg border-2 border-white/15 bg-elevated p-1.5 shadow-2xl"
              >
                <div className="px-3 py-1.5 font-mono-code text-[10px] uppercase tracking-wider text-stone-500">
                  Admin
                </div>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setEditorOpen(true);
                  }}
                  className={MENU_ITEM}
                >
                  <Pencil className="h-3.5 w-3.5 shrink-0" />
                  Update announcement
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setRemoveConfirmOpen(true);
                  }}
                  className={`${MENU_ITEM} hover:text-red-300/80`}
                >
                  <Trash2 className="h-3.5 w-3.5 shrink-0" />
                  Remove announcement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {editorOpen && (
        <AnnouncementModal
          initial={announcement}
          onSave={setAnnouncement}
          onClose={() => setEditorOpen(false)}
        />
      )}

      {removeConfirmOpen && (
        <RemoveAnnouncementModal
          message={announcement.message}
          onConfirm={() => {
            clearAnnouncement();
            setRemoveConfirmOpen(false);
          }}
          onClose={() => setRemoveConfirmOpen(false)}
        />
      )}
    </div>
  );
};

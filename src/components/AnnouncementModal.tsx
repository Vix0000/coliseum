import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { Megaphone, X } from 'lucide-react';
import {
  ANNOUNCEMENT_LABEL_MAX,
  ANNOUNCEMENT_MESSAGE_MAX,
  isValidAnnouncementLink,
  normalizeAnnouncement,
  type Announcement,
} from '../theme/announcement';
import { RemoveAnnouncementModal } from './RemoveAnnouncementModal';

const FIELD_CLASS =
  'w-full rounded-lg border-2 border-white/15 bg-canvas px-2.5 py-2 font-mono-code text-sm text-white outline-none focus:border-accent';
const FIELD_ERROR_CLASS =
  'w-full rounded-lg border-2 border-red-500/80 bg-canvas px-2.5 py-2 font-mono-code text-sm text-white outline-none focus:border-red-400';

interface AnnouncementModalProps {
  initial: Announcement | null;
  onSave: (announcement: Announcement) => void;
  onRemove?: () => void;
  onClose: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  initial,
  onSave,
  onRemove,
  onClose,
}) => {
  const titleId = useId();
  const editing = Boolean(initial);
  const [message, setMessage] = useState(initial?.message ?? '');
  const [linkHref, setLinkHref] = useState(initial?.linkHref ?? '');
  const [linkLabel, setLinkLabel] = useState(initial?.linkLabel ?? '');
  const [messageError, setMessageError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !removeConfirmOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, removeConfirmOpen]);

  const trimmedHref = linkHref.trim();
  const previewLabel = linkLabel.trim() || 'Learn more';
  const preview =
    normalizeAnnouncement({ message, linkHref, linkLabel }) ??
    (message.trim()
      ? { message: message.trim().slice(0, ANNOUNCEMENT_MESSAGE_MAX) }
      : null);

  const handlePublish = () => {
    const nextMessage = message.trim();
    if (!nextMessage) {
      setMessageError('Enter a short notice');
      return;
    }

    if (trimmedHref && !isValidAnnouncementLink(trimmedHref)) {
      setLinkError('Use a site path like /quote, or a full https:// link');
      return;
    }

    const next = normalizeAnnouncement({ message, linkHref, linkLabel });
    if (!next) {
      setMessageError('Enter a short notice');
      return;
    }

    onSave(next);
    onClose();
  };

  return createPortal(
    <div
      id="announcement-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
      onClick={() => {
        if (!removeConfirmOpen) onClose();
      }}
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
          aria-label="Close announcement editor"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/10">
            <Megaphone className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-accent">
              Admin
            </p>
            <h2 id={titleId} className="font-display text-lg font-bold text-white">
              {editing ? 'Edit announcement' : 'New announcement'}
            </h2>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            handlePublish();
          }}
        >
          <p className="text-xs leading-relaxed text-stone-400">
            This notice appears at the top of every page. Add an optional link if you want a button
            beside it.
          </p>

          <div className="space-y-3">
            <label className="block space-y-1.5">
              <span className="flex items-center justify-between text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
                Message
                <span className="normal-case tracking-normal text-stone-600">
                  {message.trim().length}/{ANNOUNCEMENT_MESSAGE_MAX}
                </span>
              </span>
              <textarea
                id="announcement-message"
                value={message}
                maxLength={ANNOUNCEMENT_MESSAGE_MAX}
                rows={3}
                autoFocus
                aria-invalid={Boolean(messageError)}
                aria-describedby={messageError ? 'announcement-message-error' : undefined}
                placeholder="Now booking Spring 2026 installs."
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (event.target.value.trim()) setMessageError(null);
                }}
                className={`${messageError ? FIELD_ERROR_CLASS : FIELD_CLASS} resize-none leading-relaxed`}
              />
              {messageError && (
                <p id="announcement-message-error" className="text-[11px] text-red-400">
                  {messageError}
                </p>
              )}
            </label>

            <label className="block space-y-1.5">
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
                Button link{' '}
                <span className="normal-case tracking-normal text-stone-600">(optional)</span>
              </span>
              <input
                id="announcement-link"
                value={linkHref}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                aria-invalid={Boolean(linkError)}
                aria-describedby={linkError ? 'announcement-link-error' : undefined}
                placeholder="/quote"
                onChange={(event) => {
                  const next = event.target.value;
                  setLinkHref(next);
                  if (!next.trim() || isValidAnnouncementLink(next)) setLinkError(null);
                }}
                className={linkError ? FIELD_ERROR_CLASS : FIELD_CLASS}
              />
              {linkError ? (
                <p id="announcement-link-error" className="text-[11px] text-red-400">
                  {linkError}
                </p>
              ) : (
                <p className="text-[11px] text-stone-500">
                  Use a page path like <span className="text-stone-400">/quote</span>, or a full URL.
                </p>
              )}
            </label>

            <label className="block space-y-1.5">
              <span className="flex items-center justify-between text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
                Button label
                <span className="normal-case tracking-normal text-stone-600">
                  {linkLabel.trim().length}/{ANNOUNCEMENT_LABEL_MAX}
                </span>
              </span>
              <input
                id="announcement-link-label"
                value={linkLabel}
                maxLength={ANNOUNCEMENT_LABEL_MAX}
                disabled={!trimmedHref}
                placeholder="Get a Quote"
                onChange={(event) => setLinkLabel(event.target.value)}
                className={`${FIELD_CLASS} disabled:cursor-not-allowed disabled:opacity-40`}
              />
            </label>
          </div>

          <div className="hidden space-y-1.5 sm:block">
            <p className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500">
              Preview
            </p>
            <div className="flex items-center gap-3 rounded-xl bg-accent px-3 py-2.5 text-accent-fg">
              <p className="min-w-0 flex-1 text-sm font-medium leading-snug">
                {preview?.message || 'Your notice will appear here.'}
              </p>
              {trimmedHref && (
                <span className="shrink-0 rounded bg-canvas/90 px-3 py-1.5 font-mono-code text-[10px] font-semibold uppercase tracking-wider text-white">
                  {previewLabel}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-mono-code text-xs font-bold uppercase tracking-wider text-accent-fg transition-colors hover:bg-accent-hover active:bg-accent-active"
            >
              {editing ? 'Update announcement' : 'Publish announcement'}
            </button>
            {editing && onRemove && (
              <button
                type="button"
                onClick={() => setRemoveConfirmOpen(true)}
                className="flex w-full items-center justify-center rounded-lg px-4 py-2 font-mono-code text-[11px] uppercase tracking-wider text-stone-400 transition-colors hover:bg-white/5 hover:text-red-400"
              >
                Remove announcement
              </button>
            )}
          </div>
        </form>
      </div>

      {removeConfirmOpen && onRemove && (
        <RemoveAnnouncementModal
          message={initial?.message || message}
          onConfirm={() => {
            onRemove();
            onClose();
          }}
          onClose={() => setRemoveConfirmOpen(false)}
        />
      )}
    </div>,
    document.body
  );
};

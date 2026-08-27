import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, X } from 'lucide-react';

const FIELD_CLASS =
  'w-full rounded-lg border-2 border-white/15 bg-canvas px-2.5 py-2 font-mono-code text-sm text-white outline-none focus:border-accent';

interface RemoveAnnouncementModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const RemoveAnnouncementModal: React.FC<RemoveAnnouncementModalProps> = ({
  message,
  onConfirm,
  onClose,
}) => {
  const titleId = useId();
  const copyFieldId = useId();

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

  return createPortal(
    <div
      id="remove-announcement-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={`${titleId}-copy`}
    >
      <div
        className="relative w-full max-w-sm space-y-4 rounded-2xl border-2 border-white/20 bg-raised p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-white/10 p-2 text-stone-300 transition-colors hover:bg-white/20 hover:text-white active:bg-white/25"
          aria-label="Cancel removing announcement"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 -translate-y-px text-red-400" />
          </div>
          <h2 id={titleId} className="font-display text-lg font-bold text-white">
            Delete?
          </h2>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs leading-relaxed text-stone-400">
            <span className="font-bold">Are you sure?</span> No new visitors will be able to see
            this banner if you remove it. This action is irreversible.
          </p>
          <label className="block space-y-1.5" htmlFor={copyFieldId}>
            <span id={`${titleId}-copy`} className="block text-xs leading-relaxed text-stone-400">
              If you wish to copy existing text before you proceed, do so now:
            </span>
            <textarea
              id={copyFieldId}
              value={message}
              readOnly
              rows={3}
              onFocus={(event) => event.currentTarget.select()}
              className={`${FIELD_CLASS} resize-none leading-relaxed`}
            />
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-lg border-2 border-white/15 bg-white/5 px-4 py-2.5 font-mono-code text-[11px] uppercase tracking-wider text-stone-300 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center rounded-[9px] border-2 border-red-500/25 bg-red-500/15 px-4 py-2.5 font-mono-code text-[11px] font-bold uppercase tracking-wider text-red-300 transition-colors hover:border-red-500/40 hover:bg-red-500/25 hover:text-red-200 active:bg-red-500/30"
          >
            Remove
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

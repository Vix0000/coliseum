import React from 'react';

export const DemoNotice: React.FC = () => {
  return (
    <div
      role="note"
      className="rounded-xl border-2 border-white/10 bg-white/5 p-4 text-sm text-stone-400 leading-relaxed"
    >
      <span className="text-accent font-mono-code text-xs uppercase tracking-wider block mb-1">
        Sample page
      </span>
      This is a generic privacy policy included with this website demo.
    </div>
  );
};

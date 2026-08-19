import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { EmailModal } from './EmailModal';

interface EmailContextValue {
  openEmailModal: () => void;
}

const EmailContext = createContext<EmailContextValue | null>(null);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openEmailModal = useCallback(() => setOpen(true), []);
  const closeEmailModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openEmailModal }), [openEmailModal]);

  return (
    <EmailContext.Provider value={value}>
      {children}
      {open && <EmailModal onClose={closeEmailModal} />}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within EmailProvider');
  }
  return context;
};

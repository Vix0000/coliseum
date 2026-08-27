import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PhoneCallModal } from './PhoneCallModal';

interface PhoneCallContextValue {
  openPhoneModal: () => void;
}

const PhoneCallContext = createContext<PhoneCallContextValue | null>(null);

export const PhoneCallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openPhoneModal = useCallback(() => setOpen(true), []);
  const closePhoneModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openPhoneModal }), [openPhoneModal]);

  return (
    <PhoneCallContext.Provider value={value}>
      {children}
      {open && <PhoneCallModal onClose={closePhoneModal} />}
    </PhoneCallContext.Provider>
  );
};

export const usePhoneCall = () => {
  const context = useContext(PhoneCallContext);
  if (!context) {
    throw new Error('usePhoneCall must be used within PhoneCallProvider');
  }
  return context;
};

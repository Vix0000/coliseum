import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  persistAnnouncement,
  readStoredAnnouncement,
  type Announcement,
} from '../theme/announcement';

interface AnnouncementContextValue {
  announcement: Announcement | null;
  setAnnouncement: (next: Announcement | null) => void;
  clearAnnouncement: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextValue | null>(null);

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [announcement, setAnnouncementState] = useState<Announcement | null>(() => {
    if (typeof window === 'undefined') return null;
    return readStoredAnnouncement();
  });

  const setAnnouncement = useCallback((next: Announcement | null) => {
    persistAnnouncement(next);
    setAnnouncementState(next);
  }, []);

  const clearAnnouncement = useCallback(() => {
    persistAnnouncement(null);
    setAnnouncementState(null);
  }, []);

  const value = useMemo(
    () => ({ announcement, setAnnouncement, clearAnnouncement }),
    [announcement, setAnnouncement, clearAnnouncement]
  );

  return <AnnouncementContext.Provider value={value}>{children}</AnnouncementContext.Provider>;
};

export const useAnnouncement = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncement must be used within AnnouncementProvider');
  }
  return context;
};

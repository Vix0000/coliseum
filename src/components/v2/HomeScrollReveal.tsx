import React, { useEffect, useRef, useState } from 'react';

interface HomeScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export const HomeScrollReveal: React.FC<HomeScrollRevealProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

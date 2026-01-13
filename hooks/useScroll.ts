import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Linear interpolation helper
export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

// Clamp helper
export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

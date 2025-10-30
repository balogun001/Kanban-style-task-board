import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });

      const handleResize = (): void => {
        setWindowSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}

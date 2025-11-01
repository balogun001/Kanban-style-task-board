'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInitializer({ options = {} }: AOSInitializerProps) {
  useEffect(() => {
    const defaultOptions: AOSOptions = {
      duration: 600,
      easing: 'ease-in-out-cubic',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      offset: 50,
      delay: 0,
    };

    const finalOptions = { ...defaultOptions, ...options };

    AOS.init(finalOptions);

    const refreshTimer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [options]);

  return null;
}

type AOSOptions = {
  duration?: number;
  easing?: string;
  once?: boolean;
  mirror?: boolean;
  anchorPlacement?: string;
  offset?: number;
  delay?: number;
};

type AOSInitializerProps = {
  options?: AOSOptions;
};

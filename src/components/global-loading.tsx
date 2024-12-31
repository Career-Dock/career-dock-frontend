'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LottieWrapper = dynamic(() => import('./lottie-wrapper'), { ssr: false });

export function GlobalLoading() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <LottieWrapper />
      </div>
    </div>
  );
}

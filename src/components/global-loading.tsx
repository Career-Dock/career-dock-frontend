'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '../../public/loading.json';

export function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}

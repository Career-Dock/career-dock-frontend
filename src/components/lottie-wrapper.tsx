'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '../../public/loading.json';

export default function LottieWrapper() {
  return <Lottie animationData={loadingAnimation} loop={true} />;
}

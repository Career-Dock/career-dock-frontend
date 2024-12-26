'use client';

import { ChildrenProps } from '@/types';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ClerkProvider } from '@clerk/nextjs';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const Providers = ({ children }: ChildrenProps) => {
  return (
    <NuqsAdapter>
      <ClerkProvider>
        <Provider store={store}>{children}</Provider>
      </ClerkProvider>
    </NuqsAdapter>
  );
};

export default Providers;

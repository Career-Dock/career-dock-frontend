'use client';

import { ChildrenProps } from '@/types';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const Providers = ({ children }: ChildrenProps) => {
  return (
    <ClerkProvider>
      <Provider store={store}>{children}</Provider>
    </ClerkProvider>
  );
};

export default Providers;

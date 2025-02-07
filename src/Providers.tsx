import { FC, PropsWithChildren } from 'react';
import { Toaster } from '@/ui/components/ui/sonner.tsx';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}

      <Toaster />
    </>
  );
};

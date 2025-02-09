import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import { Toaster } from '@/ui/components/ui/sonner.tsx';

export const Layout = () => {
  const profile = useProfileStore().profile;

  return (
    <React.StrictMode>
      <Outlet />
      {profile && <Navigation />}
      <Toaster />
    </React.StrictMode>
  );
};

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import { Toaster } from '@/ui/components/ui/sonner.tsx';
import { useBookStore } from '@/data/books/store/useBookStore.tsx';
import { toast } from 'sonner';

export const Layout = () => {
  const profile = useProfileStore().profile;
  const booksErrors = useBookStore().errors;

  useEffect(() => {
    const errors = Object.values(booksErrors) as string[];

    if (errors.length) {
      errors.forEach((error) => {
        toast.error(error, {
          closeButton: true,
        });
      });
    }
  }, [booksErrors]);

  return (
    <React.StrictMode>
      <Outlet />
      {profile && <Navigation />}
      <Toaster />
    </React.StrictMode>
  );
};

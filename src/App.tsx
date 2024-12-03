import { FC, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { initRouter } from '@/routes/router.tsx';
import PWABadge from '@/PWABadge.tsx';
import { Providers } from '@/Providers.tsx';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import type { Router as RemixRouter } from '@remix-run/router/dist/router';

export const App: FC = () => {
  const [router, setRouter] = useState<RemixRouter | null>(null);
  const initProfile = useProfileStore().initProfile;
  const profile = useProfileStore().profile;

  useEffect(() => {
    initProfile();
  }, [initProfile]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    const router = initRouter(profile);
    setRouter(router);
  }, [profile]);

  return (
    <Providers>
      {router ? <RouterProvider router={router} /> : 'Initializing...'}
      <PWABadge />
    </Providers>
  );
};

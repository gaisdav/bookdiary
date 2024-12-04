import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { initRouter } from '@/routes/router.tsx';
import PWABadge from '@/PWABadge.tsx';
import { Providers } from '@/Providers.tsx';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { IUser } from '@/data/user/enitites/user';
import { PageWrapper } from '@/components/PageWrapper';

export const App: FC = () => {
  const initProfile = useProfileStore().initProfile;
  const profile = useProfileStore().profile;

  useEffect(() => {
    initProfile();
  }, [initProfile]);

  const getRouter = (profile: IUser) => {
    return initRouter(profile);
  };

  return (
    <Providers>
      {profile ? (
        <RouterProvider router={getRouter(profile)} />
      ) : (
        <PageWrapper>Initializing app...</PageWrapper>
      )}
      <PWABadge />
    </Providers>
  );
};

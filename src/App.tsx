import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { initRouter } from '@/routes/router.tsx';
import { Providers } from '@/Providers.tsx';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';

export const App: FC = () => {
  const initProfile = useProfileStore().initProfile;
  const profileLoading = useProfileStore().profileLoading;
  const profile = useProfileStore().profile;

  useEffect(() => {
    initProfile();
  }, [initProfile]);

  return (
    <Providers>
      {profileLoading ? (
        <PageWrapper title="Initializing app..." showSearch={false}>
          Initializing app...
        </PageWrapper>
      ) : (
        <RouterProvider router={initRouter(profile)} />
      )}
    </Providers>
  );
};

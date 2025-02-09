import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { initRouter } from '@/ui/routes/router.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useProfileStore } from './data/profile/useProfileStore';

export const App: FC = () => {
  const profile = useProfileStore().profile;

  return (
    <>
      {!profile ? (
        <PageWrapper title="Initializing app..." showSearch={false}>
          Initializing app...
        </PageWrapper>
      ) : (
        <RouterProvider router={initRouter(profile)} />
      )}
    </>
  );
};

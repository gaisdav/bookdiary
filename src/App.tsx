import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { initRouter } from '@/ui/routes/router.tsx';
import { useProfileStore } from './data/profile/useProfileStore';

export const App: FC = () => {
  const profileLoading = useProfileStore().profileLoading;
  const profile = useProfileStore().profile;

  return (
    <>
      {profileLoading ? (
        <div className="p-4">Initializing app...</div>
      ) : (
        <RouterProvider router={initRouter(profile)} />
      )}
    </>
  );
};

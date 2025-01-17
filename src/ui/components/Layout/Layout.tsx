import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';

export const Layout = () => {
  const profile = useProfileStore().profile;

  return (
    <>
      <Outlet />
      {profile && <Navigation />}
    </>
  );
};

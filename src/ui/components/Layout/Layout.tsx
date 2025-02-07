import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';

export const Layout = () => {
  const profile = useProfileStore().profile;

  return (
    <>
      <Outlet />
      {profile && <Navigation />}
    </>
  );
};

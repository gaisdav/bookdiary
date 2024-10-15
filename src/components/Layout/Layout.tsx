import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import css from './layout.module.scss';
import { useUser } from '@/modules/profile/hooks/useUser.tsx';

export const Layout = () => {
  const { user, loading } = useUser();

  return (
    <>
      <main className={css.main}>{!loading ? <Outlet /> : 'initializing'}</main>
      {user && <Navigation />}
    </>
  );
};

import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import css from './layout.module.scss';
import { useAuthController } from '../../modules/login/hooks/useAuth.tsx';

export const Layout = () => {
  const { user } = useAuthController();

  return (
    <>
      <main className={css.main}>
        <Outlet />
      </main>
      {user && <Navigation />}
    </>
  );
};

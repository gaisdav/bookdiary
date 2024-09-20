import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import css from './layout.module.scss';

export const Layout = () => {
  return (
    <>
      <main className={css.main}>
        <Outlet />
      </main>
      <Navigation />
    </>
  );
};

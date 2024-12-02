import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import css from './layout.module.scss';
import { useUser } from '@/ui/profile/hooks/useUser.tsx';
import { PageWrapper } from '@/components/PageWrapper';

export const Layout = () => {
  const { user, loading } = useUser();

  return (
    <>
      <main className={css.main}>
        {!loading ? <Outlet /> : <PageWrapper>initializing</PageWrapper>}
      </main>
      {user && <Navigation />}
    </>
  );
};

import { Outlet } from 'react-router-dom';
import { Navigation } from '../Nav';
import css from './layout.module.scss';
import { PageWrapper } from '@/components/PageWrapper';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';

export const Layout = () => {
  const profile = useProfileStore().profile;

  return (
    <>
      <main className={css.main}>
        {profile ? <Outlet /> : <PageWrapper>initializing</PageWrapper>}
      </main>
      {profile && <Navigation />}
    </>
  );
};

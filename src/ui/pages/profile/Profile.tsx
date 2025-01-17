import { FC } from 'react';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import css from './styles.module.scss';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { useAuthController } from '@/ui/pages/login/hooks/useAuth.tsx';
import { Img } from '@/ui/components/Img';
import { ROUTE } from '@/routes/routes.ts';
import { NavLink } from 'react-router-dom';

const Profile: FC = () => {
  const { logout } = useAuthController();
  const profile = useProfileStore().profile;

  if (!profile) {
    return <div>user not found</div>;
  }

  return (
    <PageWrapper title="Profile" showSearch={false}>
      <div className={css.actions}>
        <Button variant="outline" size="icon" asChild>
          <NavLink viewTransition to={ROUTE.SETTINGS}>
            <SettingsIcon />
          </NavLink>
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-4 justify-between items-center">
        <div className="flex flex-col w-full flex-1">
          {profile.photoURL && <Img src={profile.photoURL} />}
          <div>{profile.displayName}</div>
          <div>{profile.email}</div>
        </div>

        <Button variant="outline" onClick={logout}>
          <LogOutIcon /> Logout
        </Button>
      </div>
    </PageWrapper>
  );
};

export default Profile;

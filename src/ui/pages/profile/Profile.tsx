import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import css from './styles.module.scss';
import { MoonIcon, SunIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { useAuthController } from '@/ui/pages/login/hooks/useAuth.tsx';
import { Img } from '@/ui/components/Img';

const Profile: FC = () => {
  const { switchTheme } = useTheme();
  const { logout } = useAuthController();
  const { theme } = useTheme();
  const profile = useProfileStore().profile;

  if (!profile) {
    return <div>user not found</div>;
  }

  return (
    <PageWrapper
      title="Profile"
      showSearch={false}
      className="flex flex-col gap-4"
    >
      <div className={css.actions}>
        <Button variant="outline" size="icon" onClick={switchTheme}>
          {theme === 'light' ? (
            <MoonIcon className={css.themeIcon} />
          ) : (
            <SunIcon className={css.themeIcon} />
          )}
        </Button>

        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </div>

      <div className="flex flex-col gap-4 justify-between items-center h-full">
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

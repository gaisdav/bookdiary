import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { useAuthController } from '@/ui/login/hooks/useAuth.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PageWrapper } from '@/components/PageWrapper';
import css from './styles.module.scss';
import { MoonIcon, SunIcon, ExitIcon } from '@radix-ui/react-icons';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';

const Profile: FC = () => {
  const { switchTheme } = useTheme();
  const { logout } = useAuthController();
  const { theme } = useTheme();
  const profile = useProfileStore().profile;

  if (!profile) {
    return <div>user not found</div>;
  }

  return (
    <PageWrapper>
      <div className={css.actions}>
        <Button variant="outline" size="icon" onClick={switchTheme}>
          {theme === 'light' ? (
            <MoonIcon className={css.themeIcon} />
          ) : (
            <SunIcon className={css.themeIcon} />
          )}
        </Button>
        <Button variant="outline" onClick={logout}>
          <ExitIcon /> Logout
        </Button>
      </div>
      <div>
        User ID: <pre>{profile.uid}</pre>
      </div>
      <div>{profile.displayName}</div>
      <div>{profile.email}</div>
      <div>{profile.photoURL}</div>
    </PageWrapper>
  );
};

export default Profile;

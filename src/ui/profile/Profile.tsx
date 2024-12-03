import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { useAuthController } from '@/ui/login/hooks/useAuth.tsx';
import { useUser } from '@/ui/profile/hooks/useUser.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PageWrapper } from '@/components/PageWrapper';
import css from './styles.module.scss';
import { MoonIcon, SunIcon, ExitIcon } from '@radix-ui/react-icons';

const Profile: FC = () => {
  const { switchTheme } = useTheme();
  const { logout } = useAuthController();
  const { theme } = useTheme();
  const { user } = useUser();

  if (!user) {
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
      <div>Profile</div>
      <div>{user.uid}</div>
      <div>{user.displayName}</div>
      <div>{user.email}</div>
      <div>{user.photoURL}</div>
    </PageWrapper>
  );
};

export default Profile;

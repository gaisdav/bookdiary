import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { useAuthController } from '@/modules/login/hooks/useAuth.tsx';
import { useUser } from '@/modules/profile/hooks/useUser.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PageWrapper } from '@/components/PageWrapper';
import css from './styles.module.scss';

const Profile: FC = () => {
  const { switchTheme } = useTheme();
  const { logout } = useAuthController();
  const { user } = useUser();

  if (!user) {
    return <div>user not found</div>;
  }

  return (
    <PageWrapper>
      <div className={css.actions}>
        <Button variant="outline" size="sm" onClick={switchTheme}>
          Change theme
        </Button>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
      <div>Profile</div>
      <div>{user.displayName}</div>
      <div>{user.email}</div>
      <div>{user.photoURL}</div>
    </PageWrapper>
  );
};

export default Profile;

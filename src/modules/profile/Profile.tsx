import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { useAuthController } from '@/modules/login/hooks/useAuth.tsx';
import { useUser } from '@/modules/profile/hooks/useUser.tsx';

const Profile: FC = () => {
  const { switchTheme } = useTheme();
  const { logout } = useAuthController();
  const { user } = useUser();

  if (!user) {
    return <div>user not found</div>;
  }

  return (
    <div>
      <button onClick={switchTheme}>change theme</button>
      <button onClick={logout}>logout</button>
      <div>Profile</div>
      <div>{user.displayName}</div>
      <div>{user.email}</div>
      <div>{user.photoURL}</div>
    </div>
  );
};

export default Profile;

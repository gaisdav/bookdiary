import { FC } from 'react';
import { useChangeTheme } from '@/hooks/useChangeTheme';
import { useAuthController } from '@/modules/login/hooks/useAuth.tsx';

const Profile: FC = () => {
  const { switchTheme } = useChangeTheme();
  const { logout } = useAuthController();

  return (
    <div>
      <button onClick={switchTheme}>change theme</button>
      <button onClick={logout}>logout</button>
      <div>Profile</div>
    </div>
  );
};

export default Profile;

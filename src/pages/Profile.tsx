import { FC } from 'react';
import { useChangeTheme } from '../hooks/useChangeTheme.tsx';
import { useAuthController } from '../сontrollers/useAuth.tsx';

export const Profile: FC = () => {
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

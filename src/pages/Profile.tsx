import { FC } from 'react';
import { useChangeTheme } from '../hooks/useChangeTheme.tsx';

export const Profile: FC = () => {
  const { switchTheme } = useChangeTheme();

  return (
    <div>
      <button onClick={switchTheme}>change theme</button>
    </div>
  );
};

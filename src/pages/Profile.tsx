import { FC } from 'react';

export const Profile: FC = () => {
  const handleThemeChange = () => {
    const themeValue = document.documentElement.getAttribute('data-theme');
    const theme = themeValue === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
  };

  return (
    <div>
      <button onClick={handleThemeChange}>change theme</button>
    </div>
  );
};

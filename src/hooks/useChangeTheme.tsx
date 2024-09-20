import { useEffect, useRef, useState } from 'react';

export interface IChangeTheme {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  switchTheme: () => void;
}

/**
 * Custom hook to manage and switch between light and dark themes.
 * Also updates the color of the status bar based on the theme.
 */
export const useChangeTheme = (): IChangeTheme => {
  const [theme, setTheme] = useState<IChangeTheme['theme']>(() => {
    return (localStorage.getItem('data-theme') ||
      document.documentElement.getAttribute('data-theme') ||
      'light') as IChangeTheme['theme'];
  });

  const refs = useRef({
    html: document.querySelector('html'),
    themeColorMeta: document.querySelector("meta[name='theme-color']"),
  });

  useEffect(() => {
    if (refs.current.html && refs.current.themeColorMeta) {
      refs.current.html.setAttribute('data-theme', theme);
      // const themeColor = getComputedStyle(refs.current.html).backgroundColor;
      // refs.current.themeColorMeta.setAttribute('content', themeColor);
    }
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('data-theme', newTheme); // Persist the theme in localStorage
  };

  return { theme, setTheme, switchTheme };
};

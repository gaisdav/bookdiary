export interface IChangeTheme {
  switchTheme: () => void;
}

/**
 * Custom hook to manage and switch between light and dark themes.
 * Also updates the color of the status bar based on the theme.
 */
export const useChangeTheme = (): IChangeTheme => {
  const switchTheme = () => {
    const themeValue = document.documentElement.getAttribute('data-theme');
    const theme = themeValue === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    const themeColor = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--color-bg');
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute('content', themeColor);
    localStorage.setItem('data-theme', theme);
  };

  return { switchTheme };
};

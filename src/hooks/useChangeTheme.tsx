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

    /**
     * SWITCH_THEME is a global
     * function from ./index.html
     */
    SWITCH_THEME(theme);
  };

  return { switchTheme };
};

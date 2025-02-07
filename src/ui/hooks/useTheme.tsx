import { useEffect, useState } from 'react';

export interface IChangeTheme {
  switchTheme: () => void;
  theme: 'light' | 'dark';
}

export const useTheme = (): IChangeTheme => {
  const [theme, setTheme] = useState<IChangeTheme['theme']>(() => {
    return GET_THEME();
  });

  useEffect(() => {
    const mutationCallback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type !== 'attributes' ||
          mutation.attributeName !== 'class'
        ) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setTheme(mutation.target.getAttribute('class'));
      }
    };

    const observer = new MutationObserver(mutationCallback);

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const switchTheme = () => {
    const theme = GET_THEME() === 'light' ? 'dark' : 'light';

    /**
     * SWITCH_THEME is a global
     * function from ./index.html
     */
    SWITCH_THEME(theme);
  };

  return { switchTheme, theme };
};

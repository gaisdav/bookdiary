import { useEffect, useState } from 'react';

/**
 * Custom hook to track the status of a media query.
 *
 * @param query - A string representing the CSS media query to evaluate.
 * @returns A boolean indicating whether the media query matches the current viewport state.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element.
 *
 * @param ref - A React ref object pointing to the target element.
 * @param handler - A callback function to invoke when a click occurs outside of the element.
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // If the ref doesn't exist or the click is inside the ref, do nothing
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Call the provided handler
      handler(event);
    };

    // Attach event listeners for both mouse and touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

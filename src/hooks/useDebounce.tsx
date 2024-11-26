import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 *
 * @param value - The input value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create a timeout to delay setting the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value or delay changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Check if the item already exists in localStorage
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  // Function to update both state and localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value); // Update state
      localStorage.setItem(key, JSON.stringify(value)); // Update localStorage
    } catch (error) {
      console.error('Error setting localStorage key:', key, error);
    }
  };

  return [storedValue, setValue];
}

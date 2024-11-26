import { useState, useEffect } from 'react';

/**
 * Custom hook to get the current window size.
 * Updates when the window is resized.
 *
 * @returns An object containing the window's width and height.
 */
export function useWindowSize(): { width: number; height: number } {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Define the resize handler
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach event listener on component mount
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

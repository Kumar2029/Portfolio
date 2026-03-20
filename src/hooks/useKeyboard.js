import { useEffect, useRef } from 'react';

export const useKeyboard = () => {
  const keys = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore repeat events if key is held down to save trivial execution
      if (e.repeat) return;
      keys.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys; // Returns ref, no re-renders!
};

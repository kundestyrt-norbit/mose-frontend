import React, { useEffect } from 'react';

/**
 * Custom hook for checking if we clicked outside of an element.
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: Function
) => {
  useEffect(() => {
    /* Handle click outside div */
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target && ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

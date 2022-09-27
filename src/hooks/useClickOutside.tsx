import React, { useEffect } from "react";

/**
 * Custom hook for checking if we clicked outside of an element.
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: Function
): void => {
  useEffect(() => {
    /* Handle click outside div */
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        e.target != null &&
        ref.current != null &&
        !ref.current.contains(e.target as Node)
      ) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

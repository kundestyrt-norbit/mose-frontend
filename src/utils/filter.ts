/**
 * Compares two booleans for sorting.
 */
export const compareBoolean = (a: boolean, b: boolean) => {
  if (a && !b) return -1;
  if (!a && b) return 1;
  return 0;
};

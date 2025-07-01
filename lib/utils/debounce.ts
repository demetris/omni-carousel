/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified time has elapsed since the last time it was invoked.
 *
 * Uses AbortController for cleaner management of the delayed execution.
 *
 * @param fn - The function to debounce
 * @param wait - The number of milliseconds to delay
 *
 * @returns A debounced version of the function
 */
// Generic function wrapper needs to accept any function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let controller = new AbortController();

  // Preserves original function’s this context
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(this: any, ...args: Parameters<T>): void {
    //
    // Cancel previous timeout
    //
    controller.abort();

    controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
      if (!signal.aborted) {
        fn.apply(this, args);
      }
    }, wait);
  };
}

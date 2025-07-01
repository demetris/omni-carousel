/**
 * Callback type for the domReady function.
 */
type DOMReadyCallback = () => void;

/**
 * Hhelper function that executes a callback after the DOM is fully loaded.
 * Similar to @wordpress/dom-ready but with TypeScript typings.
 * 
 * The callback is executed immediately if:
 * - Document is already in 'interactive' or 'complete' state
 * - DOMContentLoaded has already fired
 * 
 * If DOM is not yet ready, the callback is queued to be executed when DOMContentLoaded fires.
 * 
 * @param {DOMReadyCallback} callback The function to execute when the DOM is ready.
 * @return {void}
 */
export function domReady(callback: DOMReadyCallback): void {
  //
  // If document is already loaded (interactive or complete),
  // execute callback immediately
  //
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    //
    // Schedule the callback to run asynchronously using setTimeout with 0ms delay
    // to ensure it runs after the current execution context is complete
    //
    setTimeout(callback, 0);

    return;
  }

  //
  // If we reach here, DOM is still loading,
  // so attach a listener that will fire when the DOM is ready
  //
  document.addEventListener('DOMContentLoaded', function listener() {
    //
    // Remove the event listener to avoid potential memory leaks
    //
    document.removeEventListener('DOMContentLoaded', listener);

    //
    // Execute the callback
    //
    callback();
  });
}
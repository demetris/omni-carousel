import type { Context, InitialState } from '../core';

import { captureInitialAttributes } from '../dom';

/**
 * Sets up persistent state and starts the lazy initialization observer
 *
 * Called from the omni:init listener.
 */
export const handleInit = (
  context: Context,
  initialState: InitialState,
  lazyInitObserver: IntersectionObserver
): boolean => {
  const { elements } = context;

  captureInitialAttributes(context, initialState);

  //
  // Start observing the visibility of the root element
  // to trigger setup when the carousel becomes visible
  //
  lazyInitObserver.observe(elements.root);

  return true;
}

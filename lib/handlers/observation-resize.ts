import type { Context } from '../types';

/**
 * Handles resize events for the carousel using the event system
 *
 * @param context - The carousel context
 * @param resizeObserverEntries - Entries from the ResizeObserver
 */
export const handleResize = (context: Context): void => {
  const { track } = context.elements;
  const { state, eventEmitter } = context;

  const width = track.clientWidth;
  const scrollWidth = track.scrollWidth;

  if (
    width !== state.width
    || scrollWidth !== state.scrollWidth
  ) {
    const storedOverflow = state.scrollWidth > state.width;
    const overflow = scrollWidth > width;

    const overflowChanged = storedOverflow !== overflow;

    state.width = width;
    state.scrollWidth = scrollWidth;

    if (
      overflowChanged
      && overflow
    ) {
      //
      // Was not overflowing, now is:
      // Emit event to set up the carousel.
      //
      eventEmitter.emit('omni:setup');
    } else if (
      overflowChanged
      && !overflow
    ) {
      //
      // Was overflowing, now is not:
      // Emit event to remove the carousel UI.
      //
      eventEmitter.emit('omni:destroy', { mode: 'partial' });
    } else if (overflow) {
      //
      // Dimensions changed but still overflowing as before:
      // Emit event to update only what needs to be updated.
      //
      eventEmitter.emit('omni:dimensions:change', {
        width,
        scrollWidth,
      } as const);
    }
  }
};

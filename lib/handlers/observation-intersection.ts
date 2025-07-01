import type { Context } from '../core';

import { updateIntersectionState } from '../state';

/**
 * Handles intersection changes for carousel slides
 *
 * 1. Processes each IntersectionObserverEntry
 * 2. Calls updateIntersectionState to update the state of each entry
 * 3. Emits omni:visibility:change event when changes occur
 *
 * @param context - The carousel context
 * @param entries - Array of IntersectionObserverEntry objects
 */
export const handleIntersection = (
  context: Context,
  entries: IntersectionObserverEntry[]
): void => {
  const { eventEmitter, state } = context;

  for (const entry of entries) {
    const slide = entry.target as HTMLElement;
    const fullIntersecting = entry.isIntersecting && entry.intersectionRatio === 1;
    const partIntersecting = entry.isIntersecting && entry.intersectionRatio < 1;

    //
    // Update state for entry and get change information
    //
    const result = updateIntersectionState(context, {
      slide,
      fullIntersecting,
      partIntersecting,
    } as const);

    //
    // Emit event if visibility state changed
    //
    if (result.changed) {
      eventEmitter.emit('omni:visibility:change', {
        state,
        slide: result.slide,
        fullIntersecting: result.fullIntersecting,
        partIntersecting: result.partIntersecting,
        wasPartIntersecting: result.wasPartIntersecting,
        wasFullIntersecting: result.wasFullIntersecting,
        startBoundaryChanged: result.startBoundaryChanged,
        endBoundaryChanged: result.endBoundaryChanged,
      } as const);
    }
  }
};

import type { Context, IntersectionState, ItemIntersectionObservation } from '../types';

import { insertInOrder, removeAtIndex } from '../utils';

/**
 * Updates all intersection-related state based on a slide’s visibility
 *
 * For each slide:
 *
 * Removes the slide from arrays it shouldn’t be in.
 * Adds the slide to the appropriate array based on visibility.
 * Updates the boolean flags for first/last slide when needed.
 * Maintains DOM order in the arrays using insertInOrder.
 *
 * @param context - The carousel context
 * @param data - Intersection data for a single slide
 *
 * @returns Object containing change information and item state
 */
export const updateIntersectionState = (
  context: Context,
  data: ItemIntersectionObservation
): IntersectionState => {
  const { state } = context;
  const { slides } = context.elements;
  const { getItemIndex } = context.utils;
  const { slide, fullIntersecting, partIntersecting } = data;

  //
  // Determine if slide is a boundary item (first or last slide)
  //
  const index = getItemIndex(slide);
  const isStartItem = index === 0;
  const isEndItem = index === slides.length - 1;

  //
  // Cache previous state before modifications for change detection
  //
  const wasStartItemFullIntersecting = state.startItemFullIntersecting;
  const wasEndItemFullIntersecting = state.endItemFullIntersecting;

  //
  // Get array states once
  //
  const indexInFullItems = state.fullItems.findIndex(item => item === slide);
  const indexInPartItems = state.partItems.findIndex(item => item === slide);
  const wasFullIntersecting = indexInFullItems !== -1;
  const wasPartIntersecting = indexInPartItems !== -1;

  //
  // Track if visibility changes occurred
  //
  let visibilityChanged = false;

  //
  // Prepare boundary change tracking
  //
  let startBoundaryChanged = false;
  let endBoundaryChanged = false;

  //
  // Handle full visibility changes
  //
  if (wasFullIntersecting !== fullIntersecting) {
    visibilityChanged = true;

    if (fullIntersecting) {
      //
      // Insert the item in the correct order
      //
      insertInOrder(state.fullItems, slide, getItemIndex);

      //
      // Update boundary states for new items
      //
      if (isStartItem && !wasStartItemFullIntersecting) {
        startBoundaryChanged = true;
        state.startItemFullIntersecting = true;
      }

      if (isEndItem && !wasEndItemFullIntersecting) {
        endBoundaryChanged = true;
        state.endItemFullIntersecting = true;
      }
    } else {
      //
      // Remove the item
      //
      removeAtIndex(state.fullItems, indexInFullItems);

      //
      // Update boundary states for items no longer fully visible
      //
      if (isStartItem && wasStartItemFullIntersecting) {
        startBoundaryChanged = true;
        state.startItemFullIntersecting = false;
      }

      if (isEndItem && wasEndItemFullIntersecting) {
        endBoundaryChanged = true;
        state.endItemFullIntersecting = false;
      }
    }
  }

  //
  // Handle partial visibility changes
  //
  if (wasPartIntersecting !== partIntersecting) {
    visibilityChanged = true;

    if (partIntersecting) {
      //
      // Insert the item in the correct order
      //
      insertInOrder(state.partItems, slide, getItemIndex);
    } else {
      //
      // Remove the item
      //
      removeAtIndex(state.partItems, indexInPartItems);
    }
  }

  //
  // Return whether any visibility state changed, along with relevant data
  //
  return {
    changed: visibilityChanged || startBoundaryChanged || endBoundaryChanged,
    slide,
    fullIntersecting,
    partIntersecting,
    wasFullIntersecting,
    wasPartIntersecting,
    startBoundaryChanged,
    endBoundaryChanged,
  };
};

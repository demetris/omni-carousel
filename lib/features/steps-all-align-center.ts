import type { Context, ScrollDirection } from '../types';

import { updateBackwardButtons, updateForwardButtons } from './buttons';

import {
  getFallbackItem,
  getRectCenterX,
} from './utils';

import { internalConfig as internal} from '../core/internal-config';

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'one'
 *
 * Returns the next item to go to for a centered carousel with single-step scrolling
 *
 * Uses one of two paths:
 * 1. Calculation when necessary
 * 2. Fast navigation based on index when possible
 *
 * The optimized path (using indexes) is taken when:
 * 1. There is exactly one fully visible item, OR
 * 2. We have a cached centeredItemIndex from previous navigation
 *
 * @param context - The carousel context
 * @param direction - The direction to search in (left or right)
 *
 * @returns The found item to scroll to or the fallback item
 */
export const getCentermostItem = (
  context: Context,
  direction: ScrollDirection
): HTMLElement => {
  const { slides } = context.elements;
  const { fullItems, centeredItemIndex } = context.state;
  const { getItemIndex } = context.utils;
  const goingLeft = direction === 'left';

  let item;
  let itemIndex;

  //
  // Determine the best navigation strategy:
  //
  // Use the faster index-based approach if:
  // 1. There is exactly one fully visible item OR
  // 2. There is cached centeredItemIndex for an item that’s fully visible
  //
  // No. 2 is a crude way of checking if centeredItemIndex is stale,
  // which can happen when people scroll in ways the carousel does not manage.
  //
  // If both 1 and 2 are false, use the calculator to find the appropriate target
  //
  const oneFullItem = fullItems.length === 1;
  const validCenterIndex =
    centeredItemIndex !== -1
    && fullItems.some(item => getItemIndex(item) === centeredItemIndex)
  ;

  if (oneFullItem || validCenterIndex) {
    //
    // Determine the anchor index based on current state
    // Convert undefined to 0 with nullish coalescing to ensure we always have a number
    //
    const anchorIndex = oneFullItem
      ? getItemIndex(fullItems[0])
      : (centeredItemIndex ?? 0)
    ;

    //
    // Get adjacent item in the direction we are going
    // while making sure we don’t get out of bounds
    //
    itemIndex = goingLeft
      ? Math.max(0, anchorIndex - 1)
      : Math.min(slides.length - 1, anchorIndex + 1)
    ;

    item = slides[itemIndex];
  } else {
    item = calculateCentermostItem(context, direction);
    itemIndex = getItemIndex(item);
  }

  if (context.state.centeredItemIndex !== itemIndex) {
    context.state.previousCenteredItemIndex = context.state.centeredItemIndex;
    context.state.centeredItemIndex = itemIndex;

    //
    // @neededfor hasCenterMode:true
    //
    if (context.config.hasCenterMode) {
      updateBackwardButtons(context);
      updateForwardButtons(context);
    }
  }

  return item;
};

/**
 * Uses directional search to find the first item
 * on the appropriate side of the track center
 *
 * @param context - The carousel context
 * @param direction - The direction to search in (left or right)
 *
 * @returns The item to scroll to
 */
const calculateCentermostItem = (
  context: Context,
  direction: ScrollDirection
): HTMLElement => {
  const { track, slides } = context.elements;
  const { fullItems, partItems } = context.state;
  const { getItemIndex } = context.utils;
  const goingLeft = direction === 'left';

  const { centerTolerance } = internal;

  if (fullItems.length === 0 && partItems.length === 0) {
    return getFallbackItem(context, direction);
  }

  const visibleItems = [...fullItems, ...partItems].sort(
    (a, b) => getItemIndex(a) - getItemIndex(b)
  );

  const trackCenter = getRectCenterX(track);

  let item;

  if (goingLeft) {
    //
    // When going left:
    // Start from the penultimate visible item.
    // Search leftward for the first item that is left of the track center.
    //
    const startIndex = getItemIndex(visibleItems[visibleItems.length - 2]);

    //
    // IMPORTANT
    // Reverse the array to search from right to left!
    //
    const itemsToSearch = slides.slice(0, startIndex + 1).reverse();

    item = itemsToSearch.find(item => {
      const itemCenter = getRectCenterX(item);

      return itemCenter < trackCenter - centerTolerance;
    });
  } else {
    //
    // When going right:
    // Start from the second visible item.
    // Search rightward for the first item that is right of the track center.
    //
    const startIndex = getItemIndex(visibleItems[1]);

    const itemsToSearch = slides.slice(startIndex);

    item = itemsToSearch.find(item => {
      const itemCenter = getRectCenterX(item);

      return itemCenter > trackCenter + centerTolerance;
    });
  }

  return item || getFallbackItem(context, direction);
}

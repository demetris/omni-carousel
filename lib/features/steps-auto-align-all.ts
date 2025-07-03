import type { Context, InboundItems, ScrollDirection } from '../types';

import { getItemSpacing } from '../utils';

/**
 * @neededfor scrollSteps:'auto' + scrollAlign:'start'
 * @neededfor scrollSteps:'auto' + scrollAlign:'center'
 *
 * Gets the item(s) that would fit into view when scrolling in a direction
 *
 * Used to determine how many items to scroll at once in multi-step mode.
 * Chooses between algorithm for equal or unequal widths based on configuration value.
 *
 * @param context - The carousel context
 * @param direction - The direction to search in (left or right)
 *
 * @returns Information about the new items that would fit into view
 */
export const getInboundItems = (
  context: Context,
  direction: ScrollDirection
): InboundItems | false => {
  const { fullItems } = context.state;
  const { slides } = context.elements;
  const { getItemIndex } = context.utils;

  if (fullItems.length === 0) {
    return false;
  }

  const goingLeft = direction === 'left';
  const goingRight = !goingLeft;
  const firstFullItemIndex = fullItems.length > 0 ? getItemIndex(fullItems[0]) : -1;
  const lastFullItemIndex = fullItems.length > 0 ? getItemIndex(fullItems[fullItems.length - 1]) : -1;

  //
  // Exit early if we are at the edge in the direction we are going
  //
  if (
    (goingLeft && firstFullItemIndex === 0)
    || (goingRight && lastFullItemIndex === slides.length - 1)
  ) {
    return false;
  }

  return calculateInboundItems(context, direction);
};

/**
 * Helper for validating inbound items results
 *
 * Checks if the calculated items are valid and within bounds
 *
 * @param context - The carousel context
 * @param result - The calculated inbound items
 * @param goingLeft - Whether navigation is going left
 *
 * @returns The validated result or false if invalid
 */
const validateInboundItems = (
  context: Context,
  result: InboundItems,
  goingLeft: boolean
): InboundItems | false => {
  const { slides } = context.elements;

  if (result.count === 0) {
    return false;
  }

  //
  // Ensure startIndex is valid
  //
  if (result.startIndex < 0 || result.startIndex >= slides.length) {
    return false;
  }

  //
  // Ensure last item is also in bounds
  //
  const lastItemIndex = goingLeft
    ? result.startIndex
    : result.startIndex + result.count - 1
  ;

  if (lastItemIndex < 0 || lastItemIndex >= slides.length) {
    return false;
  }

  return result;
};

/**
 * Calculates inbound items
 *
 * @param context - The carousel context
 * @param direction - The direction to search in
 *
 * @returns Information about the new items that would fit into view
 */
const calculateInboundItems = (
  context: Context,
  direction: ScrollDirection
): InboundItems | false => {
  const { state, elements } = context;
  const { hasEqualWidths } = context.config;
  const { fullItems } = state;
  const { slides } = elements;
  const { getItemIndex, getItemWidth } = context.utils;

  const goingLeft = direction === 'left';
  const firstFullItemIndex = fullItems.length > 0 ? getItemIndex(fullItems[0]) : -1;
  const lastFullItemIndex = fullItems.length > 0 ? getItemIndex(fullItems[fullItems.length - 1]) : -1;
  const itemSpacing = getItemSpacing(context);
  const availableWidth = state.width;

  //
  // Determine starting point for checking items
  //
  const initialIndex = goingLeft ? firstFullItemIndex - 1 : lastFullItemIndex + 1;
  let startIndex = initialIndex;

  //
  // Start calculating how many items will fit
  //
  let accumulatedWidth = 0;
  let count = 0;
  let currentIndex = initialIndex;
  let i = 0;

  //
  // Loop condition varies by direction:
  // When going left we check if index >= 0.
  // When going right we check if index < slides.length.
  //
  while ((goingLeft ? currentIndex >= 0 : currentIndex < slides.length)) {
    let itemWidth;
    //
    // Calculate item width including spacing
    //
    // NOTE
    // The first item (i === 0) does not need spacing added!
    //
    if (i === 0) {
      if (hasEqualWidths && state.itemWidth !== undefined) {
        itemWidth = state.itemWidth;
      } else {
        itemWidth = getItemWidth(currentIndex);

        if (hasEqualWidths) {
          state.itemWidth = itemWidth;
        }
      }
    } else {
      const itemBaseWidth = hasEqualWidths && state.itemWidth !== undefined
        ? state.itemWidth
        : getItemWidth(currentIndex);

      itemWidth = itemBaseWidth + itemSpacing;
    }

    if (accumulatedWidth + itemWidth <= availableWidth) {
      accumulatedWidth += itemWidth;
      count++;

      //
      // When going left:
      //   startIndex is updated to the first (leftmost) item in the set.
      //
      // When going right:
      //   startIndex stays as initialIndex (first slide after last fully visible slide).
      //
      if (goingLeft) {
        startIndex = currentIndex;
      }

      //
      // Move to the next index based on direction
      //
      currentIndex += goingLeft ? -1 : 1;

      i++;
    } else {
      break;
    }
  }

  const result = { count, width: accumulatedWidth, startIndex } as const;

  return validateInboundItems(context, result, goingLeft);
};

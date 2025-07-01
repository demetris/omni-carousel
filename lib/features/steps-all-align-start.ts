import type { Context, ScrollDirection } from '../types';

/**
 * @neededfor scrollAlign:'start' + scrollSteps:'one'
 * @neededfor scrollAlign:'start' + scrollSteps:'many' (as fallback)
 *
 * Gets the adjacent item
 *
 * @param context - The carousel context
 * @param direction - The direction to search in
 *
 * @returns The adjacent item in the given direction
 */
export const getAdjacentItem = (
  context: Context,
  direction: ScrollDirection
): HTMLElement => {
  const { fullItems } = context.state;
  const { slides } = context.elements;
  const { getItemIndex } = context.utils;
  const goingLeft = direction === 'left';

  const anchor = fullItems[0];
  const anchorIndex = getItemIndex(anchor);

  //
  // Calculate target index based on direction
  //
  const targetIndex = goingLeft
    ? Math.max(0, anchorIndex - 1)
    : Math.min(slides.length - 1, anchorIndex + 1)
  ;

  //
  // Return the target item or fallback to anchor if index is unchanged
  //
  return targetIndex !== anchorIndex
    ? slides[targetIndex]
    : anchor
  ;
};

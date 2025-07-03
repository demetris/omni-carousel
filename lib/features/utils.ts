import type { Context, ScrollDirection } from '../types';

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'one'
 * @neededfor indicators
 *
 * Gets the center X coordinate of an element’s bounding rectangle
 *
 * @param element - The element to measure
 *
 * @returns The center X coordinate
 */
export const getRectCenterX = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();

  return rect.left + (rect.width / 2);
};

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'auto'
 * @neededfor indicators
 *
 * Calculates the scroll position needed to center a set of items in a container
 *
 * Used for centering both slides in the track and overflowing indicators in their container.
 *
 * @param container - The scrollable container element
 * @param startItem - The first element in the set to center
 * @param width - The total width of the set to center
 *
 * @returns The scroll position needed to center a set of items
 */
export const calculateCenterScrollPosition = (
  context: Context,
  container: HTMLElement,
  startItem: HTMLElement,
  width: number
): number => {
  //
  // Get measurements in a single batch
  //
  const measurements = (() => {
    const containerWidth = context.state.width;
    const containerLeft = context.utils.getContainerLeft();
    const startItemRect = startItem.getBoundingClientRect();

    return {
      containerWidth,

      //
      // Calculate the left position of the start item relative to the container
      //
      startLeft: startItemRect.left - containerLeft + container.scrollLeft
    } as const;
  })();

  //
  // Calculate the center point
  //
  const leftOffset = Math.max(0, (measurements.containerWidth - width) / 2);

  return measurements.startLeft - leftOffset;
};

/**
 * Gets a fallback item when visibility arrays may be empty
 *
 * Provides a reliable default even when no items are visible.
 *
 * @param context - The carousel context
 * @param direction - The direction to search in (left or right)
 *
 * @returns A fallback item
 */
export const getFallbackItem = (
  context: Context,
  direction: ScrollDirection
): HTMLElement => {
  const { fullItems, partItems } = context.state;
  const { slides } = context.elements;
  const goingLeft = direction === 'left';

  if (fullItems.length > 0) {
    return goingLeft ? fullItems[0] : fullItems[fullItems.length - 1];
  } else if (partItems.length > 0) {
    return goingLeft ? partItems[0] : partItems[partItems.length - 1];
  }

  return goingLeft ? slides[0] : slides[slides.length - 1];
};

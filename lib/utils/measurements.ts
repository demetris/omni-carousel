import type { Context } from '../types';

/**
 * @neededfor scrollSteps:'many'
 *
 * Measures spacing between carousel slides
 *
 * Calculates the horizontal gap between slides by measuring
 * the gap between the first and the second slide.
 *
 * @param context
 *
 * @returns The spacing (gap) between slides in pixels
 */
export const getItemSpacing = (context: Context): number => {
  const { slides } = context.elements;
  const { itemSpacing } = context.state;

  if (itemSpacing) {
    return itemSpacing;
  }

  const rect1 = slides[0].getBoundingClientRect();
  const rect2 = slides[1].getBoundingClientRect();
  const spacing = rect2.left - rect1.right;

  context.state.itemSpacing = spacing;

  return spacing;
}

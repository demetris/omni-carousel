import type { Context } from '../types';

import { internalConfig } from '../core/internal-config';

/**
 * @needed for scrollAlign:'center' + scrollSteps:'auto'
 *
 * Creates or retrieves the invisible anchor element
 *
 * @param context - The carousel context
 * @param [forceNew=false] - Whether to reuse existing element or create new one
 *
 * @returns - The invisible anchor element
 */
export const createInvisibleAnchor = (
  context: Context,
  forceNew = false
): HTMLElement => {
  const { elements } = context;
  const { track } = elements;

  //
  // Check if we already have an invisibleAnchor element in state and should reuse it
  //
  const { selectors } = internalConfig;
  const selector = selectors.invisibleAnchor;

  if (!forceNew) {
    const existingInvisibleAnchor = track.querySelector(selector) as HTMLElement;

    if (existingInvisibleAnchor) {
      return existingInvisibleAnchor;
    }
  }

  const invisibleAnchor = document.createElement('div');

  invisibleAnchor.classList.add('omni-invisible-anchor');

  invisibleAnchor.style.position = 'absolute';
  invisibleAnchor.style.pointerEvents = 'none';
  invisibleAnchor.style.top = '50%';
  invisibleAnchor.style.transform = 'translateY(-50%)';
  invisibleAnchor.style.scrollSnapAlign = 'center';

  track.appendChild(invisibleAnchor);

  elements.invisibleAnchor = invisibleAnchor;

  return invisibleAnchor;
};

/**
 * Places the invisible anchor element at a specific position with specified width
 *
 * @param context - The carousel context
 * @param leftPosition - The position to place the invisible anchor
 * @param [width] - Optional width to set on the invisible anchor (in pixels)
 * @param [forceNew=false] - Whether to reuse existing element or create new one
 *
 * @returns - The positioned invisible anchor element
 */
export const placeInvisibleAnchor = (
  context: Context,
  position: number,
  width?: number,
  forceNew = false
): HTMLElement => {
  const invisibleAnchor = createInvisibleAnchor(context, forceNew);

  invisibleAnchor.style.left = `${position}px`;

  if (width !== undefined) {
    invisibleAnchor.style.width = `${width}px`;
  }

  return invisibleAnchor;
};

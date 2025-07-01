import type { Context } from '../types';

import { centerIndicators } from '../features/indicators';

/**
 * @neededfor indicators
 *
 * Starts centering indicators when the track finishes scrolling
 *
 * @param context - The carousel context
 */
export const startIndicatorCentering = (context: Context): void => {
  if (!context.state.indicatorOverflow) {
    return;
  }

  //
  // IMPORTANT!
  //
  // Add minimal delay before calling centerIndicators
  //
  // This ensures the DOM has updated and measurements are accurate,
  // particularly in browsers with instant scrolling (reduced motion).
  //
  setTimeout(() => {
    centerIndicators(context);
  }, 1);
};

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'many'
 *
 * Removes old invisible anchor elements when the track finishes scrolling
 *
 * Only runs on Blink browsers that support scrollend to improve smooth scrolling behavior
 *
 * @param context - The carousel context
 */
export const removeInvisibleAnchors = (context: Context): void => {
  //
  // Early return if we haven’t created multiple invisible anchors
  //
  if (!context.state.hasOldInvisibleAnchors) {
    return;
  }

  const { track } = context.elements;

  //
  // Remove all invisible anchors except the last one (most recent)
  //
  const oldAnchors = track.querySelectorAll('.omni-invisible-anchor:not(:last-child)');

  oldAnchors.forEach(anchor => anchor.remove());

  //
  // Reset flag since we’ve cleaned up all old anchors
  //
  context.state.hasOldInvisibleAnchors = false;
};

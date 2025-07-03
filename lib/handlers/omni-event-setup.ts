import type { Context, InitialState } from '../types';

import {
  getScrollSnapAlign,
  setElementAttributes,
  ensureTrackPositioned
} from '../dom';

import {
  addIndicators,
  storeIndicators,
  updateIndicatorOverflow
} from '../features';

import { populateMaps } from '../state';

/**
 * Sets up all UI components and interactions for the carousel
 *
 * Called from the omni:setup listener.
 */
export const handleSetup = (
  context: Context,
  initialState: InitialState,
  intersectionObserver: IntersectionObserver,
  addEventListeners: () => void
): void => {
  const { elements, state, config } = context;

  //
  // Detect scroll alignment preference from the first slide
  //
  // Always prioritize CSS scroll-snap-align if available!
  //
  const detectedAlignment = getScrollSnapAlign(elements.slides[0]);
  if (detectedAlignment) {
    config.scrollAlign = detectedAlignment;
  }

  //
  // Create indicators, store reference in the context, update state
  //
  const indicators = addIndicators(context);
  storeIndicators(context, indicators);
  state.hasIndicators = indicators.length > 0;

  //
  // Check and store overflow state of indicators
  //
  if (state.hasIndicators) {
    updateIndicatorOverflow(context);
  }

  populateMaps(context);

  //
  // Ensure track is positioned for invisible element technique if needed
  //
  if (config.scrollAlign === 'center' && config.scrollSteps === 'auto') {
    ensureTrackPositioned(context, initialState);
  }

  setElementAttributes(context);

  elements.slides.forEach(slide => intersectionObserver.observe(slide));

  addEventListeners();
}

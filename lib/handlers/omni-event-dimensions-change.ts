import type { Context } from '../core';

import { updateIndicatorOverflow } from '../features';

/**
 * Refreshes cached layout data when dimensions change
 */
export const updateLayoutData = (
  context: Context,
  intersectionObserver: IntersectionObserver
): void => {
  const { state } = context;
  const { slides } = context.elements;

  state.fullItems = [];
  state.partItems = [];
  state.startItemFullIntersecting = false;
  state.endItemFullIntersecting = false;

  state.itemWidth = undefined;
  state.containerLeft = undefined;
  state.itemWidthMap.clear();

  if (state.hasIndicators) {
    updateIndicatorOverflow(context);
  }

  //
  // Restart intersection observer to get fresh data
  //
  intersectionObserver.disconnect();
  slides.forEach(slide => intersectionObserver.observe(slide));
}

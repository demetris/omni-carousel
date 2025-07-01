import type { Context } from '../types';

import {
  updateItem,
  updateCenterGroupItem
} from  '../dom';

import {
  updateBackwardButtons,
  updateForwardButtons,
  updateIndicator,
} from '../features';

import {
  supportsScrollend
} from '../utils';

/**
 * Updates UI elements based on visibility state
 *
 * Updates slides, navigation buttons, and indicators
 */
export const updateUI = (context: Context, data: {
  slide: HTMLElement;
  fullIntersecting: boolean;
  partIntersecting: boolean;
  wasFullIntersecting: boolean;
  wasPartIntersecting: boolean;
  startBoundaryChanged: boolean;
  endBoundaryChanged: boolean;
}): void => {
  const { utils } = context;
  const {
    slide,
    fullIntersecting,
    partIntersecting,
    wasFullIntersecting,
    wasPartIntersecting,
  } = data;

  updateItem(
    context,
    slide,
    fullIntersecting,
    partIntersecting,
    wasFullIntersecting,
    wasPartIntersecting,
  );

  if (data.startBoundaryChanged) {
    updateBackwardButtons(context);
  }

  if (data.endBoundaryChanged) {
    updateForwardButtons(context);
  }

  if (context.state.hasIndicators) {
    const index = utils.getItemIndex(slide);

    updateIndicator(context, index, fullIntersecting, partIntersecting);

    //
    // Fallback for browsers without scrollend support (e.g., Safari):
    // Center indicators with debounced function after visibility changes.
    //
    // For browsers with scrollend support,
    // we just call centerIndicators on track scrollend.
    //
    if (
      context.state.indicatorOverflow
      && !supportsScrollend()
      && context.state.debouncedCenterIndicators
    ) {
      context.state.debouncedCenterIndicators(context);
    }
  }

  if (
    context.config.hasEqualWidths === false
    && context.config.scrollSteps === 'many'
    && context.config.scrollAlign === 'center'
  ) {
    updateCenterGroupItem(context);
  }
}

/**
 * Preloads images in adjacent slides by removing loading="lazy"
 */
export const preloadImages = (context: Context): void => {
  const { elements, state } = context;
  const { slides } = elements;

  //
  // Get all visible slides (both fully and partially visible)
  //
  const visibleSlides = [...state.fullItems, ...state.partItems];

  if (visibleSlides.length === 0) {
    return;
  }

  //
  // Find boundary indexes
  //
  const firstVisibleIndex = slides.indexOf(visibleSlides[0]);
  const lastVisibleIndex = slides.indexOf(visibleSlides[visibleSlides.length - 1]);

  //
  // Determine which slides should preload
  //
  const adjacentIndexes = new Set<number>();

  //
  // Add the slide before first visible
  //
  if (firstVisibleIndex > 0) {
    adjacentIndexes.add(firstVisibleIndex - 1);
  }

  //
  // Add the slide after last visible
  //
  if (lastVisibleIndex < slides.length - 1) {
    adjacentIndexes.add(lastVisibleIndex + 1);
  }

  //
  // Process adjacent slides
  //
  adjacentIndexes.forEach(index => {
    const slide = slides[index];
    const lazyImages = slide.querySelectorAll<HTMLImageElement>('img[loading="lazy"]');

    lazyImages.forEach(img => {
      img.removeAttribute('loading');
    });
  });
};

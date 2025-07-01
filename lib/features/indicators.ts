import type { Context } from '../core';

import { internalConfig as internal } from '../core';
import { calculateCenterScrollPosition } from './utils';

/**
 * @neededfor indicators
 *
 * Removes all indicator buttons from the indicator area
 *
 * @param context - The carousel context
 */
export const clearIndicators = (context: Context): void => {
  const { indicatorArea } = context.elements;

  if (!indicatorArea) {
    return;
  }

  indicatorArea.replaceChildren();
};

/**
 * @neededfor indicators
 *
 * Creates indicator buttons for the carousel with appropriate attributes
 *
 * @param context - The carousel context
 *
 * @returns Array of created indicator buttons
 */
export const addIndicators = (context: Context): HTMLButtonElement[] => {
  const { indicatorArea } = context.elements;

  if (!indicatorArea) {
    return [];
  }

  const { slides, track } = context.elements;
  const { indicatorNumbers } = context.config;

  const trackID = track.id;
  const fragment = document.createDocumentFragment();
  const slidesLength = slides.length;
  const indicators: HTMLButtonElement[] = Array(slidesLength);

  for (let index = 0; index < slidesLength; index++) {
    const indicator = document.createElement('button');
    indicator.type = 'button';

    indicator.setAttribute('data-omni-indicator', `${index}`);
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);

    if (indicatorNumbers) {
      const number = document.createElement('span');
      number.textContent = `${index + 1}`;
      indicator.appendChild(number);
    }

    if (trackID) {
      indicator.setAttribute('aria-controls', trackID);
    }

    fragment.appendChild(indicator);
    indicators[index] = indicator;
  }

  indicatorArea.appendChild(fragment);

  return indicators;
};

/**
 * @neededfor indicators
 *
 * Updates the indicator for a specific slide
 *
 * Sets appropriate attributes and classes based on current visibility state.
 *
 * @param context - The carousel context
 * @param index - The index of the slide
 * @param fullIntersecting - Whether the slide is fully visible
 * @param partIntersecting - Whether the slide is partially visible
 */
export const updateIndicator = (
  context: Context,
  index: number,
  fullIntersecting: boolean,
  partIntersecting: boolean
): void => {
  const indicator = context.elements.indicators[index];
  const { classes } = internal;

  indicator.toggleAttribute('aria-current', fullIntersecting);
  indicator.classList.toggle(classes.indicatorCurrent, fullIntersecting);
  indicator.classList.toggle(classes.indicatorPartCurrent, partIntersecting);
};

/**
 * @neededfor indicators
 *
 * Updates indicator overflow if it changed and returns whether it changed
 *
 * @param context - The carousel context
 *
 * @returns Boolean indicating whether overflow state changed
 */
export const updateIndicatorOverflow = (context: Context): boolean => {
  const { state } = context;
  const { indicatorArea } = context.elements;

  const overflow = indicatorArea
    ? indicatorArea.scrollWidth > indicatorArea.clientWidth
    : false
  ;

  const overflowChanged = state.indicatorOverflow !== overflow;

  if (overflowChanged) {
    state.indicatorOverflow = overflow;

    //
    // Toggle the indicator overflow class on the root element
    //
    context.elements.root.classList.toggle(internal.classes.indicatorOverflowing, overflow);
  }

  return overflowChanged;
};

/**
 * @neededfor indicators
 *
 * Centers indicators on the current one(s) when they overflow
 *
 * When indicators overflow their container, this function ensures that
 * indicators for the currently visible slides are
 * visible and, if possible, centered in the view.
 *
 * @param context - The carousel context
 */
export const centerIndicators = (context: Context): void => {
  const { state } = context;
  const { indicatorArea } = context.elements;

  if (!indicatorArea) {
    return;
  }

  const { indicators } = context.elements;

  //
  // Get indicators for fully visible slides
  //
  const currentIndicators = state.fullItems
    .map(slide => {
      const index = context.utils.getItemIndex(slide);
      return indicators[index];
    }).filter((indicator): indicator is HTMLButtonElement => indicator !== undefined)
  ;

  if (currentIndicators.length === 0) {
    return;
  }

  //
  // We need spacing between indicators and also indicator width.
  // If we don’t have them, we measure them and store them in the state.
  //
  // @todo: Account for the case when the indicators have different widths
  //
  let indicatorWidth;
  let indicatorSpacing;

  if (state.indicatorWidth && state.indicatorSpacing) {
    indicatorWidth = state.indicatorWidth;
    indicatorSpacing = state.indicatorSpacing;
  } else {
    const rect1 = indicators[0].getBoundingClientRect();
    const rect2 = indicators[1].getBoundingClientRect();

    indicatorSpacing = rect2.left - rect1.right;
    indicatorWidth = rect1.width;

    state.indicatorSpacing = indicatorSpacing;
    state.indicatorWidth = indicatorWidth;
  }

  const firstItem = currentIndicators[0];
  const count = currentIndicators.length;
  const totalWidth = (indicatorWidth * count) + (indicatorSpacing * (count - 1));

  //
  // Calculate and apply scroll position
  //
  const scrollPosition = calculateCenterScrollPosition(
    context,
    indicatorArea,
    firstItem,
    totalWidth
  );

  indicatorArea.scrollTo({
    left: scrollPosition,
    behavior: internal.scrollBehavior,
  });
};

/**
 * @neededfor indicators + scrollAlign:'start'
 *
 * Determines scroll alignment for indicator navigation based on
 * the indicator’s position relative to currently visible slides
 *
 * @param context - The carousel context
 * @param index - Item index for indicator navigation
 *
 * @returns 'start' or 'end' scroll alignment based on position
 */
export const determineAlignmentForIndicator = (
  context: Context,
  index: number
): ScrollLogicalPosition => {
  const { fullItems, partItems } = context.state;
  const { getItemIndex } = context.utils;

  //
  // Determine index of rightmost visible item
  //
  let lastVisibleItemIndex = -1;

  if (fullItems.length > 0) {
    const lastFullItem = fullItems[fullItems.length - 1];

    lastVisibleItemIndex = getItemIndex(lastFullItem);
 } else if (partItems.length > 0) {
    const lastPartItem = partItems[partItems.length - 1];

    lastVisibleItemIndex = getItemIndex(lastPartItem);
  }

  //
  // If target is to the right of the last visible item,
  // align it to the end. Otherwise align to the start.
  //
  return (index > lastVisibleItemIndex) ? 'end' : 'start';
};

//
// @neededfor indicators
//
export const storeIndicators = (
  context: Context,
  indicators: HTMLButtonElement[]
): void => {
  context.elements.indicators = indicators;
};

import type { ScrollAlign, Context } from '../types';

import { internalConfig as internal } from '../core/internal-config';

/**
 * Gets CSS scroll-snap-align value of an element to use as preferred scroll alignment
 *
 * @param element - The element to check
 *
 * @returns 'center' for center, 'start' for start or end, undefined for no value
 */
export const getScrollSnapAlign = (element: HTMLElement): ScrollAlign | undefined => {
  const computedStyle = window.getComputedStyle(element);
  const alignValue = computedStyle.scrollSnapAlign;

  if (!alignValue) {
    return undefined;
  }

  //
  // Check if the value contains 'center'.
  // This check handles both 'center' and 'center center'.
  //
  return alignValue.includes('center') ? 'center' : 'start';
};

/**
 * Updates visibility classes of a slide based on intersection state
 *
 * @param context - The carousel context
 * @param slide - The slide element to update
 * @param fullIntersecting - Whether the slide is fully visible
 * @param partIntersecting - Whether the slide is partially visible
 */
export const updateItem = (
  context: Context,
  slide: HTMLElement,
  fullIntersecting: boolean,
  partIntersecting: boolean,
  wasFullIntersecting: boolean,
  wasPartIntersecting: boolean
): void => {
  const { transitionHelpers } = context.config;
  const { classes } = internal;

  slide.classList.toggle(classes.itemCurrent, fullIntersecting);
  slide.classList.toggle(classes.itemPartCurrent, partIntersecting);

  if (!transitionHelpers) {
    return;
  }

  const wasIntersecting = wasFullIntersecting || wasPartIntersecting;

  if (wasFullIntersecting && partIntersecting) {
    slide.classList.remove(classes.itemEntering);
    slide.classList.add(classes.itemExiting);
  } else if (!wasIntersecting && partIntersecting) {
    slide.classList.remove(classes.itemExiting);
    slide.classList.add(classes.itemEntering);
  }
};

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'one'
 *
 * Adds the centerItem class to the item currently in the center
 *
 * @param context - The carousel context
 */
export const updateCenterItem = (
  context: Context,
): void => {
  const { slides } = context.elements;
  const { centeredItemIndex, previousCenteredItemIndex } = context.state;
  const { itemCentered } = internal.classes;

  if (previousCenteredItemIndex !== undefined) {
    slides[previousCenteredItemIndex].classList.remove(itemCentered);
  }

  if (centeredItemIndex !== undefined) {
    slides[centeredItemIndex].classList.add(itemCentered);
  }
}

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'many' AND hasEqualWidths: false
 *
 * Updates CSS classes for slides that are part of the centered group
 * Adds/removes the centerGroupItem class to slides that are part of the centered group
 *
 * @param context - The carousel context
 */
export const updateCenterGroupItem = (
  context: Context
): void => {
  const { elements, state, config } = context;
  const { slides } = elements;
  const { previousCenteredGroupItems, centeredGroupItems } = state;
  const { hasEqualWidths, scrollSteps, scrollAlign } = config;
  const { itemGroupCentered } = internal.classes;

  if (
    hasEqualWidths == true
    || scrollAlign !== 'center'
    || scrollSteps !== 'many'
  ) {
    return;
  }

  //
  // Remove the class from slides that are no longer in the centered group
  //
  previousCenteredGroupItems.forEach(index => {
    slides[index].classList.remove(itemGroupCentered);
  });

  //
  // Add the class to slides that are now in the centered group
  //
  centeredGroupItems.forEach(index => {
    slides[index].classList.add(itemGroupCentered);
  });
}

/**
 * Removes all current state classes from a slide
 *
 * @param context - The carousel context
 * @param slide - The slide element to clean up
 */
export const clearItemAttributes = (
  slide: HTMLElement
): void => {
  const { classes } = internal;

  slide.classList.remove(
    classes.itemCurrent,
    classes.itemPartCurrent,
    classes.itemCentered,
    classes.itemGroupCentered
  );
};

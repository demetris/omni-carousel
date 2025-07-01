import type { Context } from '../types';

import { internalConfig as internal } from '../core/internal-config';

/**
 * Handles the transitionend event for the carousel slides
 *
 * @param context - The carousel context
 * @param event - The transitionend event
 */
export const updateItemTransitionClasses = (
  context: Context,
  event: TransitionEvent
): void => {
  if (!event.target) {
    return;
  }

  const target = event.target as HTMLElement;
  const { selectors } = context.config;

  const slide = target.closest(selectors.slide);

  if (!slide) {
    return;
  }

  const { classes } = internal;

  slide.classList.remove(classes.itemEntering, classes.itemExiting);
};

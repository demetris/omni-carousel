import type { Context } from '../core';

/**
 * Updates the previous and start button states based on whether the first item is fully visible
 *
 * @param context - The carousel context
 */
export const updateBackwardButtons = (context: Context): void => {
  const { prevButton, startButton } = context.elements;
  const { startItemFullIntersecting } = context.state;

  prevButton?.toggleAttribute('disabled', startItemFullIntersecting);
  startButton?.toggleAttribute('disabled', startItemFullIntersecting);
};

/**
 * Updates the next and end button states based on whether the last item is fully visible
 *
 * @param context - The carousel context
 */
export const updateForwardButtons = (context: Context): void => {
  const { nextButton, endButton } = context.elements;
  const { endItemFullIntersecting } = context.state;

  nextButton?.toggleAttribute('disabled', endItemFullIntersecting);
  endButton?.toggleAttribute('disabled', endItemFullIntersecting);
};

/**
 * Updates all navigation buttons based on current state
 *
 * @param context - The carousel context
 */
export const updateButtons = (context: Context): void => {
  updateBackwardButtons(context);
  updateForwardButtons(context);
};

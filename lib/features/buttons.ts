import type { Context } from '../types';

/**
 * Updates the previous and start button states based on current position
 *
 * @param context - The carousel context
 */
export const updateBackwardButtons = (context: Context): void => {
  const { prevButton, startButton } = context.elements;
  const { startItemFullIntersecting, centeredItemIndex } = context.state;
  const { hasCenterMode } = context.config;

  let atStart;

  if (hasCenterMode) {
    //
    // @neededfor hasCenterMode:true
    //
     atStart =
      startItemFullIntersecting
      && (centeredItemIndex === 0)
    ;
  } else {
    atStart = startItemFullIntersecting;
  }

  prevButton?.toggleAttribute('disabled', atStart);
  startButton?.toggleAttribute('disabled', atStart);
};

/**
 * Updates the next and end button states based on current position
 *
 * @param context - The carousel context
 */
export const updateForwardButtons = (context: Context): void => {
  const { nextButton, endButton } = context.elements;
  const { endItemFullIntersecting, centeredItemIndex } = context.state;
  const { hasCenterMode } = context.config;
  const { slides } = context.elements;

  let atEnd;

  if (hasCenterMode) {
    //
    // @neededfor hasCenterMode:true
    //
    atEnd =
      endItemFullIntersecting
      && (centeredItemIndex === slides.length - 1)
    ;
  } else {
    atEnd = endItemFullIntersecting;
  }

  nextButton?.toggleAttribute('disabled', atEnd);
  endButton?.toggleAttribute('disabled', atEnd);
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

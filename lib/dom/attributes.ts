import type { Context, InitialState } from '../types';

import { internalConfig as internal } from '../core/internal-config';

/**
 * Captures the initial state of attributes for later restoration
 *
 * @param context - The carousel context
 * @param initialState - The object to store initial attribute state in
 */
export const captureInitialAttributes = (
  context: Context,
  initialState: InitialState
): void => {
  const { prevButton, nextButton, startButton, endButton } = context.elements;

  if (initialState.buttonAttributes?.size > 0) {
    return;
  }

  [prevButton, nextButton, startButton, endButton]
    .filter((button): button is HTMLButtonElement => button !== undefined)
    .forEach(button => {
      initialState.buttonAttributes.set(button, {
        disabled: button.hasAttribute('disabled'),
        hidden: button.hasAttribute('hidden')
      });
    }
  );
};

/**
 * Sets accessibility attributes for carousel elements
 *
 * Adds CSS class to the carousel
 * Adds attributes to indicators
 *
 * @param context - The carousel context
 */
export const setElementAttributes = (context: Context): void => {
  const { root, indicators, prevButton, nextButton, startButton, endButton } = context.elements;

  root.classList.add(internal.classes.setupComplete);

  indicators.forEach((indicator, index) => {
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
  });

  //
  // Remove hidden attribute from buttons to make them accessible
  //
  [prevButton, nextButton, startButton, endButton]
    .filter((button): button is HTMLButtonElement => button !== undefined)
    .forEach(button => {
      button.removeAttribute('hidden');
    });
};

/**
 * Resets attributes to their initial state
 *
 * Removes CSS class added to the carousel.
 * Restores initial disabled state of buttons.
 *
 * @param context - The carousel context
 * @param initialState - The initial state of attributes
 */
export const resetElementAttributes = (
  context: Context,
  initialState: InitialState
): void => {
  const { root, track } = context.elements;
  const { state } = context;

  root.classList.remove(internal.classes.setupComplete);

  //
  // Restore button states
  //
  initialState.buttonAttributes.forEach((initialState: { disabled: boolean; hidden: boolean; }, button: HTMLButtonElement) => {
    button.toggleAttribute('disabled', initialState.disabled);
    button.toggleAttribute('hidden', initialState.hidden);
  });

  //
  // Restore track position if we changed it
  //
  if (state.addedTrackCSSPosition && initialState.trackCSSPosition !== undefined) {
    track.style.position = initialState.trackCSSPosition;
    //
    // Clear the state flag
    //
    state.addedTrackCSSPosition = false;
  }
};

/**
 * Ensures the track element has a positioning context for invisible anchors
 *
 * If the track has position:static (default), sets it to position:relative
 * and records this change for later restoration.
 *
 * @param context - The carousel context
 * @param initialState - The initial state storage
 */
export const ensureTrackPositioned = (
  context: Context,
  initialState: InitialState
): void => {
  const { track } = context.elements;
  const { state } = context;

  const computedPosition = window.getComputedStyle(track).position;

  if (computedPosition === 'static') {
    //
    // Store the initial value for restoration
    //
    initialState.trackCSSPosition = 'static';

    //
    // Apply position:relative to create positioning context
    //
    track.style.position = 'relative';

    //
    // Set flag in state to track that we modified it
    //
    state.addedTrackCSSPosition = true;
  } else {
    //
    // Track is already positioned, no action needed
    //
    state.addedTrackCSSPosition = false;
  }
};

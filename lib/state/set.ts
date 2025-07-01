import type { Context, State, Config } from '../types';

import { centerIndicators } from '../features';
import { debounce } from '../utils/debounce';
import { supportsScrollend, hasBlinkEngine } from '../utils/browser-support';
import { internalConfig as internal } from '../core/internal-config';

/**
 * Creates and initializes the carousel state
 *
 * @param trackWidth - The initial width of the track element
 * @param trackScrollWidth - The initial scroll width of the track element
 * @param [config] - The carousel configuration (only required for browsers without scrollend support)
 *
 * @returns A new state object with initial values
 */
export const createState = (
  trackWidth: number,
  trackScrollWidth: number,
  config?: Config
): State => {
  //
  // Create debounced function for browsers without scrollend support
  //
  const debouncedCenterIndicators = !supportsScrollend() && config
    ? debounce((context: Context) => centerIndicators(context), internal.scrollendTimeoutDelay)
    : undefined
  ;

  return {
    width: trackWidth,
    scrollWidth: trackScrollWidth,
    // containerLeft: undefined by default, will be calculated lazily when needed

    fullItems: [],
    partItems: [],
    startItemFullIntersecting: false,
    endItemFullIntersecting: false,
    hasIndicators: false,
    indicatorOverflow: false,

    slideIndexMap: new Map<HTMLElement, number>(),
    itemWidthMap: new Map<number, number>(),

    detectedBlinkEngine: hasBlinkEngine(),

    centeredGroupItems: [],
    previousCenteredGroupItems: [],

    debouncedCenterIndicators
  };
};

/**
 * Populates index maps for slides and indicators
 *
 * The maps map DOM elements to their corresponding indexes
 * for both slides and indicator buttons (if they exist).
 *
 * NOTE
 * This function assumes the maps have already been cleared
 * in a partial destroy by handleDestroy.
 *
 * @param context - The carousel context
 */
export const populateMaps = (context: Context): void => {
  const { elements, state } = context;
  const { slides } = elements;

  //
  // Create and populate maps directly using Map constructor with array of key-value pairs
  //
  state.slideIndexMap = new Map(
    slides.map((slide, index): [HTMLElement, number] => [slide, index])
  );
};

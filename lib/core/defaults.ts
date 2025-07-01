import type { Selectors } from './types';

/**
 * Default selectors for the carousel elements
 */
const defaultSelectors: Selectors = {
  track: '[data-omni-track]',
  slide: '[data-omni-slide]',
  prevButton: '[data-omni-button-prev]',
  nextButton: '[data-omni-button-next]',
  startButton: '[data-omni-button-start]',
  endButton: '[data-omni-button-end]',
  indicatorArea: '[data-omni-indicators]',
  indicator: '[data-omni-indicator]',
};

/**
 * Default configuration for the carousel
 */
export const defaults = {
  scrollAlign: 'start',
  scrollSteps: 'one',

  selectors: defaultSelectors,

  hasEqualWidths: true,
  indicatorNumbers: false,
  transitionHelpers: false,
  preloadAdjacentImages: false,
} as const;

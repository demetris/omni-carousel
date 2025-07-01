import type { OmniElements, Selectors } from '../types';

/**
 * Gets all necessary DOM elements for the carousel
 *
 * @param carousel - The carousel container element
 * @param selectors - The selectors configuration
 *
 * @returns Object with all carousel elements
 *
 * @throws Error if required elements (track or slides) are missing
 */
export const getElements = (root: HTMLElement, selectors: Selectors): OmniElements => {
  const track = root.querySelector<HTMLElement>(selectors.track);
  const slides = [...root.querySelectorAll<HTMLElement>(selectors.slide)];
  const prevButton = root.querySelector<HTMLButtonElement>(selectors.prevButton) || undefined;
  const nextButton = root.querySelector<HTMLButtonElement>(selectors.nextButton) || undefined;
  const startButton = root.querySelector<HTMLButtonElement>(selectors.startButton) || undefined;
  const endButton = root.querySelector<HTMLButtonElement>(selectors.endButton) || undefined;
  const indicatorArea = root.querySelector<HTMLElement>(selectors.indicatorArea) || undefined;

  if (!track || slides.length < 2) {
    throw new Error('Carousel requires a track and at least 2 slides.');
  }

  return {
    root,
    track,
    slides,
    prevButton,
    nextButton,
    startButton,
    endButton,
    indicatorArea,
  };
};

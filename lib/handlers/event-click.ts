import type { Context } from '../core';

/**
 * Handles button click events for carousel navigation
 *
 * 1. Determines what button was clicked (indicator, prev/next/start/end)
 * 2. Emits the appropriate navigation event
 *
 * @param context - The carousel context
 * @param event - The click event
 */
export const handleClick = (
  context: Context,
  event: Event
): void => {
  const target = event.target;

  if (!target || !(target instanceof Element)) {
    return;
  }

  const button = target instanceof HTMLButtonElement
    ? target
    : target.closest('button')
  ;

  if (!button) {
    return;
  }

  const { eventEmitter } = context;
  const { prevButton, nextButton, startButton, endButton } = context.elements;

  if (button === prevButton) {
    eventEmitter.emit('omni:nav:prev');
  } else if (button === nextButton) {
    eventEmitter.emit('omni:nav:next');
  } else if (button === startButton) {
    eventEmitter.emit('omni:nav:index', { index: 0 });
  } else if (button === endButton) {
    eventEmitter.emit('omni:nav:index', { index: context.elements.slides.length - 1 });
  } else if (button.parentElement === context.elements.indicatorArea) {
    const indicatorIndex = context.elements.indicators.indexOf(button);

    if (indicatorIndex !== -1 && indicatorIndex < context.elements.slides.length) {
      eventEmitter.emit('omni:nav:index', { index: indicatorIndex });
    }
  }
};

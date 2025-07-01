import type { Context } from '../types';

/**
 * Handles keyboard events for carousel navigation
 *
 * Checks if the active element is within the carousel track.
 * Processes arrow keys for prev/next navigation.
 * Processes home/end keys for start/end navigation.
 * Emits the appropriate navigation event.
 *
 * @param context - The carousel context
 * @param event - The keyboard event
 */
export const handleKeyboard = (
  context: Context,
  event: KeyboardEvent
): void => {
  const { elements, state, eventEmitter } = context;
  const { root, track } = elements;

  const activeElement = document.activeElement;

  if (!root.contains(activeElement) || activeElement !== track) {
    return;
  }

  if (event.key === 'ArrowLeft' && !state.startItemFullIntersecting) {
    event.preventDefault();
    eventEmitter.emit('omni:nav:prev');
  } else if (event.key === 'ArrowRight' && !state.endItemFullIntersecting) {
    event.preventDefault();
    eventEmitter.emit('omni:nav:next');
  } else if (event.key === 'Home' && !state.startItemFullIntersecting) {
    event.preventDefault();
    eventEmitter.emit('omni:nav:index', { index: 0 });
  } else if (event.key === 'End' && !state.endItemFullIntersecting) {
    event.preventDefault();
    eventEmitter.emit('omni:nav:index', { index: elements.slides.length - 1 });
  }
};

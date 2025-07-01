import type { Emitter } from 'nanoevents';
import type { Context, OmniEvents, InitialState } from '../types';
import { internalConfig as internal } from '../core/internal-config';

import {
  clearItemAttributes,
  resetElementAttributes,
} from '../dom';

import {
  clearIndicators,
  storeIndicators,
} from '../features';

/**
 * @todo Add description
 *
 * @returns True if the carousel is still initialized, false if it has been fully destroyed
 */
export const handleDestroy = (
  context: Context,
  initialState: InitialState,
  intersectionObserver: IntersectionObserver,
  resizeObserver: ResizeObserver,
  removeEventListeners: () => void,
  eventEmitter: Emitter<OmniEvents>,
  data?: { mode?: 'full' | 'partial' },
  lazyInitObserver?: IntersectionObserver
): boolean => {
  const { state } = context;
  const { fullItems, partItems } = context.state;

  //
  // Default to full destroy if we get no mode
  //
  const mode = data?.mode || 'full';

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // omni:destroy: Common cleanup for BOTH full and partial                   \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  intersectionObserver.disconnect();

  removeEventListeners();

  resetElementAttributes(context, initialState);

  clearIndicators(context);
  storeIndicators(context, []);

  [...fullItems, ...partItems].forEach(slide => clearItemAttributes(slide));

  state.fullItems = [];
  state.partItems = [];
  state.startItemFullIntersecting = false;
  state.endItemFullIntersecting = false;

  state.hasIndicators = false;
  state.indicatorOverflow = false;

  state.centeredItemIndex = undefined;
  state.hasOldInvisibleAnchors = false;

  //
  // Remove the invisible anchor if it exists
  //
  if (context.elements.invisibleAnchor) {
    context.elements.invisibleAnchor.remove();
    context.elements.invisibleAnchor = undefined;
  }

  //
  // Reset debounced function for centering indicators
  //
  state.debouncedCenterIndicators = undefined;

  state.slideIndexMap.clear();
  state.itemWidthMap.clear();

  //
  // For partial destroy we don’t need anything else
  //
  // Return true to signify that we are done
  // and that the carousel is still initialized
  //
  // NOTE
  // Partial destroy is requested when
  // we want to keep what has been set up on omni:init.
  //
  if (mode === 'partial') {
    return true;
  }

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // omni:destroy: Further cleanup for FULL destroy only                      \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  initialState.buttonAttributes.clear();
  initialState.trackCSSPosition = undefined;

  resizeObserver.disconnect();

  //
  // Disconnect lazy init observer if it exists
  //
  lazyInitObserver?.disconnect();

  //
  // Clear all custom (nanoevents) event handlers
  //
  eventEmitter.events = {};

  //
  // Remove the carousel instance data attribute to allow new instances
  //
  context.elements.root.removeAttribute(internal.dataAttributes.carouselInstance);

  return false;
}

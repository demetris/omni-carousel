import type { Context, ScrollDirection } from '../core';

import { internalConfig as internal } from '../core';

import { determineAlignmentForIndicator } from '../features/indicators';
import { getAdjacentItem } from '../features/steps-all-align-start';
import { getCentermostItem } from '../features/steps-all-align-center';
import { getFallbackItem } from '../features/utils';
import { getInboundItems } from '../features/steps-many-align-all';
import { scrollToCenter } from '../features/scroll';
import { updateCenterItem } from '../dom/styles';

/**
 * Navigation modes used in the carousel
 */
type ScrollMode =
    'indicator'                 // Direct navigation via indicator button/index
  | 'steps-one-align-center'    // One-by-one navigation with center scroll alignment
  | 'steps-one-align-start'     // One-by-one navigation with start scroll alignment
  | 'steps-many-align-center'   // Multi-item navigation with center scroll alignment
  | 'steps-many-align-start'    // Multi-item navigation with start scroll alignment
;

/**
 * Determines which navigation mode to use based on parameters and config
 */
const determineScrollMode = (
  index: number | 'none',
  scrollAlign: 'start' | 'center',
  scrollSteps: 'one' | 'many'
): ScrollMode => {
  if (index !== 'none') {
    return 'indicator';
  }

  if (scrollSteps === 'one') {
    return scrollAlign === 'center' ? 'steps-one-align-center' : 'steps-one-align-start';
  } else {
    return scrollAlign === 'center' ? 'steps-many-align-center' : 'steps-many-align-start';
  }
};

/**
 * Handles carousel navigation after determining destination and alignment
 *
 * @param context - The carousel context
 * @param direction - Direction for navigation: 'left'/'right' or 'none' for index-based navigation
 * @param index - Optional index for direct navigation
 */
export const navigate = (
  context: Context,
  direction: ScrollDirection = 'none',
  index: number | 'none' = 'none'
): void => {
  if (index === 'none' && direction === 'none') {
    return;
  }

  const { slides } = context.elements;
  const { scrollAlign, scrollSteps } = context.config;
  let position: ScrollLogicalPosition = context.config.scrollAlign;
  let destination: HTMLElement | undefined;
  let shouldCenterForMany = false;
  let shouldUpdateCenterItem = false;


  if (context.state.fullItems.length < 1 && index === 'none') {
    destination = getFallbackItem(context, direction);
  } else {
    //
    //
    // Determine scroll mode (one of five)
    //
    //
    const mode = determineScrollMode(index, scrollAlign, scrollSteps);

    //
    //
    // 1. Scroll via indicator button
    //
    //
    if (mode === 'indicator') {
      if (index !== 'none' && index! >= 0 && index! < slides.length) {
        destination = slides[index];

        //
        // For start alignment, determine if we should override with 'end'
        //
        if (scrollAlign === 'start') {
          position = determineAlignmentForIndicator(context, index);
        } else {
          context.state.previousCenteredItemIndex = context.state.centeredItemIndex;
          context.state.centeredItemIndex = index;

          shouldUpdateCenterItem = true;
        }
      } else {
        return;
      }
    }

    //
    //
    // 2. Scroll for scrollSteps:'one' + scrollAlign:'center'
    //
    //
    else if (mode === 'steps-one-align-center') {
      destination = getCentermostItem(context, direction);
      shouldUpdateCenterItem = true;
    }

    //
    //
    // 3. Scroll for scrollSteps:'one' + scrollAlign:'start'
    //
    //
    else if (mode === 'steps-one-align-start') {
      destination = getAdjacentItem(context, direction);
    }

    //
    //
    // 4. Scroll for scrollSteps:'many' + scrollAlign:'center'
    //
    //
    else if (mode === 'steps-many-align-center') {
      const inboundItems = getInboundItems(context, direction);

      if (inboundItems) {
        destination = slides[inboundItems.startIndex];

        //
        // We need special centering with scrollToCenter for multi-step scrolling:
        // Set shouldCenterForMany to true to signify this!
        //
        shouldCenterForMany = true;
      } else {
        destination = getCentermostItem(context, direction);
      }
    }

    //
    //
    // 5. Scroll for scrollSteps:'many' + scrollAlign:'start'
    //
    //
    else if (mode === 'steps-many-align-start') {
      const inboundItems = getInboundItems(context, direction);

      if (inboundItems) {
        destination = slides[inboundItems.startIndex];
      } else {
        destination = getAdjacentItem(context, direction);
      }
    }
  }

  destination = destination || getFallbackItem(context, direction);

  if (shouldUpdateCenterItem) {
    updateCenterItem(context);
  }

  if (shouldCenterForMany) {
    scrollToCenter(context, destination, direction);
  } else {
    destination.scrollIntoView({
      behavior: internal.scrollBehavior,
      block: internal.scrollBlock,
      inline: position,
    });
  }
};

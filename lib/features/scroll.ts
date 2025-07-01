import type { Context, ScrollDirection } from '../types';

import { internalConfig as internal } from '../core/internal-config';
import { getInboundItems } from './steps-many-align-all';
import { placeInvisibleAnchor } from './invisible-anchor';
import { supportsScrollend } from '../utils/browser-support';

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'many'
 *
 * Scrolls and centers an item or SET of items in the carousel
 *
 * @param context - The carousel context
 * @param element - The element to center
 * @param direction - The scroll direction
 */
export const scrollToCenter = (
  context: Context,
  element: HTMLElement,
  direction: ScrollDirection
): void => {
  const { config, elements, state } = context;
  const { track } = elements;
  const { hasEqualWidths } = config;
  const { scrollBehavior, scrollBlock } = internal;

  //
  // Get inbound items data to determine scrolling behavior
  //
  const inboundItems = getInboundItems(context, direction);

  //
  // If no valid inbound items or if centering is not possible,
  // fall back to standard scroll behavior
  //
  // Make sure to account for rounding errors! (+ 1)
  //
  if (!inboundItems || inboundItems.width >= state.width + 1) {
    element.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollBlock,
      inline: 'center'
    });

    return;
  }

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // HAPPY PATH                                                               \\
  //                                                                          \\
  // Reduces reliance on invisibleAnchor (which is not a subtle hack)         \\
  //                                                                          \\
  // When we have equal widths AND an odd number of elements,                 \\
  // we can center the group by centering just the middle element.            \\
  // We don’t need an invisible anchor in order to center the group.          \\
  //                                                                          \\
  // The same is not possible for even counts of equal-width elements:        \\
  // The middle of equal-width elements of even count is not an element!      \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  if (hasEqualWidths && inboundItems.count % 2 === 1) {
    const middleIndex = inboundItems.startIndex + Math.floor(inboundItems.count / 2);
    const middleItem = elements.slides[middleIndex];

    middleItem.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollBlock,
      inline: 'center'
    });

    return;
  }

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // NOT HAPPY PATH                                                           \\
  //                                                                          \\
  // This is necessary when:                                                  \\
  // 1. We have equal widths but an even number of elements; or               \\
  // 2. We have unequal widths.                                               \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  //
  // Track center group items for non-equal-width carousels
  //
  if (!hasEqualWidths) {
    context.state.previousCenteredGroupItems = [...context.state.centeredGroupItems];
    context.state.centeredGroupItems = [];

    //
    // Store the indexes of slides in the centered group
    //
    for (let i = 0; i < inboundItems.count; i++) {
      const slideIndex = inboundItems.startIndex + i;
      context.state.centeredGroupItems.push(slideIndex);
    }
  }

  //
  // Position the invisible anchor at the left edge of the group
  //
  // firstRect.left - trackRect.left = position of group relative to VISIBLE track
  // above result + track.scrollLeft = position of group relative to SCROLLABLE track
  //
  const firstSlideInGroup = elements.slides[inboundItems.startIndex];
  const firstRect = firstSlideInGroup.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const leftPosition = (firstRect.left - trackRect.left + track.scrollLeft);

  if (context.state.detectedBlinkEngine) {
    //
    // For Blink browsers
    //
    // Reusing an existing invisible anchor results in undesired behavior.
    // So, we create a new element each time we scroll, and,
    // after scrolling, we remove the old invisible anchor.
    //
    const oldInvisibleAnchor = context.elements.invisibleAnchor;

    //
    // Create new invisible anchor
    //
    const invisibleAnchor = placeInvisibleAnchor(
      context,
      leftPosition,
      inboundItems.width,
      true
    );

    //
    // Mark that we’re using multiple anchors that need cleanup
    //
    context.state.hasOldInvisibleAnchors = true;

    //
    // Scroll to new invisible anchor
    //
    invisibleAnchor.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollBlock,
      inline: 'center'
    });

    //
    // Remove old invisible anchor after scroll starts
    //
    if (oldInvisibleAnchor) {
      if (supportsScrollend()) {
        //
        // Do nothing - let scrollend handler clean up all old anchors
        //
      } else {
        //
        // Fallback for older Blink versions
        //
        setTimeout(() => oldInvisibleAnchor.remove(), 0);
      }
    }
  } else {
    //
    // For non-Blink browsers
    //
    // Just use the existing invisible anchor
    //
    const invisibleAnchor = placeInvisibleAnchor(
      context,
      leftPosition,
      inboundItems.width
    );

    invisibleAnchor.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollBlock,
      inline: 'center'
    });
  }
};

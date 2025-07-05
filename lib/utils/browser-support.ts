/**
 * Checks if the browser supports modern features the carousel relies on. E.g.:
 *
 * 1. CSS scroll-behavior for smooth scrolling
 * 2. ResizeObserver for observing the track size and reacting to changes
 *
 * The actual checks it runs are:
 *
 * 1. CSS scroll-behavior
 * 2. CSS aspect-ratio (good rough proxy for modern browser features)
 *
 * CSS scroll-behavior is supported in:
 *
 * Chrome 61+ (Sep 2017)
 * Firefox 36+ (Feb 2015)
 * Safari 15.4+ (Mar 2022)
 * Edge 79+ (Jan 2020)
 *
 * CSS aspect-ratio is supported in:
 * Chrome 88+ (Jan 2021)
 * Firefox 89+ (Jun 2021)
 * Safari 15+ (Sep 2021)
 *
 * replaceChildren is supported in:
 *
 * Chrome 86+ (Oct 2020)
 * Firefox 78+ (Jun 2020)
 * Safari 14+ (Sep 2020)
 *
 * ResizeObserver is supported in:
 *
 * Chrome 64+ (Jan 2018)
 * Firefox 69+ (Sep 2019)
 * Safari 13.1+ (Mar 2020)
 *
 * The optional chaining operator (?.) is supported in:
 *
 * Chrome 80+ (Feb 2020)
 * Firefox 74+ (Mar 2020)
 * Safari 13.1+ (Mar 2020)
 *
 * The function should return true in:
 *
 * Chrome 88+ (Jan 2021)
 * Firefox 89+ (Jun 2021)
 * Safari 15.4+ (Mar 2022)
 * 
 * @returns Object with overall support status and details for each requirement
 * @returns {boolean} .supported - Whether all requirements are met
 * @returns {Object} .details - Individual feature support status
 * @returns {boolean} .details.scrollBehavior - CSS scroll-behavior support
 * @returns {boolean} .details.aspectRatio - CSS aspect-ratio support
 */
export const supportsRequirements = (): {
  supported: boolean;
  details: {
    scrollBehavior: boolean;
    aspectRatio: boolean;
  };
} => {
  const scrollBehavior = CSS.supports('scroll-behavior', 'smooth');
  const aspectRatio = CSS.supports('aspect-ratio', '1');
  
  return {
    supported: scrollBehavior && aspectRatio,
    details: {
      scrollBehavior,
      aspectRatio,
    },
  };
};

/**
 * @neededfor scrollAlign:'center' + scrollSteps:'one'
 * @neededfor indicators
 *
 * Checks if the browser supports the scrollend event
 *
 * The event is relatively new and not supported in all browsers.
 * Notably, Safari does not support it as of June 2025 (supported in Technology Preview 26.0).
 *
 * @returns true if the browser supports the scrollend event, false otherwise
 */
export const supportsScrollend = (): boolean => {
  return 'onscrollend' in window;
}

/**
 * Detects if the browser uses the Blink engine (Chrome, Edge, Opera, etc.)
 *
 * Used to apply engine-specific tweaks for scroll behavior
 *
 * @returns true if the browser uses the Blink engine, false otherwise
 */
export const hasBlinkEngine = (): boolean => {
  //
  // Use feature detection for Blink-specific CSS properties!
  // These properties are more reliable than user agent detection.
  //
  return (
    //
    // Chrome, Edge, Opera (Blink-based browsers)
    //
    CSS.supports('-webkit-app-region', 'none')
    //
    // Exclude Safari and other WebKit browsers
    //
    && !CSS.supports('-apple-trailing-word', 'none')
  );
}

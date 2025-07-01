Detailed comparison: box-slider vs Omni Carousel
================================================================================

COMPARISON BY CLAUDE CODE AND CLAUDE OPUS 4, 2025-07-01


Accessibility approaches
----------------------------------------

### box-slider

-   Follows WAI-ARIA carousel pattern
-   `role="region"` on slider container
-   `aria-roledescription="slide"` on each slide
-   `aria-live="polite"` when autoScroll enabled, `aria-live="off"` when disabled
-   `aria-hidden` management for inactive slides
-   Respects `prefers-reduced-motion` by default
-   Semantic HTML support with `<figure>` and `<figcaption>`

### Omni Carousel

-   More comprehensive ARIA implementation:
    -   `aria-roledescription="carousel"` on container
    -   `aria-roledescription="slide"` on each slide
    -   `aria-posinset` and `aria-setsize` for slide position
    -   `aria-live="polite"` for screen reader announcements
    -   `aria-controls` linking buttons to track
-   `tabindex="0"` on track for keyboard navigation
-   Disabled attribute on navigation buttons at boundaries

### Borrowable from box-slider

-   Automatic `aria-live` switching based on autoScroll state
-   Built-in `prefers-reduced-motion` respect in config
-   `aria-hidden` management for better screen reader experience

### Omni advantages

-   More detailed position information with `aria-posinset/setsize`
-   Better button-to-content relationships with `aria-controls`
-   Keyboard navigation on track itself


CSS techniques comparison
----------------------------------------

### box-slider

```css
/* Minimal required styles */
#slider {
  height: 400px;
  width: 800px;
  position: relative; /* For CLS prevention */
}

.slide {
  height: 100%;
  width: 100%;
  position: absolute; /* Required for effects */
  z-index: 1;
}

/* First slide visible */
.slide:first-child {
  z-index: 2;
}
```

-   Minimal built-in styles - library focuses on functionality
-   Requires explicit width/height from users
-   Uses absolute positioning for all slides
-   CSS custom properties for control styling
-   No scroll-snap usage (uses transforms/animations)

### Omni Carousel

```scss
/* Sophisticated layout with scroll-snap */
[data-omni-track] {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  
  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
}

[data-omni-slide] {
  flex: none;
  scroll-snap-align: center; /* or start */
}

/* Dynamic sizing with CSS custom properties */
--d-slide-width: calc((var(--width-for-content) / var(--d-per-view)) - var(--d-gap));
```

### Key differences

1.  **Layout approach**: box-slider uses absolute positioning, Omni uses flexbox with scroll
2.  **Scroll mechanism**: box-slider uses animations, Omni uses native scroll
3.  **Styling philosophy**: box-slider minimal, Omni provides more defaults
4.  **Responsiveness**: box-slider requires manual CSS, Omni has built-in responsive patterns

### Borrowable from box-slider

-   Absolute positioning approach prevents cumulative layout shift (CLS)
-   Minimal styling philosophy gives developers more control
-   Z-index management pattern for visible slides

### Omni advantages

-   Native scroll behavior with CSS scroll-snap
-   Built-in responsive patterns with CSS custom properties
-   Better touch/scroll device support with native scrolling


JavaScript approaches & progressive enhancement
----------------------------------------

### box-slider

-   **Architecture**: Object-oriented with pluggable effects system
-   **Effects**: Separate effect classes implementing `Effect` interface
-   **State management**: StateStore preserves/restores element attributes
-   **Animation**: Web Animations API with fallback to CSS transforms
-   **Event system**: Custom event emitter with typed events
-   **Distribution**: Multiple formats (ESM, CJS, IIFE, Web Components, React)
-   **Zero dependencies**: Pure JavaScript/TypeScript

```javascript
// Pluggable effect system
class CustomEffect implements Effect {
  initialize(boxSlider, slides, options) {}
  transition(current, next, direction, speed) {}
  destroy() {}
}

// State preservation
const stateStore = new StateStore()
stateStore.save(element, ['style', 'aria-hidden'])
stateStore.restore(element)
```

### Omni Carousel

-   **Architecture**: Factory pattern with modular features
-   **Navigation**: Uses native `scrollIntoView()` API
-   **Observers**: IntersectionObserver for visibility, ResizeObserver for dimensions
-   **Memoization**: Caches measurements for performance
-   **Event system**: Uses nanoevents (tiny dependency)
-   **Distribution**: Single format with TypeScript support

```javascript
// Factory pattern
const carousel = createOmniCarousel(element, {
  scrollSteps: 'one',
  scrollAlign: 'center'
})

// Native scroll API
element.scrollIntoView({
  behavior: 'smooth',
  inline: scrollAlign
})
```

### Key differences

1.  **Effect handling**: box-slider has pluggable effects, Omni uses scroll-based approach
2.  **Dependencies**: box-slider has zero, Omni uses nanoevents
3.  **Animation approach**: box-slider uses Web Animations API, Omni uses native scroll
4.  **Distribution**: box-slider offers multiple formats, Omni focuses on one

### Borrowable from box-slider

1.  **Pluggable effect system**: Allows custom transition effects
2.  **State preservation**: StateStore pattern for managing element state
3.  **Zero dependencies**: Reduces maintenance and bundle size
4.  **Multiple distribution formats**: Better framework compatibility

### Omni advantages

1.  **Native scroll approach**: Better mobile support and performance
2.  **Observer pattern**: More efficient visibility/resize detection
3.  **Memoization**: Better performance for complex layouts
4.  **Simpler API**: Less configuration needed for basic use


Summary: Borrowable solutions & good alternatives
================================================================================


Solutions Omni Carousel could borrow
----------------------------------------

1.  **Effect system architecture**
    -   Pluggable effects allow for creative transitions
    -   Clean interface for custom effects
    -   Could complement Omni's scroll-based approach

2.  **State preservation pattern**
    -   StateStore for saving/restoring element attributes
    -   Useful for complex state management
    -   Clean abstraction for DOM manipulation

3.  **aria-live management**
    -   Automatic switching based on autoScroll state
    -   Better screen reader experience
    -   Simple but effective accessibility improvement

4.  **Zero dependencies philosophy**
    -   Reduces maintenance burden
    -   Smaller bundle size
    -   Better long-term stability

5.  **Multiple distribution formats**
    -   Web Components for framework-agnostic use
    -   React components for React users
    -   Better adoption potential

6.  **Transition queue system**
    -   Prevents animation conflicts
    -   Clean handling of rapid navigation
    -   Better user experience


Good alternatives (worth noting)
----------------------------------------

1.  **Animation approach**
    -   box-slider: Web Animations API for effects
    -   Omni: Native scroll for navigation
    -   Both valid for different use cases

2.  **Styling philosophy**
    -   box-slider: Minimal styles, developer control
    -   Omni: More opinionated with good defaults
    -   Different target audiences

3.  **Effect variety**
    -   box-slider: Multiple built-in effects (fade, cube, tile)
    -   Omni: Focus on scroll-based carousel
    -   Consider user needs for effects


Omni Carousel's unique strengths
----------------------------------------

1.  **Superior scroll handling** with native browser APIs
2.  **Better touch/mobile support** through native scrolling
3.  **More comprehensive ARIA** implementation
4.  **Built-in responsive patterns** with CSS custom properties
5.  **Keyboard navigation** on the track itself
6.  **Performance optimizations** with memoization and observers


Recommended actions
----------------------------------------

1.  **Consider adding** to Omni Carousel:
    -   Optional effect system for non-scroll transitions
    -   State preservation for complex use cases
    -   aria-live switching based on autoScroll
    -   Web Components distribution
    -   Zero dependencies goal

2.  **Document as alternatives** in Omni docs:
    -   Effect-based vs scroll-based approaches
    -   When to use absolute positioning
    -   Custom effect creation patterns

3.  **Keep Omni's advantages**:
    -   Native scroll approach
    -   Comprehensive accessibility
    -   Performance optimizations
    -   Built-in responsive patterns

Both libraries are well-crafted with different philosophies. box-slider excels at providing a flexible effect system with zero dependencies, while Omni Carousel provides superior scroll handling and accessibility. The borrowable elements would enhance Omni without compromising its core scroll-based approach.
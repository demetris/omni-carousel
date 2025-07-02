
Essential and recommended CSS
================================================================================

**This document is WIP**

All examples use the default CSS selectors (data attributes) of Omni.
You can change change the default selectors to your own selectors with the `selectors` property.


Useful custom properties
----------------------------------------

```css
.carousel {
  /*
   * Set a prop that represents the track width in a non-relative unit.
   * This can be used for setting slide widths in responsive carousels.
   */
  --track-width: 93.75vw;

  --indicator-gap: 8px;
  --indicator-width: 24px;

}

@media (min-width: 1280px) {
  .carousel {
    --track-width: 1024px;
  }
}
```


Essential CSS
----------------------------------------

```css
[data-omni-track] {
  display: flex;
  width: 100%;
  overflow-x: auto;
}

[data-omni-slide] {
  flex: none;

  /*
   * For full-width slides, set the width to the track width
   * For multiple slides per view, use a calculation. E.g.:
   * 
   * calc((var(--track-width) - (var(--gap) * 2)) / 3);
   */   
  width: var(--track-width);

  /*
   *
   */
  height: var(--track-height);
}

/*
 * If the carousel has indicators, add this for their container:
 */
[data-omni-indicators] {
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

[data-omni-indicators]::-webkit-scrollbar {
  display: none;
}

/*
 * Add this for individual indicators
 */
[data-omni-indicator] {
  flex: none;
  width: var(--indicator-width);
  height: var(--indicator-height);
}
```


Recommended CSS
----------------------------------------

```css
[data-omni-track] {
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

[data-omni-slide] {
  /*
   * If you set scroll-snap-type for the track,
   * it is good to also set scroll-snap-align for the slides,
   * for a uniform experience between managed and unmanaged scrolling.
   *
   * Use either start or center.
   * Omni reads this value and uses it for managed scrolling.
   */
  scroll-snap-align: center;

  /*
   * Constrain the width to avoid surprises
   */
  max-width: 100%;
}

/*
 * DO NOT use justify-content:center for this!
 * It breaks scrolling when the content overflows.
 *
 * For carousels that don’t always overflow
 * AND that you want to center when they don’t:
 */
[data-omni-slide]:first-child {
  margin-inline-start: auto;
}
[data-omni-slide]:last-child {
  margin-inline-end: auto;
}

/*
 * If the carousel has indicators, do the same for them:
 */
[data-omni-indicator]:first-child {
  margin-left: auto;
}
[data-omni-indicator]:last-child {
  margin-right: auto;
}
```

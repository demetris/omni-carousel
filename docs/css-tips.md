
CSS tips
================================================================================

Tips for carousels/scrollers made with CSS and enhanced with Omni Carousel


How to hide the track scrollbar
----------------------------------------

Be careful to hide the scrollbar only when Omni has set up and is enhancing the scrollable area with alternative navigation.

You can check for the same features Omni checks for:

```css
@supports (scroll-behavior: smooth) and (aspect-ratio: 1) {
  [data-omni-track] {
    scrollbar-width: none;
  }

  [data-omni-track]::-webkit-scrollbar {
    display: none;
  }
}
```


How to add gaps for old versions of Safari
----------------------------------------

Some old versions of Safari do not support gap in flex containers.
For gaps that work everywhere, including those old versions of Safari,
use margin:

```css
[data-omni-slide]:not(:last-child) {
  margin-right: 1rem;
}
```


How to prevent shifts from the indicators container
----------------------------------------

If there is an element with the `data-omni-indicators` attribute within the root,
Omni autogenerates indicators (dots) for it and inserts them into it.

Make sure that this element has a mininum height equal or larger than
the height of your indicators.

```css
[data-omni-indicators] {
  min-height: var(--indicator-height);
}
```

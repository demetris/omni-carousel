
CSS tips
================================================================================

Tips for improving carousels/scrollers made with CSS


How to hide the track scrollbar
----------------------------------------

Be careful to hide the scrollbar only when there is other UI
for users to interact with the carousel; that is, only when
Omni has set up and is enhancing the scrollable area.

You can check for the same features Omni checks for before it starts setting up:

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

Some versions of Safari do not support gap in flex containers.
For gaps that work on those versions too, use margin:

```css
[data-omni-slide]:not(:last-child) {
  margin-right: 1rem;
}
```


How to prevent cumulative layout shifts (CLS)
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

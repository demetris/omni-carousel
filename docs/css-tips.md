
CSS tips
================================================================================


How to hide the track scrollbar
----------------------------------------

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

CSS `scroll-behavior` and `aspect-ratio` are the features Omni checks for before it initializes,
so this will hide the scrollbar only in scrollable areas that are enhanced by Omni.


How to add gaps that work on old versions of Safari
----------------------------------------

```css
@supports (scroll-behavior: smooth) and (aspect-ratio: 1) {
  [data-omni-slide]:not(:last-child) {
    margin-right: 1rem;
  }
}
```

Some old Safari versions support Flexbox but not `gap` for Flexbox.
Use `margin-right` if you want your gaps to work in those versions too.


How to prevent cumulative layout shifts (CLS)
----------------------------------------

If you have an element with the `data-omni-indicators` attribute within the root,
Omni will autogenerate indicators (dots) for it and insert them into it.

Make sure that this element has a mininum height equal or larger than
the height of your indicators.

```css
[data-omni-indicators] {
  min-height: var(--indicator-height);
}
```


CSS state classes
================================================================================


CSS classes added by Omni based on the state of the carousel and its parts


Use these CSS state classes to create conditional styling
based on carousel state, slide visibility, and user interaction.


is-omni-ready
----------------------------------------

CSS class added to the root Omni element as soon as setup is complete.

Example usage:

```css
.carousel-nav {
  opacity: 0;
}

.is-omni-ready .carousel-nav {
  opacity: 1;
}
```


is-omni-current
----------------------------------------

CSS class added to fully visible slides and to indicators pointing at them.

Example usage:

```css
[data-omni-slide] {
  opacity: 0.75;
}

[data-omni-indicator] {
  opacity: 0.25;
}

[data-omni-slide].is-omni-current,
[data-omni-indicator].is-omni-current {
  opacity: 1;
}
```


is-omni-part-current
----------------------------------------

CSS class added to *partially* visible slides and to indicators pointing at them.



is-omni-centered
----------------------------------------

CSS class added to the centered slide(s) in two configurations:

1.  Single-step center-aligned scrolling
2.  Multi-step center-aligned scrolling with slides of *unequal* width

Example usage:

```css
[data-omni-slide] {
  background-color: gainsboro;
}

[data-omni-slide].is-omni-centered {
  background-color: lemonchiffon;
}
```

There is a third configuration where targeting the centered slide(s) may be needed:

3.  Multi-step center-aligned scrolling with slides of *equal* width

In this case the centered slide(s) should always be the same as the fully visible slide(s)
and can be selected with the `is-omni-current` class.
No special class is needed or applied for this.


is-omni-entering & is-omni-exiting
----------------------------------------

CSS classes added to slides as they enter and leave the track viewport.

These classes are not added by default. If you want to use them, add `transitionHelpers: true` in your configuration.


is-omni-indicator-overflow
----------------------------------------

CSS class added to the *root Omni element* when the indicators overflow their container.

For example, you can use this to display start/end buttons only when
the indicators are overflowing and the first and/or last indicators are hidden:

```css
.carousel:not(.is-omni-indicator-overflow) [data-omni-button-start],
.carousel:not(.is-omni-indicator-overflow) [data-omni-button-end] {
  display: none;
}
```

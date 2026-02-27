CSS for peek-a-boo effect
================================================================================

How to create a peek-a-boo effect for flex-based carousels


This page describes the technique used in the peek-a-boo demos on the Omni site.
*peek-a-boo* is the term I use to describe centered carousels with partially visible previous and next slides.
See [Know your width](css-tips-know-your-width.md) to understand how the
responsive demos deal with the problem of slide dimensions.

Please note that this is specifically for **flex-based** carousels.

```css
/*
 * We set the slide width to a fraction of the track width.
 * We give the rest of the track width to the two peek areas.
 *
 * See the 'Know your width' page for the --track-width property.
 */
.carousel {
  /*
   * Essential custom properties
   */
  --fraction: 0.875;
  --slide-width: calc(var(--track-width) * var(--fraction));
  --peek-areas-width: calc(var(--track-width) * (1 - var(--fraction)));
  --peek-width: calc(var(--peek-areas-width) / 2);

  /*
   * Properties for further styling
   */
  --gap: 16px;
}

[data-omni-track] {
  display: flex;

  overflow-x: auto;

  scroll-snap-type: x mandatory;
}

/*
 * Now comes the heart of the tip:
 * The pseudo-elements that create the peek-a-boo effect
 * at the two ends of the track; that is, before
 * the first and after the last slide.
 *
 * The track has display:flex, which makes the pseudo-elements
 * flex items like the rest of the track children (the true
 * elements). We add flex:none so that the pseudo-elements
 * don't shrink to invisibility.
 */
[data-omni-track]::before,
[data-omni-track]::after {
  content: "";

  flex: none;
  
  width: var(--peek-width);
}

[data-omni-slide] {
  flex: none;

  width: var(--slide-width);
  
  /*
   * After ensuring we have peek areas
   * at the start and end of the track
   * we add this to ensure we have
   * peek areas in the other
   * positions too.
   */
  scroll-snap-align: center;
}

[data-omni-slide]:not(:last-child) {
  margin-right: var(--gap);
}
```

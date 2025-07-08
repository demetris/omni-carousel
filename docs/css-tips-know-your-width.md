
Know your track width
================================================================================

Techniques for controlling the width and height of responsive slides

NOTE. The challenge and the techniques described here are for **flex-based** carousels.
Carousels built with Grid work differently.


The challenge
---------------------------------------

In many common carousel layouts setting the slide dimensions is simple;
for example, all slides are 300×200, or all slides are full-width
and show images that all have the exact same aspect ratio.

Things get difficult if you want to set a uniform height
for the slides based on a dynamic width.

Width is easy:

```css
.slide {
  width: 100%;
}
```

Height is not. You cannot do this:

```css
/*
 * This will NOT work.
 * 100% here is the 100% of the height.
 */
.slide {
  height: calc(100% / (16 / 9));
}
```

For carousels whose slide dimensions are controlled in CSS only,
like all demos on this website, this is a problem that needs solving.
There are two ways to solve it.


Two solutions
----------------------------------------

### 1. cqw (container query units)

`cqw` is the recommended solution if you can rely on container queries.

```css
/*
* Make the track a container of the inline-size type
*/
.track {
  container-type: inline-size;
}

/*
* Set slide dimensions with cqw
*
* For example, for slides as wide as the track
* (one per view) and with an aspect ratio of 16 / 9
*/
.slide {
  width: 100cqw;
  height: calc(100cqw / (16 / 9));
}

/*
* Or, for three slides per view
*/
.slide {
  width: calc(100cqw / 3);
  height: calc(100cqw / 3 / (16 / 9));
}
```

### 2. Custom property that defines the track width

The second technique works on virtually every browser in use today,
but it is more involved because you have to set
explicit widths for your breakpoints.

```css
/*
 * Use a custom property to define the track width
 */
:root {
  --track-width: 93.75vw;
}
@media (min-width: 1024px) {
  :root {
    --track-width: 960px;
  }
}

/*
 * Set the width for the track
 */
.track {
  width: var(--track-width);
}

/*
 * Set slide dimensions for one slide per view
 * using the now known track width
 */
.slide {
  width: var(--track-width);
  height: calc(var(--track-width) / (16 / 9));
}

/*
 * Or set slide dimensions for three slides per view
 */
.slide {
  width: calc(var(--track-width) / 3);
  height: calc(var(--track-width) / 3 / (16 / 9));
}
```


Browser support
----------------------------------------

The second technique—the **custom property** that defines the track width—works virtually everywhere.
It is what all (or almost all) Omni demos use.

The `cqw` technique works on:

-   Chrome v105+ (Aug 2022)
-   Firefox v110+ (Feb 2023)
-   Safari v16+ (Sep 2022)

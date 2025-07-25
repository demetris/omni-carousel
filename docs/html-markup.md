
HTML markup
================================================================================

Example HTML markup for a carousel


This page shows example HTML markup for a carousel, similar to what the Omni demos use.
The markup includes semantic HTML elements and ARIA attributes for accessibility.

For the accessibility attributes, please also see:

-   [W3C WAI Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
-   [W3C WAI Carousel Tutorial](https://www.w3.org/WAI/tutorials/carousels/working-example/)

```html
<section
  class="carousel"
  aria-roledescription="carousel"
  aria-label="Example carousel"
>

  <!--
  Optional navigation buttons — handled if present.

  The nav element is not required:
  Buttons can be placed anywhere, as long as they are
  within the root element (section.carousel in this example).

  You can also add buttons to go to the first/last slide.
  Omni handles those too. Their default selectors are:
  - data-omni-button-start
  - data-omni-button-end
  -->
  <nav>
    <!--
      HIDDEN attribute
      The buttons do nothing if Omni is not set up.
      Remove them from the accessibility tree.
      Omni will unhide them when it sets up.

      DISABLED attribute
      The previous button should typically be disabled at first
      (since we are at the start). Omni manages this and sets
      the button to disabled when it starts, but you can
      also include the attribute here to avoid
      the initial state mismatch.
    -->
    <button
      hidden
      disabled
      data-omni-button-prev
      type="button"
      aria-label="Go to previous slide"
      aria-controls="carousel-track"
    >
      Prev
    </button>
    <button
      hidden
      data-omni-button-next
      type="button"
      aria-label="Go to next slide"
      aria-controls="carousel-track"
    >
      Next
    </button>      
  </nav>

  <ul
    id="carousel-track"
    data-omni-track
    tabindex="0"
  >
    <li
      data-omni-slide
      aria-roledescription="slide"
      aria-posinset="1"
      aria-setsize="2"
    >
      Slide 1
    </li>
    <li
      data-omni-slide
      aria-roledescription="slide"
      aria-posinset="2"
      aria-setsize="2"
    >
      Slide 2
    </li>
  </ul>

  <!--
  Optional
  Omni will autogenerate indicators if the container exists.
  The autogenerated indicators also have ARIA attributes,
  including aria-controls if the track has an id.
  -->
  <div data-omni-indicators></div>

</section>
```

The `data-omni-*` attributes tell Omni which elements to watch and manage.
You can customize these selectors in the [configuration options](configuration-options.md).

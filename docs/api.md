
API
================================================================================

The public API made available by `createOmniCarousel()`


Overview
----------------------------------------

```js
//
// Lifecycle
//
carousel.init();     // Initialize the carousel
carousel.setup();    // Set up UI components
carousel.destroy();  // Clean up and remove everything

//
// Navigation
//
carousel.next();     // Go to next slide(s)
carousel.prev();     // Go to previous slide(s)
carousel.goTo(3);    // Go to specific slide by index

//
// Custom events and event subscription
//
const unsubscribe = carousel.on('omni:visibility:change', (data) => {
  console.log('Visibility changed:', data);
});
```


Example
----------------------------------------

```js
import { createOmniCarousel } from 'omni-carousel';

const root = document.querySelector('.carousel');
const carousel = createOmniCarousel(root, {
  preloadAdjacentImages: true,
});

carousel.init();
```

The second argument of `createOmniCarousel` is optional.
For the configuration options you can pass with it, see
[Configuration options](configuration-options.md)


Lifecycle methods
----------------------------------------

### init()

Starts the Omni operation.

```js
carousel.init();
```

Note that `init()` does not do the setup.
Setup only happens if the carousel root is visible
in the viewport and if the carousel track overflows.

### setup()

Sets up everything.

```js
carousel.setup();
```

Omni calls this automatically when needed
but you can also call it manually to force a setup.

For styling based on the setup state (whether the carousel
is or is not set up) you can use the `is-omni-ready` CSS
class. `is-omni-ready` is added to the root element
on setup and then removed on destroy.

### destroy()

```js
carousel.destroy();
```

Removes everything added by Omni (attributes, classes, event handlers),
restores any initial state Omni may have modified,
and clears the internal state.


Navigation methods
----------------------------------------

`prev()` and `next()` scroll to the previous and next slide, or
to the previous and next set of slides, depending on the value of
`scrollSteps` (see [Configuration options](configuration-options.md)).

`.goTo(number)` scrolls to a slide by its index (zero-based).


Custom events
----------------------------------------

Omni emits eight custom events on the root element.

All events bubble.

| Event                    | Description                     | Data                     |
|:-------------------------|:--------------------------------|:-------------------------|
| `omni:visibility:change` | Slide visibility changes        | `{ state, slide, ... }`  |
| `omni:dimensions:change` | Track dimensions change         | `{ width, scrollWidth }` |
| `omni:nav:prev`          | Navigating to previous slide(s) | None                     |
| `omni:nav:next`          | Navigating to next slide(s)     | None                     |
| `omni:nav:index`         | Navigating to slide by index    | `{ index }`              |
| `omni:init`              | Initialization begins           | None                     |
| `omni:setup`             | Setup begins                    | None                     |
| `omni:destroy`           | Teardown begins                 | `{ mode }` (optional)    |

Omni uses these events internally. Of course, you can listen to them too.


Event subscription
----------------------------------------

### on(event, callback)

```js
const unsubscribe = carousel.on('omni:visibility:change', (data) => {
  console.log('Slide visibility changed:', data);
});

//
// Later, to unsubscribe:
//
unsubscribe();
```


Event data details
----------------------------------------

### omni:visibility:change

Fired when slide visibility changes.

```js
carousel.on('omni:visibility:change', (data) => {
  const {
    state,                    // Current carousel state
    slide,                    // The slide element
    fullIntersecting,         // Slide is fully visible
    partIntersecting,         // Slide is partially visible
    wasFullIntersecting,      // Slide was fully visible before
    wasPartIntersecting,      // Slide was partially visible before
    startBoundaryChanged,     // Visibility changed for the first slide
    endBoundaryChanged        // Visibility changed for the last slide
  } = data;
});
```


### omni:dimensions:change

Fires when the carousel track dimensions change.

```js
carousel.on('omni:dimensions:change', (data) => {
  const {
    width,          // Visible track width
    scrollWidth     // Total scrollable width
  } = data;
});
```


### omni:nav:index 

Fires when navigating to a specific slide by index.

```js
carousel.on('omni:nav:index', (data) => {
  console.log(`Navigating to slide ${data.index + 1}`);
});
```


### omni:destroy

Fires when the carousel is being destroyed.

```js
carousel.on('omni:destroy', (data) => {
  if (data?.mode === 'partial') {
    console.log('Partial destruction');
  }
});
```


Native event handling
----------------------------------------

You can also listen to custom events using native DOM methods:

```js
root.addEventListener('omni:nav:next', () => {
  console.log('Next button clicked');
});
```

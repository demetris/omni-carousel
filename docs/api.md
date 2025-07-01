
API
================================================================================

```js
//
// Navigation
//
carousel.next();     // Move to next slide(s)
carousel.prev();     // Move to previous slide(s)
carousel.goTo(3);    // Jump to a specific slide by its index

//
// Lifecycle
//
carousel.init();     // Initialize the carousel
carousel.setup();    // Set up UI components
carousel.destroy();  // Clean up and remove event listeners

//
// Event subscription
//
const unsubscribe = carousel.on('omni:visibility:change', (data) => {
  console.log('Visibility changed:', data);
});
```


Custom events emitted
----------------------------------------

| Event                     | Emitted when                                     |
|:--------------------------|:-------------------------------------------------|
| `omni:visibility:change`  | Slide visibility changes                         |
| `omni:dimensions:change`  | Carousel (track) width changes                   |
| `omni:nav:prev`           | Navigating to previous slide or set of slides    |
| `omni:nav:next`           | Navigating to next slide or set of slides        |
| `omni:nav:index`          | Navigating by slide index                        |
| `omni:init`               | Carousel initialization begins                   |
| `omni:setup`              | Carousel setup begins                            |
| `omni:destroy`            | Carousel destruction begins                      |


TODO items for the Omni Carousel project
================================================================================


Library
----------------------------------------

-   [ ] Ignore non-button buttons in setup, print appropriate and informative message
-   [ ] `scrollToCenter`. Use happy path for unequal widths too if inboundItems is just one.
-   [ ] Create GitHub releases for new versions (minimal approach - point to CHANGELOG.md)
-   [ ] Add missing @returns JSDoc tags for non-void functions (5 functions)
    -   determineScrollMode
    -   getContainerLeft
    -   getItemIndex
    -   getItemWidth
    -   handleInit


Site and docs
----------------------------------------

-   [ ] Extract demo CSS from Astro files into separate SCSS files for each demo type and link to them from demo pages
-   [ ] Implement search term highlighting on pages when navigating from search results
-   [ ] Remove unnecessary `data-astro-cid-*` attributes by converting scoped styles to global where appropriate


Future enhancements
----------------------------------------

-   [ ] Add a couple of testimonial carousels to the demos
-   [ ] Add support for dynamic slides using MutationObserver

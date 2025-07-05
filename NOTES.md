
Omni Carousel notes
================================================================================


Website performance
----------------------------------------

Measurements taken using WebPageTest

| Date       | Page       |  TTFB |    SR |   FCP |    SI |   LCP |   CLS |   TBT |    PW | Emulation  |
|------------|------------|-------|------:|------:|------:|------:|------:|------:|------:|-----------:|
| 2025-06-30 | Demos      | .033s | .300s | .281s | .200s | .231s |     0 | .000s | 174KB | Desktop    |
| 2025-06-30 | Home       | .024s | .200s | .231s | .200s | .231s |     0 | .000s | 108KB | Desktop    |


Known bugs that affect the Omni Carousel website
----------------------------------------

-   WebKit SVG scaling with font-size (Bug #199236)
    -   SVG icons don not scale properly when using
        `width: 1em; height: 1em` with font-size in Safari/WebKit browsers
    -   Reported: June 2019, still open as of July 2025
    -   Affects hamburger menu icon scaling when zooming
    -   Workaround exists (wrap SVG in span) but not implemented
        since the current approach works correctly in Chrome/Firefox
    -   Bug tracker: https://bugs.webkit.org/show_bug.cgi?id=199236

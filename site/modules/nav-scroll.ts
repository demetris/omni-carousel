/**
 * Navigation scroll position memory
 *
 * Runs immediately when script executes to prevent visual jumps
 */

function isMultiCol(): boolean {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--is-multi-col')
    .trim() === '1'
  ;
}

const nav = document.querySelector('[data-menu]') as HTMLElement | null;

if (nav) {
  //
  // Save scroll position before page navigation
  //
  addEventListener('beforeunload', () => {
    if (isMultiCol()) {
      sessionStorage.setItem('nav-scroll-top', nav.scrollTop.toString());
    }
  });

  //
  // Restore scroll position immediately
  //
  if (
    isMultiCol()
    && sessionStorage.getItem('nav-scroll-top')
    && parseInt(sessionStorage.getItem('nav-scroll-top')!, 10) > 0
  ) {
    nav.scrollTop = parseInt(sessionStorage.getItem('nav-scroll-top')!, 10);
  }
}

//
// Footer intersection detection for accurate nav height calculation
//
const footer = document.querySelector('body > .footer') as HTMLElement | null;

if (footer) {
  const observer = new IntersectionObserver((entries) => {
    const ratio = entries[0].intersectionRatio;
    document.documentElement.style.setProperty(
      '--footer-intersection-ratio',
      ratio.toString()
    );
  }, {
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  });

  observer.observe(footer);
}

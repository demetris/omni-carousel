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

/**
 * Search page interaction handlers
 *
 * Provides modal-like behavior for the search page while maintaining
 * the performance benefits of full page navigation.
 */

/**
 * Navigate back with fallback to homepage if no internal referrer
 */
function goBack(): void {
  if (
    document.referrer
    && new URL(document.referrer).origin === window.location.origin
  ) {
    history.back();
  } else {
    window.location.href = '/';
  }
}

/**
 * Sets up the close button to navigate back in history
 */
export function setupCloseButton(): void {
  const closeButton = document.querySelector('[data-search-close]') as HTMLButtonElement;

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      goBack();
    });
  }
}

/**
 * Sets up the clear button to refocus the input after clearing
 */
export function setupClearButton(): void {
  const clearButton = document.querySelector('.pagefind-ui__search-clear');

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      setTimeout(() => {
        const searchInput = document.querySelector<HTMLInputElement>('.pagefind-ui__search-input');
        searchInput?.focus();
      }, 0);
    });
  }
}

/**
 * Sets up ESC key to navigate back in history
 */
export function setupEscapeKey(): void {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      goBack();
    }
  });
}

/**
 * Removes the search input link from tab order after its fade transition
 */
export function hideSearchInputLink(): void {
  const searchInputLink = document.querySelector<HTMLAnchorElement>('.search-input-link');
  
  if (searchInputLink) {
    // Wait for the CSS transition to complete (250ms as defined in the CSS)
    setTimeout(() => {
      searchInputLink.setAttribute('tabindex', '-1');
      searchInputLink.setAttribute('aria-hidden', 'true');
    }, 250);
  }
}

/**
 * Initialize all search page interaction
 */
export function initSearchInteraction(): void {
  setupCloseButton();
  setupEscapeKey();
  setupClearButton();
  hideSearchInputLink();
}

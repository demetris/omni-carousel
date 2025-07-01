export function initNav(): void {
  const body = document.body;

  const toggle = document.querySelector('[data-menu-toggle]');
  if (!toggle || !(toggle instanceof HTMLButtonElement)) {
    return;
  }

  const nav = document.querySelector('[data-menu]');
  if (!nav || !(nav instanceof HTMLElement)) {
    return;
  }

  const close = nav.querySelector('[data-menu-close]');
  if (!close || !(close instanceof HTMLButtonElement)) {
    return;
  }

  function openMenu() {
    body.classList.add('is-menu-open');
    toggle?.setAttribute('aria-expanded', 'true');
    nav?.classList.add('is-open');
  }

  function closeMenu() {
    body.classList.remove('is-menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  close.addEventListener('click', () => {
    closeMenu();
  });

  //
  // Handle Escape key
  //
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

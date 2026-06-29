function initHeader() {
  const nav = document.querySelector<HTMLElement>('.nav');
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const searchToggle = document.querySelector<HTMLButtonElement>('.search-toggle');
  const searchOverlay = document.querySelector<HTMLElement>('.search-overlay');

  if (!nav || !toggle) return;

  const closeNav = () => {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav--open', !expanded);
    document.body.classList.toggle('nav-open', !expanded);
  });

  nav.querySelectorAll<HTMLElement>('.nav-item--has-children').forEach((item) => {
    const trigger = item.querySelector<HTMLAnchorElement>(':scope > .nav-link');
    const submenu = item.querySelector<HTMLElement>('.nav__submenu');
    if (!trigger || !submenu) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (event) => {
      if (window.innerWidth > 1024) return;

      event.preventDefault();
      const isExpanded = item.classList.contains('nav-item--expanded');

      nav.querySelectorAll('.nav-item--expanded').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('nav-item--expanded');
          openItem.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('nav-item--expanded', !isExpanded);
      trigger.setAttribute('aria-expanded', String(!isExpanded));
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 1024) return;
    const target = event.target as Node;
    if (!nav.contains(target) && !toggle.contains(target)) {
      closeNav();
      nav.querySelectorAll('.nav-item--expanded').forEach((item) => {
        item.classList.remove('nav-item--expanded');
        item.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  searchToggle?.addEventListener('click', () => {
    searchOverlay?.classList.toggle('search-overlay--open');
    const input = searchOverlay?.querySelector<HTMLInputElement>('input');
    if (searchOverlay?.classList.contains('search-overlay--open')) {
      input?.focus();
    }
  });

  searchOverlay?.querySelector('.search-overlay__close')?.addEventListener('click', () => {
    searchOverlay?.classList.remove('search-overlay--open');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeNav();
    searchOverlay?.classList.remove('search-overlay--open');
    nav.querySelectorAll('.nav-item--expanded').forEach((item) => {
      item.classList.remove('nav-item--expanded');
      item.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeNav();
      nav.querySelectorAll('.nav-item--expanded').forEach((item) => {
        item.classList.remove('nav-item--expanded');
        item.querySelector(':scope > .nav-link')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

initHeader();

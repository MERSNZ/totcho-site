// Hide the pinned header while scrolling down; bring it back on scroll up.
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const threshold = 6;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const delta = y - lastY;

    if (y <= header.offsetHeight) {
      header.classList.remove('is-hidden');
      lastY = y;
      return;
    }
    if (Math.abs(delta) < threshold) return;

    // Keep the nav visible while a keyboard user is tabbing through it.
    if (delta > 0 && !header.contains(document.activeElement)) {
      header.classList.add('is-hidden');
    } else if (delta < 0) {
      header.classList.remove('is-hidden');
    }
    lastY = y;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
})();

/* Accessible mobile navigation, used by every page. */
(function () {
  const button = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('#site-menu');
  if (!button || !menu) return;
  function closeMenu() {
    menu.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation menu');
    button.innerHTML = '&#9776;';
  }
  button.addEventListener('click', function () {
    const open = menu.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    button.innerHTML = open ? '&times;' : '&#9776;';
  });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function() { if (window.innerWidth > 750) closeMenu(); });
})();

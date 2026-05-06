(function() {
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  const navClose = document.getElementById('nav-close');
  if (!toggle) return;
  function closeMenu() { overlay.classList.remove('is-open'); toggle.classList.remove('is-open'); }
  toggle.addEventListener('click', () => { overlay.classList.toggle('is-open'); toggle.classList.toggle('is-open'); });
  navClose.addEventListener('click', closeMenu);
})();

// Antica Trattoria & Pizzeria da Orazio — interactions

// Année footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav : ombre au scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });

// Burger mobile
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('is-open');
  navLinks.classList.toggle('is-open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('is-open');
  navLinks.classList.remove('is-open');
}));

// Onglets du menu
const tabs = document.querySelectorAll('.menu__tab');
const panels = document.querySelectorAll('.menu__panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('is-active'));
  panels.forEach(p => p.classList.remove('is-active'));
  tab.classList.add('is-active');
  document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('is-active');
}));

// Reveal au scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Compteurs animés
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    countIO.unobserve(el);
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (target === 0) { el.textContent = '0' + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));


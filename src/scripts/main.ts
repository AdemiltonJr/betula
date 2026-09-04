const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

const closeMenu = () => {
  header?.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Abrir menu');
};

toggle?.addEventListener('click', () => {
  const open = header?.classList.toggle('menu-open') ?? false;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

menu?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

const hero = document.querySelector<HTMLElement>('[data-hero]');
const floatingWhatsApp = document.querySelector<HTMLElement>('[data-whatsapp-float]');

if (hero && floatingWhatsApp && 'IntersectionObserver' in window) {
  const whatsappObserver = new IntersectionObserver(([entry]) => {
    floatingWhatsApp.classList.toggle('is-active', !entry.isIntersecting);
  }, { threshold: 0 });

  whatsappObserver.observe(hero);
}

const processStory = document.querySelector<HTMLElement>('[data-process-story]');
const processSteps = processStory?.querySelectorAll<HTMLElement>('[data-step]') ?? [];

if (processStory && processSteps.length && 'IntersectionObserver' in window && !reducedMotion) {
  const processObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!(visible?.target instanceof HTMLElement)) return;
    processStory.dataset.activeProcess = visible.target.dataset.step ?? '0';
  }, { rootMargin: '-25% 0px -45%', threshold: [0.25, 0.5, 0.75] });

  processSteps.forEach((step) => processObserver.observe(step));
}

const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

const closeMenu = (restoreFocus = false) => {
  header?.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Abrir menu');
  if (restoreFocus) toggle?.focus();
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
  if (event.key === 'Escape' && header?.classList.contains('menu-open')) closeMenu(true);
});

const trustLoop = document.querySelector<HTMLElement>('[data-trust-loop]');
const trustToggle = document.querySelector<HTMLButtonElement>('[data-trust-toggle]');
const trustToggleLabel = trustToggle?.querySelector<HTMLElement>('[data-trust-toggle-label]');

trustToggle?.addEventListener('click', () => {
  const paused = trustLoop?.classList.toggle('is-paused') ?? false;
  trustToggle.setAttribute('aria-pressed', String(paused));
  if (trustToggleLabel) trustToggleLabel.textContent = paused ? 'Retomar' : 'Pausar';
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

let whatsappOcclusionObserver: IntersectionObserver | undefined;
let whatsappResizeTimer: number | undefined;

const watchWhatsAppCorner = () => {
  if (!floatingWhatsApp || !('IntersectionObserver' in window)) return;

  whatsappOcclusionObserver?.disconnect();
  const occludingElements = new Set<Element>();
  const cornerSize = 64;
  const rootMargin = `-${Math.max(0, window.innerHeight - cornerSize)}px 0px 0px -${Math.max(0, window.innerWidth - cornerSize)}px`;

  whatsappOcclusionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) occludingElements.add(entry.target);
      else occludingElements.delete(entry.target);
    });
    floatingWhatsApp.classList.toggle('is-occluded', occludingElements.size > 0);
  }, { rootMargin, threshold: 0 });

  document.querySelectorAll('main a, main button, main h1, main h2, main h3, main p, main blockquote, main figcaption, main address')
    .forEach((element) => whatsappOcclusionObserver?.observe(element));
};

watchWhatsAppCorner();
window.addEventListener('resize', () => {
  window.clearTimeout(whatsappResizeTimer);
  whatsappResizeTimer = window.setTimeout(watchWhatsAppCorner, 120);
});

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

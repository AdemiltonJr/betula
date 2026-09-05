export {};

const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
function closeMenu(restoreFocus = false) {
  header?.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Abrir menu');
  if (restoreFocus) toggle?.focus();
}
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
document.addEventListener('click', (event) => {
  if (event.target instanceof Node && header && !header.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', () => closeMenu());

const hiring = document.querySelector<HTMLElement>('[data-hiring]');
const options = hiring?.querySelectorAll<HTMLButtonElement>('[data-need]');
const jobInput = hiring?.querySelector<HTMLInputElement>('#job-role');
const contact = hiring?.querySelector<HTMLAnchorElement>('[data-need-contact]');
const resultTitle = hiring?.querySelector<HTMLElement>('[data-need-title]');
const resultDescription = hiring?.querySelector<HTMLElement>('[data-need-description]');

function updateContact() {
  const selected = hiring?.querySelector<HTMLButtonElement>('[data-need][aria-pressed="true"]');
  if (!selected || !contact || !hiring?.dataset.phone) return;
  const role = jobInput?.value.trim();
  const message = `${selected.dataset.message ?? ''}${role ? ` A vaga é: ${role}.` : ''}`;
  contact.href = `https://wa.me/${hiring.dataset.phone}?text=${encodeURIComponent(message)}`;
}
options?.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(item => item.setAttribute('aria-pressed', String(item === option)));
    if (resultTitle) resultTitle.textContent = option.dataset.title ?? '';
    if (resultDescription) resultDescription.textContent = option.dataset.description ?? '';
    updateContact();
  });
});
jobInput?.addEventListener('input', updateContact);
window.addEventListener('pageshow', updateContact);

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-waiting');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: .08 });
  if (!motionPreference.matches) {
    revealItems.forEach(item => { item.classList.add('is-waiting'); revealObserver.observe(item); });
  }
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) { revealItems.forEach(item => item.classList.remove('is-waiting')); revealObserver.disconnect(); }
  });
  const steps = document.querySelectorAll<HTMLElement>('[data-process-step]');
  const branchObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-current', entry.isIntersecting));
  }, { rootMargin: '-15% 0px -25% 0px', threshold: .2 });
  steps.forEach(step => branchObserver.observe(step));
}

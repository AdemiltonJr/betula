export function initTeamRail(root: HTMLElement) {
  const rail = root.querySelector<HTMLElement>('[data-team-rail]');
  const people = [...root.querySelectorAll<HTMLButtonElement>('[data-team-person]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-team-panel]')];
  const previous = root.querySelector<HTMLButtonElement>('[data-team-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-team-next]');
  const status = root.querySelector<HTMLElement>('[data-team-status]');
  if (!rail || !people.length) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  function select(index: number, scroll = true, focus = false) {
    active = Math.max(0, Math.min(people.length - 1, index));
    people.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
    panels.forEach((panel, i) => { panel.hidden = i !== active; });
    if (previous) previous.disabled = active === 0;
    if (next) next.disabled = active === people.length - 1;
    if (status) status.textContent = `${active + 1} de ${people.length} — ${people[active].querySelector('h3')?.textContent ?? ''}`;
    if (scroll && rail) {
      const target = people[active].getBoundingClientRect();
      const bounds = rail.getBoundingClientRect();
      rail.scrollTo({ left: rail.scrollLeft + target.left - bounds.left - 24, behavior: motion.matches ? 'instant' : 'smooth' });
    }
    if (focus) people[active].focus({ preventScroll: true });
  }
  root.dataset.teamEnhanced = '';
  select(0, false);
  rail.addEventListener('pointerover', event => { root.dataset.teamPointer = event.pointerType; });
  let dragged = false;
  people.forEach((button, index) => button.addEventListener('click', () => { if (!dragged) select(index); }));
  previous?.addEventListener('click', () => select(active - 1));
  next?.addEventListener('click', () => select(active + 1));
  rail.addEventListener('keydown', event => {
    const delta = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (delta || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const focusedIndex = people.indexOf(event.target as HTMLButtonElement);
      const origin = focusedIndex < 0 ? active : focusedIndex;
      select(event.key === 'Home' ? 0 : event.key === 'End' ? people.length - 1 : origin + delta, true, true);
    }
  });
  let originX = 0, originY = 0, originScroll = 0;
  let pointer: number | null = null;
  rail.addEventListener('pointerdown', event => {
    // Native touch swipe deliberately retains both horizontal and vertical gestures.
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointer = event.pointerId; dragged = false;
    originX = event.clientX; originY = event.clientY; originScroll = rail.scrollLeft;
  });
  rail.addEventListener('pointermove', event => {
    if (pointer !== event.pointerId) return;
    const dx = event.clientX - originX;
    if (!dragged && Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(event.clientY - originY)) {
      dragged = true; rail.setPointerCapture(event.pointerId); rail.dataset.dragging = '';
    }
    if (dragged) { event.preventDefault(); rail.scrollLeft = originScroll - dx; }
  });
  function release(event: PointerEvent) {
    if (pointer !== event.pointerId) return;
    pointer = null;
    if (rail?.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    delete rail?.dataset.dragging;
    // Keep click suppression through the pointerup-generated click, not the next gesture.
    window.setTimeout(() => { dragged = false; }, 0);
  }
  rail.addEventListener('pointerup', release);
  rail.addEventListener('pointercancel', release);
  rail.addEventListener('lostpointercapture', () => { pointer = null; delete rail.dataset.dragging; });
}

export function initTeamRail(root: HTMLElement) {
  const rail = root.querySelector<HTMLElement>('[data-team-rail]');
  const people = [...root.querySelectorAll<HTMLButtonElement>('[data-team-person]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-team-panel]')];
  const toggles = [...root.querySelectorAll<HTMLButtonElement>('[data-team-toggle]')];
  const biographies = root.querySelector<HTMLElement>('[data-team-biographies]');
  const previous = root.querySelector<HTMLButtonElement>('[data-team-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-team-next]');
  const status = root.querySelector<HTMLElement>('[data-team-status]');
  if (!rail || !people.length) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let biographyOpen = false;
  let programmaticScroll = false;
  let settleTimer: number | undefined;
  function select(index: number, scroll = true, focus = false) {
    active = Math.max(0, Math.min(people.length - 1, index));
    people.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
    const revealed = biographyOpen && toggles.some(button => Number(button.dataset.index) === active);
    root.dataset.teamOpen = String(revealed);
    if (biographies) biographies.hidden = !revealed;
    panels.forEach((panel, i) => { panel.hidden = !revealed || i !== active; });
    toggles.forEach(button => {
      const index = Number(button.dataset.index);
      const expanded = revealed && index === active;
      button.setAttribute('aria-expanded', String(expanded));
      const verb = expanded ? 'Fechar' : 'Conhecer';
      button.setAttribute('aria-label', `${verb} trajetória de ${people[index].querySelector('h3')?.textContent ?? ''}`);
      const label = button.querySelector<HTMLElement>('[data-team-toggle-label]');
      if (label) label.textContent = `${verb} trajetória`;
    });
    if (previous) previous.disabled = active === 0;
    if (next) next.disabled = active === people.length - 1;
    if (status) status.textContent = `${active + 1} de ${people.length} — ${people[active].querySelector('h3')?.textContent ?? ''}`;
    if (scroll && rail) {
      programmaticScroll = true;
      const target = people[active].getBoundingClientRect();
      const bounds = rail.getBoundingClientRect();
      rail.scrollTo({ left: rail.scrollLeft + target.left - bounds.left - 24, behavior: motion.matches ? 'instant' : 'smooth' });
    }
    if (focus) people[active].focus({ preventScroll: true });
  }
  root.dataset.teamEnhanced = '';
  select(0, false);
  rail.addEventListener('pointerover', event => { root.dataset.teamPointer = event.pointerType; });
  function settleScroll() {
    window.clearTimeout(settleTimer);
    if (programmaticScroll) { programmaticScroll = false; return; }
    if (!rail || !rail.clientWidth) return;
    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 1) return;
    const bounds = rail.getBoundingClientRect();
    let visible = 0;
    if (rail.scrollLeft >= max - 2) visible = people.length - 1;
    else if (rail.scrollLeft > 2) {
      let closest = Infinity;
      people.forEach((person, index) => {
        const rect = person.getBoundingClientRect();
        if (rect.right <= bounds.left + 24 || rect.left >= bounds.right - 24) return;
        const distance = Math.abs(rect.left - bounds.left - 24);
        if (distance < closest) { closest = distance; visible = index; }
      });
    }
    if (visible !== active) select(visible, false);
  }
  rail.addEventListener('scroll', () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settleScroll, 140);
  }, { passive: true });
  rail.addEventListener('scrollend', settleScroll);
  rail.addEventListener('wheel', () => { programmaticScroll = false; }, { passive: true });
  let dragged = false;
  people.forEach((button, index) => button.addEventListener('click', () => { if (!dragged) select(index); }));
  toggles.forEach(button => button.addEventListener('click', () => {
    if (dragged) return;
    const index = Number(button.dataset.index);
    biographyOpen = !(biographyOpen && active === index);
    select(index);
  }));
  previous?.addEventListener('click', () => select(active - 1));
  next?.addEventListener('click', () => select(active + 1));
  rail.addEventListener('keydown', event => {
    if (event.key === 'Escape' && biographyOpen) {
      biographyOpen = false;
      select(active, false);
      return;
    }
    const delta = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (delta || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const focusedIndex = people.indexOf(event.target as HTMLButtonElement);
      const toggleIndex = toggles.indexOf(event.target as HTMLButtonElement);
      const origin = focusedIndex >= 0 ? focusedIndex : toggleIndex >= 0 ? Number(toggles[toggleIndex].dataset.index) : active;
      select(event.key === 'Home' ? 0 : event.key === 'End' ? people.length - 1 : origin + delta, true, true);
    }
  });
  let originX = 0, originY = 0, originScroll = 0;
  let pointer: number | null = null;
  rail.addEventListener('pointerdown', event => {
    programmaticScroll = false;
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

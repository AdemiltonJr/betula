import assert from 'node:assert/strict';
import test from 'node:test';
import { initTeamRail } from '../src/scripts/team-rail.ts';

class ElementStub {
  dataset = {}; attributes = {}; hidden = false; disabled = false; listeners = {}; scrollLeft = 0; captured = null;
  constructor(name = '', left = 0) { this.name = name; this.left = left; }
  addEventListener(type, handler) { (this.listeners[type] ??= []).push(handler); }
  fire(type, values = {}) { const e = { preventDefault() { this.prevented = true; }, ...values }; for (const fn of this.listeners[type] ?? []) fn(e); return e; }
  setAttribute(key, value) { this.attributes[key] = value; }
  querySelector() { return { textContent: this.name }; }
  getBoundingClientRect() { return { left: this.left }; }
  scrollTo(options) { this.lastScroll = options; this.scrollLeft = options.left; }
  focus(options) { this.focused = options; }
  setPointerCapture(id) { this.captured = id; }
  hasPointerCapture(id) { return this.captured === id; }
  releasePointerCapture() { this.captured = null; }
}
function fixture(reduced = false) {
  globalThis.window = { matchMedia: () => ({ matches: reduced }), setTimeout };
  const rail = new ElementStub(), prev = new ElementStub(), next = new ElementStub(), status = new ElementStub();
  const people = ['Luciana Alvim', 'Vanessa Luiz', 'Elaine Souza', 'Georgia Frattini', 'Keila Assis', 'Jullyana'].map((n, i) => new ElementStub(n, 24 + i * 300));
  const panels = people.map(() => new ElementStub());
  const root = { dataset: {}, querySelector: s => ({ '[data-team-rail]': rail, '[data-team-prev]': prev, '[data-team-next]': next, '[data-team-status]': status })[s], querySelectorAll: s => s === '[data-team-person]' ? people : panels };
  initTeamRail(root);
  return { root, rail, prev, next, status, people, panels };
}
test('rail seleciona biografias, limita setas e navega pelo teclado sem mover página vertical', () => {
  const { rail, prev, next, status, people, panels } = fixture();
  assert.equal(prev.disabled, true);
  assert.equal(panels.filter(p => !p.hidden).length, 1);
  next.fire('click');
  assert.equal(people[1].attributes['aria-pressed'], 'true');
  assert.equal(panels[1].hidden, false);
  people[4].fire('click');
  assert.equal(panels[4].hidden, false);
  assert.equal(rail.lastScroll.behavior, 'smooth');
  const end = rail.fire('keydown', { key: 'End' });
  assert.equal(end.prevented, true);
  assert.equal(next.disabled, true);
  assert.equal(people[5].focused.preventScroll, true);
  assert.match(status.textContent, /6 de 6 — Jullyana/);
  rail.fire('keydown', { key: 'ArrowLeft' });
  assert.equal(people[4].attributes['aria-pressed'], 'true');
  rail.fire('keydown', { key: 'Home' });
  assert.equal(prev.disabled, true);
  assert.equal(rail.fire('keydown', { key: 'ArrowDown' }).prevented, undefined);
});
test('setas partem do retrato focado mesmo quando outra biografia está selecionada', () => {
  const { rail, people } = fixture();
  people[5].fire('click');
  rail.fire('keydown', { key: 'ArrowRight', target: people[0] });
  assert.equal(people[1].attributes['aria-pressed'], 'true');
  assert.equal(people[1].focused.preventScroll, true);
});
test('ampliação segue o ponteiro real sem assumir capacidade de hover do dispositivo', () => {
  const { rail, root } = fixture();
  rail.fire('pointerover', { pointerType: 'mouse' });
  assert.equal(root.dataset.teamPointer, 'mouse');
  rail.fire('pointerover', { pointerType: 'touch' });
  assert.equal(root.dataset.teamPointer, 'touch');
});
test('reduced motion usa rolagem instantânea e toque permanece nativo', () => {
  const { rail, next } = fixture(true);
  next.fire('click');
  assert.equal(rail.lastScroll.behavior, 'instant');
  rail.fire('pointerdown', { pointerType: 'touch', pointerId: 1, clientX: 100, clientY: 100 });
  const movement = rail.fire('pointermove', { pointerId: 1, clientX: 10, clientY: 400 });
  assert.equal(movement.prevented, undefined);
  assert.equal(rail.captured, null);
});
test('arraste de mouse exige limiar horizontal e não seleciona perfil no click gerado', async () => {
  const { rail, people } = fixture();
  rail.fire('pointerdown', { pointerType: 'mouse', button: 0, pointerId: 7, clientX: 100, clientY: 100 });
  rail.fire('pointermove', { pointerId: 7, clientX: 98, clientY: 101 });
  assert.equal(rail.captured, null);
  rail.fire('pointermove', { pointerId: 7, clientX: 40, clientY: 103 });
  assert.equal(rail.captured, 7);
  assert.equal(rail.scrollLeft, 60);
  rail.fire('pointerup', { pointerId: 7 });
  people[2].fire('click');
  assert.equal(people[0].attributes['aria-pressed'], 'true');
  await new Promise(resolve => setTimeout(resolve, 5));
  people[2].fire('click');
  assert.equal(people[2].attributes['aria-pressed'], 'true');
});

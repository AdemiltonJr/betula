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
  globalThis.window = { matchMedia: () => ({ matches: reduced }), setTimeout, clearTimeout };
  const rail = new ElementStub(), prev = new ElementStub(), next = new ElementStub(), status = new ElementStub();
  const people = ['Luciana Alvim', 'Vanessa Luiz', 'Elaine Souza', 'Georgia Frattini', 'Keila Assis', 'Jullyana'].map((n, i) => new ElementStub(n, 24 + i * 300));
  const panels = people.map(() => new ElementStub());
  const biographies = new ElementStub();
  const toggles = people.slice(0, 5).map((person, index) => { const button = new ElementStub(person.name); button.dataset.index = String(index); return button; });
  const root = { dataset: {}, querySelector: s => ({ '[data-team-rail]': rail, '[data-team-prev]': prev, '[data-team-next]': next, '[data-team-status]': status, '[data-team-biographies]': biographies })[s], querySelectorAll: s => ({ '[data-team-person]': people, '[data-team-panel]': panels, '[data-team-toggle]': toggles })[s] ?? [] };
  initTeamRail(root);
  return { root, rail, prev, next, status, people, panels, toggles, biographies };
}
test('trajetórias iniciam fechadas e retrato/setas não abrem leitura', () => {
  const { root, people, panels, toggles, biographies, next } = fixture();
  assert.equal(panels.filter(p => !p.hidden).length, 0);
  assert.equal(biographies.hidden, true);
  assert.equal(root.dataset.teamOpen, 'false');
  assert.ok(toggles.every(t => t.attributes['aria-expanded'] === 'false'));
  people[2].fire('click'); next.fire('click');
  assert.equal(panels.filter(p => !p.hidden).length, 0);
});
test('Conhecer trajetória abre e fecha o painel; Escape também recolhe', () => {
  const { root, rail, panels, toggles, biographies } = fixture();
  toggles[2].fire('click');
  assert.equal(panels[2].hidden, false);
  assert.equal(biographies.hidden, false);
  assert.equal(toggles[2].attributes['aria-expanded'], 'true');
  toggles[2].fire('click');
  assert.equal(panels.filter(p => !p.hidden).length, 0);
  toggles[1].fire('click'); rail.fire('keydown', { key: 'Escape' });
  assert.equal(root.dataset.teamOpen, 'false');
  assert.equal(toggles[1].attributes['aria-expanded'], 'false');
});
test('rolagem manual sincroniza a biografia sem novo scroll nem mudança de foco', async () => {
  const { rail, people, panels, toggles } = fixture();
  toggles[0].fire('click');
  rail.lastScroll = undefined;
  rail.fire('pointerdown', { pointerType: 'touch' });
  rail.clientWidth = 340; rail.scrollWidth = 1788;
  rail.getBoundingClientRect = () => ({ left: 0, right: 340, width: 340 });
  people.forEach((person, i) => { person.getBoundingClientRect = () => ({ left: 24 + i * 300 - rail.scrollLeft, right: 264 + i * 300 - rail.scrollLeft, width: 240 }); });
  rail.scrollLeft = 300; rail.fire('scroll');
  await new Promise(resolve => setTimeout(resolve, 220));
  assert.equal(people[1].attributes['aria-pressed'], 'true');
  assert.equal(panels[1].hidden, false);
  assert.equal(rail.lastScroll, undefined);
  assert.equal(people[1].focused, undefined);
  rail.scrollLeft = 1448; rail.fire('scrollend');
  assert.equal(people[5].attributes['aria-pressed'], 'true');
  assert.equal(panels[5].hidden, true); // Jullyana has no authorized biography.
  rail.scrollLeft = 0; rail.fire('scrollend');
  assert.equal(people[0].attributes['aria-pressed'], 'true');
});
test('rolagem suave de botão não sobrescreve a pessoa escolhida', async () => {
  const { rail, people } = fixture();
  rail.clientWidth = 1000; rail.scrollWidth = 1800;
  rail.getBoundingClientRect = () => ({ left: 0, right: 1000, width: 1000 });
  people.forEach((person, i) => { person.getBoundingClientRect = () => ({ left: 24 + i * 300 - rail.scrollLeft, right: 264 + i * 300 - rail.scrollLeft, width: 240 }); });
  people[3].fire('click');
  rail.scrollLeft = 300; rail.fire('scroll');
  await new Promise(resolve => setTimeout(resolve, 220));
  assert.equal(people[3].attributes['aria-pressed'], 'true');
});
test('rail seleciona biografias, limita setas e navega pelo teclado sem mover página vertical', () => {
  const { rail, prev, next, status, people, panels, toggles } = fixture();
  assert.equal(prev.disabled, true);
  assert.equal(panels.filter(p => !p.hidden).length, 0);
  next.fire('click');
  assert.equal(people[1].attributes['aria-pressed'], 'true');
  assert.equal(panels[1].hidden, true);
  toggles[1].fire('click');
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

import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
const read = p => readFile(new URL(p, import.meta.url), 'utf8');
const html = await read('../dist/index.html');
test('proposta orgânica continua uma landing page com seis perfis selecionáveis', async () => {
  assert.match(html, /data-organic-proposal/);
  assert.equal((await readdir(new URL('../src/pages/', import.meta.url))).filter(p => p.endsWith('.astro')).length, 1);
  assert.equal((html.match(/<button\b[^>]*data-team-person/g) ?? []).length, 6);
  assert.equal((html.match(/<div\b[^>]*data-team-panel/g) ?? []).length, 6);
  for (const selector of ['rail', 'prev', 'next', 'status']) assert.ok(html.includes(`data-team-${selector}`));
  const people = [...html.matchAll(/<button\b[^>]*data-team-person[^>]*>/g)].map(m => m[0]);
  for (const [index, button] of people.entries()) {
    assert.ok(button.includes(`data-index="${index}"`));
    assert.ok(button.includes(`aria-pressed="${index === 0 ? 'true' : 'false'}"`));
    assert.ok(button.includes(`aria-controls="team-bio-${index}"`));
  }
  // Panels must be visible in the delivered HTML: enhancement alone may hide them.
  for (const [panel] of html.matchAll(/<div\b[^>]*data-team-panel[^>]*>/g)) assert.doesNotMatch(panel, /\shidden(?:\s|>)/);
  const about = html.split('id="experiencia"')[1].split('</section>')[0];
  assert.match(about, /A Bétula RH é uma consultoria especializada/);
  const hero = html.split('aria-labelledby="hero-title"')[1].split('</section>')[0];
  assert.doesNotMatch(hero, /A Bétula RH é uma consultoria especializada|hero-kicker|eyebrow/);
  const method = html.split('id="como-fazemos"')[1].split('</section>')[0];
  assert.doesNotMatch(method, /<details/);
  assert.equal((method.match(/<li\b/g) ?? []).length, 5);
});
test('ações institucionais usam setas SVG sem glifos tipográficos', async () => {
  const source = await read('../src/components/conexoes/Story.astro') + await read('../src/components/conexoes/Hiring.astro');
  assert.doesNotMatch(source, /↗/);
  assert.ok((source.match(/class="action-arrow"/g) ?? []).length >= 5);
});
test('retratos orgânicos têm fallback integral, navegação explícita e movimento reduzido', async () => {
  const component = await read('../src/components/conexoes/TeamPortraits.astro') + await read('../src/scripts/team-rail.ts');
  assert.match(component, /clipPathUnits="objectBoundingBox"/);
  assert.match(component, /scroll-snap-type: x/);
  assert.match(component, /prefers-reduced-motion/);
  assert.match(component, /ArrowLeft/);
  assert.match(component, /Home/);
  assert.match(component, /End/);
  assert.match(component, /setPointerCapture/);
  assert.match(component, /pointerType !== 'mouse'/);
  assert.match(component, /data-team-enhanced/);
  assert.doesNotMatch(component, /line-clamp|setInterval|preventDefault\(\).*wheel/);
  const css = await read('../src/styles/organic.css');
  assert.match(css, /#00525[Dd]/);
  assert.match(css, /#F8D6C4/i);
  assert.match(html, /emblem-ink.png/);
  assert.match(html, /Arraste para conhecer a equipe/);
});

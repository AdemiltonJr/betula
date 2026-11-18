import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const css = await readFile(new URL('../src/styles/organic.css', import.meta.url), 'utf8');
test('aproxima os lados do hero somente no desktop', () => {
  assert.match(css, /@media \(min-width: 901px\)/);
  assert.match(css, /\.organic-hero-copy\s*\{\s*padding-inline-start: clamp/);
  assert.match(css, /\.organic-hero-art\s*\{\s*transform: translateX/);
});
test('folhas das etapas 3 e 4 ficam mais próximas da bolinha', () => {
  for (const index of [2, 3]) {
    const rule = css.match(new RegExp('\\[data-step="'+index+'"\\] \\.step-leaf \\{([^}]+)\\}'))[1];
    assert.ok(Number(rule.match(/top:\s*(-?[\d.]+)px/)[1]) <= 10);
  }
});
test('aberturas institucionais seguem título acima da descrição', () => {
  assert.match(css, /\.about-inner \{[^}]*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /\.institutional-values \.section-space \{[^}]*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /\.about-inner > \.text-link \{ grid-column: auto;/);
});

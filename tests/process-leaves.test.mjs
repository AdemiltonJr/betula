import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const css = await readFile(new URL('../src/styles/organic.css', import.meta.url), 'utf8');
const story = await readFile(new URL('../src/components/conexoes/Story.astro', import.meta.url), 'utf8');
test('retira somente os ganchos e inclui folhas decorativas junto aos quatro números', async () => {
  assert.match(css, /\.process-moment::before\s*\{\s*content:\s*none/);
  assert.match(story, /class="step-leaf"[^>]*aria-hidden="true"/);
  assert.match(css, /\.step-leaf\s*\{/);
  assert.doesNotMatch(css, /\.process-branches::before/);
  const inherited = await readFile(new URL('../src/styles/conexoes.css', import.meta.url), 'utf8');
  assert.match(inherited, /\.process-branches::before \{ content: ''; position: absolute; top: 26px; bottom: 100px; left: 20px; width: 1px;/);
  assert.match(inherited, /\.process-branches::before \{ left: 15px; \}/);
  assert.match(inherited, /\.process-branches::before \{ left: 20px; bottom: 110px; \}/);
});

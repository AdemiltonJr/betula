import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const story = await readFile(new URL('../src/components/conexoes/Story.astro', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles/differences-sticky.css', import.meta.url), 'utf8').catch(() => '');
test('alternativa separa título fixo da introdução e mantém cinco diferenciais na rolagem da página', () => {
  assert.match(story, /class="container differences-flow"/);
  const heading = story.match(/<header class="institutional-values">([\s\S]*?)<\/header>/)?.[1];
  assert.ok(heading);
  assert.match(heading, /id="values-title"/);
  assert.doesNotMatch(heading, /values-description/);
  assert.match(story, /class="differences-reading"/);
  assert.match(css, /\.differences-flow \.institutional-values \{[^}]*position: sticky;/);
  assert.doesNotMatch(css, /overflow(?:-y)?:\s*(?:auto|scroll)|scroll-snap|scroll-behavior|touch-action|position:\s*fixed/);
});

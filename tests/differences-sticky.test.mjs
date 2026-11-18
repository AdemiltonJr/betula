import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const story = await readFile(new URL('../src/components/conexoes/Story.astro', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles/differences-sticky.css', import.meta.url), 'utf8').catch(() => '');
test('título e introdução fixam juntos à direita, mantendo tópicos à esquerda', () => {
  assert.match(story, /class="container differences-flow"/);
  const heading = story.match(/<header class="institutional-values">([\s\S]*?)<\/header>/)?.[1];
  assert.ok(heading);
  assert.match(heading, /id="values-title"/);
  assert.match(heading, /values-description/);
  assert.match(css, /\.differences-flow \.institutional-values \{[^}]*grid-column: 2;/);
  assert.match(css, /\.differences-reading \{[^}]*grid-column: 1;/);
  assert.match(story, /class="differences-reading"/);
  assert.match(css, /\.differences-flow \.institutional-values \{[^}]*position: sticky;/);
  assert.doesNotMatch(css, /overflow(?:-y)?:\s*(?:auto|scroll)|scroll-snap|scroll-behavior|touch-action|position:\s*fixed/);
});
test('equipe existente separa diferenciais das etapas sem duplicar seções', () => {
  const differences = story.indexOf('id="como-fazemos"');
  const team = story.indexOf('id="equipe"');
  const process = story.indexOf('id="processo"');
  assert.ok(differences < team && team < process);
  assert.equal(story.match(/id="equipe"/g)?.length, 1);
  assert.equal(story.match(/id="processo"/g)?.length, 1);
});

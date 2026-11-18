import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const css = await readFile(new URL('../src/styles/organic.css', import.meta.url), 'utf8');
const team = await readFile(new URL('../src/components/conexoes/TeamPortraits.astro', import.meta.url), 'utf8');
test('diferenciais usam uma escala comum sem exceção gigante no primeiro título', () => {
  assert.doesNotMatch(css, /\.institutional-differences li:first-child h3/);
  assert.match(css, /\.institutional-differences li h3 \{[^}]*font-size: clamp\(24px, 2.1vw, 30px\)/);
  assert.match(css, /\.institutional-values h2 \{[^}]*font-size: clamp\(32px, 3.2vw, 46px\)/);
});
test('trajetória tem controle próprio, separado do retrato, e acessível por expansão', () => {
  assert.match(team, /data-team-toggle/);
  assert.match(team, /aria-expanded="false"/);
  assert.match(team, /data-team-biographies/);
  const portraitButton = team.split('data-team-person')[1].split('</button>')[0];
  assert.doesNotMatch(portraitButton, /data-team-toggle|Conhecer trajetória/);
  assert.match(team, /person.bio && <button/);
});

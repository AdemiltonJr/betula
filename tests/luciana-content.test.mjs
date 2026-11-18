import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const source = await readFile(new URL('./fixtures/2026-11-17-texto-novo-luciana.md', import.meta.url), 'utf8');
const text = html.replace(/<[^>]+>/g, ' ').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const approved = source.slice(source.indexOf('Recrutamento e Seleção com estratégia')).split('**Jullyana**')[0]
  .split('\n').map(line => line.replace(/^## /, '').replaceAll('**', '').trim()).filter(Boolean);

test('aplica cada linha do texto aprovado da Luciana literalmente', () => {
  for (const line of approved) assert.ok(text.includes(line), `Texto aprovado ausente: ${line}`);
});

test('preserva cinco integrantes sem inserir Jullyana na equipe', () => {
  const section = html.split('id="equipe"')[1].split('</section>')[0];
  assert.equal((section.match(/class="team-profile"/g) ?? []).length, 5);
  assert.doesNotMatch(section, /Jullyana|Julyanna/);
});

test('depoimentos permanecem UTF-8, sem mojibake ou caracteres de substituição', () => {
  assert.match(html.slice(0, 1024), /<meta charset="UTF-8">/);
  const section = html.split('id="depoimentos"')[1].split('</section>')[0];
  assert.doesNotMatch(section, /Ã[§£©ª¡³´µº­]|Â[ ªº]|â€|\uFFFD/);
  for (const word of ['Bétula', 'Seleção', 'avaliação', 'organização', 'experiência', 'conexões']) assert.ok(section.includes(word), word);
});

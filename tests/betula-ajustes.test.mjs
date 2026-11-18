import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const html = await readFile(new URL('../dist/index.html', import.meta.url),'utf8');

test('metodo tem titulo unico, abertura e cinco blocos na mesma secao',()=>{
  const section=html.split('id="como-fazemos"')[1].split('</section>')[0];
  assert.equal((section.match(/<h2\b/g)??[]).length,1);
  assert.ok(section.includes('Como trabalhamos e nossos diferenciais'));
  assert.ok(section.includes('Cada empresa tem necessidades específicas de contratação.'));
  assert.equal((section.match(/<li\b/g)??[]).length,5);
  assert.doesNotMatch(html, /<h2[^>]*>Nossos diferenciais<\/h2>/);
});

test('Jullyana aparece como sexta integrante com foto e somente nome',()=>{
  const section=html.split('id="equipe"')[1].split('</section>')[0];
  const articles=[...section.matchAll(/<article\b[^>]*class="team-profile"[^>]*>([\s\S]*?)<\/article>/g)].map(m=>m[1]);
  assert.equal(articles.length,6);
  const jullyana=articles.find(a=>a.includes('>Jullyana</h3>'));
  assert.ok(jullyana);
  assert.match(jullyana,/src="\/assets\/img\/team-jullyana\.jpg"/);
  assert.doesNotMatch(jullyana,/<p\b/);
  assert.equal(jullyana.replace(/<[^>]+>/g,'').trim(),'Jullyana');
});

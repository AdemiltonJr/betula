import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';
import { candidateReviews, reviewSegments } from '../src/data/candidate-reviews.ts';

async function readBuiltHtml() {
  for (const path of ['../dist/index.html', '../dist/client/index.html']) {
    try { return await readFile(new URL(path, import.meta.url), 'utf8'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  throw new Error('HTML compilado não encontrado. Execute npm run build.');
}
const html = await readBuiltHtml();

test('publica apenas a lista revisada de clientes e preserva os relatos de candidatos', () => {
  for (const file of ['cli-renova.png', 'cli-bollhoff.png', 'cli-dellys.png', 'cli-enxuto.png', 'cli-eucatex.png', 'cli-vetnil.png']) assert.ok(!html.includes(file), `Cliente retirado reapareceu: ${file}`);
  assert.doesNotMatch(html, /Tamara Tordin|team-tamara-tordin|equipe-grupo-2\.jpg/);
  assert.equal((html.match(/class="team-profile"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /Paulo César|Sala 311|Villa Bella|PostalAddress/);
  assert.match(html, /Keila Assis/);
  const text = html.replace(/<[^>]+>/g, '');
  assert.equal(candidateReviews.length, 5);
  assert.equal(new Set(candidateReviews.map(review => review.url)).size, 5);
  for (const review of candidateReviews) {
    assert.ok(html.includes(review.url));
    for (const paragraph of review.paragraphs) {
      assert.ok(text.includes(paragraph), `Fala alterada ou omitida: ${review.name}`);
      assert.equal(reviewSegments(paragraph).map(part => part.text).join(''), paragraph);
    }
    assert.ok(review.paragraphs.some(paragraph => paragraph.includes(review.excerpt)), `Trecho não literal: ${review.name}`);
  }
});

test('entrega título único, idioma e conteúdo principal acessível', () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /lang="pt-BR"/);
  assert.match(html, /<main id="conteudo" tabindex="-1">/);
  assert.match(html, /Pular para o conteúdo/);
});

test('preserva SEO local e canonical e não inventa reviews', () => {
  assert.match(html, /<title>Recrutamento e Seleção em Campinas \| Bétula RH<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/betularh\.com\.br\/"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /<h1[^>]*>Recrutamento e seleção/);
  if (process.env.PUBLIC_SITE_INDEXABLE !== 'true') assert.match(html, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(html, /"@type":"Review"/);
});

test('todos os destinos internos existem e ids são únicos', () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(target), `Âncora ausente: ${target}`);
});

test('imagens locais existem e possuem texto alternativo e dimensões', async () => {
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    // Astro pode serializar alt="" como atributo vazio alt em imagens decorativas.
    assert.match(tag, /\balt(?:="[^"]*"|(?=\s|>))/);
    assert.match(tag, /\bwidth="\d+"/);
    assert.match(tag, /\bheight="\d+"/);
    const source = tag.match(/src="([^"]+)"/)?.[1];
    if (source?.startsWith('/')) await access(new URL(`../public${source}`, import.meta.url));
  }
});

test('processo completo é entregue sem depender do javascript', () => {
  assert.equal((html.match(/<article\b[^>]*data-process-step/g) ?? []).length, 4);
  for (const title of ['Compreensão', 'Busca', 'Avaliação', 'Acompanhamento']) assert.ok(html.includes(title));
  assert.ok((html.match(/<details\b/g) ?? []).length >= 8);
});

test('contato direto funciona sem javascript e seletor tem estado inicial definido', () => {
  assert.match(html, /https:\/\/wa\.me\/5519981389865\?text=/);
  assert.match(html, /<noscript>/);
  assert.equal((html.match(/<button\b[^>]*aria-pressed="true"/g) ?? []).length, 1);
  assert.equal((html.match(/<button\b[^>]*aria-pressed="false"/g) ?? []).length, 2);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /label for="job-role"/);
  assert.match(html, /mailto:curriculo@betularh.com.br/);
  assert.doesNotMatch(html, /\/api\/contact/);
});

test('links externos abertos em outra aba protegem a origem', () => {
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag, /rel="[^"]*noopener/);
});

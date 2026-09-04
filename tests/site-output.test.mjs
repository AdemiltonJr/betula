import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const outputCandidates = [
  new URL('../dist/index.html', import.meta.url),
  new URL('../dist/client/index.html', import.meta.url),
];

async function readBuiltHtml() {
  for (const candidate of outputCandidates) {
    try {
      return await readFile(candidate, 'utf8');
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }

  throw new Error('HTML compilado não encontrado em dist/index.html ou dist/client/index.html.');
}

const html = await readBuiltHtml();

test('expõe a promessa aprovada em um único h1', () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(
    html,
    /Antes de buscar alguém, entendemos onde sua empresa quer chegar\./,
  );
});

test('expõe SEO local e canonical coerentes', () => {
  assert.match(html, /<title>Recrutamento e Seleção em Campinas \| Bétula RH<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/betularh\.com\.br\/"/);
  assert.match(html, /Consultoria de recrutamento e seleção em Campinas/);
});

test('usa EmploymentAgency sem review próprio', () => {
  assert.match(html, /"@type":"EmploymentAgency"/);
  assert.doesNotMatch(html, /"@type":"Review"/);
});

test('mantém as onze etapas reais no HTML inicial', () => {
  assert.equal((html.match(/class="process-step"/g) ?? []).length, 11);
  assert.match(html, /Compreensão do segmento, momento e cultura do cliente/);
  assert.match(html, /Acompanhamento do candidato admitido/);
});

test('oferece WhatsApp real sem depender de formulário', () => {
  assert.match(html, /https:\/\/wa\.me\/5519981389865\?text=/);
  assert.doesNotMatch(html, /data-contact-form/);
  assert.doesNotMatch(html, /\/api\/contact/);
});

test('não reintroduz padrões rejeitados', () => {
  assert.doesNotMatch(html, /hero-birch\.jpg/);
  assert.doesNotMatch(html, /data-depo-track/);
  assert.doesNotMatch(html, /data-parallax/);
  assert.doesNotMatch(html, /hero-selos/);
  assert.doesNotMatch(html, /section-index/);
  assert.doesNotMatch(html, /[—–]/);
});

test('inclui conversão mobile persistente sem listener contínuo de scroll', () => {
  assert.equal((html.match(/<a\b[^>]*data-whatsapp-float/g) ?? []).length, 1);
  assert.equal((html.match(/<section\b[^>]*data-hero/g) ?? []).length, 1);
  assert.match(html, /aria-label="Conversar com a Bétula pelo WhatsApp"/);
  assert.doesNotMatch(html, /addEventListener\(["']scroll/);
});

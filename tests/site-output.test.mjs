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

test('renderiza uma página institucional com um único h1', () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /data-hero/);
  assert.match(html, /class="hero-media"/);
  assert.match(html, /equipe-grupo-2\.jpg/);
});

test('mantém SEO local e canonical coerentes', () => {
  assert.match(html, /<title>Recrutamento e Seleção em Campinas \| Bétula RH<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/betularh\.com\.br\/"/);
  assert.match(html, /"@type":"EmploymentAgency"/);
  assert.doesNotMatch(html, /"@type":"Review"/);
});

test('expõe a prova de confiança e o processo no HTML inicial', () => {
  assert.match(html, /data-trust-loop/);
  assert.match(html, /data-process-story/);
  assert.equal((html.match(/data-process-step/g) ?? []).length, 4);
  assert.match(html, /Compreensão/);
  assert.match(html, /Acompanhamento/);
});

test('usa fotografias reais como estrutura visual', () => {
  assert.match(html, /socias-2\.jpg/);
  assert.match(html, /office-candid\.jpg/);
  assert.match(html, /equipe-grupo\.jpg/);
  assert.match(html, /team-luciana-alvim\.jpg/);
});

test('oferece WhatsApp sem depender de formulário ou javascript', () => {
  assert.match(html, /https:\/\/wa\.me\/5519981389865\?text=/);
  assert.match(html, /data-whatsapp-float/);
  assert.match(html, /data-whatsapp-icon/);
  assert.doesNotMatch(html, /<form\b/);
  assert.doesNotMatch(html, /\/api\/contact/);
});

test('não reintroduz padrões visuais rejeitados', () => {
  assert.doesNotMatch(html, /hero-birch\.jpg/);
  assert.doesNotMatch(html, /hero-mark/);
  assert.doesNotMatch(html, /atuacao-grid/);
  assert.doesNotMatch(html, /section-index/);
  assert.doesNotMatch(html, /[—–]/);
});

test('não usa listener contínuo de scroll', () => {
  assert.doesNotMatch(html, /addEventListener\(["']scroll/);
});

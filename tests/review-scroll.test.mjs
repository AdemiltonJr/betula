import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('leitura dos depoimentos preserva rolagem interna sem aprisionar a pagina', async () => {
  const component = await readFile(new URL('../src/components/conexoes/CandidateReviews.astro', import.meta.url), 'utf8');
  const rule = component.match(/\[data-enhanced\] \.review-reading\s*\{([^}]+)\}/)?.[1];
  assert.ok(rule, 'Regra da área de leitura ausente');
  assert.match(rule, /overflow-y:\s*auto/);
  assert.match(rule, /overscroll-behavior-y:\s*auto/, 'A página precisa continuar rolando quando a caixa não puder rolar');
});

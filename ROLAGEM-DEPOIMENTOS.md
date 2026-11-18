# Correção de rolagem dos depoimentos — 18/11/2026

Autorização do dono: “pode fazer esse ajuste”. Mesma branch `jose/texto-luciana-depoimentos`, somente prévia; site oficial preservado.

Causa reproduzida: área `.review-reading` com altura fixa e `overscroll-behavior-y: contain`. No resumo de cliente, clientHeight=scrollHeight=330px e a roda do mouse não movia nem a caixa nem a página. Mudando somente essa propriedade para auto em diagnóstico transitório, a página avançou450px; código não foi alterado no diagnóstico.

Correção real: apenas `overscroll-behavior-y: auto` no componente CandidateReviews.astro. Mantidos overflow-y:auto, altura, layout, textos, acentos, autores, abas, fotos e leitura integral. A caixa continua rolando por dentro quando há texto longo; ao chegar ao começo/fim, a rolagem passa à página.

Teste de regressão versionado falhou antes e passou depois; build e15 testes de Node passaram. Teste Chromium com eventos de roda do mouse,1280 e390px: oito casos passaram — resumo libera página, texto completo rola por dentro, fim libera rolagem para baixo e início libera para cima. No desktop, o texto integral testado tinha21px de excedente e rolou esses21px; no celular avançou60px dentro da caixa. Sem exigir quantidade artificial de excesso para considerar o comportamento correto.

Evidência detalhada: `/opt/data/cache/scratch/betula-scroll-fix/wheel-qa.json`; reprodução `/opt/data/cache/scratch/betula-scroll-diagnostico.cjs`; verificação `/opt/data/cache/scratch/betula-scroll-regression.cjs`. Browser fechado em finally e servidor temporário encerrado após cada teste. Teste em viewport emulado com roda sintetizada, não ensaio de gesto físico em celular. Não há redesign nem alteração em outras áreas.

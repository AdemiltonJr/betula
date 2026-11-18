# Ajustes da proposta orgânica — folhas e equipe sincronizada

Escopo autorizado pelo Ademilton em18/11/2026, após conferir no celular. Desktop ainda pendente de avaliação dele. Ajuste da mesma branch `jose/betula-conexoes-organicas`, sem publicação oficial.

## Pedido e limites

- Preservar exatamente a linha reta das etapas: o dono corrigiu a interpretação anterior; o problema era somente o gancho curvo.
- Retirar o gancho e acrescentar pequenas folhas inspiradas na bétula junto aos quatro números.
- Fazer a biografia acompanhar a pessoa em destaque durante a rolagem da equipe, além dos controles já existentes.
- Manter textos literais, paleta, fotografias, logo e Jullyana somente com foto/nome. Preservar as outras branches e prévias.

## Implementação

- `Story.astro`: folha SVG decorativa com bordas serrilhadas e nervuras, sem texto acessível redundante, junto ao número.
- `organic.css`: somente o pseudoelemento curvo de `.process-moment::before` foi suprimido. Nenhuma regra de `.process-branches::before` foi adicionada/alterada; estilos herdados `conexoes.css` e `institucional.css` permanecem intactos. Folha em verde institucional, sem cobrir número ou texto.
- `team-rail.ts`: ao terminar rolagem manual, o retrato em posição de destaque no início da faixa determina a biografia e o estado dos controles; no fim da faixa, seleciona a última pessoa. Atualização sem novo scroll, sem deslocar foco e sem anúncios repetidos durante cada frame. Scroll suave disparado por botão/teclado preserva a seleção explícita; mouse/toque manuais retomam o acompanhamento. Sem avanço automático.

## Verificação real

- Testes novos executados antes da implementação: duas falhas esperadas (folhas/ganchos e sincronização manual).
- `npm run check`: zero erros, avisos e hints. `npm test`:26 testes aprovados, build de uma página.
- QA Chromium/Puppeteer local em320/390/768/1024/1440px: quatro folhas, ganchos ausentes, sem overflow ou imagens quebradas; folhas não encostam no texto. Linha reta mantém left20/20/15/20/20px conforme os breakpoints herdados.
-30 estados de rolagem manual conferidos; biografia e retrato selecionado coincidem, sem mudança de foco nem rolagem vertical. Swipe real sintetizado via CDP avançou a faixa279px e selecionou Vanessa/biografia correspondente.
- Regressão completa anterior reexecutada: clique, teclas, botões, ampliação por mouse, arraste de mouse, swipe e gesto vertical, reduced motion e cinco biografias semJS aprovados. Não é ensaio em aparelho físico.
- Detector Impeccable dos três arquivos de produto: `[]`. Revisão visual direta das capturas de celular/computador, incluindo close da folha e biografia sincronizada.
- Provas locais: `/opt/data/cache/scratch/betula-folhas-sync/qa.json`, `betula-folhas-sync-regressao.json` e capturas no mesmo diretório.
- Próximo envio somente da branch de prévia. URL pública será conferida por HTTP, sem navegador remoto, conforme o fluxo vigente; encerramento técnico registrado no relatório de entrega.

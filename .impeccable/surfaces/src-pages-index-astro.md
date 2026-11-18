---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/components/conexoes/Hero.astro","src/components/conexoes/Story.astro","src/components/conexoes/TeamPortraits.astro"]
---

# Proposta Bétula — conexões orgânicas

Modo: Persuade. Landing page única para empresas que precisam contratar; ação principal: conversar sobre uma contratação. Proposta alternativa para avaliação do Ademilton, não aprovada pela cliente e não publicada no site oficial.

## Direction contract

THESIS: Trocar a sucessão de caixas por uma composição orgânica da própria Bétula. Preservar a clareza de contratação e o conteúdo integral, sem trocar a parede de texto por uma parede de sanfonas.

OWN-WORLD: Verde-petróleo #00525D, pêssego #F8D6C4 e branco; Manrope e Source Sans 3 locais. Logo verdadeiro e emblema de troncos/ramificações como origem dos contornos, sem redesenhar a identidade. Fotografias existentes; nenhuma pessoa ou imagem gerada.

STORY: Reconhecer recrutamento e seleção, entender a consultoria e o método, conhecer quem atende e iniciar conversa. Conteúdo da Luciana literal; Jullyana somente foto e nome.

FIRST VIEWPORT: Mensagem literal e ação legível com composição orgânica ampla da marca, fotografia já disponível e texto institucional longo distribuído depois da abertura. A ação deve permanecer acessível na primeira tela pequena. Equipe: retratos em faixa horizontal integrada, sem grade de cartões, ampliando ao hover/foco; seleção de biografia explícita e controles sempre visíveis.

FORM: Execução em código da direção pinada pelo usuário: “utilizar mais ou menos isso aí” (paleta), “muito da identidade da logo dela”, “linhas que remetam à logo dela”, equipe em “rolagem” e “passa o mouse em cima da pessoa ela cresce”. seed:e62914a706bd7f15, preservando a direção explícita acima de qualquer sugestão aleatória. Nenhuma estrutura multipágina foi aprovada para esta alternativa.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Requisitos de funcionamento

- Faixa manual, sem avanço automático. Mouse, toque, botões e setas/Home/End; alvos de toque de 44px e foco visível.
- Crescimento sem reflow; máscaras não podem cortar rostos. Não capturar gesto vertical nem rolagem da página.
- Texto integral de cada biografia em painel compartilhado. Sem JS: todas as biografias continuam disponíveis; movimento reduzido respeitado.
- Textos literais conferidos contra tests/fixtures/2026-11-17-texto-novo-luciana.md; contatos, depoimentos, clientes, SEO/noindex e correção anterior da rolagem preservados.
- Inspeção sequencial em 320, 390, 768, 1024 e 1440px, com imagens reais; navegador e servidor encerrados na entrega.

## Recuperação conferida antes da implementação

- Completa: jose/texto-luciana-depoimentos — 36440de822084e92cdd36f606f7f910ea44b274b; tag arquivo/betula-texto-completo-2026-11-18.
- Leve: jose/betula-versao-leve — dde14c5b40491e7f7aa9b239d2ecbd980944a2a4; tag arquivo/betula-versao-leve-2026-11-18.
- Oficial: main — 8ce09f84111e2ada9bc22ca4edfef59f1c15577a.
- Nova proposta: jose/betula-conexoes-organicas, derivada da versão completa.
- Referências remotas lidas e tags resolvidas; snapshot em /opt/data/cache/scratch/betula-organica-preservacao.json.

## Avaliação e entrega

Implementação conferida pelo pai: `npm run check` sem erros, avisos ou hints; `npm test` construiu uma página e aprovou 23 testes. Duas regressões de teclado/ponteiro tiveram teste vermelho antes da correção. `git diff --check` passou; fonte central e fixture permaneceram intactas.

QA em Chromium/Puppeteer (não em aparelho físico): 320, 390, 768, 1024 e 1440px sem overflow da página ou imagens faltantes; 28 linhas literais; 12 estados de perfis; botões, Enter, setas, Home/End; ampliação real 1→1,075; arraste de mouse e swipe deslocaram a faixa; gesto vertical moveu a página sem aprisionamento. Movimento reduzido sem transição/smooth; 5 biografias disponíveis sem JS. Provas em /opt/data/cache/scratch/betula-organica/qa.json e capturas no mesmo diretório.

Inspeção encontrou overflow de 2px no FAQ em 320px, corrigido com dimensionamento da coluna/título. Capturas preparadas com rolagem instantânea para não registrar uma seção anterior durante smooth scroll.

Auditoria: detector Impeccable final sem achados sobre os arquivos adicionados e alterados. Sloplint com render produziu capturas em 1280/1440/1920 e páginas completas em 1440/375, mas não equivale a aprovação global: branco institucional e ampliação de retratos são escolhas explícitas do pedido, e sugestões de stamp/espaçamento herdadas da ferramenta são documentadas, não motivo para trocar a marca. Tokens de cor da alternativa foram centralizados. Foco dos controles e borda do campo corrigidos; render confirmado sem os dois achados de contraste. Permanecem 2 FAIL do sloplint (stamp específico Hallmark e limite de 80 palavras em conteúdo literal), 33 REFLEX e 4 WARN, registrados em /opt/data/cache/scratch/betula-organica/sloplint-confirmacao.txt; não é alegado PASS global. Taste gate não concluiu no limite de 180s; nenhum PASS desse gate é alegado. Conferência funcional/visual foi realizada pela matriz descrita acima.

A revisão independente confirmou a direção e solicitou apenas uniformizar setas de ação. O lote foi aplicado com SVG 22×22, preservando os textos e destinos, e recapturado; teste de regressão falhou antes da correção e passou depois. A pontuação final independente do lote retornou `ship`, restrita às correções SVG/documentação, sem autorizar publicação nem substituir aprovação estética. Os sete ícones finais e quatro capturas foram conferidos. Prévia entregue: https://betula-4iwg6zey1-ademilton-juniors-projects.vercel.app (commit de código 6660752792b01e16e955a50e280e211e0b624498). URL e recibo de entrega ficarão também em /root/marketing-os/relatorios/betula-conexoes-organicas-2026-11-18.md. Não há aprovação estética do dono nem da cliente; produção permanece intocada.

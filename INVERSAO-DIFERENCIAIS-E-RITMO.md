# Revisão — diferenciais invertidos e equipe como respiro

Pedido do Ademilton: aprovada a direção da alternativa; inverter os lados obrigatoriamente e fixar também a descrição abaixo do título. Autorizada, a critério do José, uma seção intermediária para evitar repetição com as etapas. Sem autorização de produção.

## Aplicação
- Acima900px: tópicos na coluna esquerda; título e introdução literal juntos, fixos na direita. Mantidos tipografia, paleta e ramificações.
- Equipe existente intercalada entre diferenciais e etapas. Sequência: apresentação → diferenciais → quem executa → etapas → provas/contato. É uma escolha de ritmo para esta página, não regra universal de conversão. Fotografias, cores e faixa horizontal quebram a repetição dos dois trechos verticais sem inventar texto nem uma seção extra.
- Equipe e processo movidos integralmente, sem reescrita, duplicação ou alterações de controlador/folhas. Biografias continuam fechadas por padrão e abertas somente pelo botão.
- Até900px: grupo título+descrição permanece fixo abaixo do menu quando há altura suficiente. Em celular até600px de largura e640px de altura, só título fixa e a introdução passa normalmente, para não encobrir tópicos. Paisagem de altura até480px e impressão retiram fixação.
- Âncora Diferenciais ajustada ao grupo mais alto; scroll segue nativo, sem área interna ou bloqueio de gestos.

## Verificação
- Dois ciclos de regressão: título/introdução na direita e equipe entre seções falharam antes dos respectivos patches.36testes e build passaram; Astro check sem erros/avisos/hints. Fonte literal preservada.
- QA Chromium local em320×568,390×844,768×1024,1024×768,1280×576,1440×900: inversão, título/descrição imóveis juntos em telas suficientes, passagem dos tópicos e limite da seção, roda sobre bloco fixo livre, âncora desobstruída, sem overflow ou scroll interno.
- Regressão de altura real320×568 mostrou a faixa ocupando leitura excessiva; aplicada adaptação somente de baixa altura e matriz passou.
- Toque CDP390×844: página move de y1520 para1705 e introdução permanece em y170,59. Abertura/fechamento da primeira biografia testados nos seis tamanhos depois da mudança de posição. SemJS: cinco diferenciais e cinco biografias legíveis. Paisagem e impressão verificadas. Não é teste físico/leitor de tela.
- Revisão visual direta: desktop invertido, móvel com descrição fixa e equipe entre seções. Provas /opt/data/cache/scratch/betula-invertida/; qa.json, extra.json, capturas. Detector Impeccable=[]; sloplint render executado e achados restantes documentados, sem aprovação global presumida.
- Comparação programática do código de equipe/processo com0d449d54b4be99c9f73be5c392b8ae6934d76b8f mostra ambos integralmente idênticos, somente reposicionados. Hero, organic.css, dados, fixture e componentes/controladores de equipe intactos.

Referência anterior: https://betula-imoxat03g-ademilton-juniors-projects.vercel.app, commit0d449d54b4be99c9f73be5c392b8ae6934d76b8f. Branch de revisão jose/betula-diferenciais-fixos. Referência orgânica e oficial não são alvo; nova URL/leitura pública e encerramento constam no relatório de entrega.

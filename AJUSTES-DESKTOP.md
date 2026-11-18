# Ajustes após avaliação no desktop

Pedido do Ademilton: aproximar os lados do hero; encostar as folhas3/4 nas bolinhas; padronizar título acima da descrição; preservar a equipe, cuja apresentação desktop foi aceita. Não autoriza produção.

## Patch restrito

- Hero somente acima de900px: bloco textual deslocado para a direita e composição inteira para a esquerda, sem redimensionar imagem/logo, mudar fontes/copy ou alterar o hero móvel.
- Folhas3/4 aproximadas da borda das bolinhas. Mantidos desenho, quatro posições diferentes, ativação/transição compartilhada, números e linha reta.
- Aberturas institucionais Quem somos e Como trabalhamos passam a título em cima e parágrafo abaixo, alinhados pela esquerda. Cinco diferenciais continuam com título acima do texto e disposição assimétrica preservada. Nenhum texto foi reescrito.
- Componente/controlador da equipe, retratos, estilos herdados e fonte central não foram alterados.

## Provas

- Três regressões novas falharam antes da implementação e passaram depois.
- npm run check:0erros/avisos/hints. npm test: build de uma página e30 testes aprovados. diff--check limpo.
- Comparação real de before.json/after.json em320/390/768/1024/1280/1440px: desktop com título mais à direita e composição mais à esquerda, escala da imagem e fonte preservadas; hero até900px mantém as mesmas caixas; títulos acima dos parágrafos em todos os blocos institucionais. Dimensões da faixa/retratos da equipe idênticas. Sem overflow ou imagens quebradas.
- Distância da forma pintada das folhas3/4 à circunferência medida no navegador confirma contato com a borda, em vez de flutuar separada; não foi movida a bolinha nem a linha.
- Regressão das folhas:20 estados ativos e20 inativos em cinco larguras, cores compartilhadas e reduced-motion aprovados.
- Regressão da equipe:30 estados de rolagem e swipe aprovados, código da equipe intacto por diff.
- Capturas e JSON em /opt/data/cache/scratch/betula-desktop-refino/; revisão visual direta do hero, blocos e folha3. Detector Impeccable: []. Sloplint estático mantém alertas de convenção/stamp já documentados; não se alega aprovação global.
- Uma sondagem adicional em janela baixa1280×576 encontrou CTA abaixo da primeira dobra. Não se alterou a altura/composição aprovada para resolver esse item fora do pedido; a matriz aprovada acima usa altura844/900. Não foi declarada aprovação de toda combinação de altura e largura.

Branch de trabalho: jose/betula-conexoes-organicas. Versão anterior recuperável no commit ead6c636f9bbac37a13f8286ca050753adb4a132 e na prévia entregue anteriormente. URL, leitura pública e encerramento no relatório de entrega em /root/marketing-os/relatorios/.

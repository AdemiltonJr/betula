# Folhas das etapas — refinamento

Pedido do Ademilton: manter a ideia, substituir o desenho anterior, acompanhar o efeito das bolinhas e variar as posições entre etapas. Escopo restrito à folha; mesma branch de prévia, sem produção.

- Desenho SVG refeito: contorno mais delicado, serrilhas suaves e nervuras finas, inspirado na bétula, sem mudar logo/paleta.
- Folha herda o mesmo estado is-current da etapa que já controla a bolinha: preenchimento, contorno e nervuras acompanham fundo/borda/texto. Transição de0,4s, removida com movimento reduzido. Não foi criado outro observador nem animação independente.
- Quatro composições estáveis diferentes: superior direita, superior esquerda, inferior direita e inferior esquerda, com rotação e escala próprias. Variação intencional, não sorteio a cada carregamento.
- Linha reta, números, texto, layout, rolagem e biografias da equipe não modificados. Sem ganchos.

## Verificação real

- Novo teste executado em vermelho antes da implementação; depois27 testes aprovados, build de uma página e Astro check sem erros/avisos/hints.
- Chromium local em320/390/768/1024/1440px:20 casos ativos e20 inativos. Comparação computada confirma preenchimento da folha igual ao fundo da bolinha, contorno igual à borda e nervuras iguais ao texto ativo; quatro variantes distintas; sem corte lateral, invasão do título, overflow ou erros de página. Movimento reduzido: transição0s.
- Observador real ativado por rolagem; nenhum estado foi forçado para validar cores. Cores esperadas conferidas após estabilizar a transição.
- Regressão da rolagem sincronizada da equipe:30 estados manuais e swipe aprovados. Controlador da equipe e regras da linha reta intactos por diff contra e24ba0e.
- Primeiro desenho com rotação teve corte subpixel em320px; posições à esquerda ganharam margem de segurança sem mexer na linha ou bolinhas. Validação final passou.
- Detector Impeccable nos arquivos de produto: []. Revisão visual de celular e computador; não se declara aprovação global de todos os detectores.
- Provas: /opt/data/cache/scratch/betula-folhas-vivas/qa.json, regressao-sync.json, capturas por etapa e montagem comparativa de recortes reais quatro-folhas-celular.png. Montagem não é screenshot integral.

A prévia anterior permanece disponível e o desktop continua sujeito à avaliação do Ademilton. URL e encerramento técnico no relatório de entrega em /root/marketing-os/relatorios/.

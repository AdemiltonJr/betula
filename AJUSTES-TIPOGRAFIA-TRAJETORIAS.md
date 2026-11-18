# Diferenciais proporcionais e trajetórias sob demanda

Pedido do Ademilton: preservar diagramação de Como trabalhamos e nossos diferenciais, melhorar proporções tipográficas e começar com biografias fechadas. Somente prévia, sem aprovação de produção.

## Escopo aplicado
- Cinco títulos de diferenciais com tamanho, peso e entrelinha iguais em cada viewport. Eliminada a exceção que tornava o primeiro maior. Escala desktop: cabeçalho32–46px, títulos24–30px, corpo19px; até600px títulos26px e corpo18px. Cabeçalho e corpo de abertura proporcionais ao restante.
- Grid de12colunas, posições alternadas, ramificações, paleta, fontes e textos literais preservados. Hero, processo/folhas e fotos não alterados.
- Equipe inicialmente sem biografia visível. Seleção do retrato, setas e arraste não abrem a leitura antes da ação explícita.
- Botão Conhecer trajetória separado do retrato: abre e passa a Fechar trajetória. Nova ativação ou Escape recolhem. aria-expanded/aria-controls, foco visível e alvo mínimo44px.
- Depois de aberta, biografia continua sincronizada com retrato/setas/swipe, preservando o comportamento pedido anteriormente. Após fechar, rolagem não reabre.
- Jullyana continua somente nome/foto, sem controle de trajetória nem texto inventado. Fallback sem JavaScript mantém as cinco biografias legíveis e omite controles inertes. Impressão mantém acesso ao texto.

## Verificação
- Regressões novas falharam antes do patch; suíte final34testes aprovada. Astro check:0erros/avisos/hints; build de uma página. Fixture literal preservada.
- Chromium local em320/390/768/1024/1440px: títulos iguais entre si, corpo/abertura com a mesma escala, sem overflow e sem imagens quebradas.
-25estados de abertura/fechamento por Enter/Espaço/Escape, seleção fechada por retrato/setas, abertura sincronizada por setas. Toque e swipe via CDP com bio aberta; fechamento seguido de gesto reverso não reabre.
- Fallback semJS: cinco biografias visíveis, controles de expansão ocultos. Sem erros de página no QA principal.
- Capturas reais de desktop/celular e JSON em /opt/data/cache/scratch/betula-tipos-trajetorias/. Script: /opt/data/cache/scratch/betula-tipos-trajetorias-qa.cjs. Inspeção direta dos diferenciais desktop, equipe fechada e equipe móvel aberta.
- Detector Impeccable: []. Sloplint estático mantém achados herdados (stamp, branco aprovado, escala e efeito hover aceito), sem alegação de auditoria global limpa.

Branch jose/betula-conexoes-organicas; referência anterior d1415818902dd1c982af259da46765dab89c9084 e prévia https://betula-fix89em3w-ademilton-juniors-projects.vercel.app preservadas. Oficial main e alternativas completa/leve não são alvo deste envio. URL pública, confirmação remota e encerramento constam no relatório de entrega.

# Alternativa — diferenciais com título fixo

Autorização do Ademilton: criar outra versão mudando somente a seção Como trabalhamos e nossos diferenciais. A proposta orgânica de referência permanece intacta em branch, tag e prévia. Não autoriza produção.

## Composição
- Desktop acima900px: título apresenta toda a seção numa coluna fixa à esquerda. Introdução e cinco tópicos ficam à direita, acompanhando a rolagem normal da página.
- Até900px: apenas o título compacto permanece abaixo do menu enquanto o leitor atravessa a seção. A introdução passa normalmente e não é apagada.
- A fixação termina dentro da própria seção; não segue para o processo nem cobre áreas seguintes. Janelas de altura até480px e impressão usam título estático, priorizando espaço para leitura.
- CSS position:sticky nativo, sem JavaScript novo, snap, rolagem interna, captura de roda ou gestos. Mantidos paleta, ramificações, tipografia e todos os textos literais.
- Mudança isolada em Story.astro, somente nessa seção; Base.astro importa differences-sticky.css. Hero, folhas, processo, equipe/biografias fechadas, dados, fixture e organic.css não alterados.

## Preservação
- Base: a61e093b3d7d53858cdcf0c8ac72292eadc9ceab.
- Referência: jose/betula-conexoes-organicas.
- Tag remota: arquivo/betula-organica-trajetorias-2026-11-18, com peel conferido para a base.
- Prévia anterior: https://betula-r914g8ywn-ademilton-juniors-projects.vercel.app
- Nova branch: jose/betula-diferenciais-fixos. Oficial main não é alvo.

## Provas
- Teste novo vermelho antes do patch;35testes e build aprovados. Astro check sem erros/avisos/hints. Texto literal mantido.
- Chromium local em320×568,390×844,768×1024,1024×768,1280×576,1440×900: título fixa abaixo do menu, introdução/tópicos se movem, nenhuma área interna de scroll, nenhum overflow horizontal. Roda sobre o título e PageDown movem a página normalmente. Título sai ao terminar a seção.
- Detectado e corrigido no navegador: âncora Diferenciais podia colocar o primeiro tópico sob a faixa móvel. scroll-margin-top aplicado ao alvo UL, não só aos filhos, e matriz completa passou.
- Paisagem baixa, impressão e conteúdo semJS conferidos. Gesto real de toque CDP move a página preservando o título fixo. Sem teste em aparelho físico ou leitor de tela.
- Capturas e QA: /opt/data/cache/scratch/betula-diferenciais-fixos/; script betula-diferenciais-fixos-qa.cjs no scratch. Revisão visual direta de desktop inicial/em rolagem e celular em rolagem.
- Detector Impeccable=[]; sloplint render executado. Não há aprovação global: stamp Hallmark não se aplica à direção existente não redesenhada pelo Hallmark; alerta de densidade em y6300 e demais avisos ficam fora da seção alterada, com conteúdo literal e interações já aceitas preservados. Não corta texto nem muda retratos para satisfazer detector.

URL nova, SHA remoto, leitura pública e encerramento constam no relatório de entrega.

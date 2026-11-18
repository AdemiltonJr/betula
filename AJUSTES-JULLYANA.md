# Ajustes Bétula — título único e Jullyana

18/11/2026. Continuação na branch `jose/texto-luciana-depoimentos`; não publicar em main nem site oficial sem aprovação específica do fluxo.

## Pedido atendido

- Unificada a seção `como-fazemos`: somente o título literal “Como trabalhamos e nossos diferenciais”, abertura literal e cinco blocos da Luciana na mesma seção semântica. Removida apenas a faixa redundante “Nossos diferenciais”. A âncora `diferenciais` foi preservada na lista para não quebrar o menu. Nenhum texto fornecido pela Luciana foi reescrito.
- Jullyana incluída com a foto enviada pelo Adm, recortada em quadrado560×560 e exibida pelo mesmo componente/círculo de220px das demais. Só o nome “Jullyana”; sem cargo, descrição, biografia inventada ou parágrafo vazio. Currículo continua pendente. Esta autorização substitui a orientação anterior de deixá-la fora enquanto faltava material.
- Seis pessoas em duas linhas de três no computador. Em celular pequeno, mantida coluna única para preservar leitura das cinco biografias longas. Tablet mantém a responsividade vigente. Não alterados contatos, fontes, fotos anteriores ou depoimentos.

## Verificação real

- Testes novos acusaram inicialmente os cinco blocos fora da seção e somente cinco integrantes. Depois das alterações, Astro check:0 erros/avisos/hints; build concluído;14 testes passaram.
- Chromium/Puppeteer isolado:320,390,768,1024,1440px, sem overflow horizontal; seis imagens carregadas, circulares e de tamanho igual; grade3+3 em1024/1440; nome de Jullyana sem parágrafo; um título/cinco blocos e28 linhas aprovadas presentes literalmente. Zero pageerror no percurso.
- Auditoria visual e capturas finais em `/opt/data/cache/scratch/betula-ajustes-final/`. `qa.json` contém medições; PNGs celular/computador de método/equipe foram recortados da captura integral da página, sem cabeçalho sticky cobrindo o conteúdo. Imagens são renderização real, não montagem de elementos.
- Sloplint com render executou e registrou7 FAIL/8 REFLEX/5 WARN na primeira passagem. Encontrou conflito de CSS herdado que colocava o título branco sobre faixa pêssego; corrigido com regra específica, preservando título sobre verde. QA final exige fundo transparente do h2. Não alegar scan global limpo: permanecem avisos/regras genéricas e achados anteriores em Hiring/labels/contorno de campo fora do pedido. A revisão não é certificação WCAG.
- Impeccable continua com launcher CRLF indisponível conforme chamado jose-dd25e4; sem nova tentativa repetida nem conserto de instalação por esta tarefa.

## Entrega e encerramento

Enviar somente a branch de trabalho e conferir SHA/deployment. A prévia anterior teve Vercel Security Checkpoint em acesso automatizado; conferir a nova sem pressupor HTTP200. Relatar se permanecer. Encerrar servidor local e navegador após capturas/verificação, conforme pedido do dono. Não criar PR de publicação, dar Approve ou mesclar em main nesta entrega.

# Bétula — revisão do texto de Luciana (18/11/2026)

## Escopo e entrega

Somente branch `jose/texto-luciana-depoimentos`. `main` e site oficial não alterados. Texto do pedido de 17/11 aplicado literalmente, distribuído em apresentação, quem somos, método/diferenciais, introdução da equipe e cinco biografias. Não alterada nenhuma palavra, profissão ou nome desse texto; apenas distribuição em componentes/parágrafos. Jullyana não foi incluída, aguardando currículo. Fotos, contatos, fontes, paleta, URLs e falas dos depoimentos preservados.

Fonte literal versionada em `tests/fixtures/2026-11-17-texto-novo-luciana.md`. Teste inicialmente falhou pelo título antigo, passou após atualização e compara cada linha aprovada com HTML compilado. Mantidos testes das cinco integrantes, depoimentos, SEO/canonical/noindex, imagens, âncoras, contato e fallback sem JS.

## Depoimentos: acentuação

Não foi reproduzido mojibake no código atual, HTML UTF-8, versão anterior da prévia ou navegador. Seis relatos — um de cliente e cinco de candidatos — foram percorridos no resumo, texto integral e navegação; comparação integral com os dados preservada, sem caracteres de substituição ou padrões de acentos quebrados. **Não se afirma correção de texto que já estava correto.** Foram adicionadas verificações de regressão para UTF-8 e grafia. A grafia histórica “Julyanna” em falas literais não foi trocada nem usada para incluir integrante nova.

## Revisão visual independente

Method: dual-agent (A: sa-0-f9f2844d · B: sa-1-e8ecac84). Relatórios completos/evidências em `/opt/data/cache/scratch/betula-assessment-a.md` e `betula-assessment-b.md`; sem contato com cliente. A: 22/28 em sete heurísticas aplicáveis, Bom, antes dos pequenos refinamentos; não apresentar como nota /40 ou auditoria WCAG. Nenhum P0/P1 novo na troca textual.

A encontrou biografias muito estreitas no celular (P2) e botão encostado no parágrafo (P3); B encontrou palavra final isolada no título a1280px (P3). Ajustes proporcionais: até600px equipe em uma coluna com corpo16px; respiro20px antes do CTA; balanceamento do título sem reescrever palavras. Preservada a composição em telas maiores. Teste de navegador falhou antes (perfil166px/fonte14px) e passou depois (perfil350px/fonte16px a390px).

## Verificação executada

- Astro check: 0 erros, 0 avisos, 0 hints, 30 arquivos, antes dos refinamentos CSS; nova compilação e suíte após refinamentos sem erros.
- Build e 12 testes de Node passaram.
- QA Chromium/Puppeteer final: 320,390,768,1280,1440px, sem overflow horizontal, cinco integrantes, CTA dentro da primeira tela, respiro20px, UTF-8. Seis relatos integralmente operáveis/sem mojibake no percurso executado.
- Evidências finais em `/opt/data/cache/scratch/betula-entrega/qa-final.json`, `celular.png`, `computador.png` e `celular-equipe.png`. Não equivalem a teste em aparelho físico ou leitor de tela real.

## Ferramentas e achados não resolvidos fora do escopo

O launcher Impeccable falhou por CRLF e não gerou scan válido; responsável técnico acionado, sem modificar instalação. Sloplint com render executou, mas **não passou**: relatório B registrou16 FAIL,34 REFLEX,10 WARN na versão textual inicial. Não se alega selo “auditoria limpa” nem se reexecuta scan completo para esconder achados. Predominam regras genéricas incompatíveis com desenho institucional existente (branco/paleta, tokens, stamp, labels) e exigência de texto literal (densidade/comprimento). Mantidos com justificativa: atualização de conteúdo, não redesign autorizado.

Achado funcional herdado separado: texto pequeno “Cargos de gestão e direção” na seleção de contratação teve contraste4,25:1; componente Hiring não foi alterado. Contorno de input1,79:1 é sinal a confirmar conforme contexto, não conclusão WCAG isolada. Recomendação de tarefa pontual futura para contraste, sem modificar esse fluxo nesta entrega. Alerta de lazy-LCP no emblema do encerramento é falso positivo contextual. Não encurtar texto aprovado ou substituir cores institucionais apenas para satisfazer o detector.

Questions skipped: 2 Priority Issues na avaliação A, ambos tratados em refinamento; sem mudança de direção ou material que exija nova decisão. Publicação oficial exige confirmação do cliente e Approve do dono no pedido de publicação; nenhum pedido/merge foi executado nesta etapa.

# Alternativa de apresentação mais leve — Bétula

18/11/2026. Pedido do dono: “Prepare essa versão, mas não descarte essa que já está pronta.” Esta é uma alternativa de layout, não uma substituição do texto da cliente ou publicação no site oficial.

## Versão pronta preservada

Base completa com a correção de rolagem:36440de822084e92cdd36f606f7f910ea44b274b. A branch `jose/texto-luciana-depoimentos` foi mantida nesse commit, sem alteração. Criada e enviada a tag anotada `arquivo/betula-texto-completo-2026-11-18`; leitura remota da tag resolvida e da branch confirmou a mesma base. Prévia dessa versão: https://betula-k7e7i5ix6-ademilton-juniors-projects.vercel.app . A versão anterior não foi descartada.

## Alternativa

Nova branch `jose/betula-versao-leve`, criada da base preservada. Abertura mantém título literal, imagem e contato; o parágrafo institucional completo passou para Quem somos. Cinco diferenciais e cinco biografias ficam disponíveis em detalhes nativos, fechados inicialmente e operáveis por teclado, sem cortar frases ou diminuir fonte. Jullyana permanece só com foto/nome. Demais fotos, cores, contatos, depoimentos e correção da rolagem foram mantidos.

## Verificação real

Astro check:0 erros/avisos/hints. Build e18 testes passaram. Testes novos falharam antes da implementação. Fixture original:28 linhas aprovadas continuam presentes integralmente no HTML/DOM, mesmo quando o detalhe está fechado.

Chromium isolado em320/390/768/1280/1440px: sem overflow horizontal, CTA visível na primeira tela, seis fotos carregadas, nenhum parágrafo no hero, cinco diferenciais e cinco biografias inicialmente fechados. Vinte interações com Enter/Space (dez expansores em1440 e390) abriram/fecharam corretamente e exibiram os textos; zero pageerror. Não equivale a ensaio em aparelho físico ou leitor de tela real.

Capturas e medições em `/opt/data/cache/scratch/betula-leve/`: `qa.json`, `celular-abertura.png`, `computador-abertura.png`, `computador-pagina.png`. Navegador encerrado emfinally e servidor4328 desligado após as verificações.

Sloplint com render executou e terminou com5 FAIL/8 REFLEX/7 WARN, não foi declarado limpo. As falhas são contraste já apontado no Hiring/contorno de campo, labels de processo/contato fora da edição e limite genérico de palavras conflitando com conteúdo literal. Os expansores novos possuem foco e alvos adequados; sem novo corte/overflow observado. Nenhuma alteração fora do pedido para satisfazer detector genérico. Impeccable continua com indisponibilidade conhecida, sem afirmar aprovação dessa ferramenta.

A entrega deve trazer duas prévias para o dono comparar. Não mesclar emmain ou publicar oficialmente até o fluxo de aprovação do cliente/dono. Não remover a versão completa por preferir esta alternativa.

# Bétula RH

Página de conversão B2B em Astro. A direção atual, aprovada em 5 de setembro de 2026, é orgânica e contemporânea: fundo claro, Manrope, fotografias reais e entrada participativa para contextualizar uma contratação.

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Verificação e prévia

```bash
npm run check
npm test
npm run preview -- --host 127.0.0.1 --port 4326
```

`npm test` gera a versão estática e verifica título, SEO, âncoras, imagens, etapas do processo, contato sem JavaScript e segurança de links externos. A prévia compilada fica em http://127.0.0.1:4326/ enquanto o servidor estiver ativo.

## Organização

- `src/components/conexoes/`: abertura, seletor de contratação e narrativa institucional.
- `src/styles/conexoes.css`: sistema visual atual e responsividade.
- `src/scripts/conexoes.ts`: menu, seleção, mensagem de WhatsApp e IntersectionObserver.
- `src/data/site.ts`: contatos, navegação e etapas institucionais compartilhados.
- Componentes e estilos anteriores continuam preservados, sem importação pela página atual.

A seleção e o cargo opcional apenas preparam o link de WhatsApp no navegador. Nenhum dado é enviado automaticamente ou armazenado. Sem JavaScript, o contato direto continua disponível. A página não inclui clientes e depoimentos pendentes de confirmação.

## Publicação

Adaptador estático Vercel, sitemap e canonical mantidos. Esta alteração é uma prévia e não troca o domínio oficial. Antes da publicação, confirmar telefones, emails, endereço e autorização de uso das imagens. As pendências institucionais permanecem em `contentValidation`.

## Prévia online para avaliação da cliente

Publicada em 5 de setembro de 2026: https://betula-seven.vercel.app/

Versão visual: commit `712e582`, com bosque e árvore na abertura, cobre #7A4A12 em destaque e uma única fotografia da equipe.

Deployment Vercel: `dpl_AyszuByimsdTBwtKJdvKfVsGWLZG`, estado READY. URL imutável: https://betula-j6df5a8yn-ademilton-juniors-projects.vercel.app/

O endereço principal de avaliação respondeu HTTP 200 sem autenticação. Na versão online, Playwright confirmou 1440 e 390px sem overflow ou imagens com falha, seletor e mensagem de WhatsApp, teclado, FAQ, movimento reduzido e fallback sem JavaScript. Nenhum pageerror. O domínio oficial betularh.com.br não foi alterado.

## Nomes na fotografia da equipe

Correspondência confirmada pelo usuário em 5 de setembro de 2026: em pé, primeira pessoa sem nome, segunda Elaine Souza, terceira Luciana Alvim e quarta Tamara Tordin; sentadas, Georgia Frattini à esquerda e Vanessa Luiz à direita.

`src/data/team-photo.ts` registra somente as cinco identificações confirmadas. `TeamPhoto.astro` mostra o nome por hover, foco de teclado ou toque. Escape fecha; toque repetido alterna e toque fora fecha. A foto mantém a proporção original para preservar a posição dos alvos.

Verificado localmente com Astro check, build e 7 testes. Playwright conferiu os cinco hovers, foco, Escape e interação touch; etiquetas dentro da tela e proporção correta em 320, 390, 768 e 1440px.

A chamada agora desenha uma linha a partir da pessoa e revela o nome letra por letra, com detalhes em cobre. A sequência foi conferida no navegador; hover, teclado, toque e movimento reduzido continuam validados nas quatro larguras acima.

## Ajustes da cliente — 10/09/2026

Lista de clientes revisada, sete logos obtidos em fontes oficiais e Columbia Brasil identificada em texto enquanto a empresa é confirmada. Cinco avaliações de candidatos, com trecho literal, leitura completa e navegação manual. Fontes e pendências em LOGOS_E_DEPOIMENTOS.md. Check sem erros; build e 8 testes passam; navegador conferido de 320 a 1440px, teclado e fallback sem JavaScript.

A apresentação dos clientes foi refinada para uma única faixa horizontal compacta, sem grade ou fundos verdes. Logos com tratamento monocromático em CSS, navegação por setas e rolagem nativa. Conferidos os 16 clientes, início/fim, teclado, larguras de 320 a 1440px e fallback sem JavaScript.

Revisão: duas faixas automáticas em sentidos opostos, verde e cobre por overlay CSS. Repetições decorativas fecham o ciclo dos mesmos 16 clientes. Pausa, retomada e movimento reduzido conferidos no navegador; sem overflow em 320–1440px.

Correção da foto em janelas baixas: largura limitada pela altura visível (svh), com reserva para cabeçalho e respiro. Proporção original e alvos percentuais preservados; etiquetas se adaptam à largura real da foto. Conferidos sete tamanhos de janela, incluindo 1518×684 (aproximação da área útil em zoom de 90%), orientação horizontal e celulares, com foto e nomes dentro dos limites.

Equipe em telas amplas: composição em duas colunas a partir de 1100px, com apresentação à esquerda e foto à direita. Preserva o limite de altura da foto e mantém a disposição vertical em telas menores. Build, check e 8 testes passam; encaixe da foto e etiquetas conferidos em sete tamanhos.

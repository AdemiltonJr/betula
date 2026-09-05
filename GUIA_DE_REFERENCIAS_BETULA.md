# Guia de referências: Bétula RH

Este arquivo é um mapa de fontes para uma nova conversa de criação do site. Ele registra onde estão os materiais e o estado atual do projeto. Não é uma instrução de layout, uma especificação de página nem um plano de implementação.

## Fontes primárias da marca

| Material | Link | Observação factual |
| --- | --- | --- |
| Pasta principal Bétula no Google Drive | https://drive.google.com/drive/folders/1-BTGOQtYbLc3h965jW4k45Yhe7_vKr5O | Fonte original dos materiais de marca, apresentação e imagens. |
| Guia da marca | https://drive.google.com/file/d/1xywe6p5TahotjCOWHnj5_4XWSTr_1PPl/view?usp=drivesdk | Arquivo `Guia da marca.png`. |
| Apresentação institucional | https://drive.google.com/file/d/14cI-ttvTkatGrryF1V32JqQ6brE_zBJc/view?usp=drivesdk | Arquivo `intitucionalBETULA.pdf`. É uma referência institucional histórica, não confirmação de dados atuais. |
| Pasta de imagens do Drive | https://drive.google.com/drive/folders/1oADDU6rFKs2JVmypaJqL64ktnPfoCi9E | Contém 15 fotos identificadas pelo Drive como arquivos WhatsApp. |
| Formulário de solicitação de pessoal | https://docs.google.com/document/d/1TzeonTGisjojxcRHwVIvmee2eTlzzOqh/edit?usp=drivesdk&ouid=116041468555286844311&rtpof=true&sd=true | Arquivo `SOLICITAÇÃO DE PESSOAL_nome da vaga_mês-ano.docx`. |
| Perfil LinkedIn da marca | https://www.linkedin.com/company/betularecrutamentoeselecao | Fonte externa institucional. |
| Instagram da marca | https://www.instagram.com/betularh/ | Fonte externa institucional. |

## Referência audiovisual fornecida pelo usuário

- Vídeo do YouTube: https://www.youtube.com/watch?v=l22bWCZPM8Y
- Contexto: o usuário pediu que os conceitos apresentados no vídeo fossem considerados como referência de qualidade para a reconstrução visual do site.

## Presença atual e ambientes técnicos

| Ambiente | Endereço ou localização | Estado conhecido em 4 de setembro de 2026 |
| --- | --- | --- |
| Site publicado | https://betularh.com.br/ | Versão pública anterior. O usuário a apontou apenas como comparação e antirreferência, não como modelo estrutural ou visual. |
| Repositório GitHub | https://github.com/AdemiltonJr/betula | Repositório do projeto. |
| Worktree local atual | `C:\Users\ademi\Projetos-Codex\worktrees\betula-editorial` | Branch `codex/betula-editorial`. |
| Commit mais recente da nova prévia | https://github.com/AdemiltonJr/betula/commit/027a3c4 | Commit `027a3c4` em `codex/betula-editorial`. |
| Preview Vercel | https://betula-ri9mdcxgi-ademilton-juniors-projects.vercel.app | O deployment foi concluído, mas a URL exige login na Vercel. Não houve troca do domínio oficial. |
| Detalhe do deployment na Vercel | https://vercel.com/ademilton-juniors-projects/betula/74ny5ybL5fVrHD1LoaRg3qWruJQy | Página que pode exigir a conta Vercel proprietária. |

## Resumo factual do guia de marca já extraído

Estes valores foram lidos do material de marca disponível no Drive:

- Cores: teal `#115F61`, teal suave `#4E8F90`, bronze `#7A4A12`, areia `#F0E9DE`, off-white `#FAFAF8`, texto escuro `#232323`.
- Tipografia indicada: Montserrat ou Manrope para títulos; Inter ou Source Sans 3 para corpo.
- Atributos associados à marca: humana, confiável, acolhedora, sofisticada, natural e clara.
- Vocabulário visual citado: molduras circulares, linhas verticais de tronco, galhos, textura de casca e divisores orgânicos.
- Diretrizes fotográficas registradas: fotografias reais, luz natural e pessoas reais; evitar clichês posados ou artificiais.

## Decisões e contexto registrados na conversa anterior

São registros de contexto do projeto, não um roteiro para a próxima criação:

- O foco inicial da página é institucional B2B: empresas que precisam contratar.
- O usuário indicou que a maior prioridade é design e identidade visual; textos podem ser provisórios nesta fase.
- O usuário solicitou uma página inteiramente nova, para desktop e mobile, e não apenas uma alteração de desktop.
- A expressão usada para a direção emocional foi “autoridade humana”.
- A página atual, que abre com foto de reunião, foi enviada para evitar repetição e não como referência de estrutura ou inspiração.
- O usuário mencionou que resultados genéricos, repetitivos ou com aparência de IA não atendem ao objetivo.

## Referências disponíveis dentro do repositório

### Dados institucionais centralizados

- [`src/data/site.ts`](src/data/site.ts): organização, contatos, navegação, processo, clientes, depoimentos, equipe e mapa de imagens usados pela prévia atual.
- O arquivo contém `contentValidation`, que marca como provisórios: equipe e relação entre cargos e fotografias; telefones, emails e endereço; autorização e atualidade dos clientes; fidelidade e autorização dos depoimentos.

### Ativos de marca e fotografia no projeto

Todos estão em [`public/assets/img`](public/assets/img):

| Grupo | Arquivos relevantes |
| --- | --- |
| Logos e símbolos | `logo-ink.png`, `logo-cream.png`, `logo-betula-cream.png`, `emblem-ink.png`, `emblem-cream.png` |
| Texturas e padrões | `texture-birch-teal.png`, `texture-birch-cream.png`, `pattern-contour-teal.png`, `pattern-contour-cream.png`, `pattern-contour-bronze.png` |
| Fotos de grupo e ambiente | `equipe-grupo.jpg`, `equipe-grupo-2.jpg`, `team-group.jpg`, `socias.jpg`, `socias-2.jpg`, `office-candid.jpg` |
| Retratos | `retrato-a.jpg`, `retrato-b.jpg`, `retrato-c.jpg`, `team-luciana-alvim.jpg`, `team-vanessa-luiz.jpg`, `team-tamara-tordin.jpg`, `team-elaine-souza.jpg`, `team-georgia-frattini.jpg`, `team-keila-assis.jpg` |
| Clientes | arquivos com prefixo `cli-` |
| Arquivos legados que continuam no repositório | `hero-birch.jpg`, `hero-photo.jpg`, `hero-photo-mobile.jpg`, `bg-bosque.jpg`, `bg-depoimentos.jpg` |

### Material documental já existente

Os documentos abaixo são registros de explorações e execuções anteriores. Eles podem ajudar a recuperar contexto, mas não substituem as fontes primárias do Drive nem decisões novas do usuário:

- [`PRODUCT.md`](PRODUCT.md): contexto de produto registrado para a prévia atual.
- [`DESIGN.md`](DESIGN.md): tokens e critérios usados na prévia atual.
- [`docs/superpowers/specs/2026-09-04-betula-autoridade-humana-redesign-design.md`](docs/superpowers/specs/2026-09-04-betula-autoridade-humana-redesign-design.md): especificação anterior de “autoridade humana”.
- [`docs/superpowers/specs/2026-09-04-betula-identidade-editorial-redesign-design.md`](docs/superpowers/specs/2026-09-04-betula-identidade-editorial-redesign-design.md): exploração editorial anterior, com decisões que podem divergir da direção mais recente.
- [`docs/superpowers/plans/2026-09-04-betula-autoridade-humana-implementation.md`](docs/superpowers/plans/2026-09-04-betula-autoridade-humana-implementation.md): plano técnico que levou à prévia atual.

## Estado da implementação atual

- Stack: Astro 5, TypeScript, CSS e adaptador estático da Vercel.
- Comandos existentes: `npm run check` e `npm test`.
- A branch `codex/betula-editorial` estava sincronizada com a origem após o commit `027a3c4`.
- A implementação atual é uma prévia de trabalho. Ela não é uma referência obrigatória para uma nova página.
- O domínio `betularh.com.br` não foi alterado para a prévia e não deve ser tratado como já aprovado.

## Limites de confiabilidade dos dados

- O guia da marca e os arquivos do Drive são as referências primárias para identidade e imagens.
- Informações de contatos, pessoas, cargos, logos de clientes e depoimentos presentes em `src/data/site.ts` precisam de confirmação da Bétula antes de uma publicação definitiva.
- A apresentação `intitucionalBETULA.pdf` tem valor histórico e institucional; não deve ser tratada como prova de dados atuais sem confirmação.

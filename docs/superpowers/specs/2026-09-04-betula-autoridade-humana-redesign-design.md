# Bétula RH: reconstrução visual com autoridade humana

**Data:** 2026-09-04

**Status:** direção aprovada para planejamento
**Escopo:** página institucional totalmente nova, responsiva desde a concepção

## 1. Objetivo

Reconstruir integralmente a página institucional da Bétula RH para que a experiência visual comunique autoridade humana: conhecimento de recrutamento, proximidade real, método e confiança.

O conteúdo textual não é o foco desta etapa. Títulos, descrições e chamadas podem reutilizar o material existente ou permanecer provisórios. A arquitetura deve permitir trocar o texto depois sem alterar a composição.

## 2. Fontes de verdade

A direção parte de materiais existentes e verificáveis:

- guia digital da marca no Google Drive;
- apresentação institucional da Bétula;
- logotipo, símbolo circular e variações cromáticas;
- fotografias reais da equipe e retratos individuais;
- logos de clientes e depoimentos já reunidos;
- estrutura técnica Astro já configurada para o domínio;
- requisitos previamente aprovados de SEO e conversão pelo WhatsApp.

## 3. Leitura de design

Landing institucional B2B para gestores, lideranças e profissionais de RH, com linguagem humana, segura e consultiva. A experiência usa fotografia real, teal dominante, tipografia limpa e um único momento de movimento marcante.

### Intensidade

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`

O resultado deve ter personalidade sem comprometer confiança, legibilidade ou velocidade.

## 4. Princípios

1. **Pessoas antes de ornamentos:** fotografias reais carregam a autenticidade.
2. **Método visível:** a experiência demonstra rigor sem parecer uma apresentação corporativa genérica.
3. **Marca comprometida:** o teal ocupa superfícies importantes em vez de aparecer somente em botões.
4. **Um gesto memorável:** apenas a narrativa do processo recebe tratamento de alto impacto.
5. **Responsividade nativa:** celular, tablet e desktop têm composições próprias, não versões espremidas.
6. **Conteúdo substituível:** copy provisória nunca deve estar estruturalmente acoplada ao layout.

## 5. Padrões que serão abandonados

- hero tipográfico com título excessivamente grande;
- emblema gigante e cortado como principal elemento visual;
- fundo bege dominante;
- três colunas idênticas de benefícios;
- linhas divisórias em quase todos os blocos;
- grandes vazios sem função narrativa;
- cabeçalho de seção dividido entre título grande e pequeno texto lateral;
- listas longas apresentadas como tabela;
- animação de entrada idêntica em todas as seções;
- cards repetidos para equipe, benefícios e depoimentos;
- estética editorial usada como atalho para sofisticação;
- fotografia da reunião como abertura principal.

## 6. Sistema visual

### Cor

A paleta oficial será preservada, com uma mudança de proporção:

- teal principal `#115F61`: superfície dominante e identidade;
- teal suave `#4E8F90`: estados secundários e profundidade;
- bronze Bétula `#7A4A12`: detalhe raro de atenção;
- off-white `#FAFAF8`: superfície neutra principal;
- areia `#F0E9DE`: apoio localizado, nunca fundo global;
- texto escuro `#232323`: conteúdo em superfícies claras.

O projeto terá um tema visual único. Não haverá alternância aleatória entre seções claras e escuras. Blocos teal e off-white formarão uma narrativa contínua planejada.

### Tipografia

- títulos: Manrope;
- corpo: Source Sans 3;
- títulos com peso e escala controlados, sem ultrapassar duas linhas no hero em desktop;
- largura de leitura entre 65 e 75 caracteres;
- hierarquia por tamanho, peso e espaço, não por excesso de rótulos em caixa alta.

### Formas e materialidade

- cantos discretos entre 8 e 12 px;
- botões podem usar forma levemente arredondada, sem aparência de cápsula em toda a interface;
- símbolo circular usado como assinatura, não como ilustração gigante;
- linhas verticais inspiradas nos troncos como máscara e transição;
- texturas de casca usadas em baixa intensidade e somente onde melhorarem profundidade;
- sem glassmorphism, gradiente em texto, sombras largas ou efeitos neon.

## 7. Abertura

### Desktop

O hero ocupa a primeira janela útil abaixo do cabeçalho e utiliza uma composição aproximada de 42/58:

- lado esquerdo: superfície teal, conteúdo provisório e CTA;
- lado direito: fotografia real em grande escala, sem moldura de card;
- junção: pequeno símbolo da Bétula e linhas verticais que participam da revelação inicial;
- CTA visível sem rolagem;
- fotografia diferente da imagem de reunião usada anteriormente.

A imagem preferencial será um retrato de equipe com postura segura e expressão natural. O corte será decidido durante a implementação após comparação visual entre `equipe-grupo.jpg`, `equipe-grupo-2.jpg` e os retratos individuais.

### Tablet

- proporção mais equilibrada entre texto e imagem;
- navegação condensada antes de quebrar em duas linhas;
- fotografia mantém presença, mas o corte preserva rostos e gestos;
- CTA permanece na primeira janela.

### Celular

- cabeçalho compacto;
- conteúdo e CTA aparecem antes da fotografia;
- fotografia recebe corte vertical próprio, sem depender do `object-position` do desktop;
- hero não usa imagem como fundo atrás de texto;
- botão flutuante de WhatsApp aparece apenas após a saída do hero;
- botão flutuante mostra somente o símbolo do WhatsApp e possui área de toque acessível.

## 8. Estrutura visual da página

### 8.1 Hero de autoridade humana

Composição dividida entre cor e fotografia. Função: estabelecer marca, confiança e ação imediata.

### 8.2 Faixa de experiência

Uma faixa contínua logo após o hero apresenta experiência verificável e logos de clientes. Os logos podem se mover em um único loop lento, com pausa em hover e versão estática para movimento reduzido.

### 8.3 Bloco humano

Fotografias reais em proporções diferentes formam uma composição assimétrica controlada. O texto é secundário. Não haverá grade de três cards.

### 8.4 Atuação

Os grupos de atuação serão apresentados por composição tipográfica e imagem, não por caixas idênticas. O conteúdo pode ser provisório, mas a seção precisa criar contraste de ritmo antes do processo.

### 8.5 Processo narrativo

Este é o momento visual marcante da página.

No desktop:

- fotografia ou composição de marca permanece fixa em um lado;
- etapas avançam no outro lado com a rolagem;
- linhas verticais inspiradas nos troncos conectam os momentos;
- o enquadramento ou a camada cromática da fotografia muda suavemente conforme a etapa ativa;
- a rolagem da página continua previsível e não é sequestrada horizontalmente.

No celular:

- a narrativa vira sequência vertical;
- nenhuma área é fixada por tempo excessivo;
- a etapa ativa recebe mudança simples de cor e posição;
- todo o conteúdo permanece disponível sem JavaScript.

### 8.6 Prova social

Uma fala principal recebe protagonismo. Depoimentos adicionais aparecem de forma secundária. Logos não recebem rótulos de setor nem caixas individuais. O desenho evita três depoimentos iguais lado a lado.

### 8.7 Equipe

Galeria fotográfica com ritmos diferentes, combinando um retrato principal, retratos secundários e uma fotografia coletiva. Biografias podem ser breves e provisórias. A identidade das pessoas não será reduzida a cards repetidos.

### 8.8 Encerramento e conversão

Bloco teal com CTA direto para WhatsApp, contatos alternativos e acesso para envio de currículo. A conversão B2B e o envio de currículo permanecem visualmente separados.

## 9. Movimento

Cada movimento precisa comunicar hierarquia, progressão ou feedback.

- hero: uma única revelação coordenada por máscara vertical;
- faixa de logos: um único loop contínuo e lento;
- processo: mudança de etapa vinculada à rolagem;
- botões: resposta curta de hover, foco e toque;
- demais seções: transições específicas quando necessárias, sem fade genérico em todos os blocos;
- `prefers-reduced-motion` produz uma página completamente compreensível e estática;
- o conteúdo já nasce visível e não depende de animação para aparecer.

## 10. Conversão pelo WhatsApp

- CTA principal no hero;
- CTA contextual após o processo;
- CTA principal no encerramento;
- ícone flutuante discreto no celular e opcionalmente no desktop após validação visual;
- todos os links funcionam sem JavaScript;
- a mensagem inicial pode permanecer provisória nesta etapa;
- ícone deve ser reconhecível, com nome acessível e área de toque mínima adequada.

## 11. Arquitetura técnica

- manter Astro como base estática para preservar desempenho e indexação;
- manter componentes pequenos por seção;
- conteúdo centralizado em arquivo de dados e desacoplado da composição;
- usar CSS nativo e Tailwind apenas onde cada abordagem for mais clara;
- adicionar React e Motion somente se o protótipo do processo justificar a dependência;
- preferir uma ilha React isolada para movimento, sem migrar toda a página;
- toda experiência animada precisa de fallback estático renderizado no HTML;
- manter URLs, âncoras úteis, canonical, sitemap e dados estruturados.

## 12. SEO e desempenho

O conteúdo pode ser provisório visualmente, mas a implementação preservará:

- um único `h1`;
- estrutura semântica de títulos;
- título, descrição, canonical, Open Graph e Twitter Card;
- JSON-LD `EmploymentAgency` apenas com dados verificáveis;
- sitemap e robots;
- texto indexável no HTML inicial;
- imagens com dimensões reservadas, formatos otimizados e carregamento apropriado;
- hero otimizado como candidato de LCP;
- ausência de CLS causado por imagens, fontes ou animações;
- meta de LCP inferior a 2,5 s, INP inferior a 200 ms e CLS inferior a 0,1 em condições de teste representativas.

SEO de conteúdo detalhado será revisado depois da aprovação visual, sem bloquear o desenvolvimento da identidade.

## 13. Falhas e degradação segura

- sem JavaScript: conteúdo, navegação e WhatsApp continuam funcionais;
- imagem indisponível: espaço e texto alternativo preservam o layout;
- movimento reduzido: processo e logos ficam estáticos;
- viewport estreito: nenhuma palavra, CTA ou navegação transborda;
- textos maiores ou substituídos: componentes aceitam variação razoável sem sobreposição;
- links externos usam atributos seguros e nomes acessíveis.

## 14. Verificação

### Técnica

- `astro check`;
- build de produção;
- testes automatizados do HTML;
- validação de links, metadados e dados estruturados;
- ausência de erros no console.

### Visual

- revisão em 375, 430, 768, 1024, 1366 e 1440 px;
- comparação de hero, processo, equipe e CTA em todos os tamanhos;
- contraste WCAG AA;
- navegação por teclado e foco visível;
- revisão com movimento normal e reduzido;
- auditoria Lighthouse em mobile e desktop;
- screenshots completas para detectar repetição, vazios e quebras de ritmo.

### Critérios de aprovação

- a página não se parece com a versão atual;
- a experiência é reconhecível como Bétula mesmo sem ler o texto;
- fotografia real é parte estrutural do design;
- teal tem presença visual comprometida;
- desktop, tablet e celular parecem versões intencionais da mesma marca;
- o processo é o único momento de alto impacto;
- nenhum bloco depende de grades repetidas de cards;
- WhatsApp está presente sem dominar a interface;
- conteúdo e SEO podem evoluir sem reconstrução do layout;
- a página continua rápida, legível e funcional sem animações.

## 15. Fora de escopo nesta reconstrução

- criação de área de vagas ou candidatura completa;
- painel administrativo;
- CRM ou automação de atendimento;
- definição final de todos os textos;
- troca de domínio antes da aprovação visual e técnica;
- alteração do logotipo ou da identidade oficial.

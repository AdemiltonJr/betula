# Proposta alternativa — conexões orgânicas (18/11/2026)

Esta branch contém uma terceira landing page para avaliação; a cliente ainda não aprovou a direção. Não substitui as duas prévias anteriores nem o site oficial.

Identidade preservada: verde-petróleo #00525D, pêssego #F8D6C4 e branco, Manrope/Source Sans 3 locais e arquivos originais do logo. A mudança autorizada é de composição e interação: linhas ramificadas, contornos Bézier e equipe em faixa horizontal manual, sem cartões individuais. Mouse amplia retratos; clique, toque e teclado selecionam biografia integral em área compartilhada. Sem avanço automático; gesto vertical, movimento reduzido e leitura sem JS preservados. Jullyana somente foto e nome. Texto da Luciana não reescrito.

Detalhes e provas: [PROPOSTA-CONEXOES-ORGANICAS.md](PROPOSTA-CONEXOES-ORGANICAS.md). Tokens da alternativa em src/styles/organic.css; fotografias preexistentes, sem alteração ou geração. As revisões abaixo são referência histórica e seguem recuperáveis nas branches anteriores.

---

# Revisão vigente anterior — 16/09/2026

Preservar a paleta institucional da revisão de 11/09. Faixas pêssego ocupam toda a largura, com conteúdo alinhado ao container. Quem somos centralizado sobre o fundo original de troncos; Como fazemos em verde, compacto e centralizado. Fotografias reais de Luciana e Vanessa na abertura, sem molduras decorativas. Equipe com cinco retratos, incluindo Keila; Jullyana aguarda material. Biografias e textos longos mantêm alinhamento de leitura. Logos originais e interações preservados.

Endereço fiscal removido; contatos separados por público. Não reescrever conteúdo nesta etapa, além das frases fornecidas para Como fazemos.

---

# Revisão anterior — 11/09/2026

A apresentação institucional passa a ser a referência prioritária, conforme o retorno da cliente e orientação do usuário. Verde-petróleo #00525D, branco #FFFFFF e pêssego #F8D6C4; amostras aproximadas do PDF, não códigos oficiais certificados. Verde em ações, títulos e símbolos; pêssego concentrado em faixas; branco predominante. Sem overlay nos logos. Quatro retratos aprovados substituem a foto coletiva. Linguagem direta sobre recrutamento, cultura, vaga e atendimento personalizado.

Análise, fontes e decisões: [ALINHAMENTO_INSTITUCIONAL.md](ALINHAMENTO_INSTITUCIONAL.md). O registro abaixo é histórico e não prevalece sobre esta revisão.

---

# Design System: conexões humanas

Direção orgânica e contemporânea aprovada pelo usuário em 5 de setembro de 2026. Substitui a direção da prévia anterior; materiais históricos permanecem no histórico Git.

## Identidade

Guia original conferido no Google Drive: `1xywe6p5TahotjCOWHnj5_4XWSTr_1PPl`.

- Teal principal #115F61; teal suave #4E8F90 para títulos grandes.
- Off-white #FAFAF8; superfícies suaves derivadas da paleta natural.
- Bronze #7A4A12 para foco; texto de apoio #5C6865.
- Manrope Variable para títulos e Source Sans 3 Variable para corpo, hospedadas localmente.
- Logo e fotografias existentes sem geração de pessoas ou alteração do símbolo.

## Composição

Abertura tipográfica central, retrato em arco à esquerda, fotografia de grupo em moldura orgânica à direita e CTA central. No celular, mensagem e CTA precedem as duas fotografias. Container até 1280px, margens de 20px no celular. Botões discretamente arredondados, superfícies sem sombras pesadas.

O seletor apresenta necessidade, explicação e contato. Processo em quatro etapas conectado por um tronco e ramificações; introdução fixa durante o trecho no desktop. Equipe em fotografia ampla com proporção que preserva rostos. FAQ nativo e encerramento claro.

## Interação e acessibilidade

Seleção por botões com aria-pressed, atualização em aria-live, cargo opcional com label e limite de 160 caracteres. Menu acessível com Escape e retorno do foco. Links diretos sem JavaScript. Animações de entrada e ativação do processo sem listener de scroll; prefers-reduced-motion remove movimento. Foco visível e sem rolagem bloqueada.

## Conteúdo

Contato utiliza a fonte central existente, ainda sujeita a confirmação antes de publicação. Não apresentar logos de clientes, métricas ou depoimentos ainda não validados. Não atribuir cargos individuais às fotografias.

## Revisão: árvore e cobre

Ajuste solicitado pelo usuário em 5 de setembro de 2026: reduzir a repetição da equipe e ampliar a presença da árvore e do cobre. A abertura usa `bg-bosque.jpg` em arco e o emblema original da árvore em cobre sobre areia. A equipe aparece apenas na seção de apresentação; a foto de reunião do processo foi substituída por grafismo derivado do emblema.

Cobre #7A4A12 aplicado ao título de abertura, trechos destacados, molduras, seleção ativa, progressão do processo e CTA final. Areia #F0E9DE nas opções de contratação e no encerramento. Verde mantém o papel de cor principal para texto e CTA inicial.

Validação local: Astro check sem erros ou avisos; build e 7 testes passam. Playwright em 320, 390, 768, 1024 e 1440px sem overflow ou imagens com falha. Menu, teclado, FAQ, mensagem de WhatsApp, reduced-motion e fallback sem JS conferidos.

Publicação autorizada pelo usuário no projeto Vercel Bétula para avaliação da cliente. Destino verificado: betula-seven.vercel.app.

## Abertura revisada — fotografia provisória

Por aprovação do usuário em 16/09/2026, os dois retratos foram retirados da abertura para evitar hierarquia entre integrantes. Título, mensagem e botão permanecem sobre branco; abaixo, faixa horizontal com bg-bosque.jpg, imagem existente e provisória para avaliação da composição. Retratos ficam somente na seção de equipe. A escolha definitiva da fotografia permanece pendente.

### Abertura em duas colunas — revisão aprovada

Substitui a faixa abaixo do título: mensagem à esquerda, com título compacto e alinhamento à esquerda, e fotografia à direita, aproximadamente metade da composição. Em até 900px, texto e imagem empilham com intervalo compacto. Bosque permanece provisório; demais seções preservadas.

### Textura de Quem somos

Fundo de troncos centralizado com cover em toda a seção. Camada branca de 50% suaviza apenas a textura, preservando contraste e opacidade dos textos.

### Depoimentos: textura restrita à apresentação

Área de avaliação sobre branco. Introdução com pêssego suave e recorte ampliado dos troncos, desaparecendo em direção à avaliação. No mobile, o fundo termina no bloco de apresentação. Textos e funcionamento das avaliações preservados.

### Logo horizontal no cabeçalho

Arquivo original 1044×250 do site oficial: logo-horizontal-oficial.png. Cabeçalho mantém altura de 92/80/74px; marca horizontal tem 260px no desktop e até 230px no celular. Em telas de até 600px, ação de contratação aparece no menu aberto e continua na abertura da página, liberando espaço para leitura da marca.

### Equilíbrio de cabeçalho e avaliações

Logo horizontal reduzido para 220px no desktop e até 205px no celular; tamanho das fontes e altura do menu preservados. Marca escrita como Bétula RH nos textos institucionais; citações literais preservadas. Abas Clientes/Candidatos com seleção por teclado. Texto integral substitui resumo em área de leitura de altura estável, rolável e focável, sem deslocar a seção seguinte. Sem JavaScript, todos os relatos e textos integrais ficam disponíveis.

### Depoimentos de ponta a ponta e logo do rodapé

Degradê e textura agora pertencem à seção inteira, com inset 0, sem margens brancas externas. Respiro dos textos preservado dentro do container. Pêssego parte da borda esquerda e termina em branco à direita. Logo vertical do rodapé preservado e ampliado para 200px no desktop e 180px no celular; no mobile ganha uma linha própria para não comprimir links.

### Rodapé complementar — referência Rhege

Fundo verde-petróleo de ponta a ponta, logo vertical claro, blocos Para empresas / Para candidatos / Acompanhe. Emails definidos pela cliente e redes confirmadas no site oficial em 16/09. Menu duplicado removido; acesso à contratação e volta ao topo preservados. Direitos autorais separados por linha. Sem endereço fiscal. WhatsApp do site antigo (final 1912) diverge do contato existente na prévia (final 9865); não acrescentar número ao rodapé antes de confirmar.

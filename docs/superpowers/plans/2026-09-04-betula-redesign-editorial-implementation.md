# Bétula Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar a página Astro da Bétula RH em uma experiência institucional B2B humana e editorial, com foco em recrutamento e seleção em Campinas, atuação nacional e conversão principal pelo WhatsApp.

**Architecture:** Manter uma página Astro estática, com conteúdo centralizado em `src/data/site.ts`, seções semânticas pequenas e um único sistema visual em CSS. Remover interações e dependências sem função comprovada; gerar HTML indexável, metadados coerentes e JSON-LD do tipo `EmploymentAgency` somente com dados visíveis e confirmados.

**Tech Stack:** Astro 5, TypeScript, CSS nativo, Tailwind 4 já presente no pipeline, Node.js `node:test`, Vercel e sitemap do Astro.

---

## Premissas e limites

- Trabalhar na branch `site-astro` sem alterar o domínio oficial.
- A primeira publicação será uma URL de prévia da Vercel.
- Não usar a fotografia de reunião, paisagem de bétulas, círculo fotográfico ou estatísticas no hero.
- Manter o WhatsApp como conversão primária e funcional sem JavaScript.
- Remover o formulário e a rota Resend desta primeira versão, pois o envio não foi comprovado de ponta a ponta.
- Tratar equipe, cargos, telefones, endereço, clientes e depoimentos como dados sujeitos à validação final da Bétula.
- Usar a equipe hoje publicada no domínio oficial como conteúdo provisório da prévia: Luciana Alvim, Vanessa Luiz, Tamara Tordin, Elaine Souza, Georgia Frattini e Keila Assis.
- Não fazer o apontamento de `betularh.com.br` durante a execução deste plano.

## Mapa de arquivos

### Criar

- `src/data/site.ts` — única fonte de conteúdo, contatos, links, processo, clientes, depoimentos e equipe.
- `src/components/Manifesto.astro` — narrativa “o contexto vem antes do currículo”.
- `src/components/Atuacao.astro` — perfis e contextos atendidos sem grade de cartões.
- `src/components/Processo.astro` — quatro momentos contendo as onze etapas reais.
- `src/components/Experiencia.astro` — clientes e depoimentos estáticos.
- `src/components/icons/WhatsAppIcon.astro` — ícone reutilizável e decorativo.
- `tests/site-output.test.mjs` — testes do HTML final, SEO, semântica e regressões visuais estruturais.

### Modificar

- `package.json` — scripts de teste e remoção da dependência Resend.
- `package-lock.json` — refletir a remoção de Resend.
- `src/pages/index.astro` — nova ordem narrativa.
- `src/layouts/Base.astro` — metadados, fontes e JSON-LD.
- `src/components/Header.astro` — quatro âncoras e CTA contextual.
- `src/components/Hero.astro` — hero tipográfico aprovado.
- `src/components/Time.astro` — composição editorial e dados centralizados.
- `src/components/Contato.astro` — fechamento pelo WhatsApp, sem formulário fictício.
- `src/components/Footer.astro` — navegação e dados centralizados.
- `src/components/WhatsAppFloat.astro` — URL centralizada e rótulo contextual.
- `src/scripts/main.ts` — somente menu, estado do cabeçalho, reveal opcional e ano.
- `src/styles/global.css` — substituição integral pelo sistema editorial.
- `public/site.webmanifest` — cores e descrição alinhadas.
- `public/robots.txt` — sitemap e regras mínimas.
- `README.md` — documentação real do projeto Astro e do fluxo de publicação.

### Remover

- `src/components/QuemSomos.astro`
- `src/components/Diferenciais.astro`
- `src/components/Metodo.astro`
- `src/components/Bosque.astro`
- `src/components/QuemConfia.astro`
- `src/pages/api/contact.ts`
- `.env.example`

Os arquivos de imagem antigos só serão removidos depois de uma busca final confirmar que não há referências.

## Fontes técnicas para consulta

- Google Search — títulos: `https://developers.google.com/search/docs/appearance/title-link`
- Google Search — imagens: `https://developers.google.com/search/docs/appearance/google-images`
- Google Search — dados estruturados: `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`
- Google Search — negócios locais: `https://developers.google.com/search/docs/appearance/structured-data/local-business`
- Schema.org — `EmploymentAgency`: `https://schema.org/EmploymentAgency`

### Task 1: Registrar a linha de base e o contrato de conteúdo

**Files:**
- Create: `src/data/site.ts`
- Inspect: `public/assets/img/*`

- [ ] **Step 1: Confirmar que o trabalho começa no commit da especificação**

Run:

```powershell
git status --short --branch
git log -1 --oneline
```

Expected: branch `site-astro`; commit `6a3bf1e` no histórico; nenhuma alteração de código ainda presente.

- [ ] **Step 2: Criar a fonte única de conteúdo**

Create `src/data/site.ts` with these exported shapes and values:

```ts
export const organization = {
  name: 'Bétula Recrutamento e Seleção',
  shortName: 'Bétula RH',
  url: 'https://betularh.com.br/',
  title: 'Recrutamento e Seleção em Campinas | Bétula RH',
  description:
    'Consultoria de recrutamento e seleção em Campinas, com atuação em todo o Brasil. Entendemos o contexto da empresa antes de iniciar a busca.',
  email: 'luciana@betularh.com.br',
  curriculumEmail: 'curriculo@betularh.com.br',
  address: 'Rua Paulo César Fidelis, 39, Sala 311, Villa Bella, Campinas/SP',
  instagram: 'https://www.instagram.com/betularh/',
  linkedin: 'https://www.linkedin.com/company/betularecrutamentoeselecao',
} as const;

const whatsappMessage =
  'Olá! Quero conversar sobre uma necessidade de contratação da minha empresa.';

export const contacts = {
  primary: {
    name: 'Luciana Alvim',
    display: '(19) 98138-9865',
    phone: '5519981389865',
  },
  secondary: {
    name: 'Vanessa Luiz',
    display: '(19) 98129-8401',
    phone: '5519981298401',
  },
} as const;

export function whatsappHref(phone = contacts.primary.phone, message = whatsappMessage) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const navigation = [
  { href: '#atuacao', label: 'Onde atuamos' },
  { href: '#processo', label: 'Como atuamos' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#equipe', label: 'Quem conduz' },
] as const;

export const processMoments = [
  {
    number: '01',
    title: 'Compreensão',
    summary: 'Antes da busca, entendemos o negócio, o momento e o que a contratação precisa transformar.',
    steps: [
      'Compreensão do segmento, momento e cultura do cliente — e da estratégia por trás da contratação.',
      'Identificação e alinhamento do perfil da vaga.',
    ],
  },
  {
    number: '02',
    title: 'Busca',
    summary: 'A estratégia de atração nasce do contexto, não de uma divulgação genérica.',
    steps: [
      'Recrutamento e hunting de candidatos.',
      'Análise e triagem de currículos.',
    ],
  },
  {
    number: '03',
    title: 'Avaliação',
    summary: 'Avaliamos trajetória, repertório, aspectos técnicos e aderência ao ambiente da empresa.',
    steps: [
      'Entrevistas sobre formação, trajetória, experiência, expectativas, motivações e aspectos comportamentais.',
      'Aplicação de provas técnicas e testes, quando necessários.',
      'Seleção dos candidatos a serem avaliados pelo cliente.',
      'Elaboração e envio de relatórios com informações e pareceres.',
      'Agendamento de entrevistas dos candidatos com o cliente.',
    ],
  },
  {
    number: '04',
    title: 'Acompanhamento',
    summary: 'O processo termina com retorno responsável e continua na adaptação de quem foi contratado.',
    steps: [
      'Fechamento e conclusão do processo com retorno aos candidatos participantes.',
      'Acompanhamento do candidato admitido.',
    ],
  },
] as const;

export const clients = [
  ['cli-bollhoff.png', 'Böllhoff'],
  ['cli-dellys.png', "Delly's"],
  ['cli-enxuto.png', 'Enxuto'],
  ['cli-eucatex.png', 'Eucatex'],
  ['cli-grancoffee.png', 'Gran Coffee'],
  ['cli-livre-sofia.png', 'Escola Livre Sofia'],
  ['cli-osteopatia-madrid.png', 'Escola de Osteopatia de Madrid'],
  ['cli-renova.png', 'Escola Renova'],
  ['cli-tecnopav.png', 'Tecnopav'],
  ['cli-telashop.png', 'Telashop'],
  ['cli-tso.png', 'TSO'],
  ['cli-vetnil.png', 'Vetnil'],
  ['cli-waldorf-acalanto.png', 'Escola Waldorf Acalanto'],
  ['cli-wgk.png', 'WGK'],
] as const;

export const testimonials = [
  {
    quote:
      'Luciana tem verdadeiro comprometimento e muita empatia no trabalho que desenvolve. Sua escuta ativa, assertividade no diálogo e experiência resultam em orientações extremamente pertinentes para a tomada de decisão. Muito importante para otimizar nosso recrutamento.',
    name: 'Camila Horiye Rodrigues',
    role: 'Diretora Adjunta do ICV',
  },
  {
    quote:
      'Parabenizo a forma com que foi conduzido o processo seletivo, estruturado, com foco no candidato e na empresa cliente. E uma parte super importante: o feedback final ao candidato, quando negativo, mencionando o motivo. O atendimento da equipe recrutadora também muito bom.',
    name: 'Maria Ieda Tyska Danoski',
    role: 'Gerente de Recursos Humanos',
  },
  {
    quote:
      'Assertiva, inteligente e muito transparente, Luciana teve a capacidade de me atrair para um processo de seleção em um momento em que eu não buscava recolocação, e teve a correta percepção de que eu me encaixaria à oportunidade. Desde então, virou grande conselheira e referência.',
    name: 'Fernanda Francabandiera',
    role: 'Gerente Sênior de RH',
  },
] as const;

export const team = [
  {
    image: 'team-luciana-alvim.jpg',
    name: 'Luciana Alvim',
    role: 'Fundadora e especialista em seleção',
    bio: 'Psicóloga responsável pela estratégia, métodos, processos, novos negócios e relações com clientes.',
  },
  {
    image: 'team-vanessa-luiz.jpg',
    name: 'Vanessa Luiz',
    role: 'Operação e processos seletivos',
    bio: 'Administradora com carreira consolidada em Recursos Humanos, responsável pela operação e pelos indicadores da consultoria.',
  },
  {
    image: 'team-tamara-tordin.jpg',
    name: 'Tamara Tordin',
    role: 'Experiência de candidatos',
    bio: 'Administradora responsável por assegurar uma experiência positiva e uma interação eficaz com candidatos.',
  },
  {
    image: 'team-elaine-souza.jpg',
    name: 'Elaine Souza',
    role: 'Recursos Humanos e seleção',
    bio: 'Administradora com experiência generalista em Recursos Humanos, Departamento Pessoal, recrutamento e seleção.',
  },
  {
    image: 'team-georgia-frattini.jpg',
    name: 'Georgia Frattini',
    role: 'Desenvolvimento de pessoas e seleção',
    bio: 'Administradora com experiência em desenvolvimento de pessoas, recrutamento e seleção.',
  },
  {
    image: 'team-keila-assis.jpg',
    name: 'Keila Assis',
    role: 'Avaliação psicológica',
    bio: 'Psicóloga e terapeuta que conduz avaliações e testes de atenção, cognição e personalidade.',
  },
] as const;
```

- [ ] **Step 3: Conferir a integridade do arquivo**

Run:

```powershell
npx astro check
```

Expected: zero TypeScript errors originating from `src/data/site.ts`.

- [ ] **Step 4: Commit**

```powershell
git add src/data/site.ts
git commit -m "refactor: centraliza conteudo institucional"
```

### Task 2: Criar testes de aceitação antes do redesign

**Files:**
- Create: `tests/site-output.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Adicionar o script de teste**

Add to `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "npm run build && node --test"
  }
}
```

- [ ] **Step 2: Escrever o teste que descreve a nova página**

Create `tests/site-output.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('expõe a promessa aprovada em um único h1', () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(
    html,
    /Antes de buscar alguém, entendemos onde sua empresa quer chegar\./,
  );
});

test('expõe SEO local e canonical coerentes', () => {
  assert.match(html, /<title>Recrutamento e Seleção em Campinas \| Bétula RH<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/betularh\.com\.br\/"/);
  assert.match(html, /Consultoria de recrutamento e seleção em Campinas/);
});

test('usa EmploymentAgency sem review próprio', () => {
  assert.match(html, /"@type":"EmploymentAgency"/);
  assert.doesNotMatch(html, /"@type":"Review"/);
});

test('mantém as onze etapas reais no HTML inicial', () => {
  assert.equal((html.match(/class="process-step"/g) ?? []).length, 11);
  assert.match(html, /Compreensão do segmento, momento e cultura do cliente/);
  assert.match(html, /Acompanhamento do candidato admitido/);
});

test('oferece WhatsApp real sem depender de formulário', () => {
  assert.match(html, /https:\/\/wa\.me\/5519981389865\?text=/);
  assert.doesNotMatch(html, /data-contact-form/);
  assert.doesNotMatch(html, /\/api\/contact/);
});

test('não reintroduz padrões rejeitados', () => {
  assert.doesNotMatch(html, /hero-birch\.jpg/);
  assert.doesNotMatch(html, /data-depo-track/);
  assert.doesNotMatch(html, /data-parallax/);
  assert.doesNotMatch(html, /hero-selos/);
});
```

- [ ] **Step 3: Executar o teste para comprovar que a página antiga falha**

Run:

```powershell
npm test
```

Expected: FAIL nos testes do novo `h1`, `EmploymentAgency` isolado, onze etapas, remoção do carrossel e remoção do formulário.

- [ ] **Step 4: Commit**

```powershell
git add package.json tests/site-output.test.mjs
git commit -m "test: define contrato editorial e de seo"
```

### Task 3: Reconstruir o layout, metadados e dados estruturados

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Substituir metadados e JSON-LD**

In `Base.astro`, import `organization` and build one entity. The JSON-LD must have this exact shape:

```ts
const employmentAgency = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  '@id': `${organization.url}#organizacao`,
  name: organization.name,
  alternateName: organization.shortName,
  url: organization.url,
  description: organization.description,
  image: `${organization.url}assets/img/og-cover.jpg`,
  logo: `${organization.url}assets/img/icon-512.png`,
  telephone: '+55-19-98138-9865',
  email: organization.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Paulo César Fidelis, 39, Sala 311, Villa Bella',
    addressLocality: 'Campinas',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Campinas' },
    { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Campinas' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  sameAs: [organization.instagram, organization.linkedin],
};
```

Use `organization.title`, `organization.description` and `organization.url` for title, description and canonical. Remove the FAQ schema, the `ProfessionalService` array and claims such as “há mais de 20 anos” until their current wording is confirmed.

- [ ] **Step 2: Corrigir a fonte de corpo**

Replace the Google Fonts URL with:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 3: Rodar checagem**

Run: `npm run check`

Expected: command exits 0; no errors in `Base.astro`.

- [ ] **Step 4: Commit**

```powershell
git add src/layouts/Base.astro
git commit -m "feat: atualiza metadados e entidade da Betula"
```

### Task 4: Construir cabeçalho e hero tipográfico

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Hero.astro`
- Create: `src/components/icons/WhatsAppIcon.astro`

- [ ] **Step 1: Criar o ícone reutilizável**

Create `src/components/icons/WhatsAppIcon.astro`:

```astro
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M12.04 2a9.9 9.9 0 0 0-8.58 14.85L2 22l5.3-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.18 8.18 0 1 1 6.98 3.87Z" />
</svg>
```

- [ ] **Step 2: Reescrever o cabeçalho**

Use `navigation` and `whatsappHref()` from `src/data/site.ts`. The menu must have `id="menu-principal"`; the toggle must use `aria-controls="menu-principal"`; the CTA label must be “Conversar sobre uma contratação”. Keep the logo at `190 × 54` desktop and allow it to shrink on mobile.

- [ ] **Step 3: Reescrever o hero sem fotografia**

Replace `Hero.astro` with:

```astro
---
import { whatsappHref } from '../data/site';
import WhatsAppIcon from './icons/WhatsAppIcon.astro';
---

<section class="hero" aria-labelledby="hero-title">
  <div class="hero-rule" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div class="hero-copy reveal">
      <p class="hero-context">Bétula RH · Campinas e todo o Brasil</p>
      <h1 id="hero-title">Antes de buscar alguém, entendemos onde sua empresa quer chegar.</h1>
      <p class="hero-lead">
        Consultoria de recrutamento e seleção em Campinas, com atuação em todo o Brasil.
      </p>
      <a class="button button-primary" href={whatsappHref()} target="_blank" rel="noopener">
        <WhatsAppIcon />
        Conversar sobre uma contratação
      </a>
    </div>
    <div class="hero-mark" aria-hidden="true">
      <img src="/assets/img/emblem-ink.png" alt="" width="512" height="512" fetchpriority="high" />
    </div>
  </div>
</section>
```

- [ ] **Step 4: Checar acessibilidade estrutural**

Run:

```powershell
npm run check
```

Expected: no errors in `Header.astro`, `Hero.astro` or `WhatsAppIcon.astro`.

- [ ] **Step 5: Commit do shell, cabeçalho e hero**

```powershell
git add src/components/Header.astro src/components/Hero.astro src/components/icons/WhatsAppIcon.astro
git commit -m "feat: cria abertura editorial da Betula"
```

### Task 5: Criar manifesto e atuação sem cartões repetidos

**Files:**
- Create: `src/components/Manifesto.astro`
- Create: `src/components/Atuacao.astro`

- [ ] **Step 1: Criar o manifesto humano**

Create `Manifesto.astro` with one `h2`, two concise paragraphs and the real image `/assets/img/socias.jpg`. Use this text:

```astro
<section class="section manifesto" id="abordagem" aria-labelledby="manifesto-title">
  <div class="container manifesto-grid">
    <div class="manifesto-copy reveal">
      <p class="section-index" aria-hidden="true">01</p>
      <h2 id="manifesto-title">O contexto vem antes do currículo.</h2>
      <p class="manifesto-lead">
        Uma contratação só faz sentido quando compreendemos o negócio, a equipe, a cultura e o momento da empresa.
      </p>
      <p>
        É dessa escuta que nasce uma busca mais precisa — capaz de aproximar trajetórias profissionais e desafios reais, com clareza para quem contrata e respeito por quem participa.
      </p>
    </div>
    <figure class="editorial-photo reveal">
      <img
        src="/assets/img/socias.jpg"
        alt="Profissionais da Bétula RH reunidas"
        width="1400"
        height="932"
        loading="lazy"
      />
      <figcaption>Proximidade para entender. Critério para conectar.</figcaption>
    </figure>
  </div>
</section>
```

- [ ] **Step 2: Criar a seção de atuação como composição editorial**

Create `Atuacao.astro` with these three groups, rendered as `article` elements separated by lines rather than cards:

```ts
const groups = [
  {
    title: 'Perfis que acompanham o negócio',
    text: 'De estagiários e profissionais operacionais a especialistas, lideranças, executivos e diretores.',
  },
  {
    title: 'Organizações em momentos distintos',
    text: 'Empresas nacionais e multinacionais, negócios familiares, serviços, indústrias, instituições de ensino, saúde, organizações sociais e operações investidas.',
  },
  {
    title: 'Campinas como base, Brasil como alcance',
    text: 'A proximidade regional convive com processos presenciais e virtuais conduzidos em diferentes localidades do país.',
  },
] as const;
```

Use `id="atuacao"`, `h2` “Onde a Bétula atua” and section index `02`.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Manifesto.astro src/components/Atuacao.astro
git commit -m "feat: apresenta abordagem e campos de atuacao"
```

### Task 6: Transformar as onze etapas em quatro momentos

**Files:**
- Create: `src/components/Processo.astro`

- [ ] **Step 1: Criar o processo editorial**

Create `Processo.astro`:

```astro
---
import { processMoments, whatsappHref } from '../data/site';
---

<section class="section process" id="processo" aria-labelledby="process-title">
  <div class="container">
    <header class="section-intro reveal">
      <p class="section-index" aria-hidden="true">03</p>
      <h2 id="process-title">Um processo que reduz incerteza.</h2>
      <p>Onze etapas preservadas, organizadas em quatro momentos para tornar o método claro sem simplificá-lo demais.</p>
    </header>
    <ol class="process-moments">
      {processMoments.map((moment) => (
        <li class="process-moment reveal">
          <div class="moment-heading">
            <span>{moment.number}</span>
            <h3>{moment.title}</h3>
            <p>{moment.summary}</p>
          </div>
          <ol class="moment-steps">
            {moment.steps.map((step) => <li class="process-step">{step}</li>)}
          </ol>
        </li>
      ))}
    </ol>
    <a class="text-link" href={whatsappHref()} target="_blank" rel="noopener">
      Levar uma necessidade de contratação para a Bétula
    </a>
  </div>
</section>
```

- [ ] **Step 2: Verificar a compilação do novo componente**

Run:

```powershell
npm run check
```

Expected: command exits 0. O teste das onze etapas ainda falha porque a página principal só será trocada na Task 7.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Processo.astro
git commit -m "feat: organiza metodo em quatro momentos"
```

### Task 7: Reconstruir prova social e equipe

**Files:**
- Create: `src/components/Experiencia.astro`
- Modify: `src/components/Time.astro`
- Modify: `src/pages/index.astro`
- Remove: `src/components/QuemSomos.astro`
- Remove: `src/components/Diferenciais.astro`
- Remove: `src/components/Metodo.astro`
- Remove: `src/components/Bosque.astro`
- Remove: `src/components/QuemConfia.astro`

- [ ] **Step 1: Renderizar clientes sem caixas e depoimentos sem carrossel**

Create `Experiencia.astro` with no buttons, dots, automatic interval or review JSON-LD:

```astro
---
import { clients, testimonials } from '../data/site';
---

<section class="section experience" id="experiencia" aria-labelledby="experience-title">
  <div class="container">
    <header class="section-intro reveal">
      <p class="section-index" aria-hidden="true">04</p>
      <h2 id="experience-title">Experiência construída em relações de confiança.</h2>
    </header>
    <ul class="client-list" aria-label="Alguns clientes da Bétula">
      {clients.map(([src, alt]) => (
        <li><img src={`/assets/img/${src}`} alt={alt} loading="lazy" width="180" height="80" /></li>
      ))}
    </ul>
    <div class="testimonial-list">
      {testimonials.map((testimonial) => (
        <figure class="testimonial reveal">
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Reescrever a equipe como composição assimétrica**

Import `team` in `Time.astro`; render the first member as `team-person team-person-featured` and the rest as `team-person`. Every portrait must use its real filename, `alt={member.name}`, `loading="lazy"`, `width="640"`, `height="800"`. Use `h2` “Quem conduz cada processo” and no Person JSON-LD until the team list is confirmed.

- [ ] **Step 3: Montar a ordem narrativa final**

Replace `src/pages/index.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Manifesto from '../components/Manifesto.astro';
import Atuacao from '../components/Atuacao.astro';
import Processo from '../components/Processo.astro';
import Experiencia from '../components/Experiencia.astro';
import Time from '../components/Time.astro';
import Contato from '../components/Contato.astro';
import Footer from '../components/Footer.astro';
import WhatsAppFloat from '../components/WhatsAppFloat.astro';
---

<Base>
  <Header />
  <main id="conteudo">
    <Hero />
    <Manifesto />
    <Atuacao />
    <Processo />
    <Experiencia />
    <Time />
    <Contato />
  </main>
  <Footer />
  <WhatsAppFloat />
</Base>
```

- [ ] **Step 4: Remover os cinco componentes substituídos**

Run:

```powershell
Remove-Item -LiteralPath src/components/QuemSomos.astro
Remove-Item -LiteralPath src/components/Diferenciais.astro
Remove-Item -LiteralPath src/components/Metodo.astro
Remove-Item -LiteralPath src/components/Bosque.astro
Remove-Item -LiteralPath src/components/QuemConfia.astro
```

Expected: only these five obsolete components are removed after `index.astro` stops importing them.

- [ ] **Step 5: Verificar a troca completa**

Run:

```powershell
npm run build
node --test
```

Expected: tests for H1, SEO, schema, eleven stages, carousel and rejected patterns PASS; the WhatsApp/form test may remain failing until Task 8.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/index.astro src/components/Experiencia.astro src/components/Time.astro src/components/QuemSomos.astro src/components/Diferenciais.astro src/components/Metodo.astro src/components/Bosque.astro src/components/QuemConfia.astro
git commit -m "feat: transforma experiencia e equipe em narrativa editorial"
```

### Task 8: Simplificar contato, rodapé e interações

**Files:**
- Modify: `src/components/Contato.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/WhatsAppFloat.astro`
- Modify: `src/scripts/main.ts`
- Remove: `src/pages/api/contact.ts`
- Remove: `.env.example`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Substituir o formulário por conversão direta**

`Contato.astro` must import `contacts`, `organization`, `whatsappHref` and `WhatsAppIcon`. Render one `h2` — “Uma boa contratação começa por uma conversa bem conduzida.” — one primary WhatsApp button, the two confirmed-source phone links, email, curriculum email and address. Do not render `form`, `input`, `textarea` or `/api/contact`.

- [ ] **Step 2: Centralizar links do rodapé e botão flutuante**

Use `navigation`, `organization` and `whatsappHref()` in both components. Keep the floating CTA labelled `Conversar sobre uma contratação pelo WhatsApp`, not merely “Falar no WhatsApp”.

- [ ] **Step 3: Reduzir o JavaScript ao necessário**

Replace `src/scripts/main.ts` with menu, header state, optional reveal and year only. The file must not contain `setInterval`, slider, parallax, form submission, pointer tracking or `window.open`.

```ts
const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

toggle?.addEventListener('click', () => {
  const open = header?.classList.toggle('menu-open') ?? false;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

menu?.addEventListener('click', (event) => {
  if (!(event.target instanceof Element) || !event.target.closest('a')) return;
  header?.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Abrir menu');
});

const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
```

- [ ] **Step 4: Remover backend não comprovado e dependência**

Run:

```powershell
Remove-Item -LiteralPath src/pages/api/contact.ts
Remove-Item -LiteralPath .env.example
npm uninstall resend
```

Expected: `resend` disappears from `package.json` and `package-lock.json`; no API route remains.

- [ ] **Step 5: Testar a conversão sem JavaScript**

Run:

```powershell
npm run build
node --test --test-name-pattern="WhatsApp real"
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/components/Contato.astro src/components/Footer.astro src/components/WhatsAppFloat.astro src/scripts/main.ts src/pages/api/contact.ts .env.example package.json package-lock.json
git commit -m "refactor: concentra conversao no WhatsApp"
```

### Task 9: Implementar o sistema visual editorial

**Files:**
- Modify: `src/styles/global.css`
- Modify: `public/site.webmanifest`

- [ ] **Step 1: Substituir tokens e estilos antigos**

Replace the old stylesheet rather than layering exceptions. The top of `global.css` must define:

```css
@import "tailwindcss";

:root {
  --teal: #115f61;
  --teal-soft: #4e8f90;
  --bronze: #7a4a12;
  --sand: #f0e9de;
  --paper: #fafaf8;
  --ink: #232323;
  --muted: #5e625f;
  --line: color-mix(in srgb, var(--teal) 20%, transparent);
  --font-display: "Manrope", sans-serif;
  --font-body: "Source Sans 3", sans-serif;
  --container: 1180px;
  --radius-sm: 8px;
  --radius: 12px;
  --space-section: clamp(5rem, 9vw, 9rem);
  --ease: cubic-bezier(.22, 1, .36, 1);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--paper); }
body { margin: 0; color: var(--ink); background: var(--paper); font-family: var(--font-body); line-height: 1.6; }
img { display: block; max-width: 100%; height: auto; }
a { color: inherit; }
.container { width: min(100% - 2.5rem, var(--container)); margin-inline: auto; }
.section { padding-block: var(--space-section); }
```

Then implement the exact component classes introduced in Tasks 4–8. Follow these constraints:

- hero: asymmetric two-column grid, oversized type, clipped emblem, vertical rule, no photo background;
- headings: no italic spans or isolated highlighted words;
- section indexes: small but not all-caps labels;
- manifesto image: rectangular `4 / 3`, radius `8px`, no shadow;
- atuação: three columns separated by 1px vertical rules on desktop and horizontal rules on mobile;
- processo: four large rows, eleven visible steps, no numbered circles;
- clients: flex/wrap or grid with transparent background, no cells or boxes;
- testimonials: static editorial columns, no arrows/dots;
- team: featured portrait wider than the remaining portraits, rectangular crops, no circular photos;
- buttons: 8px radius, no pill shape, no heavy shadow;
- contact: teal field with enlarged cropped emblem at low opacity;
- motion: opacity/translate of at most 16px and 500ms; reduced-motion disables it;
- breakpoints: `960px`, `760px` and `520px`;
- focus: every link and button gets a visible 3px outline with offset;
- tap targets: menu and CTA controls at least 44px high;
- no horizontal overflow at 320px.

- [ ] **Step 2: Atualizar o manifest**

Set `background_color` to `#FAFAF8`, `theme_color` to `#115F61`, and description to:

```json
"Consultoria de recrutamento e seleção em Campinas, com atuação em todo o Brasil."
```

- [ ] **Step 3: Procurar padrões visuais antigos**

Run:

```powershell
rg -n "hero-circle|hero-selos|diff-card|team-card|depo-slider|border-radius:\s*50%|parallax" src
```

Expected: no matches, except the circular WhatsApp floating button if its selector is intentionally retained.

- [ ] **Step 4: Build and commit**

Run: `npm run check && npm test`

Expected: check and all tests PASS.

```powershell
git add src/styles/global.css public/site.webmanifest
git commit -m "style: aplica sistema editorial da marca"
```

### Task 10: Otimizar e limpar imagens com segurança

**Files:**
- Modify: selected files under `public/assets/img/`
- Remove: only unreferenced files under `public/assets/img/`

- [ ] **Step 1: Inventariar referências antes de qualquer remoção**

Run:

```powershell
rg -o "/assets/img/[A-Za-z0-9._-]+" src public README.md | Sort-Object -Unique
Get-ChildItem -LiteralPath public/assets/img -File | Select-Object Name, Length
```

Expected: an explicit list of referenced assets and a separate list of existing files.

- [ ] **Step 2: Otimizar apenas fotografias utilizadas**

Keep source masters outside `public`; export web versions in sRGB with these maximum dimensions:

- `socias.jpg`: 1400px wide, quality 82;
- team portraits: 800 × 1000px crop, quality 82;
- `og-cover.jpg`: exactly 1200 × 630px;
- client logos: preserve transparency and natural aspect ratio.

Do not upscale a source that is smaller than the target. Preserve the original files until the optimized output is visually compared.

- [ ] **Step 3: Remove only assets proven unused**

Candidate removals include `hero-birch.jpg`, `bg-bosque.jpg`, `bg-depoimentos.jpg`, circular portrait variants and contour textures. For every candidate, run:

```powershell
rg -n "hero-birch|bg-bosque|bg-depoimentos|retrato-a|retrato-b|retrato-c|pattern-contour" src public README.md
```

Expected before removal: no references. If any match exists, keep the file or remove the reference first.

- [ ] **Step 4: Verify and commit**

Run: `npm test`

Expected: all tests PASS and no broken asset request during local browser review.

```powershell
git add public/assets/img
git commit -m "perf: otimiza imagens da narrativa editorial"
```

### Task 11: Atualizar documentação e regras de rastreamento

**Files:**
- Modify: `README.md`
- Modify: `public/robots.txt`

- [ ] **Step 1: Reescrever o README para a base real**

Document these exact commands:

```markdown
## Desenvolvimento

```powershell
npm install
npm run dev
```

## Verificação

```powershell
npm run check
npm test
```

## Conteúdo

Contatos, equipe, processo, clientes e depoimentos ficam em `src/data/site.ts`.
Antes de publicar no domínio oficial, valide nomes, cargos, fotografias, telefones, endereço e autorização dos depoimentos e logotipos.
```

Also state that the project is Astro, the primary CTA is WhatsApp, and production cutover requires explicit approval.

- [ ] **Step 2: Manter robots coerente**

Set `public/robots.txt` to:

```text
User-agent: *
Allow: /

Sitemap: https://betularh.com.br/sitemap-index.xml
```

- [ ] **Step 3: Commit**

```powershell
git add README.md public/robots.txt
git commit -m "docs: atualiza operacao e validacao do site"
```

### Task 12: Executar QA técnico, visual e editorial

**Files:**
- Modify only the files that fail verification.

- [ ] **Step 1: Executar a suíte completa**

Run:

```powershell
npm run check
npm test
```

Expected: both commands exit 0; all tests PASS.

- [ ] **Step 2: Servir a versão final localmente**

Run:

```powershell
npm run preview -- --host 127.0.0.1
```

Expected: local URL on port 4321 or the next available port.

- [ ] **Step 3: Fazer revisão visual em navegador real**

Use the browser tooling and capture screenshots at:

- desktop: 1440 × 1000;
- tablet: 768 × 1024;
- mobile: 390 × 844;
- narrow mobile: 320 × 700.

Verify:

- hero contains no dominant photo and no landscape of trees;
- logo is legible;
- H1 has intentional line breaks and no overflow;
- vertical rules create rhythm without resembling a spreadsheet;
- meeting/team photo appears only after the hero;
- clients have no card boxes;
- testimonials do not move automatically;
- portraits are rectangular and varied;
- WhatsApp CTA remains visible but does not cover content;
- no horizontal scroll at 320px.

- [ ] **Step 4: Fazer revisão acessível**

Using keyboard only:

1. activate the skip link;
2. open and close the mobile menu;
3. traverse all navigation and CTA links;
4. confirm visible focus;
5. confirm menu state changes in `aria-expanded`;
6. enable reduced motion and confirm content remains visible.

Expected: all actions work without pointer input.

- [ ] **Step 5: Testar links e dados visíveis**

Confirm each `wa.me` link opens the correct number and prefilled message. Confirm email links, Instagram, LinkedIn and all section anchors. Compare names, roles, photos, client logos, testimonials, phone numbers and address against the approval record before any public cutover.

- [ ] **Step 6: Commit corrections**

```powershell
git add src public tests README.md package.json package-lock.json
git commit -m "fix: conclui qa responsivo e acessivel"
```

Skip this commit if QA produces no changes.

### Task 13: Criar prévia na Vercel sem trocar o domínio

**Files:**
- No source changes expected.

- [ ] **Step 1: Confirmar estado do repositório**

Run:

```powershell
git status --short --branch
git log --oneline -8
```

Expected: clean working tree; the redesign commits are present; branch remains `site-astro`.

- [ ] **Step 2: Enviar a branch somente após revisão dos commits**

Run:

```powershell
git push origin site-astro
```

Expected: push succeeds and the Vercel integration creates a deployment for the branch.

- [ ] **Step 3: Identificar a URL de prévia**

Open the deployment generated from the exact commit pushed. Do not alter DNS, production aliases or project-domain settings.

- [ ] **Step 4: Repetir smoke test na prévia**

Verify the deployed page at desktop and mobile, all WhatsApp links, canonical, sitemap, OG image, JSON-LD and absence of `/api/contact`.

- [ ] **Step 5: Entregar para aprovação**

Report:

- preview URL;
- commit deployed;
- test results;
- unresolved content confirmations, if any;
- explicit statement that `betularh.com.br` was not changed.

Production cutover is a separate, explicitly authorized task.

## Conteúdo que precisa de confirmação antes da produção

The preview may use the current official-site values listed in `src/data/site.ts`, but production remains blocked until the user or Bétula confirms:

1. whether the six-person team is current;
2. role wording and portrait mapping for all six people;
3. Luciana and Vanessa’s WhatsApp numbers;
4. `luciana@betularh.com.br` and `curriculo@betularh.com.br`;
5. the Campinas address;
6. permission and current relevance for all fourteen client logos;
7. fidelity and permission for the three selected testimonials.

## Final acceptance command set

```powershell
npm run check
npm test
git status --short --branch
```

Expected final state:

- Astro check exits 0;
- build exits 0;
- all Node tests pass;
- no uncommitted files;
- branch preview approved;
- official domain unchanged.

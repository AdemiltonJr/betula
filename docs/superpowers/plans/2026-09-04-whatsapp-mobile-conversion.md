# WhatsApp Mobile Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar conversão persistente e discreta para WhatsApp somente no mobile, depois do hero, e reforçar o CTA mobile ao final do processo.

**Architecture:** Um componente Astro isolado renderiza o link fixo usando a função centralizada `whatsappHref`. O script existente usa `IntersectionObserver` para alternar sua visibilidade com base no hero, sem listener de scroll. O CSS mantém o componente invisível no desktop e promove o link editorial do processo apenas em telas mobile.

**Tech Stack:** Astro 5, TypeScript, CSS, Node test runner, Playwright CLI.

---

### Task 1: Contrato de saída para a conversão mobile

**Files:**
- Modify: `tests/site-output.test.mjs`
- Test: `tests/site-output.test.mjs`

- [ ] **Step 1: Write the failing test**

Adicionar ao final do arquivo:

```js
test('inclui conversão mobile persistente sem listener contínuo de scroll', () => {
  assert.equal((html.match(/<a\b[^>]*data-whatsapp-float/g) ?? []).length, 1);
  assert.equal((html.match(/<section\b[^>]*data-hero/g) ?? []).length, 1);
  assert.match(html, /aria-label="Conversar com a Bétula pelo WhatsApp"/);
  assert.doesNotMatch(html, /addEventListener\(["']scroll/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL no teste novo porque `data-whatsapp-float` ainda não existe.

- [ ] **Step 3: Commit the failing contract**

```powershell
git add tests/site-output.test.mjs
git commit -m "test: define conversão móvel para WhatsApp"
```

### Task 2: Componente fixo e comportamento depois do hero

**Files:**
- Create: `src/components/WhatsAppFloat.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/scripts/main.ts`
- Modify: `src/styles/global.css`
- Test: `tests/site-output.test.mjs`

- [ ] **Step 1: Create the isolated Astro component**

Criar `src/components/WhatsAppFloat.astro`:

```astro
---
import { whatsappHref } from '../data/site';
---

<a
  class="whatsapp-float"
  data-whatsapp-float
  href={whatsappHref()}
  target="_blank"
  rel="noopener"
  aria-label="Conversar com a Bétula pelo WhatsApp"
>
  <span class="whatsapp-float-dot" aria-hidden="true"></span>
  <span>WhatsApp</span>
</a>
```

- [ ] **Step 2: Mark the hero and mount the component**

Em `src/components/Hero.astro`, alterar a abertura para:

```astro
<section class="hero" data-hero aria-labelledby="hero-title">
```

Em `src/pages/index.astro`, importar o componente:

```astro
import WhatsAppFloat from '../components/WhatsAppFloat.astro';
```

E renderizá-lo depois de `</main>` e antes de `<Footer />`:

```astro
  </main>
  <WhatsAppFloat />
  <Footer />
```

- [ ] **Step 3: Toggle visibility with IntersectionObserver**

Adicionar ao final de `src/scripts/main.ts`:

```ts
const hero = document.querySelector<HTMLElement>('[data-hero]');
const floatingWhatsApp = document.querySelector<HTMLElement>('[data-whatsapp-float]');

if (hero && floatingWhatsApp && 'IntersectionObserver' in window) {
  const whatsappObserver = new IntersectionObserver(([entry]) => {
    floatingWhatsApp.classList.toggle('is-active', !entry.isIntersecting);
  }, { threshold: 0 });

  whatsappObserver.observe(hero);
}
```

- [ ] **Step 4: Add mobile-only styling**

Adicionar antes dos media queries em `src/styles/global.css`:

```css
.whatsapp-float {
  display: none;
}
```

Adicionar dentro de `@media (max-width: 760px)`:

```css
.whatsapp-float {
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  z-index: 90;
  display: inline-flex;
  min-height: 2.85rem;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 0.95rem;
  border: 1px solid rgba(250, 250, 248, 0.45);
  border-radius: var(--radius);
  background: var(--teal);
  color: var(--paper);
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 680;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  text-decoration: none;
  transform: translateY(10px);
  transition: opacity 180ms ease, transform 180ms ease, background-color 160ms ease;
}

.whatsapp-float.is-active {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.whatsapp-float:hover {
  background: var(--teal-deep);
}

.whatsapp-float-dot {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 999px;
  background: #b9e2c2;
}

.process .text-link {
  width: 100%;
  min-height: 3.25rem;
  justify-content: center;
  padding: 0.8rem 1rem;
  border: 1px solid var(--teal);
  border-radius: var(--radius);
  background: var(--teal);
  color: var(--paper);
}
```

No bloco `@media (prefers-reduced-motion: reduce)`, garantir que o botão não anime:

```css
.whatsapp-float {
  transform: none;
}
```

- [ ] **Step 5: Run checks and tests**

Run: `npm run check`

Expected: 0 errors, 0 warnings e 0 hints.

Run: `npm test`

Expected: 7 tests passing.

- [ ] **Step 6: Commit the implementation**

```powershell
git add src/components/WhatsAppFloat.astro src/components/Hero.astro src/pages/index.astro src/scripts/main.ts src/styles/global.css
git commit -m "feat: reforça conversão móvel no WhatsApp"
```

### Task 3: Visual QA and public preview

**Files:**
- Verify: `src/components/WhatsAppFloat.astro`
- Verify: `src/styles/global.css`
- Publish: generated `dist/` output to the existing `gh-pages` worktree

- [ ] **Step 1: Start the local server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: local server available at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Inspect mobile behavior**

Usar Playwright CLI em 390 x 844 e 320 x 740 para confirmar:

- botão oculto no hero;
- botão visível depois do hero;
- retorno ao topo oculta o botão;
- link de processo tem aparência de botão;
- menu, CTA final e conteúdo não ficam cobertos;
- `scrollWidth` permanece igual a `innerWidth`.

- [ ] **Step 3: Inspect desktop isolation**

Usar Playwright CLI em 1440 x 1000 e confirmar que `[data-whatsapp-float]` tem `display: none` e que o link do processo conserva o estilo editorial de texto.

- [ ] **Step 4: Run final verification**

Run: `npm run check`

Expected: 0 errors, 0 warnings e 0 hints.

Run: `npm test`

Expected: 7 tests passing.

Run: `git diff --check`

Expected: no output.

- [ ] **Step 5: Push the feature branch**

```powershell
git push origin codex/betula-editorial
```

Expected: remote branch updated to the local commit.

- [ ] **Step 6: Refresh the public mobile preview**

Executar no worktree principal:

```powershell
npm run build
Copy-Item -Path 'dist\*' -Destination 'C:\Users\ademi\Projetos-Codex\worktrees\betula-pages-preview' -Recurse -Force
```

Executar no worktree `C:\Users\ademi\Projetos-Codex\worktrees\betula-pages-preview`:

```powershell
node -e "const fs=require('fs'); const q=String.fromCharCode(34); let html=fs.readFileSync('index.html','utf8'); html=html.replaceAll('href='+q+'/', 'href='+q+'/betula/').replaceAll('src='+q+'/', 'src='+q+'/betula/'); fs.writeFileSync('index.html',html); const manifest=JSON.parse(fs.readFileSync('site.webmanifest','utf8')); manifest.start_url='/betula/'; manifest.icons=manifest.icons.map(icon=>({...icon,src:icon.src.startsWith('/betula/')?icon.src:'/betula'+icon.src})); fs.writeFileSync('site.webmanifest',JSON.stringify(manifest,null,2)+'\n');"
git add -A
git commit -m "deploy: atualiza prévia editorial"
git push origin gh-pages
curl.exe -sS -o NUL -w "page=%{http_code}\n" "https://ademiltonjr.github.io/betula/"
```

Expected: `https://ademiltonjr.github.io/betula/` returns HTTP 200 and shows the new mobile CTA behavior.

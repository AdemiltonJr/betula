# Bétula conexões Implementation Plan

**Goal:** Implementar a direção orgânica aprovada e entregar prévia funcional verificável.

**Architecture:** Astro estático, layout de metadados existente e novos componentes de apresentação. CSS e TypeScript da nova página separados do legado preservado.

**Tech Stack:** Astro 5, TypeScript, CSS, fontes locais e Playwright CLI.

- [x] Criar `src/components/conexoes/Hero.astro` com título, duas fotografias e CTA para `#atuacao`.
- [x] Criar `Hiring.astro` com três botões de seleção, região de status, cargo opcional e link de WhatsApp direto como fallback.
- [x] Criar `Story.astro` com quatro etapas do processo, equipe, experiência e FAQ sem prova social não confirmada.
- [x] Substituir composição em `src/pages/index.astro`, estilos no Base e módulo de script por `conexoes.css` e `conexoes.ts`; manter SEO e navegação.
- [x] Atualizar testes de HTML para os requisitos da nova página e executar `npm run check` e `npm test`.
- [x] Servir com `npm run dev -- --host 127.0.0.1 --port 4325`, inspecionar desktop/mobile com Playwright, verificar seletor, menu, teclado, âncoras, assets e fallback.
- [x] Registrar evidências, revisar diff, commit e abrir prévia no Codex.


# Conversão mobile para WhatsApp

## Objetivo

Tornar o contato pelo WhatsApp mais presente durante a navegação mobile sem transformar o site institucional em uma landing page agressiva ou genérica.

## Escopo

- Aplicar a nova experiência apenas em telas mobile, até 760 px.
- Manter o desktop e a seção de prova social sem alterações nesta etapa.
- Preservar o mesmo número, mensagem e função `whatsappHref` já centralizados em `src/data/site.ts`.

## Botão fixo

- Exibir um botão compacto com o texto `WhatsApp` no canto inferior direito.
- Manter o botão oculto enquanto o hero estiver visível.
- Revelar o botão depois que a pessoa ultrapassar o hero.
- Ocultar novamente quando a pessoa retornar ao hero.
- Posicionar o botão acima da área segura do dispositivo com `env(safe-area-inset-bottom)`.
- Usar o verde institucional da Bétula, sem animações chamativas, pulso ou sombra pesada.
- Abrir a conversa em nova aba com `noopener`.

## Chamada dentro do conteúdo

- Transformar o link ao final da seção de processo em um botão mobile mais evidente.
- Manter no desktop a apresentação editorial atual desse link.
- Usar o mesmo texto de intenção já aprovado: `Conversar sobre uma contratação`.

## Comportamento técnico

- Criar um componente isolado para o botão fixo.
- Usar `IntersectionObserver` para observar o hero, sem listener contínuo de scroll.
- Sem JavaScript, o botão fixo permanece oculto; os CTAs normais continuam disponíveis.
- Respeitar `prefers-reduced-motion` e manter foco de teclado visível.

## Verificação

- Confirmar que o botão não aparece no desktop.
- Confirmar que não cobre conteúdo, navegação ou o CTA final em 320 px e 390 px.
- Confirmar que aparece após o hero e desaparece ao retornar ao topo.
- Confirmar que todos os links usam a URL real do WhatsApp.
- Rodar `npm run check`, `npm test` e uma inspeção visual mobile.

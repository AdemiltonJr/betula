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

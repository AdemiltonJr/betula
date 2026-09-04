# Bétula RH

Site institucional da Bétula Recrutamento e Seleção, desenvolvido em Astro e direcionado a empresas que precisam contratar.

## Stack

- Astro com geração estática
- TypeScript
- CSS editorial próprio
- Fontes Manrope e Source Sans 3 hospedadas no projeto
- Adaptador da Vercel e sitemap automático

## Desenvolvimento

```bash
npm ci
npm run dev
```

O servidor local abre normalmente em `http://localhost:4321`.

## Verificação

```bash
npm run check
npm test
```

O segundo comando gera a versão de produção e valida o contrato editorial, o SEO local, os dados estruturados, as 11 etapas do processo e a ausência dos padrões descartados no redesign.

## Conteúdo

Textos, contatos, navegação, clientes, depoimentos, processo e equipe ficam centralizados em `src/data/site.ts`. Os componentes da página estão em `src/components` e os estilos globais em `src/styles/global.css`.

## Publicação

O projeto está preparado para deploy estático na Vercel. A URL canônica permanece `https://betularh.com.br/`.

## Validações pendentes antes da produção

Os dados reproduzem as referências disponíveis, mas devem ser confirmados com a Bétula antes da troca do site oficial:

- nomes, cargos e correspondência das fotos da equipe;
- telefones, emails e endereço;
- autorização e atualidade dos logos de clientes;
- fidelidade e autorização dos depoimentos.

Essas pendências também ficam registradas no objeto `contentValidation` em `src/data/site.ts`.

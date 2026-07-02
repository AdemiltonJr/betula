# Bétula RH — Landing Page

Landing page estática de alta conversão para a **Bétula Recrutamento e Seleção** — redesign moderno, rápido e com SEO forte do site atual (betularh.com.br).

## Stack

HTML + CSS + JavaScript puro. **Sem build, sem dependências.** Basta hospedar os arquivos.

```
index.html            → página única
assets/styles.css     → design system (paleta, tipografia, responsivo)
assets/main.js         → menu mobile, reveal no scroll, nav ativo
assets/img/            → logo, equipe, depoimentos, clientes (otimizados)
assets/ref/            → imagens originais baixadas da referência (NÃO publicar)
favicon.ico, site.webmanifest, robots.txt, sitemap.xml
```

## Ver localmente

Qualquer servidor estático. Ex.:

```bash
python -m http.server 8123
# abra http://localhost:8123
```

## Publicar

Arraste a pasta (sem `assets/ref/` e sem `docs/`) para **Netlify**, **Vercel** ou **GitHub Pages**.
Depois, no HTML/arquivos de SEO, troque `https://betularh.com.br/` pelo domínio final (canonical, Open Graph, sitemap, JSON-LD).

## Como editar

- **Textos:** direto no `index.html` (seções comentadas: HERO, PROPÓSITO, ATENDEMOS, DIFERENCIAIS, METODOLOGIA, EQUIPE, DEPOIMENTOS, CTA, FOOTER).
- **WhatsApp:** procure por `5519983631912` no `index.html` (aparece nos botões e no FAB flutuante) e substitua pelo número correto (formato `55` + DDD + número).
- **E-mails / redes:** no rodapé e na seção de contato (`luciana@betularh.com.br`, `curriculo@betularh.com.br`, Instagram/Facebook/LinkedIn).
- **Cores/fontes:** variáveis no topo do `assets/styles.css` (`:root`). Ex.: `--evergreen`, `--gold`, `--cream`.
- **Fotos:** substitua os arquivos em `assets/img/` mantendo os nomes (ex.: `team-luciana-alvim.jpg`). Recomendado: JPG quadrado ~560px para equipe.

## ⚠️ Verificações antes de ir ao ar

1. **Fotos da equipe × nomes:** o pareamento foto↔pessoa foi inferido da ordem do site original e pode ter trocas. **Confira cada rosto** na seção Equipe.
2. **Depoimentos:** os textos de Bruno, Maria Ieda e Fernanda foram ajustados/resumidos do original; revise a fidelidade.
3. **Logos de clientes:** são marcas de terceiros reproduzidas do site atual. Confirme autorização de uso.
4. **Endereço:** não constava no site original — usei "Campinas · São Paulo · Brasil". Adicione o endereço completo se desejar (melhora SEO local; posso incluir `LocalBusiness` com `geo`).
5. **Número de WhatsApp:** confirme se `(19) 98363-1912` é o canal de atendimento atual.

## Extras que posso adicionar depois

- Formulário de contato (Formspree/serviço) além do WhatsApp.
- Página/《portal》de vagas para candidatos.
- Google Analytics / Tag Manager / Pixel.
- Endereço com mapa e schema `LocalBusiness`.

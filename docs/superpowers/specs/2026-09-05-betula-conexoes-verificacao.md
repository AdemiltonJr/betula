# Verificação da página Bétula conexões

Data: 5 de setembro de 2026. Ambiente: prévia estática local, Chromium via Playwright CLI.

- `npm run check`: 0 erros, 0 avisos, 0 hints.
- `npm test`: build concluído, 7 testes aprovados.
- `git diff --check`: sem erros de whitespace após ajuste documental.
- Larguras 1440, 1024, 768, 390 e 320: largura do documento igual à viewport, sem elementos transbordando e sem imagens com falha após decodificação.
- Menu abre, Escape fecha e seleção funciona pelo teclado.
- Uma única opção ativa; título e explicação atualizados.
- Mensagem preparada preserva “Gerente de operações & logística”. Nenhuma mensagem enviada.
- FAQ abre; reduced-motion remove animação e rolagem suave.
- Contexto separado com JavaScript desativado: navegação visível, quatro etapas entregues e link de WhatsApp disponível.
- Nenhum pageerror no percurso final.

Capturas locais em `output/playwright/conexoes-1440-full.png`, `conexoes-390-full.png` e `conexoes-{largura}-hero.png`. Inspeção visual identificou e corrigiu recorte dos rostos da equipe.

Não houve publicação no domínio oficial. Contatos e permissões de imagem continuam sujeitos a confirmação antes da publicação. Desempenho em rede real e métricas de conversão não foram medidos.

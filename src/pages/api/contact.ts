import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Requisição inválida.' }, 400);
  }

  const str = (v: unknown) => (v == null ? '' : String(v)).trim();
  const nome = str(body.nome);
  const empresa = str(body.empresa);
  const contato = str(body.contato);
  const mensagem = str(body.mensagem);

  if (!nome || !contato) {
    return json({ ok: false, error: 'Preencha nome e contato.' }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO || 'luciana@betularh.com.br';
  const from = import.meta.env.CONTACT_FROM || 'Site Bétula <onboarding@resend.dev>';

  // Sem chave configurada: front-end orienta a usar o WhatsApp.
  if (!apiKey) {
    return json({ ok: false, error: 'Envio por e-mail não configurado.' }, 503);
  }

  const resend = new Resend(apiKey);
  const text = [
    'Novo contato pelo site da Bétula RH:',
    `Nome: ${nome}`,
    empresa ? `Empresa: ${empresa}` : null,
    `Contato: ${contato}`,
    mensagem ? `Mensagem: ${mensagem}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Contato pelo site: ${nome}`,
      replyTo: contato.includes('@') ? contato : undefined,
      text,
    });
    if (error) return json({ ok: false, error: 'Não foi possível enviar agora.' }, 502);
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false, error: 'Não foi possível enviar agora.' }, 502);
  }
};

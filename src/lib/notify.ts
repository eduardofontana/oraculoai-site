/* ------------------------------------------------------------------ */
/*  Notificação de lead via e-mail (nodemailer)                        */
/*  Opcional — se SMTP não configurado, apenas log                    */
/* ------------------------------------------------------------------ */

import nodemailer from "nodemailer";

type LeadData = {
  nome: string;
  email: string;
  empresa?: string | null;
  mensagem: string;
};

let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;

  _transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });

  return _transporter;
}

/**
 * Envia e-mail de notificação quando um novo lead chega.
 * Silenciosamente ignora se SMTP não estiver configurado.
 */
export async function notifyNewLead(lead: LeadData): Promise<void> {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const to = process.env.NOTIFY_EMAIL;

  if (!from || !to) {
    console.info("[Notify] SMTP não configurado. Notificação ignorada.");
    return;
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.info("[Notify] Transporter não disponível. Notificação ignorada.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"OráculoAI" <${from}>`,
      to,
      replyTo: lead.email,
      subject: `Novo lead: ${lead.nome}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:sans-serif;padding:24px;max-width:600px">
          <h2 style="color:#6C63FF">Novo lead — OráculoAI</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666">Nome</td>
                <td style="padding:8px 0"><strong>${lead.nome}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">E-mail</td>
                <td style="padding:8px 0"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">Empresa</td>
                <td style="padding:8px 0">${lead.empresa || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#666;vertical-align:top">Mensagem</td>
                <td style="padding:8px 0">${lead.mensagem}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
          <p style="color:#999;font-size:12px">
            Enviado automaticamente pelo site oraculoai.cloud
          </p>
        </body>
        </html>
      `,
    });

    console.info("[Notify] E-mail enviado para", to);
  } catch (err) {
    console.error("[Notify] Erro ao enviar e-mail:", err);
  }
}

/**
 * Template HTML do e-mail do formulário de contato.
 * E-mail exige layout de <table> e estilos 100% inline (Gmail/Outlook/Apple
 * Mail não suportam CSS externo). Todo valor vindo do formulário é escapado.
 */

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Label cinza uppercase + valor, com hairline inferior. */
function fieldRow(label: string, valueHtml: string): string {
  return `
    <tr>
      <td style="padding: 0 0 16px 0; border-bottom: 1px solid #EEEEEE;">
        <p style="margin: 0 0 4px 0; color: #888888; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-family: ${FONT_STACK};">${label}</p>
        <p style="margin: 0; color: #1A1A1A; font-size: 15px; font-family: ${FONT_STACK};">${valueHtml}</p>
      </td>
    </tr>
    <tr><td style="height: 16px; line-height: 16px; font-size: 0;">&nbsp;</td></tr>`;
}

export function buildContactEmailHtml(data: ContactEmailData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : "";
  const subject = escapeHtml(data.subject);
  // Escapa primeiro, depois converte quebras de linha em <br>
  const message = escapeHtml(data.message).replaceAll("\r\n", "\n").replaceAll("\n", "<br>");

  const fields = [
    fieldRow("Nome", name),
    fieldRow(
      "E-mail",
      `<a href="mailto:${email}" style="color: #1A1A1A; text-decoration: underline;">${email}</a>`,
    ),
    phone ? fieldRow("Telefone", phone) : "",
    fieldRow("Assunto", subject),
  ].join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Novo contato pelo site</title>
</head>
<body style="margin: 0; padding: 0; background-color: #E8E8E8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #E8E8E8; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #0D0D0D; padding: 32px; text-align: center;">
              <p style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: bold; font-family: ${FONT_STACK};">Fluxus Tecnologia</p>
              <p style="margin: 6px 0 0 0; color: #888888; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-family: ${FONT_STACK};">Tecnologia</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 16px auto 0 auto;">
                <tr><td style="width: 40px; height: 2px; background-color: #F5A623; font-size: 0; line-height: 2px;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Corpo -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 32px;">
              <p style="margin: 0; color: #1A1A1A; font-size: 20px; font-weight: bold; font-family: ${FONT_STACK};">Nova mensagem de contato</p>
              <p style="margin: 4px 0 0 0; color: #666666; font-size: 13px; font-family: ${FONT_STACK};">Recebida pelo formulário do site</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 28px;">
                ${fields}
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; color: #888888; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-family: ${FONT_STACK};">Mensagem</p>
                    <div style="background-color: #F8F8F8; padding: 20px; border-radius: 8px; border-left: 3px solid #F5A623;">
                      <p style="margin: 0; color: #1A1A1A; font-size: 15px; line-height: 1.6; font-family: ${FONT_STACK};">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F5F5; padding: 24px; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 12px; font-family: ${FONT_STACK};">Este e-mail foi enviado automaticamente pelo formulário de contato do site fluxustecnologia.com.br</p>
              <p style="margin: 8px 0 0 0; color: #999999; font-size: 12px; font-family: ${FONT_STACK};">Para responder diretamente, use o botão Responder do seu e-mail.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

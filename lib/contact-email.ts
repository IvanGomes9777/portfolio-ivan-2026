// Builds the HTML for the notification email sent when a customer submits the
// contact form. Styled to match the website: dark surface, violet accents,
// soft purple glow, Inter type, rounded corners.

export type ContactEmailData = {
  name: string;
  email: string;
  phone?: string;
  msg: string;
  projekttyp: string;
  paketLabel?: string;
  wartungLabel?: string;
  contentPaketLabel?: string;
  auftraggeberLabel?: string;
  /** Public site URL — used for the logo image and footer link. */
  baseUrl?: string;
};

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactEmail(data: ContactEmailData): string {
  const {
    name,
    email,
    phone,
    msg,
    projekttyp,
    paketLabel,
    wartungLabel,
    contentPaketLabel,
    auftraggeberLabel,
    baseUrl = "https://portfolio-ivan-2026.vercel.app",
  } = data;

  const firstName = name.trim().split(" ")[0] || name;
  const logoUrl = `${baseUrl}/logo-web.webp`;

  // A single label/value row inside the dark summary card.
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 11px 0; color: #8a8a95; font-size: 13px; width: 116px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">${label}</td>
      <td style="padding: 11px 0; color: #f4f4f6; font-size: 14px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Neue Anfrage</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07070a; -webkit-font-smoothing: antialiased;">
  <!-- preheader (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: #07070a;">
    Neue Anfrage von ${escapeHtml(name)} · ${escapeHtml(projekttyp)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #07070a; background-image: radial-gradient(600px 320px at 85% -8%, rgba(139,92,246,0.18), transparent 62%), radial-gradient(520px 360px at 0% 18%, rgba(99,102,241,0.10), transparent 60%); border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; border-collapse: collapse;">

          <!-- Brand header — full logo graphic (already contains the wordmark) -->
          <tr>
            <td align="center" style="padding: 0 4px 18px;">
              <img src="${logoUrl}" width="190" alt="Webdesign by Ivan" style="display: block; width: 190px; max-width: 58%; height: auto; border: 0;" />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color: #11111a; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden;">
              <!-- accent top bar -->
              <div style="height: 3px; background-color: #8257e6; background-image: linear-gradient(90deg, #8257e6 0%, #a78bfa 50%, #6366f1 100%);">&nbsp;</div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 30px 32px 32px;">
                    <!-- eyebrow -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 14px;">
                      <tr>
                        <td style="vertical-align: middle;">
                          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background-color: #a78bfa;">&nbsp;</span>
                        </td>
                        <td style="vertical-align: middle; padding-left: 8px;">
                          <span style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #c4b5fd; font-weight: 600;">Neue Anfrage</span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin: 0 0 4px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 24px; line-height: 1.2; font-weight: 600; color: #f4f4f6; letter-spacing: -0.02em;">
                      ${escapeHtml(name)}
                    </h1>
                    <p style="margin: 0 0 24px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; color: #b8b8c4;">
                      möchte ein Projekt mit dir starten.
                    </p>

                    <!-- details -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                      ${row("E-Mail", `<a href="mailto:${escapeHtml(email)}" style="color: #a78bfa; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a>`)}
                      ${
                        phone
                          ? row(
                              "Telefon",
                              `<a href="tel:${escapeHtml(phone)}" style="color: #a78bfa; text-decoration: none; font-weight: 500;">${escapeHtml(phone)}</a><br/><span style="color: #8a8a95; font-size: 12px;">möchte angerufen werden</span>`,
                            )
                          : ""
                      }
                      ${auftraggeberLabel ? row("Auftraggeber", escapeHtml(auftraggeberLabel)) : ""}
                      ${row("Projekttyp", escapeHtml(projekttyp))}
                      ${paketLabel ? row("Paket", `<span style="font-weight: 600; color: #f4f4f6;">${escapeHtml(paketLabel)}</span>`) : ""}
                      ${wartungLabel ? row("Wartung & Pflege", `<span style="font-weight: 600; color: #f4f4f6;">${escapeHtml(wartungLabel)}</span>`) : ""}
                      ${contentPaketLabel ? row("Content-Pflege", `<span style="font-weight: 600; color: #f4f4f6;">${escapeHtml(contentPaketLabel)}</span>`) : ""}
                    </table>

                    <!-- message -->
                    <p style="margin: 26px 0 10px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a8a95; font-weight: 600;">Nachricht</p>
                    <div style="background-color: #16161f; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 20px; white-space: pre-wrap; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; line-height: 1.6; color: #e9e9ee;">${escapeHtml(msg)}</div>

                    <!-- reply CTA -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 26px;">
                      <tr>
                        <td style="background-color: #8257e6; background-image: linear-gradient(90deg, #8257e6 0%, #6366f1 100%); border-radius: 12px;">
                          <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Antwort auf deine Anfrage")}" style="display: inline-block; padding: 13px 26px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 12px;">
                            ${escapeHtml(firstName)} antworten →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding: 22px 8px 0; text-align: center;">
              <p style="margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; line-height: 1.6; color: #6f6f7a;">
                Gesendet über das Kontaktformular auf
                <a href="${baseUrl}" style="color: #8a8a95; text-decoration: none;">ivan.dev</a><br/>
                Eine Antwort an diese Mail geht direkt an ${escapeHtml(firstName)}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

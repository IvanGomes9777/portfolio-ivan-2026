import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/csrf";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT = "ivanvilargomes@gmail.com";

const WUNSCH_LABEL: Record<string, string> = {
  neu: "Komplett neue Website (noch keine vorhanden)",
  relaunch: "Relaunch / Neugestaltung einer bestehenden Website",
};

const SUBJECT_TAG: Record<string, string> = {
  neu: "Neue Website",
  relaunch: "Relaunch",
};

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Generic JSON error — never leaks internal details to the client.
function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(req: Request) {
  // 1. CSRF: only accept submissions that originate from our own site.
  if (!isSameOrigin(req)) {
    return fail("Anfrage abgelehnt.", 403);
  }

  // 2. Rate limit: max 5 requests per IP per minute.
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) {
    const retryAfter = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return NextResponse.json(
      { success: false, message: "Zu viele Anfragen. Bitte versuche es gleich erneut." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  // 3. Parse body.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return fail("Ungültige Anfrage.", 400);
  }
  const body = (raw ?? {}) as Record<string, unknown>;

  // 4. Honeypot: hidden field no human fills — silently accept (don't tip off bots).
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  // 5. Validate + sanitize.
  const result = validateContact(body);
  if (!result.ok) {
    return fail(result.message, 400);
  }
  const { name, email, phone, msg, wunsch } = result.data;

  // 6. Secrets only from env — never hardcoded.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Log the real cause server-side; return a generic message to the client.
    console.error("[contact] RESEND_API_KEY is not configured");
    return fail("E-Mail-Versand ist derzeit nicht möglich.", 503);
  }

  const fromAddress =
    process.env.RESEND_FROM ?? "Portfolio-Kontakt <onboarding@resend.dev>";
  const projekttyp = WUNSCH_LABEL[wunsch] ?? "Nicht angegeben";
  const tag = SUBJECT_TAG[wunsch] ? ` — ${SUBJECT_TAG[wunsch]}` : "";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.55; color: #1a1a1a; max-width: 580px; margin: 0 auto; padding: 32px 24px; background: #fafafa;">
      <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 16px; padding: 32px;">
        <p style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #8b5cf6; margin: 0 0 4px;">Neue Anfrage</p>
        <h1 style="font-size: 22px; margin: 0 0 24px; color: #111;">Portfolio-Kontakt</h1>

        <table style="width: 100%; font-size: 14px; border-spacing: 0;">
          <tr>
            <td style="padding: 8px 0; color: #6b6b6b; width: 110px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; color: #111; font-weight: 500;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b6b6b; vertical-align: top;">E-Mail</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #8b5cf6; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          ${
            phone
              ? `<tr>
            <td style="padding: 8px 0; color: #6b6b6b; vertical-align: top;">Telefon</td>
            <td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">${escapeHtml(phone)}</a> <span style="color:#6b6b6b; font-size:12px;">· möchte angerufen werden</span></td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px 0; color: #6b6b6b; vertical-align: top;">Projekttyp</td>
            <td style="padding: 8px 0; color: #111;">${escapeHtml(projekttyp)}</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #e5e5e5; margin: 24px 0;"></div>

        <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #6b6b6b; margin: 0 0 10px;">Nachricht</p>
        <div style="white-space: pre-wrap; font-size: 14px; color: #1a1a1a;">${escapeHtml(msg)}</div>
      </div>

      <p style="font-size: 11px; color: #999; text-align: center; margin: 16px 0 0;">
        Gesendet via Portfolio-Kontaktformular · Antwort geht direkt an ${escapeHtml(email)}
      </p>
    </div>
  `;

  const text = `Neue Anfrage über das Portfolio\n\nName: ${name}\nE-Mail: ${email}${phone ? `\nTelefon: ${phone} (möchte angerufen werden)` : ""}\nProjekttyp: ${projekttyp}\n\n---\n\n${msg}\n`;

  try {
    const resend = new Resend(apiKey);
    const sendResult = await resend.emails.send({
      from: fromAddress,
      to: [RECIPIENT],
      replyTo: email,
      subject: `Anfrage: Kostenloses Erstgespräch${tag}${phone ? " · Rückruf" : ""}`,
      html,
      text,
    });

    if (sendResult.error) {
      // Provider error details stay on the server.
      console.error("[contact] Resend error:", sendResult.error);
      return fail("Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen.", 502);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[contact] Unexpected send failure:", e);
    return fail("Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen.", 502);
  }
}

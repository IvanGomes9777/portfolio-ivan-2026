import { NextResponse } from "next/server";
import { Resend } from "resend";

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

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    msg?: string;
    wunsch?: string;
    // Honeypot: bots happily fill any visible-looking field; humans never touch it.
    company?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  // Honeypot
  if (body.company && body.company.length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const msg = (body.msg ?? "").trim();
  const wunsch = (body.wunsch ?? "").trim();

  if (!name || !email || !msg) {
    return NextResponse.json(
      { success: false, message: "Bitte fülle Name, E-Mail und Nachricht aus." },
      { status: 400 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Bitte eine gültige E-Mail-Adresse angeben." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        message:
          "E-Mail-Versand nicht konfiguriert (RESEND_API_KEY fehlt in .env.local).",
      },
      { status: 500 },
    );
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

  const text = `Neue Anfrage über das Portfolio\n\nName: ${name}\nE-Mail: ${email}\nProjekttyp: ${projekttyp}\n\n---\n\n${msg}\n`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromAddress,
      to: [RECIPIENT],
      replyTo: email,
      subject: `Anfrage: Kostenloses Erstgespräch${tag}`,
      html,
      text,
    });

    if (result.error) {
      return NextResponse.json(
        { success: false, message: result.error.message },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : "Versand fehlgeschlagen." },
      { status: 502 },
    );
  }
}

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/csrf";
import { validateContact } from "@/lib/validation";
import { renderContactEmail } from "@/lib/contact-email";

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

const PAKET_LABEL: Record<string, string> = {
  visitenkarte: "Visitenkarte (ab €500)",
  starter: "Starter (ab €1.500)",
  standard: "Standard (ab €2.500)",
  premium: "Premium (ab €4.500)",
};

const WARTUNG_LABEL: Record<string, string> = {
  standard: "Standard (150 €/Monat)",
  premium: "Premium (250 €/Monat)",
};

const CONTENT_PAKET_LABEL: Record<string, string> = {
  monatlich: "Monatlich kündbar (75 €/Monat)",
  jahr1: "1 Jahr (55 €/Monat)",
  jahr2: "2 Jahre (45 €/Monat)",
};

const AUFTRAGGEBER_LABEL: Record<string, string> = {
  unternehmen: "Unternehmen / Gewerbe (Unternehmer, § 14 BGB)",
  privat: "Privatperson (Verbraucher, § 13 BGB)",
};

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
  const { name, email, phone, msg, wunsch, paket, wartung, contentPaket, auftraggeber } = result.data;

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
  const paketLabel = PAKET_LABEL[paket] ?? "";
  const wartungLabel = WARTUNG_LABEL[wartung] ?? "";
  const contentPaketLabel = CONTENT_PAKET_LABEL[contentPaket] ?? "";
  const auftraggeberLabel = AUFTRAGGEBER_LABEL[auftraggeber] ?? "";
  const tag = SUBJECT_TAG[wunsch] ? ` — ${SUBJECT_TAG[wunsch]}` : "";

  const html = renderContactEmail({
    name,
    email,
    phone,
    msg,
    projekttyp,
    paketLabel,
    wartungLabel,
    contentPaketLabel,
    auftraggeberLabel,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const text = `Neue Anfrage über das Portfolio\n\nName: ${name}\nE-Mail: ${email}${phone ? `\nTelefon: ${phone} (möchte angerufen werden)` : ""}${auftraggeberLabel ? `\nAuftraggeber: ${auftraggeberLabel}` : ""}\nProjekttyp: ${projekttyp}${paketLabel ? `\nPaket: ${paketLabel}` : ""}${wartungLabel ? `\nWartung & Pflege: ${wartungLabel}` : ""}${contentPaketLabel ? `\nContent-Pflege: ${contentPaketLabel}` : ""}\n\n---\n\n${msg}\n`;

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

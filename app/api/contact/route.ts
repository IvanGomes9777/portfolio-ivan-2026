import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/csrf";
import { validateContact } from "@/lib/validation";
import { renderContactEmail } from "@/lib/contact-email";
import {
  isTurnstileConfigured,
  verifyTurnstileToken,
} from "@/lib/verify-turnstile";

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

  // 4b. Cloudflare Turnstile: confirm human interaction server-side. Only
  // enforced once a secret key is configured, so the form keeps working in
  // environments where Turnstile isn't set up yet. A bot POSTing directly to
  // this route won't carry a valid token and is rejected here.
  if (isTurnstileConfigured()) {
    const token = body["cf-turnstile-response"];
    const verify = await verifyTurnstileToken(
      typeof token === "string" ? token : "",
      ip,
    );
    if (!verify.success) {
      return fail(
        "Sicherheitsprüfung fehlgeschlagen. Bitte lade die Seite neu.",
        400,
      );
    }
  }

  // 5. Validate + sanitize.
  const result = validateContact(body);
  if (!result.ok) {
    return fail(result.message, 400);
  }
  const { name, email, phone, msg, wunsch, auftraggeber } = result.data;

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
  const auftraggeberLabel = AUFTRAGGEBER_LABEL[auftraggeber] ?? "";
  const tag = SUBJECT_TAG[wunsch] ? ` — ${SUBJECT_TAG[wunsch]}` : "";

  const html = renderContactEmail({
    name,
    email,
    phone,
    msg,
    projekttyp,
    auftraggeberLabel,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const text = `Neue Anfrage über das Portfolio\n\nName: ${name}\nE-Mail: ${email}${phone ? `\nTelefon: ${phone} (möchte angerufen werden)` : ""}${auftraggeberLabel ? `\nAuftraggeber: ${auftraggeberLabel}` : ""}\nProjekttyp: ${projekttyp}\n\n---\n\n${msg}\n`;

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

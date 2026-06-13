// Input validation & sanitization for the contact form.
//
// Server-side is the source of truth: every field is length-capped, stripped of
// control characters, and format-checked here regardless of what the client
// sends. Email/phone are additionally checked for newline characters to prevent
// header-injection into the outgoing mail.

export const LIMITS = {
  name: 80,
  email: 254, // RFC 5321 max
  phone: 40,
  msg: 4000,
  wunsch: 20,
  paket: 20,
  wartung: 20,
  contentPaket: 20,
  auftraggeber: 20,
} as const;

// Strip ASCII control chars except tab (\x09), newline (\x0A) and carriage
// return (\x0D), plus the Unicode line/paragraph separators (U+2028 / U+2029)
// that can be abused for spoofing or mail-header injection. Newlines survive
// here so multi-line messages are preserved; email/phone are separately
// rejected if they contain newlines.
function stripControlChars(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u2028\u2029]/g, "");
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return stripControlChars(value).trim().slice(0, max);
}

// Pragmatic, anchored email check. Not a full RFC parser, but rejects the
// shapes that matter (missing @, spaces, missing TLD).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  msg?: unknown;
  wunsch?: unknown;
  paket?: unknown;
  wartung?: unknown;
  contentPaket?: unknown;
  auftraggeber?: unknown;
  company?: unknown; // honeypot
};

export type ContactClean = {
  name: string;
  email: string;
  phone: string;
  msg: string;
  wunsch: string;
  paket: string;
  wartung: string;
  contentPaket: string;
  auftraggeber: string;
};

export type ValidationResult =
  | { ok: true; data: ContactClean }
  | { ok: false; message: string };

const ALLOWED_WUNSCH = new Set(["", "neu", "relaunch"]);
const ALLOWED_PAKET = new Set(["", "starter", "standard", "premium"]);
const ALLOWED_WARTUNG = new Set(["", "standard", "premium"]);
const ALLOWED_CONTENT_PAKET = new Set(["", "monatlich", "jahr1", "jahr2"]);
const ALLOWED_AUFTRAGGEBER = new Set(["", "unternehmen", "privat"]);

export function validateContact(input: ContactInput): ValidationResult {
  const name = clean(input.name, LIMITS.name);
  const email = clean(input.email, LIMITS.email);
  const phone = clean(input.phone, LIMITS.phone);
  const msg = clean(input.msg, LIMITS.msg);
  let wunsch = clean(input.wunsch, LIMITS.wunsch);
  let paket = clean(input.paket, LIMITS.paket);
  let wartung = clean(input.wartung, LIMITS.wartung);
  let contentPaket = clean(input.contentPaket, LIMITS.contentPaket);
  let auftraggeber = clean(input.auftraggeber, LIMITS.auftraggeber);

  if (!name || !email || !msg) {
    return { ok: false, message: "Bitte fülle Name, E-Mail und Nachricht aus." };
  }
  if (name.length < 2) {
    return { ok: false, message: "Bitte gib einen gültigen Namen an." };
  }
  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email)) {
    return { ok: false, message: "Bitte eine gültige E-Mail-Adresse angeben." };
  }
  if (phone && /[\r\n]/.test(phone)) {
    return { ok: false, message: "Bitte eine gültige Telefonnummer angeben." };
  }
  if (msg.length < 5) {
    return { ok: false, message: "Bitte schreibe eine etwas längere Nachricht." };
  }
  if (!ALLOWED_WUNSCH.has(wunsch)) {
    wunsch = ""; // ignore unexpected values rather than reflecting them
  }
  if (!ALLOWED_PAKET.has(paket)) {
    paket = ""; // ignore unexpected values rather than reflecting them
  }
  if (!ALLOWED_WARTUNG.has(wartung)) {
    wartung = ""; // ignore unexpected values rather than reflecting them
  }
  if (!ALLOWED_CONTENT_PAKET.has(contentPaket)) {
    contentPaket = ""; // ignore unexpected values rather than reflecting them
  }
  if (!ALLOWED_AUFTRAGGEBER.has(auftraggeber)) {
    auftraggeber = ""; // ignore unexpected values rather than reflecting them
  }

  return { ok: true, data: { name, email, phone, msg, wunsch, paket, wartung, contentPaket, auftraggeber } };
}

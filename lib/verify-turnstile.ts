// Server-side Cloudflare Turnstile verification, called from the contact API
// route BEFORE anything is sent. Turnstile is treated as an opt-in layer:
// it only kicks in once TURNSTILE_SECRET_KEY is configured, so the contact
// form keeps working on environments where the key isn't set yet.
//
// Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** True when a secret key is configured — i.e. Turnstile should be enforced. */
export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Fail-closed: a caller that reached here without a secret is misconfigured.
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not configured");
    return { success: false, error: "server_misconfigured" };
  }
  if (!token) {
    return { success: false, error: "missing_token" };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (remoteIp) formData.append("remoteip", remoteIp);

  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body: formData });
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      return {
        success: false,
        error: data["error-codes"]?.join(", ") || "verification_failed",
      };
    }
    return { success: true };
  } catch (err) {
    // Network/provider details stay on the server.
    console.error("[turnstile] siteverify request failed:", err);
    return { success: false, error: "network_error" };
  }
}

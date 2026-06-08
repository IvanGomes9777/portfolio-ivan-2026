import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const ALLOWED_HOSTS = new Set([
  "akeed-friseur.vercel.app",
  "friseur-mauro-ricardo-2.vercel.app",
  "side-haarstudio-m-nster.vercel.app",
  "emika-hundesalon.vercel.app",
]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isProxyableHost(host: string) {
  return ALLOWED_HOSTS.has(host);
}

function wrap(absUrl: string) {
  return `/api/proxy?url=${encodeURIComponent(absUrl)}`;
}

function maybeRewrite(rawUrl: string, base: string, allowedHost: string): string {
  if (!rawUrl) return rawUrl;
  // Decode percent-encoding to check actual content (e.g. %23n = #n SVG fragment refs
  // hidden inside data: URLs or url-encoded contexts).
  let decoded = rawUrl;
  try {
    decoded = decodeURIComponent(rawUrl);
  } catch {
    // malformed encoding — leave as-is
  }
  if (
    decoded.startsWith("data:") ||
    decoded.startsWith("javascript:") ||
    decoded.startsWith("mailto:") ||
    decoded.startsWith("tel:") ||
    decoded.startsWith("blob:") ||
    decoded.startsWith("#") ||
    rawUrl.startsWith("data:") ||
    rawUrl.startsWith("#") ||
    rawUrl.startsWith("%23")
  ) {
    return rawUrl;
  }
  try {
    const abs = new URL(rawUrl, base);
    if (abs.host === allowedHost) return wrap(abs.toString());
    return rawUrl;
  } catch {
    return rawUrl;
  }
}

const INJECTED_FIT_CSS = `
<style id="__portfolio_proxy_fit">
  html, body {
    overflow-x: hidden !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    max-width: 100vw !important;
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  *::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
  }
  body { max-width: 100vw !important; }
</style>
`;

function rewriteHtml(html: string, baseHref: string, allowedHost: string): string {
  // Strip CSP meta tags
  html = html.replace(
    /<meta[^>]+http-equiv=["']?content-security-policy["']?[^>]*>/gi,
    "",
  );

  // Inject fit-to-iframe CSS at end of head (last-loaded wins specificity ties).
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${INJECTED_FIT_CSS}</head>`);
  } else {
    html = INJECTED_FIT_CSS + html;
  }

  // Rewrite src/href/action/formaction/poster
  const attrPattern =
    /(\s(?:src|href|action|formaction|poster|background)=)["']([^"']+)["']/gi;
  html = html.replace(attrPattern, (_m, pre, url) => {
    const next = maybeRewrite(url, baseHref, allowedHost);
    return `${pre}"${next}"`;
  });

  // srcset (multiple URLs comma-separated)
  html = html.replace(/(\ssrcset=)["']([^"']+)["']/gi, (_m, pre, srcset) => {
    const rewritten = srcset
      .split(",")
      .map((entry: string) => {
        const trimmed = entry.trim();
        const parts = trimmed.split(/\s+/);
        parts[0] = maybeRewrite(parts[0], baseHref, allowedHost);
        return parts.join(" ");
      })
      .join(", ");
    return `${pre}"${rewritten}"`;
  });

  // Inline CSS url(...) inside style="..." or <style> blocks
  const rewriteCss = (css: string) =>
    css.replace(/url\(\s*(['"]?)([^)"']+)\1\s*\)/gi, (_m, q, url) => {
      const next = maybeRewrite(url, baseHref, allowedHost);
      return `url(${q}${next}${q})`;
    });
  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_m, inner) => {
    return _m.replace(inner, rewriteCss(inner));
  });
  html = html.replace(/(\sstyle=)["']([^"']+)["']/gi, (_m, pre, css) => {
    return `${pre}"${rewriteCss(css)}"`;
  });

  return html;
}

function rewriteCssText(css: string, baseHref: string, allowedHost: string): string {
  return css
    .replace(/url\(\s*(['"]?)([^)"']+)\1\s*\)/gi, (_m, q, url) => {
      const next = maybeRewrite(url, baseHref, allowedHost);
      return `url(${q}${next}${q})`;
    })
    .replace(/@import\s+(['"])([^'"]+)\1/gi, (_m, q, url) => {
      const next = maybeRewrite(url, baseHref, allowedHost);
      return `@import ${q}${next}${q}`;
    });
}

export async function GET(req: NextRequest) {
  // Rate limit: this endpoint fans out to many sub-resources per preview, so it
  // uses a higher ceiling than the contact form (which is 5/min). This still
  // caps abuse / bandwidth amplification per IP.
  const ip = getClientIp(req);
  const limit = rateLimit(`proxy:${ip}`, 120, 60_000);
  if (!limit.success) {
    const retryAfter = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return new NextResponse("Too many requests", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  const urlParam = req.nextUrl.searchParams.get("url");
  if (!urlParam) return new NextResponse("Missing 'url' parameter", { status: 400 });

  let target: URL;
  try {
    target = new URL(urlParam);
  } catch {
    return new NextResponse("Invalid 'url'", { status: 400 });
  }

  if (!isProxyableHost(target.host)) {
    return new NextResponse(`Host '${target.host}' not allowed`, { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent":
          req.headers.get("user-agent") ??
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          req.headers.get("accept") ??
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": req.headers.get("accept-language") ?? "de,en;q=0.9",
      },
      redirect: "follow",
      cache: "no-store",
    });
  } catch (e) {
    // Keep upstream/network error details on the server only.
    console.error("[proxy] upstream fetch failed:", e);
    return new NextResponse("Upstream request failed", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "";

  const outHeaders = new Headers();
  for (const [k, v] of upstream.headers.entries()) {
    const lower = k.toLowerCase();
    if (
      lower === "x-frame-options" ||
      lower === "content-security-policy" ||
      lower === "content-security-policy-report-only" ||
      lower === "content-encoding" ||
      lower === "content-length" ||
      lower === "transfer-encoding" ||
      lower === "connection"
    ) {
      continue;
    }
    outHeaders.set(k, v);
  }
  // Force same-origin CORS so module-script imports work
  outHeaders.set("access-control-allow-origin", "*");
  outHeaders.set("cross-origin-resource-policy", "cross-origin");

  const baseHref = target.toString();

  if (contentType.includes("text/html")) {
    let html = await upstream.text();
    html = rewriteHtml(html, baseHref, target.host);
    outHeaders.set("content-type", "text/html; charset=utf-8");
    outHeaders.set("cache-control", "public, max-age=300, s-maxage=300");
    return new NextResponse(html, { status: upstream.status, headers: outHeaders });
  }

  if (contentType.includes("text/css")) {
    let css = await upstream.text();
    css = rewriteCssText(css, baseHref, target.host);
    outHeaders.set("content-type", "text/css; charset=utf-8");
    outHeaders.set("cache-control", "public, max-age=86400, s-maxage=86400, immutable");
    return new NextResponse(css, { status: upstream.status, headers: outHeaders });
  }

  // For everything else (JS, fonts, images, JSON), pass through.
  // For static assets, allow longer caching.
  if (
    contentType.includes("javascript") ||
    contentType.includes("font") ||
    contentType.includes("image") ||
    contentType.includes("woff")
  ) {
    outHeaders.set("cache-control", "public, max-age=86400, s-maxage=86400, immutable");
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: outHeaders,
  });
}

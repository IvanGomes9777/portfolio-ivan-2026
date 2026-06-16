import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/screenshots");

// Laptop screen area aspect ratio ~ 1.78 (16:9). Capture hero at that ratio.
const VIEWPORT = { width: 1600, height: 900 };

const projects = [
  { slug: "join-crm", url: "https://ivan-gomes.developerakademie.net/join%20crm/" },
  { slug: "el-pollo-loco", url: "https://ivan-gomes.developerakademie.net/el-pollo-loco-PEPE.spiel/" },
  { slug: "pokedex", url: "https://ivan-gomes.developerakademie.net/pokedex-richtig/" },
  { slug: "gebaeudereinigung", url: "https://geb-udereinigung-beispiel.vercel.app/" },
  { slug: "friseur-2", url: "https://friseur-beispiel-2r.vercel.app/" },
  { slug: "hundesalon", url: "https://hundesalon-vorlage.vercel.app/" },
  { slug: "friseur-3", url: "https://friseur-beispiel-3.vercel.app/" },
  { slug: "friseur-4", url: "https://friseur-beispiel-4.vercel.app/" },
  { slug: "friseur-1", url: "https://friseur-beispiel-1.vercel.app/" },
  { slug: "5050ink", url: "https://5050ink-web.vercel.app/" },
  { slug: "autoaufbereitung", url: "https://autoaufbereitung-1.vercel.app/" },
  { slug: "werbetechnik-1", url: "https://werbetechnik-1.vercel.app/" },
  { slug: "tattoo-vorlage-2", url: "https://tattoo-vorlage-2.vercel.app/" },
  { slug: "restaurant-vorlage-1", url: "https://restaurant-vorlage-1.vercel.app/" },
  { slug: "anwaltskanzlei-vorlage-1", url: "https://anwaltskanzlei-vorlage-1.vercel.app/de" },
  { slug: "traditional-tattoo-1", url: "https://traditionall-tatoo-1.vercel.app/" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Common German cookie-consent button labels (accept / dismiss)
const CONSENT_LABELS = [
  "Alle akzeptieren",
  "Akzeptieren",
  "Alle Cookies akzeptieren",
  "Verstanden",
  "Nur essenzielle",
  "Nur notwendige",
  "Nur notwendige Cookies",
  "Einverstanden",
  "Zustimmen",
  "Schließen",
];

async function dismissConsent(page) {
  // Click directly in the DOM so overlay/pointer interception can't block us.
  const clicked = await page.evaluate((labels) => {
    const norm = (s) => (s || "").trim().replace(/\s+/g, " ").toLowerCase();
    const wanted = labels.map(norm);
    const nodes = [...document.querySelectorAll("button, a, [role=button], input[type=button], input[type=submit]")];
    const hits = [];
    for (const el of nodes) {
      const txt = norm(el.textContent || el.value);
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (wanted.some((w) => txt === w || txt.startsWith(w))) {
        el.click();
        hits.push(txt);
      }
    }
    return hits;
  }, CONSENT_LABELS);
  return clicked.length ? clicked.join(", ") : null;
}

// Optional: pass slugs as CLI args to re-capture only those
const only = process.argv.slice(2);
const targets = only.length ? projects.filter((p) => only.includes(p.slug)) : projects;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  ignoreHTTPSErrors: true,
});

for (const p of targets) {
  const page = await ctx.newPage();
  try {
    console.log(`→ ${p.slug}  ${p.url}`);
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 45000 }).catch(async (e) => {
      console.log(`   networkidle timeout, fallback to load: ${e.message.split("\n")[0]}`);
      await page.goto(p.url, { waitUntil: "load", timeout: 45000 });
    });
    // let fonts/animations settle
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    await sleep(1500);
    let dismissed = await dismissConsent(page);
    await sleep(700);
    const second = await dismissConsent(page); // catch a second/nested banner
    dismissed = [dismissed, second].filter(Boolean).join(" + ");
    if (dismissed) console.log(`   ↳ dismissed consent via "${dismissed}"`);
    await sleep(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    const out = path.join(OUT, `${p.slug}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, ...VIEWPORT } });
    console.log(`   ✓ saved ${out}`);
  } catch (e) {
    console.log(`   ✗ FAILED ${p.slug}: ${e.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("done");

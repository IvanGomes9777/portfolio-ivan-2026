import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6 relative z-10 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto pt-8 border-t border-[var(--color-line)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-dim)]">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>© {new Date().getFullYear()} Ivan. Webdesign & Entwicklung.</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/projekte" className="hover:text-[var(--color-ink-soft)] transition">Projekte</Link>
            <Link href="/preise" className="hover:text-[var(--color-ink-soft)] transition">Preise</Link>
            <a href="#kontakt" className="hover:text-[var(--color-ink-soft)] transition">Kontakt</a>
            <span className="opacity-40">·</span>
            <Link href="/impressum" className="hover:text-[var(--color-ink-soft)] transition">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[var(--color-ink-soft)] transition">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-[var(--color-ink-soft)] transition">
              AGB
            </Link>
            <CookieSettingsButton className="hover:text-[var(--color-ink-soft)] transition" />
          </nav>
        </div>
      </div>
    </footer>
  );
}

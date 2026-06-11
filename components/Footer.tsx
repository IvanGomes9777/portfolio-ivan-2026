import Link from "next/link";

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
            <a href="#prozess" className="hover:text-[var(--color-ink-soft)] transition">Prozess</a>
            <a href="#demos" className="hover:text-[var(--color-ink-soft)] transition inline-flex items-center gap-1">
              Demos
              <span className="size-1 rounded-full bg-amber-400" />
            </a>
            <a href="#projekte" className="hover:text-[var(--color-ink-soft)] transition">Projekte</a>
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
          </nav>
        </div>
      </div>
    </footer>
  );
}

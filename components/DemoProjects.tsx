"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ArrowUpRight,
  ExternalLink,
  SprayCan,
  Scissors,
  Dog,
  Sparkles,
  PenTool,
  Tag,
} from "lucide-react";
import LaptopMockup from "./LaptopMockup";
import PhoneMockup from "./PhoneMockup";
import FloatingPlanes from "./backgrounds/FloatingPlanes";

type DemoProject = {
  name: string;
  branche: string;
  status: string;
  url: string;
  accent: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const demoProjects: DemoProject[] = [
  {
    name: "Gebäudereinigung Beispiel",
    branche: "Gebäudereinigung",
    status: "Verfügbar",
    url: "https://geb-udereinigung-beispiel.vercel.app/",
    accent: "from-sky-500/30 via-blue-500/20 to-indigo-500/10",
    Icon: SprayCan,
  },
  {
    name: "Friseur Vorlage",
    branche: "Friseursalon",
    status: "Noch frei",
    url: "https://friseur-beispiel-2r.vercel.app/",
    accent: "from-amber-500/30 via-orange-500/20 to-rose-500/10",
    Icon: Scissors,
  },
  {
    name: "Hundesalon Vorlage",
    branche: "Hundesalon",
    status: "Noch frei",
    url: "https://hundesalon-vorlage.vercel.app/",
    accent: "from-rose-500/30 via-pink-500/20 to-fuchsia-500/10",
    Icon: Dog,
  },
  {
    name: "Friseur Vorlage",
    branche: "Haarstudio",
    status: "Noch frei",
    url: "https://friseur-beispiel-3.vercel.app/",
    accent: "from-emerald-500/30 via-teal-500/20 to-cyan-500/10",
    Icon: Sparkles,
  },
  {
    name: "Mauro Ricardo",
    branche: "Friseur",
    status: "Noch frei",
    url: "https://friseur-mauro-ricardo-2.vercel.app/",
    accent: "from-violet-500/30 via-indigo-500/20 to-blue-500/10",
    Icon: Scissors,
  },
  {
    name: "Friseur Vorlage",
    branche: "Friseursalon",
    status: "Noch frei",
    url: "https://friseur-beispiel-1.vercel.app/",
    accent: "from-fuchsia-500/30 via-purple-500/20 to-violet-500/10",
    Icon: Scissors,
  },
  {
    name: "nadelwerk",
    branche: "Tattoo-Studio",
    status: "Noch frei",
    url: "https://5050ink-web.vercel.app/",
    accent: "from-zinc-500/30 via-slate-500/20 to-neutral-500/10",
    Icon: PenTool,
  },
];

type View = "laptop" | "phone";

export default function DemoProjects() {
  const [view, setView] = useState<View>("laptop");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const effectiveView: View = isMobile ? "laptop" : view;

  return (
    <>
      <FloatingPlanes />
      <section className="px-4 py-6 md:py-4 max-w-6xl w-full mx-auto">
        {/* heading + toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/[0.06] backdrop-blur text-xs text-amber-200/90 mb-2">
              <Tag className="size-3" />
              <span>Demo Projekte · sofort kaufbar</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] font-medium leading-[1.05]">
              Fertig gebaut.{" "}
              <span className="italic text-[var(--color-ink-soft)]">
                Bereit für deine Marke.
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Diese Websites sind komplett entwickelt — modernes Design,
              Animationen, mobil optimiert. Noch nicht reserviert — wer zuerst
              zusagt, bekommt sie. Ich tausche Logo, Texte und Bilder gegen
              deine eigenen, und in wenigen Tagen ist deine Seite live.
              Schneller und günstiger als ein Projekt von Grund auf.
            </p>
          </div>

          {!isMobile && <ViewToggle view={view} onChange={setView} />}
        </motion.div>

        {/* grid */}
        <div
          className={`grid ${
            effectiveView === "phone"
              ? "grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          } gap-2 sm:gap-4 md:gap-5`}
        >
          {demoProjects.map((p, i) => (
            <motion.div
              key={p.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.08 + i * 0.1,
              }}
              className="group relative flex flex-col"
            >
              <div className="relative">
                {effectiveView === "laptop" ? (
                  <LaptopMockup>
                    <ProjectFrame project={p} view="laptop" />
                  </LaptopMockup>
                ) : (
                  <PhoneMockup className="max-w-full">
                    <ProjectFrame project={p} view="phone" />
                  </PhoneMockup>
                )}
                <div className="absolute inset-x-2 -bottom-2 h-8 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* meta */}
              <div className="mt-3 px-0.5 flex flex-col gap-1">
                <div className="font-display text-[13px] leading-tight tracking-tight font-medium text-[var(--color-ink)] truncate">
                  {p.name}
                </div>
                <div className="text-[10px] leading-tight text-[var(--color-ink-dim)] flex items-center gap-1.5">
                  <span className="truncate">{p.branche}</span>
                  <span className="size-[3px] shrink-0 rounded-full bg-[var(--color-ink-dim)]" />
                  <span className="shrink-0 text-amber-300/90">{p.status}</span>
                </div>
                <div className="text-[11px] leading-tight text-[var(--color-ink-soft)]">
                  ab{" "}
                  <span className="font-semibold text-[var(--color-accent)]">
                    €3.000
                  </span>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mt-0.5 inline-flex items-center gap-1 text-[10px] leading-tight text-[var(--color-ink-soft)] hover:text-amber-300 transition-colors w-fit"
                >
                  Demo öffnen <ArrowUpRight className="size-2.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectFrame({ project, view }: { project: DemoProject; view: View }) {
  const { Icon } = project;
  const isPhone = view === "phone";

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      aria-label={`${project.name} Demo öffnen`}
      className="group relative block w-full h-full overflow-hidden bg-zinc-950 cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(251,191,36,0.18),transparent_70%)]" />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* Demo badge top-left */}
      <div className={`absolute z-10 rounded-full bg-amber-400/90 backdrop-blur-md font-semibold text-zinc-950 tracking-wide uppercase border border-amber-300/50 ${
        isPhone
          ? "top-1 left-1 px-1 py-[1px] text-[7px] sm:text-[8px]"
          : "top-1.5 left-1.5 px-1.5 py-0.5 text-[8px]"
      }`}>
        Demo
      </div>

      <div className={`relative h-full w-full flex flex-col items-center justify-center text-center ${isPhone ? "px-1.5 gap-1.5 sm:gap-2 md:gap-2.5" : "px-3 gap-2.5"}`}>
        <div
          className={`rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
            isPhone ? "size-6 sm:size-8 md:size-10" : "size-9 sm:size-10"
          }`}
        >
          <Icon className={isPhone ? "size-2.5 sm:size-3.5 md:size-4 text-white/90" : "size-4 text-white/90"} />
        </div>
        <div
          className={`font-display leading-tight text-white/85 tracking-wide truncate max-w-[92%] ${
            isPhone ? "text-[8px] sm:text-[10px] md:text-xs" : "text-[11px] sm:text-xs"
          }`}
        >
          {project.name}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] text-white/90 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 pointer-events-none">
        <ExternalLink className="size-2.5" />
        <span>Demo öffnen</span>
      </div>
    </a>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <div className="inline-flex p-1 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur self-start md:self-auto">
      <ToggleBtn active={view === "laptop"} onClick={() => onChange("laptop")}>
        <Monitor className="relative size-3.5" />
        <span className="relative">Laptop</span>
      </ToggleBtn>
      <ToggleBtn active={view === "phone"} onClick={() => onChange("phone")}>
        <Smartphone className="relative size-3.5" />
        <span className="relative">Mobil</span>
      </ToggleBtn>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor-hover
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active
          ? "text-white"
          : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
      }`}
    >
      {active && (
        <motion.div
          layoutId="demo-view-pill"
          className="absolute inset-0 rounded-full bg-amber-400/90 shadow-[0_0_20px_rgba(251,191,36,0.45)]"
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
        />
      )}
      {children}
    </button>
  );
}

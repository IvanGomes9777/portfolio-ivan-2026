"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ArrowUpRight,
  ExternalLink,
  Users,
  Gamepad2,
  Search,
} from "lucide-react";
import LaptopMockup from "./LaptopMockup";
import PhoneMockup from "./PhoneMockup";
import FloatingPlanes from "./backgrounds/FloatingPlanes";

type Project = {
  name: string;
  branche: string;
  year: string;
  url: string;
  accent: string; // tailwind gradient classes
  Icon: React.ComponentType<{ className?: string }>;
};

const projects: Project[] = [
  {
    name: "Join CRM",
    branche: "Web-Anwendung",
    year: "2026",
    url: "https://ivan-gomes.developerakademie.net/join%20crm/",
    accent: "from-sky-500/30 via-cyan-500/20 to-blue-500/10",
    Icon: Users,
  },
  {
    name: "El Pollo Loco",
    branche: "Browser-Spiel",
    year: "2025",
    url: "https://ivan-gomes.developerakademie.net/el-pollo-loco-PEPE.spiel/",
    accent: "from-yellow-500/30 via-amber-500/20 to-orange-500/10",
    Icon: Gamepad2,
  },
  {
    name: "Pokédex",
    branche: "Web-App",
    year: "2025",
    url: "https://ivan-gomes.developerakademie.net/pokedex-richtig/",
    accent: "from-red-500/30 via-rose-500/20 to-pink-500/10",
    Icon: Search,
  },
];

type View = "laptop" | "phone";

export default function ProjectShowcase() {
  const [view, setView] = useState<View>("laptop");

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            <span>Live-Vorschau · direkt im Browser</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] font-medium leading-[1.05]">
            Echte Projekte.{" "}
            <span className="italic text-[var(--color-ink-soft)]">Live im Netz.</span>
          </h2>
        </div>

        <ViewToggle view={view} onChange={setView} />
      </motion.div>

      {/* 4-up grid — equal spacing on every breakpoint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.1 }}
            className="group relative flex flex-col"
          >
            <div className="relative">
              {view === "laptop" ? (
                <LaptopMockup>
                  <ProjectFrame project={p} view="laptop" />
                </LaptopMockup>
              ) : (
                <PhoneMockup className="max-w-full">
                  <ProjectFrame project={p} view="phone" />
                </PhoneMockup>
              )}
              {/* subtle hover glow under each card */}
              <div className="absolute inset-x-2 -bottom-2 h-8 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* meta — uniform sizes + spacing on every card */}
            <div className="mt-3 px-0.5 flex flex-col gap-1">
              <div className="font-display text-[13px] leading-tight tracking-tight font-medium text-[var(--color-ink)] truncate">
                {p.name}
              </div>
              <div className="text-[10px] leading-tight text-[var(--color-ink-dim)] flex items-center gap-1.5">
                <span className="truncate">{p.branche}</span>
                <span className="size-[3px] shrink-0 rounded-full bg-[var(--color-ink-dim)]" />
                <span className="shrink-0">{p.year}</span>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mt-0.5 inline-flex items-center gap-1 text-[10px] leading-tight text-[var(--color-ink-soft)] hover:text-[var(--color-accent-soft)] transition-colors w-fit"
              >
                Live öffnen <ArrowUpRight className="size-2.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      </section>
    </>
  );
}

function ProjectFrame({ project }: { project: Project; view: View }) {
  const { Icon } = project;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      aria-label={`${project.name} live öffnen`}
      className="group relative block w-full h-full overflow-hidden bg-zinc-950 cursor-pointer"
    >
      {/* Project accent gradient backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(139,92,246,0.18),transparent_70%)]" />

      {/* Subtle dotted texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Faint scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* Centered content — icon + project name */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-3 text-center gap-2.5">
        <div className="size-9 sm:size-10 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <Icon className="size-4 text-white/90" />
        </div>
        <div className="font-display text-[11px] sm:text-xs leading-tight text-white/85 tracking-wide truncate max-w-[88%]">
          {project.name}
        </div>
      </div>

      {/* Hover veil + Live-öffnen badge */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] text-white/90 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 pointer-events-none">
        <ExternalLink className="size-2.5" />
        <span>Live öffnen</span>
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
        active ? "text-white" : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
      }`}
    >
      {active && (
        <motion.div
          layoutId="view-pill"
          className="absolute inset-0 rounded-full bg-[var(--color-accent-strong)] shadow-[0_0_20px_rgba(139,92,246,0.45)]"
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
        />
      )}
      {children}
    </button>
  );
}

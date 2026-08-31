"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  learning?: boolean;
}

interface Category {
  title: string;
  accent: "blue" | "purple";
  icon: React.ReactNode;
  skills: Skill[];
}

// ── Icons ─────────────────────────────────────────────────────────────────

function MonitorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function BrainCircuitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    accent: "blue",
    icon: <MonitorIcon />,
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript (ES6+)" },
      { name: "React.js", learning: true },
      { name: "Responsive Web Design" },
      { name: "DOM Manipulation" },
    ],
  },
  {
    title: "Backend",
    accent: "purple",
    icon: <ServerIcon />,
    skills: [
      { name: "Python" },
      { name: "FastAPI" },
      { name: "Node.js", learning: true },
      { name: "Express.js" },
      { name: "REST API" },
      { name: "Pydantic" },
      { name: "Middleware" },
      { name: "CORS" },
    ],
  },
  {
    title: "Database",
    accent: "blue",
    icon: <DatabaseIcon />,
    skills: [
      { name: "SQL" },
      { name: "SQLite" },
      { name: "Supabase" },
    ],
  },
  {
    title: "AI & Generative AI",
    accent: "purple",
    icon: <BrainCircuitIcon />,
    skills: [
      { name: "Groq API" },
      { name: "OpenAI API" },
      { name: "LLM Integration" },
      { name: "Prompt Engineering" },
      { name: "ElevenLabs TTS" },
      { name: "Generative AI" },
    ],
  },
  {
    title: "Tools & Deployment",
    accent: "blue",
    icon: <WrenchIcon />,
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Render" },
      { name: "GitHub Pages" },
    ],
  },
];

// ── Skill pill ────────────────────────────────────────────────────────────

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span
      className={`
        relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
        border transition-all duration-200 cursor-default select-none
        hover:-translate-y-0.5 hover:shadow-md
        ${skill.learning
          ? "border-purple-500/40 bg-purple-500/5 text-[var(--text-primary)] hover:border-purple-500/70 hover:shadow-purple-500/10"
          : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-blue-500/50 hover:text-[var(--text-primary)] hover:shadow-blue-500/10"
        }
      `}
    >
      {skill.name}
      {skill.learning && (
        <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded-md
                         text-[10px] font-semibold uppercase tracking-wide
                         bg-purple-500/15 text-purple-400 border border-purple-500/30">
          <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
          Learning
        </span>
      )}
    </span>
  );
}

// ── Category card ─────────────────────────────────────────────────────────

function CategoryCard({
  category,
  delay,
  inView,
}: {
  category: Category;
  delay: number;
  inView: boolean;
}) {
  const iconColor =
    category.accent === "blue"
      ? "text-[var(--accent-blue)] bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40"
      : "text-[var(--accent-purple)] bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/40";

  const titleColor =
    category.accent === "blue" ? "text-[var(--accent-blue)]" : "text-[var(--accent-purple)]";

  const topBorder =
    category.accent === "blue"
      ? "hover:border-blue-500/40 hover:shadow-blue-500/5"
      : "hover:border-purple-500/40 hover:shadow-purple-500/5";

  return (
    <div
      className={`
        card group transition-all duration-700 ease-out hover:shadow-lg ${topBorder}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                         border transition-colors duration-300 ${iconColor}`}>
          {category.icon}
        </div>
        <h3 className={`font-semibold text-sm ${titleColor}`}>{category.title}</h3>
        <span className="ml-auto text-xs text-[var(--text-muted)] font-mono">
          {category.skills.length} skills
        </span>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillPill key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// ── Intersection-observer hook ────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Main component ────────────────────────────────────────────────────────

export function Skills() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="section-padding">
      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`mb-10 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <p className="text-sm font-mono text-[var(--accent-purple)] mb-2 uppercase tracking-widest">
            02 / Skills
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Tech <span className="accent-gradient">Stack</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-[var(--text-secondary)] max-w-xl">
            Technologies and tools I work with. Items marked{" "}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-semibold
                             bg-purple-500/15 text-purple-400 border border-purple-500/30 mx-1">
              <span className="w-1 h-1 rounded-full bg-purple-400" aria-hidden="true" />
              Learning
            </span>
            are skills I&apos;m actively growing right now.
          </p>
        </div>

        {/* ── Category grid ── */}
        {/* First row: Frontend (larger) + Backend (larger) */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {CATEGORIES.slice(0, 2).map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} delay={100 + i * 80} inView={inView} />
          ))}
        </div>

        {/* Second row: Database + AI + Tools */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.slice(2).map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} delay={260 + i * 80} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}

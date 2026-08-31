"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
  tags: string[];
}

// ── Data ──────────────────────────────────────────────────────────────────

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Independent Full Stack Developer",
    org: "Personal Projects / Self-Directed Development",
    period: "2026 – Present",
    status: "Active",
    description:
      "Building and deploying full-stack web applications independently — from architecture and development through to production deployment. Each project serves as a focused exercise in real-world engineering skills.",
    highlights: [
      "Developed and deployed full-stack applications including TaskFlow (task management) and Nava AI Assistant",
      "Gained hands-on experience in frontend development with JavaScript, HTML5, and CSS3",
      "Built robust FastAPI backends with REST APIs, Pydantic validation, middleware, and CORS handling",
      "Implemented database integration using SQL, SQLite, and Supabase",
      "Integrated AI APIs (Groq API, ElevenLabs TTS) and applied prompt engineering techniques",
      "Managed full project lifecycle with Git/GitHub and deployed to Render and GitHub Pages",
    ],
    tags: [
      "FastAPI", "React.js", "Python", "JavaScript",
      "REST API", "Supabase", "Groq API", "Git", "Render",
    ],
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
      <path d="M2 12h20" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── useInView ─────────────────────────────────────────────────────────────

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

// ── Experience card ───────────────────────────────────────────────────────

function ExperienceCard({
  item,
  inView,
  delay,
}: {
  item: ExperienceItem;
  inView: boolean;
  delay: number;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Timeline row: dot + connector */}
      <div className="flex gap-6">

        {/* Left: timeline spine */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Dot */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center
                          bg-gradient-to-br from-blue-500/20 to-purple-500/20
                          border border-blue-500/30 text-[var(--accent-blue)] mt-1">
            <BriefcaseIcon />
          </div>
          {/* Vertical line — only if there are more items */}
          <div className="w-px flex-1 mt-3 bg-gradient-to-b from-blue-500/20 to-transparent min-h-[2rem]" />
        </div>

        {/* Right: content */}
        <div className="flex-1 pb-10">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-tight">
                {item.role}
              </h3>
              <p className="text-[var(--accent-blue)] font-medium text-sm mt-0.5">
                {item.org}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Active badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs
                               font-semibold bg-green-500/10 border border-green-500/25 text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                {item.status}
              </span>
              {/* Period */}
              <span className="px-3 py-1 rounded-lg text-xs font-mono
                               border border-[var(--border)] bg-[var(--bg-card)]
                               text-[var(--text-muted)]">
                {item.period}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            {item.description}
          </p>

          {/* Highlights */}
          <div className="card mb-5">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">
              Key Highlights
            </p>
            <ul className="space-y-2.5">
              {item.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-blue)]">
                    <CheckIcon />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border
                           border-blue-500/15 bg-blue-500/5 text-[var(--text-secondary)]
                           hover:border-blue-500/40 hover:text-[var(--accent-blue)]
                           transition-all duration-150 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function Experience() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="section-padding">
      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`mb-10 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm font-mono text-[var(--accent-purple)] mb-2 uppercase tracking-widest">
            04 / Experience
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Work <span className="accent-gradient">Experience</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* ── Timeline ── */}
        <div className="max-w-3xl">
          {EXPERIENCES.map((item, i) => (
            <ExperienceCard key={item.role} item={item} inView={inView} delay={100 + i * 120} />
          ))}
        </div>

      </div>
    </section>
  );
}

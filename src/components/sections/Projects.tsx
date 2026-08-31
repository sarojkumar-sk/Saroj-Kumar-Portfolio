"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface Project {
  number: string;
  tag: string;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  accent: "blue" | "purple";
}

// ── Data ──────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    number: "01",
    tag: "AI-Powered",
    title: "TaskFlow",
    shortDesc: "Full Stack Task Management Application",
    description:
      "A full-stack task and project management application that helps users organize, manage, search, and sort tasks efficiently. Includes an AI-powered Quick-Add feature that converts natural-language descriptions into structured tasks.",
    features: [
      "User authentication and login system",
      "Create and manage projects and tasks",
      "Search and sorting functionality",
      "AI-powered Quick-Add (natural language → structured tasks)",
      "Frontend–backend integration via FastAPI REST APIs",
    ],
    stack: [
      "Python", "FastAPI", "Pydantic", "JavaScript", "HTML5", "CSS3",
      "SQL", "SQLite", "Supabase", "REST API", "CORS", "Git", "GitHub",
      "Render", "GitHub Pages",
    ],
    liveUrl: "https://sarojkumar-sk.github.io/TaskFlow",
    githubUrl: "https://github.com/sarojkumar-sk/TaskFlow",
    accent: "blue",
  },
  {
    number: "02",
    tag: "AI-Powered",
    title: "Nava AI Assistant",
    shortDesc: "AI-Powered Web Assistant",
    description:
      "An AI-powered web assistant that provides intelligent responses through a conversational interface, with AI-generated voice output via Text-to-Speech technology — making interactions feel natural and accessible.",
    features: [
      "AI-powered conversational Q&A system",
      "Groq API integration for fast AI responses",
      "ElevenLabs Text-to-Speech for voice output",
      "FastAPI backend with clean REST API endpoints",
      "Interactive responsive frontend with Lottie animation",
    ],
    stack: [
      "Python", "FastAPI", "JavaScript", "HTML5", "CSS3",
      "Groq API", "ElevenLabs TTS", "REST API", "CORS",
      "Lottie Animation", "Git", "GitHub", "Render",
    ],
    liveUrl: "https://nova-ai-assistant-frontend-1e43.onrender.com",
    githubUrl: "https://github.com/sarojkumar-sk/nava-ai-assistant",
    accent: "purple",
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
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

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="w-3 h-3" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

// ── Intersection-observer hook ────────────────────────────────────────────

function useInView(threshold = 0.08) {
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

// ── Project card ──────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const isBlue = project.accent === "blue";

  const glowClass = isBlue
    ? "hover:border-blue-500/50 hover:shadow-blue-500/8"
    : "hover:border-purple-500/50 hover:shadow-purple-500/8";

  const accentText = isBlue ? "text-[var(--accent-blue)]" : "text-[var(--accent-purple)]";

  const tagClass = isBlue
    ? "bg-blue-500/10 border-blue-500/25 text-[var(--accent-blue)]"
    : "bg-purple-500/10 border-purple-500/25 text-[var(--accent-purple)]";

  const checkColor = isBlue ? "text-[var(--accent-blue)]" : "text-[var(--accent-purple)]";

  const btnPrimary = isBlue
    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/20"
    : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/20";

  const stackBadge = isBlue
    ? "bg-blue-500/6 border-blue-500/15 text-[var(--text-secondary)] hover:border-blue-500/40 hover:text-[var(--accent-blue)]"
    : "bg-purple-500/6 border-purple-500/15 text-[var(--text-secondary)] hover:border-purple-500/40 hover:text-[var(--accent-purple)]";

  return (
    <article
      className={`
        card group relative overflow-hidden flex flex-col gap-0
        hover:shadow-2xl transition-all duration-700 ease-out ${glowClass}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* ── Decorative top gradient bar ── */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300
          ${isBlue
            ? "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            : "bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          }`}
        aria-hidden="true"
      />

      {/* ── Ambient corner glow ── */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${isBlue ? "bg-blue-500/10" : "bg-purple-500/10"}`}
      />

      <div className="flex flex-col gap-5 p-6 flex-1">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {/* Number */}
              <span className={`text-xs font-mono ${accentText} opacity-60`}>
                {project.number}
              </span>
              {/* AI-Powered tag */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]
                               font-semibold border ${tagClass}`}>
                <SparkleIcon />
                {project.tag}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)]
                           leading-tight">
              {project.title}
            </h3>
            <p className={`text-sm mt-0.5 ${accentText}`}>{project.shortDesc}</p>
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {project.description}
        </p>

        {/* ── Features ── */}
        <div>
          <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">
            Key Features
          </p>
          <ul className="space-y-2">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className={checkColor}>
                  <CheckIcon />
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tech stack ── */}
        <div>
          <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border
                            transition-all duration-150 cursor-default ${stackBadge}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Spacer to push buttons to bottom ── */}
        <div className="flex-1" />

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live demo`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
                        text-white transition-all duration-200 hover:scale-105 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-offset-1
                        shadow-lg ${btnPrimary}
                        ${isBlue ? "focus:ring-blue-500/50" : "focus:ring-purple-500/50"}`}
          >
            <ExternalLinkIcon />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
                       border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-primary)]
                       hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]
                       transition-all duration-200 hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <GitHubIcon />
            Source Code
          </a>
        </div>
      </div>
    </article>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="section-padding bg-[var(--bg-secondary)]">
      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`mb-10 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm font-mono text-[var(--accent-blue)] mb-2 uppercase tracking-widest">
            03 / Projects
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Featured <span className="accent-gradient">Projects</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-[var(--text-secondary)] max-w-xl">
            A selection of projects I&apos;ve built — each one a blend of
            practical problem-solving, clean engineering, and AI integration.
          </p>
        </div>

        {/* ── Project grid ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Footer note ── */}
        <div
          className={`mt-10 text-center transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-sm text-[var(--text-muted)]">
            More projects on{" "}
            <a
              href="https://github.com/sarojkumar-sk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-blue)] hover:underline underline-offset-4
                         transition-colors duration-200 font-medium"
            >
              GitHub →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

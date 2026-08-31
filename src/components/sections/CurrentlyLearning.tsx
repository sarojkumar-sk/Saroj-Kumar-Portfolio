"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface LearningItem {
  title: string;
  subtitle: string;
  description: string;
  progress: number;        // 0-100
  tags: string[];
  accent: "blue" | "purple" | "mixed";
  icon: React.ReactNode;
}

// ── Icons ─────────────────────────────────────────────────────────────────

function ReactIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M4 6l8-4 8 4-8 4-8-4z" />
      <path d="M4 10l8 4 8-4" />
      <path d="M4 14l8 4 8-4" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────

const LEARNING_ITEMS: LearningItem[] = [
  {
    title: "React.js",
    subtitle: "Frontend Library",
    description:
      "Diving deep into React — hooks, context, performance patterns, and building production-grade component architectures. Working toward confident full-stack React development.",
    progress: 65,
    tags: ["Hooks", "Context API", "Component Design", "React Router", "State Management"],
    accent: "blue",
    icon: <ReactIcon />,
  },
  {
    title: "Node.js",
    subtitle: "Backend Runtime",
    description:
      "Learning Node.js to complete the JavaScript full-stack picture — building HTTP servers, working with the event loop, streams, and integrating with databases and external APIs.",
    progress: 50,
    tags: ["Express.js", "HTTP Servers", "Event Loop", "npm Ecosystem", "REST APIs"],
    accent: "purple",
    icon: <NodeIcon />,
  },
  {
    title: "Full Stack JS Ecosystem",
    subtitle: "End-to-End Development",
    description:
      "Tying it all together — learning how React frontends talk to Node/Express backends, authentication flows, deployment pipelines, and building complete production-ready apps.",
    progress: 45,
    tags: ["Full Stack", "Auth", "JWT", "CI/CD", "Deployment", "API Design"],
    accent: "mixed",
    icon: <StackIcon />,
  },
];

// ── Progress bar ──────────────────────────────────────────────────────────

function ProgressBar({
  value,
  accent,
  animate,
}: {
  value: number;
  accent: "blue" | "purple" | "mixed";
  animate: boolean;
}) {
  const gradient =
    accent === "blue"
      ? "from-blue-500 to-blue-400"
      : accent === "purple"
      ? "from-purple-500 to-purple-400"
      : "from-blue-500 to-purple-500";

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
          Progress
        </span>
        <span className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
          {value}%
        </span>
      </div>
      {/* Track */}
      <div className="h-1.5 w-full rounded-full bg-[var(--border)] overflow-hidden">
        {/* Fill */}
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// ── Learning card ─────────────────────────────────────────────────────────

function LearningCard({
  item,
  delay,
  inView,
}: {
  item: LearningItem;
  delay: number;
  inView: boolean;
}) {
  const [progressAnimate, setProgressAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setProgressAnimate(true), delay + 300);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  const iconBg =
    item.accent === "blue"
      ? "bg-blue-500/10 border-blue-500/25 text-[var(--accent-blue)]"
      : item.accent === "purple"
      ? "bg-purple-500/10 border-purple-500/25 text-[var(--accent-purple)]"
      : "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 text-[var(--accent-blue)]";

  const cardGlow =
    item.accent === "blue"
      ? "hover:border-blue-500/40 hover:shadow-blue-500/8"
      : item.accent === "purple"
      ? "hover:border-purple-500/40 hover:shadow-purple-500/8"
      : "hover:border-purple-500/30 hover:shadow-purple-500/5";

  const tagColor =
    item.accent === "blue"
      ? "bg-blue-500/8 border-blue-500/20 text-[var(--accent-blue)]"
      : item.accent === "purple"
      ? "bg-purple-500/8 border-purple-500/20 text-[var(--accent-purple)]"
      : "bg-blue-500/8 border-blue-500/20 text-[var(--accent-blue)]";

  return (
    <div
      className={`
        card group flex flex-col gap-5 hover:shadow-xl transition-all duration-700 ease-out ${cardGlow}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                         border transition-colors duration-300 ${iconBg}`}>
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]
                             font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
              In Progress
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {item.description}
      </p>

      {/* Progress bar */}
      <ProgressBar value={item.progress} accent={item.accent} animate={progressAnimate} />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${tagColor}`}
          >
            {tag}
          </span>
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

export function CurrentlyLearning() {
  const { ref, inView } = useInView();

  return (
    <section id="learning" className="section-padding relative overflow-hidden">

      {/* ── Ambient background glow ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[400px] rounded-full
                        bg-gradient-to-br from-blue-500/4 to-purple-500/4 blur-[100px]" />
      </div>

      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`mb-10 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm font-mono text-[var(--accent-purple)] mb-2 uppercase tracking-widest">
            06 / Learning
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Currently <span className="accent-gradient">Learning</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-[var(--text-secondary)] max-w-xl">
            I believe in continuous growth. Here&apos;s what I&apos;m actively levelling up right now —
            every day a little better than the last.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {LEARNING_ITEMS.map((item, i) => (
            <LearningCard key={item.title} item={item} delay={80 + i * 120} inView={inView} />
          ))}
        </div>

        {/* ── Bottom banner ── */}
        <div
          className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border)]
                          bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 p-6">
            {/* Decorative corner glow */}
            <div aria-hidden="true"
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
            <div aria-hidden="true"
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                  Always growing,{" "}
                  <span className="accent-gradient">never stopping.</span>
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md">
                  Currently working toward full-stack fluency in the JavaScript ecosystem —
                  React on the front, Node on the back, and everything in between.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {["React.js", "Node.js", "Full Stack JS"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold
                               border border-[var(--border)] bg-[var(--bg-card)]
                               text-[var(--text-secondary)] whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

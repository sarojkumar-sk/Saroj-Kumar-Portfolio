"use client";

import { useEffect, useRef, useState } from "react";

// ── Stat card ─────────────────────────────────────────────────────────────

interface StatCardProps {
  value: string;
  label: string;
  accent?: "blue" | "purple";
}

function StatCard({ value, label, accent = "blue" }: StatCardProps) {
  const color =
    accent === "blue" ? "text-[var(--accent-blue)]" : "text-[var(--accent-purple)]";
  return (
    <div className="card-hover text-center py-4 px-3">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-[var(--text-secondary)] mt-1 leading-tight">{label}</p>
    </div>
  );
}

// ── Trait pill ────────────────────────────────────────────────────────────

function Trait({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs
                 border border-[var(--border)] bg-[var(--bg-card)]
                 text-[var(--text-secondary)] hover:border-blue-500/50
                 hover:text-[var(--text-primary)] transition-all duration-200"
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0"
        aria-hidden="true"
      />
      {text}
    </span>
  );
}

// ── Focus card ────────────────────────────────────────────────────────────

interface FocusCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FocusCard({ icon, title, description }: FocusCardProps) {
  return (
    <div className="card-hover group flex gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                   bg-gradient-to-br from-blue-500/10 to-purple-500/10
                   border border-[var(--border)] group-hover:border-blue-500/40
                   transition-colors duration-300"
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{title}</h4>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-[var(--accent-blue)]" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-[var(--accent-purple)]" aria-hidden="true">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5" />
      <path d="M6 6.5a3.5 3.5 0 0 1 7 0" />
      <path d="M3 10.5a4.5 4.5 0 0 1 9 0v1" />
      <path d="M17.5 6a3.5 3.5 0 0 1 0 7" />
      <path d="M19.5 10a4.5 4.5 0 0 1 0 9H12" />
      <path d="M6 12v3.5a5.5 5.5 0 0 0 5.5 5.5" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-[var(--accent-blue)]" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-[var(--accent-purple)]" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

// ── Intersection-observer hook ────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Main About component ──────────────────────────────────────────────────

export function About() {
  const { ref, inView } = useInView();

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-8";
  const shown = "opacity-100 translate-y-0";

  const delay = (ms: number) => ({ style: { transitionDelay: `${ms}ms` } });

  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="section-container" ref={ref}>

        {/* ── Section header ── */}
        <div className={`${base} ${inView ? shown : hidden} mb-10`} {...delay(0)}>
          <p className="text-sm font-mono text-[var(--accent-blue)] mb-2 uppercase tracking-widest">
            01 / About
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            About <span className="accent-gradient">Me</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* ── Main grid: text left, stats right ── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left column — narrative */}
          <div className="lg:col-span-3 space-y-4">

            <div className={`${base} ${inView ? shown : hidden}`} {...delay(100)}>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-[var(--text-primary)] font-semibold">Saroj Kumar</span>
                {" "}— a passionate Full Stack Software Developer who loves turning ideas into
                fast, clean, and accessible web applications. I thrive at the intersection of
                thoughtful UI design and robust backend engineering.
              </p>
            </div>

            <div className={`${base} ${inView ? shown : hidden}`} {...delay(180)}>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                My stack revolves around{" "}
                <span className="text-[var(--text-primary)] font-medium">React.js</span> and{" "}
                <span className="text-[var(--text-primary)] font-medium">JavaScript</span> on the
                frontend, paired with{" "}
                <span className="text-[var(--text-primary)] font-medium">Python</span> /{" "}
                <span className="text-[var(--text-primary)] font-medium">FastAPI</span> on the
                backend. I&apos;m particularly excited about{" "}
                <span className="text-[var(--accent-purple)] font-medium">AI integration</span>{" "}
                — building smart features that make products genuinely more useful.
              </p>
            </div>

            <div className={`${base} ${inView ? shown : hidden}`} {...delay(260)}>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                I&apos;m currently deepening my expertise in full-stack development with{" "}
                <span className="text-[var(--text-primary)] font-medium">React.js</span> and{" "}
                <span className="text-[var(--text-primary)] font-medium">Node.js</span>, with an
                eye toward building scalable, production-ready systems. When I&apos;m not coding, I&apos;m
                exploring new technologies, working on personal projects, and continuously
                refining my craft.
              </p>
            </div>

            {/* Trait pills */}
            <div
              className={`${base} ${inView ? shown : hidden} flex flex-wrap gap-2 pt-2`}
              {...delay(340)}
            >
              {[
                "Clean Code",
                "Responsive Design",
                "REST APIs",
                "AI / LLM Integration",
                "Continuous Learner",
                "Open to Collaboration",
              ].map((t) => (
                <Trait key={t} text={t} />
              ))}
            </div>
          </div>

          {/* Right column — stats + focus cards */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats */}
            <div
              className={`${base} ${inView ? shown : hidden} grid grid-cols-2 gap-3`}
              {...delay(120)}
            >
              <StatCard value="Fresher" label="0–1 Year Experience" accent="blue" />
              <StatCard value="3+" label="Projects Built" accent="purple" />
              <StatCard value="5+" label="Tech Stack" accent="purple" />
              <StatCard value="∞" label="Drive to Learn" accent="blue" />
            </div>

            {/* Focus cards */}
            <div
              className={`${base} ${inView ? shown : hidden} space-y-3`}
              {...delay(220)}
            >
              <FocusCard
                icon={<CodeIcon />}
                title="Full Stack Development"
                description="End-to-end web apps — from pixel-perfect UIs to performant APIs."
              />
              <FocusCard
                icon={<BrainIcon />}
                title="AI Integration"
                description="Embedding LLMs and AI features into real-world applications."
              />
              <FocusCard
                icon={<RocketIcon />}
                title="Scalable Architecture"
                description="Building systems designed to grow without breaking."
              />
              <FocusCard
                icon={<BookIcon />}
                title="Continuous Learning"
                description="Currently levelling up with React.js, Node.js & system design."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

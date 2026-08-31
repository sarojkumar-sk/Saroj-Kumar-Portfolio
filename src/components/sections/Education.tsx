"use client";

import { useEffect, useRef, useState } from "react";

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

// ── Icons ─────────────────────────────────────────────────────────────────

function GraduationCapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── Education card ────────────────────────────────────────────────────────

function EducationCard({
  inView,
  delay,
}: {
  inView: boolean;
  delay: number;
}) {
  return (
    <div
      className={`card-hover transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                        bg-blue-500/10 border border-blue-500/25 text-[var(--accent-blue)]">
          <GraduationCapIcon />
        </div>

        <div className="flex-1 min-w-0">
          {/* Degree + status badge */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xs font-bold text-[var(--text-primary)]">
              Bachelor of Science (B.Sc.)
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px]
                             font-semibold bg-blue-500/10 border border-blue-500/25 text-[var(--accent-blue)]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              Pursuing — 3rd Year
            </span>
          </div>

          {/* Institution */}
          <p className="text-sm font-semibold text-[var(--accent-blue)] mb-3">
            Dr. Ram Manohar Lohia Avadh University, Faizabad
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              2024 – 2027 (Expected)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon />
              Faizabad, Uttar Pradesh, India
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Certification card ────────────────────────────────────────────────────

function CertificationCard({
  inView,
  delay,
}: {
  inView: boolean;
  delay: number;
}) {
  const topics = [
    "Python", "JavaScript", "Web Development", "FastAPI",
    "Databases", "REST APIs", "AI API Integration", "Prompt Engineering",
  ];

  return (
    <div
      className={`card-hover transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                        bg-purple-500/10 border border-purple-500/25 text-[var(--accent-purple)]">
          <CertificateIcon />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title + awaited badge */}
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <h3 className="text-xs font-bold text-[var(--text-primary)] leading-snug">
              Certification in Software Development Engineering with Applied AI
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px]
                             font-semibold bg-amber-500/10 border border-amber-500/25 text-amber-400
                             whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              Certification Awaited
            </span>
          </div>

          {/* Institution */}
          <p className="text-sm font-semibold text-[var(--accent-purple)] mb-1">
            Vishlesan i-Hub, IIT Patna
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-4">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon />
              IIT Patna, Bihar, India
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Completed a comprehensive program covering modern software development with practical AI integration.
            Successfully completed the final offline examination on{" "}
            <span className="text-[var(--text-primary)] font-medium">23 August 2026</span>.
            Certification is currently awaited.
          </p>

          {/* Topics covered */}
          <div>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2.5">
              Topics Covered
            </p>
            <div className="flex flex-wrap gap-1.5">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border
                             border-purple-500/15 bg-purple-500/5 text-[var(--text-secondary)]
                             hover:border-purple-500/40 hover:text-[var(--accent-purple)]
                             transition-all duration-150 cursor-default"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function Education() {
  const { ref, inView } = useInView();

  return (
    <section id="education" className="section-padding bg-[var(--bg-secondary)]">
      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`mb-10 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm font-mono text-[var(--accent-blue)] mb-2 uppercase tracking-widest">
            05 / Education & Certification
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Education &{" "}
            <span className="accent-gradient">Certification</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* ── Two-column grid on large screens ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          <EducationCard inView={inView} delay={100} />
          <CertificationCard inView={inView} delay={200} />
        </div>

        {/* ── Divider note ── */}
        <div
          className={`mt-10 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "350ms" }}
        >
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-4
                          flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Combining formal university education with intensive industry-focused certification —
              building both theoretical foundations and practical engineering skills simultaneously.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

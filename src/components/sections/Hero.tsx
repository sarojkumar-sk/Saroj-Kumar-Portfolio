"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Icons ──────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M19 3A2 2 0 0 1 21 5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ── Profile photo ──────────────────────────────────────────────────────────

function ProfilePhoto({ visible }: { visible: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
      }`}
      style={{ transitionDelay: "0ms" }}
    >
      {/* Outer glow ring */}
      <div className="relative inline-flex items-center justify-center">
        {/* Animated gradient ring */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full
                     bg-gradient-to-br from-blue-500 via-purple-500 to-blue-400
                     opacity-70 blur-[12px] scale-110"
        />
        {/* Static border ring */}
        <div
          className="relative rounded-full p-[3px]
                     bg-gradient-to-br from-blue-500 to-purple-500"
        >
          {/* White/dark gap ring */}
          <div className="rounded-full p-[2px] bg-[var(--bg-primary)]">
            {/* Photo container */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-[var(--bg-card)]">
              {imgError ? (
                /* Fallback initials avatar when image is missing */
                <div
                  className="w-full h-full flex items-center justify-center
                             bg-gradient-to-br from-blue-500/20 to-purple-500/20
                             text-2xl sm:text-3xl font-bold text-[var(--accent-blue)]
                             select-none"
                  aria-label="Saroj Kumar – profile photo placeholder"
                >
                  SK
                </div>
              ) : (
                <Image
                  src="/images/saroj-kumar-profile.png"
                  alt="Saroj Kumar – Full Stack Software Developer"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover object-top"
                  priority
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Available dot badge */}
        <span
          className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5
                     w-4 h-4 sm:w-5 sm:h-5 rounded-full
                     bg-green-400 border-2 border-[var(--bg-primary)]"
          title="Available for opportunities"
          aria-label="Available for opportunities"
        />
      </div>
    </div>
  );
}

// ── Animated hero content ──────────────────────────────────────────────────

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const shown = "opacity-100 translate-y-0";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* ── Background ambient glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                        rounded-full bg-blue-500/[0.06] blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px]
                        rounded-full bg-purple-500/[0.06] blur-[110px]" />
        {/* Faint grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-container w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">

          {/* ── Profile photo ── */}
          <ProfilePhoto visible={visible} />

          {/* ── Greeting badge ── */}
          <div
            className={`${base} ${visible ? shown : hidden}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono
                             border border-[var(--border)] bg-[var(--bg-card)]
                             text-[var(--text-secondary)] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </div>

          {/* ── Name ── */}
          <div
            className={`${base} ${visible ? shown : hidden}`}
            style={{ transitionDelay: "220ms" }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              <span className="text-[var(--text-primary)]">Saroj </span>
              <span className="accent-gradient">Kumar</span>
            </h1>
          </div>

          {/* ── Title ── */}
          <div
            className={`${base} ${visible ? shown : hidden}`}
            style={{ transitionDelay: "320ms" }}
          >
            <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] leading-relaxed">
              Full Stack Software Developer{" "}
              <span className="text-[var(--accent-blue)]">/</span>{" "}
              React.js{" "}
              <span className="text-[var(--accent-blue)]">/</span>{" "}
              Python{" "}
              <span className="text-[var(--accent-blue)]">/</span>{" "}
              FastAPI{" "}
              <span className="text-[var(--accent-blue)]">/</span>{" "}
              AI Integration
            </p>
          </div>

          {/* ── Short bio ── */}
          <div
            className={`${base} ${visible ? shown : hidden}`}
            style={{ transitionDelay: "420ms" }}
          >
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              I&apos;m a passionate Full Stack Software Developer focused on building
              modern, responsive, and user-friendly web applications. Skilled in{" "}
              <span className="text-[var(--text-primary)] font-medium">React.js</span>,{" "}
              <span className="text-[var(--text-primary)] font-medium">JavaScript</span>,{" "}
              <span className="text-[var(--text-primary)] font-medium">Python</span>,{" "}
              <span className="text-[var(--text-primary)] font-medium">FastAPI</span>, and{" "}
              <span className="text-[var(--text-primary)] font-medium">AI integration</span>,
              with a strong focus on practical projects and continuous learning.
            </p>
          </div>

          {/* ── Location ── */}
          <div
            className={`${base} ${visible ? shown : hidden}`}
            style={{ transitionDelay: "500ms" }}
          >
            <span className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <LocationIcon />
              Barabanki, Uttar Pradesh, India
              <span className="mx-1.5 text-[var(--border)]">·</span>
              <span className="text-green-500 dark:text-green-400 font-medium">
                Open to Remote Opportunities
              </span>
            </span>
          </div>

          {/* ── Buttons ── */}
          <div
            className={`${base} ${visible ? shown : hidden} flex flex-wrap justify-center gap-3 pt-2`}
            style={{ transitionDelay: "600ms" }}
          >
            {/* View Resume — opens PDF in new tab */}
            <a
              href="/resume/Saroj_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume in new tab"
              className="btn-secondary"
            >
              <EyeIcon />
              View Resume
            </a>

            {/* Download Resume — triggers browser download */}
            <a
              href="/resume/Saroj_Kumar_Resume.pdf"
              download="Saroj_Kumar_Resume.pdf"
              aria-label="Download Resume as PDF"
              className="btn-primary"
            >
              <DownloadIcon />
              Download Resume
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sarojkumar-sk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="btn-secondary"
            >
              <GitHubIcon />
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/saroj-kumar-277737326"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="btn-secondary"
            >
              <LinkedInIcon />
              LinkedIn
            </a>

            {/* Contact — smooth scroll */}
            <Link href="#contact" className="btn-secondary">
              Let&apos;s Talk
            </Link>
          </div>

          {/* ── Scroll indicator ── */}
          <div
            className={`${base} ${visible ? shown : hidden} mt-8`}
            style={{ transitionDelay: "800ms" }}
          >
            <a
              href="#about"
              aria-label="Scroll to About section"
              className="flex flex-col items-center gap-1.5 text-[var(--text-muted)]
                         hover:text-[var(--accent-blue)] transition-colors duration-300 group"
            >
              <span className="text-xs font-mono uppercase tracking-widest">scroll</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 animate-bounce group-hover:stroke-[var(--accent-blue)]"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

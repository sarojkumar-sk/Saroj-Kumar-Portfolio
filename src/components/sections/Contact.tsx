"use client";

import { useEffect, useRef, useState } from "react";

// ── useInView ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Icons ─────────────────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="w-5 h-5" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="w-5 h-5" aria-hidden="true">
      <path d="M19 3A2 2 0 0 1 21 5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="w-5 h-5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    href: "https://github.com/sarojkumar-sk",
    accent: "blue" as const,
  },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saroj-kumar-277737326",
    accent: "blue" as const,
  },
  {
    icon: <TwitterXIcon />,
    label: "Twitter / X",
    href: "https://x.com/SarojKu76619026",
    accent: "purple" as const,
  },
  {
    icon: <InstagramIcon />,
    label: "Instagram",
    href: "https://www.instagram.com/science_by_sk/",
    accent: "purple" as const,
  },
];

// ── Main component ────────────────────────────────────────────────────────

export function Contact() {
  const { ref, inView } = useInView();

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-8 pointer-events-none";
  const shown = "opacity-100 translate-y-0 pointer-events-auto";

  return (
    <section id="contact" className="section-padding bg-[var(--bg-secondary)]">
      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div className={`${base} ${inView ? shown : hidden} mb-10`}>
          <p className="text-sm font-mono text-[var(--accent-blue)] mb-2 uppercase tracking-widest">
            07 / Contact
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Get In <span className="accent-gradient">Touch</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-[var(--text-secondary)] max-w-xl">
            Feel free to reach out via email or connect with me on social media.
            I&apos;m{" "}
            <span className="text-[var(--text-primary)] font-medium">
              open to remote opportunities and collaborations
            </span>{" "}
            — I&apos;d love to hear from you.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Left column: direct contact ── */}
          <div className="space-y-4">

            {/* Email card — explicit <a> with mailto: */}
            <a
              href="mailto:saroj1011535@gmail.com"
              className={`${base} ${inView ? shown : hidden} card-hover flex items-center gap-4 group cursor-pointer relative z-20 pointer-events-auto`}
              style={{ transitionDelay: "80ms", textDecoration: "none", display: "flex", pointerEvents: "auto", cursor: "pointer" }}
              aria-label="Send email to saroj1011535@gmail.com"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors duration-300 bg-blue-500/10 border-blue-500/25 text-[var(--accent-blue)] group-hover:border-blue-500/50">
                <EmailIcon />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <p className="text-sm font-medium transition-colors duration-200 text-[var(--text-primary)] group-hover:text-[var(--accent-blue)]">
                  saroj1011535@gmail.com
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                className="w-4 h-4 ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Phone card — explicit <a> with tel: */}
            <a
              href="tel:+919555646957"
              className={`${base} ${inView ? shown : hidden} card-hover flex items-center gap-4 group`}
              style={{ transitionDelay: "160ms", textDecoration: "none", display: "flex" }}
              aria-label="Call +91 9555646957"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors duration-300 bg-purple-500/10 border-purple-500/25 text-[var(--accent-purple)] group-hover:border-purple-500/50">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <p className="text-sm font-medium transition-colors duration-200 text-[var(--text-primary)] group-hover:text-[var(--accent-purple)]">
                  +91 9555646957
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                className="w-4 h-4 ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Availability callout */}
            <div
              className={`${base} ${inView ? shown : hidden}
                          rounded-2xl border border-green-500/25 bg-green-500/5 p-4`}
              style={{ transitionDelay: "240ms" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                  Available Now
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Open to remote opportunities, freelance projects, and meaningful collaborations.
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-2 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                  className="w-3 h-3 flex-shrink-0" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Barabanki, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* ── Right column: social links + CTA ── */}
          <div className="space-y-4">

            {/* Social links card */}
            <div
              className={`${base} ${inView ? shown : hidden} card`}
              style={{ transitionDelay: "160ms" }}
            >
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4">
                Connect with me
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${s.label} profile`}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium
                                transition-all duration-200 hover:scale-105 active:scale-95
                                ${s.accent === "blue"
                        ? "border-[var(--border)] text-[var(--text-secondary)] hover:border-blue-500/50 hover:text-[var(--accent-blue)] hover:bg-blue-500/5"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-purple-500/50 hover:text-[var(--accent-purple)] hover:bg-purple-500/5"
                      }`}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div
              className={`${base} ${inView ? shown : hidden}
                          relative rounded-2xl overflow-hidden border border-[var(--border)]
                          bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 p-6`}
              style={{ transitionDelay: "280ms" }}
            >
              {/* Decorative glows */}
              <div aria-hidden="true"
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
              <div aria-hidden="true"
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

              <div className="relative">
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">
                  Preferred contact
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  The quickest way to reach me is via email. I typically respond within{" "}
                  <span className="text-[var(--text-primary)] font-medium">24 hours</span>.
                </p>
                <a
                  href="mailto:saroj1011535@gmail.com"
                  className="btn-primary inline-flex cursor-pointer relative z-20 pointer-events-auto"
                  style={{ pointerEvents: "auto", cursor: "pointer" }}
                  rel="noopener noreferrer"
                  aria-label="Send email to saroj1011535@gmail.com"
                >
                  <EmailIcon />
                  Email Me
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

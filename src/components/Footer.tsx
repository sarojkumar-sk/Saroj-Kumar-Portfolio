// ── Footer links ──────────────────────────────────────────────────────────
// Easy to update: add/remove entries or change hrefs.
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "AI Chat", href: "#ai-assistant" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/sarojkumar-sk",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saroj-kumar-277737326",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path d="M19 3A2 2 0 0 1 21 5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/SarojKu76619026",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/science_by_sk/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="section-container py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">

          {/* ── Brand column ── */}
          <div className="sm:col-span-1">
            <a href="#hero" className="inline-block mb-2">
              <span className="text-base font-bold">
                <span className="accent-gradient">Saroj</span>
                <span className="text-[var(--text-primary)]"> Kumar</span>
              </span>
            </a>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
              Full Stack Developer — building modern web apps with React.js, Python, FastAPI &amp; AI integration.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)]
                             bg-[var(--bg-card)] text-[var(--text-muted)]
                             hover:border-blue-500/50 hover:text-[var(--accent-blue)]
                             transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div className="sm:col-span-1">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">
              Quick Links
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]
                               transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div className="sm:col-span-1">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:saroj1011535@gmail.com"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]
                             transition-colors duration-200 break-all"
                >
                  saroj1011535@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919555646957"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)]
                             transition-colors duration-200"
                >
                  +91 9555646957
                </a>
              </li>
              <li className="flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="text-xs text-green-400 font-medium">
                  Open to Remote Opportunities
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} Saroj Kumar. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Built with{" "}
            <span className="text-[var(--accent-purple)]">♥</span> using Next.js 14 &middot; TypeScript &middot; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

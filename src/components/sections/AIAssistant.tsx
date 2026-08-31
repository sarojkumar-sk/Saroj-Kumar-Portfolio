"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Suggested questions ───────────────────────────────────────────────────

const SUGGESTIONS = [
  { label: "About Me", question: "Who is Saroj Kumar?" },
  { label: "Skills", question: "What are Saroj's key skills?" },
  { label: "TaskFlow", question: "Tell me about the TaskFlow project." },
  { label: "Nava AI", question: "What is the Nava AI Assistant?" },
  { label: "Tech Stack", question: "What technologies does Saroj use?" },
  { label: "Education", question: "What is Saroj's educational background?" },
];

// ── Icons ─────────────────────────────────────────────────────────────────

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M12 2v4" />
      <circle cx="12" cy="6" r="2" />
      <path d="M8 15h.01M16 15h.01" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="w-4 h-4" aria-hidden="true">
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
    </svg>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-label="AI is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
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

// ── Main component ────────────────────────────────────────────────────────

export function AIAssistant() {
  const { ref, inView } = useInView();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Saroj's AI portfolio assistant. Ask me anything about his skills, projects, education, or how to get in touch. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message — only after the user has sent at least one message.
  // Do NOT scroll on initial mount (messages.length === 1 is just the greeting).
  useEffect(() => {
    if (messages.length <= 1 && !loading) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
      // Re-focus input after response
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Send on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-8";
  const shown = "opacity-100 translate-y-0";

  return (
    <section id="ai-assistant" className="section-padding bg-[var(--bg-secondary)]">
      <div className="section-container" ref={ref}>

        {/* ── Header ── */}
        <div
          className={`${base} ${inView ? shown : hidden} mb-10`}
          style={{ transitionDelay: "0ms" }}
        >
          <p className="text-sm font-mono text-[var(--accent-blue)] mb-2 uppercase tracking-widest">
            08 / AI Assistant
          </p>
          <h2 className="section-title text-[var(--text-primary)]">
            Ask my <span className="accent-gradient">AI Assistant</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-[var(--text-secondary)] max-w-xl">
            Have a question about my skills, projects, or experience? My AI assistant
            knows everything about this portfolio — ask away.
          </p>
        </div>

        {/* ── Chat card ── */}
        <div
          className={`${base} ${inView ? shown : hidden} max-w-2xl mx-auto`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="card flex flex-col gap-0 overflow-hidden p-0">

            {/* Chat header bar */}
            <div className="flex items-center gap-3 px-5 py-3.5
                            border-b border-[var(--border)]
                            bg-gradient-to-r from-blue-500/5 to-purple-500/5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                              bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <SparkleIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Saroj&apos;s AI Assistant
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Answers from portfolio data only
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Online</span>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="flex flex-col gap-4 px-5 py-5 overflow-y-auto"
              style={{ minHeight: "280px", maxHeight: "380px" }}
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                                ${msg.role === "assistant"
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                        : "bg-[var(--border)] text-[var(--text-secondary)]"
                      }`}
                  >
                    {msg.role === "assistant" ? <BotIcon /> : <UserIcon />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                ${msg.role === "assistant"
                        ? "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-tl-sm"
                        : "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-sm"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex gap-2.5 flex-row">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                                  bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    <BotIcon />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm
                                  bg-[var(--bg-card)] border border-[var(--border)]">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !loading && (
                <div className="text-center">
                  <span className="inline-block px-4 py-2 rounded-xl text-xs
                                   bg-red-500/10 border border-red-500/25 text-red-400">
                    {error}
                  </span>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested chips */}
            <div className="px-5 pb-3 border-t border-[var(--border)] pt-3">
              <p className="text-xs text-[var(--text-muted)] mb-2.5 font-mono uppercase tracking-wider">
                Suggested
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={loading}
                    onClick={() => sendMessage(s.question)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border
                               border-[var(--border)] bg-[var(--bg-card)]
                               text-[var(--text-secondary)]
                               hover:border-blue-500/50 hover:text-[var(--accent-blue)]
                               hover:bg-blue-500/5
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200 active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input form */}
            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 pt-3 border-t border-[var(--border)]"
            >
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={1}
                  placeholder="Ask about skills, projects, education…"
                  aria-label="Message input"
                  className="flex-1 resize-none rounded-xl px-4 py-3 text-sm
                             border border-[var(--border)] bg-[var(--bg-primary)]
                             text-[var(--text-primary)]
                             placeholder:text-[var(--text-muted)]
                             outline-none transition-all duration-200
                             focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15
                             disabled:opacity-60 disabled:cursor-not-allowed
                             max-h-28 overflow-y-auto"
                  style={{
                    // Auto-grow the textarea
                    height: "auto",
                    lineHeight: "1.5",
                  }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                             bg-gradient-to-br from-blue-500 to-purple-500 text-white
                             hover:from-blue-600 hover:to-purple-600
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 hover:scale-105 active:scale-95
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <SendIcon />
                </button>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                Press <kbd className="px-1 py-0.5 rounded text-[10px] bg-[var(--border)]">Enter</kbd> to send
                &nbsp;·&nbsp;
                <kbd className="px-1 py-0.5 rounded text-[10px] bg-[var(--border)]">Shift+Enter</kbd> for new line
              </p>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}

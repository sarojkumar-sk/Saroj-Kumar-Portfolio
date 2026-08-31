import { NextRequest, NextResponse } from "next/server";

// ── Portfolio knowledge base ───────────────────────────────────────────────
// The AI is strictly grounded in this data. It cannot invent facts.
const PORTFOLIO_CONTEXT = `
You are a professional AI assistant for Saroj Kumar's portfolio website.
Answer ONLY from the information provided below.
If asked something not covered here, say: "I don't have that information — please reach out to Saroj directly at saroj1011535@gmail.com."
Never invent companies, job history, or achievements.
Keep every answer short, professional, and helpful — 2 to 4 sentences maximum.
Do NOT include any thinking, reasoning, or <think> tags in your response.

=== ABOUT SAROJ KUMAR ===
Name: Saroj Kumar
Role: Full Stack Software Developer
Location: Barabanki, Uttar Pradesh, India
Status: Available for remote opportunities and collaborations
Email: saroj1011535@gmail.com
Phone: +91 9555646957
GitHub: https://github.com/sarojkumar-sk
LinkedIn: https://www.linkedin.com/in/saroj-kumar-277737326

=== SKILLS (Proficient) ===
- Python
- JavaScript (ES6+)
- HTML & CSS
- FastAPI
- REST APIs
- SQL
- Supabase
- Groq API
- ElevenLabs API
- AI / LLM Integration

=== CURRENTLY LEARNING ===
- React.js (Frontend Library) — ~65% progress
- Node.js (Backend Runtime) — ~50% progress
- Full Stack JavaScript Ecosystem (React + Node/Express, Auth, Deployment) — ~45% progress
Note: These are actively being learned and are NOT expert-level skills yet.

=== PROJECTS ===

Project 1: TaskFlow
- A task/project management web application
- Built with modern web technologies
- Focus on productivity and clean UI

Project 2: Nava AI Assistant
- An AI-powered voice/text assistant
- Integrates Groq for fast LLM responses and ElevenLabs for text-to-speech
- Demonstrates Saroj's AI integration expertise

=== EDUCATION ===
- Degree: B.Sc. (ongoing)
- Duration: 2024–2027
- Institution: Dr. Ram Manohar Lohia Avadh University

=== CERTIFICATION ===
- Course: Software Development Engineering with Applied AI
- Provider: Vishlesan i-Hub, IIT Patna

=== SUMMARY ===
Saroj is a passionate Full Stack Software Developer who builds modern,
responsive, and user-friendly web applications. He is particularly
excited about AI integration — embedding LLMs and AI features into
real-world applications. He is continuously learning and improving
his craft every day.
`.trim();

// ── Model to use ──────────────────────────────────────────────────────────
// llama3-8b-8192 was decommissioned by Groq.
// openai/gpt-oss-20b is the current working free-tier chat model.
const GROQ_MODEL = "openai/gpt-oss-20b";

// ── Rate limiting (simple in-memory, resets on cold start) ────────────────
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

// ── Handler ───────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Check API key — must be set in .env.local as GROQ_API_KEY
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "your_groq_api_key_here") {
    return NextResponse.json(
      {
        error:
          "AI assistant is not configured. Add your Groq API key to .env.local as GROQ_API_KEY and restart the dev server.",
      },
      { status: 503 }
    );
  }

  // 2. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before asking again." },
      { status: 429 }
    );
  }

  // 3. Parse and validate request body
  let userMessage: string;
  try {
    const body = await req.json();
    if (typeof body?.message !== "string" || !body.message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    userMessage = body.message.trim().slice(0, 500);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 4. Call Groq API
  let groqRes: Response;
  try {
    groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: PORTFOLIO_CONTEXT },
          { role: "user", content: userMessage },
        ],
        // Use higher max_tokens because reasoning models consume tokens internally
        max_tokens: 600,
        temperature: 0.3,
      }),
    });
  } catch (networkErr) {
    console.error("[ai-assistant] Network error calling Groq:", networkErr);
    return NextResponse.json(
      { error: "Could not reach the AI service. Check your internet connection." },
      { status: 502 }
    );
  }

  // 5. Handle Groq errors with the real error message
  if (!groqRes.ok) {
    let groqErrMessage = `Groq returned HTTP ${groqRes.status}`;
    try {
      const groqErrBody = await groqRes.json();
      groqErrMessage = groqErrBody?.error?.message ?? groqErrMessage;
      console.error("[ai-assistant] Groq API error:", groqRes.status, groqErrBody);
    } catch {
      console.error("[ai-assistant] Groq API error (non-JSON):", groqRes.status);
    }
    // Return the real Groq error in dev; in production you may want a generic message
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: isDev
          ? `Groq API error: ${groqErrMessage}`
          : "The AI service returned an error. Please try again shortly.",
      },
      { status: 502 }
    );
  }

  // 6. Parse response — strip any reasoning/think tokens if present
  let reply = "";
  try {
    const data = await groqRes.json();
    const raw: string = data?.choices?.[0]?.message?.content?.trim() ?? "";

    // Some Groq models wrap reasoning in <think>...</think> — strip it
    reply = raw
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/^[\s\n]+/, "")
      .trim();

    if (!reply) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 502 }
      );
    }
  } catch (parseErr) {
    console.error("[ai-assistant] Failed to parse Groq response:", parseErr);
    return NextResponse.json(
      { error: "Failed to parse the AI response. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ reply });
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

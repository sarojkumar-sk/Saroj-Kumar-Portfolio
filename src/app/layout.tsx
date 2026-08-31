import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ─── SEO Metadata ──────────────────────────────────────────────────────────
// Update the URL below once the site is deployed.
const SITE_URL = "https://sarojkumar-sk.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saroj Kumar — Full Stack Developer",
    template: "%s | Saroj Kumar",
  },
  description:
    "Portfolio of Saroj Kumar — Full Stack Software Developer specialising in React.js, Python, FastAPI, and AI integration. Open to remote opportunities.",
  keywords: [
    "Saroj Kumar",
    "Full Stack Developer",
    "React.js Developer",
    "Python Developer",
    "FastAPI",
    "AI Integration",
    "Portfolio",
    "Web Developer India",
    "Remote Developer",
  ],
  authors: [{ name: "Saroj Kumar" }],
  creator: "Saroj Kumar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Saroj Kumar — Portfolio",
    title: "Saroj Kumar — Full Stack Developer",
    description:
      "Full Stack Developer skilled in React.js, Python, FastAPI & AI integration. Building modern web applications. Open to remote opportunities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saroj Kumar — Full Stack Developer",
    description:
      "Full Stack Developer skilled in React.js, Python, FastAPI & AI integration.",
    creator: "@SarojKu76619026",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f8fafc" />
        <link rel="canonical" href={SITE_URL} />
        {/* Synchronously reset scroll position before first paint.
            This prevents the browser from restoring a previous scroll position
            or jumping to a hash (e.g. #ai-assistant) on page load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (history.scrollRestoration) history.scrollRestoration = 'manual';
              if (window.location.hash) history.replaceState(null, '', window.location.pathname);
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

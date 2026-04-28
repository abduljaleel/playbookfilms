import Link from "next/link";
import { appConfig } from "@/lib/config";

const storyPosters = [
  {
    title: "ORIGIN STORY",
    tagline: "Where it all began",
    icon: (
      <svg viewBox="0 0 64 64" className="h-24 w-24 text-rose-500/10" fill="currentColor">
        <path d="M32 56c-1.1 0-2-.9-2-2V36c0-4.4-3.6-8-8-8h-2c-1.1 0-2-.9-2-2s.9-2 2-2h2c4.4 0 8-3.6 8-8V10c0-1.1.9-2 2-2s2 .9 2 2v6c0 5.2-3.4 9.6-8 11.2V28c4.6 1.6 8 6 8 11.2V54c0 1.1-.9 2-2 2z" />
        <circle cx="32" cy="10" r="4" />
      </svg>
    ),
  },
  {
    title: "LAUNCH NARRATIVE",
    tagline: "The world premiere",
    icon: (
      <svg viewBox="0 0 64 64" className="h-24 w-24 text-rose-500/10" fill="currentColor">
        <path d="M32 4l4 16h16l-13 9.5 5 15.5-12-9-12 9 5-15.5L12 20h16z" />
        <path d="M32 50v10M28 56h8" strokeWidth="2" stroke="currentColor" fill="none" />
      </svg>
    ),
  },
  {
    title: "THE PITCH",
    tagline: "Three minutes to change everything",
    icon: (
      <svg viewBox="0 0 64 64" className="h-24 w-24 text-rose-500/10" fill="currentColor">
        <ellipse cx="32" cy="52" rx="20" ry="4" opacity="0.3" />
        <path d="M32 8v36M24 12l8-4 8 4" strokeWidth="3" stroke="currentColor" fill="none" />
        <circle cx="32" cy="44" r="8" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "CASE STUDY",
    tagline: "The proof is in the story",
    icon: (
      <svg viewBox="0 0 64 64" className="h-24 w-24 text-rose-500/10" fill="currentColor">
        <path d="M20 8h24l8 8v40H12V8h8z" opacity="0.3" />
        <path d="M32 24l4 8 8 2-6 6 2 8-8-4-8 4 2-8-6-6 8-2z" />
      </svg>
    ),
  },
  {
    title: "BRAND MANIFESTO",
    tagline: "What you stand for",
    icon: (
      <svg viewBox="0 0 64 64" className="h-24 w-24 text-rose-500/10" fill="currentColor">
        <path d="M16 12h4v40h-4zM20 12h20v6H20z" />
        <path d="M20 18h18v6H20z" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "PRODUCT EXPLAINER",
    tagline: "Complex made clear",
    icon: (
      <svg viewBox="0 0 64 64" className="h-24 w-24 text-rose-500/10" fill="currentColor">
        <circle cx="32" cy="20" r="12" opacity="0.3" />
        <path d="M32 36v8M30 48h4v4h-4z" />
        <circle cx="32" cy="20" r="4" />
      </svg>
    ),
  },
];

const credits = [
  { phase: "PRE-PRODUCTION", desc: "Choose your story type" },
  { phase: "PRODUCTION", desc: "Build section by section" },
  { phase: "POST-PRODUCTION", desc: "Review & refine" },
  { phase: "PREMIERE", desc: "Publish & share" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Top letterbox bar */}
      <div className="h-[5vh] bg-[#0a0a0a] w-full flex-shrink-0" />

      {/* Nav — sits just below letterbox */}
      <header className="bg-black">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            {/* Film reel icon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-rose-500" fill="currentColor">
              <circle cx="12" cy="12" r="10" opacity="0.2" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
            <span className="font-semibold text-sm tracking-wider text-white uppercase">
              {appConfig.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm text-rose-400 border border-rose-500/40 rounded px-3 py-1.5 hover:bg-rose-500/10 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — Cinematic text reveal */}
      <section className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
            Every company has a story.
          </h1>
          <p className="mt-6 text-3xl sm:text-4xl font-medium text-rose-400 tracking-tight">
            Most tell it badly.
          </p>
          <p className="mt-8 text-xl sm:text-2xl text-neutral-400 font-light">
            We fix that.
          </p>
        </div>
      </section>

      {/* Story Posters — 3x2 grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {storyPosters.map((poster) => (
            <div
              key={poster.title}
              className="group relative rounded-lg overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer"
              style={{ aspectRatio: "2/3" }}
            >
              {/* Dark background with bottom gradient */}
              <div className="absolute inset-0 bg-[#0d0d0d]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Faded icon in center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity">
                {poster.icon}
              </div>

              {/* Text at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-rose-400 font-bold text-sm sm:text-base tracking-wider">
                  {poster.title}
                </h3>
                <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                  {poster.tagline}
                </p>
              </div>

              {/* Hover brightness overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Process as Film Credits */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="space-y-10">
            {credits.map((credit, i) => (
              <div key={credit.phase}>
                <p className="text-xs font-mono tracking-[0.4em] text-neutral-600 uppercase mb-2">
                  {credit.phase}
                </p>
                <p className="text-lg sm:text-xl text-neutral-300 font-light">
                  {credit.desc}
                </p>
                {i < credits.length - 1 && (
                  <div className="mt-10 flex justify-center">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-neutral-700" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white rounded px-8 py-4 text-lg font-medium transition-colors"
          >
            Start your story
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer — Film studio credit style */}
      <footer className="border-t border-white/5 mt-auto">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center">
          <p className="text-xs font-mono tracking-[0.3em] text-neutral-600 uppercase">
            {appConfig.name} &mdash; A 12 Cities Production
          </p>
        </div>
      </footer>

      {/* Bottom letterbox bar */}
      <div className="h-[5vh] bg-[#0a0a0a] w-full flex-shrink-0" />
    </div>
  );
}

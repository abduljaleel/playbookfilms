import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import { ArrowRight, BookOpen, Mic, FileText, Image, Sparkles, Film, PenTool, Megaphone, TrendingUp, Palette } from "lucide-react";

export default function LandingPage() {
  const storyTypes = [
    { title: "Origin Story", desc: "Where you came from and why it matters", icon: Sparkles },
    { title: "Launch Narrative", desc: "Turn a release into a felt moment", icon: TrendingUp },
    { title: "Investor Pitch", desc: "The story behind the numbers", icon: Megaphone },
    { title: "Case Study", desc: "Your customer as the hero", icon: BookOpen },
    { title: "Brand Manifesto", desc: "What you believe and why anyone should care", icon: PenTool },
    { title: "Product Explainer", desc: "Complex made simple, simple made compelling", icon: Film },
  ];

  const features = [
    {
      title: "Guided Story Builder",
      desc: "Section-by-section writing with built-in guidance, word targets, and progress tracking. Never stare at a blank page again.",
      icon: BookOpen,
    },
    {
      title: "Brand Voice Engine",
      desc: "Define your tone, capture what to say and what to avoid. Every story stays on-brand, every time.",
      icon: Mic,
    },
    {
      title: "Story Templates",
      desc: "Origin stories, launch narratives, investor pitches, case studies, and manifestos. Start with structure, finish with soul.",
      icon: FileText,
    },
    {
      title: "Media Library",
      desc: "Organise images, video, audio, and documents alongside your narratives. Every asset linked to the story it serves.",
      icon: Image,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#1c1917]">
      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white text-sm font-bold">
              <Film className="h-4 w-4" />
            </div>
            <span className="font-semibold text-lg text-white">{appConfig.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-stone-400 hover:text-white hover:bg-white/10">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/8 via-transparent to-amber-500/5" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-28 pb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 mb-8">
            <Palette className="h-3.5 w-3.5 text-rose-400" />
            <span className="text-sm font-medium text-rose-400">Story Production Studio</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl text-white leading-[1.1]">
            The ride of a lifetime
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-400 leading-relaxed">
            Complex products deserve felt stories. Build narratives that move people to action.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 h-12 text-base">
                Start telling your story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-stone-700 text-stone-300 hover:bg-white/5 h-12 text-base">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Types */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-rose-400 tracking-widest uppercase mb-3">Story types</p>
            <h2 className="text-3xl font-bold text-white">Six stories every company needs</h2>
            <p className="mt-3 text-stone-400 max-w-xl mx-auto">Each one built with structure, guided by craft, and tuned to your voice.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
            {storyTypes.map((story) => (
              <div key={story.title} className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-rose-500/40 hover:bg-rose-500/5 transition-all cursor-pointer">
                <story.icon className="h-6 w-6 text-rose-400 mb-3 group-hover:text-rose-300 transition-colors" />
                <h3 className="font-semibold text-white">{story.title}</h3>
                <p className="mt-1 text-sm text-stone-500">{story.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-sm font-medium text-rose-400 tracking-widest uppercase mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold text-white">Everything you need to tell stories that land</h2>
          <p className="mt-2 text-stone-400 max-w-2xl">
            From first draft to final cut. Structure, voice, and assets in one focused workspace.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-rose-500/30 transition-colors">
                  <Icon className="h-8 w-8 text-rose-400" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-stone-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="text-5xl text-rose-500/20 mb-4">&ldquo;</div>
          <blockquote className="text-2xl font-medium text-white leading-relaxed italic">
            Every great company has a story. Most tell it badly.
          </blockquote>
          <p className="mt-6 text-sm text-stone-600 tracking-wide">This is why Playbook Films exists.</p>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-sm font-medium text-rose-400 tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-3xl font-bold text-white">From blank page to final cut</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Choose your story", desc: "Pick a template. Origin, launch, pitch, case study, manifesto, or explainer." },
              { step: "02", title: "Set the voice", desc: "Define your brand tone, key phrases, and guardrails. The voice engine keeps you consistent." },
              { step: "03", title: "Write with guidance", desc: "Section by section, with prompts, word targets, and structure that frees your creativity." },
              { step: "04", title: "Polish and publish", desc: "Attach media, review the arc, and export a narrative that makes people feel something." },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <span className="text-4xl font-bold text-rose-500/20">{item.step}</span>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">Your product has a story worth telling</h2>
          <p className="mt-4 text-lg text-stone-400">
            Stop writing changelogs. Start writing narratives that make people care.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 h-12 text-base">
              Create free account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-stone-600">
          <span>&copy; {new Date().getFullYear()} {appConfig.name}. All rights reserved.</span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}

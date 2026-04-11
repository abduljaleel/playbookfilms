import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import { ArrowRight, BookOpen, Mic, FileText, Image } from "lucide-react";

export default function LandingPage() {
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
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {appConfig.name.charAt(0)}
            </div>
            <span className="font-semibold text-lg">{appConfig.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          The ride of a lifetime
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Complex products deserve felt stories. Build narratives that move people to action.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <Button size="lg">
              Start telling your story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold">Everything you need to tell stories that land</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            From first draft to final cut. Structure, voice, and assets in one focused workspace.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border bg-background p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h2 className="text-3xl font-bold">Your product has a story worth telling</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Stop writing changelogs. Start writing narratives that make people care.
        </p>
        <Link href="/signup" className="mt-8 inline-block">
          <Button size="lg">
            Create free account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} {appConfig.name}. All rights reserved.</span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}

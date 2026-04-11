import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  stories,
  brandVoices,
  storyTypeLabels,
  storyStatusColors,
  getStoryProgress,
  getCompletedSections,
} from "@/lib/data/stories";
import { Film, PenLine, Globe, Palette, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const totalStories = stories.length;
  const inProgress = stories.filter((s) => s.status === "draft" || s.status === "review").length;
  const published = stories.filter((s) => s.status === "published").length;
  const brandVoiceCount = brandVoices.length;

  const recentStories = [...stories].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.full_name || user?.email}. Here is your storytelling overview.
        </p>
      </div>

      <div className="flex justify-end">
        <Link href="/stories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Story
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Stories"
          value={String(totalStories)}
          description="Stories in your library"
          icon={<Film className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="In Progress"
          value={String(inProgress)}
          description="Drafts and stories in review"
          icon={<PenLine className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Published"
          value={String(published)}
          description="Live and ready to share"
          icon={<Globe className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Brand Voices"
          value={String(brandVoiceCount)}
          description="Voice configurations active"
          icon={<Palette className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Stories */}
        <Card>
          <CardHeader>
            <CardTitle>Active Stories</CardTitle>
            <CardDescription>Stories currently being crafted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentStories
              .filter((s) => s.status !== "published")
              .slice(0, 3)
              .map((story) => {
                const progress = getStoryProgress(story);
                const completed = getCompletedSections(story);
                return (
                  <Link
                    key={story.id}
                    href={`/stories/${story.id}`}
                    className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <p className="font-medium leading-snug truncate">{story.title}</p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${storyStatusColors[story.status]}`}>
                            {story.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {storyTypeLabels[story.type]}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                        {completed}/{story.sections.length}
                      </span>
                    </div>
                    <div className="mt-3">
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </Link>
                );
              })}
            {stories.filter((s) => s.status !== "published").length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No active stories. Start writing your first narrative.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Edits */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Edits</CardTitle>
            <CardDescription>Latest updates across all stories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentStories.slice(0, 4).map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="space-y-1 min-w-0">
                  <p className="font-medium leading-snug truncate">{story.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Last edited {new Date(story.updatedAt).toLocaleDateString("en-IE", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <Badge variant="secondary">{storyTypeLabels[story.type]}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Brand Voice Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Brand Voice Overview</CardTitle>
            <CardDescription>Your configured narrative voices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {brandVoices.map((voice) => (
                <Link
                  key={voice.id}
                  href="/brand"
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <p className="font-medium">{voice.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{voice.targetAudience}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {voice.toneDescriptors.map((tone) => (
                      <span
                        key={tone}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {tone}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

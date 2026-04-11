"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  stories,
  brandVoices,
  storyTypeLabels,
  storyStatusColors,
  getStoryProgress,
  getCompletedSections,
  getWordCount,
} from "@/lib/data/stories";
import type { StorySection } from "@/lib/data/stories";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Target,
  Users,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

export default function StoryEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-medium">Story not found</p>
        <Link href="/stories" className="mt-4">
          <Button variant="outline">Back to Stories</Button>
        </Link>
      </div>
    );
  }

  return <StoryEditor story={story} />;
}

function StoryEditor({
  story: initialStory,
}: {
  story: (typeof stories)[0];
}) {
  const [sections, setSections] = useState(initialStory.sections);
  const [activeSection, setActiveSection] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const brandVoice = brandVoices.find((v) => v.id === initialStory.brandVoiceId);
  const progress = Math.round(
    (sections.filter((s) => s.content.trim().length > 0).length / sections.length) * 100
  );
  const completedCount = sections.filter((s) => s.content.trim().length > 0).length;

  const totalWords = sections.reduce((sum, s) => sum + getWordCount(s.content), 0);
  const totalTarget = sections.reduce((sum, s) => sum + s.wordCountTarget, 0);

  function updateSectionContent(index: number, content: string) {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, content } : s))
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Link href="/stories">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Stories
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-xl font-bold leading-tight">{initialStory.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {storyTypeLabels[initialStory.type]}
              </Badge>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${storyStatusColors[initialStory.status]}`}
              >
                {initialStory.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {completedCount}/{sections.length} sections
            </span>
            <Progress value={progress} className="h-2 w-24" />
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex flex-1 gap-6 overflow-hidden pt-4">
        {/* Left Panel: Section Editor */}
        <div className="flex-1 overflow-y-auto pr-2">
          {showPreview ? (
            <PreviewMode sections={sections} title={initialStory.title} />
          ) : (
            <div className="space-y-4">
              {sections.map((section, index) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeSection === index}
                  onFocus={() => setActiveSection(index)}
                  onContentChange={(content) =>
                    updateSectionContent(index, content)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-72 shrink-0 space-y-4 overflow-y-auto border-l pl-6">
          {/* Word Count Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Word Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalWords}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / {totalTarget} target
                </span>
              </div>
              <Progress
                value={Math.min(100, (totalWords / totalTarget) * 100)}
                className="mt-2 h-1.5"
              />
            </CardContent>
          </Card>

          {/* Brand Voice */}
          {brandVoice && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <MessageSquare className="h-4 w-4" />
                  Brand Voice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium">{brandVoice.name}</p>
                <div className="flex flex-wrap gap-1">
                  {brandVoice.toneDescriptors.map((tone) => (
                    <span
                      key={tone}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {tone}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Use phrases like
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {brandVoice.examplePhrases.slice(0, 3).map((phrase) => (
                      <li key={phrase} className="text-xs text-emerald-700">
                        &ldquo;{phrase}&rdquo;
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Avoid
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {brandVoice.avoidPhrases.slice(0, 4).map((phrase) => (
                      <li
                        key={phrase}
                        className="flex items-center gap-1 text-xs text-destructive"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        {phrase}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Target Audience */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {initialStory.targetAudience}
              </p>
            </CardContent>
          </Card>

          {/* Section Word Targets */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4" />
                Section Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sections.map((section, i) => {
                  const words = getWordCount(section.content);
                  const pct = Math.min(
                    100,
                    (words / section.wordCountTarget) * 100
                  );
                  const isDone = words >= section.wordCountTarget * 0.8;
                  return (
                    <li key={section.id}>
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={
                            activeSection === i
                              ? "font-medium text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {section.name}
                        </span>
                        <span
                          className={
                            isDone
                              ? "text-emerald-600 font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {words}/{section.wordCountTarget}
                        </span>
                      </div>
                      <Progress value={pct} className="mt-1 h-1" />
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  index,
  isActive,
  onFocus,
  onContentChange,
}: {
  section: StorySection;
  index: number;
  isActive: boolean;
  onFocus: () => void;
  onContentChange: (content: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const wordCount = getWordCount(section.content);
  const atTarget = wordCount >= section.wordCountTarget * 0.8;

  return (
    <div
      className={`rounded-lg border transition-all ${
        isActive ? "border-primary/50 shadow-sm" : "border-border"
      }`}
    >
      {/* Section Header */}
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-3"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {index + 1}
          </span>
          <span className="font-medium">{section.name}</span>
          {section.content.trim().length > 0 && (
            <Check className="h-4 w-4 text-emerald-500" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs ${
              atTarget ? "text-emerald-600 font-medium" : "text-muted-foreground"
            }`}
          >
            {wordCount} / {section.wordCountTarget} words
          </span>
          {collapsed ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Section Body */}
      {!collapsed && (
        <div className="space-y-3 border-t px-4 py-4">
          {/* Guidance */}
          <div className="rounded-md bg-muted/50 px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Guidance
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {section.guidance}
            </p>
          </div>

          {/* Textarea */}
          <Textarea
            placeholder={section.placeholder}
            value={section.content}
            onChange={(e) => onContentChange(e.target.value)}
            onFocus={onFocus}
            className="min-h-36 resize-y text-base leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}

function PreviewMode({
  sections,
  title,
}: {
  sections: StorySection[];
  title: string;
}) {
  return (
    <div className="prose prose-neutral mx-auto max-w-2xl dark:prose-invert">
      <h1>{title}</h1>
      {sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h2>{section.name}</h2>
          {section.content.trim() ? (
            <p className="whitespace-pre-wrap">{section.content}</p>
          ) : (
            <p className="italic text-muted-foreground">
              This section is empty. Switch to edit mode to start writing.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

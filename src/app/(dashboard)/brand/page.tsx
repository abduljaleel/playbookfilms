"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { brandVoices } from "@/lib/data/stories";
import type { BrandVoice } from "@/lib/data/stories";
import {
  Palette,
  Plus,
  X,
  MessageSquare,
  AlertTriangle,
  Users,
  Eye,
} from "lucide-react";

export default function BrandVoicePage() {
  const [selectedVoice, setSelectedVoice] = useState<BrandVoice>(brandVoices[0]);
  const [editName, setEditName] = useState(selectedVoice.name);
  const [editTone, setEditTone] = useState(selectedVoice.toneDescriptors.join(", "));
  const [editExamples, setEditExamples] = useState(selectedVoice.examplePhrases.join("\n"));
  const [editAvoid, setEditAvoid] = useState(selectedVoice.avoidPhrases.join("\n"));
  const [editAudience, setEditAudience] = useState(selectedVoice.targetAudience);

  function selectVoice(voice: BrandVoice) {
    setSelectedVoice(voice);
    setEditName(voice.name);
    setEditTone(voice.toneDescriptors.join(", "));
    setEditExamples(voice.examplePhrases.join("\n"));
    setEditAvoid(voice.avoidPhrases.join("\n"));
    setEditAudience(voice.targetAudience);
  }

  const toneList = editTone
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const exampleList = editExamples
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);
  const avoidList = editAvoid
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Voice</h1>
          <p className="text-muted-foreground">
            Define how your stories sound. Consistent voice builds trust.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Voice
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Voice List */}
        <div className="space-y-3">
          {brandVoices.map((voice) => (
            <Card
              key={voice.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                selectedVoice.id === voice.id
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              }`}
              onClick={() => selectVoice(voice)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{voice.name}</CardTitle>
                <CardDescription className="text-xs">
                  {voice.targetAudience}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {voice.toneDescriptors.map((tone) => (
                    <span
                      key={tone}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {tone}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Editor */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Edit Voice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voice-name">Voice Name</Label>
                <Input
                  id="voice-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-tone">Tone Tags (comma-separated)</Label>
                <Input
                  id="voice-tone"
                  value={editTone}
                  onChange={(e) => setEditTone(e.target.value)}
                  placeholder="Warm, Confident, Direct"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-audience">
                  <Users className="mr-1 inline h-3.5 w-3.5" />
                  Target Audience
                </Label>
                <Input
                  id="voice-audience"
                  value={editAudience}
                  onChange={(e) => setEditAudience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-examples">
                  <MessageSquare className="mr-1 inline h-3.5 w-3.5" />
                  Example Phrases (one per line)
                </Label>
                <Textarea
                  id="voice-examples"
                  value={editExamples}
                  onChange={(e) => setEditExamples(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-avoid">
                  <AlertTriangle className="mr-1 inline h-3.5 w-3.5" />
                  Phrases to Avoid (one per line)
                </Label>
                <Textarea
                  id="voice-avoid"
                  value={editAvoid}
                  onChange={(e) => setEditAvoid(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Voice Preview
              </CardTitle>
              <CardDescription>
                How this voice looks when applied to a story
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold">{editName || "Untitled Voice"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{editAudience || "No audience specified"}</p>
              </div>

              {/* Tone */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Tone
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {toneList.length > 0 ? (
                    toneList.map((tone) => (
                      <span
                        key={tone}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {tone}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Add tone descriptors above
                    </span>
                  )}
                </div>
              </div>

              {/* Examples */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Sounds like
                </p>
                {exampleList.length > 0 ? (
                  <ul className="space-y-1.5">
                    {exampleList.map((phrase) => (
                      <li
                        key={phrase}
                        className="rounded-md bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                      >
                        &ldquo;{phrase}&rdquo;
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Add example phrases above
                  </span>
                )}
              </div>

              {/* Avoid */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Never say
                </p>
                {avoidList.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {avoidList.map((phrase) => (
                      <span
                        key={phrase}
                        className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive"
                      >
                        <X className="h-3 w-3" />
                        {phrase}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Add phrases to avoid above
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

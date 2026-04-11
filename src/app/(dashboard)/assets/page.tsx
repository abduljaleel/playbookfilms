"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assets } from "@/lib/data/stories";
import type { AssetType } from "@/lib/data/stories";
import {
  Upload,
  Image,
  Film,
  Music,
  FileText,
  Link2,
  FolderOpen,
} from "lucide-react";

const assetIcons: Record<AssetType, React.ElementType> = {
  image: Image,
  video: Film,
  audio: Music,
  document: FileText,
};

const assetColors: Record<AssetType, string> = {
  image: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  video: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
  audio: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  document: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
};

export default function AssetsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = assets.filter((a) => {
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Assets</h1>
          <p className="text-muted-foreground">
            Images, video, audio, and documents for your narratives.
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Asset
        </Button>
      </div>

      {/* Upload Area */}
      <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center transition-colors hover:border-muted-foreground/40">
        <Upload className="mx-auto h-10 w-10 text-muted-foreground/50" />
        <p className="mt-4 text-sm font-medium">
          Drag and drop files here, or click to browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supports images, video, audio, and documents up to 100MB
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
        {typeFilter !== "all" && (
          <Button variant="ghost" size="sm" onClick={() => setTypeFilter("all")}>
            Clear filter
          </Button>
        )}
        <span className="text-sm text-muted-foreground">
          {filtered.length} asset{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Asset Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((asset) => {
          const Icon = assetIcons[asset.type];
          return (
            <Card key={asset.id} className="overflow-hidden">
              {/* Thumbnail placeholder */}
              <div
                className={`flex h-32 items-center justify-center ${assetColors[asset.type]}`}
              >
                <Icon className="h-10 w-10 opacity-60" />
              </div>
              <CardContent className="p-3 space-y-2">
                <p
                  className="text-sm font-medium truncate"
                  title={asset.filename}
                >
                  {asset.filename}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {asset.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {asset.size}
                  </span>
                </div>
                {asset.linkedStoryTitle ? (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    <span className="truncate">{asset.linkedStoryTitle}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <FolderOpen className="h-3 w-3" />
                    <span>Unlinked</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(asset.uploadDate).toLocaleDateString("en-IE", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">
            No assets match your filter.
          </p>
        </div>
      )}
    </div>
  );
}

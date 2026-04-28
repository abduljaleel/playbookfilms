-- playbookfilms: Story and brand content tables
-- Migration: 00002_stories

-- Brand Voices (created first since stories references it)
create table if not exists public.brand_voices (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  tone_descriptors jsonb,
  example_phrases jsonb,
  avoid_phrases jsonb,
  target_audience text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.brand_voices enable row level security;

create policy "Users can view brand voices in their org"
  on public.brand_voices for select
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can insert brand voices in their org"
  on public.brand_voices for insert
  with check (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can update brand voices in their org"
  on public.brand_voices for update
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can delete brand voices in their org"
  on public.brand_voices for delete
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

-- Story Templates (created before stories since stories references it)
create table if not exists public.story_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  story_type text,
  sections jsonb,
  guidance jsonb,
  example_content text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.story_templates enable row level security;

create policy "Anyone can view public story templates"
  on public.story_templates for select
  using (is_public = true);

create policy "Authenticated users can insert story templates"
  on public.story_templates for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update story templates"
  on public.story_templates for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete story templates"
  on public.story_templates for delete
  using (auth.uid() is not null);

-- Stories
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  story_type text,
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'archived')),
  template_id uuid references public.story_templates(id),
  owner_id uuid references auth.users(id),
  brand_voice_id uuid references public.brand_voices(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stories enable row level security;

create policy "Users can view stories in their org"
  on public.stories for select
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can insert stories in their org"
  on public.stories for insert
  with check (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can update stories in their org"
  on public.stories for update
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can delete stories in their org"
  on public.stories for delete
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

-- Story Sections
create table if not exists public.story_sections (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories(id) on delete cascade,
  section_type text,
  content text,
  order_index int not null default 0,
  guidance_notes text,
  status text not null default 'draft' check (status in ('draft', 'approved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.story_sections enable row level security;

create policy "Users can view story sections via story org"
  on public.story_sections for select
  using (story_id in (
    select id from public.stories where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can insert story sections via story org"
  on public.story_sections for insert
  with check (story_id in (
    select id from public.stories where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can update story sections via story org"
  on public.story_sections for update
  using (story_id in (
    select id from public.stories where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

create policy "Users can delete story sections via story org"
  on public.story_sections for delete
  using (story_id in (
    select id from public.stories where org_id in (
      select org_id from public.profiles where user_id = auth.uid()
    )
  ));

-- Media Assets
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  story_id uuid references public.stories(id),
  asset_type text not null check (asset_type in ('image', 'video', 'audio', 'document')),
  storage_path text not null,
  filename text not null,
  metadata jsonb,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

create policy "Users can view media assets in their org"
  on public.media_assets for select
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can insert media assets in their org"
  on public.media_assets for insert
  with check (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can update media assets in their org"
  on public.media_assets for update
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

create policy "Users can delete media assets in their org"
  on public.media_assets for delete
  using (org_id in (select org_id from public.profiles where user_id = auth.uid()));

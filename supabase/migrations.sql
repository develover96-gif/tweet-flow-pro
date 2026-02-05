-- Enable UUID extension for ID generation
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES
-- Public information and plan details for users.
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  bio text,
  plan_tier text check (plan_tier in ('free', 'pro', 'enterprise')) default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

create policy "Users can insert their own profile." 
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile." 
  on public.profiles for update using (auth.uid() = id);


-- -----------------------------------------------------------------------------
-- 2. EVERGREEN COLLECTIONS
-- Groups of posts to be recycled. Created before posts to handle FK.
-- -----------------------------------------------------------------------------
create table if not exists public.evergreen_collections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  color text default '#607AFB',
  schedule_pattern jsonb, -- e.g. {"days": ["mon", "wed"], "time": "09:00"}
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Evergreen Collections
alter table public.evergreen_collections enable row level security;

create policy "Users can manage their evergreen collections." 
  on public.evergreen_collections for all using (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- 3. POSTS
-- The core content unit (tweets, threads, drafts).
-- -----------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text,
  media_urls text[], -- Array of image/video URLs
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone,
  status text check (status in ('draft', 'scheduled', 'published', 'failed', 'queue')) default 'draft',
  
  -- Metrics
  likes_count int default 0,
  retweets_count int default 0,
  replies_count int default 0,
  impressions_count int default 0,
  
  -- Evergreen Linking
  is_evergreen boolean default false,
  evergreen_collection_id uuid references public.evergreen_collections(id) on delete set null,
  
  -- Thread Linking
  thread_id uuid, -- Group ID to link multiple posts in a thread
  position_in_thread int default 0, -- Order 0, 1, 2...
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Posts
alter table public.posts enable row level security;

create policy "Users can view own posts." 
  on public.posts for select using (auth.uid() = user_id);

create policy "Users can create own posts." 
  on public.posts for insert with check (auth.uid() = user_id);

create policy "Users can update own posts." 
  on public.posts for update using (auth.uid() = user_id);

create policy "Users can delete own posts." 
  on public.posts for delete using (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- 4. TEMPLATES
-- Reusable content structures.
-- -----------------------------------------------------------------------------
create table if not exists public.templates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade, -- Null if system template
  is_system boolean default false,
  title text not null,
  description text,
  category text,
  content_structure jsonb, -- Array of strings
  icon_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Templates
alter table public.templates enable row level security;

create policy "Users can view system templates and their own." 
  on public.templates for select 
  using (is_system = true or auth.uid() = user_id);

create policy "Users can create their own templates." 
  on public.templates for insert 
  with check (auth.uid() = user_id);

create policy "Users can update their own templates." 
  on public.templates for update 
  using (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- 5. USER SETTINGS
-- App configuration and connection tokens.
-- -----------------------------------------------------------------------------
create table if not exists public.user_settings (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  auto_retweet boolean default false,
  quiet_hours_start time,
  quiet_hours_end time,
  scheduling_sensitivity text default 'balanced',
  timezone text default 'UTC',
  
  -- JSONB to store connection tokens/status securely.
  -- Structure: { "twitter": { "connected": true, "token": "..." }, "linkedin": ... }
  connected_accounts jsonb default '{}'::jsonb,
  
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Settings
alter table public.user_settings enable row level security;

create policy "Users can manage their own settings." 
  on public.user_settings for all using (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- 6. ANALYTICS SNAPSHOTS
-- Daily aggregation of stats.
-- -----------------------------------------------------------------------------
create table if not exists public.analytics_snapshots (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  platform text not null, -- 'twitter', 'linkedin'
  followers_count int,
  impressions_count int,
  engagement_rate numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Analytics
alter table public.analytics_snapshots enable row level security;

create policy "Users can view their own analytics." 
  on public.analytics_snapshots for select using (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- 7. TRIGGERS & FUNCTIONS
-- -----------------------------------------------------------------------------

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_settings (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile and settings on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
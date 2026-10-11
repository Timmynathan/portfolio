-- Editable site content + admin access for the /admin console.
-- Run this once in the Supabase SQL editor. It is safe to re-run.
--
-- After running it:
--   1. Create your login: Authentication → Users → Add user (email + password, tick "Auto Confirm User").
--   2. Make that user the admin by running (with your email):
--        insert into public.admins (user_id)
--        select id from auth.users where email = 'you@example.com'
--        on conflict do nothing;
--
-- Anyone can READ content (the public site needs to). Only users listed in public.admins can change
-- anything — being logged in is not enough, so it doesn't matter if sign-ups are open.

-- ---------------------------------------------------------------------------
-- Who is an admin
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admins enable row level security;

-- A signed-in user may see only their own row (the console uses this to check "am I an admin?").
-- There is no insert/update/delete policy: admins are added from the SQL editor only.
drop policy if exists "read own admin row" on public.admins;
create policy "read own admin row" on public.admins
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Content: one row per section (site, projects, tools, certifications, articles, about_photos)
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "public read" on public.site_content;
create policy "public read" on public.site_content
  for select using (true);

drop policy if exists "admin insert" on public.site_content;
create policy "admin insert" on public.site_content
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin update" on public.site_content;
create policy "admin update" on public.site_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin delete" on public.site_content;
create policy "admin delete" on public.site_content
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Images uploaded from the console: a public-read bucket only admins can write to
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

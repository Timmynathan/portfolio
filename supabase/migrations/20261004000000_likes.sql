-- Like counts for the About page photos.
-- Run this once in the Supabase SQL editor. It is safe to re-run.
--
-- The site reads counts with the anon key (public read policy) and changes them only
-- through toggle_like(); there is no insert/update policy, so the table can't be written directly.

create table if not exists public.likes (
  id text primary key,
  count integer not null default 0
);

alter table public.likes enable row level security;

-- "create policy" has no "if not exists", so drop first to keep this file re-runnable.
drop policy if exists "public read" on public.likes;
create policy "public read" on public.likes for select using (true);

create or replace function public.toggle_like(item_id text, liking boolean)
returns integer
language plpgsql
security definer
-- Pin the search path: a security definer function shouldn't resolve names via the caller's path.
set search_path = public
as $$
declare new_count integer;
begin
  if liking then
    insert into public.likes (id, count) values (item_id, 1)
    on conflict (id) do update set count = likes.count + 1
    returning count into new_count;
  else
    update public.likes set count = greatest(count - 1, 0)
    where id = item_id returning count into new_count;
  end if;
  return coalesce(new_count, 0);
end; $$;

grant execute on function public.toggle_like(text, boolean) to anon;

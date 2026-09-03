create table if not exists public.member_carts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  constraint member_carts_items_is_array check (jsonb_typeof(items) = 'array')
);

alter table public.member_carts enable row level security;

revoke all on table public.member_carts from anon;
grant select, insert, update, delete on table public.member_carts to authenticated;

create policy "members read own cart"
on public.member_carts for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "members create own cart"
on public.member_carts for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "members update own cart"
on public.member_carts for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "members delete own cart"
on public.member_carts for delete
to authenticated
using ((select auth.uid()) = user_id);

drop trigger if exists member_carts_touch_updated_at on public.member_carts;
create trigger member_carts_touch_updated_at
before update on public.member_carts
for each row execute function public.touch_updated_at();

alter function public.touch_updated_at() set search_path = public, pg_temp;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.can_edit_cms() from public, anon;
grant execute on function public.can_edit_cms() to authenticated;

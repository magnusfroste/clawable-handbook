# Reading Analytics — Setup

Anonymous, aggregate-only reading stats. No cookies, no identifiers, no IP
addresses stored → no consent banner needed. Storage: Supabase (free tier is
plenty). The site is static on Vercel, so file-based storage is not possible —
Supabase is the natural fit for this stack.

## How it works

1. **Beacon** (in `Base.astro`, site-wide): on every page view, tracks max
   scroll depth and visibility-aware reading time; sends ONE event via
   `navigator.sendBeacon` when the reader leaves the page/tab.
2. **`book_events` table**: insert-only for the anon key (RLS). Nobody can
   read raw events from the browser.
3. **`book_stats` view**: the only thing readable — aggregates per path.
4. **`/analytics`**: unlinked page (excluded from sitemap, `noindex`) that
   renders the aggregates. Anyone with the URL can see it — by design,
   it contains nothing sensitive.

## Setup (once, ~10 minutes)

### 1. Create a Supabase project

New project (e.g. `clawable-stats`) at supabase.com — or reuse an existing
non-production project. Region: EU (Stockholm/Frankfurt) for good manners.

### 2. Run this SQL (SQL Editor)

```sql
create table public.book_events (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  path text not null check (char_length(path) <= 200),
  depth smallint not null default 0 check (depth between 0 and 100),
  seconds integer not null default 0 check (seconds between 0 and 7200),
  referrer text check (char_length(referrer) <= 200),
  device text check (device in ('mobile', 'desktop'))
);

alter table public.book_events enable row level security;

-- The anon key may ONLY insert. No select, update, delete.
create policy "anon can insert events"
  on public.book_events for insert
  to anon
  with check (true);

-- Aggregates are the only readable surface.
create view public.book_stats as
select
  path,
  count(*)::int                                   as views,
  round(avg(depth))::int                          as avg_depth,
  round(avg(seconds))::int                        as avg_seconds,
  round(100.0 * avg((depth >= 90)::int))::int     as completion_pct,
  count(*) filter (where device = 'mobile')::int  as mobile_views,
  max(ts)                                         as last_view
from public.book_events
group by path;

grant select on public.book_stats to anon;

-- Daily trend (for the /analytics bar chart)
create view public.book_stats_daily as
select
  date_trunc('day', ts)::date as day,
  count(*)::int               as views,
  round(avg(seconds))::int    as avg_seconds
from public.book_events
group by 1;

grant select on public.book_stats_daily to anon;

-- Referrer origins (where readers come from)
create view public.book_referrers as
select
  coalesce(referrer, '(direct)') as referrer,
  count(*)::int                  as views,
  max(ts)                        as last_view
from public.book_events
group by 1;

grant select on public.book_referrers to anon;
```

### 3. Set env vars in Vercel (Project → Settings → Environment Variables)

| Name | Value |
|---|---|
| `PUBLIC_STATS_URL` | `https://<project-ref>.supabase.co` |
| `PUBLIC_STATS_KEY` | the project's **anon** key (never the service key) |

Redeploy. Without the vars, the beacon and /analytics degrade gracefully
(nothing is tracked, /analytics says "not configured").

### 4. Read your stats

`https://www.clawable.org/analytics` — unlinked, noindex, excluded from sitemap.

## What you get per page

- **Views** — page loads that ended (beacon fired)
- **Avg depth** — how far down readers get (the "where do they stop" answer)
- **Avg time** — visibility-aware active reading time
- **Completion %** — share of views that scrolled past 90%
- **Mobile share** — mobile vs desktop split
- **Last view** — freshness

Chapter-level drop-off across the book is visualized directly: /analytics
renders a **reading funnel** per track — every numbered chapter in order,
retention measured against the first chapter. Where the bars shrink fast is
where readers stop. Plus a 30-day daily trend and a referrer breakdown
(so the LinkedIn launch effect is visible on day one).

## Privacy posture (for the curious)

Stored per event: path, depth %, seconds, referrer *origin* only (e.g.
`https://www.linkedin.com`), device class, timestamp. Nothing else. No
fingerprinting, no session IDs, no IP (Supabase logs aside — set log
retention low if you care). This is well inside GDPR's anonymous-data lane.

## v2 migration (visits, outbound clicks, cross-edition) — run once

Adds per-visit grouping (sessionStorage id, dies with the tab — still fully
anonymous) and reader-action tracking (outbound clicks, hostname only).

```sql
alter table public.book_events
  add column event_type text not null default 'view'
    check (event_type in ('view', 'click', 'answer')),
  add column visit text check (char_length(visit) <= 16),
  add column target text check (char_length(target) <= 100);

-- Views now count reading events only
create or replace view public.book_stats as
select
  path,
  count(*)::int                                   as views,
  round(avg(depth))::int                          as avg_depth,
  round(avg(seconds))::int                        as avg_seconds,
  round(100.0 * avg((depth >= 90)::int))::int     as completion_pct,
  count(*) filter (where device = 'mobile')::int  as mobile_views,
  max(ts)                                         as last_view
from public.book_events
where event_type = 'view'
group by path;

create or replace view public.book_stats_daily as
select
  date_trunc('day', ts)::date as day,
  count(*)::int               as views,
  round(avg(seconds))::int    as avg_seconds
from public.book_events
where event_type = 'view'
group by 1;

create or replace view public.book_referrers as
select
  coalesce(referrer, '(direct)') as referrer,
  count(*)::int                  as views,
  max(ts)                        as last_view
from public.book_events
where event_type = 'view'
group by 1;

-- Visit-level aggregates (the publisher metrics)
create view public.book_visit_stats as
with v as (
  select
    visit,
    count(*) filter (where event_type = 'view')      as pages,
    bool_or(path like '/business/%')                 as touched_business,
    bool_or(path like '/builder/%')                  as touched_builder
  from public.book_events
  where visit is not null
  group by visit
)
select
  count(*)::int                                                      as visits,
  round(avg(pages), 1)                                               as pages_per_visit,
  round(100.0 * avg((pages >= 3)::int))::int                         as deep_visit_pct,
  round(100.0 * avg((touched_business and touched_builder)::int))::int as cross_edition_pct
from v;

grant select on public.book_visit_stats to anon;

-- Reader actions: outbound clicks by destination
create view public.book_clicks as
select
  coalesce(target, '(unknown)') as target,
  count(*)::int                 as clicks,
  max(ts)                       as last_click
from public.book_events
where event_type = 'click'
group by 1;

grant select on public.book_clicks to anon;

-- Audience segments: business readers vs builder readers vs both
create view public.book_visit_segments as
with v as (
  select
    visit,
    count(*) filter (where event_type = 'view') as pages,
    bool_or(path like '/business/%')            as b1,
    bool_or(path like '/builder/%')             as b2
  from public.book_events
  where visit is not null
  group by visit
)
select
  case
    when b1 and b2 then 'both'
    when b1 then 'business'
    when b2 then 'builder'
    else 'other'
  end                                        as segment,
  count(*)::int                              as visits,
  round(avg(pages), 1)                       as pages_per_visit,
  round(100.0 * avg((pages >= 3)::int))::int as deep_visit_pct
from v
group by 1;

grant select on public.book_visit_segments to anon;

-- Reader survey answers (the optional 3-question card; enable with
-- PUBLIC_SURVEY=on in Vercel). target format: 'question:answer'
create view public.book_survey as
select
  split_part(target, ':', 1) as question,
  split_part(target, ':', 2) as answer,
  count(*)::int              as answers
from public.book_events
where event_type = 'answer' and target like '%:%'
group by 1, 2;

grant select on public.book_survey to anon;
```

## v3 migration (sponsor metrics) — run once

Adds engaged-session counting and reading-rhythm data. No new tracking —
new angles on existing events.

```sql
-- book_stats gains engaged_views (>= 3 min active reading) at the end.
-- CREATE OR REPLACE allows appending columns.
create or replace view public.book_stats as
select
  path,
  count(*)::int                                   as views,
  round(avg(depth))::int                          as avg_depth,
  round(avg(seconds))::int                        as avg_seconds,
  round(100.0 * avg((depth >= 90)::int))::int     as completion_pct,
  count(*) filter (where device = 'mobile')::int  as mobile_views,
  max(ts)                                         as last_view,
  count(*) filter (where seconds >= 180)::int     as engaged_views
from public.book_events
where event_type = 'view'
group by path;

-- Reading rhythm: views by weekday and hour, Swedish time
create view public.book_hours as
select
  extract(isodow from ts at time zone 'Europe/Stockholm')::int as dow,
  extract(hour from ts at time zone 'Europe/Stockholm')::int   as hour,
  count(*)::int                                                as views
from public.book_events
where event_type = 'view'
group by 1, 2;

grant select on public.book_hours to anon;
```

## v5 migration (agent readers — MCP usage) — run once

The MCP server logs anonymous usage into the same store: which client
software connects, which chapters agents read, what they search for.
No IPs, no identifiers.

```sql
alter table public.book_events
  drop constraint book_events_event_type_check;

alter table public.book_events
  add constraint book_events_event_type_check
  check (event_type in ('view', 'click', 'answer', 'mcp'));

create view public.book_agent_stats as
select
  split_part(target, ':', 1) as kind,     -- connect | read | search | tool
  substring(target from position(':' in target) + 1) as detail,
  count(*)::int  as events,
  max(ts)        as last_event
from public.book_events
where event_type = 'mcp' and target like '%:%'
group by 1, 2;

grant select on public.book_agent_stats to anon;
```

## v6 migration (listening stats) — run once

Listen starts + actual listened seconds per chapter. Decides whether
premium pre-generated audio is worth building.

```sql
create view public.book_listens as
select
  path,
  count(*) filter (where target = 'listen')::int                    as starts,
  round(avg(seconds) filter (where target = 'listen-done'))::int    as avg_listen_seconds,
  count(*) filter (where target = 'listen' and device = 'mobile')::int as mobile_starts
from public.book_events
where event_type = 'click' and target in ('listen', 'listen-done')
group by path;

grant select on public.book_listens to anon;

-- Keep listen events out of the outbound-clicks table
create or replace view public.book_clicks as
select
  coalesce(target, '(unknown)') as target,
  count(*)::int                 as clicks,
  max(ts)                       as last_click
from public.book_events
where event_type = 'click' and target not in ('listen', 'listen-done')
group by 1;
```

## v7 migration (chapter feedback) — run once

One-tap thumbs per chapter. Sparse but directional: thumbs-down + funnel
drop-off on the same chapter = next month's revision target.

```sql
create view public.book_ratings as
select
  path,
  count(*) filter (where target = 'rating:up')::int   as up,
  count(*) filter (where target = 'rating:down')::int as down,
  max(ts)                                             as last_vote
from public.book_events
where event_type = 'answer' and target like 'rating:%'
group by path;

grant select on public.book_ratings to anon;

-- Keep ratings out of the survey table
create or replace view public.book_survey as
select
  split_part(target, ':', 1) as question,
  split_part(target, ':', 2) as answer,
  count(*)::int              as answers
from public.book_events
where event_type = 'answer' and target like '%:%' and target not like 'rating:%'
group by 1, 2;
```

## Later, if you want more

- Cleanup: `delete from book_events where ts < now() - interval '12 months'`.
- Rate limiting if abuse ever appears: move the insert behind a Supabase Edge
  Function. Not worth the complexity until then.

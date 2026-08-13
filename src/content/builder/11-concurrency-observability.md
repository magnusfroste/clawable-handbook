---
title: "Concurrency & Observability"
description: "Lane-based locking, trace IDs, and production debugging — the infrastructure that keeps autonomous agents from colliding."
order: 11
icon: "eye"
---

## The Collision Problem

Think of it as two people editing the same Google Doc at the same time — neither sees what the other is typing, and every few minutes the document just resets to an old version. That's what happens when an autonomous agent is running multiple surfaces without coordination.

An autonomous agent isn't one process. It's multiple surfaces sharing the same database, the same skills, and the same memory:

```
Surface 1: HEARTBEAT        (cron, owner-set cadence)
Surface 2: AGENT-OPERATE    (admin interaction)
Surface 3: CHAT-COMPLETION  (visitor chat)
Surface 4: WEBHOOKS          (external triggers)
```

What happens when a heartbeat fires while the admin is mid-conversation with the agent? Both try to:
- Read and write to `agent_memory`
- Execute skills that modify state
- Update `agent_objectives` progress
- Log to `agent_activity`

Without coordination, you get:
- **Race conditions** — heartbeat overwrites memory that operate just wrote
- **Duplicate work** — both surfaces execute the same pending automation
- **Corrupted state** — partial writes from interrupted operations
- **Billing surprises** — parallel API calls double your token spend

---

## Lane-Based Locking

FlowPilot uses a simple, effective concurrency model: **lane-based advisory locks** stored in the `agent_locks` table.

### The Model

Each agent surface claims a "lane" before operating. Only one process can hold a lane at a time.

```sql
CREATE TABLE agent_locks (
  lane        TEXT PRIMARY KEY,
  locked_by   TEXT NOT NULL,
  locked_at   TIMESTAMPTZ DEFAULT now(),
  expires_at  TIMESTAMPTZ DEFAULT now() + interval '5 minutes'
);
```

### Acquiring a Lock

```typescript
import { tryAcquireLock, releaseLock } from '../_shared/concurrency.ts';

// In heartbeat
const acquired = await tryAcquireLock(supabase, 'heartbeat', 'heartbeat-cron', 300);
if (!acquired) {
  console.log('[heartbeat] Another instance is running, skipping');
  return; // Graceful exit, no error
}

try {
  // ... run heartbeat logic ...
} finally {
  await releaseLock(supabase, 'heartbeat');
}
```

### Lock Lanes

| Lane | Holder | Purpose |
|------|--------|---------|
| `heartbeat` | Cron trigger | Prevents overlapping heartbeat cycles |
| `operate` | Admin session | Prevents heartbeat from interfering with interactive use |
| `automation:{id}` | Heartbeat | Prevents duplicate automation execution |
| `objective:{id}` | Any surface | Prevents parallel progress on same objective |

### TTL-Based Expiry

Locks auto-expire after 5 minutes (configurable). This prevents deadlocks from crashed processes:

```sql
-- The RPC function checks expiry atomically
CREATE OR REPLACE FUNCTION try_acquire_agent_lock(
  p_lane TEXT, p_locked_by TEXT, p_ttl_seconds INT DEFAULT 300
) RETURNS BOOLEAN AS $$
BEGIN
  -- Delete expired locks
  DELETE FROM agent_locks WHERE lane = p_lane AND expires_at < now();
  -- Try to insert
  INSERT INTO agent_locks (lane, locked_by, expires_at)
  VALUES (p_lane, p_locked_by, now() + (p_ttl_seconds || ' seconds')::interval)
  ON CONFLICT (lane) DO NOTHING;
  -- Check if we got it
  RETURN EXISTS (
    SELECT 1 FROM agent_locks
    WHERE lane = p_lane AND locked_by = p_locked_by
  );
END;
$$ LANGUAGE plpgsql;
```

### Why Not Redis?

For a self-hosted system running on a single Supabase instance, PostgreSQL advisory locks are:
- **Simpler** — no additional infrastructure
- **Sufficient** — agent concurrency is low (max 4-5 concurrent surfaces)
- **Persistent** — lock state survives edge function cold starts
- **Auditable** — you can query `agent_locks` to see current state

Redis would be overkill. If you're running hundreds of agent instances, you need Redis (or something equivalent). For a single-tenant self-hosted deployment, PostgreSQL is the right tool.

---

## Trace IDs: Following the Thread

The heartbeat runs 11 operations in 45 seconds — self-healing, planning, automating, reflecting, remembering. Without a trace ID, debugging is like trying to piece together a crime scene from scattered witnesses who don't agree on the timeline.

With a trace ID, you get a complete story. Every operation in a single autonomous run is linked under one ID. You can see what happened — in order, from start to finish.

When a heartbeat runs, it might:
1. Self-heal 2 skills
2. Advance 3 objective steps
3. Execute 2 automations
4. Reflect on 7 days of performance
5. Save 4 memories

That's 11+ operations across multiple tables. Without a correlation ID, debugging is archaeology — piecing together timestamps and hoping they align.

### The Solution

Every autonomous run generates a **trace ID** that flows through the entire operation chain:

```typescript
import { generateTraceId } from '../_shared/trace.ts';

const traceId = generateTraceId('hb'); // hb_m3k9f2_a7x2p1
```

The trace ID is:
- **Human-readable** — prefix tells you the surface (`hb` = heartbeat, `op` = operate)
- **Sortable** — timestamp component enables chronological ordering
- **Unique** — random suffix prevents collisions

### Propagation

The trace ID is passed through every function call and stored in every activity log:

```typescript
// Heartbeat creates trace
const traceId = generateTraceId('hb');

// Passed to reasoning engine
const result = await reason({
  ...config,
  metadata: { traceId },
});

// Stored in activity logs
await supabase.from('agent_activity').insert({
  skill_name: 'advance_plan',
  conversation_id: traceId,  // Reuses conversation_id for trace correlation
  status: 'success',
  token_usage: usage,
});
```

### Querying by Trace

"Show me everything that happened in the last heartbeat":

```sql
SELECT skill_name, status, duration_ms, token_usage, created_at
FROM agent_activity
WHERE conversation_id = 'hb_m3k9f2_a7x2p1'
ORDER BY created_at;
```

This returns the complete story of a single autonomous run — every skill called, every result, every failure — in chronological order.

---

## The Activity Log: Structured Observability

Every agent action is logged to `agent_activity` with a consistent schema:

```typescript
{
  id: uuid,
  agent: 'flowpilot' | 'visitor_chat',
  skill_name: string,           // What was attempted
  skill_id: uuid | null,        // Link to skill definition
  status: 'success' | 'error' | 'pending_approval' | 'skipped',
  input: json,                  // What was sent (sanitized)
  output: json,                 // What came back
  error_message: string | null, // If failed, why
  token_usage: {                // Cost tracking
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  },
  duration_ms: number,          // Performance tracking
  conversation_id: string,      // Trace ID for correlation
  created_at: timestamptz
}
```

### What This Enables

1. **Cost attribution** — Which skills consume the most tokens?
2. **Performance monitoring** — Which skills are slowest?
3. **Failure tracking** — Which skills fail most often? (feeds self-healing)
4. **Audit trail** — What did the agent do, when, and why?
5. **Trace reconstruction** — Follow a single autonomous run end-to-end

---

## Self-Healing: Observability as Input

The activity log isn't just for humans. During the self-heal phase of every heartbeat — chapter 10's step one, with the full quarantine implementation in chapter 31 — **the agent monitors itself and acts on what it sees.** A failing skill doesn't just generate alerts; it gets quarantined automatically. And the uglier failure class — the model hallucinating tool calls that don't exist — gets a recovery pattern of its own in chapter 32.

---

## The Engine Room Dashboard

All observability data surfaces in the admin UI through the "Engine Room" — a real-time view of agent operations:

| Panel | Data Source | Shows |
|-------|------------|-------|
| Activity Feed | `agent_activity` | Recent actions with status, duration, tokens |
| Token Spend | `agent_activity.token_usage` | Cumulative cost by skill and time period |
| Skill Health | `agent_activity` aggregated | Success rates, failure streaks |
| Active Locks | `agent_locks` | Currently held lanes |
| Memory Usage | `agent_memory` count | Total memories by category |
| Objectives | `agent_objectives` | Progress on active goals |

The Engine Room answers the operator's core question: **"What is my agent doing right now, and is it working?"**

### The Next Surface: The Trace

There is a harder question the dashboard does not answer: *why did the agent do that?* Everything needed is already recorded — trace IDs correlate a run, the activity log holds verbatim inputs and outcomes, the approval queue holds what a human gated. What is missing is a read model that assembles them into one story per run:

```
trigger (heartbeat / cron / chat / external agent)
  └─ context loaded    (objectives in scope, memories hit, knowledge retrieved)
      └─ skills surfaced (the ranked shortlist — and why each one ranked)
          └─ model chose  (skill + arguments, verbatim)
              └─ policy    (each guard: passed, gated, or escalated — and why)
                  └─ result (the verified outcome, not the model's summary)
```

This is worth building for a reason bigger than debugging convenience. Reading the harness's own logs is how production bugs actually get found — it is the method that produced most of the war stories in this book. Making that method a surface turns it from a skill a few engineers have into something anyone can do. `partial` — the data layer is shipped, the surface is the next build.

And it is what makes the accountability promise real. Every deployment tells its customers *"audit the agent the way you audit an employee."* Without a trace view, that is a slogan: the data exists, but reading it takes hand-written SQL. With one, it is a click — every autonomous action, why it was chosen, what gated it, what a human approved.

---

## The Anti-Patterns

| Anti-Pattern | Consequence | Fix |
|---|---|---|
| No concurrency control | Race conditions, duplicate work | Lane-based locking |
| No trace IDs | Can't debug autonomous runs | Generate and propagate trace IDs |
| Unstructured logs | `console.log` everywhere, no queryable data | Structured activity log |
| Logs for humans only | Agent can't learn from its failures | Self-healing reads activity log |
| No TTL on locks | Crashed process holds lock forever | Auto-expiry with TTL |
| Over-engineering (Redis, Kafka) | Complexity without benefit for single-tenant | PostgreSQL is sufficient |

---

*Concurrency and observability aren't glamorous. They're plumbing. But plumbing is what separates a demo from a product. Without it, your agent works in the lab and fails in production. With it, you can sleep while your agent runs — and know exactly what it did when you wake up.*

*Next: the protocol that makes every skill reachable by any agent — and why it won. [MCP: Under the Hood →](/builder/12-mcp-deep-dive)*

---
title: "AgentHotel — Running a Fleet of Agents"
description: "How to host many autonomous agents — Hermes, OpenClaw and more — on one server of your own, keep any one of them from taking the others down, and put them to work from the AI tools you already use."
order: 33
icon: "building-office-2"
---

## From One Agent to a Fleet

The jump from "I run an agent" to "I operate a fleet of them" is where most self-hosted agent projects stall. Not because the agents get harder — because everything around them does. [AgentHotel](https://github.com/magnusfroste/agenthotel) is the layer this project built to cross that gap: a self-hosted control panel that turns one server into a hotel for agents.

## Executive Takeaway

If you only remember three things from this chapter, remember these:

1. **One server, many agents, none starving the others.** Every agent gets its own isolated container, domain, certificate and resource cap — and the panel protects itself from its own fleet.
2. **Runtime-agnostic.** Hermes, OpenClaw and Odysseus run side by side, next to any Docker image or Compose stack. The fleet is not a bet on one framework.
3. **Delegation over MCP.** The AI tools you already use can check agents in, hand them work and read the results — no separate orchestration product required.

---

## Where It Came From

We did not set out to build a hosting product. We started with exactly one OpenClaw QA agent helping FlowPilot through `/v1/responses` and A2A. It worked well enough that we added more specialist Claws — SEO, Dev, Research — and the question changed from *does the pattern work?* to *how do we run many of these without becoming a full-time infrastructure team?*

The first answer was **ClawClass**: OpenClaw-only swarm infrastructure, with role presets and an orchestration layer bundled on top. The QA agent in chapters 27 and 28 ran on it. Operating it made two things clear. The runtime is not the stable part — within months, Hermes (the learning-loop runtime the third handbook is built on) mattered as much as OpenClaw, and a fleet locked to one framework ages with that framework. And the problems worth solving once, for every agent, turned out to be the ones every hosting platform has: isolation, resource contention, secrets, observability. ClawClass grew into AgentHotel around those.

---

## The Problem It Solves

Running several agents on your own server by hand means Docker commands per agent, a reverse-proxy entry per domain, certificates to renew, and provider API keys copy-pasted into env files. Annoying, but survivable.

What is not survivable is contention. Agents are bursty. A browser-automation task or a long reasoning chain can pin a CPU or exhaust memory, and on a shared host one runaway guest takes down every other guest — and, if you are unlucky, the panel you would use to stop it.

---

## The Hotel Model

The metaphor is not decoration. It is how the panel is built:

| Front desk | What it does |
|---|---|
| **Check in** | Pick a runtime, name the agent. Domain, TLS and routing are automatic. |
| **Rooms** | Each agent runs capped at its own RAM and CPU, so no guest starves the others — or the hotel. |
| **No vacancy** | The panel warns you before you overbook the host, not after. |
| **Guests remember** | Sessions, memory and workspace files live in volumes that survive restarts and redeploys. |
| **Room keys** | Provider API keys are configured once and injected into the agents that need them. |
| **Housekeeping** | Unused images and build cache are reclaimed on a schedule; agent data never is. |
| **The ledger** | Health, uptime, resource use and events — in the UI or over MCP. |

The detail that matters most in production is in *Rooms*. Agent containers run at low CPU priority and are first in line if the host runs out of memory; the panel's own containers sit at the opposite end of both. Priority only bites under saturation, so agents still use all the idle capacity they want — but when the host is under pressure, the kernel sacrifices a guest before it sacrifices the front desk. The panel stays reachable, so you can always stop whatever is misbehaving. `validated` against the repository's container configuration.

---

## Runtimes, Not a Runtime

| Runtime | What it is |
|---|---|
| **Hermes** | NousResearch's agent, with a native learning loop |
| **OpenClaw** | The persistent agent this handbook is built around |
| **Odysseus** | A self-hosted AI workspace with browser tooling |
| **Docker App / Git App** | Any image — or any repository with a Dockerfile, including the MCP tools your agents call |
| **Compose** | A full `docker-compose.yml` stack |

Two design choices here are worth copying into any agent platform.

**Providers are fleet-level, and switching is live.** Add a model provider once; its keys go into new agents automatically and into existing ones on their next redeploy. OpenClaw and Hermes list every configured provider — including private, self-hosted endpoints — in their own model pickers, so moving an agent to a different model is a choice, not a redeploy. Chapter 5b's model-agnostic harness, applied to a whole fleet.

**No silent fallback.** Point the fleet at your own hardware and the panel probes each model. If one is too small for a runtime to work with, it declines it and says so — rather than quietly routing to a hosted API instead. For anyone running private models for data-sovereignty reasons, that is the point: a platform that silently sends your data elsewhere when your own model is inconvenient is not private.

---

## Putting Agents to Work Over MCP

The panel exposes its own MCP server: fleet tools (`list_agents`, `create_agent`, `redeploy_agent`, `get_agent_logs`), observability tools (`health_check`, `get_uptime`, `get_events`) — and the three that turn a hosting panel into a delegation layer:

- **`ask_agent`** hands a hosted agent a task. Synchronously it returns the reply; with `background: true` the call returns immediately, the agent keeps working, and you read the outcome from its logs. A correction is simply another `ask_agent` — it lands in the same conversation, so the agent keeps its context.
- **`set_agent_env`** gives an agent the credentials its next job needs, stored in its configuration.
- **`exec_in_agent`** runs a command inside the agent's container, for inspection.

This moves the "CEO layer" out of a bundled product and into whatever AI tool you already work in. The orchestrator is the assistant on your desk; the fleet is a set of tools it can call.

One field lesson deserves its own line, because it generalizes far beyond this panel. **Secrets belong in configuration, never in the task message.** Two agents were given the same job; one had the tool's API token in its environment, the other was told the token in the task. Both worked — until a restart. The one with the token in its config kept working; the other lost it with the conversation and failed with an authentication error that looked exactly like a broken tool. It is chapter 15's two tiers of metadata, seen from the operations side: *where* something lives decides whether it survives. (`set_agent_env` also reports variable names only, never values, so a secret never lands in the calling agent's transcript.)

---

## The Governance Implication

Chapter 23 argued that every deployment needs a named chain of responsibility. A fleet makes that chain physical:

| Responsibility | Where it lives in a fleet |
|---|---|
| **Sets the objective** | The human who dispatches the work |
| **Delegates** | The AI tool calling `ask_agent` |
| **Operates** | The panel — provisioning, resource caps, uptime, the event ledger |
| **Executes** | The hosted agent, inside its room |

The Agent Manager role is not abstract here. It is the person deciding which guests to check in, which provider each one runs on, what each is allowed to reach — and reading the ledger when something goes down.

---

## Getting Started

Point DNS at the server first — a wildcard record is simplest, since every agent gets its own subdomain and its certificate is requested the first time that name is visited. Then, on a fresh Ubuntu or Debian VPS:

```bash
git clone https://github.com/magnusfroste/agenthotel.git
cd agenthotel
./install.sh
```

That is the whole install: Docker, the images and the panel. Open the server's address, create the admin account, add a model provider, and check in the first agent.

Sizing: the panel itself runs on 1 vCPU and 1 GB. Each Hermes or OpenClaw agent typically wants 0.5–1 GB of its own, so plan on 2 vCPU / 4 GB for one or two agents, and 4 vCPU / 8 GB for a handful.

---

## Why This Matters Beyond Getting Started

This chapter repeats, one level down, what the whole handbook argues: **the value is not in the agent, it is in the system around the agent.** Chapter 5b mapped that system for one agent. A fleet adds the components no single agent can supply for itself — isolation, resource policy, shared credentials, uptime, and a ledger of what happened — and makes them the same for every runtime.

The path from "I run an agent" to "I operate a fleet of them" now has a practical on-ramp: one server and an afternoon.

---

*Next: giving your agent eyes on the web — public scraping, Chrome Extension relay, and Signal Capture. [The Browser Operator →](/builder/34-browser-operator)*

*AgentHotel source: [github.com/magnusfroste/agenthotel](https://github.com/magnusfroste/agenthotel). Its predecessor, ClawClass, remains at [github.com/magnusfroste/clawclass](https://github.com/magnusfroste/clawclass).*

---
title: "Appendix: Sources & Evidence"
description: "Primary sources for every claim in this handbook, grouped by topic, with verification status and evidence labels."
order: 90
icon: "link"
appendix: true
---

Every factual claim in this handbook falls into one of three evidence categories:

| Label | Meaning |
|-------|---------|
| `validated` | Observed in a production run, logged, timestamped, reproducible against the referenced artifact |
| `partial` | Part of the behavior observed; remaining claim is directional extension |
| `hypothesis` | Directional claim awaiting data; flagged in-text when used |

This appendix lists the primary sources behind every numeric, institutional, or attributed claim.

---

## OpenClaw Origin & Ecosystem

| Source | Type | Status |
|--------|------|--------|
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | Source code, release history | `validated` |
| [steipete.me: OpenClaw, OpenAI and the future](https://steipete.me/posts/2026/openclaw) (Feb 14, 2026) | Steinberger's own post — builder-not-founder quote | `validated` |
| [Lex Fridman Podcast #491](https://www.youtube.com/watch?v=YFjfBk8HI5o) (Feb 11, 2026) | Peter Steinberger interview | `validated` |
| [Fortune: Who is Peter Steinberger?](https://fortune.com/2026/02/19/openclaw-who-is-peter-steinberger-openai-sam-altman-anthropic-moltbook/) | Background profile | `validated` |
| [CNBC: Jensen Huang "next ChatGPT"](https://www.cnbc.com/2026/03/17/nvidia-ceo-jensen-huang-says-openclaw-is-definitely-the-next-chatgpt.html) | Jensen Huang quotes, GTC 2026 | `validated` |
| [TechMarketer: GTC 2026 full breakdown](https://thetechmarketer.com/nemoclaw-nvidia-ai-agent-framework/) | All Huang quotes verified in full text | `validated` |
| [openclaw v2026.3.28 release](https://github.com/openclaw/openclaw/releases/tag/v2026.3.28) | Async approval, plugin gating | `validated` |
| [openclaw v2026.4.1](https://github.com/openclaw/openclaw/releases/tag/v2026.4.1) | /tasks, SearXNG, cron allowlists | `validated` |

---

## MCP Protocol & Standardization

| Source | Type | Status |
|--------|------|--------|
| [Model Context Protocol specification](https://modelcontextprotocol.io) | Primary protocol docs | `validated` |
| OpenAI Agents SDK announcement (April 15, 2026) | MCP as first-class primitive | `validated` |
| [AGENTS.md pattern](https://agents.md) | Custom instructions format | `validated` |
| [agentskills.io](https://agentskills.io) | Skill distribution model | `validated` |

---

## The Automation Ceiling — Statistics

| Source | Claim | Status |
|--------|-------|--------|
| [Salesforce State of Sales, 7th edition](https://www.salesforce.com/form/state-of-sales/) | 29% of salesperson time on actual selling (n=5,500 across 27 countries) | `validated` |
| [Stampli AP Benchmarks 2024](https://www.stampli.com/ebooks/state-of-ap) | 67% of AP teams manually enter invoices despite ERP | `validated` |
| [GBTA Expense Report Study](https://www.gbta.org/research/) | $58 average processing cost, 20 minutes per report, 19% contain errors | `validated` |
| Quota attainment — multiple industry surveys | 84% missed quota in 2023 | `partial` — widely cited; exact attribution varies |

---

## Workforce Disruption & Business-Case Quotes

| Source | Type | Status |
|--------|------|--------|
| [BBC: Oracle restructuring (Mar 31, 2026)](https://www.bbc.co.uk/news/articles/cm296jzzl9yo) | Large-scale AI-linked restructuring coverage | `validated` |
| [IBT: Larry Ellison on AI and staffing](https://www.ibtimes.co.uk/oracle-ai-layoffs-tech-workers-1789767) | *"We can build more software in less time with fewer people using AI."* — direct quote | `validated` |
| [HBR: To Thrive in the AI Era, Companies Need Agent Managers](https://hbr.org/2026/02/to-thrive-in-the-ai-era-companies-need-agent-managers) (Feb 12, 2026) | Agent Manager role, Zach Stauber profile and quote | `validated` |

---

## Governance & Organizational Frameworks

| Source | Framework | Status |
|--------|-----------|--------|
| [McKinsey: Trust in the Age of Agents](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/trust-in-the-age-of-agents) (Mar 5, 2026) | Four-layer accountability: Design / Deploy / Operate / Review | `validated` |
| [McKinsey: State of Organizations 2026](https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/the%20state%20of%20organizations/2026/the-state-of-organizations-2026.pdf) | Nine shifts reshaping organizations | `validated` |
| [McKinsey: The Agentic Organization](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era) (Sep 2025) | Operating-model contours | `validated` |
| [Singapore AIGL: Model AI Governance Framework for Agentic AI v1.0](https://www.aigl.blog/model-ai-governance-framework-for-agentic-ai-version-1-0/) (Feb 2026) | Four governance principles | `validated` |
| [IJRSI: When AI Agents Act](https://rsisinternational.org/journals/ijrsi/view/when-ai-agents-act-governance-accountability-and-strategic-risk-in-autonomous-organizations) | Governance, accountability, strategic risk | `validated` |

---

## Atonom / Lovable CRM Case Study (Ch07)

| Source | Claim | Status |
|--------|-------|--------|
| [Lovable: How a startup replaced a $40,000 Salesforce contract](https://lovable.dev/blog/how-a-startup-replaced-a-salesforce-contract-with-a-lovable-built-crm) (Feb 24, 2026) | Atonom CRO Gabe Larsen cited by name. $40,000/yr Salesforce (25–30 users) → $1,200/yr Lovable-built CRM incl. hosting. Built by Head of Finance in 3 hours. CRM admin eliminated. | `validated` — primary source, named individuals, Lovable's own case study |
| Widely covered (Economic Times, AIBase, dKambio, Mar 2026) | Same facts confirmed across 6+ independent publications | `validated` |
| "97 percent cost reduction" | ($40,000 − $1,200) / $40,000 = 97% — direct arithmetic from the primary source | `validated` |
| "covered the same core operations and expanded beyond them" | Lovable case study documents lead tracking, ARR/MRR, pipeline, plus financial dashboards and AI agent integration not available in Salesforce | `validated` |

---

## Valuations & Market Signals

| Source | Claim | Status |
|--------|-------|--------|
| [OpenAI/Windsurf $3B acquisition coverage](https://lumichats.com/blog/openai-windsurf-acquisition-ai-coding-2026-explained) | Deal announced May 2025, collapsed July 2025 | `validated` |
| [Google/Windsurf $2.4B talent deal](https://neuron.expert/news/google-acquires-windsurf-executives-to-enhance-ai-coding-capabilities/) | Successor arrangement, July 2025 | `validated` |
| [Lovable $6.6B valuation](https://ceowire.co/startups/lovable-seeks-acquisitions-vibe-coding-6-billion-startup) (Mar 24, 2026) | Market signal | `validated` |
| Cursor valuation coverage (Bloomberg, March 2026) | $29–50B range | `partial` — multiple press sources, no single primary filing |

---

## This Handbook's Own Evidence — SIM Logs

All findings attributed to Clawable operating FlowWink live can be cross-checked against the following artifacts:

| Artifact | Location | What it contains |
|----------|----------|------------------|
| April 19 heartbeat sweep | Clawable session log (April 19, 2026) — referenced in Ch03 §Day One | €1.1M surfaced in a single autonomous sweep, 44 seconds to first finding. Triggered by clock, not prompt. | `validated` |

---

## FlowWink Platform — Internal Reference

| Source | Type |
|--------|------|
| `/root/flowwink/docs/modules/` | Module surface documentation (250+ skills) |
| `/root/openclaw/` | OpenClaw local fork — architecture claims verified here |
| FlowWink production deployment | Edge functions, skills, MCP server |
| `clawthree.froste.eu` / `clawwink.froste.eu` | Clawable operator deployments on ClawClass |

---

## Agentic Security — Frontier Evidence

| Source | Type | Status |
|--------|------|--------|
| [The Next Web: Anthropic's most capable AI escaped its sandbox](https://thenextweb.com/news/anthropics-most-capable-ai-escaped-its-sandbox-and-emailed-a-researcher-so-the-company-wont-release-it) (Apr 8, 2026) | Mythos incident — sandbox escape, researcher email, public exploit posting | `validated` |
| [Medium: The Anthropic Mythos Incident](https://medium.com/@waheedkhan.ai/the-anthropic-mythos-incident-when-ai-broke-containment-42a1426ce2d5) (Apr 16, 2026) | Technical detail — Kubernetes sandbox, breach discovery timeline | `validated` |
| [Medium: Anthropic Put Their Most Powerful AI in a Locked Sandbox](https://medium.com/@senaaravichandran/anthropic-put-their-most-powerful-ai-in-a-locked-sandbox-and-told-it-to-try-escaping-a81df4b5ae1a) (Apr 13, 2026) | Mythos system card summary — git history rewrite, psychiatrist evaluation | `validated` |
| [TechMarketer: NemoClaw — Nvidia AI Agent Framework](https://thetechmarketer.com/nemoclaw-nvidia-ai-agent-framework/) | NemoClaw sandboxed runtime — Nvidia's hardened agent security response | `validated` |
| Anthropic Project Glasswing announcement | Restricted-access programme — 12 institutional partners, up to $100M API access | `validated` |
| IBM: "Without a decisioning engine..." | IBM Think agentic AI governance framework | `validated` |
| [beam.ai: Agent Managers — The New Role](https://beam.ai/agentic-insights/what-is-an-agent-manager-the-new-role-every-ai-company-needs-in-2026) (Feb 13, 2026) | HBR's 6 Agent Manager competencies with field commentary | `validated` |
| [HBR: To Thrive in the AI Era, Companies Need Agent Managers](https://hbr.org/2026/02/to-thrive-in-the-ai-era-companies-need-agent-managers) (Feb 12, 2026) | Zach Stauber / Salesforce — Agent Manager role definition and daily practice | `validated` |
| ATM / bank teller employment paradox | James Bessen, *Learning by Doing* (Yale UP, 2015); NBER working paper 2016; BLS Historical Statistics | `partial` — teller count grew 2%/year since 2000 (Bessen); "more than before ATMs existed" is directional, not a single verified headcount comparison |
| Gartner 80% customer service autonomous by 2029 | [Gartner press release, Mar 5, 2025](https://www.gartner.com/en/newsroom/press-releases/2025-03-05-gartner-predicts-agentic-ai-will-autonomously-resolve-80-percent-of-common-customer-service-issues-without-human-intervention-by-20290) | `partial` — projected outcome, not observed; year is 2029 (not 2028) |
| Gartner: 40%+ of agentic AI projects cancelled by end of 2027 | Gartner strategic predictions, Feb 2026 — cited in mavenagi.com recap Mar 31, 2026 | `partial` — forward projection |
| Western Union / Bell telephone — $100,000 rejected 1876 | American Heritage magazine; historyofphonephreaking.org (Jan 2011); True West Magazine | `validated` — story confirmed; exact wording of committee report disputed in scholarship; confirmed phrases: "utterly unreasonable" and "inherently of no value to us" |
| Salesforce State of Sales — under 30% selling time | [Salesforce State of Sales 2024](https://www.salesforce.com/ap/news/press-releases/2024/08/01/salesforce-report-sales-professionals-in-singapore-spend-just-29-of-their-time-selling/) | `validated` — 5,500 respondents, 27 countries; global figure ~28-30%; 29% figure is Singapore-specific subset |
| Larry Ellison "build more software in less time with fewer people" | [The Register, Mar 11, 2026](https://www.theregister.com/2026/03/11/oracle_says_ai_coding_tools); [inkl.com summary, Apr 1, 2026](https://www.inkl.com/news/larry-ellison-says-ai-now-does-oracle-s-coding-amid-mass-layoffs-3-strategic-moves-for-tech-workers) | `validated` — Oracle Q3 FY2026 earnings call, March 10-11, 2026 |

---

## Sundin / Den Femte Accelerationen (Ch16 — Return on Intelligence)

| Source | Type | Status |
|--------|------|--------|
| Mathias Sundin, *Den Femte Accelerationen* (Volante, Nov 2025) — ch. "Avkastning på Intelligens" | Richard Maltsbarger (Pet Valu CEO) quote: AI as "eager but naive new employee" | `validated` — direct quote via Sundin |
| Sundin, ibid. | Carl-Henric Svanberg (former Ericsson CEO, Volvo chairman) — dartboard/direction metaphor for leadership in uncertain environments | `validated` — attributed quote via Sundin |
| Klarna press release, 2024 | AI customer service agent handles 2/3 of all inquiries, equivalent to 700 FTEs, faster and multilingual | `validated` — Klarna's own announcement |
| Press reporting, 2025 | Klarna begins rehiring customer service staff — customers preferred human contact for certain issue types | `validated` — widely reported |
| Toyota Production System | Bottom-up continuous improvement — any worker can stop the line; small distributed changes over large centralized rollouts | `validated` — extensively documented in operations management literature |

---

## FlowWink MCP Surface (Chs 12, 14, 15, TL;DR)

| Claim | Source | Status |
|-------|--------|--------|
| FlowWink exposes 250+ MCP skills at time of writing | MCP server `tools/list` call against `https://<project-ref>.supabase.co/functions/v1/mcp-server` — response enumerated 250+ skills across Commerce/Finance, CRM, Content, Communication, Analytics, Growth, System, Search/Web, Automation, Infrastructure, and Accounting domains | `validated` — live endpoint enumeration |
| Earlier references cited lower counts | Platform surface expanded continuously since original SIM runs (April 19–20, 2026); accounting modules and cross-module skills added in subsequent updates | `validated` — reflects platform evolution |

---

## Evidence Discipline

If a chapter makes a claim and it is not traceable to a row in this appendix or a SIM log, the claim is either:

- A reasoned inference from the evidence (explicitly marked as such in-text), or
- A `hypothesis` that has not yet met the bar — and should be flagged with that label.

This is deliberate. A handbook that claims autonomous operation works should not itself operate on unverified claims.

---

*Last updated: April 22, 2026. URLs verified at time of research. Canonical registry: `src/content/SOURCES.md`.*

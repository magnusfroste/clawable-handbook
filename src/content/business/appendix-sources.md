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
| `/root/flowwink/docs/modules/` | Module surface documentation (300+ skills) |
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
| FlowWink exposes 300+ MCP skills at time of writing | MCP server `tools/list` call against `https://<project-ref>.supabase.co/functions/v1/mcp-server` — response enumerated 300+ skills across Commerce/Finance, CRM, Content, Communication, Analytics, Growth, System, Search/Web, Automation, Infrastructure, and Accounting domains | `validated` — live endpoint enumeration |
| Earlier references cited lower counts | Platform surface expanded continuously since original SIM runs (April 19–20, 2026); accounting modules and cross-module skills added in subsequent updates | `validated` — reflects platform evolution |

---

## SaaS MCP Adoption Spectrum (Ch 11)

| Claim | Source | Status |
|-------|--------|--------|
| Booking.com: community MCP wrappers preceded any official surface; official offering is a narrow search connector | Multiple community repositories on GitHub (e.g. `esakrissa/hotels_mcp_server`, `mcp-use/booking-com`, `samwang0723/mcp-booking`, `prakashsanker/flights-mcp-server`); official remote MCP at `demandapi-mcp.booking.com` exposes accommodation search, not operations | `validated` — repository and endpoint enumeration, July 2026 |
| Notion shipped a full read-write MCP surface early, before broad industry adoption of the standard | Notion hosted MCP server, launched 2025; became one of the fastest-growing integrations in the Claude ecosystem | `validated` |
| Airtable official MCP server launched February 2026 | [Airtable support documentation](https://support.airtable.com/docs/using-the-airtable-mcp-server); community server (`domdomegg/airtable-mcp-server`) predates it | `validated` |
| Data-gravity bet weakens under digital sovereignty; self-hosted data layer + governed operators + on-demand interfaces cover most of the operation | Author's reflection, anchored to the Atonom case (ch 3) | `hypothesis` — explicitly marked as reflection in ch 11 |

---

## The Frontier Labs' Agent Products (Ch 7)

| Claim | Source | Status |
|-------|--------|--------|
| OpenAI Codex: cloud coding agent, delegated tasks inside ChatGPT plus standalone macOS app (Feb 2026) | [Antigravity vs Codex comparison](https://www.eigent.ai/blog/antigravity-vs-codex); [XDA month-long test vs Claude Code](https://www.xda-developers.com/used-claude-code-google-antigravity-codex-for-month-have-clear-winner/) | `validated` |
| Google Antigravity: agent-first development environment with parallel-agent manager view, launched with Gemini 3 (Nov 2025), 2.0 adds CLI | [WeavAI Antigravity 2.0 review](https://weavai.app/blog/en/2026/05/22/google-antigravity-2-0-vs-openai-codex-2026-review/); [Eigent comparison](https://www.eigent.ai/blog/antigravity-vs-codex) | `validated` |
| Microsoft: agentic mode generally available in Word/Excel/PowerPoint (April 2026); Copilot call delegation in Teams; Copilot Studio autonomous agents with triggers/guardrails, A2A generally available | [Context Studios M365 agents guide](https://www.contextstudios.ai/blog/microsoft-365-ai-agents-the-complete-guide-to-building-and-running-agents-with-copilot-copilot-studio-and-agent-365-in-2026); [Copilot Studio May 2026 update](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/); [Microsoft Learn: autonomous agents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/autonomous-agents) | `validated` |
| xAI: Grok Code Fast 1 built for agentic coding (Aug 2025); Grok Build coding agent + CLI in beta (May 2026); post-acquisition plan to ship Grok Build inside Cursor with Grok as default | [Digital Applied: Grok 4.5 / Cursor flywheel](https://www.digitalapplied.com/blog/grok-4-5-cursor-data-flywheel-spacex-private-beta-2026); [IndMoney: the coding-gap rationale](https://www.indmoney.com/blog/us-stocks/spacex-cursor-ai-deal-xai-coding-gap-spacex-stock-rises); [TechTimes: model-choice risk](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm) | `validated` — products; the Grok-4.5-trained-on-Cursor-data claim is press-reported, `partial` |
| Agentic capability folding seamlessly into mainstream chat clients as a default | Author's trajectory read; already shipped at Microsoft (above), forecast for the rest | `hypothesis` |

---

## The June 2026 Model Access Events (Ch 7)

| Claim | Source | Status |
|-------|--------|--------|
| US export-control directive forced Anthropic to disable Fable 5 and Mythos 5 for all customers (June 12–13, 2026) | [Anthropic statement](https://www.anthropic.com/news/fable-mythos-access); [CNBC](https://www.cnbc.com/2026/06/12/anthropic-disables-access-to-fable-5-and-mythos-5-to-comply-with-government-directive.html); [Time](https://time.com/article/2026/06/13/anthropic-fable-mythos-ban-US-security/) | `validated` |
| OpenAI limited GPT-5.6 rollout to government-approved partners at the White House's request (June 25–26, 2026), stating it "shouldn't become the long-term default" | [CNBC](https://www.cnbc.com/2026/06/26/openai-limits-new-ai-models-to-trusted-partners-request-us-government.html); [TechCrunch](https://techcrunch.com/2026/06/26/openai-limits-gpt-5-6-rollout-after-government-request-says-restrictions-shouldnt-be-the-norm/) | `validated` |
| Restrictions on Fable 5 / Mythos 5 lifted June 30, 2026 | [CNBC](https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html); [Bloomberg](https://www.bloomberg.com/news/articles/2026-06-30/us-government-lifts-restrictions-on-anthropic-s-fable-5-model) | `validated` |

---

## The Receiving Organization (Chs 11, 15)

| Claim | Source | Status |
|-------|--------|--------|
| "The real question is not whether AI can create value... The question is whether the organization is built to receive the value"; measure AI maturity in value created (time freed, better decisions, shorter flows, raised quality), not pilots/licenses/lectures | Per Clingweld, Change Agent at AI Sweden — public LinkedIn post following Almedalen 2026 ([profile](https://www.linkedin.com/in/perclingweld/)) | `validated` — direct quote from public post |
| Satya Nadella describes future organizations as consisting of human capital plus "token capital" — the AI capability an organization builds on top of the models; post reached tens of millions of views within a week (mid-2026) | Satya Nadella, public post on the future organization, 2026; discussed in Per Clingweld's LinkedIn commentary | `validated` — widely circulated public post |
| ~90% of firms report zero measurable AI productivity impact over three years | NBER survey of ~6,000 CEOs/CFOs, reported via The CAIO newsletter #6 (June 2026) | `partial` — secondhand summary; verify against NBER working paper before quoting externally |
| Google published the Open Knowledge Format (OKF) v0.1 on June 12, 2026 — an open spec representing organizational knowledge as a directory of markdown files with YAML frontmatter and links; human-readable, agent-parseable, vendor-neutral | [Google Cloud blog](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing); [Search Engine Journal](https://www.searchenginejournal.com/google-cloud-announces-the-open-knowledge-format/579253/) | `validated` — v0.1 explicitly "a starting point, not a finished standard" |
| "A very confident intern with access to the wrong binder"; "knowledge hygiene" | Per Clingweld, public LinkedIn post on OKF, June 2026 (translated from Swedish) | `validated` — direct quote from public post |

## The Post-SaaS Question (Ch 13)

| Claim | Source | Status |
|-------|--------|--------|
| Satya Nadella: "SaaS is dead" — business applications are "CRUD databases with business logic"; in the agent era the logic moves to the agent tier | [BG2 podcast, December 2024](https://windows.gadgethacks.com/news/microsoft-ceo-nadella-saas-is-dead-ai-agents-take-over/); widely analyzed ([IDC](https://www.idc.com/resource-center/blog/is-saas-dead-rethinking-the-future-of-software-in-the-age-of-ai/)) | `validated` — direct public statement |
| IDC: by 2028 pure seat-based pricing obsolete; 70% of software vendors refactoring pricing around new value metrics | [IDC analysis](https://www.idc.com/resource-center/blog/is-saas-dead-rethinking-the-future-of-software-in-the-age-of-ai/) | `partial` — analyst projection |
| The laggard inversion and the five-year post-SaaS picture | Author's reflection, anchored to the decomposition demonstrated in chs 3, 11, 14 | `hypothesis` — explicitly marked |

## Mid-2026 Market Scale Signals (Ch 11)

| Claim | Source | Status |
|-------|--------|--------|
| 30% of organizations run AI agents in live production (up from 13% YoY); 50% lack clear human-AI teamwork guidance; 42% of frontline AI users save a full workday/week, 66% get little or no guidance on the recovered time; strategic clarity beats tool access on business impact 80% vs 60% | [BCG, *AI at Work 2026: Why Strategy Matters More Than Tools*](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools) — survey of 11,749 employees across 14 markets | `validated` — published survey |
| Mastercard launched Agent Pay for Machines (June 10, 2026) and partnered with Aave on agentic payments; Visa advanced agentic commerce with Nuvei and BBVA (July 2026) | Payments trade coverage, June–July 2026 (FinTech/Payments Fanatic newsletters; vendor announcements) | `validated` — vendor-announced programs |
| Amazon, Walmart, Uber, Cisco capping internal AI use as token bills outran budgets; Uber's 2026 AI allowance consumed by April; one CIO's spend up 7x overnight | Financial Times reporting, June 2026, via The CAIO newsletter #6 (Romano Roth) | `partial` — secondhand press summary; verify against FT original before quoting figures externally |
| Capgemini: scaled agent adoption tripled YoY while trust in fully autonomous agents fell 43% → 27%; 90% see human oversight as beneficial | Capgemini, *Rise of Agentic AI* (2026), survey of 1,500 executives across 14 countries | `partial` — reported via newsletter; primary report not yet checked |
| MIT Sloan negotiation tournament: warm agents outperformed ruthless agents, which drove impasses (40+ countries, agent-vs-agent round robin) | Vaccaro, Curhan, Aral (MIT Sloan), June 2026, via press coverage | `partial` — reported via newsletter |
| Anthropic cut third-party agent platforms off flat-rate Claude subscriptions (April 2026), forcing usage-based API access | Widely reported April 2026; Steinberger's public response | `validated` — widely covered platform-policy change |
| Gartner forecasts AI agent software spend of ~$206.5B in 2026, up 139% from $86.4B in 2025 | Gartner forecast, June 2026, as reported in [agentic AI trade coverage](https://aiagentstore.ai/ai-agent-news/2026-june) | `validated` — analyst forecast, not observed outcome |
| SAP "Autonomous Enterprise" announced at Sapphire 2026, incl. €100M partner fund; Anthropic Claude among foundation models for Joule | [SAP News](https://news.sap.com/2026/05/sap-sapphire-sap-unveils-autonomous-enterprise/); [Forbes](https://www.forbes.com/sites/victordey/2026/05/12/the-end-of-the-erp-era-sap-wants-ai-agents-to-run-your-autonomous-enterprise/) | `validated` |
| ServiceNow "Autonomous Workforce" across major business functions | [ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-brings-Autonomous-Workforce-to-every-major-business-function/default.aspx) | `validated` |
| Salesforce Agentforce ~29,000 deals / ~$800M ARR; Microsoft Copilot Studio ~160,000 orgs / 400,000+ custom agents | Vendor-reported figures, 2026 ([Microsoft Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization); market coverage) | `partial` — vendor-reported adoption metrics |

---

## Evidence Discipline

If a chapter makes a claim and it is not traceable to a row in this appendix or a SIM log, the claim is either:

- A reasoned inference from the evidence (explicitly marked as such in-text), or
- A `hypothesis` that has not yet met the bar — and should be flagged with that label.

This is deliberate. A handbook that claims autonomous operation works should not itself operate on unverified claims.

---

*Last updated: April 22, 2026. URLs verified at time of research. Canonical registry: `src/content/SOURCES.md`.*

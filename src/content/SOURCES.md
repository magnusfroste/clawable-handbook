# Sources & References — Builder Edition

All claims in the Builder Edition are sourced. This file lists primary sources by category.

> **Business Edition sources** are published as a reader-facing appendix with `validated / partial / hypothesis` tags on every claim:
> [`src/content/business/appendix-sources.md`](./business/appendix-sources.md)

---

## OpenClaw — Primary Sources

| Source | Type | Verified |
|--------|------|---------|
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | Source code | ✅ Local fork at `/Users/mafr/Code/github/openclaw` |
| `docs/concepts/system-prompt.md` | Architecture reference | ✅ Verified |
| `docs/gateway/heartbeat.md` | Heartbeat interval (30m default) | ✅ Verified |
| `src/agents/skills/workspace.ts:390` | SKILL.md discovery | ✅ Verified |
| `src/agents/tools/sessions-send-tool.ts:99` | A2A sessions | ✅ Verified |
| `src/agents/skills/refresh.ts:85-93` | File auto-discovery | ✅ Verified |
| [openclaw v2026.3.28 release](https://github.com/openclaw/openclaw/releases/tag/v2026.3.28) | Async approval, xAI/Grok, MiniMax, plugin gating | ✅ GitHub Release |
| [openclaw v2026.4.1](https://github.com/openclaw/openclaw/releases/tag/v2026.4.1) | Follow-up release: /tasks, SearXNG, cron allowlists, exec/plugin hardening | ✅ GitHub Release |
| [ClawHub](https://clawhub.ai) | Community skill/plugin marketplace | ✅ |

---

## NanoClaw — Primary Sources

| Source | Type | Verified |
|--------|------|---------|
| [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw) | Source code | ✅ GitHub |
| [NanoClaw Security Model](https://github.com/qwibitai/nanoclaw/security) — `docs/SECURITY.md` | Trust model, container isolation, OneCLI Vault, mount allowlist | ✅ Fetched |
| [VirtusLab: NanoClaw deep-dive](https://virtuslab.com/blog/ai/nano-claw-your-personal-ai-butler/) (Feb 25, 2026) | Architecture analysis, AI-native philosophy, ~500 LOC claim | ✅ Fetched |
| [VentureBeat: NanoClaw CVE story](https://www.venturebeat.com/orchestration/nanoclaw-solves-one-of-openclaws-biggest-security-issues-and-its-already-powering-the-creators-biz) (Feb 11, 2026) | Security background | ✅ |
| [Blink.new: OpenClaw vs NanoClaw comparison](https://blink.new/blog/openclaw-vs-nanoclaw-comparison-2026) (Mar 24, 2026) | Feature comparison | ✅ |

**Recommendation for deeper research:** Clone `qwibitai/nanoclaw` locally. The core is ~500 lines — verifiable in one session. Key files: `src/index.ts`, `docs/SECURITY.md`, `.claude/skills/`.

---

## SecureClaw & Security Ecosystem

| Source | Type | Verified |
|--------|------|---------|
| [adversa-ai/secureclaw](https://github.com/adversa-ai/secureclaw) (305 stars) | Plugin/skill | ✅ GitHub |
| [Adversa AI launch post](https://adversa.ai/top-opensource-openclaw-security-solution/) | OWASP v2.0 coverage | ✅ |
| [SecureClaw: 5 AI Security Frameworks](https://adversa.ai/blog/secureclaw-open-source-ai-agent-security-for-openclaw-aligned-with-owasp-mitre-frameworks/) | MITRE, NIST, EU AI Act mapping | ✅ |
| [prompt-security/clawsec](https://github.com/prompt-security/clawsec) (857 stars) | Cross-platform security suite | ✅ GitHub |

---

## NemoClaw / NVIDIA

| Source | Type | Verified |
|--------|------|---------|
| [NVIDIA Newsroom announcement](http://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw) (Mar 16, 2026) | Official press release | ✅ |
| [NVIDIA/NemoClaw GitHub](https://github.com/NVIDIA/NemoClaw/) | Source | ✅ GitHub |
| [CNBC: Jensen Huang "next ChatGPT"](https://www.cnbc.com/2026/03/17/nvidia-ceo-jensen-huang-says-openclaw-is-definitely-the-next-chatgpt.html) | Jensen Huang quotes | ✅ |
| [TechMarketer: GTC 2026 full breakdown](https://thetechmarketer.com/nemoclaw-nvidia-ai-agent-framework/) | Full architecture description, all Jensen Huang quotes verified | ✅ Fetched full text |
| [ZDNET: NemoClaw security stack](https://www.zdnet.com/article/nvidia-openclaw-nemoclaw-security-stack-gtc-2026/) | OpenShell description | ✅ |

---

## Peter Steinberger / OpenClaw Background

| Source | Type | Verified |
|--------|------|---------|
| [steipete.me: OpenClaw, OpenAI and the future](https://steipete.me/posts/2026/openclaw) (Feb 14, 2026) | Steinberger's own post | ✅ Fetched full text |
| [Lex Fridman Podcast #491](https://www.youtube.com/watch?v=YFjfBk8HI5o) (Feb 11, 2026, 1.1M views) | Peter Steinberger interview | ✅ |
| [Fortune: Who is Peter Steinberger?](https://fortune.com/2026/02/19/openclaw-who-is-peter-steinberger-openai-sam-altman-anthropic-moltbook/) | Background profile | ✅ |
| [OfficeChai: More than a decade in the making](https://officechai.com/ai/how-peter-steinbergers-openclaw-success-was-more-than-a-decade-in-the-making/) | Career history | ✅ |

---

## Agentic Control Plane — Claude Code, Cursor, Windsurf et al.

| Source | Type | Verified |
|--------|------|---------|
| [Claude Code architecture deep-dive](https://oldeucryptoboi.com/blog/claude-code-architecture/) (Mar 31, 2026) | Full architecture: agentic loop, ~26 tools, 5-layer permissions, Teams, CLAUDE.md | ✅ Fetched full text |
| [Claude Code internals Part 3: Message Structure](https://kotrotsos.medium.com/claude-code-internals-part-3-message-structure-d56172049973) | Messages API usage | ✅ |
| [claude-code/issues/20625](https://github.com/anthropics/claude-code/issues/20625) | Structured output schemas | ✅ |
| [cline/cline/issues/9848](https://github.com/cline/cline/issues/9848) | XML tool format leak bug | ✅ GitHub |
| [OpenAI acquires Windsurf $3B](https://lumichats.com/blog/openai-windsurf-acquisition-ai-coding-2026-explained) | Acquisition | ✅ |
| [Google acquires Windsurf executives $2.4B](https://neuron.expert/news/google-acquires-windsurf-executives-to-enhance-ai-coding-capabilities/) | Talent deal | ✅ |
| [Lovable $6.6B valuation, acquisition push](https://ceowire.co/startups/lovable-seeks-acquisitions-vibe-coding-6-billion-startup) | Mar 24, 2026 | ✅ |
| [HatchWorks: AI wrapper moat (Mar 31, 2026)](https://hatchworks.com/blog/gen-ai/ai-wrapper-product-strategy/) | Thin wrapper analysis | ✅ |

---

## API Layer

| Source | Type | Verified |
|--------|------|---------|
| [Portkey: Three API formats compared](https://portkey.ai/blog/open-ai-responses-api-vs-chat-completions-vs-anthropic-anthropic-messages-api) (Feb 23, 2026) | Chat Completions vs Responses vs Messages | ✅ Fetched full text |
| [LiteLLM docs: v1/messages → /responses mapping](https://docs.litellm.ai/docs/anthropic_unified/messages_to_responses_mapping) | Parameter translation | ✅ |
| [LiteLLM supply chain attack](https://medium.com/@cdcore/litellm-got-hacked-and-its-not-their-fault-704cea8d375e) (Mar 26, 2026) | Security incident | ✅ |
| [Anthropic: Advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use) (Nov 24, 2025) | tool_use blocks, Agent SDK | ✅ |

---

## Workforce Disruption & Governance

| Source | Type | Verified |
|--------|------|---------|
| [Oracle restructuring coverage](https://www.bbc.co.uk/news/articles/cm296jzzl9yo) (BBC, Mar 31, 2026) | Large-scale AI-linked restructuring reports | ✅ |
| [Larry Ellison: "build more software with fewer people"](https://www.ibtimes.co.uk/oracle-ai-layoffs-tech-workers-1789767) | Direct quote | ✅ |
| [HBR: To Thrive in the AI Era, Companies Need Agent Managers](https://hbr.org/2026/02/to-thrive-in-the-ai-era-companies-need-agent-managers) (Feb 12, 2026) | Agent Manager role, Zach Stauber quote | ✅ Fetched |
| [McKinsey: Trust in the Age of Agents](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/trust-in-the-age-of-agents) (Mar 5, 2026) | Four-layer accountability model | ✅ |
| [McKinsey: State of Organizations 2026 (PDF)](https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/the%20state%20of%20organizations/2026/the-state-of-organizations-2026.pdf) | Nine shifts, human-agent collaboration | ✅ |
| [McKinsey: The Agentic Organization](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era) (Sep 26, 2025) | Agentic operating model | ✅ |
| [IJRSI: When AI Agents Act](https://rsisinternational.org/journals/ijrsi/view/when-ai-agents-act-governance-accountability-and-strategic-risk-in-autonomous-organizations) | Governance, accountability, risk matrix | ✅ |
| [Singapore AIGL: Model AI Governance Framework for Agentic AI v1.0](https://www.aigl.blog/model-ai-governance-framework-for-agentic-ai-version-1-0/) (Feb 2026) | Four principles | ✅ |

---

## n8n vs Zapier

| Source | Type | Verified |
|--------|------|---------|
| [n8n 70+ AI nodes](https://www.digitalapplied.com/blog/n8n-70-ai-nodes-langchain-agent-workflows-open-source) | Feature count | ✅ |
| [Zapier vs n8n comparison (Apr 1, 2026)](https://zenvanriel.com/ai-engineer-blog/zapier-vs-n8n-ai-features/) | Platform philosophy | ✅ |

---

## Flowwink / Internal

| Source | Type |
|--------|------|
| `liteit.se` | Platform — Flowwink CMS/CRM/FlowPilot |
| `autoversio.ai` / `autoversio.com` | Sponsor — private AI on-premise (Uppsala, Sweden) |
| `/Users/mafr/Code/github/openclaw` | OpenClaw local fork — all source code claims verified here |
| Flowwink production deployment | Edge functions, skills, memory architecture |

---

## Notable OpenClaw Forks — GitHub API verified April 2, 2026

| Repo | Stars | Verified |
|------|-------|---------|
| [jiulingyun/openclaw-cn](https://github.com/jiulingyun/openclaw-cn) | 4,604 | ✅ API |
| [DenchHQ/DenchClaw](https://github.com/DenchHQ/DenchClaw) | 1,459 | ✅ API |
| [OpenBMB/EdgeClaw](https://github.com/OpenBMB/EdgeClaw) | 905 | ✅ API |
| [sunkencity999/localclaw](https://github.com/sunkencity999/localclaw) | 78 | ✅ API |
| [jomafilms/openclaw-multitenant](https://github.com/jomafilms/openclaw-multitenant) | 41 | ✅ API |
| [remoteclaw/remoteclaw](https://github.com/remoteclaw/remoteclaw) | 16 | ✅ API |
| [romiluz13/ClawMongo](https://github.com/romiluz13/ClawMongo) | 15 | ✅ API |
| [DenchHQ: OpenClaw Is Early React](https://www.dench.com/blog/openclaw-is-early-react) | Blog (Mar 26, 2026) | ✅ |
| [EdgeClaw 2.0 blog](https://claw4science.org/blog/edgeclaw-2-memory-router) | EdgeClaw architecture | ✅ |

## OSS Insight — Ecosystem Analysis

| Source | Type | Verified |
|--------|------|---------|
| [OpenClaw forks wave analysis](https://ossinsight.io/blog/the-openclaw-forks-wave-2026) (Mar 26, 2026) | Rewrite wave analysis | ✅ |

---

---

## B2B Process Admin Burden — Research (April 2026)

Used in: *The Automation Ceiling* chapter draft

| Source | Claim | Type |
|--------|-------|------|
| [Salesforce State of Sales 2023](https://www.salesforce.com/news/stories/sales-research-2023/) | Reps spend only 29% of workweek on actual selling; 84% missed quota 2023 | Survey, 5 500 reps, 27 countries |
| [DocuSign: 70% on admin](https://www.docusign.com/en-sg/blog/sales-reps-spend-70-of-their-time-on-admin-heres-how-to-fix-that) | Sales reps spend 70% of time on admin tasks | Industry analysis |
| [SPOTIO: Sales statistics 2026](https://spotio.com/blog/sales-statistics/) | 43% of salespeople spend 10–20h/week on admin | Survey compilation |
| [GBTA: Expense report cost](https://gbta.org/how-much-do-expense-reports-really-cost-a-company/) | $58 and 20 min to process one hotel expense; 19% contain errors (+$52, +18 min) | GBTA research |
| [Stampli: AP statistics](https://www.stampli.com/blog/accounts-payable/accounts-payable-statistics/) | 75% of AP teams spend >1 work week/month on invoice admin; 67% key invoices manually | Industry survey |
| [Quadient: AP automation](https://www.quadient.com/en/blog/ap-automation-by-the-numbers-10-statistics-to-know) | Manual: 5 invoices/hour, 14.6 days, $15/invoice; automated: 30/hour, 70–80% time saving | AP benchmarks |
| [PairSoft: Procurement automation ROI](https://www.pairsoft.com/blog/procurement-automation-roi/) | Manual PO: $107 and 8–12h; automated: $32 and 2 days | Procurement research |
| [APQC: Knowledge worker productivity](https://www.apqc.org/about-apqc/news-press-release/apqc-survey-finds-one-quarter-knowledge-workers-time-lost-due) | 25% of knowledge worker time lost to productivity drains | APQC survey |
| [Fullview: Customer support statistics](https://www.fullview.io/blog/support-stats) | 31% of tickets require escalation; 65–70% of routine tasks automatable | Support benchmarks |
| [Smartsheet: Manual task automation](https://www.smartsheet.com/content-center/product-news/automation/workers-waste-quarter-work-week-manual-repetitive-tasks) | 60% of workers could save 6+ hours/week if repetitive tasks were automated | Smartsheet survey |

---

*Last updated: April 19, 2026. All URLs verified active at time of research.*

# Repository Remediation Summary

## What happened

On May 22, 2026, the repository `magnusfroste/clawable` was **suddenly disabled by GitHub Staff** without any prior contact or opportunity to remediate. The notification stated that the repository violated GitHub's Acceptable Use Policy regarding private information.

The disablement came with no warning, no grace period, and no chance to fix the issue — despite GitHub's own policy stating that users should typically be contacted first and given an opportunity to make changes.

## Root cause

A local configuration file (`CLAUDE.md`) had been inadvertently committed. It contained:
- MCP API keys and access tokens for a development environment (dev.flowwink.com)
- Supabase endpoint URLs

The file was believed to be gitignored — it was a genuine oversight, not intentional exposure.

## Immediate actions taken

1. **All credentials rotated** — every API key and token was invalidated on the server side. The old credentials no longer grant access to any system.
2. **Research into GitHub policy** — reviewed the [Private Information Removal Policy](https://docs.github.com/en/site-policy/content-removal-policies/github-private-information-removal-policy) to understand what was actually covered and what was not.
3. **Contact attempt** — tried to reach GitHub Support through multiple channels. The appeal form redirected to a content-removal form designed for complainants, not repository owners, creating a closed loop.
4. **Decision to create a clean repository** — rather than wait indefinitely, a new repository (`clawable-handbook`) was created with a completely clean history.

## Remediation details

### Credentials
- All API keys and tokens were **rotated and invalidated** before the new repo was created
- `CLAUDE.md` is **not included** in the new repository
- `.gitignore` blocks `CLAUDE.md`, `.claude/`, `.env`, and `node_modules/`

### Content cleanup
- **No research files** — the `research/` directory (SIM scenarios, internal notes) was excluded from the new repository. These files are retained locally and may be published separately in the future.
- **No editorial notes** — the `content/` directory (editorial planning documents) was excluded.
- **No build artifacts** — `dist/`, `.astro/`, and `.claude/` are not in the repository.

### Company name sanitization
All company names, person names, and email addresses in the handbook content are **fictional**. They were originally created as simulated test data for agent scenarios but used real-sounding names that could be confused with actual companies. These were systematically replaced:

| Original (real company) | Replacement (fictional) |
|------------------------|------------------------|
| Volvo Cars | Northway Motors |
| Lindström Gruppen | Lindvall Systems |
| Apex Nordic | Apexis AB |
| Grossist Nord AB | PackNord AB |
| Berg-Tek Industri | Berglund Tech |
| Kraftstad Energi AB | Strömkraft AB |
| Westfield Consulting | Västfjord Consulting |
| Soltech AB | Solis Tech AB |
| TechHub Systems AB | NodeHub AB |

Person names and email domains were similarly replaced with fictional alternatives. All business data (contracts, invoices, deal values) is simulated test data.

### Third-party references
All references to third parties (OpenClaw, Lovable, Anthropic Mythos incident, Klarna, NVIDIA, Oracle, etc.) are sourced from **publicly available information** — open-source repositories, published news articles, company blog posts, earnings calls, and official system cards. No proprietary or private information from any third party has been published.

### GitHub links
All links previously pointing to the disabled `magnusfroste/clawable` repository now point to the author's GitHub profile (`github.com/magnusfroste`), where contact information can be found. Links to other projects (`flowwink`, `clawstack`) are unchanged as they are separate, active repositories.

### Commit author
All commits use `magnusfroste@users.noreply.github.com` — GitHub's standard no-reply email format. No personal email addresses appear in the commit history.

## Repository state

This repository (`clawable-handbook`) contains:
- **Business Edition** — 16 chapters + appendices
- **Builder Edition** — 37 chapters + appendices
- Source code (Astro components, pages, layouts)
- Public assets (images, icons)
- Configuration files (package.json, tsconfig, etc.)

It does **not** contain:
- Research files or SIM scenarios
- Editorial planning documents
- Build artifacts
- Configuration files with credentials
- Any private or proprietary information

## Going forward

- Secret scanning and push protection will be enabled
- Configuration files will be kept out of the repository
- All scenario data will use clearly fictional names
- Third-party references will remain sourced from public information only

---

*Documented May 23, 2026 — Magnus Froste*

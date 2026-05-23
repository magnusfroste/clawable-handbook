---
title: "The Vendor Agent Trap"
description: "Why the easiest path to agents — your existing SaaS vendor's built-in AI — is also the most dangerous, and how to evaluate it without losing your strategic optionality."
order: 8
icon: "trap"
---

> The trap does not look like a trap. It looks like the thing you were already going to buy.

You use Salesforce. Salesforce announces Einstein Copilot. You use HubSpot. HubSpot announces ChatSpot. You use Fortnox. Fortnox announces AI features built directly into the platform. The message is consistent: your trusted vendor already understands your business, already has your data, already has the integrations. Why look elsewhere?

Because the question is not whether the vendor's agent works. It is what happens when the agent works *too well* inside one platform and *not at all* outside it.

This is the vendor agent trap: **agents that are deeply capable within a single SaaS platform and structurally blind to everything else.**

The trap is not malicious. It is architectural. And it creates lock-in that is orders of magnitude more consequential than the lock-in you already tolerate.

---

## The Four Pillars of the Trap

Every vendor agent is built on the same structural foundation. Understanding that foundation is the difference between evaluating AI features as capabilities and evaluating them as strategic commitments.

### Pillar One: Platform Lock-In at the Agent Layer

Your existing SaaS lock-in is real but bounded. You can migrate data out of Salesforce, or HubSpot, or any platform. It is expensive, but it is possible. The data is data. The workflows are workflows.

Agent-layer lock-in is different. When your agent has been trained on your specific processes, has learned your business patterns, has established the operational rhythms that your team depends on — that institutional knowledge does not export. The agent *is* the lock-in. Its understanding of your business, built over months or years of operation, cannot be packaged and moved to another platform.

This is lock-in at the level of organizational memory, not just data.

### Pillar Two: The Data Silo Problem

A vendor agent has deep access to its own platform and no access to anything else. It can read every field in your CRM, every record in your ERP, every transaction in your billing system. It cannot read the email that a customer sent you from Gmail. It cannot cross-reference the invoice in your payment processor with the deal in your CRM. It cannot see the compliance flag that lives in a separate regulatory platform.

The agent's world is the platform's boundaries. Everything outside those boundaries is invisible.

For a business that runs on multiple SaaS platforms — which is every business — this creates a structural blind spot. The vendor agent is thorough within its surface and completely blind at the edges. The findings it produces are comprehensive-looking and fundamentally incomplete.

### Pillar Three: The Workflow Ceiling Reappears

The automation ceiling that we documented in chapter two — the hard boundary that no amount of workflow sophistication can cross — reappears inside vendor agents. The vendor's AI can automate everything within the platform's predefined operations. It cannot cross system boundaries, interpret novel situations that fall outside its training scope, or make judgment calls that require context the platform does not capture.

You are back at the ceiling. The vendor's agent simply makes the ceiling more comfortable.

### Pillar Four: The Integration Tax

When you eventually need the vendor agent to talk to another system — when the blind spot becomes operationally unacceptable — you face the integration tax. The vendor's AI was not designed to interoperate. Connecting it requires custom engineering: API work, authentication layers, data mapping, error handling. The cost and complexity of making a platform agent talk to other platforms is precisely the cost that the universal protocol layer — MCP — was designed to eliminate.

But by the time you reach that point, the agent is already embedded in your operations. The switching cost includes not just the technical migration but the organizational disruption of replacing an agent that your team has learned to depend on.

---

## The Fortnox Case Study

Fortnox is Sweden's leading cloud-based business administration platform. Nearly thirty percent of Swedish SMEs use it for accounting, invoicing, payroll, and ERP. When Fortnox announced AI features built into the platform, the natural question was: does this free Swedish businesses from needing an external agent layer?

The answer reveals the trap in practice.

Fortnox itself has not shipped an official MCP server. The platform exposes a well-documented RESTful API — and the community did not wait for more. Two open-source projects mapped Fortnox's full API surface to MCP before Fortnox did: `erp-mafia/fortnox-mcp` (Jakob Wennberg, January 2026) and `Proviscale/fortnox-mcp-server` (Viggo Johansson, April 2026). Both are MIT-licensed, published to npm, and installable in minutes. An agent can now read accounts, check invoice status, create customers, file vouchers, and run reports against Fortnox — through a community-built MCP surface. That is worth noting: the ecosystem is moving faster than the vendors.

The platform's own AI features add intelligence within the same boundary: automated categorization, anomaly detection, natural language queries.

But the Fortnox agent — and the community MCP surface — operates inside the Fortnox boundary. It cannot read the CRM that tracks which of those customers are at risk of churn. It cannot cross-reference payroll data against revenue per employee. It cannot see the customer support tickets that indicate which suppliers are becoming unreliable.

The business reality that matters lives at the intersection of these systems. The Fortnox surface, capable as it is within its domain, cannot see that intersection.

The external agent layer — Clawable, in our implementation — reads Fortnox through its MCP surface *alongside* every other system. It can correlate an unpaid Fortnox invoice with a stalled Salesforce deal with a customer support ticket in Intercom. The cross-system insight is what produced the EUR 1.1 million finding documented in chapter three.

An agent operating only inside Fortnox would never have found it. Not because Fortnox is poorly built. Because it is structurally incapable of seeing outside its platform.

---

## How to See the Trap

The vendor agent trap is not obvious at the point of purchase because the evaluation criteria are wrong. Organizations evaluate vendor AI on feature completeness within the platform. The right evaluation criteria are different.

**Ask: what does this agent not see?**

Not what it does. What it does not see. Which systems are invisible to it? Which business processes span multiple platforms? Which decisions require context this agent cannot access?

The answer to that question is the size of your blind spot.

**Ask: what happens when we need to switch platforms?**

Not if. When. Every platform has been replaced before. The question is whether your agent — the layer that has learned your business, understands your patterns, embodies your operational knowledge — can move with the data.

If the answer is no, the agent is not just a tool. It is an anchor.

**Ask: who trains this agent on our business?**

A vendor agent trains on aggregate data across all its customers. Your specific processes, your specific patterns, your specific edge cases are averaged into a model optimized for the median user. The external agent layer — whether Clawable or another orchestrator — trains on *your* business specifically. The difference between a general-purpose assistant and a business-specific operator is the difference between a tool that helps and a system that operates.

**Ask: what is the total cost of agent lock-in?**

Not the license cost. The switching cost. The cost of replacing an agent that has learned your business. The cost of the blind spots you will not discover until they cause a problem. The cost of the integration work you will eventually need to connect the vendor agent to the rest of your stack.

**Ask: who governs the MCP surface this agent uses?**

MCP makes it straightforward to expose capabilities to agents. That is its power. It is also its risk. Research firm Metosys analyzed the production MCP ecosystem in 2026 and found that 43 percent of MCP servers have authentication vulnerabilities, and 33 percent allow unrestricted network access. Axway's API strategy practice has a name for the dynamic: *"API sprawl squared."* Where APIs exposed data, MCP exposes actions. The governance consequences of getting this wrong are proportionally larger.

A well-built MCP surface — purpose-designed, schema-validated, approval-gated for high-risk operations — is a secure and auditable interface. A community-assembled or vendor-bolted MCP server with default configurations is a different thing entirely. Before accepting any MCP-exposed surface as the interface your agent uses to act on your business, the question is the same one that security teams ask about any third-party API: who is responsible for its security posture, and how would you know if that changed?

---

## The Escape Path

The vendor agent trap is avoidable. The escape path has three elements:

**Evaluate vendor AI as a feature, not a strategy.** Your SaaS vendor's AI features are real capabilities within their platform. Use them. But do not mistake a platform feature for an operational strategy. The strategy is the layer that reads all your platforms simultaneously.

**Choose an orchestrator that reads every system through open protocols.** The agent layer should communicate with your SaaS stack through standardized interfaces — MCP, not proprietary APIs. When your agent speaks open protocols, changing a SaaS platform means changing a configuration file, not retraining an agent.

**Keep your agent layer separate from your SaaS layer.** The architectural decision that prevents the trap is the simplest one: the agent that operates your business should not be built into any single platform. It should sit above them all, reading each one through the same open interface, capable of correlating across systems and capable of moving when the underlying platforms change.

The vendor agent trap is not a product problem. It is an architecture problem. And architecture decisions made early become structural facts that are very expensive to change later.

The organizations that get this right in 2026 will evaluate vendor AI features against a clear standard: does this make my orchestrator's job easier, or does it pull operational capability back into a single platform? The answer to that question determines whether you are building a Business Operating System or buying the next generation of lock-in.

The pace of consolidation is accelerating. In early 2026, Google renamed its entire AI cloud platform to the Gemini Enterprise Agent Platform — absorbing Vertex AI and Agentspace into a single branded surface. It is a useful illustration of the dynamic: every major vendor is now building the walls higher, while simultaneously making the interior more capable. The external orchestration layer that reads across all of them is not competing with that consolidation. It depends on it — and it is the only layer that sits above it.

---

*Next: [Why Agent Programs Fail →](/business/09-why-agent-programs-fail)*

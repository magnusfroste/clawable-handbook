// Clawable Handbook MCP server — Streamable HTTP transport (stateless).
// The book about MCP, readable over MCP. Point OpenClaw, Hermes, Claude Code
// or any MCP client at: https://www.clawable.org/api/mcp
//
// Zero dependencies. Content is fetched from the site's own static surface
// (/raw/index.json + /raw/<track>/<slug>.md) and cached in module scope.

const SITE = 'https://www.clawable.org';
const PROTOCOL = '2025-06-18';

let cache = null;
async function content() {
  if (cache) return cache;
  const res = await fetch(`${SITE}/raw/index.json`);
  if (!res.ok) throw new Error(`content index unavailable (${res.status})`);
  cache = await res.json();
  return cache;
}
const bodies = new Map();
async function chapterBody(c) {
  if (!bodies.has(c.raw)) {
    const res = await fetch(c.raw);
    if (!res.ok) throw new Error(`chapter unavailable (${res.status})`);
    bodies.set(c.raw, await res.text());
  }
  return bodies.get(c.raw);
}
const find = (chapters, slug) =>
  chapters.find((c) => c.slug === slug || `${c.track}/${c.slug}` === slug);

const TOOLS = [
  {
    name: 'list_chapters',
    description:
      'List all chapters of the Clawable handbook. Two tracks: "business" (for leaders) and "builder" (technical). Returns slug, title, description and reading order.',
    inputSchema: {
      type: 'object',
      properties: {
        track: { type: 'string', enum: ['business', 'builder'], description: 'Optional track filter' },
      },
    },
  },
  {
    name: 'read_chapter',
    description: 'Read a full chapter as markdown. Use the slug from list_chapters (e.g. "03-live-proof"), optionally prefixed with track ("business/03-live-proof").',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', description: 'Chapter slug, optionally track-prefixed' } },
      required: ['slug'],
    },
  },
  {
    name: 'search_handbook',
    description: 'Full-text search across every chapter of both tracks. Returns the top matches with surrounding excerpts.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search terms' },
        limit: { type: 'number', description: 'Max results (default 5, max 10)' },
      },
      required: ['query'],
    },
  },
];

async function callTool(name, args = {}) {
  const { chapters } = await content();

  if (name === 'list_chapters') {
    const list = chapters.filter((c) => !args.track || c.track === args.track);
    const lines = list.map((c) => `${c.track}/${c.slug} — ${c.title}${c.description ? ` · ${c.description}` : ''}`);
    return `${list.length} chapters:\n\n${lines.join('\n')}`;
  }

  if (name === 'read_chapter') {
    const c = find(chapters, String(args.slug || '').trim());
    if (!c) return `No chapter with slug "${args.slug}". Use list_chapters to see available slugs.`;
    return await chapterBody(c);
  }

  if (name === 'search_handbook') {
    const terms = String(args.query || '').toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return 'Empty query.';
    const limit = Math.min(Number(args.limit) || 5, 10);
    await Promise.all(chapters.map((c) => chapterBody(c).catch(() => ''))); // warm cache in parallel
    const scored = [];
    for (const c of chapters) {
      const body = (await chapterBody(c)).toLowerCase();
      let score = 0;
      let firstHit = -1;
      for (const t of terms) {
        let i = body.indexOf(t);
        if (i === -1) continue;
        if (firstHit === -1 || i < firstHit) firstHit = i;
        while (i !== -1 && score < 400) { score++; i = body.indexOf(t, i + t.length); }
      }
      if (score > 0) scored.push({ c, score, firstHit });
    }
    scored.sort((a, b) => b.score - a.score);
    if (!scored.length) return `No matches for "${args.query}".`;
    const out = [];
    for (const { c, score, firstHit } of scored.slice(0, limit)) {
      const body = await chapterBody(c);
      const start = Math.max(0, firstHit - 120);
      const excerpt = body.slice(start, firstHit + 280).replace(/\s+/g, ' ').trim();
      out.push(`### ${c.track}/${c.slug} — ${c.title} (${score} hits)\n…${excerpt}…`);
    }
    return out.join('\n\n');
  }

  throw { code: -32602, message: `Unknown tool: ${name}` };
}

async function handle(msg) {
  const { id, method, params } = msg;
  const reply = (result) => ({ jsonrpc: '2.0', id, result });

  if (method === 'initialize')
    return reply({
      protocolVersion: params?.protocolVersion || PROTOCOL,
      capabilities: { tools: {}, resources: {} },
      serverInfo: { name: 'clawable-handbook', title: 'Clawable — The Agentic AI Handbook', version: '2026.7' },
      instructions:
        'The full Clawable handbook (Business + Builder editions) as tools and resources. Start with list_chapters or search_handbook. Every chapter is evidence-tagged (validated/partial/hypothesis).',
    });

  if (method === 'ping') return reply({});

  if (method === 'tools/list') return reply({ tools: TOOLS });

  if (method === 'tools/call') {
    try {
      const text = await callTool(params?.name, params?.arguments);
      return reply({ content: [{ type: 'text', text }], isError: false });
    } catch (e) {
      if (e && e.code) return { jsonrpc: '2.0', id, error: e };
      return reply({ content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true });
    }
  }

  if (method === 'resources/list') {
    const { chapters } = await content();
    return reply({
      resources: chapters.map((c) => ({
        uri: `clawable://${c.track}/${c.slug}`,
        name: `${c.track}/${c.slug}`,
        title: c.title,
        description: c.description,
        mimeType: 'text/markdown',
      })),
    });
  }

  if (method === 'resources/read') {
    const { chapters } = await content();
    const uri = String(params?.uri || '');
    const c = find(chapters, uri.replace('clawable://', ''));
    if (!c) return { jsonrpc: '2.0', id, error: { code: -32002, message: `Unknown resource: ${uri}` } };
    return reply({ contents: [{ uri, mimeType: 'text/markdown', text: await chapterBody(c) }] });
  }

  if (method === 'prompts/list') return reply({ prompts: [] });

  return { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET')
    return res.status(405).json({
      name: 'clawable-handbook MCP server',
      transport: 'Streamable HTTP — POST JSON-RPC 2.0 to this URL',
      protocolVersion: PROTOCOL,
      tools: TOOLS.map((t) => t.name),
      alsoAvailable: { llmsTxt: `${SITE}/llms.txt`, rawIndex: `${SITE}/raw/index.json` },
    });

  if (req.method !== 'POST') return res.status(405).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Notifications (no id) → 202 Accepted, no body
    const isNotification = (m) => m && m.jsonrpc === '2.0' && m.method && m.id === undefined;
    if (Array.isArray(body)) {
      const requests = body.filter((m) => !isNotification(m));
      if (!requests.length) return res.status(202).end();
      const results = await Promise.all(requests.map(handle));
      return res.status(200).json(results);
    }
    if (isNotification(body)) return res.status(202).end();

    return res.status(200).json(await handle(body));
  } catch (e) {
    return res.status(400).json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: `Parse error: ${e.message}` } });
  }
}

// Generates the agent-readable content surface before `astro build`:
//   public/raw/<track>/<slug>.md   — raw chapter markdown
//   public/raw/index.json          — machine-readable chapter index
//   public/llms.txt                — llms.txt convention for LLM agents
// The MCP endpoint (api/mcp.js) serves tools/resources on top of these files.

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.clawable.org';
const tracks = ['business', 'builder'];
const index = [];

for (const track of tracks) {
  const dir = join('src/content', track);
  mkdirSync(join('public/raw', track), { recursive: true });
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const slug = file.replace(/\.md$/, '');
    const md = readFileSync(join(dir, file), 'utf8');
    const fm = md.match(/^---\n([\s\S]*?)\n---/);
    const get = (key) => {
      const m = fm && fm[1].match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
      return m ? m[1] : '';
    };
    writeFileSync(join('public/raw', track, file), md);
    index.push({
      track,
      slug,
      title: get('title') || slug,
      description: get('description'),
      order: parseFloat(get('order')) || 0,
      appendix: get('appendix') === 'true',
      raw: `${SITE}/raw/${track}/${file}`,
      html: `${SITE}/${track}/${slug}`,
    });
  }
}

index.sort((a, b) => a.track.localeCompare(b.track) || a.order - b.order);
writeFileSync('public/raw/index.json', JSON.stringify({ generated: new Date().toISOString().slice(0, 10), site: SITE, chapters: index }, null, 1));

const section = (track, label) =>
  `## ${label}\n\n` +
  index
    .filter((c) => c.track === track)
    .map((c) => `- [${c.title}](${c.raw})${c.description ? `: ${c.description}` : ''}`)
    .join('\n');

writeFileSync(
  'public/llms.txt',
  `# Clawable — The Agentic AI Handbook

> An open-source, evidence-tagged handbook on autonomous AI agents operating
> real businesses. Two tracks: a Business Edition for leaders and a Builder
> Edition for engineers. Every chapter is available as raw markdown below.
> The handbook also speaks MCP (Streamable HTTP): POST ${SITE}/api/mcp

${section('business', 'Business Edition')}

${section('builder', 'Builder Edition')}
`
);

console.log(`content surface: ${index.length} chapters → public/raw + llms.txt`);

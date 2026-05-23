import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://clawable.org',
  integrations: [tailwind(), mdx(), sitemap({
    lastmod: new Date(),
    changefreq: 'weekly',
  })],
});

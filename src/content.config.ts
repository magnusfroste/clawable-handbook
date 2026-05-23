import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const builder = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/builder',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string().optional(),
    faq: z.array(faqItem).optional(),
  }),
});

const business = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/business',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string().optional(),
    appendix: z.boolean().optional(),
    faq: z.array(faqItem).optional(),
  }),
});

export const collections = { builder, business };

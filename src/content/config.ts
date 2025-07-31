import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.object({
      pl: z.string(),
      en: z.string()
    }),
    description: z.object({
      pl: z.string(),
      en: z.string()
    }),
    author: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog
};

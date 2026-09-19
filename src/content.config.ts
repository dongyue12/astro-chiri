import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  // 文章的 id（同时决定 URL）取文件名开头的数字：`3.zoxide.md` → `/blog/3/`。
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) =>
      entry.match(/^(\d+)/)?.[1] ??
      entry.replace(/\.(md|mdx)$/i, '').toLowerCase().replace(/\s+/g, '-'),
  }),
  // Frontmatter 校验
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };

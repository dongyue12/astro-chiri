import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Load Markdown and MDX files in the `blog/` directory.
  // 文章的 id（同时决定 URL）取文件名开头的数字：`3.zoxide.md` → `/3/`。
  //
  // `待处理文章/` 是草稿暂存区，这里显式排除：放进去的文件既不会发布，
  // 也不会走下面的 frontmatter 校验，所以可以直接丢 Obsidian 导出的原始稿。
  // 详见 blog/待处理文章/格式说明.md
  loader: glob({
    base: './blog',
    pattern: ['**/*.{md,mdx}', '!**/待处理文章/**'],
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

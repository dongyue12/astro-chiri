import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './config';

const blog = defineCollection({
  // 文章清单：blog/ 下的 Markdown。
  //
  // - 文章的 id 取文件名开头的数字，同时决定 URL：`3.zoxide.md` → `/3/`。
  // - 待处理文章/ 是草稿暂存区，显式排除：既不会发布，也不走下面的 frontmatter 校验，
  //   所以可以直接丢 Obsidian 导出的原始稿。详见 blog/待处理文章/格式说明.md
  // - 空文件不能留在 blog/ 下。Obsidian 里新建的稿子常常是 0 字节，而空文件一样会进
  //   schema 校验，缺 title 就直接让整个构建失败；这种文件请放进 待处理文章/。
  loader: glob({
    base: './blog',
    pattern: ['**/*.md', '!**/待处理文章/**'],
    generateId: ({ entry }) =>
      entry.match(/^(\d+)/)?.[1] ??
      entry.replace(/\.md$/i, '').toLowerCase().replace(/\s+/g, '-'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // 分类与标签：category 只能取 config.ts 里登记的 id，写错在构建时就报错；
    // tags 留成任意字符串（id），遇到没登记的标签页面上回落到 id 本身。
    category: z.enum(categoryIds).default('misc'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };

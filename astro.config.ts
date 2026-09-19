// @ts-check

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { themeConfig } from './src/config';

// 正文栏可用宽度 = 内容栏宽度 − body 左右内边距（各 1.5rem）
const COLUMN_PX = Math.round(parseFloat(themeConfig.general.contentWidth) * 16 - 48);
const IMAGE_SIZES = `(min-width: 769px) ${COLUMN_PX}px, calc(100vw - 43px)`;

async function htmlFilesIn(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFilesIn(path)));
    else if (entry.name.endsWith('.html')) found.push(path);
  }
  return found;
}

/**
 * Astro 对 Markdown 图片默认按「占满视口」估算 sizes（`100vw`）。本站正文栏是固定宽度的，
 * 浏览器据此会一直挑中接近原图的档位，多档 srcset 就白生成了。
 * 这里在产物里把 sizes 纠正为真实占位宽度。只在带 srcset 的 <img> 上改，不动渲染管线。
 */
function correctImageSizes() {
  return {
    name: 'correct-image-sizes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const files = await htmlFilesIn(fileURLToPath(dir));
        let patched = 0;
        for (const file of files) {
          const before = await readFile(file, 'utf8');
          const after = before.replace(/<img\b[^>]*>/g, (tag) =>
            tag.includes('srcset') ? tag.replace(/\bsizes="[^"]*"/, `sizes="${IMAGE_SIZES}"`) : tag,
          );
          if (after !== before) {
            await writeFile(file, after);
            patched++;
          }
        }
        logger.info(`sizes 已修正为 "${IMAGE_SIZES}"（${patched} 个页面）`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,
  integrations: [mdx(), sitemap(), correctImageSizes()],
  compressHTML: true,
  image: {
    // 按显示宽度生成多档 srcset，而不是把 1440px 原图塞进 512px 的位置
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    // 'css-variables' 让 Shiki 输出 var(--astro-code-token-*) 而不是内联配色，
    // 这样代码块才会走 global.css 里的灰阶 token（Chiri 的设计即如此）。
    shikiConfig: {
      theme: 'css-variables',
    },
  },
});

// @ts-check

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { themeConfig } from './src/config';

// 正文图片的 sizes。Astro 默认按「占满视口」（100vw）估算，于是浏览器在固定宽度的
// 正文栏里也会一路挑中最宽的档位，多档 srcset 等于白生成。
// 可用宽度 = 内容栏宽度 − body 左右内边距（各 1.5rem），末档是移动端的实际视口宽度。
const COLUMN_PX = Math.round(parseFloat(themeConfig.contentWidth) * 16 - 48);
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
 * 构建收尾时把产物里的 sizes 改成真实占位宽度。
 * 只在带 srcset 的 <img> 上动手，不碰渲染管线。
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
        logger.info(`sizes → "${IMAGE_SIZES}"（${patched} 个页面）`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,
  integrations: [sitemap(), correctImageSizes()],
  compressHTML: true,
  // 全站只有一个很小的样式表，直接内联进 HTML：省掉首次访问的渲染阻塞请求，
  // 静态托管上也没有「多打一个请求」的代价。
  build: {
    inlineStylesheets: 'always',
  },
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

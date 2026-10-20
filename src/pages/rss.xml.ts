import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { themeConfig } from '@/config';

const esc = (s = '') =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/**
 * 站点 RSS。手写而不是装 @astrojs/rss：全站只有这一个 feed，
 * 二十行 XML 比多一个依赖划算。
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL(themeConfig.site.website);
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const items = posts
    .map((post) => {
      const url = new URL(`/${post.id}/`, origin).href;
      // 与文章页同一套回退：没有 frontmatter description 就取正文首句
      const plain = post.body
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/[#>*_`|~\[\]()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const lead = plain.split(/(?<=[。！？.!?])/)[0] ?? plain;
      const desc = post.data.description ?? (lead.length > 80 ? `${lead.slice(0, 80)}…` : lead);
      return `    <item>
      <title>${esc(post.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(themeConfig.site.title)}</title>
    <link>${origin.href}</link>
    <description>${esc(themeConfig.site.description)}</description>
    <language>${themeConfig.site.language}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

## 项目约定

结构刻意保持扁平：能合进一个文件的不拆成两个，能合成一层的不分两层。
改动前先看一眼 README 的「目录结构」，避免重新拆出碎文件。

- 全站只有一个通用外壳 `src/layouts/BaseLayout.astro`（head + 吸顶页头 + 页脚 + 明暗开关）。
  页头导航、主题脚本、页脚、`<head>` 元信息都在里面，不要再拆成独立组件。
- 文章页的「标题区 + 正文 + 侧边目录插槽 + 评论 + 阅读进度 + 返回顶部」在
  `src/layouts/PostLayout.astro`；目录内容由 `src/pages/[...slug].astro` 通过 `slot="aside"` 传入。
- 文章卡片只有一份实现：`src/components/PostGrid.astro`，首页、分类页、标签页共用。
  不要在任何页面里重新写一套卡片。
- 全站样式集中在 `src/styles/global.css`，页面专属样式写在各自页面的 `<style>` 里。
  颜色一律先加进 `:root` 的 `light-dark()` 变量，不要在组件里写死颜色值。
- 站点里能调的东西都在 `src/config.ts`：站点信息、导航、分类、标签、栏宽、日期格式、友链。
- 分类只有 `system` / `dev` / `misc` 三个 id；新增标签先登记到 `config.ts` 的 `tags`，
  id 进 URL，中文显示名放值里。
- 字体走自托管：`public/fonts/inter-latin.woff2`（正文拉丁）与
  `public/fonts/jetbrains-mono-latin.woff2`（日期/标签/序号），不要引入外部字体请求。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

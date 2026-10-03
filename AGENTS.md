## 项目约定

结构刻意保持扁平：能合进一个文件的不拆成两个，能合成一层的不分两层。
改动前先看一眼 README 的「目录结构」，避免重新拆出碎文件。

- 全站只有一个通用外壳 `src/layouts/BaseLayout.astro`（head + 页头 + 页脚）。
  页头导航、页脚、`<head>` 元信息都在里面，不要再拆成独立组件。
- 文章页专属的「标题 + 日期 + 评论 + 返回顶部」在 `src/layouts/PostLayout.astro`。
- 全站样式集中在 `src/styles/global.css`，页面专属样式写在各自页面的 `<style>` 里。
- 站点里能调的东西都在 `src/config.ts`，不要在模板里硬编码。

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

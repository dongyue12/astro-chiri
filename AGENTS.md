# AGENTS.md

给接手这个仓库的 AI 助手看的约定。**先把 README 的「目录结构」扫一眼再动手。**

## 这个仓库是什么

个人博客，跑的是 [Firefly](https://github.com/CuteLeaf/Firefly) 主题（6.16.8）定制版，
不是从零写的版式。所以绝大多数「改外观」需求的正确做法是**改配置**，而不是改组件：
`src/config/` 下每个域一个文件（站点、导航、侧边栏、评论、字体、特效、代码块…），
统一由 `src/config/index.ts` 导出，类型在 `src/types/`。

## 三个入口

| 要改什么 | 去哪 |
| --- | --- |
| 站点信息、导航、页面开关、侧边栏、评论、友链 | `src/config/*.ts` |
| 文章正文 | `src/content/posts/*.md`（文件名即 URL 段） |
| 样式 | `src/styles/`：`main.css` 是入口，`variables.styl` 放变量 |

界面文案改 `src/i18n/languages/*.ts`，新 key 先登记到 `src/i18n/i18nKey.ts`。

## 硬约定

- **不要往 `blog/` 写东西**。那是迁移前的手稿存档，不参与构建；新文章只进 `src/content/posts/`。
- **不要提交** `dist/`、`audit/`、`public/vndb-covers/`、`.astro/`（前两个已进 `.gitignore`，
  第三个是构建生成物）。`public/assets/fonts/` 是字体**源文件**，要提交。
- **不要升级 astro / 主题版本**：`astro` 锁在 7.3.2、`@astrojs/svelte` 锁 9.0.1、`typescript` 6.x，
  跟着 Firefly 的发版节奏走，单独升级会连锁炸一堆插件。
- **颜色不写死**：一律走 `variables.styl` / CSS 变量的明暗成对声明，否则暗色模式下会瞎。
- **关闭的页面**（`siteConfig.pages` 里设为 false）在构建时输出成跳 `/404/` 的重定向页，
  要新增页面记得同时打开开关并登记导航。
- **旧地址垫片**：`public/_redirects` 与 `public/<id>/index.html` 是同一件事的两份，
  改一处必须同步另一处。

## 验证

```sh
pnpm build:site      # 必须通过；构建完检查 dist/posts/<id>/index.html 存在
pnpm check           # 内容 schema / 类型错误会在这里暴露（文章 frontmatter 写错必跑）
```

构建前确认 Node ≥ 22.23（推荐 24）。`pnpm build` 全量构建会联网抓 GitHub 卡片、VNDB 封面和
字体子集，慢且可能失败；只改版式/文案时用 `pnpm build:site`。

部署方式见 [DEPLOY.md](./DEPLOY.md)。

## Development

启动开发服务器用后台模式：

```
astro dev --background
```

用 `astro dev stop`、`astro dev status`、`astro dev logs` 管理。

## 文档

完整文档：https://docs.astro.build

- [新增页面、动态路由或中间件](https://docs.astro.build/en/guides/routing/)
- [编写 Astro 组件](https://docs.astro.build/en/basics/astro-components/)
- [使用 React、Vue、Svelte 等框架组件](https://docs.astro.build/en/guides/framework-components/)
- [新增或管理内容](https://docs.astro.build/en/guides/content-collections/)
- [样式与 Tailwind](https://docs.astro.build/en/guides/styling/)
- [多语言支持](https://docs.astro.build/en/guides/internationalization/)

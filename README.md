# 冬月的博客

https://dongyue.org/ — 记录 Windows、开发工具与自建服务的中文笔记站。

**Astro 7 + [Firefly](https://github.com/CuteLeaf/Firefly) 6.16.8 主题**，纯静态输出，
部署在 Cloudflare Pages。26 篇文章，带分类/标签/归档/系列/全文搜索/明暗主题/评论。

> 2026-10 从自建的极简版式整体换成 Firefly：文章从 `blog/` 迁到 `src/content/posts/`，
> URL 从 `/<id>/` 变成 `/posts/<id>/`，旧地址用 301 兜住（见「旧地址兼容」）。
> `blog/` 目录留作迁移前的原始手稿，**不再参与构建**，也别再往里加新文章。

## 命令

Node **≥ 22.23**（推荐 24），包管理用 pnpm（`package.json` 里锁了 `pnpm@11.22.0`）。

```sh
pnpm install        # 安装依赖
pnpm dev            # 开发服务器 http://localhost:4321
pnpm build:site     # 构建到 dist/ 并生成搜索索引 ← 部署用这个
pnpm preview        # 预览 dist/
pnpm check          # astro check（类型/内容 schema 校验）
pnpm lint           # biome 检查并修复 src/ scripts/
pnpm new-post       # 新建文章（scripts/new-post.js）
```

`pnpm build` 是**全量**构建：抓 GitHub 卡片数据、生成 LQIP 占位图、抓 VNDB 封面、
`astro build`、清理 pio 资源、字体子集化、压缩内联脚本、建 pagefind 索引。
其中抓数据几步要联网且较慢；只改版式或写文章时用 `pnpm build:site` 就够了。

## 目录结构

主题目录偏多，改东西时有三个入口就够：**配置看 `src/config/`，文章看 `src/content/posts/`，
样式看 `src/styles/`**。

```
astro.config.mjs        构建配置：站点、Svelte/Tailwind/MDX/Swup、代码块、Mermaid/PlantUML、字体子集
wrangler.toml           Cloudflare Pages 配置，产物目录 ./dist
src/
  config/               一堆 xxxConfig.ts，一个域一个文件，统一从 index.ts 导出
    siteConfig.ts       站点标题、副标题、URL、导航栏、页面开关（关掉的页面会构建成跳 /404/）
    fontConfig.ts       自托管字体清单（子集化的源文件放 public/assets/fonts/）
    navBarConfig.ts / sidebarConfig.ts / commentConfig.ts / friendsConfig.ts / ...
  content/
    posts/              文章 Markdown/MDX（当前 26 篇），assets/ 放文内图片
    spec/               about / friends / guestbook 三个独立页面的内容
  layouts/
    Layout.astro        全站外壳：<head>、页头、页脚、主题脚本、各项特效组件
    MainGridLayout.astro 网格布局（左中右栏 + 侧边栏插槽）
  components/           analytics / comment / common / controls / features / layout / misc / pages / widget
  pages/                [...page].astro（首页分页）、posts/[...slug].astro（文章）、
                        categories、tags、archive、series、search、friends、guestbook、rss.xml、
                        sitemap、robots.txt、og/（动态 OG 图）、api/（JSON 接口）
  styles/               main.css 是入口（@import 一堆分区样式），variables.styl 放变量；没有 global.css
  plugins/              各类 remark/rehype 插件（mermaid、plantuml、图组、外链、邮件保护、GitHub 卡片…）
  i18n/                 6 种语言的文案表
scripts/                构建期脚本：字体子集、LQIP、GitHub 卡片、VNDB 封面、pagefind、新建文章
public/
  _headers              Cloudflare 安全头与缓存策略
  _redirects            旧 URL → 新 URL 的 301（Cloudflare / Netlify 生效）
  1/ … 26/、message/、categories/*、tags/*   旧地址的静态跳转垫片（不支持 _redirects 的托管也能跳）
  assets/fonts/         字体源文件（子集化后输出到 dist/_astro/fonts）
blog/                   迁移前的手稿，仅存档，不参与构建
audit/                  迁移期逐版截图，本地对比用，已进 .gitignore
```

## 写文章

放到 `src/content/posts/`，文件名就是 URL 的一段：`27.某某.md` → `/posts/27/`。

```yaml
---
title: "Git 自动转成 SSH"
published: 2026-09-08          # 必填
description: "把 HTTPS 远程仓库换成 SSH，省掉每次推送都要输账号密码的麻烦。"
tags: ["git", "ssh"]
category: "开发工具"
draft: false                   # true 不进构建
series: "Git 实用笔记"          # 可选：系列名与次序
seriesOrder: 2
---
```

其余可选字段见 `src/content.config.ts` 的 schema：`image`（封面）、`pinned`、`password`（加密文章）、
`lang`、`author`、`licenseName` 等。`dynamic` / `projects` 两个集合目前是空的（页面开关也关着）。

## 旧地址兼容

旧站文章在根路径（`/3/`），Firefly 在 `/posts/3/`。两边都做了：

- `public/_redirects`：301 规则（Cloudflare Pages / Netlify 直接生效）
- `public/<id>/index.html`：`meta refresh` + `location.replace` 垫片，另有 `/message/`→`/guestbook/`、
  `/categories/<id>/`→`/categories/`

新增文章不需要动这两个地方（新文章没有旧地址）。**新增/删除文章后想清理垫片**，记得两边一起删。

## 部署

见 [DEPLOY.md](./DEPLOY.md)：Cloudflare Pages，构建命令 `pnpm build:site`，输出目录 `dist`，
Node 22.23+；也可 `wrangler pages deploy dist` 手工上传。

## 本地构建的两个坑

- **Node 版本**：`package.json` 要求 ≥ 22.23，用 22.22 会在构建期报奇怪的错，直接上 24。
- **pnpm 版本告警**：本机 pnpm 12 会提示「无法使用项目锁定的 11.22.0」，不影响安装和构建；
  想彻底消掉就 `corepack enable` 或用 `pnpm@11.22.0`。

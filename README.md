# 冬月的博客

基于 Astro 的中文技术笔记，文章位于 `blog/`，构建产物是纯静态文件。

视觉上是「技术刊物」：宽幅版式、大字号标题、卡片索引、分类色、明暗双主题。
全站样式集中在 `src/styles/global.css`，颜色用 `light-dark()` 成对声明，主题切换只改 `color-scheme`。

## 命令

```sh
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器
pnpm build     # 构建生产文件到 dist/
pnpm preview   # 预览构建结果
```

> 若 `pnpm build` 在当前环境报 pnpm 依赖检查的 TTY 错误，可直接走 Astro 入口：
> `node node_modules/astro/bin/astro.mjs build`

## 目录结构

刻意保持扁平：能合进一个文件的不拆成两个，能合成一层的不分两层。

```
astro.config.ts       构建配置：站点、图片 sizes 修正、Markdown/Shiki
src/config.ts         站点配置（站点信息、栏宽、日期格式、导航、分类、标签、友链）
src/content.config.ts 文章集合与 frontmatter 校验规则
src/components/
  PostGrid.astro      文章卡片网格：首页、分类页、标签页共用
src/layouts/
  BaseLayout.astro    全站外壳：<head> + 吸顶页头 + 页脚 + 明暗主题开关
  PostLayout.astro    文章/留言页：标题区、正文、侧边目录插槽、评论、阅读进度
src/pages/
  index.astro         首页：站点主张 + 最新一篇 + 分类筛选 + 搜索 + 卡片索引
  [...slug].astro     文章动态路由（正文 + 目录 + 标签 + 上下篇）
  categories/         分类总览与分类页
  tags/               标签总览与标签页
  friends.astro       友链页
  message.astro       留言页
  rss.xml.ts          RSS
src/styles/global.css 全部样式（设计变量 + 骨架 + 组件 + 正文排版）
public/fonts/         Inter（拉丁）与 JetBrains Mono（元信息），自托管
blog/                 文章 Markdown + assets/ 图片
blog/待处理文章/       草稿暂存区，不发布、不校验
```

新增页面时：能复用 `BaseLayout` 就复用；只有需要「标题 + 日期 + 正文 + 评论」时才用 `PostLayout`。

## 文章 frontmatter

```yaml
---
title: 'VSCode 快捷键'
pubDate: '2026-09-23'
category: dev             # system / dev / misc
tags: [vscode, shortcuts] # id 要在 src/config.ts 的 tags 里登记
description: VSCode 里最常用的一批快捷键，按编辑、导航和终端分组。
---
```

分类和标签页会自动生成，完整的写作规则见 `blog/待处理文章/格式说明.md`。

## 开发

启动开发服务器用后台模式：

```
astro dev --background
```

用 `astro dev stop`、`astro dev status`、`astro dev logs` 管理。

## 文档

完整文档：https://docs.astro.build

相关主题的指南：

- [新增页面、动态路由或中间件](https://docs.astro.build/en/guides/routing/)
- [编写 Astro 组件](https://docs.astro.build/en/basics/astro-components/)
- [使用 React、Vue、Svelte 等框架组件](https://docs.astro.build/en/guides/framework-components/)
- [新增或管理内容](https://docs.astro.build/en/guides/content-collections/)
- [样式与 Tailwind](https://docs.astro.build/en/guides/styling/)
- [多语言支持](https://docs.astro.build/en/guides/internationalization/)

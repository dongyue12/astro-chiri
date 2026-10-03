# 冬月的博客

基于 Astro 的中文技术笔记，文章位于 `blog/`，构建产物是纯静态文件。

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
src/config.ts         站点配置（站点信息、栏宽、日期格式、友链、导航）
src/content.config.ts 文章集合与 frontmatter 校验规则
src/layouts/
  BaseLayout.astro    全站外壳：<head> + 页头 + 页脚 + 可选滚动外壳
  PostLayout.astro    文章/留言页：标题、日期、正文、giscus 评论、返回顶部
src/pages/
  index.astro         首页：文章列表 + 纯前端搜索
  friends.astro       友链页
  message.astro       留言页
  [...slug].astro     文章动态路由
src/styles/global.css 全部样式（设计变量 + 正文排版）
blog/                 文章 Markdown + assets/ 图片
blog/待处理文章/       草稿暂存区，不发布、不校验
```

新增页面时：能复用 `BaseLayout` 就复用；只有需要「标题 + 日期 + 评论」时才用 `PostLayout`。

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

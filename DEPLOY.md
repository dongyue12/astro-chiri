# 部署

站点是纯静态输出，构建产物在 `dist/`。

当前生产环境：**Vercel**，域名 `https://dongyue.org`（`www` 反向跳转到 apex）。
推送 `main` 分支即自动构建上线，约 2~3 分钟。

## Vercel

- 构建命令：`pnpm build`
- 输出目录：`dist`
- Node.js：22.23+（推荐 24）
- 环境变量：不需要；如需强制语言可设 `PUBLIC_SITE_LANG=zh_CN`

`vercel.json` 里维护了三类配置：

| 配置项 | 作用 |
| --- | --- |
| `redirects` | 旧地址 301/308：`/n/` → `/posts/n/`、`/message/` → `/guestbook/`、`/categories/{dev,system,misc}/` → `/categories/` |
| `headers` | 安全头（HSTS、X-Frame-Options 等）、`/_astro/*` 一年 `immutable`、`/pagefind/*` 一天缓存 |
| `trailingSlash` | `true`，与 canonical 的带斜杠 URL 保持一致 |

**新增旧地址跳转时，`public/_redirects` 与 `vercel.json` 的 `redirects` 要同步改**，否则两个平台行为会不一致。

Vercel 的 `permanent: true` 输出 `308`，Cloudflare 的 `301` 语义等价。

## Cloudflare Pages（备份通道）

Pages 项目 `dongyue-blog` 与 `wrangler.toml` 均保留，作为回滚后备，不再接收主线改动。

回滚步骤：把 Cloudflare DNS 里根域的 CNAME 改回 `astro-chiri-9y5.pages.dev` 并开启橙云代理即可，一分钟生效。

## 本地验证

```bash
pnpm build:site                      # 快速构建 + 重建 Pagefind 索引
pnpm exec astro preview --host 127.0.0.1 --port 4321
```

完整构建（含 GitHub 卡片、字体子集、内联脚本压缩）用 `pnpm build`：

```bash
pnpm build
```

## 发布流程

```bash
pnpm check          # 内容与类型校验，应为 0 error
pnpm build          # 本地确认能构建通过
git add -A && git commit -m "新文章：xxx"
git push origin main
```

推送后 Vercel 自动部署。`git push` 走 SSH，本机已配置 `~/.ssh/id_ed25519`（GitHub 账号 `dongyue12`）。

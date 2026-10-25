# 部署

站点是纯静态输出，构建产物在 `dist/`。

## Cloudflare Pages

- 构建命令：`pnpm build:site`
- 输出目录：`dist`
- Node.js：22.23+（推荐 24）
- 环境变量：不需要；如需强制语言可设 `PUBLIC_SITE_LANG=zh_CN`

`wrangler.toml` 已按 Pages 配置好，`public/_headers` 和 `public/_redirects` 会随构建进入 `dist/`。
也可以本地构建后用 `wrangler pages deploy dist` 上传。

## Vercel / Netlify

构建命令与输出目录同上。`_headers` / `_redirects` 只在 Cloudflare Pages / Netlify 生效；Vercel 需要把安全头改写到 `vercel.json`。

## 本地验证

```bash
pnpm build:site
pnpm exec astro preview --host 127.0.0.1 --port 4321
```

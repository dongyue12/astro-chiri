import { defineMiddleware } from "astro:middleware";

/**
 * 兼容旧地址和漏写末尾斜杠的访问：
 * - /4/            → /posts/4/（旧站文章地址）
 * - /posts/4       → /posts/4/（Astro trailingSlash: "always"）
 * - /tags/win/     → /archive/?tag=win（Firefly 的标签筛选页）
 * - /categories/x/ → /archive/?category=x（同上）
 * 静态文件和不带扩展名的资源路径不处理。
 */
const OLD_POST = /^\/(\d+)\/?$/;
const TAG_PAGE = /^\/tags\/([^/]+)\/?$/;
const CATEGORY_PAGE = /^\/categories\/([^/]+)\/?$/;

export const onRequest = defineMiddleware((context, next) => {
	const { pathname, search } = context.url;

	const old = pathname.match(OLD_POST);
	if (old) return context.redirect(`/posts/${old[1]}/`, 301);

	const tag = pathname.match(TAG_PAGE);
	if (tag) {
		return context.redirect(`/archive/?tag=${encodeURIComponent(decodeURIComponent(tag[1]))}`, 301);
	}

	const category = pathname.match(CATEGORY_PAGE);
	if (category) {
		return context.redirect(
			`/archive/?category=${encodeURIComponent(decodeURIComponent(category[1]))}`,
			301,
		);
	}

	if (
		pathname !== "/" &&
		!pathname.endsWith("/") &&
		!pathname.startsWith("/_") &&
		!/\.[a-z0-9]{1,8}$/i.test(pathname)
	) {
		return context.redirect(`${pathname}/${search}`, 301);
	}

	return next();
});

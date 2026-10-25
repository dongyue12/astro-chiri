import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp",
	name: "冬月",
	bio: "记录 Windows、开发工具和自建服务。",
	links: [
		{ name: "RSS", icon: "fa7-solid:rss", url: "/rss/", showName: false },
		{ name: "Atom", icon: "fa7-solid:atom", url: "/atom/", showName: false },
		{ name: "友链", icon: "fa7-solid:link", url: "/friends/", showName: false },
		{ name: "关于", icon: "fa7-solid:user", url: "/about/", showName: false },
	],
};

import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	title: "公告",
	content: "欢迎来到冬月的博客。这里记录 Windows、开发工具和自建服务上的踩坑与解决办法。",
	closable: true,
	link: {
		enable: true,
		text: "关于本站",
		url: "/about/",
		external: false,
	},
};

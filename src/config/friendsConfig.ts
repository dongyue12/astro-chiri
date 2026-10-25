import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

export const friendsPageConfig: FriendsPageConfig = {
	title: "友链",
	description: "一些常读的站点。想交换友链，去留言板留个地址就行。",
	showCustomContent: true,
	showComment: true,
	randomizeSort: false,
};

export const friendsConfig: FriendLink[] = [
	{
		title: "冬月的博客",
		imgurl: "/avatar.webp",
		desc: "记录 Windows、开发工具和自建服务上的踩坑与解决办法。",
		siteurl: "https://dongyue.org/",
		tags: ["本站"],
		weight: 10,
		enabled: true,
	},
	{
		title: "清遥",
		imgurl: "https://djimg.askrabbit.net/avatar.png",
		desc: "遥夜泛清瑟，西风生翠萝。",
		siteurl: "https://blog.askrabbit.net/",
		tags: ["友链"],
		weight: 9,
		enabled: true,
	},
	{
		title: "许家大院",
		imgurl: "https://blog.hesuisui.top/upload/ok-logo.png",
		desc: "经常更新一些故事很有趣。",
		siteurl: "https://blog.hesuisui.top/",
		tags: ["友链"],
		weight: 8,
		enabled: true,
	},
	{
		title: "椰汁の小站",
		imgurl: "https://free.picui.cn/free/2026/03/23/69c12fe83f7a4.jpg",
		desc: "一个热爱编程的学生。",
		siteurl: "https://home.132614.xyz/",
		tags: ["友链"],
		weight: 7,
		enabled: true,
	},
	{
		title: "番茄主理人",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=20447289&s=640",
		desc: "坐而言不如起而行。",
		siteurl: "https://fqzlr.com/",
		tags: ["友链"],
		weight: 6,
		enabled: true,
	},
	{
		title: "ZSSO",
		imgurl: "https://t.alcy.cc/ycy",
		desc: "一步一印，自成风景。",
		siteurl: "https://www.zsso.cn/",
		tags: ["友链"],
		weight: 5,
		enabled: true,
	},
];

export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);
	if (friendsPageConfig.randomizeSort) return friends.sort(() => Math.random() - 0.5);
	return friends.sort((a, b) => b.weight - a.weight);
};

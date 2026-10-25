import type { SidebarLayoutConfig } from "../types/sidebarConfig";

export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: true,
	position: "both",
	tabletSidebar: "left",
	hideSidebarOnPostPage: false,
	noSidebarContentWidth: 0.6,

	leftComponents: [
		{ type: "profile", enable: true, position: "top", showOnPostPage: true },
		{ type: "announcement", enable: true, position: "top", showOnPostPage: true },
		{ type: "categories", enable: true, position: "sticky", showOnPostPage: true, specificConfig: { collapseThreshold: 5 } },
		{ type: "tags", enable: true, position: "sticky", showOnPostPage: true, specificConfig: { collapseThreshold: 20 } },
	],

	rightComponents: [
		{ type: "stats", enable: true, position: "top", showOnPostPage: false },
		{ type: "calendar", enable: true, position: "sticky", showOnPostPage: false, specificConfig: { calendar: { showHeatmap: true } } },
		{ type: "sidebarToc", enable: true, position: "sticky", showOnPostPage: true, hideOnNonPostPage: true },
	],

	mobileBottomComponents: [
		{ type: "profile", enable: true, showOnPostPage: true },
		{ type: "categories", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 5 } },
		{ type: "tags", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 20 } },
	],
};

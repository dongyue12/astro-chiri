// 站点与外观配置。视觉规范取自 Chiri 主题（https://github.com/the3ash/astro-chiri）。
export const themeConfig = {
  site: {
    website: 'https://dongyue.org/',
    title: '冬月的博客',
    author: '冬月',
    description: '记录我在 Windows、开发工具和自建服务上踩过的坑与解决办法。',
    language: 'zh-CN',
  },

  general: {
    contentWidth: '35rem', // 内容栏宽度（含 body 左右 1.5rem 内边距）：35rem - 3rem = 512px 可用宽度
    centeredLayout: true, // true 居中，false 左对齐
    postListDottedDivider: false, // 列表标题与日期之间是否用点线填充
    footer: true,
  },

  date: {
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MONTH DAY YYYY | DAY MONTH YYYY
    dateSeparator: '.', // . - / 三种
    dateOnRight: true, // 日期是否右对齐
  },
} as const;

export type ThemeConfig = typeof themeConfig;

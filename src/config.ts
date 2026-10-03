// 站点配置。视觉规范取自 Chiri 主题（https://github.com/the3ash/astro-chiri）。
// 只保留本站在用的开关：不用的配置项等于埋着的死代码，需要时再加回来。

export interface Friend {
  name: string;
  url: string;
  description?: string;
  avatar?: string;
}

/** 侧边栏导航。改这里即可增删页面。 */
export const siteNav = [
  { href: '/message/', label: '留言' },
  { href: '/friends/', label: '友链' },
];

export const themeConfig = {
  site: {
    website: 'https://dongyue.org/',
    title: '冬月的博客',
    author: '冬月',
    description: '记录我在 Windows、开发工具和自建服务上踩过的坑与解决办法。',
    language: 'zh-CN',
  },

  // 内容栏宽度，CSS 长度（rem）。正文可用宽度 = 本值 - 3rem（body 左右各 1.5rem）。
  // 注意：正文图片的 sizes 依赖这个值来挑选合适的档位，改动后请同步 astro.config.ts。
  contentWidth: '35rem',

  // 日期格式：YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MONTH DAY YYYY | DAY MONTH YYYY
  // 分隔符只取 . - / 三种，其它字符回退为 '.'。
  date: {
    format: 'YYYY-MM-DD',
    separator: '.',
  },

  // 友链页：self 为本站信息，img 留空则用名字首字占位；links 顺序即显示顺序。
  friends: {
    self: {
      name: '冬月',
      url: 'https://dongyue.org/',
      description: '分享自己的一些学习心得和生活琐事',
      // 头像放 public/ 下，写相对路径，构建后即 https://dongyue.org/avatar.webp
      avatar: '/avatar.webp',
    } as Friend,

    links: [
      {
        name: '清遥',
        url: 'https://blog.askrabbit.net/',
        // 原 upyun.askrabbit.net 子域 DNS 解析失败，改用对方站点自己的 logo
        avatar: 'https://djimg.askrabbit.net/avatar.png',
        description: '遥夜泛清瑟，西风生翠萝。',
      },
      {
        name: '许家大院',
        url: 'https://blog.hesuisui.top/',
        avatar: 'https://blog.hesuisui.top/upload/ok-logo.png',
        description: '经常更新一些故事很有趣',
      },
      {
        name: '椰汁の小站',
        url: 'https://home.132614.xyz/',
        avatar: 'https://free.picui.cn/free/2026/03/23/69c12fe83f7a4.jpg',
        description: '一个热爱编程的学生',
      },
      {
        name: '番茄主理人',
        url: 'https://fqzlr.com/',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=20447289&s=640',
        description: '坐而言不如起而行.',
      },
      {
        name: 'ZSSO',
        url: 'https://www.zsso.cn/',
        avatar: 'https://t.alcy.cc/ycy',
        description: '一步一印，自成风景.',
      },
    ] as Friend[],
  },
} as const;

// 站点与外观配置。视觉规范取自 Chiri 主题（https://github.com/the3ash/astro-chiri）。

export interface Friend {
  name: string;
  url: string;
  description?: string;
  avatar?: string;
}

export const themeConfig = {
  site: {
    website: "https://dongyue.org/",
    title: "冬月的博客",
    author: "冬月",
    description: "记录我在 Windows、开发工具和自建服务上踩过的坑与解决办法。",
    language: "zh-CN",
  },

  // 友链页配置。
  // self：展示在页面顶部的本站信息（img 留空则用名字首字占位）。
  // links：友链列表，顺序即显示顺序；img 留空同样用首字占位，不会去请求对方站点。
  friends: {
    self: {
      title: "冬月",
      link: "https://dongyue.org/",
      // 头像文件放在 public/ 下，构建后即 https://dongyue.org/avatar.webp。
      // 这里写相对路径，本地预览和线上都能取到。
      img: "/avatar.webp",
      des: "分享自己的一些学习心得和生活琐事",
    } as Friend,

    links: [
      {
        name: "清遥",
        url: "https://blog.askrabbit.net/",
        // 原 upyun.askrabbit.net 子域无法解析（DNS 失败），改用对方站点自己的 logo
        avatar: "https://djimg.askrabbit.net/avatar.png",
        description: "遥夜泛清瑟，西风生翠萝。",
      },
      {
        name: "许家大院",
        url: "https://blog.hesuisui.top/",
        avatar: "https://blog.hesuisui.top/upload/ok-logo.png",
        description: "经常更新一些故事很有趣",
      },
      {
        name: "椰汁の小站",
        url: "https://home.132614.xyz/",
        avatar: "https://free.picui.cn/free/2026/03/23/69c12fe83f7a4.jpg",
        description: "一个热爱编程的学生",
      },
      {
        name: "番茄主理人",
        url: "https://fqzlr.com/",
        avatar: "https://q1.qlogo.cn/g?b=qq&nk=20447289&s=640",
        description: "坐而言不如起而行.",
      },
      {
        name: "ZSSO",
        url: "https://www.zsso.cn/",
        avatar: "https://t.alcy.cc/ycy",
        description: "一步一印，自成风景.",
      },
    ] as Friend[],
  },

  general: {
    contentWidth: "35rem", // 内容栏宽度（含 body 左右 1.5rem 内边距）：35rem - 3rem = 512px 可用宽度
    centeredLayout: true, // true 居中，false 左对齐
    postListDottedDivider: false, // 列表标题与日期之间是否用点线填充
    footer: true,
  },

  date: {
    dateFormat: "YYYY-MM-DD", // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MONTH DAY YYYY | DAY MONTH YYYY
    dateSeparator: ".", // . - / 三种
    dateOnRight: true, // 日期是否右对齐
  },
} as const;

export type ThemeConfig = typeof themeConfig;

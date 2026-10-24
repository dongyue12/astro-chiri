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
  { href: '/categories/', label: '分类' },
  { href: '/tags/', label: '标签' },
  { href: '/message/', label: '留言' },
  { href: '/friends/', label: '友链' },
];

/**
 * 分类：每篇文章只属于一个，放粗粒度的大方向。
 * id 同时是 URL（/categories/dev/），改 id 会让旧链接失效；显示名随便改。
 */
export const categoryIds = ['system', 'dev', 'misc'] as const;

export const categories = [
  { id: 'system', name: '系统技巧', description: 'Windows 设置、桌面和系统自带功能。' },
  { id: 'dev', name: '开发工具', description: 'Git、编辑器、命令行与开发环境。' },
  { id: 'misc', name: '杂记', description: '协议、魔方和别的零碎记录。' },
] as const;

export type CategoryId = (typeof categoryIds)[number];

/** 取分类元信息，未知 id 回落到「杂记」，避免模板里到处写兜底 */
export function getCategory(id?: string) {
  return categories.find((c) => c.id === id) ?? categories[categories.length - 1];
}

/**
 * 标签：id → 显示名。id 进 URL（/tags/git/）且只含小写字母数字和连字符，
 * 中文显示名放在这里，链接和搜索都能读，不用把中文塞进地址。
 */
export const tags: Record<string, string> = {
  '7zip': '7-Zip',
  activation: '系统激活',
  ai: 'AI',
  browser: '浏览器',
  chrome: 'Chrome',
  cli: '命令行',
  cloudflare: 'Cloudflare',
  codex: 'Codex',
  cube: '魔方',
  database: '数据库',
  docker: 'Docker',
  encoding: '编码',
  explorer: '资源管理器',
  git: 'Git',
  input: '输入法',
  license: '协议',
  mirror: '镜像源',
  network: '网络',
  notes: '笔记',
  obsidian: 'Obsidian',
  opencode: 'OpenCode',
  security: '安全',
  settings: '设置',
  shortcuts: '快捷键',
  ssh: 'SSH',
  sqlserver: 'SQL Server',
  terminal: '终端',
  vscode: 'VSCode',
  windows: 'Windows',
  winget: 'Winget',
  wps: 'WPS',
  zoxide: 'Zoxide',
};

export function getTagName(id: string): string {
  return tags[id] ?? id;
}


export const themeConfig = {
  site: {
    website: 'https://dongyue.org/',
    title: '冬月的博客',
    author: '冬月',
    description: '记录我在 Windows、开发工具和自建服务上踩过的坑与解决办法。',
    language: 'zh-CN',
    // 分享卡片图（1200×630）。放 public/ 下，构建后即 https://dongyue.org/og.png
    // 改站点标题/副标题后需要重新生成，设计和字体见 public/og.png 本身
    ogImage: '/og.png',
  },

  // 正文栏宽度，CSS 长度（rem）。文章页侧栏目录另占 14rem + 4rem 间距。
  // 注意：正文图片的 sizes 依赖这个值来挑选合适的档位，改动后请同步 astro.config.ts。
  contentWidth: '43rem',

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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * 按 themeConfig.date 渲染日期。文章页和首页共用同一份实现，
 * 从前两处各写一套，改 `format` 时首页不生效。
 */
export function formatPostDate(date: Date): string {
  const { format, separator } = themeConfig.date;
  const sep = ['.', '-', '/'].includes(separator) ? separator : '.';
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  switch (format) {
    case 'MM-DD-YYYY':
      return `${pad(m)}${sep}${pad(d)}${sep}${y}`;
    case 'DD-MM-YYYY':
      return `${pad(d)}${sep}${pad(m)}${sep}${y}`;
    case 'MONTH DAY YYYY':
      return `${MONTHS[date.getMonth()]} ${d} ${y}`;
    case 'DAY MONTH YYYY':
      return `${d} ${MONTHS[date.getMonth()]} ${y}`;
    default:
      return `${y}${sep}${pad(m)}${sep}${pad(d)}`;
  }
}

/**
 * 从正文里抽一句摘要，卡片和分享描述共用。
 * 只剥语法，不改写原文：截到第一个句末标点，超过 limit 再截断加省略号。
 */
export function excerptFrom(body = '', limit = 76): string {
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/^\s*:?-{2,}:?\s*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*[-+*]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')
    .replace(/[>*_`|~\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const first = plain.split(/(?<=[。！？.!?])/)[0] ?? plain;
  return first.length > limit ? `${first.slice(0, limit)}…` : first;
}

/**
 * 预计阅读时间（分钟）：中文按 400 字/分钟，英文按词算。
 * 代码块不计入 —— 读代码和读散文的速度不是一回事，算进去反而偏长。
 */
export function readingMinutes(body = ''): number {
  const prose = body.replace(/```[\s\S]*?```/g, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  const cjk = (prose.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (prose.match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}

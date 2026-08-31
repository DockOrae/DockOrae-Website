import { defineConfig, type DefaultTheme, type HeadConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// ============================================================
// DockOrae Docs — VitePress 主配置
//
// 部署在 GitHub Pages 项目页时 base = /DockOrae-Website/;
// 绑定自定义域名(如 docs.dockorae.com)后,在 CI 中设置
// VITE_BASE=/ 与 SITE_URL=https://docs.dockorae.com 重新构建即可,
// 无需改动本文件。
// ============================================================

const here = dirname(fileURLToPath(import.meta.url))

/** GitHub Pages 项目页 base;自定义域名时通过环境变量覆盖为 / */
const base = (process.env.VITE_BASE || '/DockOrae-Website/').replace(/\/?$/, '/')

/** 站点根域(OG / canonical / sitemap 用;base 路径会另行拼接) */
const siteUrl = (process.env.SITE_URL || 'https://dockorae.github.io').replace(/\/$/, '')

const githubRepo = 'https://github.com/DockOrae/DockOrae'
const releasesUrl = `${githubRepo}/releases`
const websiteRepo = 'https://github.com/DockOrae/DockOrae-Website'

/** 构建前由 .vitepress/scripts/fetch-version.mjs 写入的最新 Release 版本 */
interface VersionInfo {
  tag: string
  name?: string
  html_url?: string
  published_at?: string
}
function loadVersion(): VersionInfo {
  try {
    return JSON.parse(readFileSync(resolve(here, './version.json'), 'utf-8'))
  } catch {
    return { tag: 'latest', html_url: `${releasesUrl}/latest` }
  }
}
const version = loadVersion()

// ------------------------------------------------------------
// 侧边栏(中文,根路径 /)
// ------------------------------------------------------------
const zhSidebar: DefaultTheme.SidebarItem[] = [
  { text: '快速开始', link: '/getting-started' },
  {
    text: '安装',
    collapsed: false,
    items: [
      { text: '安装方式对比', link: '/guide/installation/' },
      { text: 'Docker 安装', link: '/guide/installation/docker' },
      { text: 'Docker Compose 安装', link: '/guide/installation/docker-compose' },
      { text: '二进制安装', link: '/guide/installation/binary' },
      { text: '一键安装脚本', link: '/guide/installation/script' }
    ]
  },
  {
    text: '使用指南',
    collapsed: true,
    items: [
      { text: '基础使用', link: '/guide/usage/' },
      { text: '容器管理', link: '/guide/usage/containers' },
      { text: '镜像管理', link: '/guide/usage/images' },
      { text: '网络管理', link: '/guide/usage/networks' },
      { text: '存储卷管理', link: '/guide/usage/volumes' },
      { text: 'Compose 管理', link: '/guide/usage/compose' },
      { text: '应用商店', link: '/guide/usage/appstore' }
    ]
  },
  {
    text: '配置',
    collapsed: true,
    items: [
      { text: '配置概览', link: '/guide/configuration/' },
      { text: '环境变量与启动参数', link: '/guide/configuration/environment' },
      { text: '面板设置', link: '/guide/configuration/panel' },
      { text: '数据目录与持久化', link: '/guide/configuration/storage' },
      { text: '域名与 HTTPS', link: '/guide/configuration/https' }
    ]
  },
  {
    text: '更新',
    collapsed: true,
    items: [
      { text: '更新概览', link: '/guide/update/' },
      { text: 'Compose 更新', link: '/guide/update/docker' },
      { text: '二进制更新', link: '/guide/update/binary' },
      { text: '一键脚本更新', link: '/guide/update/script' },
      { text: '面板在线更新', link: '/guide/update/panel' }
    ]
  },
  {
    text: '卸载',
    collapsed: true,
    items: [
      { text: '卸载概览', link: '/guide/uninstall/' },
      { text: 'Compose 卸载', link: '/guide/uninstall/docker' },
      { text: '二进制卸载', link: '/guide/uninstall/binary' },
      { text: '一键脚本卸载', link: '/guide/uninstall/script' }
    ]
  },
  { text: '备份与恢复', link: '/guide/backup' },
  { text: '常见问题', link: '/faq' },
  {
    text: '开发',
    collapsed: true,
    items: [
      { text: '本地开发', link: '/development/' },
      { text: '构建与发布', link: '/development/build' },
      { text: '贡献指南', link: '/development/contributing' }
    ]
  }
]

// ------------------------------------------------------------
// 侧边栏(英文,/en/)
// ------------------------------------------------------------
const enSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Getting Started', link: '/en/getting-started' },
  {
    text: 'Installation',
    collapsed: false,
    items: [
      { text: 'Installation Overview', link: '/en/guide/installation/' },
      { text: 'Docker', link: '/en/guide/installation/docker' },
      { text: 'Docker Compose', link: '/en/guide/installation/docker-compose' },
      { text: 'Binary', link: '/en/guide/installation/binary' },
      { text: 'One-click Script', link: '/en/guide/installation/script' }
    ]
  },
  {
    text: 'Usage',
    collapsed: true,
    items: [
      { text: 'Getting Around', link: '/en/guide/usage/' },
      { text: 'Containers', link: '/en/guide/usage/containers' },
      { text: 'Images', link: '/en/guide/usage/images' },
      { text: 'Networks', link: '/en/guide/usage/networks' },
      { text: 'Volumes', link: '/en/guide/usage/volumes' },
      { text: 'Compose Stacks', link: '/en/guide/usage/compose' },
      { text: 'App Store', link: '/en/guide/usage/appstore' }
    ]
  },
  {
    text: 'Configuration',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/en/guide/configuration/' },
      { text: 'Environment Variables & Flags', link: '/en/guide/configuration/environment' },
      { text: 'Panel Settings', link: '/en/guide/configuration/panel' },
      { text: 'Data Directory & Persistence', link: '/en/guide/configuration/storage' },
      { text: 'Domain & HTTPS', link: '/en/guide/configuration/https' }
    ]
  },
  {
    text: 'Update',
    collapsed: true,
    items: [
      { text: 'Update Overview', link: '/en/guide/update/' },
      { text: 'Compose Update', link: '/en/guide/update/docker' },
      { text: 'Binary Update', link: '/en/guide/update/binary' },
      { text: 'Script Update', link: '/en/guide/update/script' },
      { text: 'In-panel Update', link: '/en/guide/update/panel' }
    ]
  },
  {
    text: 'Uninstall',
    collapsed: true,
    items: [
      { text: 'Uninstall Overview', link: '/en/guide/uninstall/' },
      { text: 'Compose Uninstall', link: '/en/guide/uninstall/docker' },
      { text: 'Binary Uninstall', link: '/en/guide/uninstall/binary' },
      { text: 'Script Uninstall', link: '/en/guide/uninstall/script' }
    ]
  },
  { text: 'Backup & Restore', link: '/en/guide/backup' },
  { text: 'FAQ', link: '/en/faq' },
  {
    text: 'Development',
    collapsed: true,
    items: [
      { text: 'Local Development', link: '/en/development/' },
      { text: 'Build & Release', link: '/en/development/build' },
      { text: 'Contributing', link: '/en/development/contributing' }
    ]
  }
]

const zhNav: DefaultTheme.NavItem[] = [
  { text: '快速开始', link: '/getting-started' },
  { text: '安装', link: '/guide/installation/' },
  { text: '使用', link: '/guide/usage/' },
  { text: '配置', link: '/guide/configuration/' },
  { text: '更新', link: '/guide/update/' },
  { text: '卸载', link: '/guide/uninstall/' },
  { text: 'FAQ', link: '/faq' },
  { text: '开发', link: '/development/' }
]

const enNav: DefaultTheme.NavItem[] = [
  { text: 'Getting Started', link: '/en/getting-started' },
  { text: 'Installation', link: '/en/guide/installation/' },
  { text: 'Usage', link: '/en/guide/usage/' },
  { text: 'Configuration', link: '/en/guide/configuration/' },
  { text: 'Update', link: '/en/guide/update/' },
  { text: 'Uninstall', link: '/en/guide/uninstall/' },
  { text: 'FAQ', link: '/en/faq' },
  { text: 'Development', link: '/en/development/' }
]

// 主题配置(携带自定义 version 字段,供 VersionBadge 组件使用)
const themeConfig = {
  // VitePress 会自动为 themeConfig.logo 应用 base,此处使用站点根路径
  logo: { light: '/logo.svg', dark: '/logo-dark.svg' },
  version: { tag: version.tag, html_url: version.html_url || `${releasesUrl}/latest` },

  search: {
    provider: 'local',
    options: {
      locales: {
        root: {
          translations: {
            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
            modal: {
              noResultsText: '未找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
            }
          }
        },
        en: {
          translations: {
            button: { buttonText: 'Search', buttonAriaLabel: 'Search docs' },
            modal: {
              noResultsText: 'No results found',
              resetButtonTitle: 'Reset search',
              footer: {
                selectText: 'to select',
                navigateText: 'to navigate',
                closeText: 'to close'
              }
            }
          }
        }
      }
    }
  } as DefaultTheme.LocalSearchOptions,

  socialLinks: [{ icon: 'github', link: githubRepo }],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      nav: zhNav,
      sidebar: { '/': zhSidebar },
      outline: { label: '本页目录', level: [2, 3] },
      lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'short', timeStyle: 'medium' } },
      docFooter: { prev: '上一页', next: '下一页' },
      darkModeSwitchLabel: '外观',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '返回顶部',
      langMenuLabel: '切换语言',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      skipToContentLabel: '跳到主要内容',
      editLink: {
        pattern: `${websiteRepo}/edit/main/docs/:path`,
        text: '在 GitHub 上编辑此页'
      },
      footer: {
        message: 'GPL-3.0 License',
        copyright: `Copyright © 2026 DockOrae Team · v${version.tag}`
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      nav: enNav,
      sidebar: { '/en/': enSidebar },
      outline: { label: 'On this page', level: [2, 3] },
      lastUpdated: {
        text: 'Last updated',
        formatOptions: { dateStyle: 'short', timeStyle: 'medium' }
      },
      docFooter: { prev: 'Previous', next: 'Next' },
      darkModeSwitchLabel: 'Appearance',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Back to top',
      langMenuLabel: 'Change language',
      lightModeSwitchTitle: 'Switch to light mode',
      darkModeSwitchTitle: 'Switch to dark mode',
      skipToContentLabel: 'Skip to content',
      editLink: {
        pattern: `${websiteRepo}/edit/main/docs/:path`,
        text: 'Edit this page on GitHub'
      },
      footer: {
        message: 'GPL-3.0 License',
        copyright: `Copyright © 2026 DockOrae Team · v${version.tag}`
      }
    }
  }
} as unknown as DefaultTheme.Config & { version: { tag: string; html_url: string } }

export default defineConfig({
  lang: 'zh-CN',
  title: 'DockOrae Docs',
  description:
    'DockOrae 官方文档 — 现代化的 Docker 管理面板:容器、镜像、网络、存储卷、Compose、应用商店一站式管理。',

  base,
  srcDir: 'docs',
  cleanUrls: false,
  lastUpdated: true,
  ignoreDeadLinks: true,

  locales: {
    root: { label: '简体中文', lang: 'zh-CN' },
    en: { label: 'English', lang: 'en-US' }
  },

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#ec4899' }],
    ['meta', { property: 'og:site_name', content: 'DockOrae Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:image', content: `${siteUrl}${base}logo.svg` }],
    ['meta', { name: 'robots', content: 'index, follow' }]
  ],

  transformHead({ pageData }) {
    const head: HeadConfig[] = []
    const cleanPath = pageData.relativePath.replace(/\.md$/, '').replace(/index$/, '')
    const pageUrl = `${siteUrl}${base}${cleanPath}`
    head.push(['link', { rel: 'canonical', href: pageUrl }])
    head.push(['meta', { property: 'og:url', content: pageUrl }])
    if (pageData.title) head.push(['meta', { property: 'og:title', content: pageData.title }])
    if (pageData.description) {
      head.push(['meta', { property: 'og:description', content: pageData.description }])
    }
    return head
  },

  themeConfig
})

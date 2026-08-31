import type { PressTheme } from 'valaxy-theme-press'
import process from 'node:process'
import { $t, defineValaxyConfig } from 'valaxy'
import { addonAlgolia } from 'valaxy-addon-algolia'
import { addonComponents } from 'valaxy-addon-components'
import { addonGitLog } from 'valaxy-addon-git-log'

import { markdownThemeImagePlugin } from './utils/markdown-theme-image'
import { fetchDockOraeVersion } from './utils/version'

const COMMIT_TAG = process.env.COMMIT_TAG || (await fetchDockOraeVersion()) || 'dev'
const DOCS_COMMIT_SHA = process.env.CF_PAGES_COMMIT_SHA || process.env.DOCS_COMMIT_SHA
const DOCS_BUILT_DATE = new Date().toLocaleString('zh-CN', { hour12: false }).replace('T', ' ')
// Must have SITE_URL or build fails
const SITE_URL = process.env.SITE_URL || 'https://dockorae.github.io'
const VITE_BASE = process.env.VITE_BASE || '/'
const REPO = 'https://github.com/DockOrae/DockOrae'
const DOCS_REPO = 'https://github.com/DockOrae/DockOrae-Website'

const safelist = ['i-ri-home-line', 'i-ri-github-line', 'i-ri-arrow-up-line']

export default defineValaxyConfig<PressTheme.Config>({
  siteConfig: {
    title: $t('siteConfig.title'),
    url: SITE_URL,
    description: $t('siteConfig.description'),

    author: {
      name: 'DockOrae Team',
      link: REPO,
      avatar: `${SITE_URL}${VITE_BASE}favicon.svg`,
    },

    search: {
      enable: true,
      type: 'fuse',
    },

    mediumZoom: {
      enable: true,
    },

    license: {
      enabled: false,
    },
  },

  addons: [
    // 注册 addon(搜索实际使用本地 fuse,Algolia 仅保持主题组件解析)
    addonAlgolia({
      appId: '',
      apiKey: '',
      indexName: '',
    }),
    addonComponents(),
    addonGitLog({
      contributor: {
        strategy: 'prebuilt',
      },
      repositoryUrl: DOCS_REPO,
    }),
  ],

  theme: 'press',
  themeConfig: {
    logo: `${VITE_BASE.replace(/\/$/, '')}/logo.svg`,
    sidebar: ['guide', 'configuration', 'faq', 'ecosystem'],
    socialLinks: [{ icon: 'i-ri-github-line', link: REPO }],
    nav: [
      {
        text: 'nav.guide',
        link: '/guide',
      },
      {
        text: 'nav.configuration',
        link: '/configuration',
      },
      {
        text: 'nav.faq',
        link: '/faq',
      },
      {
        text: 'nav.ecosystem',
        link: '/ecosystem',
      },
      {
        text: 'nav.community.title',
        items: [
          {
            text: 'nav.community.issues',
            link: 'https://github.com/DockOrae/DockOrae/issues',
          },
          {
            text: 'nav.community.releases',
            link: 'https://github.com/DockOrae/DockOrae/releases',
          },
          {
            text: 'nav.community.repo',
            link: REPO,
          },
        ],
      },
      {
        text: COMMIT_TAG,
        items: [
          {
            text: 'Release Notes',
            link: `${REPO}/releases`,
          },
        ],
      },
    ],

    editLink: {
      pattern: `${DOCS_REPO}/edit/main/:path`,
    },

    footer: {
      message: DOCS_COMMIT_SHA
        ? `Commit <a href="${DOCS_REPO}/commit/${DOCS_COMMIT_SHA}">${DOCS_COMMIT_SHA?.slice(0, 8)}</a> built at ${DOCS_BUILT_DATE}`
        : `Built at ${DOCS_BUILT_DATE}`,
      copyright: `GPL-3.0 Licensed | © 2026 <a href="${REPO}" target="_blank">DockOrae Team</a>`,
    },
  },

  vite: {
    base: VITE_BASE,
  },
  unocss: {
    safelist,
  },

  markdown: {
    blocks: {
      tip: {
        icon: 'i-carbon-thumbs-up',
      },
      warning: {
        icon: 'i-carbon-warning-alt',
      },
      danger: {
        icon: 'i-carbon-warning',
      },
      info: {
        icon: 'i-carbon-information',
      },
    },

    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[!!code/g, '[!code')
        },
      },
    ],
    config: md => {
      md.use(markdownThemeImagePlugin)
    },
  },
})

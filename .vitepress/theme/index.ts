import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'

import './custom.css'
import VersionBadge from './components/VersionBadge.vue'
import HomeInstall from './components/HomeInstall.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 导航栏左侧(logo 之后):当前版本徽标
      'nav-bar-content-before': () => h(VersionBadge)
    })
  },
  enhanceApp({ app }) {
    // 首页「快速安装」组件(在 index.md 中通过 <HomeInstall /> 使用)
    app.component('HomeInstall', HomeInstall)
  }
} satisfies Theme

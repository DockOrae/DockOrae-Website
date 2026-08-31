import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'

import './custom.css'
import HomeInstall from './components/HomeInstall.vue'
import OpenHero from './components/OpenHero.vue'
import AppearanceSwitch from './components/AppearanceSwitch.vue'
import LocaleSwitch from './components/LocaleSwitch.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 首页 hero:复刻 OpenList(默认 VPHomeHero 已 CSS 隐藏)
      'home-hero-before': () => h(OpenHero),
      // 导航栏右侧:主题滑块 + 语言切换单图标(默认外观/语言按钮已 CSS 隐藏)
      'nav-bar-content-after': () =>
        h(
          'div',
          { class: 'nav-custom-actions', style: 'display:flex;align-items:center;gap:4px' },
          [h(AppearanceSwitch), h(LocaleSwitch)]
        )
    })
  },
  enhanceApp({ app }) {
    // 首页「快速安装」组件(在 index.md 中通过 <HomeInstall /> 使用)
    app.component('HomeInstall', HomeInstall)
  }
} satisfies Theme

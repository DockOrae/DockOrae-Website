<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface HeroAction {
  theme?: 'brand' | 'alt'
  text?: string
  link?: string
  type?: string
  external?: boolean
}

interface HeroConfig {
  name?: string
  text?: string
  tagline?: string
  image?: { src: string; alt?: string }
  actions?: HeroAction[]
}

const { frontmatter, lang } = useData()
const hero = computed<HeroConfig | undefined>(
  () => (frontmatter.value as Record<string, unknown>).hero as HeroConfig
)

const logo = computed(() => hero.value?.image?.src || '/favicon.svg')

/** 内部链接加语言前缀(与 VitePress 约定一致) */
function resolveLink(link: string): string {
  if (link.startsWith('http') || link.startsWith('/en/') || lang.value !== 'en') return link
  if (link.startsWith('/')) return `/en${link}`
  return link
}
</script>

<template>
  <div v-if="hero" class="open-hero">
    <!-- logo(fly 动画 + 紫蓝渐变光晕) -->
    <div class="open-hero-logo">
      <div class="open-hero-logo-bg" />
      <img class="fly-animation" :src="logo" :alt="hero.name || 'DockOrae'" aspect="1" />
    </div>

    <!-- 渐变标题 -->
    <h1>{{ hero.name }}</h1>

    <p v-if="hero.tagline" class="open-hero-tagline">{{ hero.tagline }}</p>

    <!-- 按钮组 -->
    <div v-if="hero.actions?.length" class="open-hero-actions">
      <template v-for="action in hero.actions" :key="action.link">
        <a
          v-if="action.type === 'fly'"
          class="sese-btn sese-btn--brand"
          :href="resolveLink(action.link || '/')"
        >
          <div class="svg-wrapper"><div class="icon" /></div>
          <span>{{ action.text }}</span>
        </a>
        <a
          v-else
          class="sese-btn sese-btn--alt"
          :href="resolveLink(action.link || '/')"
          :target="action.external ? '_blank' : undefined"
          :rel="action.external ? 'noopener' : undefined"
        >
          <span>{{ action.text }}</span>
        </a>
      </template>
    </div>
  </div>
</template>

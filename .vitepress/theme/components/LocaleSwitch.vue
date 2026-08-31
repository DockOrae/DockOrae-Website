<script setup lang="ts">
import { useData, useRouter } from 'vitepress'

const { lang } = useData()
const router = useRouter()

/** 复刻 OpenList legacy 模式:单图标点击直切 zh ↔ en */
function toggleLocale() {
  const target = lang.value === 'en' ? 'zh-CN' : 'en'
  if (target === 'zh-CN') {
    router.go('/')
  } else {
    router.go('/en/')
  }
}
</script>

<template>
  <button
    class="locale-switch"
    :class="{ 'is-en': lang === 'en' }"
    type="button"
    :title="lang === 'en' ? '切换到中文' : 'Switch to English'"
    :aria-label="lang === 'en' ? 'Switch to Chinese' : 'Switch to English'"
    @click="toggleLocale"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M5 15v2a2 2 0 0 0 1.85 1.994L7 19h3v2H7a4 4 0 0 1-4-4v-2zm13-5 4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16 10zm-1 2.885L15.753 16h2.492zM8 2v2h4v7H8v3H6v-3H2V4h4V2zm9 1a4 4 0 0 1 4 4v2h-2V7a2 2 0 0 0-2-2h-3V3zM6 6H4v3h2zm4 0H8v3h2z"
      />
    </svg>
  </button>
</template>

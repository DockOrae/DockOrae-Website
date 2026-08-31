<script setup lang="ts">
import { useData } from 'vitepress'

const { isDark } = useData()

/** 复刻 Valaxy toggleDarkWithTransition:View Transitions 圆形扩散 */
function toggleDark(event: MouseEvent) {
  const target = isDark.value
  if (!document.startViewTransition) {
    isDark.value = !target
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transition = document.startViewTransition(() => {
    isDark.value = !target
  })
  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <button
    class="switch-appearance"
    type="button"
    :aria-label="isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode'"
    @click="toggleDark"
  >
    <span class="check">
      <svg
        class="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </svg>
      <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
        />
      </svg>
    </span>
  </button>
</template>

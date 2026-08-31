<script setup lang="ts">
import { useData, type DefaultTheme } from 'vitepress'

interface VersionInfo {
  tag: string
  html_url: string
}

type ThemeWithVersion = DefaultTheme.Config & { version?: VersionInfo }

const { theme } = useData<ThemeWithVersion>()
</script>

<template>
  <a
    v-if="theme.version"
    class="version-badge"
    :href="theme.version.html_url"
    target="_blank"
    rel="noopener"
    :title="`DockOrae ${theme.version.tag}`"
  >
    v{{ theme.version.tag }}
  </a>
</template>

<style scoped>
.version-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  margin-right: 4px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-brand-soft);
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.version-badge:hover {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

@media (max-width: 640px) {
  .version-badge {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { githubPath } from '../../github-icon'

const githubRepo = 'https://github.com/DockOrae/DockOrae'
</script>

<template>
  <a
    class="github-link"
    :href="githubRepo"
    target="_blank"
    rel="noopener"
    :title="'GitHub'"
    :aria-label="'GitHub'"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path :d="githubPath" />
    </svg>
  </a>
</template>

<style scoped>
.github-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--vp-c-text-2);
  transition:
    color 0.2s,
    background 0.2s;
}

.github-link:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}
</style>

<script setup lang="ts">
  defineProps<{
    icon: string
    link: string
  }>()
</script>

<template>
  <span :class="icon" class="inline-icon"></span>
</template>

<style scoped>
  .inline-icon {
    display: inline-block;
    /* width: 1em;
  height: 1em; */
    font-size: inherit;
    /* line-height: 1; */
    vertical-align: text-top;
  }
</style>

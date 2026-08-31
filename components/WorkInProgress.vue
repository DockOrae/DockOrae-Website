<!--
    Copyright (c) 2025 The OpenList Projects Contributors, 2022 云游君 YunYouJun
    Licensed under the MIT License.
    For full license text, see the LICENSE file in the project root
-->

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>

<template>
  <div flex="~ col" class="justify-center items-center" gap="6" m="auto y-8" font="black">
    <h3>
      <div class="work-in-progress-icon text-4xl fly-animation">🧪</div>
    </h3>

    <span text="2xl">{{ t('wip') }}</span>
  </div>
</template>

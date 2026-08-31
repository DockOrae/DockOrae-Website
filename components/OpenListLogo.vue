<!--
    Copyright (c) 2025 The OpenList Projects Contributors, 2022 云游君 YunYouJun
    Licensed under the MIT License.
    For full license text, see the LICENSE file in the project root
-->

<script lang="ts" setup>
  import dockoraeLogo from '../assets/logo.svg'
</script>

<template>
  <div class="openlist-logo-container" relative inline-flex justify="center" items="center">
    <div class="absolute bg-img" />
    <img
      class="fly-animation h-50"
      aspect="1"
      m="auto"
      :src="dockoraeLogo"
      alt="DockOrae Logo"
      z="1"
    />
  </div>
</template>

<style lang="scss" scoped>
  .openlist-logo-container {
    &:hover {
      .bg-img {
        opacity: 0.4;
      }
    }
  }

  .bg-img {
    border-radius: 50%;
    filter: blur(72px);
    max-width: 350px;
    width: 150%;
    height: 150%;
    opacity: 0.3;
    transition: opacity 0.2s;
  }
</style>

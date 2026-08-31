<!--
    Copyright (c) 2025 The OpenList Projects Contributors, 2022 云游君 YunYouJun
    Licensed under the MIT License.
    For full license text, see the LICENSE file in the project root
-->

<template>
  <div class="press-home" style="--va-code-mobile-margin-x: 0">
    <slot name="home-hero-before" />
    <PressHomeHero />
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <PressHomeFeatures />
    <slot name="home-features-after" />

    <slot>
      <RouterView />
    </slot>
  </div>
</template>

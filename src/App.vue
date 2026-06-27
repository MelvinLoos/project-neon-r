<template>
  <div id="pwa-app" class="font-sans antialiased">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
/* Global design system consistency: use the DaisyUI cyberpunk theme everywhere */
#pwa-app {
  --neon-primary: oklch(var(--p));
  --neon-secondary: oklch(var(--s));
  --neon-accent: oklch(var(--a));
}

[data-augmented-ui] {
  --aug-border: 1px;
  --aug-border-bg: currentColor;
  --aug-inlay: 1px;
  --aug-inlay-bg: rgba(0, 0, 0, 0.5);
}
</style>

<template>
  <div id="pwa-app" class="font-sans antialiased">
    <div
      v-if="battery.supported && battery.isLow.value"
      class="fixed top-0 left-0 w-full z-[100] bg-error/90 text-error-content text-center py-2 px-4 text-xs sm:text-sm font-mono uppercase tracking-widest animate-pulse border-b border-error"
      role="status"
      aria-live="polite"
    >
      ⚠️ LOW POWER - CYBERDECK FAILING ⚠️
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { useBattery } from './composables/useBattery';

const battery = useBattery();
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

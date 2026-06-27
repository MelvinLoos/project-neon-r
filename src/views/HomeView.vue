<template>
  <div class="min-h-screen bg-base-100 text-base-content p-4">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-primary">{{ $t("app.title") }}</h1>
      <div class="flex gap-4">
        <label class="label cursor-pointer flex gap-2">
          <span class="label-text">{{ $t("app.reduceMotion") }}</span>
          <input type="checkbox" class="toggle toggle-primary" :checked="appStore.reduceMotion" @change="appStore.toggleReduceMotion" />
        </label>
        <label class="label cursor-pointer flex gap-2">
          <span class="label-text">{{ $t("app.clearTypography") }}</span>
          <input type="checkbox" class="toggle toggle-secondary" :checked="appStore.clearTypography" @change="appStore.toggleClearTypography" />
        </label>
      </div>
    </header>
    <main>
      <div data-augmented-ui="tl-clip tr-clip br-clip bl-clip border" class="p-8 bg-neutral text-neutral-content cyber-box">
        <h2 class="text-2xl mb-4 text-accent">{{ $t("app.welcome") }}</h2>
        <p>This is the cyberpunk themed Augmented UI container.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAppStore } from "../stores/app";
const appStore = useAppStore();
</script>

<style scoped>
.cyber-box {
  --aug-border-all: 2px;
  --aug-border-bg: var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));
  --aug-tl: 20px;
  --aug-tr: 20px;
  --aug-br: 20px;
  --aug-bl: 20px;
}
</style>

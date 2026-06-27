<template>
  <div class="min-h-screen bg-base-100 text-base-content p-4">
    <header class="flex flex-col gap-4 mb-8">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold text-primary">{{ $t("app.title") }}</h1>
        <div class="flex gap-4">
          <label class="label cursor-pointer flex gap-2 tooltip" data-tip="Mute audio and disable animations">
            <span class="label-text font-bold text-warning">{{ $t("app.overstimulationMode") }}</span>
            <input type="checkbox" class="toggle toggle-warning" :checked="appStore.overstimulationMode" @change="appStore.toggleOverstimulationMode" />
          </label>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <label class="label cursor-pointer flex gap-2">
          <span class="label-text">{{ $t("app.reduceMotion") }}</span>
          <input type="checkbox" class="toggle toggle-primary" :checked="appStore.reduceMotion" @change="appStore.toggleReduceMotion" :disabled="appStore.overstimulationMode" />
        </label>
        <label class="label cursor-pointer flex gap-2">
          <span class="label-text">{{ $t("app.clearTypography") }}</span>
          <input type="checkbox" class="toggle toggle-secondary" :checked="appStore.clearTypography" @change="appStore.toggleClearTypography" />
        </label>
      </div>
    </header>
    <main>
      <div data-augmented-ui="tl-clip tr-clip br-clip bl-clip border" class="p-8 bg-neutral text-neutral-content cyber-box" @mouseenter="playBleepSound" @click="playBleepSound">
        <h2 class="text-2xl mb-4 text-accent">{{ $t("app.welcome") }}</h2>
        <p>This is the cyberpunk themed Augmented UI container.</p>
        <button class="btn btn-primary mt-4" @click="playBleepSound">Cyber Button (Bleep)</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAppStore } from "../stores/app";
import { playBleep, playSynth } from "../services/audioSystem";
import { onMounted } from "vue";

const appStore = useAppStore();

const playBleepSound = () => {
    playBleep();
}

onMounted(() => {
    // Optionally start background synth on mount (might require user interaction first in some browsers)
    // For now we will rely on user starting it if we wanted to enforce it, but let's try starting it.
    playSynth();
})
</script>

<style scoped>
.cyber-box {
  --aug-border-all: 2px;
  --aug-border-bg: var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));
  --aug-tl: 20px;
  --aug-tr: 20px;
  --aug-br: 20px;
  --aug-bl: 20px;
  transition: all 0.3s ease;
}
.cyber-box:hover {
  --aug-border-bg: var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)));
}
</style>


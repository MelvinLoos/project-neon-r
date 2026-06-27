<template>
  <div class="min-h-screen bg-base-100 text-base-content p-4">
    <header class="flex flex-col gap-4 mb-8">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold text-primary">{{ $t("app.title") }}</h1>
        <div class="flex gap-4">
          <!-- Add locale switcher for testing -->
          <select v-model="$i18n.locale" class="select select-bordered select-sm">
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
          </select>
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
      <div data-augmented-ui="tl-clip tr-clip br-clip bl-clip border" class="p-8 bg-neutral text-neutral-content cyber-box mb-8" @mouseenter="playBleepSound" @click="playBleepSound">
        <h2 class="text-2xl mb-4 text-accent">{{ $t("app.welcome") }}</h2>
        <p>This is the cyberpunk themed Augmented UI container.</p>
        <button class="btn btn-primary mt-4" @click="playBleepSound">Cyber Button (Bleep)</button>
        
        <!-- Example puzzle requiring hints -->
        <div class="mt-8 p-4 bg-base-300 rounded border border-base-100 text-base-content">
          <h3 class="font-bold mb-2 text-error">SYSTEM LOCK: Password Required</h3>
          <p class="mb-4 text-sm font-mono opacity-80">A strange sequence is displayed: 1, 1, 2, 3, 5, 8, 13...</p>
          <input type="text" class="input input-bordered w-full max-w-xs" placeholder="Enter sequence code" />
        </div>
      </div>

      <!-- Hint System -->
      <TimeReleasedHints 
        timerKey="puzzle_1_hints" 
        :hint1Delay="30000" 
        :hint2Delay="60000" 
        :bypassDelay="90000"
        @bypass="handleBypass"
      >
        <template #hint1>
          <p>The sequence seems to be adding the two previous numbers together. 1+1=2, 1+2=3...</p>
        </template>
        <template #hint2>
          <p>This is the Fibonacci sequence. The next number is 8+13.</p>
        </template>
      </TimeReleasedHints>

      <div class="mt-8">
        <router-link to="/phase-1" class="btn btn-secondary">Go to Phase 1 Briefing</router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAppStore } from "../stores/app";
import { playBleep, playSynth } from "../services/audioSystem";
import { onMounted } from "vue";
import TimeReleasedHints from "../components/TimeReleasedHints.vue";

const appStore = useAppStore();

const playBleepSound = () => {
    playBleep();
}

const handleBypass = () => {
  alert("Auto-Bypass Triggered: The correct answer is 21.");
};

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

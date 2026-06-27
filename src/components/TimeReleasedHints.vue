<template>
  <div class="time-released-hints bg-base-200 p-4 rounded-lg shadow-md border border-base-300 mt-6 relative"
    aria-live="polite">
    <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ t('hints.bruteForceTitle') }}
      </h3>
      <span class="text-sm text-base-content/70 flex items-center gap-1 mt-1 sm:mt-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ t('hints.noTimePressure') }}
      </span>
    </div>

    <div class="space-y-4">
      <!-- Hint 1 -->
      <div class="hint-container bg-base-100 rounded-lg p-4 border border-base-200 transition-all">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">{{ t('hints.hint1Label') }}</span>
          <span v-if="!hint1Unlocked" class="text-xs font-mono bg-base-300 px-2 py-1 rounded">
            {{ hint1TimeLeft }}
          </span>
          <span v-else class="text-xs text-success font-semibold px-2 py-1 bg-success/10 rounded">
            {{ t('hints.statusUnlocked') }}
          </span>
        </div>

        <div v-if="!hint1Unlocked" class="flex items-center gap-2 text-base-content/60 text-sm">
          <span class="loading loading-spinner loading-xs"></span>
          {{ t('hints.analyzing1') }}
        </div>
        
        <div v-else-if="!hint1Viewed">
          <button @click="revealHint1" class="btn btn-sm btn-primary w-full">
            {{ t('hints.revealHint1') }}
          </button>
        </div>
        
        <div v-else class="p-3 bg-primary/10 rounded-md border-l-4 border-primary text-sm">
          <slot name="hint1">Hint 1 text will appear here</slot>
        </div>
      </div>

      <!-- Hint 2 -->
      <div class="hint-container bg-base-100 rounded-lg p-4 border border-base-200 transition-all">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">{{ t('hints.hint2Label') }}</span>
          <span v-if="!hint2Unlocked" class="text-xs font-mono bg-base-300 px-2 py-1 rounded">
            {{ hint2TimeLeft }}
          </span>
          <span v-else class="text-xs text-success font-semibold px-2 py-1 bg-success/10 rounded">
            {{ t('hints.statusUnlocked') }}
          </span>
        </div>

        <div v-if="!hint2Unlocked" class="flex items-center gap-2 text-base-content/60 text-sm">
          <span class="loading loading-spinner loading-xs" :class="{'opacity-50': !hint1Unlocked}"></span>
          {{ t('hints.analyzing2') }}
        </div>
        
        <div v-else-if="!hint2Viewed">
          <button @click="revealHint2" class="btn btn-sm btn-primary w-full">
            {{ t('hints.revealHint2') }}
          </button>
        </div>
        
        <div v-else class="p-3 bg-primary/10 rounded-md border-l-4 border-primary text-sm">
          <slot name="hint2">Hint 2 text will appear here</slot>
        </div>
      </div>

      <!-- Auto Bypass -->
      <div class="bypass-container bg-base-100 rounded-lg p-4 border-2 border-warning/30 transition-all">
        <div class="flex justify-between items-center mb-2">
          <span class="font-bold text-warning flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            Auto-Bypass
          </span>
          <span v-if="!bypassUnlocked" class="text-xs font-mono bg-warning/10 text-warning px-2 py-1 rounded">
            {{ bypassTimeLeft }}
          </span>
          <span v-else class="text-xs text-success font-semibold px-2 py-1 bg-success/10 rounded">
            {{ t('hints.statusUnlocked') }}
          </span>
        </div>

        <div v-if="!bypassUnlocked" class="flex items-center gap-2 text-warning/70 text-sm">
          <span class="loading loading-spinner loading-xs"></span>
          {{ t('hints.analyzingBypass') }}
        </div>
        
        <div v-else>
          <button @click="$emit('bypass')" class="btn btn-sm btn-warning w-full font-bold">
            {{ t('hints.triggerBypass') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Dev tools (optional, remove in production) -->
    <div v-if="devMode" class="mt-4 pt-4 border-t border-base-300 text-xs text-right">
      <button @click="debugAdvanceTime(60000)" class="btn btn-xs btn-ghost">Fast Forward 1m</button>
      <button @click="resetTimer" class="btn btn-xs btn-ghost">Reset Timer</button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useTimeReleasedHints } from '../composables/useTimeReleasedHints';

const props = defineProps({
  timerKey: {
    type: String,
    required: true
  },
  hint1Delay: {
    type: Number,
    default: 3 * 60 * 1000 // 3 mins
  },
  hint2Delay: {
    type: Number,
    default: 6 * 60 * 1000 // 6 mins
  },
  bypassDelay: {
    type: Number,
    default: 10 * 60 * 1000 // 10 mins
  },
  devMode: {
    type: Boolean,
    default: true
  }
});

defineEmits(['bypass']);

const { t } = useI18n();

const {
  hint1Unlocked,
  hint1Viewed,
  hint2Unlocked,
  hint2Viewed,
  bypassUnlocked,
  hint1TimeLeft,
  hint2TimeLeft,
  bypassTimeLeft,
  revealHint1,
  revealHint2,
  resetTimer,
  debugAdvanceTime
} = useTimeReleasedHints({
  timerKey: props.timerKey,
  hint1Delay: props.hint1Delay,
  hint2Delay: props.hint2Delay,
  bypassDelay: props.bypassDelay
});
</script>

<style scoped>
.hint-container, .bypass-container {
  overflow: hidden;
}
</style>

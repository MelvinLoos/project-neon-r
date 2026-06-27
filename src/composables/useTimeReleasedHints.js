import { ref, onMounted, onUnmounted, computed } from 'vue';

export function useTimeReleasedHints(config = {}) {
  const {
    timerKey = 'hint_timer',
    hint1Delay = 3 * 60 * 1000, 
    hint2Delay = 6 * 60 * 1000,
    bypassDelay = 10 * 60 * 1000,
  } = config;

  const startTime = ref(null);
  const currentTime = ref(Date.now());
  let intervalId = null;

  const hint1Unlocked = ref(false);
  const hint1Viewed = ref(false);
  const hint2Unlocked = ref(false);
  const hint2Viewed = ref(false);
  const bypassUnlocked = ref(false);

  const initTimer = () => {
    // Try to load from localStorage first
    const saved = localStorage.getItem(timerKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      startTime.value = parsed.start;
      hint1Viewed.value = parsed.h1v || false;
      hint2Viewed.value = parsed.h2v || false;
    } else {
      startTime.value = Date.now();
      saveState();
    }
  };

  const saveState = () => {
    localStorage.setItem(timerKey, JSON.stringify({
      start: startTime.value,
      h1v: hint1Viewed.value,
      h2v: hint2Viewed.value
    }));
  };

  const updateState = () => {
    currentTime.value = Date.now();
    const elapsed = currentTime.value - startTime.value;

    if (elapsed >= hint1Delay && !hint1Unlocked.value) {
      hint1Unlocked.value = true;
    }
    if (elapsed >= hint2Delay && !hint2Unlocked.value) {
      hint2Unlocked.value = true;
    }
    if (elapsed >= bypassDelay && !bypassUnlocked.value) {
      bypassUnlocked.value = true;
    }
  };

  const formatTimeRemaining = (targetTimeMs) => {
    const elapsed = currentTime.value - startTime.value;
    const remaining = Math.max(0, targetTimeMs - elapsed);
    if (remaining === 0) return '0:00';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const hint1TimeLeft = computed(() => formatTimeRemaining(hint1Delay));
  const hint2TimeLeft = computed(() => formatTimeRemaining(hint2Delay));
  const bypassTimeLeft = computed(() => formatTimeRemaining(bypassDelay));

  const revealHint1 = () => {
    if (hint1Unlocked.value) {
      hint1Viewed.value = true;
      saveState();
    }
  };

  const revealHint2 = () => {
    if (hint2Unlocked.value) {
      hint2Viewed.value = true;
      saveState();
    }
  };

  const resetTimer = () => {
    startTime.value = Date.now();
    hint1Unlocked.value = false;
    hint1Viewed.value = false;
    hint2Unlocked.value = false;
    hint2Viewed.value = false;
    bypassUnlocked.value = false;
    saveState();
    updateState();
  };

  // For testing/debugging, we can advance time
  const debugAdvanceTime = (ms) => {
    startTime.value -= ms;
    saveState();
    updateState();
  };

  onMounted(() => {
    initTimer();
    updateState();
    intervalId = setInterval(updateState, 1000);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return {
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
  };
}

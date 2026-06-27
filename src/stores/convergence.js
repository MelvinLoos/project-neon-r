import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '../services/supabase';

export const useConvergenceStore = defineStore('convergence', () => {
  const selectedRole = ref(null);
  const stability = ref(50);
  const codeProgress = ref(0);
  const targetFound = ref(false);
  const missionAccomplished = ref(false);
  const scanStatus = ref('SEARCHING...');
  const isARActive = ref(false);
  const glitchOffsets = ref([0, 0, 0, 0, 0, 0]);

  let channel = null;
  let decayInterval = null;
  let glitchInterval = null;
  let mindarLoader = null;

  const roleDisplayName = computed(() => {
    switch (selectedRole.value) {
      case 'shield': return 'Shield Operator';
      case 'codebreaker': return 'Code Breaker';
      case 'intel': return 'Intel / Observer';
      default: return '';
    }
  });

  const selectRole = (role) => {
    selectedRole.value = role;
    if (role === 'intel') setTimeout(() => initAR(), 100);
  };

  const clearRole = () => {
    selectedRole.value = null;
    stopAR();
  };

  const initRealtime = () => {
    if (channel) return;
    channel = supabase.channel('boss_battle', {
      config: { broadcast: { self: false } }
    });
    channel.on('broadcast', { event: 'action' }, ({ payload }) => {
      if (payload.type === 'mash') {
        stability.value = Math.min(100, stability.value + payload.value);
      } else if (payload.type === 'code_progress') {
        codeProgress.value = payload.value;
        checkWin();
      } else if (payload.type === 'target_found') {
        targetFound.value = true;
        checkWin();
      } else if (payload.type === 'mission_accomplished') {
        missionAccomplished.value = true;
      } else if (payload.type === 'shield_decay') {
        stability.value = payload.value;
      }
    }).subscribe();
  };

  const broadcastAction = (payload) => {
    if (channel) {
      channel.send({ type: 'broadcast', event: 'action', payload });
    }
  };

  const checkWin = () => {
    if (codeProgress.value >= 5 && targetFound.value) {
      missionAccomplished.value = true;
      broadcastAction({ type: 'mission_accomplished' });
    }
  };

  const mashShield = () => {
    if (missionAccomplished.value) return;
    stability.value = Math.min(100, stability.value + 5);
    broadcastAction({ type: 'mash', value: 5 });
  };

  const clickNode = (n) => {
    if (missionAccomplished.value) return false;
    if (codeProgress.value === n - 1) {
      codeProgress.value = n;
      broadcastAction({ type: 'code_progress', value: codeProgress.value });
      checkWin();
      return true;
    }
    return false;
  };

  const glitchStyle = (n) => {
    if (stability.value >= 30 || selectedRole.value !== 'codebreaker') return {};
    const offset = glitchOffsets.value[n] || 0;
    const ry = (Math.random() - 0.5) * 10;
    return { transform: `translate(${offset}px, ${ry}px)` };
  };

  const initAR = () => {
    if (isARActive.value) return;
    scanStatus.value = 'INITIALIZING SENSORS...';
    setTimeout(() => {
      scanStatus.value = 'SCANNING FOR TARGETS...';
      isARActive.value = true;
      mindarLoader = setInterval(() => {
        if (Math.random() > 0.85 && !targetFound.value) {
          scanStatus.value = 'MARKER LOCK ACQUIRED';
          setTimeout(() => {
            if (scanStatus.value === 'MARKER LOCK ACQUIRED' && !targetFound.value) {
              scanStatus.value = 'SCANNING FOR TARGETS...';
            }
          }, 4000);
        }
      }, 2000);
    }, 1500);
  };

  const stopAR = () => {
    isARActive.value = false;
    if (mindarLoader) {
      clearInterval(mindarLoader);
      mindarLoader = null;
    }
  };

  const identifySymbol = () => {
    if (missionAccomplished.value) return;
    targetFound.value = true;
    scanStatus.value = 'TARGET DATA SECURED';
    broadcastAction({ type: 'target_found' });
    checkWin();
  };

  const startGameLoop = () => {
    if (decayInterval || glitchInterval) return;
    decayInterval = setInterval(() => {
      if (!missionAccomplished.value && stability.value > 0) {
        stability.value = Math.max(0, stability.value - 2);
        if (stability.value < 30 && selectedRole.value === 'codebreaker') {
          if (Math.random() < 0.15 && codeProgress.value > 0) {
            codeProgress.value--;
            broadcastAction({ type: 'code_progress', value: codeProgress.value });
          }
        }
        if (selectedRole.value === 'shield' && Math.random() < 0.1) {
          broadcastAction({ type: 'shield_decay', value: stability.value });
        }
      }
    }, 1000);

    glitchInterval = setInterval(() => {
      if (stability.value < 30) {
        glitchOffsets.value = [0, 1, 2, 3, 4, 5].map(() => (Math.random() - 0.5) * 20);
      } else {
        glitchOffsets.value = [0, 0, 0, 0, 0, 0];
      }
    }, 100);
  };

  const stopGameLoop = () => {
    if (decayInterval) {
      clearInterval(decayInterval);
      decayInterval = null;
    }
    if (glitchInterval) {
      clearInterval(glitchInterval);
      glitchInterval = null;
    }
  };

  const cleanup = () => {
    stopAR();
    stopGameLoop();
    if (channel) {
      supabase.removeChannel(channel);
      channel = null;
    }
  };

  return {
    selectedRole,
    stability,
    codeProgress,
    targetFound,
    missionAccomplished,
    scanStatus,
    isARActive,
    glitchOffsets,
    roleDisplayName,
    selectRole,
    clearRole,
    mashShield,
    clickNode,
    glitchStyle,
    identifySymbol,
    initRealtime,
    broadcastAction,
    startGameLoop,
    stopGameLoop,
    cleanup
  };
});

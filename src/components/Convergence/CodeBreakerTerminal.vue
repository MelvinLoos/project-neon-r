<template>
  <div class="space-y-4 sm:space-y-6 font-mono relative z-10">
    <div v-if="store.stability < 30" class="absolute inset-0 bg-red-900/10 pointer-events-none z-0 rounded-lg animate-pulse mix-blend-color-dodge"></div>

    <div class="bg-black/50 p-3 sm:p-4 rounded-lg border-l-4 border-purple-500 w-full mb-4">
      <h4 class="text-purple-400 font-bold mb-2 uppercase text-xs sm:text-sm tracking-widest">{{ $t('phase3.currentObjective') }}</h4>
      <p class="text-purple-100/80 text-sm sm:text-base">{{ $t('phase3.roleCodebreaker.objective') }}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
      <div class="flex flex-col gap-4">
        <div class="bg-black/80 p-3 sm:p-4 border border-purple-900/50 rounded-lg shadow-inner">
          <h4 class="text-purple-400 font-bold mb-3 uppercase text-xs tracking-widest border-b border-purple-900/50 pb-2">{{ $t('phase3.codebreakerTransmissionLog') }}</h4>
          <div class="space-y-2 text-xs sm:text-sm pl-2">
            <div class="text-neutral-content/70">> {{ $t('phase3.codebreakerSysFreq') }}</div>
            <div class="text-neutral-content/70">
              > {{ $t('phase3.codebreakerTargetSync') }}
              <span class="ml-2 font-bold" :class="store.targetFound ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-amber-500 animate-pulse'">
                {{ store.targetFound ? $t('phase3.codebreakerAcquired') : $t('phase3.codebreakerAwaitingObserver') }}
              </span>
            </div>
            <div class="text-neutral-content/70">
              > {{ $t('phase3.codebreakerGridStatus') }}
              <span class="ml-2 font-bold tracking-wider" :class="store.stability < 30 ? 'text-red-500 animate-[bounce_0.5s_infinite]' : 'text-emerald-400'">
                {{ store.stability < 30 ? $t('phase3.codebreakerCritical') : $t('phase3.codebreakerOptimal') }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-black/80 p-3 sm:p-4 border border-purple-900/50 rounded-lg shadow-inner">
          <h4 class="text-purple-400 font-bold mb-3 uppercase text-xs tracking-widest border-b border-purple-900/50 pb-2">{{ $t('phase3.codebreakerRoutingProtocol') }}</h4>
          <div class="flex flex-col gap-3 sm:gap-4 relative py-2 pl-3 sm:pl-4">
            <div class="absolute left-[2.25rem] top-6 bottom-6 w-2 bg-slate-800 -z-10 rounded shadow-inner"></div>
            <div class="absolute left-[2.25rem] top-6 w-2 bg-purple-500 -z-10 rounded transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" :style="{ height: `calc(${(store.codeProgress / 4) * 100}% - 3rem)` }"></div>

            <div v-for="n in 5" :key="n" class="flex items-center gap-6 transition-all duration-200 relative" :style="store.glitchStyle(n)">
              <button
                @click="store.clickNode(n)"
                class="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 flex-shrink-0 flex items-center justify-center font-bold text-base sm:text-xl transition-all duration-300 z-10 bg-base-300"
                :class="[
                  store.codeProgress >= n ? 'border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)] bg-purple-900/20' :
                  (store.codeProgress === n - 1 ? 'border-amber-500 text-amber-500 animate-pulse cursor-pointer hover:bg-amber-900/40 hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-base-100/20 text-slate-600 opacity-50 cursor-not-allowed')
                ]"
                :disabled="store.codeProgress !== n - 1"
              >
                {{ n }}
              </button>
              <div class="flex-grow bg-base-300/80 rounded-lg p-2 sm:p-3 border border-base-100/20 flex justify-between items-center shadow-inner" :class="{ 'opacity-40': store.codeProgress < n - 1 }">
                <span class="text-xs px-2 py-1 rounded bg-black border border-base-100/20 tracking-wider">{{ $t('phase3.codebreakerNodeN00', { n }) }}</span>
                <span class="text-xs font-bold tracking-widest" :class="store.codeProgress >= n ? 'text-purple-400' : 'text-slate-500'">{{ store.codeProgress >= n ? $t('phase3.codebreakerRouted') : $t('phase3.codebreakerUnlinked') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-black/80 p-3 sm:p-4 border border-purple-900/50 rounded-lg h-full flex flex-col shadow-inner">
          <h4 class="text-purple-400 font-bold mb-2 uppercase text-xs tracking-widest border-b border-purple-900/50 pb-2">{{ $t('phase3.codebreakerDecryptionMatrix') }}</h4>
          <div class="flex-grow relative overflow-hidden flex items-center justify-center p-3 sm:p-4">
            <div class="grid grid-cols-6 gap-2 w-full opacity-40 transition-opacity duration-300" :class="{ 'opacity-80': store.stability < 30 }">
              <div v-for="i in 36" :key="i" class="aspect-square rounded-sm border transition-all duration-300 flex items-center justify-center overflow-hidden" :class="store.stability < 30 ? 'border-red-900/50 glitch' : 'border-purple-900/30'">
                <div class="w-full h-full transition-all duration-200" :class="store.stability < 30 ? 'bg-red-500/20' : 'bg-purple-500/20'" :style="{ opacity: Math.random() > (store.stability < 30 ? 0.2 : 0.7) ? 1 : 0 }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConvergenceStore } from '../../stores/convergence';

const store = useConvergenceStore();
</script>

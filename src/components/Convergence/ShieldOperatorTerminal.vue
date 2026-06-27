<template>
  <div class="space-y-4 sm:space-y-6 relative z-10 flex flex-col items-center">
    <div class="bg-black/50 p-3 sm:p-4 rounded-lg border-l-4 border-emerald-500 w-full mb-4 sm:mb-8">
      <h4 class="text-emerald-400 font-bold mb-2 uppercase text-xs sm:text-sm tracking-widest">Current Objective</h4>
      <p class="text-emerald-100/80 text-sm sm:text-base">Pump power into the stability grid! Do not let stability fall below 30% or the Code Breaker's systems will glitch critically.</p>
    </div>

    <div class="py-4 sm:py-8 w-full flex justify-center">
      <button
        @touchstart.prevent="store.mashShield"
        @mousedown.prevent="store.mashShield"
        class="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 border-[8px] sm:border-[12px] border-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.5),inset_0_15px_30px_rgba(255,255,255,0.4)] hover:brightness-110 active:scale-95 active:shadow-[inset_0_20px_30px_rgba(0,0,0,0.6)] transition-all flex flex-col items-center justify-center gap-2 select-none"
      >
        <span class="text-4xl sm:text-6xl mb-2 drop-shadow-lg">⚡</span>
        <span class="font-bold text-white tracking-widest uppercase text-lg sm:text-2xl drop-shadow w-full text-center">MASH TO</span>
        <span class="font-bold text-emerald-100 tracking-widest uppercase text-base sm:text-xl opacity-80 w-full text-center">STABILIZE</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useConvergenceStore } from '../../stores/convergence';

const store = useConvergenceStore();
</script>

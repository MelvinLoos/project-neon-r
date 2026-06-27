<template>
  <div class="convergence-base min-h-screen bg-neutral text-neutral-content p-2 sm:p-4 font-mono flex flex-col items-center overflow-hidden">
    <header class="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 border-b-2 border-cyan-800 pb-2 sm:pb-4 relative z-10 gap-2">
      <h1 class="text-xl sm:text-2xl md:text-3xl text-secondary font-bold uppercase tracking-widest">Phase 3: Convergence Base</h1>
      <div class="flex gap-2"><button @click="router.push('/')" class="btn btn-outline btn-xs sm:btn-sm btn-info">Abort to Home</button></div>
    </header>

    <main class="w-full max-w-4xl flex-grow flex flex-col items-center relative z-10">
      
      <!-- Mission Accomplished Overlay -->
      <div v-if="store.missionAccomplished" class="absolute inset-0 bg-emerald-900/90 z-50 flex flex-col items-center justify-center rounded-xl border-4 border-emerald-500 animate-pulse backdrop-blur-sm p-4">
        <h2 class="text-3xl sm:text-5xl md:text-6xl text-emerald-100 font-bold mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-center">MISSION ACCOMPLISHED</h2>
        <p class="text-base sm:text-lg md:text-xl text-emerald-200 text-center mb-6 sm:mb-8">The Convergence Protocol is stable.</p>
        <button @click="router.push('/')" class="mt-4 sm:mt-8 btn btn-sm sm:btn-md btn-success shadow-[0_0_20px_rgba(16,185,129,0.5)]">Return to Base</button>
      </div>

      <!-- Role Selection Screen -->
      <section v-if="!store.selectedRole && !store.missionAccomplished" class="w-full max-w-2xl bg-base-300 p-4 sm:p-8 rounded-xl border border-secondary/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex flex-col gap-4 sm:gap-6">
        <div class="text-center mb-2 sm:mb-4">
          <h2 class="text-xl sm:text-2xl text-secondary font-bold mb-2">Select Operation Role</h2>
          <p class="text-neutral-content/70 text-sm sm:text-base">Choose your assigned clearance level for the Convergence protocol. Each role provides optimized interfaces tailored to different cognitive approaches. Synchronization with team is required.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <button @click="store.selectRole('shield')" class="flex flex-col items-center justify-center p-4 sm:p-6 bg-base-300 border-2 border-emerald-900 hover:border-emerald-500 rounded-lg transition-all group gap-2 sm:gap-3 ring-0 outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-950 flex items-center justify-center group-hover:bg-emerald-900 transition-colors z-10"><span class="text-xl sm:text-2xl">🛡️</span></div>
            <h3 class="text-emerald-400 font-bold text-center z-10 text-sm sm:text-base">Shield Operator</h3>
            <p class="text-xs text-slate-400 text-center z-10">High intensity, physical feedback, barrier maintenance.</p>
            <div class="absolute bottom-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          <button @click="store.selectRole('codebreaker')" class="flex flex-col items-center justify-center p-4 sm:p-6 bg-base-300 border-2 border-purple-900 hover:border-purple-500 rounded-lg transition-all group gap-2 sm:gap-3 ring-0 outline-none focus:ring-2 focus:ring-purple-400 relative overflow-hidden">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-950 flex items-center justify-center group-hover:bg-purple-900 transition-colors z-10"><span class="text-xl sm:text-2xl">🧩</span></div>
            <h3 class="text-purple-400 font-bold text-center z-10 text-sm sm:text-base">Code Breaker</h3>
            <p class="text-xs text-slate-400 text-center z-10">Calm routing puzzle, pattern recognition, systematic flow.</p>
            <div class="absolute bottom-0 left-0 h-1 bg-purple-500 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          <button @click="store.selectRole('intel')" class="flex flex-col items-center justify-center p-4 sm:p-6 bg-base-300 border-2 border-blue-900 hover:border-blue-500 rounded-lg transition-all group gap-2 sm:gap-3 ring-0 outline-none focus:ring-2 focus:ring-blue-400 relative overflow-hidden">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-950 flex items-center justify-center group-hover:bg-blue-900 transition-colors z-10"><span class="text-xl sm:text-2xl">👁️</span></div>
            <h3 class="text-blue-400 font-bold text-center z-10 text-sm sm:text-base">Intel / Observer</h3>
            <p class="text-xs text-slate-400 text-center z-10">AR Scanning, environment analysis, objective targeting.</p>
            <div class="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>
      </section>

      <!-- Global Battle Status (Visible to all assigned roles) -->
      <section v-if="store.selectedRole && !store.missionAccomplished" class="w-full bg-base-300 p-4 rounded-t-lg border-t border-l border-r border-base-100/20 mt-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
        <div class="flex-grow w-full md:w-auto">
          <div class="flex justify-between items-end mb-1">
            <span class="text-xs font-bold text-slate-400 tracking-wider">SYSTEM STABILITY</span>
            <span class="font-mono text-sm" :class="store.stability < 30 ? 'text-red-400 animate-pulse' : 'text-emerald-400'">{{ store.stability.toFixed(0) }}%</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-4 overflow-hidden border border-base-100/20 relative">
            <div class="h-full transition-all duration-300" :class="store.stability < 30 ? 'bg-red-500' : (store.stability < 60 ? 'bg-amber-500' : 'bg-emerald-500')" :style="{ width: `${store.stability}%` }"></div>
          </div>
        </div>

        <div class="flex gap-4 items-center w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-base-100/20">
          <div class="flex flex-col items-center">
            <span class="text-[10px] text-slate-500 mb-1">ROUTING</span>
            <div class="flex gap-1 bg-base-300 p-1 rounded">
              <div v-for="i in 5" :key="i" class="w-4 h-4 rounded-sm border" :class="i <= store.codeProgress ? 'bg-purple-500 border-purple-300 shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'bg-transparent border-base-100/30'"></div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-[10px] text-slate-500 mb-1">TARGET</span>
            <div class="w-6 h-6 rounded-full border bg-base-300 flex items-center justify-center">
              <div class="w-4 h-4 rounded-full transition-all duration-300" :class="store.targetFound ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-slate-800'"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Role-Specific UI Dashboard -->
      <section v-if="store.selectedRole && !store.missionAccomplished" class="w-full bg-base-300 p-4 sm:p-6 rounded-b-lg border border-base-100/20 shadow-xl relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none" :class="{
          'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-black': store.selectedRole === 'shield',
          'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-slate-900 to-black': store.selectedRole === 'codebreaker',
          'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-black': store.selectedRole === 'intel'
        }"></div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 relative z-10 border-b border-base-100/20/50 pb-4 gap-2">
          <div class="flex items-center gap-3">
            <h3 class="text-lg sm:text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{{ store.roleDisplayName }} Terminal</h3>
          </div>
          <button @click="store.clearRole()" class="btn btn-xs btn-ghost text-slate-400 hover:text-white border border-base-100/30">Switch Role</button>
        </div>

        <ShieldOperatorTerminal v-if="store.selectedRole === 'shield'" />
        <CodeBreakerTerminal v-else-if="store.selectedRole === 'codebreaker'" />
        <ObserverTerminal v-else-if="store.selectedRole === 'intel'" />
      </section>

    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useConvergenceStore } from '../../stores/convergence';
import ShieldOperatorTerminal from '../../components/Convergence/ShieldOperatorTerminal.vue';
import CodeBreakerTerminal from '../../components/Convergence/CodeBreakerTerminal.vue';
import ObserverTerminal from '../../components/Convergence/ObserverTerminal.vue';

const router = useRouter();
const store = useConvergenceStore();

onMounted(() => {
  store.initRealtime();
  store.startGameLoop();
});

onUnmounted(() => {
  store.cleanup();
});
</script>

<style scoped>
.glitch {
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%, 0 55%, 100% 55%, 100% 100%, 0 100%);
  animation: glitch-anim 0.2s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
  20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
  40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
  80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 2px); }
  100% { clip-path: inset(30% 0 40% 0); transform: translate(1px, -2px); }
}
</style>

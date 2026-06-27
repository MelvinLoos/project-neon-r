<template>
  <div class="convergence-base min-h-screen bg-slate-900 text-slate-300 p-4 font-mono flex flex-col items-center">
    
    <header class="w-full max-w-4xl flex justify-between items-center mb-8 border-b-2 border-cyan-800 pb-4">
      <h1 class="text-3xl text-cyan-400 font-bold uppercase tracking-widest">Phase 3: Convergence Base</h1>
      <div class="flex gap-4">
         <button @click="router.push('/')" class="btn btn-outline btn-sm btn-info">Abort to Home</button>
      </div>
    </header>

    <main class="w-full max-w-4xl flex-grow flex flex-col items-center">
      
      <!-- AR Scanner Section -->
      <section v-if="selectedRole" class="w-full mb-8 relative border border-cyan-900 rounded-lg overflow-hidden bg-black" style="min-height: 400px; height: 60vh;">
        <div id="mindar-container" class="w-full h-full absolute inset-0"></div>
        <div class="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4">
            <div class="flex justify-between items-start">
               <div class="bg-black/60 p-2 rounded border border-cyan-500/50 backdrop-blur-sm">
                 <h3 class="text-cyan-300 m-0 uppercase text-sm font-bold tracking-wider">AR Scanner Active</h3>
                 <p class="text-xs text-cyan-100/70 m-0">Scanning for Convergence Nodes...</p>
               </div>
               <div class="bg-black/80 px-3 py-1 rounded text-cyan-400 font-mono text-sm border border-cyan-700 animate-pulse">
                {{ scanStatus }}
               </div>
            </div>
            <div class="self-center flex-grow flex items-center justify-center">
                <div class="w-48 h-48 border-2 border-cyan-500/30 rounded-full relative">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-cyan-400"></div><div class="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-2 h-2 bg-cyan-400"></div><div class="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 bg-cyan-400"></div><div class="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 bg-cyan-400"></div>
                </div>
            </div>
            <div class="text-center bg-black/70 p-2 rounded backdrop-blur"><p class="text-sm text-cyan-200">Align marker within the reticle to establish connection.</p></div>
        </div>
      </section>

      <!-- Role Selection Screen -->
      <section v-else class="w-full max-w-2xl bg-slate-800 p-8 rounded-xl border border-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex flex-col gap-6">
        <div class="text-center mb-4">
            <h2 class="text-2xl text-cyan-300 font-bold mb-2">Select Operation Role</h2>
            <p class="text-slate-400">Choose your assigned clearance level for the Convergence protocol. Each role provides optimized interfaces tailored to different cognitive approaches.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button @click="selectRole('shield')" class="flex flex-col items-center justify-center p-6 bg-slate-900 border-2 border-emerald-900 hover:border-emerald-500 rounded-lg transition-all group gap-3 ring-0 outline-none focus:ring-2 focus:ring-emerald-400">
                <div class="w-16 h-16 rounded-full bg-emerald-950 flex items-center justify-center group-hover:bg-emerald-900 transition-colors"><span class="text-2xl">🛡️</span></div>
                <h3 class="text-emerald-400 font-bold text-center">Shield Operator</h3>
                <p class="text-xs text-slate-400 text-center">Minimized visual noise, clear high-contrast objectives, guided AR scanning.</p>
            </button>
             <button @click="selectRole('codebreaker')" class="flex flex-col items-center justify-center p-6 bg-slate-900 border-2 border-purple-900 hover:border-purple-500 rounded-lg transition-all group gap-3 ring-0 outline-none focus:ring-2 focus:ring-purple-400">
                <div class="w-16 h-16 rounded-full bg-purple-950 flex items-center justify-center group-hover:bg-purple-900 transition-colors"><span class="text-2xl">🧩</span></div>
                <h3 class="text-purple-400 font-bold text-center">Code Breaker</h3>
                <p class="text-xs text-slate-400 text-center">Complex data feeds, pattern recognition overlays, raw metric displays.</p>
            </button>
            <button @click="selectRole('intel')" class="flex flex-col items-center justify-center p-6 bg-slate-900 border-2 border-blue-900 hover:border-blue-500 rounded-lg transition-all group gap-3 ring-0 outline-none focus:ring-2 focus:ring-blue-400">
      <!-- Role-Specific UI Dashboard -->
      <section v-if="selectedRole" class="w-full mt-4 bg-slate-800 p-4 rounded-lg border border-cyan-900">
         <div class="flex justify-between items-center mb-4">
             <h3 class="text-xl font-bold" :class="roleColorClass">{{ roleDisplayName }} Terminal</h3>
             <button @click="selectedRole = null; stopAR()" class="btn btn-xs btn-ghost text-slate-400">Change Role</button>
         </div>

         <div v-if="selectedRole === 'shield'" class="space-y-4">
             <div class="bg-slate-900 p-4 rounded-lg border-l-4 border-emerald-500">
                 <h4 class="text-emerald-400 font-bold mb-2">Current Objective</h4>
                 <p class="text-lg">Locate the physical marker labeled "Alpha Node" and keep it stable within the scanner reticle.</p>
             </div>
             <div class="w-full bg-slate-950 rounded-full h-8 overflow-hidden border border-emerald-900">
                 <div class="bg-emerald-500 h-full flex items-center justify-center text-black font-bold transition-all duration-1000" style="width: 25%">25%</div>
             </div>
         </div>

         <div v-if="selectedRole === 'codebreaker'" class="space-y-4 font-mono text-sm">
             <div class="grid grid-cols-2 gap-4">
                 <div class="bg-black p-3 border border-purple-900 rounded text-purple-300">
                     <div>> SYS.FREQ: 432.11Hz</div><div>> NODE.SYNC: AWAITING</div>
                     <div>> MARKER.CONFIDENCE: <span class="text-red-400">0.00</span></div>
                     <div class="mt-2 text-purple-500 animate-pulse">> Ready for algorithmic input...</div>
                 </div>
                 <div class="bg-black p-3 border border-purple-900 rounded">
                     <p class="text-slate-400 text-xs mb-2">PATTERN BUFFER</p>
                     <div class="grid grid-cols-4 gap-1">
                         <div v-for="i in 8" :key="i" class="h-6 bg-slate-800 border border-slate-700"></div>
                     </div>
                 </div>
             </div>
         </div>

         <div v-if="selectedRole === 'intel'" class="space-y-4">
              <div class="bg-blue-950/30 p-5 rounded-lg border border-blue-900/50">
                  <h4 class="text-blue-300 font-bold mb-3 flex items-center gap-2">Subject File: Alpha Node</h4>
                  <p class="text-slate-300 leading-relaxed mb-4">The Alpha Node represents the first physical bridge establishing the Convergence Network. Historical data suggests it was placed here in late 2024 before the blackout.</p>
                  <p class="text-slate-400 text-sm italic">Scan the area carefully. Take your time to review the surroundings. There is no time limit on this operation.</p>
              </div>
         </div>
      </section>
                <div class="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center group-hover:bg-blue-900 transition-colors"><span class="text-2xl">👁️</span></div>
                <h3 class="text-blue-400 font-bold text-center">Intel / Observer</h3>
                <p class="text-xs text-slate-400 text-center">Narrative-focused interface, pacing controls, comprehensive context logs.</p>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedRole = ref(null);
const scanStatus = ref('SEARCHING...');
let mindarLoader = null;
const isARActive = ref(false);

const selectRole = (role) => {
    selectedRole.value = role;
    setTimeout(() => { initAR(); }, 100);
};

const roleDisplayName = computed(() => {
    switch(selectedRole.value) {
        case 'shield': return 'Shield Operator';
        case 'codebreaker': return 'Code Breaker';
        case 'intel': return 'Intel / Observer';
        default: return '';
    }
});

const roleColorClass = computed(() => {
    switch(selectedRole.value) {
        case 'shield': return 'text-emerald-400';
        case 'codebreaker': return 'text-purple-400';
        case 'intel': return 'text-blue-400';
        default: return 'text-cyan-400';
    }
});

const initAR = () => {
    if (isARActive.value) return;
    scanStatus.value = 'INITIALIZING SENSORS...';
    setTimeout(() => {
        scanStatus.value = 'SCANNING FOR TARGETS...';
        isARActive.value = true;
        mindarLoader = setInterval(() => {
            if(Math.random() > 0.95) {
                scanStatus.value = 'MARKER LOCK ACQUIRED';
                setTimeout(() => { scanStatus.value = 'SCANNING FOR TARGETS...'; }, 2000);
            }
        }, 1000);
    }, 1500);
};

const stopAR = () => {
    isARActive.value = false;
    if(mindarLoader) { clearInterval(mindarLoader); mindarLoader = null; }
};

onUnmounted(() => { stopAR(); });
</script>
            </button>
        </div>
      </section>

      <!-- Role-Specific UI Dashboard Placeholder -->

    </main>
  </div>
</template>
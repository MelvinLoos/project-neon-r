<template>
  <div class="convergence-base min-h-screen bg-slate-900 text-slate-300 p-4 font-mono flex flex-col items-center overflow-hidden">
    <header class="w-full max-w-4xl flex justify-between items-center mb-8 border-b-2 border-cyan-800 pb-4 relative z-10">
      <h1 class="text-3xl text-cyan-400 font-bold uppercase tracking-widest">Phase 3: Convergence Base</h1>
      <div class="flex gap-4"><button @click="router.push('/')" class="btn btn-outline btn-sm btn-info">Abort to Home</button></div>
    </header>

    <main class="w-full max-w-4xl flex-grow flex flex-col items-center relative z-10">
      
      <!-- Mission Accomplished Overlay -->
      <div v-if="missionAccomplished" class="absolute inset-0 bg-emerald-900/90 z-50 flex flex-col items-center justify-center rounded-xl border-4 border-emerald-500 animate-pulse backdrop-blur-sm">
          <h2 class="text-6xl text-emerald-100 font-bold mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-center">MISSION ACCOMPLISHED</h2>
          <p class="text-xl text-emerald-200 text-center mb-8">The Convergence Protocol is stable.</p>
          <button @click="router.push('/')" class="mt-8 btn btn-lg btn-success shadow-[0_0_20px_rgba(16,185,129,0.5)]">Return to Base</button>
      </div>

      <!-- AR Scanner Section for Observer -->
      <section v-if="selectedRole === 'intel' && !missionAccomplished" class="w-full mb-8 relative border border-blue-900 rounded-lg overflow-hidden bg-black" style="min-height: 400px; height: 60vh;">
        <div id="mindar-container" class="w-full h-full absolute inset-0 bg-slate-800 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
        <div class="absolute inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none">
            <div class="flex justify-between items-start">
               <div class="bg-black/60 p-2 rounded border border-blue-500/50 backdrop-blur-sm">
                 <h3 class="text-blue-300 m-0 uppercase text-sm font-bold tracking-wider">AR Scanner Active</h3>
                 <p class="text-xs text-blue-100/70 m-0">Scanning for Convergence Nodes...</p>
               </div>
               <div :class="['px-3 py-1 rounded font-mono text-sm border', scanStatus === 'MARKER LOCK ACQUIRED' ? 'bg-blue-600/80 text-white border-blue-400' : 'bg-black/80 text-blue-400 border-blue-700 animate-pulse']">
                {{ scanStatus }}
               </div>
            </div>
            
            <div class="self-center flex-grow flex items-center justify-center">
                <div :class="['w-64 h-64 border-2 rounded-full relative transition-all duration-500', scanStatus === 'MARKER LOCK ACQUIRED' ? 'border-blue-400 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.5)]' : 'border-blue-500/30']">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-blue-400"></div><div class="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-2 h-2 bg-blue-400"></div><div class="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 bg-blue-400"></div><div class="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 bg-blue-400"></div>
                </div>
            </div>

            <div class="text-center flex flex-col items-center gap-4">
                <button v-if="scanStatus === 'MARKER LOCK ACQUIRED' && !targetFound" @click="identifySymbol" class="pointer-events-auto btn btn-primary border-blue-400 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-bounce font-bold tracking-wider">
                    IDENTIFY SYMBOL
                </button>
                <div v-else-if="targetFound" class="bg-blue-900/80 text-blue-200 px-4 py-2 rounded-lg border border-blue-400 backdrop-blur font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(96,165,250,0.4)]">
                    Target Data Broadcasted
                </div>
                <div class="bg-black/70 p-2 rounded backdrop-blur max-w-sm"><p class="text-sm text-blue-200">Align marker within the reticle to establish connection and locate symbols to assist the Code Breaker.</p></div>
            </div>
        </div>
      </section>

      <!-- Role Selection Screen -->
      <section v-if="!selectedRole && !missionAccomplished" class="w-full max-w-2xl bg-slate-800 p-8 rounded-xl border border-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex flex-col gap-6">
        <div class="text-center mb-4">
            <h2 class="text-2xl text-cyan-300 font-bold mb-2">Select Operation Role</h2>
            <p class="text-slate-400">Choose your assigned clearance level for the Convergence protocol. Each role provides optimized interfaces tailored to different cognitive approaches. Synchronization with team is required.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button @click="selectRole('shield')" class="flex flex-col items-center justify-center p-6 bg-slate-900 border-2 border-emerald-900 hover:border-emerald-500 rounded-lg transition-all group gap-3 ring-0 outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden">
                <div class="w-16 h-16 rounded-full bg-emerald-950 flex items-center justify-center group-hover:bg-emerald-900 transition-colors z-10"><span class="text-2xl">🛡️</span></div>
                <h3 class="text-emerald-400 font-bold text-center z-10">Shield Operator</h3>
                <p class="text-xs text-slate-400 text-center z-10">High intensity, physical feedback, barrier maintenance.</p>
                <div class="absolute bottom-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-300"></div>
            </button>
             <button @click="selectRole('codebreaker')" class="flex flex-col items-center justify-center p-6 bg-slate-900 border-2 border-purple-900 hover:border-purple-500 rounded-lg transition-all group gap-3 ring-0 outline-none focus:ring-2 focus:ring-purple-400 relative overflow-hidden">
                <div class="w-16 h-16 rounded-full bg-purple-950 flex items-center justify-center group-hover:bg-purple-900 transition-colors z-10"><span class="text-2xl">🧩</span></div>
                <h3 class="text-purple-400 font-bold text-center z-10">Code Breaker</h3>
                <p class="text-xs text-slate-400 text-center z-10">Calm routing puzzle, pattern recognition, systematic flow.</p>
                <div class="absolute bottom-0 left-0 h-1 bg-purple-500 w-0 group-hover:w-full transition-all duration-300"></div>
            </button>
            <button @click="selectRole('intel')" class="flex flex-col items-center justify-center p-6 bg-slate-900 border-2 border-blue-900 hover:border-blue-500 rounded-lg transition-all group gap-3 ring-0 outline-none focus:ring-2 focus:ring-blue-400 relative overflow-hidden">
                <div class="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center group-hover:bg-blue-900 transition-colors z-10"><span class="text-2xl">👁️</span></div>
                <h3 class="text-blue-400 font-bold text-center z-10">Intel / Observer</h3>
                <p class="text-xs text-slate-400 text-center z-10">AR Scanning, environment analysis, objective targeting.</p>
                <div class="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></div>
            </button>
        </div>
      </section>

      <!-- Global Battle Status (Visible to all assigned roles) -->
      <section v-if="selectedRole && !missionAccomplished" class="w-full bg-slate-800 p-4 rounded-t-lg border-t border-l border-r border-slate-700 mt-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
          <div class="flex-grow w-full md:w-auto">
             <div class="flex justify-between items-end mb-1">
                 <span class="text-xs font-bold text-slate-400 tracking-wider">SYSTEM STABILITY</span>
                 <span class="font-mono text-sm" :class="stability < 30 ? 'text-red-400 animate-pulse' : 'text-emerald-400'">{{ stability.toFixed(0) }}%</span>
             </div>
             <div class="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-700 relative">
                 <div class="h-full transition-all duration-300" :class="stability < 30 ? 'bg-red-500' : (stability < 60 ? 'bg-amber-500' : 'bg-emerald-500')" :style="{ width: `${stability}%` }"></div>
             </div>
          </div>
          
          <div class="flex gap-4 items-center w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-700">
             <div class="flex flex-col items-center">
                 <span class="text-[10px] text-slate-500 mb-1">ROUTING</span>
                 <div class="flex gap-1 bg-slate-900 p-1 rounded">
                     <div v-for="i in 5" :key="i" class="w-4 h-4 rounded-sm border" :class="i <= codeProgress ? 'bg-purple-500 border-purple-300 shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'bg-transparent border-slate-600'"></div>
                 </div>
             </div>
             <div class="flex flex-col items-center">
                 <span class="text-[10px] text-slate-500 mb-1">TARGET</span>
                 <div class="w-6 h-6 rounded-full border bg-slate-900 flex items-center justify-center">
                     <div class="w-4 h-4 rounded-full transition-all duration-300" :class="targetFound ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-slate-800'"></div>
                 </div>
             </div>
          </div>
      </section>

      <!-- Role-Specific UI Dashboard -->
      <section v-if="selectedRole && !missionAccomplished" class="w-full bg-slate-800 p-6 rounded-b-lg border border-slate-700 shadow-xl relative overflow-hidden">
         
         <!-- Background dynamic element based on role -->
         <div class="absolute inset-0 opacity-10 pointer-events-none" :class="{
             'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-black': selectedRole === 'shield',
             'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-slate-900 to-black': selectedRole === 'codebreaker',
             'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-black': selectedRole === 'intel'
         }"></div>

         <div class="flex justify-between items-center mb-6 relative z-10 border-b border-slate-700/50 pb-4">
             <div class="flex items-center gap-3">
                 <h3 class="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{{ roleDisplayName }} Terminal</h3>
             </div>
             <button @click="selectedRole = null; stopAR()" class="btn btn-xs btn-ghost text-slate-400 hover:text-white border border-slate-600">Switch Role</button>
         </div>

         <!-- SHIELD OPERATOR VIEW -->
         <div v-if="selectedRole === 'shield'" class="space-y-6 relative z-10 flex flex-col items-center">
             <div class="bg-black/50 p-4 rounded-lg border-l-4 border-emerald-500 w-full mb-8">
                 <h4 class="text-emerald-400 font-bold mb-2 uppercase text-sm tracking-widest">Current Objective</h4>
                 <p class="text-emerald-100/80">Pump power into the stability grid! Do not let stability fall below 30% or the Code Breaker's systems will glitch critically.</p>
             </div>
             
             <div class="py-8 w-full flex justify-center">
                 <button @touchstart.prevent="mashShield" @mousedown.prevent="mashShield" class="w-72 h-72 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 border-[12px] border-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.5),inset_0_15px_30px_rgba(255,255,255,0.4)] hover:brightness-110 active:scale-95 active:shadow-[inset_0_20px_30px_rgba(0,0,0,0.6)] transition-all flex flex-col items-center justify-center gap-2 select-none">
                     <span class="text-6xl mb-2 drop-shadow-lg">⚡</span>
                     <span class="font-bold text-white tracking-widest uppercase text-2xl drop-shadow w-full text-center">MASH TO</span>
                     <span class="font-bold text-emerald-100 tracking-widest uppercase text-xl opacity-80 w-full text-center">STABILIZE</span>
                 </button>
             </div>
         </div>

         <!-- CODE BREAKER VIEW -->
         <div v-if="selectedRole === 'codebreaker'" class="space-y-6 font-mono relative z-10">
             
             <div v-if="stability < 30" class="absolute inset-0 bg-red-900/10 pointer-events-none z-0 rounded-lg animate-pulse mix-blend-color-dodge"></div>
             
             <div class="bg-black/50 p-4 rounded-lg border-l-4 border-purple-500 w-full mb-4">
                 <h4 class="text-purple-400 font-bold mb-2 uppercase text-sm tracking-widest">Current Objective</h4>
                 <p class="text-purple-100/80">Connect all router nodes in sequence. System instability below 30% will introduce erratic hardware interference. Await Observer's target data to authorize final sequence.</p>
             </div>

             <div class="grid md:grid-cols-2 gap-6 relative z-10">
                 <div class="flex flex-col gap-4">
                     <div class="bg-black/80 p-4 border border-purple-900/50 rounded-lg shadow-inner">
                         <h4 class="text-purple-400 font-bold mb-3 uppercase text-xs tracking-widest border-b border-purple-900/50 pb-2">Transmission Log</h4>
                         <div class="space-y-2 text-sm pl-2">
                             <div class="text-slate-400">> SYS.FREQ: <span class="text-purple-300 ml-2">432.11Hz</span></div>
                             <div class="text-slate-400">> TARGET.SYNC: <span class="ml-2 font-bold" :class="targetFound ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-amber-500 animate-pulse'">{{ targetFound ? 'ACQUIRED' : 'AWAITING OBSERVER...' }}</span></div>
                             <div class="text-slate-400">> GRID.STATUS: <span class="ml-2 font-bold tracking-wider" :class="stability < 30 ? 'text-red-500 animate-[bounce_0.5s_infinite]' : 'text-emerald-400'">{{ stability < 30 ? 'CRITICAL - GLITCH DETECTED' : 'OPTIMAL' }}</span></div>
                         </div>
                     </div>

                     <div class="bg-black/80 p-5 border rounded-lg transition-all duration-300 shadow-inner" :class="stability < 30 ? 'border-red-900/80 shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-red-950/10' : 'border-purple-900/50'">
                         <h4 class="text-purple-400 font-bold mb-6 uppercase text-xs tracking-widest text-center flex items-center justify-between"><span class="w-1/4 h-px bg-purple-900/50"></span>Routing Protocol<span class="w-1/4 h-px bg-purple-900/50"></span></h4>
                         
                         <div class="flex flex-col gap-4 relative py-2 pl-4">
                             <!-- Connecting UI effect -->
                             <div class="absolute left-[2.25rem] top-6 bottom-6 w-2 bg-slate-800 -z-10 rounded shadow-inner"></div>
                             <div class="absolute left-[2.25rem] top-6 w-2 bg-purple-500 -z-10 rounded transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" :style="{ height: `calc(${(codeProgress / 4) * 100}% - 3rem)` }"></div>
                             
                             <div v-for="n in 5" :key="n" class="flex items-center gap-6 transition-all duration-200 relative" :style="glitchStyle(n)">
                                 <button @click="clickNode(n)" 
                                         class="w-14 h-14 rounded-full border-4 flex-shrink-0 flex items-center justify-center font-bold text-xl transition-all duration-300 z-10 bg-slate-900"
                                         :class="[
                                            codeProgress >= n ? 'border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)] bg-purple-900/20' : 
                                            (codeProgress === n - 1 ? 'border-amber-500 text-amber-500 animate-pulse cursor-pointer hover:bg-amber-900/40 hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-slate-700 text-slate-600 opacity-50 cursor-not-allowed')
                                         ]"
                                         :disabled="codeProgress !== n - 1">
                                    {{ n }}
                                 </button>
                                 <div class="flex-grow bg-slate-900/80 rounded-lg p-3 border border-slate-800 flex justify-between items-center shadow-inner" :class="{ 'opacity-40': codeProgress < n - 1 }">
                                     <span class="text-xs px-2 py-1 rounded bg-black border border-slate-800 tracking-wider">NODE_{{n}}00</span>
                                     <span class="text-xs font-bold tracking-widest" :class="codeProgress >= n ? 'text-purple-400' : 'text-slate-500'">{{ codeProgress >= n ? 'ROUTED' : 'UNLINKED' }}</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div class="flex flex-col gap-4">
                      <div class="bg-black/80 p-4 border border-purple-900/50 rounded-lg h-full flex flex-col shadow-inner">
                         <h4 class="text-purple-400 font-bold mb-2 uppercase text-xs tracking-widest border-b border-purple-900/50 pb-2">Decryption Matrix</h4>
                         <div class="flex-grow relative overflow-hidden flex items-center justify-center p-4">
                              <!-- Abstract visual for breaker -->
                              <div class="grid grid-cols-6 gap-2 w-full opacity-40 transition-opacity duration-300" :class="{'opacity-80': stability < 30}">
                                  <div v-for="i in 36" :key="i" class="aspect-square rounded-sm border transition-all duration-300 flex items-center justify-center overflow-hidden" :class="stability < 30 ? 'border-red-900/50 glitch' : 'border-purple-900/30'">
                                      <div class="w-full h-full transition-all duration-200" :class="stability < 30 ? 'bg-red-500/20' : 'bg-purple-500/20'" :style="{ opacity: Math.random() > (stability < 30 ? 0.2 : 0.7) ? 1 : 0 }"></div>
                                  </div>
                              </div>
                         </div>
                      </div>
                 </div>
             </div>
         </div>

         <!-- INTEL / OBSERVER VIEW -->
         <div v-if="selectedRole === 'intel'" class="space-y-6 relative z-10">
              <div class="bg-black/50 p-4 rounded-lg border-l-4 border-blue-500 w-full">
                 <h4 class="text-blue-400 font-bold mb-2 uppercase text-sm tracking-widest">Current Objective</h4>
                 <p class="text-blue-100/80">Monitor AR scanner above. Lock onto target symbols in physical space and broadcast data to assist the Code Breaker with their routing protocol.</p>
             </div>
             
              <div class="bg-blue-950/20 p-6 rounded-lg border border-blue-900/80 shadow-[inset_0_0_30px_rgba(30,58,138,0.3)]">
                  <h4 class="text-blue-300 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-blue-900/50 pb-3">Subject File: Alpha Node / Origin</h4>
                  <div class="flex flex-col md:flex-row gap-8">
                      <div class="md:w-2/3 space-y-5">
                          <p class="text-slate-300 leading-relaxed text-sm">The Convergence Network hinges on bridging physical space with digital architecture. Your Scanner is currently active and sweeping the immediate vicinity for spatial anomalies.</p>
                          <div class="bg-black/60 p-4 rounded-lg border-l-4 border-blue-500 shadow-lg">
                              <p class="text-blue-200/90 text-sm italic">"Scan the area carefully. Wait for the reticle to lock onto high-contrast visual markers. When acquired, broadcast the target data immediately. The Code Breaker cannot finish the sequence without this authorization key."</p>
                          </div>
                      </div>
                      <div class="md:w-1/3 bg-black/80 p-5 rounded-lg border border-blue-900/50 flex flex-col justify-center items-center gap-4 shadow-inner">
                          <div class="text-center w-full">
                              <span class="text-[10px] text-blue-400/80 tracking-widest block mb-2 font-bold">NETWORK SYNC BANDWIDTH</span>
                              <div class="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                  <div class="h-full bg-blue-500 w-full animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                              </div>
                          </div>
                          <div class="text-center mt-2">
                              <span class="text-xs text-slate-500 block mb-1">LOCAL CHANNELS</span>
                              <span class="text-blue-400 font-mono text-lg tracking-wider">3 ACTIVE</span>
                          </div>
                      </div>
                  </div>
              </div>
         </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../services/supabase';

const router = useRouter();
const selectedRole = ref(null);

// Boss Battle Sync State
const stability = ref(50);
const codeProgress = ref(0);
const targetFound = ref(false);
const missionAccomplished = ref(false);

let channel = null;

// AR Scanner State
const scanStatus = ref('SEARCHING...');
let mindarLoader = null;
const isARActive = ref(false);

const glitchOffsets = ref([0,0,0,0,0,0]);

const selectRole = (role) => {
    selectedRole.value = role;
    if (role === 'intel') {
        setTimeout(() => { initAR(); }, 100);
    }
};

const roleDisplayName = computed(() => {
    switch(selectedRole.value) {
        case 'shield': return 'Shield Operator';
        case 'codebreaker': return 'Code Breaker';
        case 'intel': return 'Intel / Observer';
        default: return '';
    }
});

// Initialize Supabase Realtime Channel for Boss Battle Sync
const initRealtime = () => {
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
            // Keep stability in sync if one client is deciding to broadcast decay
            stability.value = payload.value;
        }
    }).subscribe();
};

const broadcastAction = (payload) => {
    if (channel) {
        channel.send({
            type: 'broadcast',
            event: 'action',
            payload
        });
    }
};

const checkWin = () => {
    if (codeProgress.value >= 5 && targetFound.value) {
        missionAccomplished.value = true;
        broadcastAction({ type: 'mission_accomplished' });
    }
}

// Shield Operator Actions
const mashShield = () => {
    if (missionAccomplished.value) return;
    stability.value = Math.min(100, stability.value + 5);
    broadcastAction({ type: 'mash', value: 5 });
};

// Code Breaker Actions
const clickNode = (n) => {
    if (missionAccomplished.value) return;
    if (codeProgress.value === n - 1) {
        codeProgress.value = n;
        broadcastAction({ type: 'code_progress', value: codeProgress.value });
        checkWin();
    }
};

const glitchStyle = (n) => {
    if (stability.value >= 30 || selectedRole.value !== 'codebreaker') return {};
    const offset = glitchOffsets.value[n] || 0;
    const ry = (Math.random() - 0.5) * 10;
    return { transform: `translate(${offset}px, ${ry}px)` };
};

// Observer Actions
const initAR = () => {
    if (isARActive.value) return;
    scanStatus.value = 'INITIALIZING SENSORS...';
    setTimeout(() => {
        scanStatus.value = 'SCANNING FOR TARGETS...';
        isARActive.value = true;
        mindarLoader = setInterval(() => {
            if(Math.random() > 0.85 && !targetFound.value) {
                scanStatus.value = 'MARKER LOCK ACQUIRED';
                // Hold lock for a few seconds before losing it
                setTimeout(() => { 
                    if(scanStatus.value === 'MARKER LOCK ACQUIRED' && !targetFound.value) {
                        scanStatus.value = 'SCANNING FOR TARGETS...'; 
                    }
                }, 4000);
            }
        }, 2000);
    }, 1500);
};

const stopAR = () => {
    isARActive.value = false;
    if(mindarLoader) { clearInterval(mindarLoader); mindarLoader = null; }
};

const identifySymbol = () => {
    if (missionAccomplished.value) return;
    targetFound.value = true;
    scanStatus.value = 'TARGET DATA SECURED';
    broadcastAction({ type: 'target_found' });
    checkWin();
};

// Global Timers
let decayInterval = null;
let glitchInterval = null;

onMounted(() => {
    initRealtime();
    
    // Global Decay - Everyone decrements locally. If out of sync, someone can broadcast
    decayInterval = setInterval(() => {
        if (!missionAccomplished.value && stability.value > 0) {
            stability.value = Math.max(0, stability.value - 2);
            
            // Code Breaker glitch penalty
            if (stability.value < 30 && selectedRole.value === 'codebreaker') {
                if (Math.random() < 0.15 && codeProgress.value > 0) {
                    codeProgress.value--;
                    broadcastAction({ type: 'code_progress', value: codeProgress.value });
                }
            }
            
            // Periodically sync stability from shield operator to combat drift
            if (selectedRole.value === 'shield' && Math.random() < 0.1) {
                broadcastAction({ type: 'shield_decay', value: stability.value });
            }
        }
    }, 1000);

    // Glitch animation interval
    glitchInterval = setInterval(() => {
        if (stability.value < 30) {
            glitchOffsets.value = [0,1,2,3,4,5].map(() => (Math.random() - 0.5) * 20);
        } else {
            glitchOffsets.value = [0,0,0,0,0,0];
        }
    }, 100);
});

onUnmounted(() => {
    stopAR();
    if (channel) supabase.removeChannel(channel);
    if (decayInterval) clearInterval(decayInterval);
    if (glitchInterval) clearInterval(glitchInterval);
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

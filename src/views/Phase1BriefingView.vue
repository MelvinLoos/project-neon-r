<template>
  <div class="min-h-screen bg-black text-green-500 font-mono relative overflow-hidden" :class="{'bg-red-950 text-red-500': state.isHacked}">
    
    <!-- Open Door Policy Retreat Button always accessible via an upper corner, subtle normally but prominent if hacked -->
    <button @click="retreatToSafeMenu" 
            class="absolute top-4 right-4 z-50 btn btn-sm"
            :class="state.isHacked ? 'btn-error' : 'btn-outline text-green-500 border-green-500 hover:bg-green-500 hover:text-black'">
      [ {{$t('app.retreat')}} ]
    </button>

    <!-- State 1: Locked Terminal -->
    <div v-if="state.step === 'locked'" class="flex items-center justify-center p-8 h-screen flex-col relative z-10 w-full text-center">
      <div v-if="!state.isHacked" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border" class="p-12 border border-green-700 bg-black/80 max-w-lg w-full">
         <h1 class="text-4xl mb-6 typing-effect">TERMINAL LOCKED</h1>
         <p class="text-lg opacity-70 mb-4">Awaiting Dispatcher Activation.</p>
         <div class="h-1 bg-green-900 w-full overflow-hidden mt-8">
           <div class="h-full bg-green-500 w-24 animate-runLine"></div>
         </div>
      </div>
      <!-- Hidden Activation Button (For Dispatcher / Testing) -->
      <button @click="triggerTakeover" class="mt-8 opacity-10 hover:opacity-100 transition-opacity btn btn-ghost text-xs text-green-700">[SYS_OVERRIDE]</button>
    </div>

    <!-- State 2: LEVIATHAN Takeover (Virus Simulation) -->
    <div v-else-if="state.step === 'takeover'" class="h-screen w-full flex flex-col items-center justify-center relative z-20">
      <div class="absolute inset-0 bg-red-900/20 scanline pointer-events-none"></div>
      <h1 class="text-6xl md:text-8xl font-black text-red-600 mb-8 glitch" data-text="SYSTEM BREACHED">SYSTEM BREACHED</h1>
      <div class="bg-black/90 p-8 border-2 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] max-w-2xl w-[90%] md:w-full text-center" data-augmented-ui="tr-clip bl-clip border">
        <p class="text-2xl text-red-500 mb-4 font-bold tracking-widest">LEVIATHAN_PROTOCOL_ACTIVE</p>
        <p class="text-lg text-red-400 mb-8">Access granted. Initiating Phase 1 Briefing.</p>
        <div class="flex flex-col gap-2 font-mono text-sm text-left bg-red-950 p-4 border border-red-800 h-40 overflow-hidden relative">
          <div v-for="(log, idx) in logs" :key="idx" class="text-red-300 opacity-80">{{ log }}</div>
          <div class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-red-950 to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- State 3: Content / Team Assignment -->
    <div v-else-if="state.step === 'assignment'" class="min-h-screen p-8 flex flex-col">
       <h1 class="text-3xl font-bold mb-8 md:text-5xl border-b-2 border-current pb-4">OPERATION : NEON STRIKE</h1>
       
       <div class="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
         <div class="w-full">
           <h2 class="text-xl md:text-2xl mb-4 uppercase tracking-widest opacity-80">> Briefing Details</h2>
           <div class="p-6 bg-black/60 border border-current h-full" data-augmented-ui="tl-2-clip-x br-clip border">
             <p class="mb-4 text-lg">Your divisions have been activated.</p>
             <p class="mb-4">Secure the perimeter and wait for further instructions from command. Coordinates will be beamed directly to your devices.</p>
             <ul class="list-disc pl-5 opacity-70">
               <li>Primary Objective: Infiltrate Sector 4</li>
               <li>Secondary Objective: Retrieve Data Core</li>
             </ul>
           </div>
         </div>
         
         <div>
          <h2 class="text-xl md:text-2xl mb-4 uppercase tracking-widest opacity-80">> Divisional Deployment</h2>
          <div class="flex flex-col gap-4">
            <div v-for="team in teams" :key="team.id" class="p-4 border border-current bg-black/40 hover:bg-white/5 transition-colors cursor-pointer group" data-augmented-ui="tr-clip bl-clip border">
              <h3 class="text-2xl font-bold group-hover:text-white">{{ team.name }}</h3>

<script setup>
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { playWarning, stopWarning, playSynth } from '../services/audioSystem';

const router = useRouter();

const state = reactive({
  step: 'locked', // 'locked', 'takeover', 'assignment'
  isHacked: false
});

const logs = ref([]);
let logInterval;

const fakeLogs = [
  "Bypassing mainframe...",
  "Disabling security protocols...",
  "Overriding firewall...",
  "Granting root access...",
  "Initializing LEVIATHAN...",
  "Decrypting files...",
  "Injecting payload...",
  "System compromised."
];

const teams = ref([
  { id: 1, name: 'ALPHA DIVISION', count: 4 },
  { id: 2, name: 'BRAVO DIVISION', count: 3 },
  { id: 3, name: 'OMEGA DIVISION', count: 5 }
]);


const triggerTakeover = () => {
  if (state.step !== 'locked') return;

  state.step = 'takeover';
  state.isHacked = true;
  playWarning();

  let logIndex = 0;
  logInterval = setInterval(() => {
    if (logIndex < fakeLogs.length) {
      logs.value.push(fakeLogs[logIndex]);
      if (logs.value.length > 5) logs.value.shift();
      logIndex++;
    } else {
      clearInterval(logInterval);
      setTimeout(() => {
        showAssignment();
      }, 2000);
    }
  }, 400);
};

const showAssignment = () => {
  stopWarning();
  state.step = 'assignment';
  playSynth(); // Resume normal cool background music or specific cyber tune
};

const retreatToSafeMenu = () => {
  stopWarning();
  router.push({ name: 'home' });
};

onUnmounted(() => {
  clearInterval(logInterval);
  stopWarning();
});

</script>

<style scoped>
.scanline {
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0),
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.2) 50%,
    rgba(0,0,0,0.2)
  );
  background-size: 100% 4px;
}

.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #00ff00;
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim 3s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00ffff;
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(10px, 9999px, 44px, 0); }
  20% { clip: rect(60px, 9999px, 10px, 0); }
  40% { clip: rect(20px, 9999px, 80px, 0); }
  60% { clip: rect(80px, 9999px, 30px, 0); }
  80% { clip: rect(30px, 9999px, 90px, 0); }
  100% { clip: rect(90px, 9999px, 20px, 0); }
}

@keyframes runLine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(500%); }
}

.animate-runLine {
  animation: runLine 2s linear infinite;
}

.typing-effect {
  overflow: hidden;
  border-right: .15em solid currentColor;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
  animation: 
    typing 2s steps(20, end),
    blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: currentColor; }
}

[data-augmented-ui] {
    --aug-border: 1px;
    --aug-border-bg: currentColor;
    --aug-inlay: 1px;
    --aug-inlay-bg: rgba(0,0,0,0.5);
}
</style>

              <p class="opacity-70 text-sm mt-1">Status: DEPLOYED | Members: {{team.count}}</p>
            </div>
          </div>
         </div>
       </div>

    </div>

  </div>
</template>


<template>
  <div class="space-y-4 sm:space-y-6 relative z-10">
    <!-- AR Scanner -->
    <section class="w-full mb-4 sm:mb-8 relative border border-blue-900 rounded-lg overflow-hidden bg-black" style="min-height: 300px; height: 50vh;">
      <div id="mindar-container" class="w-full h-full absolute inset-0 bg-slate-800 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      <div class="absolute inset-0 z-10 flex flex-col justify-between p-2 sm:p-4 pointer-events-none">
        <div class="flex justify-between items-start">
          <div class="bg-black/60 p-2 rounded border border-blue-500/50 backdrop-blur-sm">
            <h3 class="text-blue-300 m-0 uppercase text-xs sm:text-sm font-bold tracking-wider">{{ $t('phase3.observerARScannerActive') }}</h3>
            <p class="text-[10px] sm:text-xs text-blue-100/70 m-0">{{ $t('phase3.observerScanningNodes') }}</p>
          </div>
          <div :class="['px-2 sm:px-3 py-1 rounded font-mono text-[10px] sm:text-xs border', store.scanStatus === 'MARKER LOCK ACQUIRED' ? 'bg-blue-600/80 text-white border-blue-400' : 'bg-black/80 text-blue-400 border-blue-700 animate-pulse']">
            {{ store.scanStatus }}
          </div>
        </div>

        <div class="self-center flex-grow flex items-center justify-center">
          <div :class="['w-48 h-48 sm:w-64 sm:h-64 border-2 rounded-full relative transition-all duration-500', store.scanStatus === 'MARKER LOCK ACQUIRED' ? 'border-blue-400 scale-110 shadow-[0_0_20px_rgba(96,165,250,0.5)]' : 'border-blue-500/30']">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-blue-400"></div><div class="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-2 h-2 bg-blue-400"></div><div class="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 bg-blue-400"></div><div class="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 bg-blue-400"></div>
          </div>
        </div>

        <div class="text-center flex flex-col items-center gap-2 sm:gap-4">
          <button v-if="store.scanStatus === 'MARKER LOCK ACQUIRED' && !store.targetFound" @click="store.identifySymbol" class="pointer-events-auto btn btn-primary border-blue-400 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-bounce font-bold tracking-wider btn-sm sm:btn-md">
            {{ $t('phase3.observerIdentifySymbol') }}
          </button>
          <div v-else-if="store.targetFound" class="bg-blue-900/80 text-blue-200 px-3 sm:px-4 py-1 sm:py-2 rounded-lg border border-blue-400 backdrop-blur font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(96,165,250,0.4)] text-xs sm:text-sm">
            {{ $t('phase3.observerTargetBroadcasted') }}
          </div>
          <div class="bg-black/70 p-2 rounded backdrop-blur max-w-sm"><p class="text-xs sm:text-sm text-blue-200">{{ $t('phase3.observerAlignMarker') }}</p></div>
        </div>
      </div>
    </section>

    <!-- Observer Info -->
    <div class="bg-black/50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500 w-full">
      <h4 class="text-blue-400 font-bold mb-2 uppercase text-xs sm:text-sm tracking-widest">{{ $t('phase3.currentObjective') }}</h4>
      <p class="text-blue-100/80 text-sm sm:text-base">{{ $t('phase3.roleObserver.objective') }}</p>
    </div>

    <div class="bg-blue-950/20 p-4 sm:p-6 rounded-lg border border-blue-900/80 shadow-[inset_0_0_30px_rgba(30,58,138,0.3)]">
      <h4 class="text-blue-300 font-bold mb-2 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 uppercase tracking-widest border-b border-blue-900/50 pb-2 sm:pb-3 text-sm sm:text-base">{{ $t('phase3.observerSubjectFile') }}</h4>
      <div class="flex flex-col md:flex-row gap-4 sm:gap-8">
        <div class="md:w-2/3 space-y-3 sm:space-y-5">
          <p class="text-neutral-content leading-relaxed text-xs sm:text-sm">{{ $t('phase3.observerInfoText') }}</p>
          <div class="bg-black/60 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500 shadow-lg">
            <p class="text-blue-200/90 text-xs sm:text-sm italic">"{{ $t('phase3.observerQuote') }}"</p>
          </div>
        </div>
        <div class="md:w-1/3 bg-black/80 p-4 sm:p-5 rounded-lg border border-blue-900/50 flex flex-col justify-center items-center gap-3 sm:gap-4 shadow-inner">
          <div class="text-center w-full">
            <span class="text-[10px] text-blue-400/80 tracking-widest block mb-2 font-bold">{{ $t('phase3.observerNetworkBandwidth') }}</span>
            <div class="w-full h-3 bg-base-300 rounded-full overflow-hidden border border-base-100/20">
              <div class="h-full bg-blue-500 w-full animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            </div>
          </div>
          <div class="text-center mt-2">
            <span class="text-xs text-slate-500 block mb-1">{{ $t('phase3.observerLocalChannels') }}</span>
            <span class="text-blue-400 font-mono text-base sm:text-lg tracking-wider">{{ $t('phase3.observerChannelsActive') }}</span>
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

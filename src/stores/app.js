import { defineStore } from "pinia";
import { setMute } from "../services/audioSystem";

export const useAppStore = defineStore("app", {
  state: () => ({
    reduceMotion: false,
    clearTypography: false,
    overstimulationMode: false
  }),
  actions: {
    toggleReduceMotion() {
      this.reduceMotion = !this.reduceMotion;
      if (this.reduceMotion) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    },
    toggleClearTypography() {
      this.clearTypography = !this.clearTypography;
      if (this.clearTypography) {
        document.documentElement.classList.add("clear-typography");
      } else {
        document.documentElement.classList.remove("clear-typography");
      }
    },
    toggleOverstimulationMode() {
      this.overstimulationMode = !this.overstimulationMode;
      
      // Handle the CSS side of overstimulation mode
      if (this.overstimulationMode) {
        document.documentElement.classList.add("reduce-motion");
        this.reduceMotion = true;
      } else {
        // Optionally, don't automatically re-enable animations, let users do it manually,
        // but for now, we'll sync it tightly.
        document.documentElement.classList.remove("reduce-motion");
        this.reduceMotion = false;
      }

      // Handle the Audio side
      setMute(this.overstimulationMode);
    }
  }
});


import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    reduceMotion: false,
    clearTypography: false
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
    }
  }
});

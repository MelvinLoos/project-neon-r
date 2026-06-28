import { ref, onMounted, onUnmounted } from 'vue';

export function useBattery() {
  const level = ref(null);
  const charging = ref(null);
  const supported = ref(false);
  const isLow = ref(false);

  let batteryRef = null;
  let removeLevelListener = null;
  let removeChargingListener = null;

  const updateState = (battery) => {
    level.value = battery.level;
    charging.value = battery.charging;
    isLow.value = battery.level !== null && battery.level < 0.2 && !battery.charging;
  };

  const handleLevelChange = () => {
    if (batteryRef) updateState(batteryRef);
  };

  const handleChargingChange = () => {
    if (batteryRef) updateState(batteryRef);
  };

  onMounted(async () => {
    if (!('getBattery' in navigator)) {
      supported.value = false;
      return;
    }

    try {
      batteryRef = await navigator.getBattery();
      supported.value = true;
      updateState(batteryRef);

      batteryRef.addEventListener('levelchange', handleLevelChange);
      batteryRef.addEventListener('chargingchange', handleChargingChange);
      removeLevelListener = () => batteryRef.removeEventListener('levelchange', handleLevelChange);
      removeChargingListener = () => batteryRef.removeEventListener('chargingchange', handleChargingChange);
    } catch (err) {
      console.warn('Battery API not available:', err);
      supported.value = false;
    }
  });

  onUnmounted(() => {
    if (removeLevelListener) removeLevelListener();
    if (removeChargingListener) removeChargingListener();
    batteryRef = null;
  });

  return {
    supported,
    level,
    charging,
    isLow
  };
}

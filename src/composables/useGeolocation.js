import { ref, onMounted, onUnmounted, watch } from 'vue';

export function useGeolocation(options = {}) {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 0,
    mockMode = false,
    mockCoordinates = { latitude: 51.5074, longitude: -0.1278 } // Default to London
  } = options;

  const isSupported = 'geolocation' in navigator;
  const coords = ref({ latitude: null, longitude: null, accuracy: null });
  const error = ref(null);
  const isActive = ref(false); // Controls if we should be watching
  let watcherId = null;
  let mockIntervalId = null;

  const startWatching = () => {
    if (!isSupported && !mockMode) {
      error.value = new Error('Geolocation is not supported by your browser');
      return;
    }

    if (watcherId !== null || mockIntervalId !== null) return; // Already watching

    if (mockMode) {
      coords.value = { ...mockCoordinates, accuracy: 10 };
      // Simulate updates every 2 seconds
      mockIntervalId = setInterval(() => {
        coords.value = {
          latitude: mockCoordinates.latitude + (Math.random() - 0.5) * 0.001,
          longitude: mockCoordinates.longitude + (Math.random() - 0.5) * 0.001,
          accuracy: 10 + Math.random() * 5
        };
      }, 2000);
      return;
    }

    watcherId = navigator.geolocation.watchPosition(
      (position) => {
        coords.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        error.value = null;
      },
      (err) => {
        error.value = err;
      },
      { enableHighAccuracy, timeout, maximumAge }
    );
  };

  const stopWatching = () => {
    if (watcherId !== null) {
      navigator.geolocation.clearWatch(watcherId);
      watcherId = null;
    }
    if (mockIntervalId !== null) {
      clearInterval(mockIntervalId);
      mockIntervalId = null;
    }
  };

  // Battery-conscious logic: watch isActive state to start/stop
  watch(isActive, (newValue) => {
    if (newValue) {
      startWatching();
    } else {
      stopWatching();
    }
  });

  onUnmounted(() => {
    stopWatching();
  });

  return {
    isSupported,
    coords,
    error,
    isActive, // Set to true to start, false to pause
    start: () => { isActive.value = true; },
    stop: () => { isActive.value = false; }
  };
}

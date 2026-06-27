<template>
  <div class="fieldwork-view h-screen w-screen flex flex-col bg-gray-900 overflow-hidden relative">
    
    <!-- Top HUD Overlay -->
    <div class="absolute top-0 left-0 w-full z-10 p-4 pointer-events-none flex flex-col gap-2">
      <div class="flex justify-between items-center bg-black/60 backdrop-blur-sm p-3 rounded-xl border border-primary/50 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
        <div class="text-primary font-bold text-lg tracking-widest uppercase">
          Sector Agent Active
        </div>
        <div class="flex items-center gap-3">
          <div class="text-xs text-info uppercase animate-pulse">
            GPS Signal: <span class="font-mono">{{ gpsStatus }}</span>
          </div>
        </div>
      </div>
      
      <!-- Global Threat Level -->
      <div class="bg-black/80 p-3 rounded-lg border border-error/40 backdrop-blur-md">
        <div class="flex justify-between text-xs mb-1">
          <span class="text-error uppercase font-bold tracking-wider">Global Threat Level</span>
          <span class="text-error font-mono">{{ threatLevel }}%</span>
        </div>
        <progress class="progress progress-error w-full bg-error/20" :value="threatLevel" max="100"></progress>
      </div>
    </div>

    <!-- Map Container -->
    <div ref="mapContainer" class="flex-grow w-full h-full z-0"></div>

    <!-- Bottom Action Area -->
    <div class="absolute bottom-0 left-0 w-full z-10 p-4 pointer-events-none">
      <div class="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-secondary/50 pointer-events-auto shadow-[0_0_20px_rgba(0,255,255,0.1)]">
        
        <div v-if="activeTarget" class="flex flex-col gap-3">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-secondary font-bold text-xl">{{ activeTarget.name }}</h3>
              <p class="text-sm text-gray-400">Distance: <span class="font-mono text-white">{{ formatDistance(distanceToTarget) }}</span></p>
            </div>
            <div class="badge" :class="isAtTarget ? 'badge-success' : 'badge-warning min-w-[80px]'">
              {{ isAtTarget ? 'IN RANGE' : 'APPROACHING' }}
            </div>
          </div>
          
          <button 
            class="btn btn-secondary w-full uppercase tracking-widest font-bold"
            :disabled="!isAtTarget"
            @click="unlockPuzzle"
          >
            {{ isAtTarget ? 'Initiate Hack Sequence' : 'Move Closer to Target' }}
          </button>
        </div>
        
        <div v-else class="text-center py-4">
          <p class="text-gray-400 italic">Scanning for nearby nodes...</p>
          <span class="loading loading-ring loading-md text-primary mt-2"></span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, shallowRef } from 'vue';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

// === State ===
const mapContainer = ref(null);
const map = shallowRef(null);
const userLocation = ref(null); // [lng, lat]
const gpsStatus = ref('ACQUIRING...');
const threatLevel = ref(68); // Example threat level
let locationWatchId = null;

// Target nodes data (Mock data for Phase 2)
const targets = ref([
  { id: 'node-alpha', name: 'Alpha Server Relay', lngLat: [-74.006, 40.7128], radius: 50 }, // radius in meters
  { id: 'node-beta', name: 'Beta Data Cache', lngLat: [-74.010, 40.7150], radius: 30 }
]);

const activeTarget = ref(null);
const distanceToTarget = ref(Infinity);
const isAtTarget = ref(false);

const userMarker = shallowRef(null);
const targetMarkers = ref([]);

// Make sure you replace this with an actual token or environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// === Initialization ===
onMounted(() => {
  initMap();
  startLocationTracking();
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
  if (locationWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(locationWatchId);
  }
});


// === Methods ===

const initMap = () => {
  // Custom Dark/Neon Style URL (Replace with your actual Mapbox Studio style URL if available)
  // For now using dark-v11 as a dark base
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/dark-v11', // A dark abstract style
    center: [-74.006, 40.7128], // Default to NYC, will update on GPS
    zoom: 15,
    pitch: 45, // 3D-ish view
    bearing: 0,
    antialias: true
  });

  map.value.on('load', () => {
    // Add 3D buildings for cyberpunk feel
    map.value.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#0f172a',
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': ['get', 'min_height'],
        'fill-extrusion-opacity': 0.8
      }
    });

    renderTargets();
  });
};

const startLocationTracking = () => {
  if (!navigator.geolocation) {
    gpsStatus.value = 'OFFLINE';
    return;
  }

  gpsStatus.value = 'TRACKING';
  
  // Get initial position quickly
  navigator.geolocation.getCurrentPosition(
    (position) => updateLocation(position),
    (err) => console.error(err),
    { enableHighAccuracy: true }
  );

  // Watch for changes
  locationWatchId = navigator.geolocation.watchPosition(
    (position) => updateLocation(position),
    (err) => {
      console.error('GPS Error:', err);
      gpsStatus.value = 'LOST SIGNAL';
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
  );
};

const updateLocation = (position) => {
  const { longitude, latitude } = position.coords;
  userLocation.value = [longitude, latitude];
  gpsStatus.value = 'LOCKED';

  // Update Map Center smoothly
  if (map.value) {
    map.value.flyTo({ center: userLocation.value, speed: 0.5 });
  }

  // Update User Marker
  if (!userMarker.value && map.value) {
    const el = document.createElement('div');
    el.className = 'w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#ff00ff] border-2 border-white';
    
    userMarker.value = new mapboxgl.Marker({ element: el })
      .setLngLat(userLocation.value)
      .addTo(map.value);
  } else if (userMarker.value) {
    userMarker.value.setLngLat(userLocation.value);
  }

  checkGeofences();
};

const renderTargets = () => {
  targets.value.forEach(target => {
    // Basic marker
    const el = document.createElement('div');
    el.className = 'w-6 h-6 bg-secondary/80 rounded diamond-shape border border-secondary shadow-[0_0_20px_#00ffff] animate-bounce';
    
    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat(target.lngLat)
      .addTo(map.value);
      
    targetMarkers.value.push(marker);

    // Draw Geofence circle
    drawGeofence(target);
  });

  // Set initial active target for demo (normally you'd find the closest)
  if (targets.value.length > 0) {
    activeTarget.value = targets.value[0];
  }
};

const drawGeofence = (target) => {
  if(!map.value) return;
  
  // Create a GeoJSON circle using Turf
  const center = target.lngLat;
  const radiusInKm = target.radius / 1000;
  const options = { steps: 64, units: 'kilometers' };
  const circle = turf.circle(center, radiusInKm, options);

  map.value.addSource(`geofence-${target.id}`, {
    type: 'geojson',
    data: circle
  });

  map.value.addLayer({
    id: `geofence-${target.id}-fill`,
    type: 'fill',
    source: `geofence-${target.id}`,
    paint: {
      'fill-color': '#00ffff',
      'fill-opacity': 0.1
    }
  });

  map.value.addLayer({
    id: `geofence-${target.id}-line`,
    type: 'line',
    source: `geofence-${target.id}`,
    paint: {
      'line-color': '#00ffff',
      'line-width': 2,
      'line-dasharray': [2, 2]
    }
  });
};

const checkGeofences = () => {
  if (!userLocation.value || !activeTarget.value) return;

  const userPoint = turf.point(userLocation.value);
  const targetPoint = turf.point(activeTarget.value.lngLat);
  
  // Calculate distance in meters
  const distKm = turf.distance(userPoint, targetPoint, { units: 'kilometers' });
  const distMeters = Math.round(distKm * 1000);
  
  distanceToTarget.value = distMeters;
  
  // Check if within radius
  if (distMeters <= activeTarget.value.radius) {
    isAtTarget.value = true;
  } else {
    isAtTarget.value = false;
  }
};

const formatDistance = (meters) => {
  if (meters === Infinity) return '--- m';
  if (meters > 1000) return (meters / 1000).toFixed(2) + ' km';
  return meters + ' m';
};

const unlockPuzzle = () => {
  if (isAtTarget.value) {
    // Navigate to puzzle view or open modal
    alert('Hack Sequence Initiated! (Routing to puzzle...)');
  }
};
</script>

<style scoped>
.diamond-shape {
  transform: rotate(45deg);
}

/* Ensure Mapbox controls (if added later) are styled correctly in dark mode */
:deep(.mapboxgl-ctrl-group) {
  background: rgba(0,0,0,0.8);
  border: 1px solid theme('colors.primary');
}
:deep(.mapboxgl-ctrl-group button) {
  /* color: white; */
  filter: invert(1);
}
</style>
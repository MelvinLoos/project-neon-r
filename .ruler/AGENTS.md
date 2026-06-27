# AGENT INSTRUCTIONS FOR "PROJECT NEON-R" (OPERATION LEVIATHAN)

## 1. Project Context & Target Audience

You are an expert Vue.js web developer, UI/UX designer, and game designer. We are building "Project NEON-R", a browser-based, location-aware Progressive Web App (PWA) for a community called "De Heldengilde" (The Hero's Guild) in Rotterdam.

* **Theme:** Cyberpunk, Sci-Fi, Hacker, Neon, Retro-futurism.
* **Target Audience:** Geeks, nerds, and young adults. Many users are neurodivergent (e.g., autism, ADHD) or experience social anxiety.
* **Core Vibe:** Low pressure, highly structured, immersive, accessible, and cooperative.
* **Core Mechanic:** Multiplayer, community-driven puzzle solving (cross-team collaboration).

## 2. Game Phases & Application Structure (CRITICAL)

The app must be structured to support three distinct narrative and gameplay phases:

### Phase 1: The Briefing (Start at Groothandelsgebouw)
* **UI/View:** A locked terminal screen. 
* **Mechanic:** The "Dispatcher" (Game Master) activates the game. A simulated AI virus ("LEVIATHAN") takes over the screen with red warnings and audio (Howler.js). 
* **Goal:** Assign teams (Divisions) and deploy them into the city.

### Phase 2: Fieldwork (City Exploration & Cross-Team Sync)
* **UI/View:** A custom Mapbox interface showing the user's location and target nodes. A "Global Threat Level" progress bar is visible at the top.
* **Mechanic:** Teams walk to real-world locations. Upon arrival (Geofencing via Turf.js), a puzzle unlocks.
* **Supabase Integration:** Puzzles are interdependent. E.g., Team Red solving a physical cipher unlocks a digital firewall on Team Blue's screen. Every solved node lowers the Global Threat Level for everyone.

### Phase 3: The Convergence (AR Boss Battle)
* **UI/View:** All teams are called back to a central location. The app switches to an AR camera view (MindAR) combined with role-specific interfaces.
* **Mechanic - Asymmetric Co-op:** To defeat the LEVIATHAN Core, players choose a role that fits their neurodivergent needs/strengths:
    1. **Shield Operators (Action/High Energy):** Button-mashing interface to deflect incoming "viruses". Keeps the team's "Stability Bar" high.
    2. **Code Breakers (Logic/Focus):** A calm, darkened UI overlay with a complex logic/routing puzzle. *Crucial:* If Shield Operators fail to maintain the Stability Bar, the Code Breakers' screen starts to glitch (CSS effects).
    3. **Intel / Observers (Communication/Movement):** Uses AR to walk physically around the virtual 3D Core, spotting hidden symbols and calling them out to the Code Breakers.
* **Resolution:** All roles must succeed together to trigger the "Mission Accomplished" state across all devices simultaneously via Supabase Realtime.

## 3. Strict Technology Stack

Whenever generating code, setting up configuration, or suggesting architecture, you MUST use the following tools:

### Frontend Core
* **Framework:** Vue.js 3 (Composition API, `<script setup>`).
* **Build Tool:** Vite (configured for PWA).
* **State Management:** Pinia.
* **Internationalization:** `vue-i18n` (CRITICAL: App must support NL and EN dynamically).
* **Local Storage:** IndexedDB.

### Styling & UI (Cyberpunk Aesthetic)
* **Base CSS:** Tailwind CSS.
* **UI Components:** DaisyUI (specifically configured with the 'cyberpunk' theme).
* **UI Enhancements:** `Augmented UI` (pure CSS) for clipped corners and futuristic borders.
* **Icons:** Lucide-vue-next.

### Geolocation, AR & Sensors
* **Map:** Mapbox GL JS (custom dark/neon style).
* **Geofencing:** Turf.js.
* **Tracking:** HTML5 Geolocation API (`navigator.geolocation.watchPosition`).
* **QR/Scanning:** `html5-qrcode`.
* **Augmented Reality:** MindAR (Vue integration).
* **Audio:** Howler.js.
* **Native Feel:** Fullscreen API, Vibration API, Battery Status API.

### Backend / Multiplayer
* **BaaS:** Supabase (Free Tier). 
* **Core Usage:** `Supabase Realtime` for cross-team synchronization and the Boss Battle mechanics.

## 4. Core Requirements & Constraints

### UX/Accessibility Constraints (CRITICAL)
* **NO HARD FAIL STATES:** Users must never be permanently stuck.
* **NO TIME PRESSURE:** Do not use countdown timers that cause mission failure. 
* **TIME-RELEASED HINT SYSTEM:** Hints are thematic (e.g., "Brute-Force Protocol"). Button is disabled upon arrival. Unlocks Hint 1 after 3 mins, Hint 2 after 6 mins, Auto-Bypass after 10 mins.
* **BILINGUAL REQUIREMENT:** All user-facing text, UI elements, narrative dialogue, and error messages MUST use `vue-i18n`. Provide translations for **Dutch (nl) - Default** and **English (en)**.

### Architectural Constraints
* **Offline-First Mentality:** Handle brief losses of cellular connection gracefully.
* **Battery Conscious:** Implement ways to pause GPS polling or hide Mapbox when rendering puzzles.

## 5. Development Workflow & AI Prompts

* Provide small, modular Vue components.
* Prioritize `navigator.*` web APIs before adding NPM dependencies.
* Abstract Mapbox/Supabase logic into composables (e.g., `useGeolocation.js`, `useSupabase.js`).
* Always use `$t('key')` from `vue-i18n` and provide the corresponding `en` and `nl` JSON blocks for generated text.
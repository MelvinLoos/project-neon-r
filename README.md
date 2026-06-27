# Project NEON-R

[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-3-F7D336?logo=pinia)](https://pinia.vuejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ECF8E?logo=supabase)](https://supabase.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

> A location-aware, cyberpunk-themed Progressive Web App for community-driven puzzle adventures.

**Project NEON-R** is a browser-based, multiplayer experience built for **De Heldengilde** (The Hero's Guild) in Rotterdam. It combines real-world exploration, team collaboration, and accessible game design into a low-pressure, immersive puzzle adventure.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Configuration](#configuration) • [PWA](#pwa) • [Accessibility](#accessibility)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [PWA](#pwa)
- [Supabase Backend](#supabase-backend)
- [Accessibility & Inclusion](#accessibility--inclusion)
- [Internationalization](#internationalization)
- [Audio Assets](#audio-assets)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## About

Project NEON-R is designed for geeks, nerds, and young adults — many of whom are neurodivergent or experience social anxiety. The application emphasizes:

- **Low-pressure gameplay**: no hard fail states, no punitive timers.
- **Cooperative mechanics**: teams solve puzzles together and unlock mechanisms for other teams.
- **Real-world immersion**: GPS geofencing, AR scanning, and map-based fieldwork.
- **Neuro-affirming UX**: stimulation controls, clear typography, and optional motion reduction.

The game is split into three phases:

1. **Phase 1: Briefing** — Terminal takeover narrative and team assignment.
2. **Phase 2: Fieldwork** — Location-based exploration with Mapbox geofencing.
3. **Phase 3: Convergence** — Cross-role cooperative finale using realtime sync.

---

## Features

### Core Experience

- ⚡ **Progressive Web App** — installable, offline-capable, with service worker auto-updates.
- 🗺️ **Location-based gameplay** — HTML5 Geolocation + Mapbox GL JS + Turf.js geofencing.
- 🧩 **Cross-team puzzle chain** — solving one node unlocks another team's content.
- 🔄 **Realtime multiplayer** — Supabase Realtime sync for shared game state.
- 🌐 **Bilingual** — Dutch (default) and English via `vue-i18n`.
- 🎨 **Cyberpunk UI** — Tailwind CSS, DaisyUI `cyberpunk` theme, and Augmented UI.
- 🔊 **Thematic audio** — Howler.js powered soundscape with mute controls.
- 📱 **Device integration** — vibration, fullscreen, and battery status APIs (where supported).

### Accessibility & Inclusion

- 🧠 **Stimulation Control Mode** — instantly reduces motion, audio, and visual noise.
- 🅰️ **Clear Typography Mode** — switches to readable system fonts.
- 🚫 **Reduce Motion** — disables animations and transitions.
- ⏱️ **Time-Released Hint System** — hints unlock over time, with an optional auto-bypass.
- 🚪 **Open Door Policy** — retreat button always available to return to a safe menu.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build Tool | Vite |
| State Management | Pinia |
| Routing | Vue Router |
| i18n | vue-i18n |
| Styling | Tailwind CSS 3 + DaisyUI (cyberpunk theme) |
| UI Effects | Augmented UI |
| Mapping | Mapbox GL JS + Turf.js |
| Backend | Supabase (Auth, Postgres, Realtime) |
| Local Storage | IndexedDB via `idb-keyval` |
| Audio | Howler.js |
| AR | A-Frame + MindAR |
| PWA | `vite-plugin-pwa` |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (comes with Node.js)
- A [Supabase](https://supabase.com/) project (free tier is fine)
- A [Mapbox](https://www.mapbox.com/) access token (free tier is fine)

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project-neon-r
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example below into a `.env` file at the project root:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_MAPBOX_ACCESS_TOKEN=your-mapbox-token
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   Visit `http://localhost:5173` in your browser.


---

## Configuration

All runtime configuration is handled via environment variables prefixed with `VITE_` so they are available in the browser:

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_MAPBOX_ACCESS_TOKEN` | Mapbox public access token | Yes |

---

## Project Structure

```text
project-neon-r/
├── public/                  # Static assets and PWA icons
├── src/
│   ├── assets/              # Images and in-app assets
│   ├── components/          # Reusable Vue components
│   ├── composables/         # Vue composition functions
│   ├── locales/             # i18n translation files (en, nl)
│   ├── router/              # Vue Router configuration
│   ├── services/            # API/service modules (Supabase, audio, storage)
│   ├── stores/              # Pinia stores
│   ├── style.css            # Global styles and Tailwind directives
│   ├── views/               # Top-level page views
│   ├── App.vue              # Root component
│   ├── i18n.js              # i18n configuration
│   └── main.js              # Application entry point
├── supabase/
│   └── migrations/            # Database schema migrations
├── add-locales.js           # Utility for bulk locale updates
├── index.html               # HTML entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js           # Vite + PWA configuration
```

---

## PWA

Project NEON-R is configured as a Progressive Web App using `vite-plugin-pwa`.

- **Install prompt**: supported browsers will offer "Add to Home Screen".
- **Offline caching**: assets are cached via Workbox.
- **Auto-updates**: the service worker updates automatically when a new build is available.
- **Icons**: 192x192 and 512x512 icons in `public/`.

> **Note:** For production, replace the placeholder icons in `public/` with real branded assets and update the manifest metadata in `vite.config.js`.

---

## Supabase Backend

The project expects a Supabase project with the following tables:

### `nodes`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `name` | `text` | Puzzle name |
| `team` | `text` | e.g. `Red`, `Blue`, `Green` |
| `status` | `text` | `locked`, `unlocked`, `solved` |
| `required_node_id` | `uuid` | Self-referential FK for puzzle chains |
| `description` | `text` | Optional |
| `created_at` | `timestamptz` | Auto-generated |

### `global_state`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `integer` | Use `1` for the single game state row |
| `threat_level` | `integer` | Global progress bar (100 → 0) |

Run the included migration to bootstrap the schema:

```bash
# Apply via the Supabase CLI or SQL editor
supabase/migrations/000000000000_init_puzzles.sql
```

Enable **Realtime** on the `nodes` and `global_state` tables in the Supabase dashboard for live cross-team synchronization.

---

## Accessibility & Inclusion

This project follows the pedagogical framework of **De Heldengilde**:

- **No hard fail states**: failure is a learning mechanic, not an end state.
- **No time pressure**: timers unlock hints, they do not punish the player.
- **Open door policy**: players can always retreat to a safe menu.
- **Stimulation control**: one toggle reduces motion, audio, and visual intensity.
- **Bilingual support**: Dutch and English text for all user-facing content.

---

## Internationalization

Translations are stored in:

- `src/locales/nl.json` — Dutch (default)
- `src/locales/en.json` — English

All user-facing text must use `vue-i18n` (`$t('key')` or `t('key')`). Code comments and variable names remain in English.

To add or update keys across both files, you can use the helper script:

```bash
node add-locales.js
```

---

## Audio Assets

The audio system expects files in `public/audio/`:

```text
public/audio/
├── bleep.mp3 / bleep.wav
├── synth-bg.mp3 / synth-bg.wav
└── warning.mp3 / warning.wav
```

Add these files to enable sound effects and background music. The app remains functional without them.

---

## Deployment

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The `dist/` folder is ready for static hosting on platforms like Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any static host.

> **Important:** For production, ensure the PWA manifest and icons are updated to match the final brand identity.

---

## Contributing

Contributions are welcome. Please keep the following in mind:

- Use Vue 3 Composition API with `<script setup>`.
- Abstract Mapbox/Supabase logic into composables.
- Add all user-facing text to both `nl.json` and `en.json`.
- Prioritize native browser APIs before adding new dependencies.
- Test accessibility toggles after any UI changes.

---

## License

This project is currently unlicensed. Add a `LICENSE` file to clarify usage rights.

---

## Acknowledgments

Built for **De Heldengilde** — The Hero's Guild in Rotterdam.  
Designed with neurodivergent inclusion and cooperative play at its core.


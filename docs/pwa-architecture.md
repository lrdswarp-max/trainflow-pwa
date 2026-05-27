# PWA Architecture & Sync Strategy

This repository serves as a robust skeleton for building Offline-First Progressive Web Apps (PWAs). The architecture ensures that users can read, write, and interact with the application seamlessly, even when completely disconnected from the internet.

## Tech Stack Overview
- **Frontend**: React 19 + Vite + TailwindCSS v4
- **Local Database**: IndexedDB via Dexie.js
- **Backend**: FastAPI + WebSockets + SQLite
- **PWA Tooling**: Vite PWA Plugin (Workbox)

## The Offline-First Paradigm

### 1. Read Operations (Local-First)
All UI components read exclusively from the local `IndexedDB` (using `dexie-react-hooks`). 
- When the user opens the app, the UI loads instantly from local storage.
- The app establishes a WebSocket connection with the backend.
- Once connected, the backend streams the latest data, which is written to the local database, triggering reactive UI updates automatically.

### 2. Write Operations (Optimistic UI)
When a user performs an action (e.g., logging a workout set or sending a chat message):
1. The action is **immediately** written to the local `IndexedDB`.
2. The UI updates instantly (Optimistic Update).
3. The app attempts to send the payload to the backend via WebSocket.
4. If the device is offline, the action is marked with `status: 'pending'` in the local database.

### 3. Background Synchronization
A custom React hook (`useOfflineSync`) manages the background synchronization:
- It listens to the `online` window event.
- Upon reconnecting, it queries `IndexedDB` for all records with `status: 'pending'`.
- It pushes these records to the backend in batches.
- Once acknowledged by the server, their local status is updated to `sent` or `synced`.

## Service Worker & Caching

The `vite-plugin-pwa` is configured in `vite.config.ts` to automatically generate a Service Worker using Workbox.
- **Static Assets**: All HTML, JS, CSS, and images are precached during the build step.
- **Offline Fallback**: If the network is unreachable, the Service Worker intercepts fetch requests and serves the precached app shell.
- **Installability**: A valid `manifest.webmanifest` provides the app icon, theme colors, and display mode to allow "Add to Home Screen" on iOS and Android.

## Skeleton Reusability
To repurpose this skeleton for a different project:
1. Update `frontend/src/lib/db.ts` with your new Dexie schema.
2. Update the PWA Manifest in `frontend/vite.config.ts`.
3. Modify the FastAPI models in `backend/app/main.py`.
4. Keep the `useOfflineSync` logic to handle your custom tables.

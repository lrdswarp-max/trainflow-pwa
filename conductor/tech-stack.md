# Tech Stack: PWA Web App

## Core Technologies
- **Language:** TypeScript
- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Backend API:** FastAPI (Python) - Async, high-performance, and supporting **WebSockets** for real-time chat.

## PWA & Offline Capabilities
- **PWA Integration:** `vite-plugin-pwa`
- **Storage:** IndexedDB (via Dexie.js) - For robust offline persistence of workout progress and chat messages.
- **State Management:** TanStack Query (React Query) - Handles server state, caching, and background sync.

## Media & Performance
- **Media Preloading:** Silent background preloading for Exercise GIFs and Audio Narration.
- **Real-time:** WebSockets for instant message delivery in chat.
- **Haptics:** Browser Vibration API for timer and exercise transitions.

## Development Tools
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Icons:** Lucide React (clean, consistent icons that fit the "Modern & Minimalist" guidelines)
- **API Communication:** Axios

## Infrastructure
- **Web Server:** Uvicorn (local/production)
- **Hosting:** Vercel/Netlify (Frontend), Railway/Render/DigitalOcean (Backend)

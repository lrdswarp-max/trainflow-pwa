# TrainFlow PWA Skeleton

An open-source, production-ready Progressive Web Application (PWA) skeleton designed for Offline-First experiences. 

TrainFlow uses a modern stack to ensure that users can read, interact, and submit data without an internet connection. When the connection is restored, background sync automatically synchronizes local changes with the backend.

## 🚀 Architecture Overview

This repository is split into two independent services:

### 1. Frontend (`/frontend`)
The user interface is a blazing fast React application configured as a Progressive Web App.
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS v4
- **Local DB**: Dexie.js (IndexedDB wrapper)
- **Offline Mode**: `vite-plugin-pwa` (Workbox) + custom sync hooks

### 2. Backend (`/backend`)
A lightweight, high-performance Python API that connects to the frontend via WebSockets for real-time bi-directional synchronization.
- **Framework**: FastAPI
- **Real-time**: WebSockets
- **Database**: SQLite
- **Production Server**: Uvicorn + Gunicorn

## 📚 Documentation
- [Product Vision & Requirements](docs/product.md)
- [PWA Architecture & Offline Sync](docs/pwa-architecture.md)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm
- Python 3.10+

### Start the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Start the Frontend
```bash
cd frontend
pnpm install
pnpm dev
```
Open `http://localhost:5173` in your browser.

## 📱 Features Built-in
- **Installable**: Full PWA manifest configuration.
- **Service Worker**: Pre-configured caching strategy for all static assets.
- **Optimistic UI**: Changes reflect immediately using `IndexedDB`.
- **WebSocket Sync**: Real-time message streaming.

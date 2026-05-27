# Specification: Implement TrainFlow Core

## Overview
This track focuses on building the foundational layers of TrainFlow: the authentication system, the core PWA infrastructure, and the initial user experience for students. It establishes the "Offline-First" architecture using IndexedDB and provides the entry point for both students and trainers.

## User Stories
- **As a Student**, I want to log in using a magic link so I don't have to remember a password.
- **As a Student**, I want to see a premium home screen that immediately shows today's workout.
- **As a Student**, I want to know if I'm offline so I can trust that my data is being saved locally.
- **As a Trainer**, I want to access my management area via a subtle link on the login screen.

## Functional Requirements
- **Authentication:**
  - Magic link email flow (backend + frontend).
  - JWT-based session management.
  - Role detection (Student vs. Trainer) and redirection.
- **PWA Foundation:**
  - Manifest and service worker setup via `vite-plugin-pwa`.
  - Offline asset caching (icons, fonts, basic shell).
- **Data Architecture:**
  - IndexedDB setup using Dexie.js.
  - Schema for Users and Workouts.
  - "Amber Banner" logic for connectivity status.
- **UI/UX:**
  - Student Login Screen (Premium design).
  - Trainer Login Entry (Quiet link).
  - Student Home Screen (Workout preview + Recent sessions).

## Tech Stack References
- **Frontend:** React (Vite), TypeScript, Tailwind CSS, Shadcn UI.
- **Backend:** FastAPI (Python).
- **Storage:** IndexedDB (Dexie.js).
- **PWA:** `vite-plugin-pwa`.

## Acceptance Criteria
- User can enter email and receive a magic link (simulated or real).
- Clicking the link authenticates the user and lands them on the correct dashboard.
- The app is installable as a PWA.
- Disconnecting internet triggers the "Offline" amber banner.
- Data persists in IndexedDB even after a page refresh while offline.

# Implementation Plan: TrainFlow Core

## Phase 1: Project Scaffolding & Foundation [checkpoint: 309702c]

### Task: Project Environment Setup
- [x] **Task: Initialize Frontend (React + Vite + TypeScript)** (Manual config due to npm issues) [058d768]
    - [ ] Setup Vite project with React and TypeScript
    - [ ] Install and configure Tailwind CSS and Shadcn UI
    - [ ] Configure `vite-plugin-pwa` for manifest and service worker
- [x] **Task: Initialize Backend (FastAPI)** [49788db]
    - [x] Setup FastAPI project structure
    - [x] Configure Uvicorn and basic environment variables
- [x] **Task: Setup Offline Storage (Dexie.js)** [b795a53]
    - [x] Install Dexie.js
    - [x] Define initial database schema (Users, Workouts)
    - [x] Implement database initialization and health check
- [x] **Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & Foundation' (Protocol in workflow.md)** [309702c]

## Phase 2: Authentication & Role Management [checkpoint: cf9da0d]

### Task: Backend Authentication Logic
- [x] **Task: Implement Magic Link Generation (Backend)** [8fc8fa3]
    - [x] Write tests for token generation and email sending logic
    - [x] Implement token generation and secure storage
    - [x] Setup mock email service (or integration)
- [x] **Task: Implement JWT Authentication & Role Detection (Backend)** [81441d5]
    - [x] Write tests for token verification and role-based access
    - [x] Implement JWT middleware and dependency injection
- [x] **Task: Implement Authentication Flow (Frontend)** [168affb]
    - [x] Write tests for login form and magic link handling
    - [x] Build the Student Login Screen (Premium Design)
    - [x] Implement Trainer entry "quiet link"
    - [x] Handle magic link redirection and token storage
- [x] **Task: Conductor - User Manual Verification 'Phase 2: Authentication & Role Management' (Protocol in workflow.md)** [cf9da0d]

## Phase 3: Core UI & Connectivity

### Task: Student Home & Offline Status
- [x] **Task: Implement Connectivity Monitoring (Frontend)** [81a1694]
    - [x] Write tests for online/offline state transitions
    - [x] Implement "Amber Banner" status indicator
    - [x] Integrate with application layout
- [x] **Task: Build Student Home Screen** [2fb05a5]
    - [x] Write tests for home screen data loading (offline-first)
    - [x] Implement Today's Workout CTA and Recent Sessions list
    - [x] Setup basic navigation (Home, Workout, Chat, Profile)
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Core UI & Connectivity' (Protocol in workflow.md)**

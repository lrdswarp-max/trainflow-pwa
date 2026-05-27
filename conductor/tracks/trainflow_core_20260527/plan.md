# Implementation Plan: TrainFlow Core

## Phase 1: Project Scaffolding & Foundation

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
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & Foundation' (Protocol in workflow.md)**

## Phase 2: Authentication & Role Management

### Task: Backend Authentication Logic
- [ ] **Task: Implement Magic Link Generation (Backend)**
    - [ ] Write tests for token generation and email sending logic
    - [ ] Implement token generation and secure storage
    - [ ] Setup mock email service (or integration)
- [ ] **Task: Implement JWT Authentication & Role Detection (Backend)**
    - [ ] Write tests for token verification and role-based access
    - [ ] Implement JWT middleware and dependency injection
- [ ] **Task: Implement Authentication Flow (Frontend)**
    - [ ] Write tests for login form and magic link handling
    - [ ] Build the Student Login Screen (Premium Design)
    - [ ] Implement Trainer entry "quiet link"
    - [ ] Handle magic link redirection and token storage
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Authentication & Role Management' (Protocol in workflow.md)**

## Phase 3: Core UI & Connectivity

### Task: Student Home & Offline Status
- [ ] **Task: Implement Connectivity Monitoring (Frontend)**
    - [ ] Write tests for online/offline state transitions
    - [ ] Implement "Amber Banner" status indicator
    - [ ] Integrate with application layout
- [ ] **Task: Build Student Home Screen**
    - [ ] Write tests for home screen data loading (offline-first)
    - [ ] Implement Today's Workout CTA and Recent Sessions list
    - [ ] Setup basic navigation (Home, Workout, Chat, Profile)
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Core UI & Connectivity' (Protocol in workflow.md)**

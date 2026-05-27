# Implementation Plan: Trainer Experience

## Phase 1: Trainer Authentication & Dashboard Layout
- [ ] Task: Add a subtle "I'm a personal trainer" link to the existing `Login` screen.
- [ ] Task: Create `/trainer/dashboard` route.
- [ ] Task: Implement the `TrainerDashboard` layout (sidebar navigation or top bar for Students, Workouts, Messages).
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Student Management & Onboarding
- [ ] Task: Create the "Students List" view inside the dashboard.
- [ ] Task: Build the "Invite Student" modal/form (sends email/magic link).
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Workout Builder Foundation
- [ ] Task: Create the `WorkoutBuilder` interface (drag-and-drop or simple list UI to add exercises).
- [ ] Task: Connect the builder to local IndexedDB (`db.ts`) for offline draft saving before syncing to the backend.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

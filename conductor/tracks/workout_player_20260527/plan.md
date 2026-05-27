# Implementation Plan: Workout Player & Exercise Execution

## Phase 1: Foundation & Data Models [checkpoint: 679625d]
- [x] Task: Define TypeScript interfaces for Workout, Exercise, and Set logs in `src/types/workout.ts`.
- [x] Task: Update Dexie.js schema in `src/lib/db.ts` to include offline storage for active workouts and set logs.
- [x] Task: Create custom hooks (`useWorkoutPlayer`, `useOfflineSync`) to manage player state and IndexedDB interactions.
- [x] Task: Conductor - User Manual Verification 'Phase 1 Foundation' (Protocol in workflow.md)

## Phase 2: Media Preloading & Haptics Engine
- [x] Task: Implement `MediaPreloader` utility to fetch and cache GIFs/Audio in the background.
- [x] Task: Create a `useHaptics` hook for vibration API interactions (timer alerts, set completion).
- [x] Task: Conductor - User Manual Verification 'Phase 2 Media & Haptics' (Protocol in workflow.md)

## Phase 3: Core UI Components
- [ ] Task: Build `ProgressRing` component using SVG for visual progression.
- [ ] Task: Build `SetLogger` component (inputs for weight/reps + confirm button).
- [ ] Task: Build `RestTimerOverlay` component (fullscreen, countdown, integrates with `useHaptics`).
- [ ] Task: Conductor - User Manual Verification 'Phase 3 Core UI' (Protocol in workflow.md)

## Phase 4: Workout Player Assembly & State Machine
- [ ] Task: Create the main `WorkoutPlayer` page structure (full-screen, layout).
- [ ] Task: Integrate state machine to handle transitions: Exercise View -> Set Logged -> Rest Timer -> Next Set/Exercise.
- [ ] Task: Implement offline banner display and error boundaries for graceful recovery.
- [ ] Task: Conductor - User Manual Verification 'Phase 4 Assembly' (Protocol in workflow.md)

## Phase 5: Completion Screen & Polish
- [ ] Task: Build `WorkoutSummary` screen (time, sets, volume calculation).
- [ ] Task: Add smooth animations/transitions between exercises and timer using Tailwind or Framer Motion.
- [ ] Task: Conductor - User Manual Verification 'Phase 5 Polish' (Protocol in workflow.md)

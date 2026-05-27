# Specification: Workout Player & Exercise Execution

## Overview
This track focuses on building the core "Workout Player" experience for students in the TrainFlow PWA. The player must provide an immersive, high-performance environment for executing workouts, with strong offline resilience and intuitive interactions.

## Functional Requirements
1.  **Exercise Execution Engine**:
    *   Track current exercise, set, and rep.
    *   Input fields for weight (kg) and reps side-by-side with a prominent confirm button.
    *   Navigate between exercises and sets seamlessly.
2.  **Immersive UI**:
    *   Full-screen mode support.
    *   Visual progress indicators (rings/arcs) showing workout progression.
    *   Clear, high-contrast typography and layout matching the "precision/tech" aesthetic.
3.  **Rest Timer**:
    *   Full-screen overlay triggered after completing a set.
    *   Visual countdown and progress ring.
    *   Haptic feedback (vibration) and optional audio cue during the final 3 seconds.
    *   Option to skip the rest timer.
4.  **Media Preloading**:
    *   Silently preload animated GIFs for the current and next exercise in the background.
    *   Preload audio narration for the exercises.
    *   Ensure instant transitions without white screens or loading spinners during the workout.
5.  **Offline Resilience**:
    *   Save all logged sets and workout progress locally using Dexie.js before attempting network sync.
    *   Display an amber banner if the user is offline.
    *   Graceful error recovery.
6.  **Completion Screen**:
    *   Show a summary at the end of the workout (total time, sets completed, total volume lifted).

## Out of Scope
*   Trainer Workout Builder (creating the plans).
*   Chat functionality (handled in a separate track).

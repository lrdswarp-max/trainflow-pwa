# Product Definition: TrainFlow

## Vision
Build "TrainFlow" — a premium PWA that connects personal trainers with their students. The app delivers a high-performance, "sports performance" experience that feels like a native app on iOS and Android. It features two distinct, role-based experiences within a single codebase: a focused, immersive workout environment for students and a low-profile management area for trainers.

## Target Audience & Roles

### Students (Primary)
- **Goal:** Execute workouts, track performance, and communicate with trainers.
- **Needs:** Immersive workout player, offline reliability, instant feedback, and seamless sync.
- **Context:** Often used in gyms with unreliable network connectivity.

### Trainers (Secondary)
- **Goal:** Manage students, create workout plans, and communicate.
- **Experience:** Accessed via a "quiet" link on the login screen; simple and functional UI.

## Core Features & User Journey

### Authentication & Entry
- **Student Login:** The main entry point. High-quality visual design with email/magic link authentication.
- **Trainer Entry:** A subtle "I'm a personal trainer" link at the bottom of the student login screen.
- **Onboarding:** New students complete their profile after their first magic link login.

### Student Experience
- **Home Screen:** Shows today's workout, past sessions (horizontal scroll), and latest trainer messages.
- **Workout Player (Mission Critical):**
  - **Immersive View:** Full-screen player with visual progress indicators (arcs/rings).
  - **Visual Form:** Animated GIFs for exercises, with silent background preloading for instant transitions.
  - **Audio Narration:** Automatic exercise descriptions with preloading.
  - **Set Logger:** Side-by-side inputs for weight (kg) and reps with a large confirm button.
  - **Rest Timer:** Full-screen overlay with countdown, progress ring, and audio/vibration cues (final 3 seconds).
  - **Offline Resilience:** Progress is saved locally first. An amber banner notifies the user of offline status.
  - **Error Handling:** Graceful recovery from crashes; white screens are prohibited.
  - **Completion Screen:** Summary of time, sets, and total volume lifted.
- **Chat:** Direct communication between student and trainer. Messages appear in real time (WebSockets). Sent messages use the accent color; received messages use a dark surface. Supports offline message queuing with a pending indicator.
- **Profile:** Avatar, basic info, measurements, and goals.

## Trainer Experience (Management Interface)
- **Dashboard:** Overview of active students, recent activity, and unread messages.
- **Students List:** Management of all students with status tracking (Invited vs. Active).
- **Onboarding Students:** Trainers invite students via email; the system sends a magic link to create the account.
- **Workout Builder:** Tools for trainers to organize exercises and build custom workout plans for their students.

## Design & UX Guidelines
- **Visual Aesthetic:** Inspired by Tesla (precision/tech) and Apple (clarity). High-energy, modern gym feel.
- **Performance:** Instant transitions, preloaded media, and haptic feedback (vibration).
- **Offline First:** Every action is persisted locally to IndexedDB before attempting to sync with the FastAPI backend.

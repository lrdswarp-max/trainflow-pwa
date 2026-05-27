# Specification: Trainer Experience (Management Interface)

## Overview
A low-profile management area accessed via a subtle link on the login screen. It allows trainers to manage students, onboard new ones via Magic Links, and build custom workouts.

## Requirements
1. **Authentication:** A subtle link on the `Login` page that switches to Trainer mode.
2. **Dashboard:** A layout specifically for trainers with a sidebar or top bar navigation.
3. **Student Management:** View a list of students and invite new students via a form.
4. **Workout Builder:** A UI to assemble exercises into a workout routine. Saves drafts offline to IndexedDB.

## Out of Scope
- Real-time WebSockets Chat (Will be a separate track).
- Complex macro-cycle periodization (MVP builder only).

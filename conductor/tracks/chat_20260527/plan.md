# Implementation Plan: Chat

## Phase 1: Database & Offline Queue Infrastructure [checkpoint: 17dbf82]
- [x] Task: Extend the `db.ts` schema to include `messages` and `pending_messages` (offline queue). 29dfce5
- [x] Task: Implement a `useChatSync` hook that checks network status and flushes pending messages when online. 29dfce5

## Phase 2: WebSocket Client Hooks
- [ ] Task: Create `useChat` hook to manage the WebSocket connection, send messages, and receive real-time updates.
- [ ] Task: If offline, the hook intercepts the send action and saves it to the local IndexedDB queue with a "pending" status.

## Phase 3: Chat User Interface
- [ ] Task: Build the `Chat` view for both Students and Trainers.
- [ ] Task: Design the message bubbles (Accent color for sent, Dark surface for received) and visual indicators.

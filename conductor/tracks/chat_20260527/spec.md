# Specification: Real-time WebSockets Chat

## Overview
Direct communication between students and trainers. Sent messages will use the accent color, and received messages will use a dark surface. The system must support offline message queuing with a pending indicator, syncing automatically when the connection is restored.

## Requirements
1. **Offline Queue:** Extend Dexie.js `db.ts` to include `messages` and an offline queue.
2. **WebSocket Hook:** A `useChat` hook to simulate real-time updates and handle intercepting messages while offline.
3. **UI:** A `Chat` view containing `MessageBubble` components. Accent color for sent, dark surface for received. Pending messages have a visual indicator.

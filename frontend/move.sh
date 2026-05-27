#!/bin/bash
set -e

# Core
mv src/lib/seed.ts src/core/db/ || true
mv src/lib/db.test.ts src/core/db/ || true
mv src/lib/mediaPreloader.ts src/core/media/ || true
mv src/lib/mediaPreloader.test.ts src/core/media/ || true

# Features
mv src/pages/Login.tsx src/features/auth/ || true
mv src/pages/Login.test.tsx src/features/auth/ || true
mv src/pages/Home.tsx src/features/home/ || true
mv src/pages/Home.test.tsx src/features/home/ || true
mv src/pages/Profile.tsx src/features/profile/ || true
mv src/pages/Profile.test.tsx src/features/profile/ || true

mv src/pages/WorkoutPlayer.tsx src/features/workouts/ || true
mv src/pages/WorkoutSummary.tsx src/features/workouts/ || true
mv src/pages/trainer/Dashboard.tsx src/features/trainer/ || true
mv src/pages/trainer/Dashboard.test.tsx src/features/trainer/ || true
mv src/pages/trainer/StudentsList.tsx src/features/trainer/ || true
mv src/pages/trainer/StudentsList.test.tsx src/features/trainer/ || true
mv src/pages/trainer/WorkoutBuilder.tsx src/features/trainer/ || true
mv src/pages/trainer/WorkoutBuilder.test.tsx src/features/trainer/ || true

mv src/components/SetLogger.tsx src/features/workouts/ || true
mv src/components/SetLogger.test.tsx src/features/workouts/ || true
mv src/components/RestTimerOverlay.tsx src/features/workouts/ || true
mv src/components/RestTimerOverlay.test.tsx src/features/workouts/ || true
mv src/components/ProgressRing.tsx src/features/workouts/ || true
mv src/components/ProgressRing.test.tsx src/features/workouts/ || true

mv src/pages/Chat.tsx src/features/chat/ || true
mv src/pages/Chat.test.tsx src/features/chat/ || true
mv src/components/MessageBubble.tsx src/features/chat/ || true
mv src/components/MessageBubble.test.tsx src/features/chat/ || true

mv src/hooks/useWorkoutPlayer.ts src/features/workouts/ || true
mv src/hooks/useWorkoutPlayer.test.ts src/features/workouts/ || true
mv src/hooks/useChat.ts src/features/chat/ || true
mv src/hooks/useChat.test.ts src/features/chat/ || true
mv src/hooks/useChatSync.ts src/features/chat/ || true
mv src/hooks/useChatSync.test.ts src/features/chat/ || true

mv src/components/trainer/TrainerLayout.tsx src/features/trainer/ || true
mv src/components/trainer/TrainerLayout.test.tsx src/features/trainer/ || true
mv src/components/trainer/InviteStudentModal.tsx src/features/trainer/ || true
mv src/components/trainer/InviteStudentModal.test.tsx src/features/trainer/ || true

# Shared
mv src/components/NetworkBanner.tsx src/shared/ui/ || true
mv src/components/NetworkBanner.test.tsx src/shared/ui/ || true

mv src/hooks/useOfflineSync.ts src/shared/hooks/ || true
mv src/hooks/useOfflineSync.test.ts src/shared/hooks/ || true
mv src/hooks/useNetworkStatus.ts src/shared/hooks/ || true
mv src/hooks/useNetworkStatus.test.ts src/shared/hooks/ || true
mv src/hooks/useHaptics.ts src/shared/hooks/ || true
mv src/hooks/useHaptics.test.ts src/shared/hooks/ || true

mv src/types/workout.ts src/shared/types/ || true

mv src/lib/utils.ts src/shared/utils/ || true

# Clean up empty dirs
rm -rf src/pages/trainer src/pages src/components/trainer src/components src/hooks src/lib src/types || true

echo "Move successful"

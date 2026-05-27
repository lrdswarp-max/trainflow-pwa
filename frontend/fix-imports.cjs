const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const findFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
};

const map = {
  // DB & Seed
  '../lib/db': '@/core/db/db',
  '../../lib/db': '@/core/db/db',
  '../../../lib/db': '@/core/db/db',
  './db': '@/core/db/db',
  '../lib/seed': '@/core/db/seed',
  
  // Media Preloader
  '../lib/mediaPreloader': '@/core/media/mediaPreloader',
  '../../lib/mediaPreloader': '@/core/media/mediaPreloader',

  // Types
  '../types/workout': '@/shared/types/workout',
  '../../types/workout': '@/shared/types/workout',
  '../../../types/workout': '@/shared/types/workout',
  
  // Shared Hooks
  '../hooks/useNetworkStatus': '@/shared/hooks/useNetworkStatus',
  '../../hooks/useNetworkStatus': '@/shared/hooks/useNetworkStatus',
  './useNetworkStatus': '@/shared/hooks/useNetworkStatus',
  
  '../hooks/useHaptics': '@/shared/hooks/useHaptics',
  '../../hooks/useHaptics': '@/shared/hooks/useHaptics',

  '../hooks/useOfflineSync': '@/shared/hooks/useOfflineSync',
  '../../hooks/useOfflineSync': '@/shared/hooks/useOfflineSync',

  // Shared UI
  '../components/NetworkBanner': '@/shared/ui/NetworkBanner',
  '../../components/NetworkBanner': '@/shared/ui/NetworkBanner',
  
  // Shared Utils
  './utils': '@/shared/utils/utils',
  '../lib/utils': '@/shared/utils/utils',

  // Workouts
  '../hooks/useWorkoutPlayer': '@/features/workouts/useWorkoutPlayer',
  '../../hooks/useWorkoutPlayer': '@/features/workouts/useWorkoutPlayer',
  '../components/SetLogger': '@/features/workouts/SetLogger',
  '../../components/SetLogger': '@/features/workouts/SetLogger',
  '../components/RestTimerOverlay': '@/features/workouts/RestTimerOverlay',
  '../../components/RestTimerOverlay': '@/features/workouts/RestTimerOverlay',
  '../components/ProgressRing': '@/features/workouts/ProgressRing',
  '../../components/ProgressRing': '@/features/workouts/ProgressRing',
  './WorkoutSummary': '@/features/workouts/WorkoutSummary',

  // Chat
  '../components/MessageBubble': '@/features/chat/MessageBubble',
  '../../components/MessageBubble': '@/features/chat/MessageBubble',
  '../hooks/useChatSync': '@/features/chat/useChatSync',
  '../../hooks/useChatSync': '@/features/chat/useChatSync',
  './useChatSync': '@/features/chat/useChatSync',
  '../hooks/useChat': '@/features/chat/useChat',
  '../../hooks/useChat': '@/features/chat/useChat',

  // Trainer
  '../../components/trainer/TrainerLayout': '@/features/trainer/TrainerLayout',
  '../components/trainer/TrainerLayout': '@/features/trainer/TrainerLayout',
  '../../components/trainer/InviteStudentModal': '@/features/trainer/InviteStudentModal',
  '../components/trainer/InviteStudentModal': '@/features/trainer/InviteStudentModal',

  // App
  './App.tsx': '@/app/App',
  './App': '@/app/App',
  './index.css': '@/app/styles/index.css',
  './App.css': '@/app/styles/App.css',
};

const replaceImports = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const [oldPath, newPath] of Object.entries(map)) {
    // Regex matches from 'oldPath' or from "oldPath"
    const regex = new RegExp(`from\\s+['"]${oldPath}['"]`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `from '${newPath}'`);
      changed = true;
    }
    
    // For direct imports like import './index.css'
    const directRegex = new RegExp(`import\\s+['"]${oldPath}['"]`, 'g');
    if (directRegex.test(content)) {
      content = content.replace(directRegex, `import '${newPath}'`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${file}`);
  }
};

const files = findFiles(srcDir);
files.forEach(replaceImports);
console.log('Done replacing imports');

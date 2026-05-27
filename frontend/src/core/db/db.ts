import Dexie, { type EntityTable } from 'dexie';
import type { Workout, SetLog } from '@/shared/types/workout';

interface User {
  id?: number;
  name: string;
  email: string;
  role?: 'student' | 'trainer';
  avatar?: string;
  height?: number;
  weight?: number;
  goals?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  status: 'sent' | 'pending';
}

const db = new Dexie('TrainFlowDB') as Dexie & {
  users: EntityTable<User, 'id'>;
  workouts: EntityTable<Workout, 'id'>;
  setLogs: EntityTable<SetLog, 'id'>;
  messages: EntityTable<ChatMessage, 'id'>;
};

db.version(1).stores({
  users: '++id, email',
  workouts: '++id, date, status'
});

db.version(2).stores({
  workouts: 'id, studentId, date, status',
  setLogs: 'id, workoutId, exerciseId'
});

db.version(3).stores({
  messages: 'id, senderId, receiverId, status, timestamp'
});

export { db };
export type { User };

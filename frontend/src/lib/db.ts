import Dexie, { type EntityTable } from 'dexie';
import type { Workout, SetLog } from '../types/workout';

interface User {
  id?: number;
  name: string;
  email: string;
  role?: 'student' | 'trainer';
}

const db = new Dexie('TrainFlowDB') as Dexie & {
  users: EntityTable<User, 'id'>;
  workouts: EntityTable<Workout, 'id'>;
  setLogs: EntityTable<SetLog, 'id'>;
};

db.version(1).stores({
  users: '++id, email',
  workouts: '++id, date, status'
});

db.version(2).stores({
  workouts: 'id, studentId, date, status',
  setLogs: 'id, workoutId, exerciseId'
});

export { db };
export type { User };

import Dexie, { type EntityTable } from 'dexie';

interface User {
  id?: number;
  name: string;
  email: string;
  role?: 'student' | 'trainer';
}

interface Workout {
  id?: number;
  title: string;
  date: string;
  status: 'pending' | 'completed';
  exercises: any[];
}

const db = new Dexie('TrainFlowDB') as Dexie & {
  users: EntityTable<User, 'id'>;
  workouts: EntityTable<Workout, 'id'>;
};

db.version(1).stores({
  users: '++id, email',
  workouts: '++id, date, status'
});

export { db };
export type { User, Workout };

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  gifUrl?: string;
  audioUrl?: string;
  targetMuscles?: string[];
}

export interface SetLog {
  id: string;
  exerciseId: string;
  workoutId: string;
  reps: number;
  weight: number;
  completedAt: Date;
}

export interface Workout {
  id: string;
  studentId: string;
  trainerId: string;
  name: string;
  date: Date;
  exercises: Exercise[];
  status: 'planned' | 'in_progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
  totalVolume?: number;
}

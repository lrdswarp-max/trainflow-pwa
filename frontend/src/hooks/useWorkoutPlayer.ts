import { useState, useCallback } from 'react';
import type { Workout, Exercise } from '../types/workout';
import { db } from '../lib/db';

export function useWorkoutPlayer(workout: Workout) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [status, setStatus] = useState<'active' | 'resting' | 'completed'>('active');

  const currentExercise = workout.exercises[currentExerciseIndex] as Exercise | undefined;

  const logSet = useCallback(async (reps: number, weight: number) => {
    if (!currentExercise) return;

    try {
      await db.setLogs.add({
        id: crypto.randomUUID(),
        workoutId: workout.id,
        exerciseId: currentExercise.id,
        reps,
        weight,
        completedAt: new Date()
      });
      
      setStatus('resting');
    } catch (error) {
      console.error('Failed to save set log locally:', error);
    }
  }, [currentExercise, workout.id]);

  const skipRest = useCallback(() => {
    setStatus('active');
    setCurrentSetIndex(prev => prev + 1);
  }, []);

  const nextExercise = useCallback(() => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
      setStatus('active');
    } else {
      setStatus('completed');
    }
  }, [currentExerciseIndex, workout.exercises.length]);

  return {
    currentExerciseIndex,
    currentSetIndex,
    status,
    currentExercise,
    logSet,
    skipRest,
    nextExercise
  };
}

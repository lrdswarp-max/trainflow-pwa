import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useWorkoutPlayer } from './useWorkoutPlayer';
import type { Workout } from '@/shared/types/workout';

describe('useWorkoutPlayer', () => {
  const mockWorkout: Workout = {
    id: 'workout-1',
    studentId: 'student-1',
    trainerId: 'trainer-1',
    name: 'Push Day',
    date: new Date(),
    status: 'planned',
    exercises: [
      { id: 'ex-1', name: 'Bench Press', targetMuscles: ['Chest'] },
      { id: 'ex-2', name: 'Overhead Press', targetMuscles: ['Shoulders'] }
    ]
  };

  it('should initialize player state', () => {
    const { result } = renderHook(() => useWorkoutPlayer(mockWorkout));

    expect(result.current.currentExerciseIndex).toBe(0);
    expect(result.current.currentSetIndex).toBe(0);
    expect(result.current.status).toBe('active');
    expect(result.current.currentExercise?.id).toBe('ex-1');
  });

  it('should advance to rest status after logging a set', async () => {
    const { result } = renderHook(() => useWorkoutPlayer(mockWorkout));

    await act(async () => {
      await result.current.logSet(10, 60);
    });

    expect(result.current.status).toBe('resting');
  });

  it('should advance to next set when skipRest is called', async () => {
    const { result } = renderHook(() => useWorkoutPlayer(mockWorkout));

    await act(async () => {
      await result.current.logSet(10, 60);
    });

    act(() => {
      result.current.skipRest();
    });

    expect(result.current.status).toBe('active');
    expect(result.current.currentSetIndex).toBe(1);
    expect(result.current.currentExerciseIndex).toBe(0);
  });
});

import { useEffect, useState } from 'react';
import { useWorkoutPlayer } from '@/features/workouts/useWorkoutPlayer';
import { SetLogger } from '@/features/workouts/SetLogger';
import { RestTimerOverlay } from '@/features/workouts/RestTimerOverlay';
import { NetworkBanner } from '@/shared/ui/NetworkBanner';
import { WorkoutSummary } from '@/features/workouts/WorkoutSummary';
import { preloadMedia } from '@/core/media/mediaPreloader';
import type { Workout } from '@/shared/types/workout';

interface WorkoutPlayerProps {
  workout: Workout;
  onExit: () => void;
}

export function WorkoutPlayer({ workout: initialWorkout, onExit }: WorkoutPlayerProps) {
  const [workout, setWorkout] = useState<Workout>({ ...initialWorkout, startTime: new Date() });
  const { currentExerciseIndex, currentSetIndex, status, currentExercise, logSet, skipRest, nextExercise } = useWorkoutPlayer(workout);

  // Preload media for next exercise
  useEffect(() => {
    const nextExercise = workout.exercises[currentExerciseIndex + 1];
    const mediaToPreload: string[] = [];
    if (nextExercise?.gifUrl) mediaToPreload.push(nextExercise.gifUrl);
    if (nextExercise?.audioUrl) mediaToPreload.push(nextExercise.audioUrl);
    
    if (mediaToPreload.length > 0) {
      preloadMedia(mediaToPreload.filter(url => url.endsWith('.gif') || url.endsWith('.png') || url.endsWith('.jpg')), mediaToPreload.filter(url => url.endsWith('.mp3') || url.endsWith('.wav'))).catch(console.error);
    }
  }, [currentExerciseIndex, workout.exercises]);

  if (status === 'completed' || !currentExercise) {
    const completedWorkout = { ...workout, endTime: new Date(), status: 'completed' as const };
    return <WorkoutSummary workout={completedWorkout} onFinish={onExit} />;
  }

  const progressPct = ((currentExerciseIndex) / workout.exercises.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans transition-all duration-300">
      <NetworkBanner />
      
      <header className="p-6 flex justify-between items-center border-b border-gray-900">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{workout.name}</h2>
          <p className="text-sm text-gray-500 font-medium">{progressPct.toFixed(0)}% Complete</p>
        </div>
        <button onClick={onExit} className="text-gray-500 hover:text-white transition-colors p-2">
          ✕
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center items-center mb-8">
          {currentExercise.gifUrl ? (
            <img src={currentExercise.gifUrl} alt={currentExercise.name} className="w-full max-w-sm rounded-2xl mb-8 object-cover aspect-square bg-gray-900 border border-gray-800" />
          ) : (
            <div className="w-full max-w-sm aspect-square bg-gray-900 rounded-2xl mb-8 flex items-center justify-center border border-gray-800">
              <span className="text-gray-700 text-6xl">🏋️</span>
            </div>
          )}
          
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">{currentExercise.name}</h1>
          <p className="text-blue-500 font-medium tracking-wide uppercase text-sm mb-2">Set {currentSetIndex + 1}</p>
          {currentExercise.targetMuscles && (
            <p className="text-gray-500 text-sm">Targets: {currentExercise.targetMuscles.join(', ')}</p>
          )}
        </div>

        <div className="w-full max-w-sm mx-auto">
          <SetLogger onConfirm={(w, r) => {
            const newVol = (workout.totalVolume || 0) + (w * r);
            setWorkout(prev => ({ ...prev, totalVolume: newVol }));
            logSet(r, w);
          }} />
          <button 
            onClick={nextExercise}
            className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-xl transition-colors text-sm uppercase tracking-wider"
          >
            {currentExerciseIndex < workout.exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
          </button>
        </div>
      </main>

      {status === 'resting' && (
        <RestTimerOverlay duration={60} onComplete={skipRest} onSkip={skipRest} />
      )}
    </div>
  );
}
